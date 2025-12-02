# PushShare 웹사이트 배포 가이드

이 문서는 PushShare 웹사이트를 무료로 배포하는 방법을 안내합니다.

## 📋 사전 준비사항

1. 개인 도메인 보유 (예: `yourdomain.com`)
2. GitHub 계정
3. 도메인 DNS 관리 권한

## 🚀 방법 1: GitHub Pages + 개인 도메인 (추천)

### 1단계: GitHub 저장소 설정

1. 현재 프로젝트를 GitHub에 푸시 (아직 안 했다면)
2. GitHub 저장소의 **Settings** > **Pages**로 이동
3. **Source**를 "Deploy from a branch"로 선택
4. **Branch**를 `main` (또는 `master`), **Folder**를 `/website`로 설정
5. **Save** 클릭

### 2단계: 개인 도메인 연결

1. 도메인 DNS 설정에서 CNAME 레코드 추가:
   ```
   Type: CNAME
   Name: @ (또는 www)
   Value: yourusername.github.io
   ```
   또는 A 레코드:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

2. GitHub Pages 설정에서 **Custom domain** 입력:
   - `yourdomain.com` 또는 `www.yourdomain.com`

3. **Enforce HTTPS** 체크 (선택사항, 권장)

### 3단계: app-ads.txt 배치

Google AdMob이 `app-ads.txt` 파일을 인식하려면 도메인 루트에 배치해야 합니다.

**방법 A: 도메인 루트에 직접 배치 (권장)**
- GitHub Pages는 자동으로 `website/` 폴더의 파일을 루트에 배치합니다
- 현재 구조대로면 `https://yourdomain.com/app-ads.txt`로 접근 가능합니다

**방법 B: .well-known 폴더 사용**
- `website/.well-known/app-ads.txt` 경로로 파일 생성
- `https://yourdomain.com/.well-known/app-ads.txt`로 접근 가능

### 4단계: 확인

1. 몇 분 후 `https://yourdomain.com` 접속 확인
2. `https://yourdomain.com/app-ads.txt` 접속 확인
3. Google AdMob 콘솔에서 app-ads.txt 검증

---

## 🌐 방법 2: Netlify 사용

### 1단계: Netlify 가입 및 연결

1. [Netlify](https://www.netlify.com)에 가입
2. **Add new site** > **Import an existing project**
3. GitHub 저장소 선택
4. 설정:
   - **Base directory**: `website`
   - **Build command**: (비워둠)
   - **Publish directory**: `website`

### 2단계: 개인 도메인 연결

1. Netlify 대시보드에서 **Domain settings**
2. **Add custom domain** 클릭
3. 도메인 입력 및 DNS 설정 안내 따르기

### 3단계: app-ads.txt 배치

Netlify는 자동으로 `website/` 폴더의 파일을 배포하므로 현재 구조 그대로 사용 가능합니다.

---

## ⚡ 방법 3: Vercel 사용

### 1단계: Vercel 가입 및 연결

1. [Vercel](https://vercel.com)에 가입
2. **Add New Project**
3. GitHub 저장소 선택
4. 설정:
   - **Root Directory**: `website`
   - **Framework Preset**: Other

### 2단계: 개인 도메인 연결

1. Vercel 대시보드에서 **Settings** > **Domains**
2. 도메인 추가 및 DNS 설정 안내 따르기

---

## ✅ 배포 후 확인사항

### 필수 확인

- [ ] 홈페이지가 정상적으로 로드되는가?
- [ ] `https://yourdomain.com/app-ads.txt`가 접근 가능한가?
- [ ] 개인정보처리방침 페이지가 정상 작동하는가?
- [ ] 이용약관 페이지가 정상 작동하는가?

### Google AdMob 설정

1. [Google AdMob 콘솔](https://apps.admob.com) 접속
2. **Apps** > **App settings** > **App-ads.txt** 메뉴
3. 도메인 입력 및 검증
4. Publisher ID 확인: `pub-1992208511493602`

### 수정 필요 사항

배포 전에 다음 파일들을 수정하세요:

1. **index.html**:
   - iOS App Store 링크: `idYOUR_APP_ID` → 실제 App ID
   - 이메일 주소: `support@yourdomain.com` → 실제 이메일

2. **privacy-policy.html**:
   - 이메일 주소: `support@yourdomain.com` → 실제 이메일

---

## 🔄 자동 배포 설정

GitHub Actions를 사용하면 `website/` 폴더의 변경사항이 자동으로 배포됩니다.

`.github/workflows/deploy.yml` 파일이 이미 생성되어 있으므로, GitHub에 푸시하면 자동으로 배포됩니다.

---

## 📝 참고사항

- **app-ads.txt 파일 형식**: Google AdMob의 공식 형식을 따라야 합니다
- **HTTPS 필수**: Google AdMob은 HTTPS를 통해서만 app-ads.txt를 읽습니다
- **DNS 전파 시간**: 도메인 연결 후 최대 48시간 소요될 수 있습니다
- **캐시**: 브라우저 캐시로 인해 변경사항이 즉시 반영되지 않을 수 있습니다

---

## 🆘 문제 해결

### app-ads.txt가 인식되지 않는 경우

1. 파일이 도메인 루트에 있는지 확인
2. HTTPS로 접근 가능한지 확인
3. 파일 형식이 올바른지 확인
4. Google AdMob 콘솔에서 수동 검증 시도

### 도메인이 연결되지 않는 경우

1. DNS 설정이 올바른지 확인 (최대 48시간 소요)
2. CNAME/A 레코드가 올바르게 설정되었는지 확인
3. 도메인 제공업체의 DNS 설정 확인

---

## 📞 문의

문제가 발생하면 GitHub Issues에 문의하거나 이메일로 연락주세요.

