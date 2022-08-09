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

echo "Running unit test ..."
npm test

echo "Build project"
npm run build

echo "List buckets in S3"
aws s3 ls

echo "Uploading stack $STACK_NAME into S3 ..."
aws s3 mb s3://"$PROJECT_NAME" --region "$AWS_REGION" 2>/dev/null

echo "Configuring S3 bucket to host web app ..."
jq -r --arg variable "arn:aws:s3:::${PROJECT_NAME}/*" '.Statement[0].Resource = $variable' bucket_policy_template.json > bucket_policy.json
aws s3api put-bucket-policy --bucket $PROJECT_NAME --policy file://bucket_policy.json
aws s3 sync ./build s3://$PROJECT_NAME/
aws s3 website s3://${PROJECT_NAME}/ --index-document index.html --error-document index.html

