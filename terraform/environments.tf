data "aws_subnet" "subnet" {
  filter {
    name   = "tag:Name"
    values = ["${var.subnet_name}"]
  }
}

data "aws_alb_listener" "listener" {
  load_balancer_arn = "${data.aws_alb.alb.arn}"
  port              = "80"
}

data "aws_alb" "alb" {
  name = "${var.load_balancer_name}"
}
