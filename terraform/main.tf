provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "us-east-1"
}

resource "aws_ecr_repository" "ecr_repo" {
  name = "${var.repository_name}"
}

# CLUSTERS
/*
module "CLUSTER_NAME" {
  source = "./cluster"

  name        = "CLUSTER-NAME"
  subnet_name = "${var.subnet_name}"
  image_id    = "${var.image_id}"

  ingresses = [
    {
      from_port   = 0
      to_port     = 65535
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      description = ""
    }
  ]

  egresses = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
      description = ""
    }
  ]
}
*/

# SERVICES
/*
module "SERVICE_NAME" {
  source = "./service"

  prefix      = ""
  name        = "SERVICE-NAME"
  subnet_name = "${var.subnet_name}"
  cluster_arn = "${module.CLUSTER_NAME.cluster_arn}"

  desired_count                      = 1
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  health_check_grace_period_seconds  = 0

  ordered_placement_strategy = false
  placement_constraints      = false

  scheduling_strategy = "REPLICA"

  service_registries = {
    container_port = 0
    namespace_id   = "${var.namespace_id}"
  }

  load_balancer = {
    name              = "${var.load_balancer_name}"
    container_port    = 0
    health_check_path = "/"
    host_header       = ""
  }

  requires_compatibilities = [] # "EC2", "FARGATE"

  container_definitions = [
    {
      image              = "${aws_ecr_repository.ecr_repo.repository_url}:${var.image_tag}"
      memory             = 256
      memory_reservation = 128
      cpu                = 128
      port_mappings = [
        {
          hostPort      = 0
          protocol      = "tcp"
          containerPort = 0
        }
      ]
      environment = [
        {
          name  = ""
          value = ""
        }
      ]
    }
  ]
}
/*
