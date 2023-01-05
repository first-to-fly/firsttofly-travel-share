#!/usr/bin/env groovy

import java.text.SimpleDateFormat
import java.util.*
import groovy.json.*


// Declarative Pipeline
// https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline
pipeline {

  agent any

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

      sh "printenv | sort"

    }}}

    stage('CI/CD/CD') { steps { script {

      sh "./pipeline/clean"
      sh "./pipeline/install"

      def PARALLELS = [:]

      PARALLELS["Lint"] = { script {
        sh "./pipeline/lint"
      }}

      PARALLELS["Test"] = { script {
        withCredentials([
        ]) {
          sh "./pipeline/test"
        }
      }}

      PARALLELS['Deliver & Deploy'] = { script {
        withCredentials([
        ]) {
          sh "./pipeline/deliver"
          sh "./pipeline/deploy"
        }
      }}

      PARALLELS.failFast = true

      parallel PARALLELS

    }}}
  }

  post {

    failure { script {
      sh "./.bin/slack-send-build-failure"
    }}

    success { script {
      sh "./.bin/slack-send-build-success"
    }}
  }
}
