#!/bin/bash

# 定义颜色
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # 恢复默认颜色

echo -e "${CYAN}🚀 开始提交并推送代码...${NC}"

# 1. 将所有改动添加到暂存区
git add .

# 2. 提交更改 (固定提交信息为"更新")
git commit -m "更新"

# 3. 推送到远程的 master 分支
echo -e "${CYAN}正在推送到 origin master...${NC}"
git push origin master

echo ""
echo -e "${GREEN}✨ 操作完成！代码已成功推送到远程仓库。${NC}"

# 强行停留，直到你按回车，防止双击运行后直接消失
echo ""
read -p "按回车键关闭窗口..."