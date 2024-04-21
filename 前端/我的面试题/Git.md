# 七、git面试题

## 1. 常用命令

[参考来源](https://juejin.cn/post/7196630860811075642)

- 初始化一个仓库：git init
- 查看分支：git branch
- 将已修改或未跟踪的文件添加到暂存区：git add [file] 或 git add .
- 提交至本地仓库：git commit -m "提及记录xxxx"
- 本地分支推送至远程分支：git push
- 查看当前工作目录和暂存区的状态: git status
- 查看提交的日志记录： git log
- 从远程分支拉取代码：git pull
- 合并某分支(xxx)到当前分支： git merge xxx
- 切换到分支xxx：git checkout xxx
- 创建分支xxx并切换到该分支：git checkout -b xxx
- 删除分支xxx：git branch -d xxx
- 将当前分支到改动保存到堆栈中：git stash
- 恢复堆栈中缓存的改动内容：git stash pop

## 2. git merge 和git rebase的区别？

相同点：

`git merge`和`git rebase`两个命令都⽤于从⼀个分⽀获取内容并合并到当前分⽀。

不同点：

1. `git merge`会⾃动创建⼀个新的`commit`，如果合并时遇到冲突的话，只需要修改后重新`commit`。

- 优点：能记录真实的`commit`情况，包括每个分⽀的详情
- 缺点：由于每次`merge`会⾃动产⽣⼀个`commit`，因此在使用⼀些可视化的git工具时会看到这些自动产生的`commit`，这些`commit`对于程序员来说没有什么特别的意义，多了反而会影响阅读。

1. `git rebase`会合并之前的`commit`历史。

- 优点：可以得到更简洁的提交历史，去掉了merge 产生的`commit`
- 缺点：因为合并而产生的代码问题，就不容易定位，因为会重写提交历史信息

场景：

- 当需要保留详细的合并信息，建议使⽤`git merge`, 尤其是要合并到`master`上
- 当发现⾃⼰修改某个功能时提交比较频繁，并觉得过多的合并记录信息对自己来说没有必要，那么可尝试使用`git rebase`

rebase不会产生新的提交， 而是把当前分支的每一个提交都 “复制”到目标分支上， 然后再把当前分支指向目标分支， 而merge会产生一个新的提交， 这个提交有两个分支的所有修改。

