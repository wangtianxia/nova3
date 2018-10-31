<template>
  <div class="home">
    <!--loading-->
    <transition enter-active-class="animated fadeIn" -active-class leave-active-class="animated fadeOut">
      <load class="loadCss" :loadNum="loadNum" v-if="showLoad"></load>
    </transition>
    <div class="homeBg"></div>
    <img class="ballBg" :src="ballBg" alt="">
    <img class="pink_ball" :src="pinkBall" alt="">
    <img class="starImg1" :src="starImg1" alt="">
    <img class="starImg2" :src="starImg1" alt="">
    <img class="starImg3" :src="starImg3" alt="">
    <img class="yellowImg" :src="yellowImg" alt="">
    <img class="spot1" :src="spot1" alt="">
    <img class="spot2" :src="spot2" alt="">
    <div class="topContainer">
      <section class="topContent">
        <section class="leftContent">
          <div class="numContent" v-for="(item,index) in numArr" :key="index">
            <img class="leftInfoBox" :src="`./static/num/${item}.png`" alt="">
          </div>
        </section>
        <img class="rightBtn" :src="btnImg" @click="clickA" alt="">
      </section>
      <img class="finger_img" :src="fingerImg" @click="clickA" v-if="isShowFinger" alt="">
      <img v-if="isShow1" class="rocket" :src="rocketImg" alt="">
    </div>
    <!--活动规则-->
    <div class="ruleBtn" @click="openRuleAlert()"></div>

    <div class="ruleContent" v-if="isShowRule">
      <div class="ruleFlex" @click="closeShowRule()">
        <img :src="ruleImg" alt="">
      </div>
    </div>
    <div class="videoFengMian" v-show="!isShowVideo" @click="clickToPlay()">
      <div class="fengMiancontent">
        <img :src="pauseIcon" alt="">
      </div>
    </div>
    <img class="phone_Icon" :src="phoneIcon" alt="">
    <div class="goLinkBtn" @click="goLinkBtn()"></div>
    <div class="videoContent" @click="" v-show="isShowVideo" @click="clickToPause()">
      <video ref="myVideo" webkit-playsinline="true" playsinline="true" width="500" height="180">
        <source :src="videoSrc1" type="video/mp4">
      </video>
    </div>
    <div class="toLinkOther" @click="onSubmitLink()">
      <img class="toLinkBtn" :src="toLinkBtnImg" alt="">
    </div>
    <div class="showSucess" v-show="isShowMessage">
      <span>{{messageWord}}</span>
    </div>

  </div>
</template>
<script>
  import Ajax from '../config/ajax';
  import env from '../config/env';
  import DataManager from '../dataManager/data';
  import MD5 from '../config/md5'
  import allHomeImg from '../config/img.js';
  import load from '../components/load.vue';
  import md5 from '../config/md52.js';
  export default {
    data() {
      return {
        pinkBall: './static/img/pink_ball.png',
        yellowImg: './static/img/yellow_ball.png',
        spot1: './static/img/spot1.png',
        spot2: './static/img/spot2.png',
        fingerImg: './static/img/finger.gif',

        starImg1: './static/img/star.png',
        btnImg: './static/img/add_love.png',
        rocketImg: '',
        isShow1: false,
        ballBg: './static/img/1.png',
        numArr: [],
        toLinkBtnImg: './static/img/button.png',
        itemSrc: '',
        videoSrc1: 'https://starcdn.xintiao100.com/starResources/videos/ID/nova_yyqx.mp4',
        pauseIcon: './static/img/paused.png',
        isShowVideo: false,
        ruleImg: './static/img/rule.jpg',
        isShowRule: false,
        isShowFinger: true,

        showLoad: true,
        loadNum: '',
        countIndex: 1,
        phoneIcon: './static/img/phone.png',
        starImg3: './static/img/mall_star.png',
        isShowMessage: false,
        messageWord: ''
      }
    },
    mounted(){
      this.addSdk('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', () => {
        this.weReady();
      });
      //loading。。
      let totalImg = allHomeImg.home;

      for (let i in totalImg) {
        let imgArr = new Image();
        imgArr.src = totalImg[i];
        imgArr.onload = () => {
          this.countIndex += 1;
          this.loadNum = parseInt((this.countIndex / totalImg.length) * 100) + '%';
          if (this.countIndex == totalImg.length - 1) {
            this.showLoad = false;
            setTimeout(() => {
              setInterval(() => {
                this.special();
              }, 100);
            }, 1000)
          }
        }
      }
      //获取num
      new Ajax().sendJSON(env + '/getNovaTotalThumbsUp', {}, (res) => {
//      alert(JSON.stringify(res));
        if (res['st'] == 1) {
          this.numArr = [];
          let tempNum = res['data']['num'] + '';
          for (let j = 0; j < tempNum.length; j++) {
            this.numArr.push(tempNum[j].split(','))
          }
          let num = (res['data']['num'] + '').length;

          let chaNum = 8 - num;
          for (let i = 1; i <= chaNum; i++) {
            this.numArr.unshift(0);
//            console.log(this.numArr,'--------')
          }
        } else if (res['st'] == 2) {

        }
      });
    },
    methods: {
      init(){
        setInterval(() => {  //地球帧动画
          this.special();
        }, 50);
      },
      addZero(str){
        str = str.toString();
        if (str.length < 9) {
          str = '0' + str;
        }
        return str;
      },
      //分享

      //旋转地球
      special(){
        let index = 0;
        if (this.setIntervalTime) {
          return;
        }
        this.setIntervalTime = setInterval(() => {
          index += 1;
//        this.ballBg = './static/img/' + index + '.png';
          this.ballBg = `static/img/${index}.png`;   //图片缓存，使用图片
          if (index >= 50) {
            this.ballBg = `static/img/1.png`;
            clearInterval(this.setIntervalTime);
            this.setIntervalTime = null;
          }
        }, 100);
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
        let URI = encodeURIComponent(location.href.split('#')[0]),  //http://123.206.205.184:3001  location.href
          title = '守护千玺 点亮nova星',
          content = '聚能点亮神秘nova星球，守护爱豆赢好礼',
          shareLink = 'https://adcdn.like000.com/adcdn/addLovePop/index.html',
          imgUrl = 'https://adcdn.like000.com/adcdn/addLovePop/novaShareIcon.jpg';

        (new Ajax()).sendJSON('https://sf.xintiao100.com/' + 'makeConfig', {
          uri: URI,
        }, (data) => {

          var data = data.data;
          let arr = ['qq', 'onMenuShareQQ'];
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
            wx.showMenuItems({//novaShareIcon.jpg
              menuList: ["menuItem:share:timeline", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:share:weiboApp"]
            });

            let config = {
              title: title,
              desc: content,
              link: shareLink,
              imgUrl: imgUrl,
              success: function () {
              },
              cancel: function () {
              }
            };
            /*分享给朋友*/
            wx.onMenuShareAppMessage(config);

            /*分享到QQ*/
            wx.onMenuShareQQ(config);

            /*分享到腾讯微博*/
            wx.onMenuShareWeibo(config);

            /*分享到QQ空间*/
            wx.onMenuShareQZone(config);

            /*分享到朋友圈*/
            config.title = desc;
            /*分享到朋友圈没有desc字段，取title*/
            wx.onMenuShareTimeline(config);

          });

          wx.error(function (res) {
            alert(JSON.stringify(res))
          });
        })
      },
      //点赞
      clickA(){
        new Ajax().sendJSON(env + '/novaThumbsUp', {}, (res) => {
          if (res['st'] == 1) {
            this.btnImg = './static/img/btn.gif';
            setTimeout(() => {
              this.btnImg = './static/img/add_love.png';
              this.isShow1 = true;    //
              this.rocketImg = 'static/img/rocket.gif'
            }, 800);
            new Ajax().sendJSON(env + '/getNovaTotalThumbsUp', {}, (res) => {
              if (res['st'] == 1) {
                this.numArr = [];
                let tempNum = res['data']['num'] + '';
                for (let j = 0; j < tempNum.length; j++) {
                  this.numArr.push(tempNum[j].split(','))
                }
                let num = (res['data']['num'] + '').length;

                let chaNum = 8 - num;
                for (let i = 1; i <= chaNum; i++) {
                  this.numArr.unshift(0);
                }
              } else if (res['st'] == 2) {

              }
            });
          } else if (res['st'] == 2) {
            this.isShow1 = false;
            this.btnImg = './static/img/btn.gif';
            setTimeout(() => {
              this.isShowMessage = false;
              this.btnImg = './static/img/add_love.png';
            }, 1000);
            this.isShowMessage = true;
            this.isShowMessage1();
          }
        });
        setTimeout(() => {
          this.isShow1 = false;
        }, 800)

      },

      isShowMessage1(){
        this.messageWord = '您今天的3次机会已用完!'
      },
      //统计
      onSubmitLink(){
        new Ajax().sendJSON(env + '/linkPvStatistics', {type:1}, (res) => {
          if (res['st'] == '1') {
            console.log('成功！');
          }
          window.location.href = 'http://clickc.admaster.com.cn/c/a111418,b2738779,c2,i0,m101,8a2,8b2,h'
        })

      },
      goLinkBtn(){
        /*视频顶部按钮*/
        new Ajax().sendJSON(env + '/linkPvStatistics', {type:2}, (res) => {
          if (res['st'] == '1') {
            console.log('成功！');
          }
          window.location.href = 'https://item.m.jd.com/product/8026730.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ShareTm=WI47v1wnYMnfbcIj3vVhBKLkkW0N%2BAnFp2MH9ORgoIszTYsjzLwA5b6D3q/DVbtNH/croCqBwV3kTX3d031qh1%2BBUI/ELotANdpWsguO09frKgkHDAtByCEGujUwj48ETYGupfYkTQSPWEOeSWmPDNoi1GhfcJ7e6torpmxOjng=&from=groupmessage&isappinstalled=0'
        })
      },
      /*播放*/
      clickToPlay(){
        this.isShowVideo = false;
        let myVideo = this.myVideo = this.$refs.myVideo;
        this.myVideo.play();
        myVideo.addEventListener('play', (e) => {
          this.isShowVideo = true;
        });
        myVideo.addEventListener('ended', (e) => {
          this.isShowVideo = false;
        });
        myVideo.addEventListener('pause', (e) => {
          this.isShowVideo = false;
        });
      },
      clickToPause(){
        this.isShowVideo = false;
        let myVideo = this.myVideo = this.$refs.myVideo;
        if (myVideo.paused) {
          this.isShowVideo = true;

          myVideo.play()
        } else {
          this.isShowVideo = false;
          myVideo.pause();
        }
      },
      openRuleAlert(){
        this.isShowRule = true;
      },
      closeShowRule(){
        this.isShowRule = false;
      }
    },
    components: {
        load
    }
  }
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(172, 189, 210);
    max-width: 7.5rem;
  }

  .ballBg {
    height: 6rem;
    position: absolute;
    left: 8%;
    z-index: 5;
    top: 1.7rem;
  }

  .homeBg {
    width: 100%;
    height: 15.49rem;
    position: absolute;
    background: url('../../static/img/h5_bg.jpg') no-repeat;
    background-size: 100% 100%;

  }

  .starImg1 {
    height: 2rem;
    position: absolute;
    top: 4rem;
    left: .5rem;
    z-index: 5;
    animation: starActive 2s ease-in infinite 1s;
    animation-fill-mode: both;
  }

  .starImg2 {
    height: 1.5rem;
    position: absolute;
    top: 2.5rem;
    right: 1.5rem;
    z-index: 5;
    animation: starActive 2s ease-out 0.5s infinite;
    animation-fill-mode: both;
  }

  .topContainer {
    width: 100%;
    position: absolute;
    top: 7rem;
    z-index: 5;

  }

  .topContent {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .leftContent {
    margin-left: 1.83rem;
    height: 1.22rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .rightBtn {
    height: 1.14rem;
    margin-right: 1rem;
  }

  /*火箭发射*/
  .rocket {
    height: 1.5rem;
    position: absolute;
    right: 0;
    top: -0.5rem;
    animation: rocketX 1.5s ease-out forwards, rocketY 1.5s ease-out forwards;
  }

  @keyframes rocketX {
    0% {
      right: 1.5rem;
      opacity: 1;
      transform: scale(1.9);
    }
    50% {
      right: 3rem;
      opacity: 1;
      transform: scale(1.3);
    }
    100% {
      right: 4rem;
      opacity: 0;
      transform: scale(.3);
    }
  }

  @keyframes rocketY {
    0% {
      top: -1rem;
      opacity: 1;
      transform: scale(1.9);
    }
    50% {
      top: -3rem;
      opacity: 1;
      transform: scale(1.3);
    }
    100% {
      top: -4rem;
      opacity: 0;
      transform: scale(.3);
    }
  }

  /*跳转按钮*/
  .toLinkOther {
    width: 100%;
    height: 1.58rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    text-align: center;
  }

  .toLinkBtn {
    width: 5.13rem;
    height: 1.58rem;
    font-size: .3rem;
    border-radius: 10rem;
  }

  /*曲线动画*/
  @keyframes stylie-keyframes {
    0% {
      transform: translate(0px, 0px) scale(1);
      opacity: 1;
    }
    3.33% {
      transform: translate(-0.4267px, -18.2px) scale(0.9667);
      opacity: 1
    }
    6.67% {
      transform: translate(-1.7067px, -36.4px) scale(0.9333);
      opacity: 1
    }
    10% {
      transform: translate(-3.84px, -54.6px) scale(0.9);
      opacity: 1
    }
    13.33% {
      transform: translate(-6.8267px, -72.8px) scale(0.8667);
      opacity: 1
    }
    16.67% {
      transform: translate(-10.6667px, -91px) scale(0.8333);
      opacity: 1
    }
    20% {
      transform: translate(-15.36px, -109.2px) scale(0.8);
      opacity: 1
    }
    /*23.33% {*/
    /*transform: translate(-20.9067px, -127.4px) scale(0.7667);opacity:1*/
    /*}*/
    /*26.67% {*/
    /*transform: translate(-27.3067px, -145.6px) scale(0.7333);opacity:1*/
    /*}*/
    /*30% {*/
    /*transform: translate(-34.56px, -163.8px) scale(0.7);opacity:1*/
    /*}*/
    /*33.33% {*/
    /*transform: translate(-42.6667px, -182px) scale(0.6667);opacity:1*/
    /*}*/
    /*36.67% {*/
    /*transform: translate(-51.6267px, -200.2px) scale(0.6333);opacity:0.5*/
    /*}*/
    /*40% {*/
    /*transform: translate(-61.44px, -218.4px) scale(0.6);opacity:0.2*/
    /*}*/
    /*43.33% {*/
    /*transform: translate(-72.1067px, -236.6px) scale(0.5667);opacity:0*/
    /*}*/
  }

  @keyframes starActive {
    0% {
      transform: scale(0.2);
      opacity: .5
    }
    100% {
      transform: scale(0.7);
      opacity: 1
    }
  }

  /*.yellowImg {*/
  /*height: 1rem;*/
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 5rem;*/
  /*z-index: 5;*/
  /*animation: starActive 1s ease 1s infinite;*/
  /*animation-fill-mode: both;*/
  /*}*/

  /*红色小球*/
  .pink_ball {
    position: absolute;
    top: 3rem;
    left: 1rem;
    width: .46rem;
    height: .46rem;
    z-index: 9;
    animation: starActive 2s ease-in 1s infinite;
    animation-fill-mode: both;
  }

  .yellowImg {
    position: absolute;
    top: 6.1rem;
    right: 1.8rem;
    width: .73rem;
    height: .73rem;
    z-index: 5;
    animation: starActive 3s ease-in 1s infinite;
    animation-fill-mode: both;
  }

  /*闪烁*/
  @keyframes shineActive1 {
    from {
      opacity: 0;
      transform: scale(1);
    }
    to {
      opacity: .5;
      transform: scale(2);
    }
  }

  @keyframes shineActive2 {
    from {
      opacity: 0;
      transform: scale(.6);
    }
    to {
      opacity: .5;
      transform: scale(1.5);
    }
  }

  .spot1 {
    width: .11rem;
    height: .11rem;
    position: absolute;
    top: 4rem;
    right: 1.5rem;
    z-index: 5;
    animation: shineActive2 2s ease infinite;
    animation-fill-mode: both;
  }

  .spot2 {
    width: .11rem;
    height: .11rem;
    position: absolute;
    top: 5rem;
    right: 1rem;
    z-index: 5;
    animation: shineActive1 3s ease 1s infinite;
    animation-fill-mode: both;
  }

  .numContent {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
  }

  .numContent img {
    height: .42rem;
  }

  /*video*/
  .videoContent {
    position: absolute;
    top: 10.45rem;
    left: 0.5rem;
    width: 6.52rem;
    height: 3.65rem;
    /*border: 1px solid red;*/
  }

  .videoContent video {
    width: 100%;
    height: 100%;
  }

  /*封面*/
  .videoFengMian {
    position: absolute;
    top: 10.45rem;
    left: .5rem;
    width: 6.5rem;
    background: url('../../static/img/video_img.png') no-repeat;
    background-size: 100% 100%;
  }

  .fengMiancontent {
    width: 100%;
    height: 3.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fengMiancontent img {
    width: 1.32rem;
    height: 1.33rem;
  }

  .ruleContent {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, .5)
  }

  .ruleBtn {
    position: absolute;
    right: .5rem;
    top: 2.5rem;
    z-index: 9;
    width: 1.8rem;
    height: .6rem;
  }

  .ruleFlex {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
  }

  .ruleFlex img {
    height: 6.83rem;
  }

  .finger_img {
    height: 1.23rem;
    position: absolute;
    top: .05rem;
    right: 0.8rem;
    /*animation: fingerActive 1s ease-in 1s infinite;*/
    /*animation-fill-mode: both;*/
  }

  @keyframes fingerActive {
    from {
      transform: scale(1);
      right: 1rem;
      top: 0.08rem;
    }
    to {
      transform: scale(.6);
      right: 1rem;
      top: 0.02rem;
    }
  }

  @keyframes shineActive2 {
    from {
      opacity: 0;
      transform: scale(.6);
    }
    to {
      opacity: .5;
      transform: scale(1.5);
    }
  }

  .loadCss {
    animation-duration: 0.5s;
  }

  .phone_Icon {
    width: 1.43rem;
    height: 2.22rem;
    position: absolute;
    top: 12.5rem;
    right: 0;
    z-index: 11;
  }

  .starImg3 {
    position: absolute;
    top: 5rem;
    left: 3.7rem;
    z-index: 5;
    width: 1.04rem;
    height: 1.04rem;
    animation: spot3 1.8s ease-in 1s infinite;
    animation-fill-mode: both;
  }

  @keyframes spot3 {
    from {
      opacity: 0.3;
      transform: scale(.3);
    }
    to {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .showSucess {
    position: absolute;
    z-index: 100;
    width: 80%;
    height: .8rem;
    line-height: .8rem;
    background: rgba(0, 0, 0, .6);
    text-align: center;
    bottom: 50%;
    left: 10.5%;
    font-size: 0.3rem;
    border-radius: 5px;

    color: #fff;
    animation: shareScess 5s ease-out;
    -webkit-animation: shareScess 5s ease-out;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
    padding-left: .2rem;
  }

  @keyframes shareScess {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-10rem);
      opacity: 0;
    }
  }

  .goLinkBtn {
    position: absolute;
    right: .2rem;
    top: 9.4rem;
    width: 4.5rem;
    height:1rem;
    line-height: 1rem;
    background: red;
    z-index: 33;
    opacity:0;
  }
</style>
