
locals {
  empty_list                 = []
  ordered_placement_strategy = ["attribute:ecs.availability-zone", "instanceId"]
  placement_constraints      = ["distinctInstance"]
}

resource "aws_ecs_service" "service" {
  name = "${var.name}"

  task_definition                    = "${aws_ecs_task_definition.task_definition.family}:${aws_ecs_task_definition.task_definition.revision}"
  cluster                            = "${var.cluster_arn}"
  launch_type                        = "EC2"
  enable_ecs_managed_tags            = true
  scheduling_strategy                = "${var.scheduling_strategy}"
  desired_count                      = "${var.desired_count}"
  deployment_maximum_percent         = "${var.deployment_maximum_percent}"
  deployment_minimum_healthy_percent = "${var.deployment_minimum_healthy_percent}"
  health_check_grace_period_seconds  = "${var.health_check_grace_period_seconds}"

  dynamic "load_balancer" {
    for_each = "${lookup(var.load_balancer, "container_port", "") != "" ? list(var.load_balancer.container_port) : local.empty_list}"
    content {
      container_name   = "${var.prefix}"
      container_port   = "${load_balancer.value}"
      target_group_arn = "${aws_alb_target_group.alb_target_group.*.arn[0]}"
    }
  }

  dynamic "service_registries" {
    for_each = "${lookup(var.service_registries, "container_port", "") != "" ? list(var.service_registries.container_port) : local.empty_list}"
    content {
      container_name = "${var.prefix}"
      container_port = "${var.container_port}"
      port           = 0
      registry_arn   = "${aws_service_discovery_service.service_discovery.*.arn[0]}"
    }
  }

  dynamic "ordered_placement_strategy" {
    for_each = "${var.ordered_placement_strategy ? local.ordered_placement_strategy : local.empty_list}"
    content {
      type  = "spread"
      field = "${ordered_placement_strategy.value}"
    }
  }

  dynamic "placement_constraints" {
    for_each = "${var.placement_constraints ? local.placement_constraints : local.empty_list}"
    content {
      type = "distinctInstance"
    }
  }
}
