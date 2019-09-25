provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "us-east-1"
}

resource "aws_ecr_repository" "ecr_repo" {
  name = "${var.repository_name}"
}

# CLUSTERS
/*module "CLUSTER_NAME" {
  source = "./cluster"

  name        = ""
  subnet_name = "${var.subnet_name}"
  image_id    = "${var.image_id}"

  ingresses = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "tcp"
      cidr_blocks = [""]
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
}*/

# SERVICES
/*module "SERVICE_NAME" {
  source = "./service"

  prefix      = ""
  name        = ""
  subnet_name = "${var.subnet_name}"
  cluster_arn = "${module.__CLUSTER__.cluster_arn}"

  service_registries = {
    container_port = 0
    namespace_id   = "${var.namespace_id}"
  }

  container_definitions = [
    {
      port_mappings = [
        {
          hostPort      = 50051
          protocol      = "tcp"
          containerPort = 50051
        }
      ]
      cpu                = 128
      memory             = 256
      memory_reservation = 128
      environment = [
        {
          name  = ""
          value = ""
        }
      ]
      image = "${aws_ecr_repository.ecr_repo.repository_url}:${var.image_tag}"
    }
  ]
}*/
