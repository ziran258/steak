# 部署计划

## 1. 目标环境

- 云服务器：腾讯云 Ubuntu。
- 配置：2 核 2G RAM 50G SSD。
- 部署工具：Dokploy。
- 数据库：PostgreSQL。
- DNS：Cloudflare DNS。

## 2. 初始部署步骤

1. 购买域名。
2. 将域名 DNS 托管到 Cloudflare。
3. 腾讯云服务器安装 Docker。
4. 安装 Dokploy。
5. Dokploy 连接 GitHub 仓库。
6. 配置应用环境变量。
7. 配置 PostgreSQL 服务。
8. 构建并部署 Next.js 应用。
9. 域名 A 记录指向服务器公网 IP。
10. 在 Dokploy 配置域名和 HTTPS。

## 3. 必要环境变量

```txt
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=
NODE_ENV=production
```

## 4. 上线前检查

- 首页可以访问。
- `/zh` 和 `/en` 可访问。
- 部位列表和详情页可访问。
- 术语表可搜索和筛选。
- 数据库迁移和 seed 可执行。
- HTTPS 正常。
- 服务器磁盘和内存正常。

## 5. 备份策略

第一版上线后至少要做：

- 每日 `pg_dump`。
- 保留最近 7 天。
- 备份目录不要放在应用容器内。

后续建议：

- 备份上传到 Cloudflare R2 或腾讯云 COS。
- 增加恢复演练记录。
