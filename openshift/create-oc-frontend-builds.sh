#!/bin/bash
echo "You should log into OpenShift and select your project before running this script."

read -p "Continue? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

#params="-p GIT_REF=chained-build+slack"
params=""

if [ "$ok" == "y" ]; then
    echo "Deploying frontend builds environment..."
    echo "Deploying nginx runtime build..."
    oc process -f "./templates/nginx-runtime/nginx-runtime-build.json" $params | oc create -f -
    echo "ok \nDeploying yarn builder build..."
    oc process -f "./templates/yarn-builder/yarn-builder-build.json" $params | oc create -f -
    echo "ok \nDeploying frontend build..."
    oc process -f "./templates/frontend/frontend-build.json" $params | oc create -f -
else
    exit 0
fi
