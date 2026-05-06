# 技术架构

## 1. 总体架构

```txt
GitHub
  ↓
Dokploy on 腾讯云 Ubuntu
  ↓
Next.js App Router 应用容器
  ↓
PostgreSQL 数据库容器
  ↓
Cloudflare DNS + 域名
```

## 2. 技术栈

| 模块 | 选择 | 说明 |
| --- | --- | --- |
| 前后端 | Next.js App Router | 单体全栈，适合展示型 Wiki 和 SEO |
| 语言 | TypeScript | 提升可维护性 |
| 样式 | Tailwind CSS | 快速构建信息型页面 |
| 数据库 | PostgreSQL | 存储结构化 Wiki 数据 |
| ORM | Drizzle ORM | 轻量、类型友好、贴近 SQL |
| 部署 | Dokploy | 运行在腾讯云 Ubuntu，用于练习自托管部署 |
| 容器 | Docker | 保证本地和服务器环境一致 |
| DNS | Cloudflare DNS | 买域名后统一托管解析 |
| 图片 | public/images 占位图 | 第一版不接对象存储 |

## 3. 第一版不接入的服务

| 服务 | 暂不接入原因 | 后续触发条件 |
| --- | --- | --- |
| Better Auth | 无后台和用户系统 | 需要后台、收藏、投稿或评论 |
| Upstash Redis | 展示型站点暂不需要缓存层 | 需要限流、排行榜、热点缓存 |
| Stripe | 当前无支付需求 | 出现会员或付费内容 |
| Resend | 当前无发信场景 | 登录、联系表单、订阅通知 |
| Cloudflare R2 | 图片先占位且数量少 | 图片量变大或需要后台上传 |

## 4. 数据模型方向

第一版采用结构化实体 + 双语翻译表：

- `cuts` / `cut_translations`
- `glossary_terms` / `glossary_term_translations`
- `origins` / `origin_translations`
- `grades` / `grade_translations`

后续可扩展：

- `establishments`：厂号/工厂信息。
- `trade_topics`：贸易专题。
- `breeds`：牛种。
- `processing_methods`：加工方式。
- `aging_methods`：熟成方式。

## 5. 部署约束

当前服务器为 2 核 2G 50G SSD。第一版应避免过多服务同机运行，只保留：

- Dokploy
- Traefik
- Next.js 应用
- PostgreSQL

建议服务器开启 swap，并在上线后尽快建立 PostgreSQL 备份策略。
