variable "prefix" {

}

variable "name" {

}

variable "subnet_name" {

}


variable "cluster_arn" {

}

variable "container_definitions" {

}

variable "service_registries" {
  description = <<EOF
  {
    name           = ""
    container_port = 0
    namespace_id   = ""
  }
  EOF
  default     = {}
}

variable "load_balancer" {
  description = <<EOF
  {
    name              = ""
    container_port    = 0
    health_check_path = "/"
    host_header       = ""
  }
  EOF
  default     = {}
}

variable "deployment_maximum_percent" {
  default = 200
}

variable "deployment_minimum_healthy_percent" {
  default = 100
}

variable "health_check_grace_period_seconds" {
  default = 0
}

variable "desired_count" {
  default = 1
}

variable "scheduling_strategy" {
  description = "The valid values are REPLICA and DAEMON"
  default     = "REPLICA"
}

variable "requires_compatibilities" {
  description = "The valid values are EC2 and FARGATE"
  default     = []
}

variable "task_placement" {
  description = "The valid values are AZBalancedSpread and OneTaskPerHost"
  default     = "AZBalancedSpread"
}
