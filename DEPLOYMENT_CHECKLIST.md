# GitHub Pages 배포 완료 체크리스트

## ✅ 완료된 작업

### 1. 프로젝트 설정
- [x] Vite 설정 업데이트 (`base: '/lotto-predictor/'`)
- [x] GitHub Actions 워크플로우 생성 (`.github/workflows/deploy.yml`)
- [x] .gitignore 파일 생성
- [x] Git 저장소 초기화
- [x] 초기 커밋 완료

### 2. 배포 파일 생성
- [x] `GITHUB_PAGES_DEPLOYMENT.md` - 상세 배포 가이드
- [x] `deploy-gh-pages.sh` - 수동 배포 스크립트
- [x] `.github/workflows/deploy.yml` - 자동 배포 워크플로우

## 📋 다음 단계 (사용자가 수행)

### 1. GitHub 저장소 생성
1. https://github.com/new 접속
2. 저장소 이름: `lotto-predictor`
3. Public으로 설정
4. **Create repository** 클릭

### 2. 로컬 코드를 GitHub에 푸시
```bash
# GitHub 저장소 연결 (USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/USERNAME/lotto-predictor.git

# 푸시
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 활성화
1. GitHub 저장소 페이지 → **Settings** 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서 **GitHub Actions** 선택
4. 자동으로 배포 시작됨

### 4. 배포 확인
- **Actions** 탭에서 배포 진행 상황 확인
- 완료 후 `https://USERNAME.github.io/lotto-predictor/` 접속

## 🔧 중요 설정

### vite.config.js
```javascript
base: '/lotto-predictor/'  // 저장소 이름과 일치해야 함
```

**주의:** 저장소 이름을 다르게 만들었다면 `vite.config.js`의 `base` 값을 수정하세요.

## 📝 배포 명령어 요약

```bash
# 1. GitHub 저장소 연결
git remote add origin https://github.com/USERNAME/lotto-predictor.git

# 2. 메인 브랜치로 푸시
git branch -M main
git push -u origin main

# 3. 이후 업데이트 시
git add .
git commit -m "Update: 변경 내용"
git push
```

## 🌐 배포 URL
배포 완료 후 접속 가능한 URL:
```
https://USERNAME.github.io/lotto-predictor/
```

## 💡 팁
- 첫 배포는 5-10분 소요
- 이후 업데이트는 2-3분 소요
- GitHub Actions에서 자동으로 빌드 및 배포
- 무료이며 대역폭 제한 충분 (월 100GB)

## 📚 참고 문서
- 상세 가이드: `GITHUB_PAGES_DEPLOYMENT.md`
- 수동 배포: `deploy-gh-pages.sh`
