resource "aws_autoscaling_group" "autoscaling_group" {

  name = "ecs-${var.name}"

  max_size         = 1
  min_size         = 0
  desired_capacity = 1

  vpc_zone_identifier = ["${data.aws_subnet.subnet.id}"]

  launch_configuration      = "${aws_launch_configuration.launch_configuration.id}"
  health_check_type         = "EC2"
  health_check_grace_period = 0

  tag {
    key                 = "Name"
    value               = "ecs-${var.name}"
    propagate_at_launch = true
  }

  tag {
    key                 = "Description"
    value               = "This instance is the part of the Auto Scaling group which was created through ECS Console"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }
}
