# 웹사이트 다국어 지원 가이드

## 📁 파일 구조

```
website/
├── index.html
├── styles.css
├── js/
│   ├── config.js          # 변경 가능한 설정 파일
│   └── i18n.js            # 다국어 처리 스크립트
└── locales/
    ├── ko.json            # 한국어
    ├── en.json            # 영어
    └── ...                # 다른 언어들 (추가 예정)
```

## ⚙️ 설정 파일 (config.js)

변경 가능한 정보들을 `js/config.js`에서 관리합니다:

```javascript
const CONFIG = {
  // 스토어 URL
  storeUrls: {
    android: 'https://play.google.com/store/apps/details?id=...',
    ios: 'https://apps.apple.com/app/pushshare/id...',
  },

  // 연락처
  contact: {
    email: 'support@yourdomain.com',
  },

  // 회사 정보
  company: {
    name: 'dosusu',  // 나중에 변경 예정
    year: 2025,      // 자동 설정
  },
};
```

## 🌍 번역 파일 추가

새로운 언어를 추가하려면:

1. `locales/` 폴더에 `언어코드.json` 파일 생성
2. `ko.json` 파일을 참고하여 번역 작성
3. `index.html`의 언어 선택 드롭다운에 옵션 추가 (이미 23개 언어 포함됨)

## 📝 번역 키 구조

```json
{
  "meta": {
    "title": "페이지 제목",
    "description": "페이지 설명"
  },
  "nav": {
    "features": "기능",
    "download": "다운로드",
    "contact": "문의"
  },
  "hero": {
    "title": "메인 타이틀",
    "subtitle": "부제목",
    "downloadAndroid": "Android 다운로드 버튼",
    "downloadIOS": "iOS 다운로드 버튼"
  },
  "features": {
    "title": "기능 섹션 제목",
    "multiDevice": {
      "title": "기능 제목",
      "description": "기능 설명"
    }
  },
  "footer": {
    "copyright": "© {{year}} {{companyName}}. All rights reserved.",
    "privacy": "개인정보처리방침",
    "terms": "이용약관"
  }
}
```

## 🔧 사용 방법

### HTML에서 번역 사용

```html
<!-- 기본 사용 -->
<h2 data-i18n="hero.title">기본 텍스트</h2>

<!-- HTML 포함 -->
<p data-i18n="footer.copyright" data-i18n-html="true">기본 텍스트</p>
```

### JavaScript에서 번역 사용

```javascript
// 기본
const text = window.i18n.t('nav.features');

// 파라미터 포함
const text = window.i18n.t('footer.copyright', {
  year: 2025,
  companyName: 'dosusu'
});
```

## 🎯 변경 가능한 항목

다음 항목들은 `js/config.js`에서 쉽게 변경할 수 있습니다:

- ✅ **스토어 URL**: `CONFIG.storeUrls.android`, `CONFIG.storeUrls.ios`
- ✅ **이메일 주소**: `CONFIG.contact.email`
- ✅ **회사 이름**: `CONFIG.company.name`
- ✅ **연도**: `CONFIG.company.year` (자동 설정)

## 📋 TODO

- [ ] 나머지 21개 언어 번역 파일 추가
- [ ] iOS App Store URL 업데이트 (App ID 필요)
- [ ] 이메일 주소 업데이트
- [ ] 최종 회사명 결정 후 업데이트

## 💡 참고

- 브라우저 언어 자동 감지
- 언어 설정 localStorage에 저장
- 언어 변경 시 즉시 반영
- SEO를 위한 메타 태그 자동 업데이트

