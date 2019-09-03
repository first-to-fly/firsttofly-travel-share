data "aws_subnet" "subnet" {
  id = "${var.subnet_id}"
}

resource "aws_security_group" "security_group" {
  name        = "ecs-${var.name}"
  vpc_id      = "${data.aws_subnet.subnet.vpc_id}"
  description = "ECS Allowed Ports"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
