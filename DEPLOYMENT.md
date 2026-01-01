# Google Cloud Run 배포 가이드

## 사전 준비

### 1. Google Cloud SDK 설치
```bash
# Windows (PowerShell)
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
& $env:Temp\GoogleCloudSDKInstaller.exe
```

또는 https://cloud.google.com/sdk/docs/install 에서 다운로드

### 2. GCP 프로젝트 설정
```bash
# gcloud 초기화
gcloud init

# 새 프로젝트 생성 (선택)
gcloud projects create lotto-predictor-app --name="Lotto Predictor"

# 프로젝트 설정
gcloud config set project lotto-predictor-app
```

### 3. 필요한 API 활성화
```bash
# Cloud Run API 활성화
gcloud services enable run.googleapis.com

# Container Registry API 활성화
gcloud services enable containerregistry.googleapis.com

# Cloud Build API 활성화 (자동 배포 시)
gcloud services enable cloudbuild.googleapis.com
```

### 4. Docker 인증 설정
```bash
gcloud auth configure-docker
```

## 배포 방법

### 방법 1: 배포 스크립트 사용 (권장)

1. **deploy.sh 수정**
   ```bash
   # deploy.sh 파일에서 PROJECT_ID 수정
   PROJECT_ID="your-gcp-project-id"  # 실제 프로젝트 ID로 변경
   ```

2. **스크립트 실행 권한 부여 (Linux/Mac)**
   ```bash
   chmod +x deploy.sh
   ```

3. **배포 실행**
   ```bash
   # Linux/Mac
   ./deploy.sh

   # Windows (Git Bash)
   bash deploy.sh
   ```

### 방법 2: 수동 배포

1. **Docker 이미지 빌드**
   ```bash
   docker build -t gcr.io/your-project-id/lotto-predictor:latest .
   ```

2. **이미지 푸시**
   ```bash
   docker push gcr.io/your-project-id/lotto-predictor:latest
   ```

3. **Cloud Run 배포**
   ```bash
   gcloud run deploy lotto-predictor \
     --image gcr.io/your-project-id/lotto-predictor:latest \
     --platform managed \
     --region asia-northeast3 \
     --allow-unauthenticated \
     --memory 256Mi \
     --cpu 1 \
     --min-instances 0 \
     --max-instances 10 \
     --port 8080
   ```

### 방법 3: Cloud Build 자동 배포 (CI/CD)

1. **GitHub 저장소 연결**
   - GCP Console → Cloud Build → 트리거
   - GitHub 저장소 연결

2. **빌드 트리거 생성**
   - 브랜치: `main` 또는 `master`
   - 빌드 구성: `cloudbuild.yaml`

3. **코드 푸시 시 자동 배포**
   ```bash
   git add .
   git commit -m "Deploy to Cloud Run"
   git push origin main
   ```

## 배포 후 확인

### 서비스 URL 확인
```bash
gcloud run services describe lotto-predictor \
  --region asia-northeast3 \
  --format 'value(status.url)'
```

### 로그 확인
```bash
gcloud run services logs read lotto-predictor \
  --region asia-northeast3 \
  --limit 50
```

### 서비스 상태 확인
```bash
gcloud run services list --region asia-northeast3
```

## 커스텀 도메인 설정 (선택)

1. **도메인 매핑 생성**
   ```bash
   gcloud run domain-mappings create \
     --service lotto-predictor \
     --domain your-domain.com \
     --region asia-northeast3
   ```

2. **DNS 레코드 추가**
   - GCP에서 제공하는 CNAME 레코드를 도메인 DNS에 추가

## 업데이트 및 롤백

### 새 버전 배포
```bash
# 코드 수정 후
./deploy.sh
```

### 이전 버전으로 롤백
```bash
# 리비전 목록 확인
gcloud run revisions list --service lotto-predictor --region asia-northeast3

# 특정 리비전으로 롤백
gcloud run services update-traffic lotto-predictor \
  --to-revisions REVISION_NAME=100 \
  --region asia-northeast3
```

## 비용 최적화

### 현재 설정 (무료 티어 범위 내)
- 메모리: 256MB
- CPU: 1
- 최소 인스턴스: 0 (요청 없을 때 비용 없음)
- 최대 인스턴스: 10

### 무료 티어 한도
- 월 200만 요청
- 월 36만 GB-초 (메모리 × 시간)
- 월 18만 vCPU-초

### 비용 모니터링
```bash
# 현재 월 사용량 확인
gcloud run services describe lotto-predictor \
  --region asia-northeast3 \
  --format 'value(status.traffic)'
```

## 문제 해결

### 빌드 실패
```bash
# 로컬에서 Docker 빌드 테스트
docker build -t test-image .
docker run -p 8080:8080 test-image
```

### 배포 실패
```bash
# Cloud Run 로그 확인
gcloud run services logs read lotto-predictor --region asia-northeast3

# 서비스 상세 정보 확인
gcloud run services describe lotto-predictor --region asia-northeast3
```

### 권한 오류
```bash
# 현재 계정 확인
gcloud auth list

# 프로젝트 권한 확인
gcloud projects get-iam-policy your-project-id
```

## 삭제

### 서비스 삭제
```bash
gcloud run services delete lotto-predictor --region asia-northeast3
```

### 이미지 삭제
```bash
gcloud container images delete gcr.io/your-project-id/lotto-predictor:latest
```

## 참고 자료
- [Cloud Run 공식 문서](https://cloud.google.com/run/docs)
- [Cloud Run 가격 정책](https://cloud.google.com/run/pricing)
- [Cloud Build 문서](https://cloud.google.com/build/docs)
