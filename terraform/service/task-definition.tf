locals {
  family = "${var.prefix}-${var.name}"
}

data "aws_iam_role" "task_execution_role" {
  name = "ecsTaskExecutionRole"
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name = "/ecs/${local.family}"
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = "${local.family}"
  requires_compatibilities = []
  execution_role_arn       = "${data.aws_iam_role.task_execution_role.arn}"

  container_definitions = "${data.template_file.wrapper.rendered}"
}

data "template_file" "wrapper" {
  template = <<JSON
  [
    $${list_containers}
  ]
  JSON

  vars = {
    list_containers = "${join(",\n", data.template_file.container_definition.*.rendered)}"
  }
}

data "template_file" "container_definition" {
  count = "${length(var.container_definitions)}"
  template = "${file("${path.module}/template.tpl")}"
  vars = {
    log_group_name = "${aws_cloudwatch_log_group.cloudwatch_log_group.name}"
    entry_point = "${contains(keys(var.container_definitions[count.index]), "entry_point") ? jsonencode(lookup(var.container_definitions[count.index], "entry_point")) : "null"}"
    port_mappings = "${contains(keys(var.container_definitions[count.index]), "port_mappings") ? jsonencode(lookup(var.container_definitions[count.index], "port_mappings")) : "null"}"
    cpu = "${lookup(var.container_definitions[count.index], "cpu", 0)}"
    environment = "${contains(keys(var.container_definitions[count.index]), "environment") ? jsonencode(lookup(var.container_definitions[count.index], "environment")) : "null"}"
    memory = "${lookup(var.container_definitions[count.index], "memory")}"
    memory_reservation = "${lookup(var.container_definitions[count.index], "memory_reservation")}"
    image = "${lookup(var.container_definitions[count.index], "image")}"
    name = "${var.prefix}"
  }
}
