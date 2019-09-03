data "aws_ami" "latest_ecs" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm-2.0*x86_64-ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# data "aws_iam_instance_profile" "iam_instance_profile" {
#   name = "ecsInstanceRole"
# }

resource "aws_launch_configuration" "launch_configuration" {
  name_prefix = "ecs-${var.name}-"

  image_id      = "${data.aws_ami.latest_ecs.image_id}"
  instance_type = "t3.micro"
  # iam_instance_profile = "${data.aws_iam_instance_profile.iam_instance_profile.arn}"
  iam_instance_profile = "arn:aws:iam::348297759900:instance-profile/ecsInstanceRole"

  associate_public_ip_address = true

  key_name = "${var.name}"

  security_groups = ["${aws_security_group.security_group.id}"]

  lifecycle {
    create_before_destroy = true
  }

  user_data = "${
    replace(
      file(
        "${path.module}/user-data.sh"
      ),
      "__CLUSTER_NAME__",
      "${var.name}"
    )
  }"
}
