#!/bin/bash
SCRIPT_DIR=`dirname $0`
echo "You should log into OpenShift and select your project before running this script."

read -p "Continue? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

params=""
params="-p IMAGE_NAMESPACE=tools"

if [ "$ok" == "y" ]; then
    echo "Deploying frontend application"
    oc process -f "$SCRIPT_DIR/templates/frontend/frontend-deploy.json" $params | oc create -f -
else
    exit 0
fi
