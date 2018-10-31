<template>
  <div class="home">
    <div class="homeTopContainerBg">
      <img class="topBg" @click="clickImg" src="static/101/topBg.png" alt="">
    </div>
    <section class="videoContainer">
      <ul>
        <li v-for="(item,index) in tempData" :key="index" @click="toClickVideo(index,item)">
          <!--<img :src="require(`${item.src}`).png" alt="">-->
          <div class="starIcomContainer">
            <img :src="item.src" alt="">
          </div>

          <span>{{item.name}}</span>
          <div class="playIcon">
            <img class="toPlayIcon" :src="item.playIcon">
          </div>
        </li>
      </ul>
    </section>
    <div class="bottomBox">
      <img src="../../static/101/bottom.png" alt="">
    </div>
  </div>
</template>
<script>
  //  import video from '../components/video.vue'
  import Ajax from '../config/ajax';
  import md5 from '../config/md5'
  export default {
    data() {
      return {
        tempData: [
          {
            src: 'static/101/chenyihan.png',
            name: '陈意涵',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/chenyihan.mp4'
          },
          {
            src: 'static/101/fuqin.png',
            name: '傅菁',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/fuqing.mp4'
          },
          {
            src: 'static/101/gaoyingxi.png',
            name: '高颖浠',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/gaoyingxi.mp4'
          },
          {
            src: 'static/101/laimeiyun.png',
            name: '赖美云',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/laimeiyun.mp4'
          },
          {
            src: 'static/101/liurenyu.png',
            name: '刘人语',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/liurenyu.mp4'
          },
          {
            src: 'static/101/lvxiaoyu.png',
            name: '吕小雨',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/lvxiaoyu.mp4'
          },
          {
            src: 'static/101/qiyandi.png',
            name: '戚砚笛',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/qiyandi.mp4'
          },
          {
            src: 'static/101/wuyingxiang.png',
            name: '吴映香',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wuyinxiang.mp4'
          },
          {
            src: 'static/101/xumengjie.png',
            name: '徐梦洁',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/xumengjie.mp4'
          },
          {
            src: 'static/101/xujingyun.png',
            name: '许婧韵',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/xujingyun.mp4'
          },
          {
            src: 'static/101/yamy.png',
            name: 'Yamy',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/yamy.mp4',
          },
          {
            src: 'static/101/yangchaoyue.png',
            name: '杨超越',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/yangchaoyue.mp4',
          },
          {
            src: 'static/101/fanhui.png',
            name: '范薇',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/fanhui.mp4',
          },
          {
            src: 'static/101/jiangshen.png',
            name: '蒋申',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/jiangshen.mp4',
          },
          {
            src: 'static/101/liudanmeng.png',
            name: '刘丹萌',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/liudanmeng.mp4',
          },
          {
            src: 'static/101/luxiaocao.png',
            name: '鹿小草',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/luxiaocao.mp4',
          },
          {
            src: 'static/101/luoyitian.png',
            name: '罗怡恬',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/luoyitian.mp4',
          },
          {
            src: 'static/101/luoyijia.png',
            name: '罗奕佳',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/luoyijia.mp4',
          },
          {
            src: 'static/101/wangmohan.png',
            name: '王莫涵',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wangmohan.mp4',
          },
          {
            src: 'static/101/wangting.png',
            name: '王婷',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wangting.mp4',
          },
          {
            src: 'static/101/weijing.png',
            name: '魏瑾',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/weijing.mp4',
          },
          {
            src: 'static/101/wuqianying.png',
            name: '吴芊盈',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wuqianyin.mp4',
          },
          {
            src: 'static/101/zhaoyaoke.png',
            name: '赵尧珂',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/zhaoyaoke.mp4',
          }
        ]
      }
    },
    mounted(){
      this.addSdk('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', () => {
//        this.weReady();
      });
    },
    methods: {
      toClickVideo(index,item){
        this.$router.push('videoPage' + '/' + index);
      },

      clickImg(e){
        e.stopPropagation();

      },

      addSdk(src, cb) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.onload = function () {
          if (cb) cb();
        }
        oScript.src = src;
        oHead.appendChild(oScript);
      },

      weReady(){
        let URI = encodeURIComponent(location.href.split('#')[0]),
          title = '《创造101》小姐姐集体亮相',
          content = '快来QQ粉丝团为小姐姐打CALL吧',
          shareLink = 'https://adcdn.like000.com/adcdn/active101Page';
        (new Ajax()).sendJSON('https://h5wwj.xintiao100.com/production/' + 'wx_config', {
          user_id: '3212577',
          uri: URI,
          sign: md5({
            user_id: "3212577",
            uri: URI
          })
        }, function (data) {
          var data = data.data.config;
          let arr = [qq,'onMenuShareQQ',];
          arr.unshift('hideAllNonBaseMenuItem', 'showMenuItems');
          arr = arr.concat(data['jsApiList']);

          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: arr
          });
          wx.ready(function () {
            // //分享到朋友圈
            wx.hideAllNonBaseMenuItem();

            wx.showMenuItems({
              menuList: ["menuItem:share:appMessage","menuItem:share:qq","menuItem:share:QZone","menuItem:share:weiboApp"]
            });

            //分享到朋友圈
//          wx.onMenuShareTimeline({
//             title: title, // 分享标题
//             link: shareLink,
//             imgUrl: 'https://wwjcdn.like000.com/videoDollCatcher/icon.jpg', // 分享图标
//             success: function () {
//             },
//             cancel: function () {
//             }
//          });

            //分享给朋友
            wx.onMenuShareAppMessage({
              title: '《创造101》小姐姐集体亮相', // 分享标题
              desc: '快来QQ粉丝团为小姐姐打CALL吧', // 分享描述
              link: shareLink, // 分享链接
              imgUrl: 'https://starcdn.xintiao100.com/h5video/shareIcon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });

            //分享给QQ
            wx.onMenuShareQQ({
              title: '《创造101》小姐姐集体亮相', // 分享标题
              desc: '快来QQ粉丝团为小姐姐打CALL吧', // 分享描述
              link: shareLink, // 分享链接
              imgUrl: 'https://starcdn.xintiao100.com/h5video/shareIcon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });

            //分享都qq空间
            wx.onMenuShareQZone({
              title: '《创造101》小姐姐集体亮相', // 分享标题
              desc: '快来QQ粉丝团为小姐姐打CALL吧', // 分享描述
              link: shareLink, // 分享链接
              imgUrl: 'https://starcdn.xintiao100.com/h5video/shareIcon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });

            //分享到微博
            wx.onMenuShareWeibo({
              title: '《创造101》小姐姐集体亮相', // 分享标题
              desc: '快来QQ粉丝团为小姐姐打CALL吧', // 分享描述
              link: shareLink, // 分享链接
              imgUrl: 'https://starcdn.xintiao100.com/h5video/shareIcon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });

          })
        })
      }
    }
  }
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .videoContainer {
    padding-top: .39rem;
    width: 100%;
    /*height:2.2rem;*/
    max-width: 7.5rem;
    background-image: url('../../static/101/ulBg.jpg');
    /*background-size:100% 100%;*/

  }

  .homeTopContainerBg{
    width:100%;
    height:7.34rem;
  }

  .topBg {
    width: 100%;
    height:7.34rem;

  }

  img{ pointer-events: none; }

  .videoContainer > p {
    width: 100%;
    text-align: center;
    line-height: .4rem;
    font-size: .4rem;
    color: #fe65b7;
    /*padding:.2rem;*/
  }

  .videoContainer > ul {
    width: 7.5rem;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    -webkit-justify-content: flex-start;
    -webkit-align-content: center;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    padding: 0 .2rem;

  }

  .videoContainer > ul > li {
    /*margin: .1rem .1rem .1rem .1rem;*/
    /*!*width: 2.9rem;*!*/
    /*!*padding:0 .2rem 0 .2rem;*!*/
    /*width:calc(100% / 2 - .4rem);*/
    /*!*height:2.06rem;*!*/
    /*position: relative;*/
    /*background: url('../../static/101/borderBg.png') no-repeat;*/
    /*background-size: 100% 100%;*/

    /*!* margin: .1rem .30rem .1rem .1rem; *!*/
    /*!* width: 2.9rem; *!*/
    padding: 0 .1rem 0 .1rem;
    width: calc(100% / 2 - 0.15rem);
    /* height: 2.06rem; */
    position: relative;
    /*margin-left: .1rem;*/
    margin-bottom: .2rem;
    margin-left: .05rem;
    margin-right: 0.1rem;
    background: url('../../static/101/borderBg.png') no-repeat;
    background-size: 100% 100%;
  }

  .starIcomContainer {
    margin: 0.18rem;
    height: 2.06rem;
    overflow: hidden;
  }

  .starIcomContainer img {
    margin-top: -0.6rem;
    width: 2.9rem;
    /*height:2.06rem;*/
  }

  .videoContainer > ul > li > span {
    width: 100%;
    text-align: center;
    color: #fe65b7;
    height: .4rem;
    line-height: .4rem;
    font-size: .35rem;
    display: inline-block;
    margin-bottom: .2rem;
  }

  .playIcon {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    -webkit-justify-content: center;
    -webkit-align-content: center;
  }

  .playIcon .toPlayIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20%;
    margin-left: -10%;
    z-index: 2;
    width: .75rem;
    height: .75rem;
  }

  .bottomBox {
    margin-top: .3rem;
    width: 100%;
    height: 2.3rem;
  }

  .bottomBox img {
    width: 100%;
  }

</style>
