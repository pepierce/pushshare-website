# 웹사이트를 별도 GitHub 저장소로 분리하는 방법

## 📋 개요

PushShare 앱 코드는 Bitbucket에서 관리하고, 웹사이트만 GitHub에서 별도로 관리하는 방법입니다.

## 🚀 설정 방법

### 1단계: GitHub에 새 저장소 생성

1. GitHub에서 **새 저장소 생성**
   - Repository name: `pushshare-website` (또는 원하는 이름)
   - Public 선택 (GitHub Pages 무료 사용)
   - "Initialize with README" 체크하지 않기
   - Create repository

### 2단계: 웹사이트 폴더를 별도 Git 저장소로 초기화

터미널에서 다음 명령어 실행:

```bash
# 1. website 폴더로 이동
cd /Users/dosusu/Documents/Personal/PushShare/website

# 2. 새로운 Git 저장소 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 첫 커밋
git commit -m "Initial commit: PushShare website"

# 5. GitHub 원격 저장소 추가 (아래 URL을 본인의 저장소 URL로 변경)
git remote add origin https://github.com/yourusername/pushshare-website.git

# 6. GitHub에 푸시
git branch -M main
git push -u origin main
```

### 3단계: 메인 프로젝트에서 website 폴더 제외 (선택사항)

메인 프로젝트(Bitbucket)에서 website 폴더를 Git에서 제외하려면:

```bash
# 메인 프로젝트 루트로 이동
cd /Users/dosusu/Documents/Personal/PushShare

# .gitignore에 website 추가 (이미 있다면 스킵)
echo "website/" >> .gitignore

# .gitignore 커밋
git add .gitignore
git commit -m "Exclude website folder from main repo"
git push origin main
```

⚠️ **주의**: 이미 website 폴더가 Bitbucket에 푸시되어 있다면, Git 히스토리에서 제거해야 합니다:

```bash
# Git 캐시에서만 제거 (로컬 파일은 유지)
git rm -r --cached website/

# 커밋 및 푸시
git commit -m "Remove website folder from main repo"
git push origin main
```

### 4단계: GitHub Pages 설정

1. GitHub 저장소 > **Settings** > **Pages**
2. Source: "Deploy from a branch"
3. Branch: `main`, Folder: `/ (root)`
4. Save

웹사이트는 `https://yourusername.github.io/pushshare-website/`에서 접근 가능합니다.

### 5단계: 개인 도메인 연결 (선택사항)

1. GitHub Pages 설정에서 Custom domain 입력
2. DNS 설정 (CNAME 또는 A 레코드)
3. `app-ads.txt`는 자동으로 `https://yourdomain.com/app-ads.txt`에서 접근 가능

---

## ✅ 장점

- ✅ 앱 코드와 웹사이트 완전 분리
- ✅ GitHub Pages 설정이 간단함
- ✅ 웹사이트만 Public으로 공개 가능
- ✅ 앱 코드는 Bitbucket에서 계속 관리

## ⚠️ 주의사항

- 웹사이트와 앱 코드가 분리되어 있어 동기화가 필요할 수 있음
- 두 저장소를 따로 관리해야 함

---

## 🔄 웹사이트 업데이트 방법

웹사이트를 수정한 후:

```bash
# website 폴더로 이동
cd /Users/dosusu/Documents/Personal/PushShare/website

# 변경사항 확인
git status

# 파일 추가
git add .

# 커밋
git commit -m "Update website: 설명"

# GitHub에 푸시
git push origin main
```

GitHub Pages는 자동으로 업데이트됩니다 (몇 분 소요).

