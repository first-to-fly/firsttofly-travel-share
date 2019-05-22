#!/usr/bin/env bash

# Environment Flags
set -o errexit  # Exit when a command fails
set -o pipefail # Catch mysqldump fails
set -o nounset  # Exit when using undeclared variables

# Colors
# shellcheck disable=SC2034
NO_COLOR="\033[0m"
# shellcheck disable=SC2034
BOLD_COLOR="\033[1m"
# shellcheck disable=SC2034
DIM_COLOR="\033[2m"
# shellcheck disable=SC2034
UNDERLINED_COLOR="\033[4m"
# shellcheck disable=SC2034
BLINK_COLOR="\033[5m"
# shellcheck disable=SC2034
INVERTED_COLOR="\033[7m"
# shellcheck disable=SC2034
HIDDEN_COLOR="\033[8m"

# shellcheck disable=SC2034
DEFAULT_COLOR="\033[39m"
# shellcheck disable=SC2034
BLACK_COLOR="\033[30m"
# shellcheck disable=SC2034
RED_COLOR="\033[31m"
# shellcheck disable=SC2034
GREEN_COLOR="\033[32m"
# shellcheck disable=SC2034
YELLOW_COLOR="\033[33m"
# shellcheck disable=SC2034
BLUE_COLOR="\033[34m"
# shellcheck disable=SC2034
MAGENTA_COLOR="\033[35m"
# shellcheck disable=SC2034
CYAN_COLOR="\033[36m"
# shellcheck disable=SC2034
LIGHT_GRAY_COLOR="\033[37m"
# shellcheck disable=SC2034
DARK_GRAY_COLOR="\033[90m"
# shellcheck disable=SC2034
LIGHT_RED_COLOR="\033[91m"
# shellcheck disable=SC2034
LIGHT_GREEN_COLOR="\033[92m"
# shellcheck disable=SC2034
LIGHT_YELLO_COLOR="\033[93m"
# shellcheck disable=SC2034
LIGHT_BLUE_COLOR="\033[94m"
# shellcheck disable=SC2034
LIGHT_MAGENTA_COLOR="\033[95m"
# shellcheck disable=SC2034
LIGHT_CYAN_COLOR="\033[96m"
# shellcheck disable=SC2034
WHITE_COLOR="\033[97m"

# shellcheck disable=SC2034
BG_DEFAULT_COLOR="\033[49m"
# shellcheck disable=SC2034
BG_BLACK_COLOR="\033[40m"
# shellcheck disable=SC2034
BG_RED_COLOR="\033[41m"
# shellcheck disable=SC2034
BG_GREEN_COLOR="\033[42m"
# shellcheck disable=SC2034
BG_YELLOW_COLOR="\033[43m"
# shellcheck disable=SC2034
BG_BLUE_COLOR="\033[44m"
# shellcheck disable=SC2034
BG_MAGENTA_COLOR="\033[45m"
# shellcheck disable=SC2034
BG_CYAN_COLOR="\033[46m"
# shellcheck disable=SC2034
BG_LIGHT_GRAY_COLOR="\033[47m"
# shellcheck disable=SC2034
BG_DARK_GRAY_COLOR="\033[100m"
# shellcheck disable=SC2034
BG_LIGHT_RED_COLOR="\033[101m"
# shellcheck disable=SC2034
BG_LIGHT_GREEN_COLOR="\033[102m"
# shellcheck disable=SC2034
BG_LIGHT_YELLOW_COLOR="\033[103m"
# shellcheck disable=SC2034
BG_LIGHT_BLUE_COLOR="\033[104m"
# shellcheck disable=SC2034
BG_LIGHT_MAGENTA_COLOR="\033[105m"
# shellcheck disable=SC2034
BG_LIGHT_CYAN_COLOR="\033[106m"
# shellcheck disable=SC2034
BG_WHITE_COLOR="\033[107m"

# shellcheck disable=SC2034
OK_COLOR="${GREEN_COLOR}"
# shellcheck disable=SC2034
ERROR_COLOR="${RED_COLOR}"
# shellcheck disable=SC2034
WARN_COLOR="${YELLOW_COLOR}"

# Output
function logFormat() {

  local LOCAL_SHOULD_LOG_TIME="${SHOULD_LOG_TIME:-}"

  SCRIPT_PATH=""
  for BASH_SOURCE_ITEM in "${BASH_SOURCE[@]}"; do
    if [[ "${BASH_SOURCE_ITEM}" != "${BASH_SOURCE[0]}" ]]; then
      SCRIPT_PATH="${NO_COLOR}[${BLUE_COLOR}${BASH_SOURCE_ITEM}${SCRIPT_PATH}${NO_COLOR}]"
    fi
  done

  while IFS= read -r LINE; do

    if [[ -n "${1:-}" && "${1:-}" == "--error" ]]; then

      if [[ "${LINE}" == "+ "* ]]; then
        echo
        echo -e "${BOLD_COLOR}${LINE}${NO_COLOR}"
        echo
        continue
      fi

      echo -e "${ERROR_COLOR}STDERR ${NO_COLOR}${LINE}${NO_COLOR}"
      continue

    fi

    PREFIX=""

    if [[ -n "${LOCAL_SHOULD_LOG_TIME}" ]]; then
      TIME="$(
        date +"%Y-%m-%d %H:%M:%S %Z"
      )"
      PREFIX="${PREFIX}${DARK_GRAY_COLOR}${TIME} "
    fi

    PREFIX="${PREFIX}${SCRIPT_PATH} "

    echo -e "${PREFIX}${NO_COLOR}${LINE}${NO_COLOR}"

  done
}

echo
exec 3>&1
exec > >(logFormat)
exec 2> >(logFormat --error)

# Dependencies
function dependency() {

  DEPENDENCY_NAME="${1:-}"

  if ! command -v "${DEPENDENCY_NAME}" >/dev/null; then

    echo "Dependency \"${DEPENDENCY_NAME}\" not found."

    case "${DEPENDENCY_NAME}" in
    envkey-source)
      if command -v "brew" >/dev/null; then
        (
          set -x
          brew install "envkey"
        )
      else
        (
          set -x
          curl -s "https://raw.githubusercontent.com/envkey/envkey-source/master/install.sh" | bash
        )
      fi
      ;;
    terraform)
      if command -v "brew" >/dev/null; then
        (
          set -x
          brew install "terraform"
        )
      fi
      ;;
    *)
      echo "No installation script support for \"${DEPENDENCY_NAME}\"." >&2
      exit 1
      ;;
    esac

    if ! command -v "${DEPENDENCY_NAME}" >/dev/null; then
      echo "Dependency \"${DEPENDENCY_NAME}\" not found after installing." >&2
      exit 1
    fi

  fi
}

# Try Catch
CATCHED_EXIT_CODE=0

function catch() {
  CATCHED_EXIT_CODE=${1}
}

function finally() {

  # Wait for all piped output to be printed
  sleep 0.2s

  # Clear log output
  exec 1>&3 3>&-
  echo

  exit "${CATCHED_EXIT_CODE:-}"
}
