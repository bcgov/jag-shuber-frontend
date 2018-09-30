// Load Common Variables and utils
common = ""
node{
  common = load "../workspace@script/Jenkinsfile.common.groovy"
}

PROD_NAMESPACE="jag-shuber-prod"
API_DEPLOYMENT="api"
FRONTEND_DEPLOYMENT="frontend"

stage("Approval"){
  // timeout(time:3, unit: 'DAYS'){ input id:'ApprovalProd', message:"Deploy to ${environment}?", submitter: 'ronald-garcia-admin', submitterParameter: 'approvingSubmitter'}
  timeout(time:7, unit: 'DAYS'){ input "Deploy tagged API and Frontend to ${common.environments.prod.name}?"}
}

// Tag for Prod
stage("Deploy API") {
  def environment = common.environments.prod.tag
  node{
    openshift.withProject('jag-shuber-prod'){
      try{
        // Deploy API First
        openshiftDeploy(deploymentConfig:API_DEPLOYMENT,waitTime: '900000',namespace:PROD_NAMESPACE)
        openshiftVerifyDeployment(deploymentConfig:API_DEPLOYMENT,waitTime: '900000',namespace:PROD_NAMESPACE)
      }catch(error){
        common.notifyError(
          "Couldn't deploy API to ${common.environments.prod.name} 🤕",
          "Error: '${error.message}'"
        )
        throw error
      }
    }
  }
}

stage("Deploy Frontend") {
  def environment = common.environments.prod.tag
  node{
    openshift.withProject(){
      try{
        // Deploy Frontend
        openshiftDeploy(deploymentConfig:FRONTEND_DEPLOYMENT,waitTime: '900000',namespace:PROD_NAMESPACE)
        openshiftVerifyDeployment(deploymentConfig:FRONTEND_DEPLOYMENT,waitTime: '900000',namespace:PROD_NAMESPACE)
        common.notifyGood(
          "${common.APP_NAME} has been deployed to ${common.environments.prod.name} 🚀",
          "🎉",
          [
            [
              type: "button",
              text: "View New Version",           
              url: "${common.environments.prod.url}"
            ],
          ]
        )
      }catch(error){
        common.notifyError(
          "Couldn't deploy Frontend to ${common.environments.prod.name} 🤕",
          "Error: '${error.message}'"
        )
        throw error
      }
    }
  }
}
