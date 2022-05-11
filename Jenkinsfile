@Library('galactech-shared-lib')_
pipeline {
  agent any
  stages {
    stage("init"){
      steps{
        script{
          dockerLogin("https://docker.galactechstudio.com","docker-cred")
        }

      }
    }
    stage("Quality code check"){
      steps {
        script{
          sh 'sonar-scan ./payment.properties'
        }
      }
    }
    stage("build docker images"){
      steps {
        script{
            BuildImage('docker.galactechstudio.com/t7d-payment')
        }
      }
    }
    stage("push docker image"){
      steps {
        script{
            dockerPush('docker.galactechstudio.com/t7d-payment')
        }
      }   
    }
    stage("deploy auth branch") {
      steps {
        script {
          sh 'envsubst < payment.yaml | kubectl delete -f -'
          sh 'envsubst < payment.yaml | kubectl apply -f -'
        }
      }
    }
  }
  post {
    success {
            discordSend description: "T7D $BRANCH_NAME    deployed successfully", link: env.BUILD_URL, result: currentBuild.currentResult, title: BRANCH_NAME, webhookURL: "https://discord.com/api/webhooks/907974702847377411/YAW4qz0j7A3skOVVRpDiuLran7tYLe52qMtVSOzn4zs9aro1A-MkFmr3mMa9F86ZsObo"
    }
  }
}
