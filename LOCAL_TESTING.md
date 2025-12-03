# 로컬 테스트 가이드

## 🚀 로컬에서 웹사이트 테스트하기

GitHub에 푸시하지 않고도 로컬에서 웹사이트를 테스트할 수 있습니다!

## 방법 1: Python HTTP 서버 (가장 간단)

### Python 3 사용
```bash
cd /Users/dosusu/Documents/Personal/PushShare/website
python3 -m http.server 8000
```

### Python 2 사용
```bash
cd /Users/dosusu/Documents/Personal/PushShare/website
python -m SimpleHTTPServer 8000
```

브라우저에서 `http://localhost:8000` 접속

---

## 방법 2: Node.js http-server

### 설치 (한 번만)
```bash
npm install -g http-server
```

### 실행
```bash
cd /Users/dosusu/Documents/Personal/PushShare/website
http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

---

## 방법 3: PHP 내장 서버

```bash
cd /Users/dosusu/Documents/Personal/PushShare/website
php -S localhost:8000
```

브라우저에서 `http://localhost:8000` 접속

---

## 방법 4: VS Code Live Server (추천)

1. VS Code에서 `website` 폴더 열기
2. `index.html` 파일 우클릭
3. "Open with Live Server" 선택

자동으로 브라우저가 열립니다!

---

## ✅ 테스트 체크리스트

로컬 서버 실행 후 확인할 사항:

- [ ] 페이지가 정상적으로 로드되는가?
- [ ] 언어 선택 드롭다운이 작동하는가?
- [ ] 언어 변경 시 텍스트가 번역되는가?
- [ ] 스토어 링크가 올바르게 설정되는가?
- [ ] 이메일 링크가 올바르게 설정되는가?
- [ ] Footer 저작권 정보가 올바르게 표시되는가?
- [ ] 모든 언어로 전환해보기 (23개 언어)

---

## 🆘 문제 해결

### "CORS error" 또는 번역 파일을 불러올 수 없음
- 로컬 파일을 직접 열면 (file://) CORS 오류 발생
- 반드시 HTTP 서버를 통해 접근해야 함

### 번역이 적용되지 않음
- 브라우저 개발자 도구 (F12) > Console 탭에서 오류 확인
- `locales/` 폴더의 JSON 파일이 올바른 위치에 있는지 확인

---

## 📝 참고

- 로컬 테스트는 개발 중에만 사용
- 실제 배포는 GitHub Pages 사용
- GitHub에 푸시하면 자동으로 배포됨


