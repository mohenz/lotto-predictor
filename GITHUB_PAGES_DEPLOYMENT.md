# GitHub Pages 배포 가이드

## 배포 방법 (2가지)

### 방법 1: GitHub Actions 자동 배포 (권장)

#### 1단계: GitHub 저장소 생성
1. GitHub에 로그인
2. 새 저장소 생성: `lotto-predictor`
3. Public으로 설정 (Private도 가능하지만 Pro 계정 필요)

#### 2단계: 로컬 코드를 GitHub에 푸시
```bash
# Git 초기화 (아직 안 했다면)
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Lotto predictor app"

# GitHub 저장소 연결 (USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/USERNAME/lotto-predictor.git

# 푸시
git branch -M main
git push -u origin main
```

#### 3단계: GitHub Pages 활성화
1. GitHub 저장소 페이지로 이동
2. **Settings** → **Pages** 클릭
3. **Source**에서 **GitHub Actions** 선택
4. 저장

#### 4단계: 자동 배포 확인
- 코드를 푸시하면 자동으로 빌드 및 배포
- **Actions** 탭에서 배포 진행 상황 확인
- 완료 후 `https://USERNAME.github.io/lotto-predictor/` 에서 확인

---

### 방법 2: 수동 배포

#### 1단계: 프로젝트 빌드
```bash
npm run build
```

#### 2단계: gh-pages 패키지 설치
```bash
npm install --save-dev gh-pages
```

#### 3단계: package.json에 배포 스크립트 추가
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 4단계: 배포 실행
```bash
npm run deploy
```

---

## 배포 후 확인

### URL 확인
배포 완료 후 다음 URL에서 확인:
```
https://USERNAME.github.io/lotto-predictor/
```

### 배포 상태 확인
- GitHub 저장소 → **Actions** 탭
- 또는 **Settings** → **Pages**에서 배포 URL 확인

---

## 커스텀 도메인 설정 (선택)

### 1단계: 도메인 구매
- Namecheap, GoDaddy 등에서 도메인 구매

### 2단계: DNS 설정
도메인 DNS 관리 페이지에서 다음 레코드 추가:

**A 레코드:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME 레코드 (www 서브도메인):**
```
www.yourdomain.com → USERNAME.github.io
```

### 3단계: GitHub Pages 설정
1. 저장소 **Settings** → **Pages**
2. **Custom domain**에 도메인 입력
3. **Enforce HTTPS** 체크

### 4단계: CNAME 파일 생성
`public/CNAME` 파일 생성:
```
yourdomain.com
```

---

## 문제 해결

### 404 오류
- `vite.config.js`의 `base` 경로 확인
- 저장소 이름과 일치하는지 확인

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 배포 후 변경사항이 반영 안 됨
- 브라우저 캐시 삭제 (Ctrl + Shift + R)
- GitHub Actions에서 배포 완료 확인
- 5-10분 정도 기다리기

---

## 업데이트 방법

### GitHub Actions 사용 시
```bash
# 코드 수정 후
git add .
git commit -m "Update: 변경 내용"
git push

# 자동으로 배포됨
```

### 수동 배포 시
```bash
# 코드 수정 후
npm run deploy
```

---

## 비용
- **완전 무료**
- 대역폭 제한: 월 100GB (충분함)
- 저장소 크기: 1GB 이하 권장

---

## 장점
✅ 완전 무료  
✅ HTTPS 자동 적용  
✅ 설정 간단  
✅ GitHub와 통합  
✅ 버전 관리 자동  

## 단점
⚠️ 정적 사이트만 가능 (현재 앱은 문제없음)  
⚠️ 빌드 시간 약간 소요  
⚠️ 서버 사이드 기능 불가  

---

## 참고 링크
- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
