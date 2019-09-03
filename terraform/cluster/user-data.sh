#!/bin/bash

sudo yum update -y

echo "0 * * * * sudo yum update -y" >"./mycron"
crontab "./mycron"

cat <<'EOF' >>"/etc/security/limits.conf"
* soft nofile 250000
* hard nofile 500000
EOF

cat <<'EOF' >>"/etc/sysctl.conf"

# ==> NAB's custom

# Increase number of files access
fs.file-max = 1000000

# Increase number of incoming connections
net.core.somaxconn = 65535
net.ipv4.tcp_max_tw_buckets = 1440000

# Increase system IP port limits to allow for more connections
net.ipv4.ip_local_port_range = 10000 65000
net.ipv4.tcp_window_scaling = 1

# Increase TCP buffer sizes
net.core.rmem_default = 8388608
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_congestion_control = cubic

# Other TCP options
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_tw_reuse=1
net.ipv4.tcp_tw_recycle=1

# Redis
vm.overcommit_memory = 1
EOF

sysctl -p

echo "never" | sudo tee "/sys/kernel/mm/transparent_hugepage/enabled"

cat <<'EOF' >>"/etc/rc.local"
echo "never" | sudo tee "/sys/kernel/mm/transparent_hugepage/enabled"
EOF

echo ECS_CLUSTER="__CLUSTER_NAME__" >>/etc/ecs/ecs.config
echo ECS_BACKEND_HOST= >>/etc/ecs/ecs.config

sudo reboot
