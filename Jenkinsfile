#!/usr/bin/env groovy

import java.text.SimpleDateFormat
import java.util.*
import groovy.json.*


// Declarative Pipeline
// https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline
pipeline {

  agent { label 'mac' }

  options {
    timeout(time: 2, unit: 'HOURS')
    // disableConcurrentBuilds() Allows concurrency as we have milestones later
    parallelsAlwaysFailFast()
  }

  // https://github.com/jenkinsci/pipeline-model-definition-plugin/wiki/Parametrized-pipelines
  // parameters {
  // }

  stages {

    stage('Setup') { steps { script {

      // Abort previous builds of current branch
      def buildNumber = env.BUILD_NUMBER as int
      if (buildNumber > 1) milestone(buildNumber - 1)
      milestone(buildNumber)

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

      env.CONFIG_NAME = BRANCH_NAME.replaceAll("/", "_")

      sh "printenv | sort"

    }}}

    stage('Install') {

      steps { script {
        withCredentials([
          usernamePassword(credentialsId: 'a11573df-7da6-41d9-bdf5-9c6d400924e4', passwordVariable: 'BITBUCKET_PASSWORD', usernameVariable: 'BITBUCKET_USERNAME'),
        ]) {
          sh "./pipeline/install"
        }
      }}

      post {
        always {
          jiraSendBuildInfo()
        }
      }

    }

    stage('CI/CD/CD') {

      failFast true

      parallel {

        stage('Lint') { steps { script {
          sh "./pipeline/lint"
        }}}

        stage('Test') { steps { script {
          def HAS_CONFIG = false
          try {
            configFileProvider([configFile(fileId: "${CONFIG_NAME}__test", targetLocation: './.env')]) {
              echo "Config file found."
            }
            HAS_CONFIG = true
          } catch (error) {
            echo "No config file found."
          }
          if (HAS_CONFIG) {
            configFileProvider([configFile(fileId: "${CONFIG_NAME}__test", targetLocation: './.env')]) {
              sh "./pipeline/test"
            }
          } else {
            sh "./pipeline/test"
          }
        }}}

        stage('Deliver & Deploy') {

          stages {

            stage('Deliver') { steps { script {
              def HAS_CONFIG = false
              try {
                configFileProvider([configFile(fileId: "${CONFIG_NAME}__deliver", targetLocation: './.env')]) {
                  echo "Config file found."
                }
                HAS_CONFIG = true
              } catch (error) {
                echo "No config file found."
              }
              if (HAS_CONFIG) {
                configFileProvider([configFile(fileId: "${CONFIG_NAME}__deliver", targetLocation: './.env')]) {
                  sh "./pipeline/deliver"
                }
              } else {
                sh "./pipeline/deliver"
              }
            }}}

            stage('Deploy') { steps { script {
              def HAS_CONFIG = false
              try {
                configFileProvider([configFile(fileId: "${CONFIG_NAME}__deploy", targetLocation: './.env')]) {
                  echo "Config file found."
                }
                HAS_CONFIG = true
              } catch (error) {
                echo "No config file found."
              }
              if (HAS_CONFIG) {
                configFileProvider([configFile(fileId: "${CONFIG_NAME}__deploy", targetLocation: './.env')]) {
                  sh "./pipeline/deploy"
                }
              } else {
                echo "Skip deploy."
              }
            }}}

          }

        }

      }

      post {
        always {
          jiraSendDeploymentInfo environmentId: env.GIT_BRANCH, environmentName: env.GIT_BRANCH, environmentType: [
            develop: "development",
            staging: "staging",
            master: "production",
          ][env.GIT_BRANCH] ?: "unmapped"
        }
      }

    }

  }

}
