# PushShare Website

PushShare 앱의 공식 웹사이트입니다.

## 구조

- `index.html` - 메인 홈페이지
- `styles.css` - 스타일시트
- `app-ads.txt` - Google AdMob app-ads.txt 파일 (도메인 루트에 배치 필요)

## 배포 방법

### GitHub Pages 사용 (추천)

1. GitHub 저장소의 Settings > Pages로 이동
2. Source를 "Deploy from a branch"로 선택
3. Branch를 `main` (또는 `master`), 폴더를 `/website`로 설정
4. 저장 후 `https://yourusername.github.io/PushShare/`로 접근 가능

### 개인 도메인 연결

1. 도메인 DNS 설정에서 CNAME 레코드 추가:
   - Type: CNAME
   - Name: @ (또는 www)
   - Value: yourusername.github.io

2. GitHub Pages 설정에서 Custom domain 입력

3. `app-ads.txt` 파일을 도메인 루트에 배치:
   - 예: `https://yourdomain.com/app-ads.txt`

### Netlify 사용 (대안)

1. [Netlify](https://www.netlify.com)에 가입
2. GitHub 저장소 연결
3. Build command: (없음, 정적 사이트)
4. Publish directory: `website`
5. Custom domain 설정

### Vercel 사용 (대안)

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. Root Directory를 `website`로 설정
4. Custom domain 설정

## app-ads.txt 배치

Google AdMob이 `app-ads.txt` 파일을 인식하려면:

1. 도메인 루트에 배치: `https://yourdomain.com/app-ads.txt`
2. 또는 `.well-known` 폴더에 배치: `https://yourdomain.com/.well-known/app-ads.txt`

현재 파일의 Publisher ID는 `pub-1992208511493602`입니다.

## 로컬 개발

간단한 HTTP 서버로 로컬에서 테스트할 수 있습니다:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

그 후 브라우저에서 `http://localhost:8000`으로 접근하세요.

## 수정 사항

- iOS App Store 링크: `idYOUR_APP_ID`를 실제 App ID로 변경 필요
- 이메일 주소: `support@yourdomain.com`을 실제 이메일로 변경 필요
- 개인정보처리방침 및 이용약관 페이지 추가 필요

