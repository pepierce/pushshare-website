/**
 * 다국어 지원 스크립트
 */

class I18n {
  constructor() {
    this.currentLanguage = this.getSavedLanguage() || CONFIG.defaultLanguage;
    this.translations = {};
    this.loadTranslations();
  }

  /**
   * 저장된 언어 설정 가져오기
   */
  getSavedLanguage() {
    try {
      return localStorage.getItem('website-language') || 
             this.detectBrowserLanguage();
    } catch (e) {
      return CONFIG.defaultLanguage;
    }
  }

  /**
   * 브라우저 언어 자동 감지
   */
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    // 지원하는 언어인지 확인
    if (CONFIG.supportedLanguages.includes(browserLang)) {
      return browserLang;
    } else if (CONFIG.supportedLanguages.includes(langCode)) {
      return langCode;
    }
    
    return CONFIG.defaultLanguage;
  }

  /**
   * 언어 설정 저장
   */
  saveLanguage(lang) {
    try {
      localStorage.setItem('website-language', lang);
    } catch (e) {
      console.warn('Failed to save language preference:', e);
    }
  }

  /**
   * 번역 파일 로드
   */
  async loadTranslations() {
    try {
      const response = await fetch(`locales/${this.currentLanguage}.json`);
      if (response.ok) {
        this.translations = await response.json();
        this.applyTranslations();
      } else {
        // 번역 파일이 없으면 기본 언어로 폴백
        if (this.currentLanguage !== CONFIG.defaultLanguage) {
          this.currentLanguage = CONFIG.defaultLanguage;
          await this.loadTranslations();
        }
      }
    } catch (e) {
      console.error('Failed to load translations:', e);
      // 에러 발생 시 기본 언어로 폴백
      if (this.currentLanguage !== CONFIG.defaultLanguage) {
        this.currentLanguage = CONFIG.defaultLanguage;
        await this.loadTranslations();
      }
    }
  }

  /**
   * 번역 적용
   */
  applyTranslations() {
    // HTML lang 속성 업데이트
    document.documentElement.lang = this.currentLanguage;

    // data-i18n 속성이 있는 모든 요소에 번역 적용
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      
      // footer.copyright는 특별 처리 (파라미터 필요)
      if (key === 'footer.copyright') {
        const translation = this.t(key, {
          year: CONFIG.company.year,
          companyName: CONFIG.company.name
        });
        if (translation) {
          element.textContent = translation;
        }
      } else {
        const translation = this.t(key);
        if (translation) {
          if (element.getAttribute('data-i18n-html') === 'true') {
            element.innerHTML = translation;
          } else {
            element.textContent = translation;
          }
        }
      }
    });

    // 언어 선택 드롭다운 업데이트
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
      languageSelector.value = this.currentLanguage;
    }

    // 메타 태그 업데이트
    this.updateMetaTags();
  }

  /**
   * 번역 키로 텍스트 가져오기
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // 번역이 없으면 키 반환
      }
    }

    // 파라미터 치환
    if (typeof value === 'string' && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value || key;
  }

  /**
   * 언어 변경
   */
  async changeLanguage(lang) {
    if (!CONFIG.supportedLanguages.includes(lang)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }

    this.currentLanguage = lang;
    this.saveLanguage(lang);
    await this.loadTranslations();
  }

  /**
   * 메타 태그 업데이트
   */
  updateMetaTags() {
    // title 업데이트
    const title = this.t('meta.title');
    if (title) {
      document.title = title;
    }

    // description 업데이트
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const description = this.t('meta.description');
    if (description) {
      metaDesc.content = description;
    }
  }
}

// 전역 i18n 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();

  // 언어 선택 드롭다운 이벤트 리스너
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.addEventListener('change', async (e) => {
      await window.i18n.changeLanguage(e.target.value);
    });
  }
});

