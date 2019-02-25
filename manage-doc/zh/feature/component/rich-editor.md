# 富文本

富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了[Tinymce](https://github.com/tinymce/tinymce)。

这里在简述一下推荐使用 tinymce 的原因：tinymce 是一家老牌做富文本的公司(这里也推荐 ckeditor，也是一家一直做富文本的公司，新版本很不错)，它的产品经受了市场的认可，不管是文档还是配置的自由度都很好。在使用富文本的时候有一点也很关键就是复制格式化，之前在用一款韩国人做的富文本 summernote 被它的格式化坑的死去活来，但 tinymce 的去格式化相当的好，它还有一些增值服务(付费插件)，最好用的就是`powerpaste`，非常的强大，支持从 word 里面复制各种东西，而且还帮你顺带格式化了。富文本还有一点也很关键，就是拓展性。楼主用 tinymce 写了好几个插件，学习成本和容易度都不错，很方便拓展。最后一点就是文档很完善，基本你想得到的配置项，它都有。tinymce 也支持按需加载，你可以通过它官方的 build 页定制自己需要的 plugins。


## Tinymce

这里来简单讲一下在自己项目中使用 `Tinymce` 的方法。

目前采用全局引用的方式。代码地址：`static/tinymce` (static 目录下的文件不会被打包), 在 index.html 中引入。并确保它的引入顺序在你的`app.js`之前！

> 由于目前使用 npm 安装 `Tinymce` 方法比较负责复杂而且还有一些问题(日后可能会采用该模式)且会大大增加编译的时间所以暂时不准备采用。:space_invader:

**使用:**
由于富文本不适合双向数据流，所以只会 watch 传入富文本的内容一次变化，之后传入内容的变化就不会再监听了，如果之后还有改变富文本内容的需求。

可以通过 `this.refs.xxx.setContent()` 手动来设置。

源码也很简单，有任何别的需求都可以在 [@/components/Tinymce](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Tinymce) 中自行修改。

```html
<tinymce :height="300" v-model="content" id='tinymce'></tinymce>
```

目前提供了如下几个属性，有需求可自行添加，或者提 issue。

| Property |         Description         |  Type  |                 Default                  |
| :------: | :-------------------------: | :----: | :--------------------------------------: |
|    id    | Component unique identifier | String | Default to help you generate a unique id |
|  value   |      Rich text content      | String |        Only monitor changes once         |
| toolbar  |      Rich text toolbar      | Array  |                    []                    |
| menubar  |      Rich text menubar      | String |   'file edit insert view format table'   |
|  height  |      Rich text height       | Number |                   360                    |

## tinymce-vue

tinymce 官方也在之前发布了 vue 版本的[tinymce-vue](https://github.com/tinymce/tinymce-vue)，帮你封装好了很多东西，但同时也相对的减少了灵活性，有兴趣的可以自行研究一下。
