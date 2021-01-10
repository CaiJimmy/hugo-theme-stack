## 说明
本主题基于JimmyCai的hugo主题 `hugo-theme-stack` 进行扩展，感谢JimmyCai提供这么好的主题。

## 演示
[颢丰阁演示站点](https://www.hfge.net/)
[JimmyCai演示站点](https://theme-stack.jimmycai.com/)

## 使用说明

基于原主题的说明不再赘述，请自行查阅 jimmycai 提供相关文档。
[Documentation](https://docs.stack.jimmycai.com/) | [中文文档](https://docs.stack.jimmycai.com/v/zh-cn/)

## 本主题扩展内容

### remark42 评论系统
remark42可以通过自行部署，详细的部署方式请查阅[官方文档](https://remark42.com/) [Github](https://github.com/umputun/remark42)
需要注意的是如果采用docker方式部署，在开启Github、Google等授权时，docker需要能够顺利到访问到Github和Google等相关接口，否则授权失败。

**本主题中配置方式**
在配置文件 `config.yaml` 中的 `comments` 节点中配置
```yaml
    comments:
        enabled: true
        provider: remark42
        remark42:
            host: # 为remark42服务端地址
            site: # siteID，remark42是支持多个站点使用同一个服务端的
            locale: zh # 目前好像就支持 zh：中文和 en：英文，详见remark42官方文档
```

### 腾讯视频
腾讯视频采用短代码的方式，与原主题中提供的bilibili和youtube的使用方式一致，在需要插入视频的文章内容中加入如下代码：

```
{{<tencent vid>}}
```

其中 `vid` 请替换为对应的视频的id，通过网页版，分享等方式可以看到视频播放的地址，播放地址参数中可以查看到相关ID
示例：
QQ音乐中的MV地址：`https://y.qq.com/n/yqq/mv/v/s0035brtxrd.html` ，其中 `s0035brtxrd` 即为 `vid` 。
在腾讯视频网页版中查看视频播放地址：`https://v.qq.com/x/cover/mzc00200wn2xav5/b3216awevcw.html` , 其中 `b3216awevcw` 即为 `vid` 。

### 音乐播放器
播放器采用APlayer&MetingJ的方案来实现，不用特意开启，在需要插入音乐的页面中，添加 `Front Matter` 内容即可开启。

**支持参数如下**
|参数|说明|
|---|---|
|server|无|服务提供商，支持填写 netease，tencent，kugou，xiami，baidu，分别对应网易云音乐、QQ音乐、酷狗音乐、虾米、百度音乐，**只有在自己指定播放文件的时候无需填写该参数**|
|type|播放类型，song，playlist，album，search，artist，分别对应，单曲、播放列表、专辑、搜索结果、艺术家，**只有在自己指定播放文件的时候无需填写该参数**|
|id|播放内容的ID，如果是单曲即为单曲ID，如果是搜索可以直接输入搜索的内容**只有在自己指定播放文件的时候无需填写该参数**|
|name|歌曲名称，**如果播放自己指定的音频文件，可以定义播放内容的名称**|
|cover|音乐播放的封面，默认为站点LOGO，**如果播放自己指定的音频文件，可以定义播放内容的封面**|
|artist|艺术家，**如果播放自己指定的音频文件，可以定义播放内容的艺术家名字**|
|url|播放指定文件的地址|
|p|播放器显示的位置，before，after，fixed，分别表示插入在文章内容最前面、最后面，或在整个页面窗口左下方浮动显示，如果是放在文章前面，可以不用单独定义p参数|

示例：
在文章头部插入网易云音乐的单曲《你的答案》，在文章的front matter中添加如下代码

```yaml
audio:
  server: netease
  type: song
  id: 1400256289
  p: before
```

在整个页面左下方插入一首指定的曲目
```yaml
audio:
  name: 歌曲名称
  url: https://xxxxxxx.com/xxx.mp3
  p: fixed
  cover: https://xxxxx.com/xxx.jpg # 可以不写
  artist: 艺术家名字 # 可以不写
```