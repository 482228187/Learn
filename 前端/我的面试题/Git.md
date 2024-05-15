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



## 3. 回退的命令

```
$ git reset --hard HEAD^ 回退到上个版本

$ git reset --hard HEAD~n n代表会推到n次前的操作

$ git reset --hard commit_id 进入指定commit的

```

### `git reset` 详解

`git reset`命令的作用是将指定提交之后的内容从当前分支中移除，并将HEAD指针移动到指定提交，同时将当前分支指针移动到指定提交，并将之后的提交从历史中移除。

**注意事项**

- `git reset`命令适合在单人分支，比如自己专属的`feature`分支上使用，**多人共享的分支，需慎用，防止不小心把别人提交的代码也回退了**
- 使用`git reset`命令会修改历史提交记录，所以不能直接使用`git push`推送提交到远程分支，需要使用`git push -f`命令，强制推送
- **如果不慎使用了git reset --hard <commit-hash> 命令，导致<commit-hash>之后的提交内容都被移除了，可以使用git reflog命令查看最近90天的操作记录，找到需要回滚的提交记录<reset-hash>，然后再使用git reset <reset-hash>命令进行回退，注意git reflog操作记录默认只会保留90天**



###  `git revert` 详解

`git revert`创建一个新的提交，用来撤销指定提交引入的更改，这样可以保留提交历史的完整性。

注意事项

- 新的提交历史： `git revert`创建新的提交，而不会改变现有的提交历史，这对于已经共享的分支是一种安全的操作。
- 冲突处理： 在执行`git revert`时可能会遇到冲突，需要解决冲突后再次提交。

### 区别比较



 `git revert`与`git reset`的区别

- `git revert`、`git reset`都能完成Git 记录回退代码的目的
- `git revert`相当于新增一条Git记录，不会消除已存在的记录
- `git reset` 会消除存在的记录，并且`push` 至远程需要强制推送；多人协同时，在回退期间并不能保证其他人有没有提交过代码，所以强制推送是有风险的，它容易覆盖掉其他人提交的代码

 



[参考链接：](https://juejin.cn/post/7317489683038388274 )、[参考链接](https://juejin.cn/post/7164358648343298084)、[参考链接](https://juejin.cn/post/7355692365330792488)