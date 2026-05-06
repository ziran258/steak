# 部署计划

## 1. 当前目标环境

- 云服务器：腾讯云 Ubuntu Server 24.04 LTS 64bit。
- SSH：`codex@101.42.22.251:22`。
- sudo：`codex` 用户免密 sudo。
- GitHub 仓库：`https://github.com/ziran258/steak`（public）。
- 域名：暂时没有，首轮用服务器公网 IP 访问。
- Cloudflare：暂未托管。
- 部署方式：先用 Docker Compose 在 VPS 跑通端到端部署；后续有域名后再切换/接入 Dokploy + HTTPS。
- 数据库：PostgreSQL Docker volume 持久化。

## 2. 首轮 VPS 部署流程（无域名）

本仓库提供 `scripts/deploy-vps.sh`，会通过 SSH 登录服务器并完成以下动作：

1. 安装服务器依赖：`ca-certificates`、`curl`、`git`、`openssl`。
2. 如服务器尚未安装 Docker，则安装 Docker Engine 与 Docker Compose Plugin。
3. 克隆或更新 GitHub 仓库到 `/opt/steak`。
4. 首次部署时在服务器 `/opt/steak/.env.production` 生成生产环境变量和随机 PostgreSQL 密码。
5. 使用 `docker-compose.vps.yml` 构建并启动 Next.js + PostgreSQL。
6. 在服务器本机执行 `curl http://127.0.0.1/` 做 smoke test。

本地执行示例：

```bash
STEAK_SSH_KEY_PATH=/path/to/codex.pem ./scripts/deploy-vps.sh
```

如果私钥内容已经放在环境变量中，可使用：

```bash
STEAK_SSH_KEY="$PRIVATE_KEY_CONTENT" ./scripts/deploy-vps.sh
```

脚本默认值：

```txt
SSH_HOST=101.42.22.251
SSH_PORT=22
SSH_USER=codex
APP_DIR=/opt/steak
GIT_REPO=https://github.com/ziran258/steak.git
BRANCH=main
SITE_URL=http://101.42.22.251
```

部署完成后访问：

```txt
http://101.42.22.251
```

> 注意：云厂商安全组需要放行 TCP 80；如果只想临时用 `3000` 端口，需要修改 `docker-compose.vps.yml` 的端口映射并放行 TCP 3000。

## 3. VPS Compose 配置说明

- `app`：从当前仓库 Dockerfile 构建 Next.js standalone 镜像，对公网暴露 `80:3000`。
- `postgres`：使用 `postgres:17-alpine`，仅在 Docker 网络内部暴露，不向公网开放 5432。
- `postgres-data`：Docker volume，保存 PostgreSQL 数据。
- `.env.production`：只保存在服务器，不提交到 Git。

服务器常用排查命令：

```bash
ssh -i /path/to/codex.pem codex@101.42.22.251
cd /opt/steak
sudo docker compose --env-file .env.production -f docker-compose.vps.yml ps
sudo docker compose --env-file .env.production -f docker-compose.vps.yml logs -f app
sudo docker compose --env-file .env.production -f docker-compose.vps.yml logs -f postgres
curl -I http://127.0.0.1/
```

## 4. 必要环境变量

```txt
POSTGRES_USER=steak
POSTGRES_PASSWORD=<server-generated-secret>
POSTGRES_DB=steak_wiki
DATABASE_URL=postgres://steak:<server-generated-secret>@postgres:5432/steak_wiki
NEXT_PUBLIC_SITE_URL=http://101.42.22.251
NODE_ENV=production
```

`DATABASE_URL`、PostgreSQL 参数和 `NEXT_PUBLIC_SITE_URL` 保存在服务器 `.env.production`；`NODE_ENV` 在 `docker-compose.vps.yml` 中注入。运行 Compose 命令时使用 `--env-file .env.production`，确保 Compose 插值和容器环境一致。

## 5. 上线前检查

- 首页可以访问。
- `/zh` 和 `/en` 可访问。
- 部位列表和详情页可访问。
- 术语表可搜索和筛选。
- PostgreSQL 容器 healthy。
- `app` 容器 restart policy 为 `unless-stopped`。
- 服务器安全组只开放必要端口：22、80；有域名和 HTTPS 后再开放/确认 443。
- 服务器磁盘和内存正常。

## 6. 后续 Dokploy + 域名阶段

有域名后再执行：

1. 购买域名。
2. 将域名 DNS 托管到 Cloudflare。
3. Cloudflare 添加 A 记录指向 `101.42.22.251`。
4. 在服务器安装 Dokploy。
5. Dokploy 连接 GitHub 仓库。
6. 在 Dokploy 配置 PostgreSQL 服务和应用环境变量。
7. 在 Dokploy 配置域名和 HTTPS。
8. 将 `NEXT_PUBLIC_SITE_URL` 改为正式 HTTPS 域名。

## 7. 备份策略

第一版上线后至少要做：

- 每日 `pg_dump`。
- 保留最近 7 天。
- 备份目录不要放在应用容器内。

后续建议：

- 备份上传到 Cloudflare R2 或腾讯云 COS。
- 增加恢复演练记录。
