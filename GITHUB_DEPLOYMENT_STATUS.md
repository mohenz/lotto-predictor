# 로또 6/45 예측 프로그램 - GitHub 배포 현황

## 📊 현재 상태

### Git 저장소 정보
- **로컬 저장소**: ✅ 초기화 완료
- **브랜치**: master
- **커밋 수**: 1개
- **마지막 커밋**: `8f52f2c - Initial commit: Lotto 6/45 prediction app with GitHub Pages deployment`

### GitHub 연결 상태
- **원격 저장소**: ❌ 아직 연결되지 않음
- **푸시 상태**: ⏳ 대기 중

---

## 🚀 GitHub 배포 완료 방법

### 단계 1: GitHub 저장소 생성

1. **GitHub 웹사이트 접속**
   - https://github.com/new

2. **저장소 설정**
   - Repository name: `lotto-predictor`
   - Description: `로또 6/45 당첨 예측 프로그램 - AI 기반 통계 분석`
   - Public 선택
   - **중요**: "Add a README file" 체크 해제 (이미 로컬에 있음)
   - **중요**: ".gitignore" 선택 안 함 (이미 로컬에 있음)

3. **Create repository** 클릭

### 단계 2: 로컬 코드를 GitHub에 푸시

저장소 생성 후 GitHub에서 제공하는 명령어 중 "push an existing repository" 섹션 사용:

```bash
# GitHub 저장소 연결 (USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/USERNAME/lotto-predictor.git

# 브랜치 이름을 main으로 변경 (GitHub 표준)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**또는 SSH 사용 시:**
```bash
git remote add origin git@github.com:USERNAME/lotto-predictor.git
git branch -M main
git push -u origin main
```

### 단계 3: GitHub Pages 활성화

1. **저장소 페이지로 이동**
   - https://github.com/USERNAME/lotto-predictor

2. **Settings 클릭**
   - 상단 메뉴에서 Settings 선택

3. **Pages 설정**
   - 왼쪽 메뉴에서 "Pages" 클릭
   - Source: "GitHub Actions" 선택
   - 자동으로 저장됨

### 단계 4: 배포 확인

1. **Actions 탭 확인**
   - 저장소 상단의 "Actions" 탭 클릭
   - "Deploy to GitHub Pages" 워크플로우 실행 확인
   - 녹색 체크 표시가 나올 때까지 대기 (약 2-5분)

2. **배포된 사이트 접속**
   ```
   https://USERNAME.github.io/lotto-predictor/
   ```

---

## 📝 예상 GitHub 저장소 정보

배포 완료 후 정보:

### 저장소 URL
```
https://github.com/USERNAME/lotto-predictor
```

### 배포된 웹사이트 URL
```
https://USERNAME.github.io/lotto-predictor/
```

### 저장소 구조
```
lotto-predictor/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 자동 배포
├── src/                        # 소스 코드
├── public/                     # 정적 파일
├── Dockerfile                  # Docker 설정 (Cloud Run용)
├── nginx.conf                  # Nginx 설정
├── vite.config.js             # Vite 설정 (base path 포함)
├── package.json               # 프로젝트 의존성
└── README.md                  # 프로젝트 설명
```

### 브랜치
- `main`: 메인 브랜치 (소스 코드)
- `gh-pages`: GitHub Pages 배포 브랜치 (자동 생성)

---

## 🔧 문제 해결

### 푸시 시 인증 오류
```bash
# Personal Access Token 사용
# GitHub Settings → Developer settings → Personal access tokens → Generate new token
# repo 권한 선택 후 생성
# 비밀번호 대신 토큰 사용
```

### 배포 실패 시
1. Actions 탭에서 에러 로그 확인
2. `vite.config.js`의 base path 확인
3. 저장소 이름과 base path 일치 확인

---

## 📊 배포 후 기대 효과

- ✅ 전 세계 어디서나 접속 가능
- ✅ HTTPS 자동 적용 (보안)
- ✅ 무료 호스팅
- ✅ 자동 배포 (코드 푸시 시)
- ✅ 빠른 로딩 (GitHub CDN)

---

## 💡 다음 단계

배포 완료 후:
1. README.md 업데이트 (배포 URL 추가)
2. 커스텀 도메인 연결 (선택)
3. Google Analytics 추가 (선택)
4. SEO 최적화 (선택)

---

## 📞 도움이 필요하면

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
