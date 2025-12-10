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
        // 번역 파일이 없으면 영어로 폴백 (법적 요구사항 대응)
        if (this.currentLanguage !== 'en') {
          this.currentLanguage = 'en';
          await this.loadTranslations();
        } else if (this.currentLanguage !== CONFIG.defaultLanguage) {
          // 영어도 없으면 기본 언어로 폴백
          this.currentLanguage = CONFIG.defaultLanguage;
          await this.loadTranslations();
        }
      }
    } catch (e) {
      console.error('Failed to load translations:', e);
      // 에러 발생 시 영어로 폴백 (법적 요구사항 대응)
      if (this.currentLanguage !== 'en') {
        this.currentLanguage = 'en';
        await this.loadTranslations();
      } else if (this.currentLanguage !== CONFIG.defaultLanguage) {
        // 영어도 실패하면 기본 언어로 폴백
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
          companyName: CONFIG.company.name,
        });
        if (translation) {
          element.textContent = translation;
        }
      } else {
        const translation = this.t(key);
        // translation이 키와 다르면 (즉, 실제 번역이 있으면) 적용
        // 빈 문자열도 유효한 값으로 처리
        if (translation !== key) {
          if (element.getAttribute('data-i18n-html') === 'true') {
            element.innerHTML = translation;
          } else {
            element.textContent = translation;
          }
        } else if (translation === '' || translation === null || translation === undefined) {
          // 빈 문자열이거나 null/undefined인 경우 요소를 숨기거나 빈 상태로 유지
          if (element.getAttribute('data-i18n-html') === 'true') {
            element.innerHTML = '';
          } else {
            element.textContent = '';
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

    // section12는 한국어에서만 표시, 다른 언어에서는 section13을 section12로 표시
    this.handleSection12Visibility();
  }

  /**
   * section12 표시/숨김 처리 및 section13 번호 조정
   */
  handleSection12Visibility() {
    const section12Div = document.getElementById('section12-korea-only');
    const section13Title = document.getElementById('section13-title');

    if (section12Div && section13Title) {
      if (this.currentLanguage === 'ko') {
        // 한국어: section12 표시, section13은 그대로
        section12Div.style.display = 'block';
      } else {
        // 다른 언어: section12 숨김, section13을 section12로 변경
        section12Div.style.display = 'none';

        // section13의 제목에서 "13"을 "12"로 변경
        const titleText = section13Title.textContent || section13Title.innerText;
        if (titleText) {
          // "Article 13" 또는 "제13조" 등을 "Article 12" 또는 "제12조"로 변경
          const newTitle = titleText
            .replace(/Article 13/gi, 'Article 12')
            .replace(/第13条/gi, '第12条')
            .replace(/第13條/gi, '第12條')
            .replace(/제13조/gi, '제12조')
            .replace(/Artikel 13/gi, 'Artikel 12')
            .replace(/Artículo 13/gi, 'Artículo 12')
            .replace(/Article 13/gi, 'Article 12')
            .replace(/Artículo 13/gi, 'Artículo 12')
            .replace(/Artikel 13/gi, 'Artikel 12')
            .replace(/13条/gi, '12条')
            .replace(/13條/gi, '12條')
            .replace(/13조/gi, '12조')
            .replace(/13/gi, '12');
          section13Title.textContent = newTitle;
        }
      }
    }
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

    // value가 undefined이거나 null이면 키 반환
    if (value === undefined || value === null) {
      return key;
    }

    // 파라미터 치환
    if (typeof value === 'string' && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    // 빈 문자열도 유효한 값으로 처리
    return value;
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

