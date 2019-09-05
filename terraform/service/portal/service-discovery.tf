resource "aws_service_discovery_service" "service_discovery" {
  name = "${var.name}.${var.prefix}"

  dns_config {
    namespace_id = "${var.namespace_id}"

    dns_records {
      ttl  = 60
      type = "SRV"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 1
  }
}
