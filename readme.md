# x-temp

> uni-app 通用模板
* [CSS](#css)
* [VUE](#vue)
* [JS](#js)

## 20200319更新
* tool.js 新增 saveFile() 保存文件
* tool.js 新增 shareWithSystem() 系统分享
* request.js 更新兼容api通配符"/" 格式："login", "/login", "/login/", "/login//", "login/", "login//"。api前第一个通配符调用loading()、api后第一个调用toast()，第二个延迟1000ms调用uni.navigateBack()
* components 更新 x-upload 组件 支持 "api" 参数，"change"、"upload"、"done"事件绑定

## 20200307更新
* components 新增 x-holder 占位图组件 参数 size

## 20200302更新
* tools.js 新增 richTextReplace() 富文本图片样式设置
* tools.js 新增 pwd2sha1() sha1加密，跳过空字符串

## 20200109更新
* this.fetch[api] 变更 this.$fetch[api]
* request.js 新增 this.$submit[api], this.$upload[uri], this.$download[uri]
* fetch.js 删除 新增api.js
* this.toNav[page] 变更 this.$toNav[page]
* this.tools[func] 变更 this.$tools[func]
* 全局混入 props 变更 _props

## 20200106更新
* uni.scss 调整 常规字体样式 num: 40rpx, l-title: 36rpx, title: 32rpx, body: 28rpx, sub: 24rpx, info: 20rpx
* uni.scss 新增 混合 x-ellipsis(2); 多行省略
* uni.scss 新增 继承 x-center, x-num, x-l-title, x-title, x-body, x-sub, x-info, x-hover
* App.vue 新增 样式 .x-top, .x-bottom, .x-center-col
* App.vue 调整 js 锁定竖屏代码删除 使用pages.json "globalStyle -> pageOrientation"配置
* main.js 调整 全局组件全部改为按需加载 pages.json "easycom" 节点查看
* 新增 package.json 以引入sha1库用于密码数据加密 注：需提前检测空字符
* request.js 更新 新增支持formdata提交请求 自动检测files参数：data.hasOwnProperty('files') && Object.keys(data.files).length !== 0

## CSS
* **文字**

| class/extend | size | color | other |
| :--- | :--- | :--- | :--- |
| x-num | 40rpx | #222222 | / |
| x-l-title | 36rpx | #333333 | / |
| x-title | 32rpx | #333333 | / |
| x-body | 28rpx | #333333 | / |
| x-sub | 24rpx | #666666 | / |
| x-info | 20rpx | #999999 | / |

* **布局**  
  
| class | style |
| :--- | :--- |
| .x-header | padding-top: var(--status-bar-height); |
| .x-safearea | padding-bottom: env(safe-area-inset-bottom); |
| .x-top | top: var(--window-top); |
| .x-bottom | bottom: var(--window-bottom); |
| .x-center | @extend %x-center; flex-direction: row; |
| .x-center-col | @extend %x-center; flex-direction: column; |
| .x-row | display: flex; flex-direction: row; align-items: center; |
| .x-col | display: flex; flex-direction: column; |
| .x-flex | flex: 1; overflow: hidden; |
| .x-one-line | overflow: hidden; text-overflow: ellipsis; white-space: nowrap; |
| .x-del | text-decoration: line-through; |
| .x-link | color: $main-color; |
| .x-btn-area | padding: 60rpx 30rpx; |

* **通用**

| val/mixin/% | style |
| :--- | :--- |
| $bgc | #f8f8f8 |
| $hover-bgc | $gray-6 |
| $linear | linear-gradient(to right, $second-color, $main-color) |
| $shadow | 0 2px 8px rgba(0, 0, 0, 0.15) |
| $border | 1rpx solid $gray-5 |
| $line-color | $gray-5 |
| $bg-color | $gray-6 |
| $navbar-hei | 44px |
| $tabbar-hei | 50px |
| $radius | 15rpx |
| $main-color |  |
| $second-color |  |
| @x-ellipsis | $lines: 2 |
| %x-center | flex center center |
| %x-hover | background-color: rgba($color: $hover-bgc, $alpha: 0.75); |

## VUE
* **组件**

| prefix | name | explain | type |
| :--- | :--- | :--- | :--- |
| xupload | xUpload | 上传 | easycom |
| xellipsis | xEllipsis | 文本省略 | easycom |
| xcell | xCell | 列表项 | easycom |
| xempty | xEmpty | empty data | easycom |
| xlist | xList | 列表 | easycom |
| xsection | xSection | 表单项 | easycom |
| xtabbar | xTabbar | tabbar | easycom |
| xthumb| xThumb | 头像 | easycom |
| upopup | uniPopup | 弹窗 | easycom |
| xcountdown | xCountdown | 倒计时 | easycom |

## JS
* **config**
基本配置：/config.js

* **tools**

调用：this.tools[func]

| func | explain |
| :--- | :--- |
| getStorageSync | 获取缓存 |
| chooseImage | 选择图片 |
| uploadImage | 上传图片 |
| toast | 消息提示 |
| loading | loading提示框(≤30s) |
| login | 登录 |
| share | 分享 |
| downloadFile | 下载文件 |
| saveImageToPhotosAlbum | 保存图片到系统相册 |
| openURL | 调用第三方应用 |
| updateWgt | wgt更新 |

* **fetch**

调用：this.fetch(api, data = {})

api配置：/services/fetch.js

* **router**

调用：this.toNav(url, query, type = "navigateTo")

url配置：/router.js

新增全局混入，路由传参以this.props[key]调取