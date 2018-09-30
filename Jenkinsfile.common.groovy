// Load shared devops utils
library identifier: 'devops-library@master', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'https://github.com/BCDevOps/jenkins-pipeline-shared-lib.git'
])

// Edit your app's name below
APP_NAME = 'frontend'
PROJECT_PREFIX = "jag-shuber"

// You shouldn't have to edit these if you're following the conventions
SLACK_DEV_CHANNEL="#sheriffscheduling_dev"
SLACK_MAIN_CHANNEL="#sheriff_scheduling"
SLACK_PROD_CHANNEL="sheriff_prod_approval"

PATHFINDER_URL = "pathfinder.gov.bc.ca"

class AppEnvironment{
  String name
  String tag
  String url
}

environments = [
  dev:new AppEnvironment(name:'Development',tag:'dev',url:'https://dev.jag.gov.bc.ca/sheriff-scheduling/'),
  test:new AppEnvironment(name:'Test',tag:'test',url:'https://test.jag.gov.bc.ca/sheriff-scheduling/'),
  prod:new AppEnvironment(name:'Prod',tag:'prod',url:'https://dev.jag.gov.bc.ca/sheriff-scheduling/')
]

// Gets the container hash for the latest image in an image stream
def getLatestHash(imageStreamName){
  return sh (
    script: """oc get istag ${imageStreamName}:latest -o=jsonpath='{@.image.metadata.name}' | sed -e 's/sha256://g'""",
    returnStdout: true
  ).trim()
}

def ensureBuildExists(buildConfigName,templatePath){
  if(!openshift.selector( "bc/${buildConfigName}")){
    newBuildConfig = sh ( """oc process -f "${env.WORKSPACE}/../workspace@script/${templatePath}" | oc create -f - """)
    echo ">> ${newBuildConfig}"
  }else{
    echo "Build Config '${buildConfigName}' already exists"
  }
}

def buildAndVerify(buildConfigName){
  echo "Building: ${buildConfigName}"
  openshiftBuild bldCfg: buildConfigName, showBuildLogs: 'true', waitTime: '900000'
  openshiftVerifyBuild bldCfg: buildConfigName, showBuildLogs: 'true', waitTime: '900000'
}

def tagImage(srcHash, destination, imageStream){
  openshiftTag(
    destStream: imageStream, 
    verbose: 'true', 
    destTag: destination, 
    srcStream: imageStream, 
    srcTag: srcHash, 
    waitTime: '900000'
  )
}

def deployAndVerify(srcHash, destination, imageStream){
  echo "Deploying ${APP_NAME} to ${destination}"
  tagImage(srcHash, destination, imageStream)
  // verify deployment
  openshiftVerifyDeployment(
    deploymentConfig: APP_NAME, 
    namespace: "${PROJECT_PREFIX}-${destination}", 
    waitTime: '900000'
  )
}

def notifyGood(title,description,buttons=[]){
  if(env.SLACK_HOOK){
    slackNotify(
      title,
      description,
      'good',
      env.SLACK_HOOK,
      SLACK_MAIN_CHANNEL,
      buttons
    )
  }else{
    echo "Would notify goodness via slack";
  }
}

def notifyNewDeployment(environment,url,nextButtonText){
    notifyGood(
      "New ${APP_NAME} in ${environment} 🚀",
      "Changes: ${getChangeString()}",
      [
        [
          type: "button",
          text: "View New Version",           
          url: "${url}"
        ],
        [
          type: "button",            
          text: nextButtonText,
          style: "primary",              
          url: "${currentBuild.absoluteUrl}/input"
        ]
      ]
    )
}

def notifyError(title,description){
  if(env.SLACK_HOOK){
    slackNotify(
      title,
      description,
      'danger',
      env.SLACK_HOOK,
      SLACK_DEV_CHANNEL,
      [
        [
          type: "button",
          text: "View Build Logs",
          style:"danger",        
          url: "${currentBuild.absoluteUrl}/console"
        ]
      ]
    )
  }else{
    echo "Would notify error via slack";
  }
}

def notifyDeploymentError(environment,error){
  notifyError(
    "Couldn't deploy ${APP_NAME} to ${environment} 🤕",
    "The latest deployment of the ${APP_NAME} to ${environment} seems to have failed\n'${error.message}'"
  )
}

return this