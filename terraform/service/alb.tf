data "aws_subnet" "subnet" {
  filter {
    name   = "tag:Name"
    values = ["${var.subnet_name}"]
  }
}

data "aws_alb_listener" "listener" {
  count             = "${lookup(var.load_balancer, "name", "") != "" ? 1 : 0}"
  load_balancer_arn = "${data.aws_alb.alb.*.arn[count.index]}"
  port              = "80"
}

data "aws_alb" "alb" {
  count = "${lookup(var.load_balancer, "name", "") != "" ? 1 : 0}"
  name  = "${lookup(var.load_balancer, "name")}"
}


resource "aws_alb_target_group" "alb_target_group" {
  count                = "${lookup(var.load_balancer, "container_port", "") != "" ? 1 : 0}"
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
    path                = "${var.load_balancer.health_check_path}"
    protocol            = "HTTP"
    timeout             = 5
  }
}

resource "aws_alb_listener_rule" "listener_rule" {
  count        = "${lookup(var.load_balancer, "container_port", "") != "" ? 1 : 0}"
  listener_arn = "${data.aws_alb_listener.listener.*.arn[count.index]}"

  action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.alb_target_group.*.arn[count.index]}"
  }

  condition {
    field  = "host-header"
    values = ["${var.load_balancer.host_header}"]
  }
}
