FROM node:20.15.0

# 设置工作目录
WORKDIR /app

# 设置淘宝镜像
RUN npm config set registry http://registry.npm.taobao.org/

# 安装 pnpm
RUN npm install -g pnpm@8.15.8

# 复制 pnpm 配置文件和 lockfile
# COPY pnpm-lock.yaml ./
COPY .npmrc ./

# 复制所有文件到工作目录
COPY . .

# 安装所有依赖
RUN pnpm install

# 构建项目
RUN pnpm run build

# 暴露应用端口（假设应用监听在5001端口）
EXPOSE 5001

# 启动应用（根据实际情况调整启动命令）
CMD ["pnpm", "start"]