variable "prefix" {

}

variable "name" {

}

variable "subnet_name" {

}


variable "cluster_arn" {

}

variable "image" {

}

variable "envkey" {

}

variable "service_registries" {
  default = {}
}

variable "load_balancer" {
  default = {}
}

variable "container_port" {
  default = ""
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

variable "ordered_placement_strategy" {
  default = false
}

variable "placement_constraints" {
  default = false
}

variable "scheduling_strategy" {
  default = "REPLICA"
}
