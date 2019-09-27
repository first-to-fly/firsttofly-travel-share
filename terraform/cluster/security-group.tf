locals {
  security_group_name = "ecs-${var.name}"
}

resource "aws_security_group" "security_group" {
  name        = "${local.security_group_name}"
  vpc_id      = "${data.aws_subnet.subnet.vpc_id}"
  description = "ECS Allowed Ports"

  tags = {
    Name = "${local.security_group_name}"
  }

  dynamic "ingress" {
    for_each = "${var.ingresses}"
    content {
      from_port   = "${lookup(ingress.value, "from_port")}"
      to_port     = "${lookup(ingress.value, "to_port")}"
      protocol    = "${lookup(ingress.value, "protocol")}"
      cidr_blocks = "${lookup(ingress.value, "cidr_blocks")}"
    }
  }

  dynamic "egress" {
    for_each = "${var.egresses}"
    content {
      from_port   = "${lookup(egress.value, "from_port")}"
      to_port     = "${lookup(egress.value, "to_port")}"
      protocol    = "${lookup(egress.value, "protocol")}"
      cidr_blocks = "${lookup(egress.value, "cidr_blocks")}"
    }
  }
}
