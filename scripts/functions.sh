#!/bin/bash

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized

function ask_yes_or_no() {
    read -p "$1 ([y]es or [N]o): "
    case $(echo $REPLY | tr '[A-Z]' '[a-z]') in
        y|yes) echo "yes" ;;
        *)     echo "no" ;;
    esac
}

function check_virtenv() {
    if [[ "$VIRTUAL_ENV" == "" ]]
    then
        echo "ERROR: Must be run in virtualenv"
        exit 0
    fi
}

function print_usage_for_node_label() {
    echo
    echo "Valid options for NODE_LABEL:"
    for i in "${!DESCRIP[@]}"; do
        printf "%s\t%s\n" "$i" "${DESCRIP[$i]}"
    done
}

function step() {
    echo "-------- $1 -----"
    echo "-------- $1 ----- RUNNING: $2"
    set -e
    eval $2
}

mkdir -p ./tmp
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

