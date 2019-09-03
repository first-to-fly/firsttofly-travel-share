output "repo_url" {
  value = "${aws_ecr_repository.ecr_repo.repository_url}"
}

output "cluster_arn" {
  value = "${aws_ecs_cluster.ecs_cluster.arn}"
}
