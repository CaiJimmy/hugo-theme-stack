#!/bin/bash

# 定义颜色
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m' # 恢复默认颜色

echo -e "${CYAN}🚀 开始提交并推送代码...${NC}"

# 1. 将所有改动添加到暂存区
git add .

# 2. 提示用户输入提交信息
echo ""
echo -e "${YELLOW}👉 请输入本次更新的说明 (直接回车默认使用 '更新'): ${NC}"
read COMMIT_MSG

# 如果用户没有输入任何内容（直接敲了回车），则赋予默认值
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="更新"
    echo -e "未输入内容，已自动使用默认信息: ${GREEN}${COMMIT_MSG}${NC}"
else
    echo -e "已记录你的提交信息: ${GREEN}${COMMIT_MSG}${NC}"
fi

# 执行提交
git commit -m "$COMMIT_MSG"

# 3. 推送到远程分支
echo ""
echo -e "${CYAN}正在推送到 origin master...${NC}"
git push origin master

echo ""
echo -e "${GREEN}✨ 操作完成！代码已成功推送到远程仓库。${NC}"

# 强行停留，直到你按回车，防止双击运行后直接消失
echo ""
read -p "按回车键关闭窗口..."