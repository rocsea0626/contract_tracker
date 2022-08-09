#!/bin/sh

export PROJECT_NAME="equipment-tracker"
export BUILD_SUFFIX="dev"
export STACK_NAME="$PROJECT_NAME-$BUILD_SUFFIX"
export AWS_REGION="eu-central-1"

echo "Print ENV variables: "
echo "PROJECT_NAME: $PROJECT_NAME"
echo "STACK_NAME: $STACK_NAME"
echo "AWS_REGION: $AWS_REGION"
echo "BUILD_SUFFIX: $BUILD_SUFFIX"
echo ""

echo "List buckets in S3"
aws s3 ls

echo "Building SAM template ..."
sam build

echo "Packaging stack $STACK_NAME ..."
aws s3 mb s3://"$PROJECT_NAME" --region "$AWS_REGION" 2>/dev/null
sam package --s3-bucket "$PROJECT_NAME" --s3-prefix "$BUILD_SUFFIX" --output-template-file packaged.yaml

echo "Deploying stack $STACK_NAME ..."
sam deploy \
  --s3-bucket "$PROJECT_NAME" \
  --template-file packaged.yaml \
  --stack-name "$STACK_NAME" \
  --capabilities CAPABILITY_IAM \
  --region "$AWS_REGION"  \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
  StackName="$STACK_NAME" \
  Stage="$BUILD_SUFFIX"

export TABLE_NAME=$(aws cloudformation --region $AWS_REGION describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='EquipmentsTableName'].OutputValue" --output text)
echo "TABLE_NAME: ${TABLE_NAME}"


echo "Running integration test..."
DB_NAME="${TABLE_NAME}" AWS_SAM_STACK_NAME="$STACK_NAME" AWS_REGION="$AWS_REGION" npm run integ-test


