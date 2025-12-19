/**
 * 웹사이트 설정 파일
 * 변경 가능한 정보들을 여기에 관리합니다.
 */

const CONFIG = {
  // 앱 정보
  app: {
    name: 'PushShare',
    displayName: 'Push Share',
  },

  // 스토어 URL (나중에 변경 가능)
  storeUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.dosusu.pushshare',
    ios: 'https://apps.apple.com/us/app/pushshare/id6748575432',
  },

  // 연락처 정보 (나중에 변경 가능)
  contact: {
    email: 'jj@dosusu.com', // 실제 이메일로 변경 필요
  },

  // 회사 정보 (나중에 변경 가능)
  company: {
    name: 'Dosusu', // 최종 회사명으로 변경 예정
    year: new Date().getFullYear(), // 현재 연도 자동 설정
  },

  // 기본 언어 설정
  defaultLanguage: 'ko',

  // 지원 언어 목록
  supportedLanguages: [
    'ko', 'en', 'es', 'zh-CN', 'zh-TW', 'ja', 'de', 'fr', 'pt', 'ru',
    'ar', 'it', 'hi', 'vi', 'th', 'ms', 'fa', 'tr', 'pl', 'nl',
    'id', 'bn', 'ur',
  ],
};

// 전역에서 접근 가능하도록
window.CONFIG = CONFIG;
