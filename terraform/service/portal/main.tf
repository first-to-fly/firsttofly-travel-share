resource "aws_ecs_service" "service" {
  name = "${var.name}"

  task_definition                    = "${aws_ecs_task_definition.task_definition.family}:${aws_ecs_task_definition.task_definition.revision}"
  cluster                            = "${var.cluster_arn}"
  launch_type                        = "EC2"
  enable_ecs_managed_tags            = true
  desired_count                      = 1
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  health_check_grace_period_seconds  = 0

  load_balancer {
    container_name   = "${var.prefix}"
    container_port   = 3000
    target_group_arn = "${aws_alb_target_group.alb_target_group.arn}"
  }

  service_registries {
    container_name = "${var.prefix}"
    container_port = 3000
    port           = 0
    registry_arn   = "${aws_service_discovery_service.service_discovery.arn}"
  }

  ordered_placement_strategy {
    type  = "spread"
    field = "attribute:ecs.availability-zone"
  }

  ordered_placement_strategy {
    type  = "spread"
    field = "instanceId"
  }
}
