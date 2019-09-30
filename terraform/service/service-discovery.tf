resource "aws_service_discovery_service" "service_discovery" {
  count = "${lookup(var.service_registries, "name", "") != "" ? 1 : 0}"
  name  = "${lookup(var.service_registries, "name")}"

  dns_config {
    namespace_id = "${var.service_registries.namespace_id}"

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
