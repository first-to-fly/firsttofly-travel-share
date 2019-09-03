data "aws_subnet" "subnet" {
  id = "${var.subnet_id}"
}

resource "aws_alb_target_group" "alb_target_group" {
  name                 = "${var.prefix}-${var.name}"
  port                 = 80
  protocol             = "HTTP"
  target_type          = "instance"
  vpc_id               = "${data.aws_subnet.subnet.vpc_id}"
  deregistration_delay = 0

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 2
    interval            = 30
    matcher             = 200
    path                = "${var.health_check_path}"
    protocol            = "HTTP"
    timeout             = 5
  }
}

resource "aws_alb_listener_rule" "listener_rule" {
  listener_arn = "${var.alb_listener_arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.alb_target_group.arn}"
  }

  condition {
    field  = "host-header"
    values = ["${var.host_header}"]
  }
}
