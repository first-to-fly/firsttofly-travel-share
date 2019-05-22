#!/usr/bin/env groovy


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

    stage('Setup') { steps { script {

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

      sh "printenv | sort"
    }}}

    stage('Integration') { steps { script {
      sh "./pipeline/lint"
      sh "./pipeline/test"
    }}}

    stage('Delivery') { steps { script {
      sh "./pipeline/deliver"
    }}}

    stage('Deploy') { steps { script {
      sh "./pipeline/deploy"
    }}}
  }

  post {

    failure { script {
      echo "Failure"
    }}

    success { script {
      echo "Success"
    }}
  }
}
