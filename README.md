# 切到任意目录预览markdown文件

npm仓库里的markdown server之类的项目太多了，就不发布了。功能比较简单，没有特殊要求基本够用了。

## Usage

使用`npm link`安装到全局

``` bash
git clone <this repository>
npm install && npm link
```

命令行切到任意目录下，输入以下命令

``` bash
markdown
```

目前仅包含一个小的文件系统，预览md文件和图片，其他均为纯文本展示。想添加更多好玩的东西，自己动手吧！

### Have Fun!