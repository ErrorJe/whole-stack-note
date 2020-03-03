#!/usr/bin/env sh

# 上面这句话就是让 git bash 知道这是一个可执行文件

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'docs.errorje.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# 这里原本是用 ssh 方式的 git@github 这种。但是我的仓库是 https 方式，所以改成以下方式
git push -f https://github.com/ErrorJe/whole-stack-note.git master:gh-pages

cd -