#!/bin/bash

# Google Cloud Run 배포 스크립트
# 사용법: ./deploy.sh

set -e

# 설정
PROJECT_ID="your-gcp-project-id"  # GCP 프로젝트 ID로 변경
SERVICE_NAME="lotto-predictor"
REGION="asia-northeast3"  # 서울 리전
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 로또 예측 프로그램 배포 시작..."

# 1. GCP 프로젝트 설정
echo "📋 GCP 프로젝트 설정: ${PROJECT_ID}"
gcloud config set project ${PROJECT_ID}

# 2. Docker 이미지 빌드
echo "🔨 Docker 이미지 빌드 중..."
docker build -t ${IMAGE_NAME}:latest .

# 3. Container Registry에 푸시
echo "📤 이미지를 Container Registry에 푸시 중..."
docker push ${IMAGE_NAME}:latest

# 4. Cloud Run에 배포
echo "☁️  Cloud Run에 배포 중..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --port 8080

# 5. 배포 완료
echo "✅ 배포 완료!"
echo ""
echo "서비스 URL:"
gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)'
