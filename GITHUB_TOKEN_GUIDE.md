# GitHub Personal Access Token 설정 가이드

## 🎯 웹사이트 푸시를 위한 최소 권한

웹사이트를 GitHub에 푸시하고 GitHub Pages를 사용하려면 다음 권한만 있으면 됩니다:

### 필수 권한
- ✅ **repo** - 저장소 전체 권한 (Public/Private 모두 포함)
  - `repo:status` - 커밋 상태 읽기/쓰기
  - `repo_deployment` - 배포 생성
  - `public_repo` - Public 저장소 접근
  - `repo:invite` - 저장소 초대
  - `security_events` - 보안 이벤트

### 선택 권한 (자동 배포를 위해 권장)
- ✅ **workflow** - GitHub Actions 사용 (자동 배포)

---

## 📝 권장 설정

### 옵션 1: 최소 권한 (가장 안전)
```
✅ repo (전체 체크)
```

**이것만으로도 충분합니다!**

### 옵션 2: 자동 배포까지 사용하려면
```
✅ repo (전체 체크)
✅ workflow
```

### 옵션 3: 기본값 사용 (괜찮지만 권한이 많음)
```
✅ read:user
✅ repo (전체 체크)
✅ user:email
✅ workflow
```

---

## 🔒 보안 권장사항

### 최소 권한 원칙
- 필요한 최소한의 권한만 부여
- 웹사이트 푸시만 한다면 `repo`만으로 충분
- 다른 권한(`admin:org`, `delete:packages` 등)은 불필요

### 권장 선택
```
✅ repo 만 선택
```

또는 자동 배포를 사용한다면:
```
✅ repo
✅ workflow
```

---

## ⚠️ 주의사항

### 선택하지 말아야 할 권한
- ❌ `admin:org` - 조직 관리 권한 (불필요)
- ❌ `delete:packages` - 패키지 삭제 (불필요)
- ❌ `write:packages` - 패키지 쓰기 (불필요)
- ❌ 기타 관리 권한들

### 기본값 사용해도 되는가?
- ✅ **기본값으로 둬도 됩니다**
- 하지만 보안상 최소 권한(`repo`만)을 권장합니다

---

## 🚀 최종 추천

### 가장 간단하고 안전한 설정:
```
✅ repo (전체 체크)
```

**이것만 선택하면 웹사이트 푸시와 GitHub Pages 사용이 모두 가능합니다!**

---

## 📋 체크리스트

토큰 생성 시:
- [ ] Note: "PushShare Website" (설명 입력)
- [ ] Expiration: "No expiration" 또는 원하는 기간
- [ ] Scope: **repo** 체크 (필수)
- [ ] Scope: **workflow** 체크 (자동 배포 사용 시)
- [ ] Generate token 클릭
- [ ] ⚠️ 토큰 복사해두기 (다시 볼 수 없음!)

---

## 💡 참고

- `repo` 권한은 Public과 Private 저장소 모두에 접근 가능
- `public_repo`만 선택하면 Private 저장소에는 접근 불가
- 웹사이트는 보통 Public 저장소로 관리하므로 `repo` 권한이면 충분

