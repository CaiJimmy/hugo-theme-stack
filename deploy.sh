#!/bin/bash

# 定义颜色
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # 恢复默认颜色

echo -e "${CYAN}🚀 开始提交并推送代码...${NC}"

# 1. 将所有改动添加到暂存区
git add .

# 动态生成包含当前时间的默认提交信息
DEFAULT_MSG="更新: $(date +"%Y-%m-%d %H:%M:%S")"

# 2. 提示用户输入提交信息
echo ""
echo -e "${YELLOW}👉 请输入本次更新的说明 (直接回车默认: ${DEFAULT_MSG}): ${NC}"
read COMMIT_MSG

# 如果用户没有输入任何内容（直接敲了回车），则赋予默认的带时间的信息
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="$DEFAULT_MSG"
    echo -e "未输入内容，已自动使用默认信息: ${GREEN}${COMMIT_MSG}${NC}"
else
    echo -e "已记录你的自定义提交信息: ${GREEN}${COMMIT_MSG}${NC}"
fi

# 执行提交
git commit -m "$COMMIT_MSG"

# 3. 推送到远程分支并判断成功/失败
echo ""
echo -e "${CYAN}正在推送到 origin master...${NC}"

if git push origin master; then
    echo ""
    echo -e "${GREEN}✨ 操作完成！代码已成功推送到远程仓库。${NC}"
    echo -e "窗口将在 2 秒后自动关闭..."  # <--- 新增的提示信息在这里
    sleep 2  # 停留 2 秒让你看清成功提示，然后自动关闭窗口
    exit 0
else
    echo ""
    echo -e "${RED}❌ [失败] 推送过程中出现错误！${NC}"
    echo -e "${YELLOW}请检查网络连接，或确认是否有冲突。${NC}"
    echo ""
    # 只有失败时才需要按回车
    read -p "按回车键关闭窗口..."
    exit 1
fi