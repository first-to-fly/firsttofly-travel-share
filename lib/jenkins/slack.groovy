#!/usr/bin/env groovy


String currentRunDescription() {
  return "<${JOB_URL}|${JOB_NAME.replace("%2F", "/")}> [<${BUILD_URL}|#${BUILD_NUMBER}>] by <${JENKINS_URL}user/${BUILD_USER_ID}|${BUILD_USER}>"
}


void send(Map args) { // String channel, String message, String<good|normal|warning|danger> color, Map fields, Map actions, boolean excludeParams

  def text = "${args.message.replace('#BUILD', currentRunDescription())}\n[<${BUILD_URL}/console|Console>|<${RUN_DISPLAY_URL}|BlueOcean>]\nCommit by *${GIT_COMMITTER_NAME}* ${GIT_COMMITTER_EMAIL}"
  args.actions.each { String key, String value ->
    text = "${text} [<${value}|${key}>]"
  }

  def fallback = "${args.message.replace('#BUILD', currentRunDescription())} Commit by ${GIT_COMMITTER_NAME}"

  def fields = [:]

  if (!args.excludeParams) {
    params.each { String key, String value ->
      fields[key.replace('_', ' ').split(' ').collect{it.toLowerCase().capitalize()}.join(' ').replace(' Ios ', ' iOS ')] = "${value}"
    }
  }

  if (args.fields) {
    args.fields.each { String key, String value ->
      fields[key] = value
    }
  }

  def shortFields = [:]
  def longFields = [:]

  fields.each { String key, String value ->
    if (value.length() > 0) {
      if (value.length() <= 30) {
        shortFields[key] = value
      } else {
        longFields[key] = value
      }
    }
  }

  def fieldsString = ''

  def addFields = { Map fieldsMap, boolean isShort ->

    fieldsMap.keySet().sort().each { String key ->

      def value = fieldsMap[key]

      fieldsString = """${fieldsString}
        {
          "title": "${key.replace('"', '\\"').replace('\n', '\\n')}",
          "value": "${value.replace('"', '\\"').replace('\n', '\\n')}",
          "short": ${isShort ? 'true' : 'false'}
        },"""
    }
  }

  addFields(shortFields, true)
  addFields(longFields, false)

  // Remove last ","
  if (fieldsString.length() > 0) {
    fieldsString = fieldsString.substring(0, fieldsString.length() - 1)
  }

  def attachments = """[
    {
      "color": "${args.color}",
      "pretext": "",
      "text": "${text.replace('"', '\\"').replace('\n', '\\n')}",
      "fallback": "${fallback.replace('"', '\\"').replace('\n', '\\n')}",
      "fields": [${fieldsString}]
    }
  ]"""

  slackSend \
    channel: args.channel,
    message: '',
    notifyCommitters: true,
    attachments: attachments
}


void sendStart(Map args) {

  args.color = 'normal'
  args.message = "#BUILD started."

  send(args)
}


void sendSuccess(Map args) {

  args.color = 'good'
  args.message = "#BUILD succeeded."

  send(args)
}


void sendFailure(Map args) {

  if (env.SLACK_SENT_ABORTED) {
    return
  }

  args.color = 'danger'
  args.message = "#BUILD failed."

  send(args)
}


void sendUnstable(Map args) {

  args.color = 'warning'
  args.message = "#BUILD is unstable."

  send(args)
}


void sendAborted(Map args) {

  env.SLACK_SENT_ABORTED = true

  args.color = '#000000'
  args.message = "#BUILD was aborted."

  send(args)
}


return this
