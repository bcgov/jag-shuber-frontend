// Load Common Variables and utils
common = ""
node{
  common = load "../workspace@script/Jenkinsfile.common.groovy"
}

// You shouldn't have to edit these if you're following the conventions
ARTIFACT_BUILD = common.APP_NAME+'-artifacts-build'
NGINX_BUILD = 'nginx-runtime'
RUNTIME_BUILD = common.APP_NAME+'-'+NGINX_BUILD+'-build'
YARN_BUILD = 'yarn-builder'
IMAGESTREAM_NAME = common.APP_NAME

stage('Assemble Builder & Runtime'){
  node{
    openshift.withProject(){
      // Assemble Yarn Builder
      try{        
        common.ensureBuildExists(YARN_BUILD,"openshift/templates/yarn-builder/yarn-builder-build.json")
        common.buildAndVerify(YARN_BUILD)
      }catch(error){
        common.notifyError(
          "Problem Assembling Yarn Builder 🤕",
          "Error: ${error.message}"
          )
      }
    
      // Assemble nginx Runtime
      try{
        common.ensureBuildExists(NGINX_BUILD,"openshift/templates/nginx-runtime/nginx-runtime-build.json")
        common.buildAndVerify(NGINX_BUILD)
      }catch(error){
        common.notifyError(
          "Problem Assembling nginx Runtime 🤕",
          "Error: ${error.message}"
        )
      }
        
    }
  }
}

stage('Build ' + common.APP_NAME) {
  node{
    openshift.withProject() {
      try{
        // Make sure the frontend build configs exist
        common.ensureBuildExists(ARTIFACT_BUILD,"openshift/templates/frontend/frontend-build.json")

        // trigger the Artifact build and runtime build
        common.buildAndVerify(ARTIFACT_BUILD)
        common.buildAndVerify(RUNTIME_BUILD)    
        
        // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
        // Tag the images for deployment based on the image's hash
        IMAGE_HASH = common.getLatestHash(IMAGESTREAM_NAME)          
        echo ">> IMAGE_HASH: ${IMAGE_HASH}"

      }catch(error){
        common.notifyError(
          "${common.APP_NAME} Build Broken 🤕",
          "Author:${env.CHANGE_AUTHOR_DISPLAY_NAME}\r\nError:'${error.message}'"
        )
        throw error
      }
    }
  }
}
  
  // We have Functional tests in our API project, commenting out these stages
  // as we do not currently have e2e tests within our frontend.
  // // Creating Emphemeral post-gress instance for testing
  // stage('Emphemeral Test Environment'){
  //   node{
  //     try{
  //       echo "Creating Ephemeral Postgress instance for testing"
  //       POSTGRESS = sh (
  //         script: """oc project jag-shuber-tools; oc process -f "${work_space}/openshift/test/frontend-deploy.json" | oc create -f -; oc process -f "${work_space}/openshift/test/api-postgress-ephemeral.json" | oc create -f - """)
  //         echo ">> POSTGRESS: ${POSTGRESS}" 
        
  //     } catch(error){
  //       echo "Error in creating postgress instance"
  //       throw error
  //     }
  //   }
  // }

  // //Running functional Test cases - in tools project
  // stage('Run Test Cases'){
  //   node{
  //   try{
  //     echo "Run Test Case scripts here"
  //     POSTGRESS_DEL = sh (
  //       script: """oc project jag-shuber-tools; oc process -f "${work_space}/openshift/test/frontend-deploy.json" | oc delete -f -; oc process -f "${work_space}/openshift/test/api-postgress-ephemeral.json" | oc delete -f - """)
  //       echo ">> ${POSTGRESS_DEL}"
  //     echo "postgress instance deleted successfully"
  //   } catch(error){
  //     echo "Error while test cases are running"
  //     throw error
  //     }
  //   }
  // }

// Deploying to Dev
stage("Deploy to ${common.environments.dev.name}") {
  def environment = common.environments.dev.tag
  def url = common.environments.dev.url
  node{
    try{
      common.deployAndVerify(IMAGE_HASH,environment,IMAGESTREAM_NAME)
      common.notifyNewDeployment(environment,url,"Deploy to ${common.environments.test.name}?")
    }catch(error){
      common.notifyDeploymentError(environment,error)
      throw error
    }
  }
}


// Deploying to Test
stage("Deploy to ${common.environments.test.name}") {
  def environment = common.environments.test.tag
  def url = common.environments.test.url
  timeout(time:7, unit: 'DAYS'){ input "Deploy to ${environment}?"}
  node{
    try{
      common.deployAndVerify(IMAGE_HASH,environment,IMAGESTREAM_NAME)
      common.notifyNewDeployment(environment,url,"Tag for ${common.environments.prod.name}?")
    }catch(error){
      common.notifyDeploymentError(environment,error)
      throw error
    }
  }
}

// Tag for Prod
stage("Tag for ${common.environments.prod.name}") {
  def environment = common.environments.prod.tag
  timeout(time:7, unit: 'DAYS'){ input "Tag for ${common.environments.prod.name}?"}
  node{
    try{
      common.tagImage(IMAGE_HASH,environment,IMAGESTREAM_NAME)
      common.notifyGood(
        "${common.APP_NAME} tagged for ${common.environments.prod.name}",
        "Start production pipeline to push new images"
      )
    }catch(error){
      common.notifyError(
        "Couldn't tag ${common.APP_NAME} for ${common.environments.prod.name} 🤕",
        "Error: '${error.message}'"
      )
      throw error
    }
  }
}


// STAGES FOR SUPPORTING BLUE/GREEN Deployment
//   // Deploying to production
//   stage('Tag Image to ' + TAG_NAMES[2]){
//     def environment = TAG_NAMES[2]
//     def url = APP_URLS[2]
//     timeout(time:7, unit: 'DAYS'){ input "Deploy to ${environment}?"}
//     node{
      
//       try {
//       // Check for current route target 
//       ROUT_CHK = sh (
//       script: """oc project jag-shuber-prod; if [ `oc get route sheriff-scheduling-prod -o=jsonpath='{.spec.to.weight}'` == "100" ]; then `oc get route sheriff-scheduling-prod -o=jsonpath='{.spec.to.name}' > route-target`; else `oc get route sheriff-scheduling-prod -o=jsonpath='{.spec.alternateBackend[*].name}' > route-target`; fi ; cat route-target""")
      
//       // Tag the new build as "prod"
//       openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: environment, srcStream: IMAGESTREAM_NAME, srcTag: "${IMAGE_HASH}", waitTime: '900000'

//       slackNotify(
//           "Current ${IMAGESTREAM_NAME} Image tagged to ${environment}",
//           "To Deploy ${newTarget} stack and with prod tagged image",
//           'To switch to new version',
//           env.SLACK_HOOK,
//           SLACK_PROD_CHANNEL,
//           [
//             [
//               type: "button",            
//               text: "switch route to new version on ${newTarget}?",
//               style: "primary",              
//               url: "${currentBuild.absoluteUrl}/input"
//             ]
//           ])
//     }catch(error){
//       slackNotify(
//               "Couldn't tag image to ${environment} 🤕",
//               "The latest tagging of the image to ${environment} seems to have failed\n'${error.message}'",
//               'danger',
//             env.SLACK_HOOK,
//             SLACK_DEV_CHANNEL,
//             [
//               [
//                 type: "button",
//                 text: "View Build Logs",
//                 style:"danger",        
//                 url: "${currentBuild.absoluteUrl}/console"
//               ]
//             ])
//             echo "Build failed"
//     }
//   }
//   }

//   // Once approved (input step) switch production over to the new version.
//   stage('Switch over to new production stack') {
//     // Wait for administrator confirmation
//     timeout(time:7, unit: 'DAYS'){ input id: 'Approval', message: "Switch Production stack?", submitter: 'ronald-garcia-admin', submitterParameter: 'approvingSubmitter'}
//     node{
//       try{
//         //Trigger remote job
//         def handle = build job: 'Jag-shuber-prod-deploy'
//         }catch(error){
//         echo "Failed to switch route"
//         throw error
//         }
//     }
//   }
  

// // // Functions to check currentTarget (api-blue)deployment and mark to for deployment to newTarget(api-green) & vice versa
//   def getCurrentTarget() {
//   def currentTarget = readFile("route-target")
//   return currentTarget
//   }

//   def getNewTarget() {
//   def currentTarget = getCurrentTarget()
//   def newTarget = ""
//   if (currentTarget == 'frontend-blue') {
//       newTarget = 'frontend-green'
//   } else if (currentTarget == 'frontend-green') {
//       newTarget = 'frontend-blue'
//   } else {
//     echo "OOPS, wrong target"
//   }
//   return newTarget
//   }
