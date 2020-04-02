#!/usr/bin/env groovy

import java.text.SimpleDateFormat
import java.util.*
import groovy.json.*


def JENKINS_CONFIG


// Declarative Pipeline
// https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline
pipeline {

  agent any

  options {
    timeout(time: 2, unit: 'HOURS')
    disableConcurrentBuilds()
  }

  // https://github.com/jenkinsci/pipeline-model-definition-plugin/wiki/Parametrized-pipelines
  // parameters {
  // }

  stages {

    stage('Setup') { steps { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {

      wrap([$class: 'BuildUser']) { script {
        try {
          env.BUILD_USER = "${BUILD_USER}"
          env.BUILD_USER_ID = "${BUILD_USER_ID}"
          env.BUILD_USER_EMAIL = "${BUILD_USER_EMAIL}"
        } catch (error) {
          env.BUILD_USER = 'Jenkins'
          env.BUILD_USER_ID = 'jenkins'
          env.BUILD_USER_EMAIL = 'itunes.dev@notabasement.com'
        }
      }}

      env.GIT_COMMITTER_NAME = sh label: 'Find Git Committer Name',
        returnStdout: true,
        script: "git --no-pager show --format='%aN' ${GIT_COMMIT}"

      env.GIT_COMMITTER_NAME = GIT_COMMITTER_NAME.split("\n")[0]

      env.GIT_COMMITTER_EMAIL = sh label: 'Find Git Committer Email',
        returnStdout: true,
        script: "git --no-pager show --format='%aE' ${GIT_COMMIT}"

      env.GIT_COMMITTER_EMAIL = GIT_COMMITTER_EMAIL.split("\n")[0]

      def JENKINS_CONFIG_JSON_STRING = readFile(file:"${WORKSPACE}/jenkins.config.json")
      JENKINS_CONFIG = new JsonSlurperClassic().parseText(JENKINS_CONFIG_JSON_STRING)

      sh "printenv | sort"

    }}}}

    stage('Install') { steps { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {

      sh "./pipeline/clean"
      sh "./pipeline/install"

    }}}}

    stage('Parallel') {

      parallel {

        stage('Integration') { steps { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {

          def PARALLELS = [:]

          PARALLELS["Lint"] = { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
            sh "./pipeline/lint"
          }}}

          boolean TESTED = false

          JENKINS_CONFIG.testEnvkey.each { BRANCH_PATTERN, TEST_ENVKEY_CREDENTIALS ->

            if (BRANCH_NAME ==~ /$BRANCH_PATTERN/) {

              echo "Matched '${BRANCH_PATTERN}'"

              JENKINS_CONFIG.testEnvkey[BRANCH_PATTERN].each { TEST_ENVKEY_CREDENTIAL ->

                if (!TEST_ENVKEY_CREDENTIAL) {
                  echo "No TEST_ENVKEY credential found."
                  return
                }

                TESTED = true

                PARALLELS["Test ${BRANCH_PATTERN}"] = { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
                  withCredentials([string(credentialsId: TEST_ENVKEY_CREDENTIAL, variable: 'ENVKEY')]) {
                    sh "./pipeline/test"
                  }
                }}}

              }
            }
          }

          if (!TESTED) {
            PARALLELS["Test without EnvKey"] = { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
              sh "./pipeline/test"
            }}}
          }

          parallel PARALLELS

        }}}}

        stage('Delivery') { steps { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {

          def PARALLELS = [:]

          boolean DELIVERED = false

          JENKINS_CONFIG.deployEnvkey.each { BRANCH_PATTERN, DEPLOY_ENVKEY_CREDENTIALS ->

            if (BRANCH_NAME ==~ /$BRANCH_PATTERN/) {

              echo "Matched '${BRANCH_PATTERN}'"

              JENKINS_CONFIG.deployEnvkey[BRANCH_PATTERN].each { DEPLOY_ENVKEY_CREDENTIAL ->

                if (!DEPLOY_ENVKEY_CREDENTIAL) {
                  echo "No DEPLOY_ENVKEY credential found."
                  return
                }

                PARALLELS["Deliver ${BRANCH_PATTERN}"] = { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
                  withCredentials([string(credentialsId: DEPLOY_ENVKEY_CREDENTIAL, variable: 'DEPLOY_ENVKEY')]) {
                    sh "./pipeline/deliver"
                    DELIVERED = true
                  }
                }}}

              }
            }
          }

          if (!DELIVERED) {
            PARALLELS["Deliver without EnvKey"] = { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
              sh "./pipeline/build"
            }}}
          }

          parallel PARALLELS

        }}}}

        stage('Deployment') { steps { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {

          def PARALLELS = [:]

          JENKINS_CONFIG.deployEnvkey.each { BRANCH_PATTERN, DEPLOY_ENVKEY_CREDENTIALS ->

            if (BRANCH_NAME ==~ /$BRANCH_PATTERN/) {

              echo "Matched '${BRANCH_PATTERN}'"

              JENKINS_CONFIG.deployEnvkey[BRANCH_PATTERN].each { DEPLOY_ENVKEY_CREDENTIAL ->

                if (!DEPLOY_ENVKEY_CREDENTIAL) {
                  echo "No DEPLOY_ENVKEY credential found."
                  return
                }

                PARALLELS["Deploy ${BRANCH_PATTERN}"] = { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
                  withCredentials([string(credentialsId: DEPLOY_ENVKEY_CREDENTIAL, variable: 'DEPLOY_ENVKEY')]) {
                    sh "./pipeline/deploy"
                  }
                }}}

              }
            }
          }

          parallel PARALLELS

        }}}}

      }
      
    }

  }

  post {

    failure { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
      sh "./.bin/slack-send-build-failure"
    }}}

    success { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) { script {
      sh "./.bin/slack-send-build-success"
    }}}
  }
}
