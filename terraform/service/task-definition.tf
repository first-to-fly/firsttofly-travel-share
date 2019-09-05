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

  container_definitions = <<JSON
  [
    {
      "name": "${var.prefix}",
      "image": "${var.image}",
      "memory": 256,
      "memoryReservation": 128,
      "cpu": 128,
      "portMappings": [
        {
          "hostPort": 0,
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "ENVKEY",
          "value": "${var.envkey}"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.cloudwatch_log_group.name}",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  JSON
}
