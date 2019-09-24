provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "us-east-1"
}

resource "aws_ecr_repository" "ecr_repo" {
  name = "${var.repository_name}"
}
