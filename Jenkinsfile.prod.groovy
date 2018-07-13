@Library('devops-library') _

// Edit your app's name below
def APP_NAME = 'frontend'
def FRONTEND_B = 'frontend-blue'
def FRONTEND_G = 'frontend-green'
def API_B = 'api-blue'
def API_G = 'api-green'
def PATHFINDER_URL = "pathfinder.gov.bc.ca"
def PROJECT_PREFIX = "jag-shuber"
// Edit your environment TAG names below
def TAG_NAMES = [
  'prod'
]
def APP_URLS = [
  "https://${APP_NAME}-${PROJECT_PREFIX}-${TAG_NAMES[0]}.${PATHFINDER_URL}"
]


// You shouldn't have to edit these if you're following the convention
def SLACK_DEV_CHANNEL="#sheriffscheduling_dev"
def SLACK_PROD_CHANNEL="sheriff_prod_approval"
def SLACK_MAIN_CHANNEL="#sheriff_scheduling"
def route_path="/var/lib/jenkins/jobs/jag-shuber-tools/jobs/Jag-shuber-prod-deploy"

stage('Approval notification'){
  node{
    slackNotify(
          "To Deploy ${newTarget} stack and with prod tagged image",
          'To switch to new version',
          env.SLACK_HOOK,
          SLACK_PROD_CHANNEL,
          [
            [
              type: "button",            
              text: "Approve",
              style: "primary",              
              url: url: "${currentBuild.absoluteUrl}/input"
            ]
          ])
  }
}
  // Deploying to production
  stage('Deploy ' + TAG_NAMES[0]){
    def environment = TAG_NAMES[0]
    def url = APP_URLS[0]
    timeout(time:3, unit: 'DAYS'){ input "Deploy to ${environment}?", submitter: 'ronald-garcia-admin,cjam-admin', submitterParameter: 'approvingSubmitter'}
    node{
      // Checking current targeted route
      try {
        ROUT_CHK = sh (
        script: """oc project jag-shuber-prod; if [ `oc get route sheriff-scheduling-prod -o=jsonpath='{.spec.to.weight}'` == "100" ]; then `oc get route sheriff-scheduling-prod -o=jsonpath='{.spec.to.name}' > ./route-target`; else `oc get route sheriff-scheduling-prod -o=jsonpath='{.spec.alternateBackend[*].name}' > ./route-target`; fi""")
        echo ">> ROUT_CHK: ${ROUT_CHK}"

        if ( "${newTarget}" == 'frontend-blue' ) {
          // Deploy Fontend Image to the production environment
          openshiftDeploy deploymentConfig: FRONTEND_B, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'
          openshiftVerifyDeployment deploymentConfig: FRONTEND_B, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'

          //Deploy API Image to the production environment
          openshiftDeploy deploymentConfig: API_B, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'
          openshiftVerifyDeployment deploymentConfig: API_B, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'
        }
        else{
          // Deploy Fontend Image to the production environment
          openshiftDeploy deploymentConfig: FRONTEND_G, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'
          openshiftVerifyDeployment deploymentConfig: FRONTEND_G, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'

          //Deploy API Image to the production environment
          openshiftDeploy deploymentConfig: API_G, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'
          openshiftVerifyDeployment deploymentConfig: API_G, namespace: "${PROJECT_PREFIX}-${environment}", waitTime: '900000'
        }
        slackNotify(
          "Current production stack mapped to ${currentTarget}",
          "New Version in ${environment} is ${newTarget} stack🚀",
          'To switch to new version',
          env.SLACK_HOOK,
          SLACK_MAIN_CHANNEL,
            [
              [
                type: "button",            
                text: "switch route to new version on ${newTarget} stack?",
                style: "primary",              
                url: "${currentBuild.absoluteUrl}/input"
              ]
            ])
    }catch(error){
      slackNotify(
              "Couldn't deploy to ${environment} 🤕",
              "The latest deployment of the ${newTarget} stack to ${environment} seems to have failed\n'${error.message}'",
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
            ])
            echo "Build failed"
    }
  }
  }

  // Once approved (input step) switch production over to the new version.
  stage('Switch over to new Version') {
    // Wait for administrator confirmation
    timeout(time:3, unit: 'DAYS'){ input "Switch Production from ${currentTarget} stack to ${newTarget} stack?"}
    node{
      try{
        
        // Switch blue/green
        ROUT_PATCH = sh(
        script: """oc project jag-shuber-prod; oc set route-backends sheriff-scheduling-prod ${currentTarget}=0 ${newTarget}=100;""")
        echo ">> ROUT_PATCH: ${ROUT_PATCH}"
      }catch(error){
        echo "Failed to switch route"
        throw error
      }
  }
  }

// // Functions to check currentTarget (api-blue)deployment and mark to for deployment to newTarget(api-green) & vice versa

def getCurrentTarget() {
  def currentTarget = readFile("route-target")
  return currentTarget
  }

  def getNewTarget() {
  def currentTarget = getCurrentTarget()
  def newTarget = ""
  if (currentTarget == 'frontend-blue') {
      newTarget = 'frontend-green'
  } else if (currentTarget == 'frontend-green') {
      newTarget = 'frontend-blue'
  } else {
    echo "OOPS, wrong target"
  }
  return newTarget
  }



  
