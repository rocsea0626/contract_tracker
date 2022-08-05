#!/bin/sh

export PROJECT_NAME="equipemnt-tracker-frontend"
export BUILD_SUFFIX="dev"
export STACK_NAME="$PROJECT_NAME-$BUILD_SUFFIX"
export AWS_REGION="eu-central-1"

echo "Print ENV variables: "
echo "PROJECT_NAME: $PROJECT_NAME"
echo "STACK_NAME: $STACK_NAME"
echo "AWS_REGION: $AWS_REGION"
echo "BUILD_SUFFIX: $BUILD_SUFFIX"
echo ""

echo "Build project"
npm run build

echo "List buckets in S3"
aws s3 ls

echo "Uploading stack $STACK_NAME into S3 ..."
aws s3 mb s3://"$PROJECT_NAME" --region "$AWS_REGION" 2>/dev/null
aws s3 sync ./build s3://equipemnt-tracker-frontend/


