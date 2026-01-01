#!/bin/bash

# GitHub Pages 수동 배포 스크립트
# GitHub Actions를 사용하지 않고 수동으로 배포할 때 사용

set -e

echo "🚀 GitHub Pages 배포 시작..."

# 1. 빌드
echo "📦 프로젝트 빌드 중..."
npm run build

# 2. dist 폴더로 이동
cd dist

# 3. Git 초기화
echo "📝 Git 설정 중..."
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# 4. GitHub Pages 브랜치로 푸시
echo "📤 GitHub Pages로 푸시 중..."
# 아래 URL을 실제 저장소 URL로 변경하세요
git push -f git@github.com:USERNAME/lotto-predictor.git main:gh-pages

cd ..

echo "✅ 배포 완료!"
echo "몇 분 후 https://USERNAME.github.io/lotto-predictor/ 에서 확인 가능합니다."
