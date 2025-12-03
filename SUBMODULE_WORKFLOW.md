# Website 서브모듈 작업 가이드

## 현재 상태
- Website 서브모듈이 성공적으로 초기화되었습니다
- GitHub: https://github.com/pepierce/pushshare-website.git
- Bitbucket 메인 레포지토리에도 서브모듈로 포함되어 있습니다

## 작업 흐름

### 1. Website 파일 편집
```bash
cd website
# 파일 편집 (예: index.html, styles.css 등)
```

### 2. Website 변경사항을 GitHub에 반영
```bash
cd website
git add .
git commit -m "변경사항 설명"
git push origin main
```

### 3. 메인 레포지토리(Bitbucket)에 서브모듈 변경사항 반영
```bash
cd ..  # PushShare 루트 디렉토리로 이동
git add website
git commit -m "Update website submodule"
git push origin main
```

## 주의사항
- Website 서브모듈은 독립적인 Git 저장소입니다
- Website 변경 후 반드시 두 단계로 커밋해야 합니다:
  1. Website 레포지토리에 커밋 (GitHub)
  2. 메인 레포지토리에 서브모듈 참조 업데이트 커밋 (Bitbucket)

## 서브모듈 업데이트 (다른 곳에서 변경된 경우)
```bash
git submodule update --remote website
```

