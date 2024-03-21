# 备忘录
> 出现奇怪bug的时候（特别是几天前还好的时候
>
记得更新`sudo apt update && sudo apt upgrade`
## MkDocs
* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.
* `mkdocs gh-deploy` - Refreash the project online.

## ufw
* `sudo ufw status` - 查看防火墙状态
* `sudo ufw enable` - 开启防火墙 （拒绝传入，允许传出）
* `sudo ufw disable` - 关闭防火墙
* `sudo systemctl stop ufw` `sudo systemctl disable ufw` - 永久关闭防火墙
