# GitHub 푸시 완료 가이드

## 현재 상황
- ✅ 원격 저장소 설정 완료
- ✅ 커밋 완료
- ⏳ 푸시 대기 중

## 푸시 방법

### 방법 1: 터미널에서 직접 입력 (가장 간단)

터미널에서 다음 명령어 실행:

```bash
cd /Users/dosusu/Documents/Personal/PushShare/website
git push -u origin main
```

**입력 요청 시:**
- **Username**: `pepierce` (또는 본인의 GitHub 사용자 이름)
- **Password**: GitHub에서 생성한 Personal Access Token 붙여넣기

⚠️ **중요**: 비밀번호 입력 시 화면에 아무것도 표시되지 않습니다 (정상입니다). 토큰을 붙여넣고 Enter를 누르세요.

---

### 방법 2: Git Credential Helper 사용 (자동 저장)

토큰을 한 번만 입력하면 자동으로 저장됩니다:

```bash
# macOS Keychain에 자격 증명 저장
git config --global credential.helper osxkeychain

# 푸시 시도 (첫 번째만 토큰 입력 필요)
git push -u origin main
```

이후에는 자동으로 인증됩니다.

---

### 방법 3: 환경 변수로 토큰 설정 (임시)

```bash
# 토큰을 환경 변수로 설정
export GIT_ASKPASS=echo
export GIT_TERMINAL_PROMPT=1

# 푸시 (토큰 입력 요청됨)
git push -u origin main
```

---

### 방법 4: URL에 토큰 포함 (보안 주의)

⚠️ **권장하지 않음** (토큰이 히스토리에 남을 수 있음)

```bash
# URL에 토큰 포함 (YOUR_TOKEN을 실제 토큰으로 변경)
git remote set-url origin https://pepierce:YOUR_TOKEN@github.com/pepierce/pushshare-website.git

# 푸시
git push -u origin main
```

---

## ✅ 푸시 성공 확인

푸시가 성공하면 다음과 같은 메시지가 표시됩니다:

```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/pepierce/pushshare-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

그 후 GitHub 웹사이트에서 저장소를 확인하면 파일들이 보일 것입니다.

---

## 🆘 문제 해결

### "fatal: could not read Username"
- 방법 1을 사용하여 터미널에서 직접 입력

### "fatal: Authentication failed"
- 토큰이 올바른지 확인
- 토큰에 `repo` 권한이 있는지 확인
- 토큰이 만료되지 않았는지 확인

### "Permission denied"
- 저장소가 Private인 경우 접근 권한 확인
- 토큰에 올바른 권한이 있는지 확인

---

## 📝 다음 단계

푸시가 성공하면:

1. **GitHub 웹사이트에서 확인**
   - https://github.com/pepierce/pushshare-website 접속
   - 파일들이 보이는지 확인

2. **GitHub Pages 설정**
   - 저장소 > Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `main`, Folder: `/ (root)`
   - Save

3. **웹사이트 접속 확인**
   - `https://pepierce.github.io/pushshare-website/` 접속

