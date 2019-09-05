data "aws_subnet" "subnet" {
  filter {
    name   = "tag:Name"
    values = ["${var.subnet_name}"]
  }
}


resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.name}"
}
