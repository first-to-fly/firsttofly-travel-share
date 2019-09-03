#!/usr/bin/env bash

# Paths
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"
# __file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
# __base="$(basename "${__file}" .sh)"

# shellcheck disable=SC1090
source "${BASH_SOURCE[0]%/*}/../lib/bash/core.sh"

# Main
if [[ -z "${DEPLOY_ENVKEY:-}" && -f "./.env" ]]; then
  set -o allexport
  # shellcheck disable=SC1091
  source "./.env"
  set +o allexport
fi

if [[ -z "${DEPLOY_ENVKEY:-}" ]]; then
  echo "ERROR: Missing DEPLOY_ENVKEY." >&2
  exit 1
fi

eval "$(envkey-source "${DEPLOY_ENVKEY}")"

if [[ -z "${AWS_DEFAULT_REGION:-}" ]]; then
  AWS_DEFAULT_REGION="us-east-1"
  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION}"
fi

NAME="$(git config --get remote.origin.url | sed "s|.*/\([^.]*\)\.git|\1|g")"

NAMESPACE_ID="$(
  aws servicediscovery list-namespaces |
    jq -r ".Namespaces[] | select(.Name == \"${AWS_NAMESPACE}\") | .Id"
)"

PLAN_FILE="./terraform.tfplan"

VARIABLES='
aws_access_key = "__AWS_ACCESS_KEY_ID__"
aws_secret_key = "__AWS_SECRET_ACCESS_KEY__"
name = "__NAME__"
subnet_name = "__SUBNET_NAME__"
load_balancer_name = "__LOAD_BALANCER_NAME__"
namespace_id = "__NAMESPACE_ID__"
service_envkey = "__SERVICE_ENVKEY__"
image_tag = "__IMAGE_TAG__"
'

VARIABLES="${VARIABLES//__AWS_ACCESS_KEY_ID__/${AWS_ACCESS_KEY_ID}}"
VARIABLES="${VARIABLES//__AWS_SECRET_ACCESS_KEY__/${AWS_SECRET_ACCESS_KEY}}"
VARIABLES="${VARIABLES//__NAME__/${NAME}}"
VARIABLES="${VARIABLES//__SUBNET_NAME__/${AWS_SUBNET}}"
VARIABLES="${VARIABLES//__LOAD_BALANCER_NAME__/${AWS_LOAD_BALANCER}}"
VARIABLES="${VARIABLES//__NAMESPACE_ID__/${NAMESPACE_ID}}"
VARIABLES="${VARIABLES//__SERVICE_ENVKEY__/${SERVICE_ENVKEY}}"
VARIABLES="${VARIABLES//__IMAGE_TAG__/$(git rev-parse --short HEAD)}"

echo "${VARIABLES}" >"variables.tfvars"

terraform init

COMMAND="${1:-}"

case $COMMAND in

cluster)
  terraform plan \
    -var-file="./variables.tfvars" \
    -out="${PLAN_FILE}" \
    -target="module.${NAME}.aws_ecr_repository.ecr_repo" \
    -target="module.${NAME}.aws_ecs_cluster.ecs_cluster" \
    -target="module.${NAME}.aws_autoscaling_group.autoscaling_group" \
    -target="module.${NAME}.aws_launch_configuration.launch_configuration" \
    -target="module.${NAME}.aws_security_group.security_group"
  ;;

service)
  terraform plan \
    -var-file="./variables.tfvars" \
    -out="${PLAN_FILE}"
  ;;

esac

# if ! (terraform show "${PLAN_FILE}" | grep "This plan does nothing."); then

#   terraform show "${PLAN_FILE}"
#   # terraform apply "${PLAN_FILE}"

# fi

# git add "${STATE_FILE}"
# git commit -m ""
# git push
