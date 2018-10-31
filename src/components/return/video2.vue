<template>
  <div class="videoContainerCont">
    <div class="topFontInfo" > <!--v-show="isVideoIcon"-->
      <p>{{starName}}</p>
    </div>
    <section class="videoPage1" v-show="!isShow"  @click="onClickPlayVideo">
      <div class="videoFenMianImg">
        <img :src="videoPoster" alt="">
      </div>
      <div class="toPlayVideoIcon">
        <img  src="../../static/101/sy_play1.png" alt="">
      </div>
    </section>
    <div class="videoBox" v-show="isShow" @click="onClickPaused">
      <video ref="myVideo"  webkit-playsinline="true" playsinline="true">
        <source :src="videoSrc1" type="video/mp4"/>
      </video>
    </div>
    <a :href="toAddGroupUrl">
      <div class="bottomAddGroup"> <!--v-show="isVideoIcon"-->
        <div class="addGroupBg" >
          <div class="qqGroup1">
            <img  :src="groupHeadIcon1" alt="">
            <div class="qqGroupNameInfo">
              {{qqGroupName1}}
            </div>
            <div class="qqGroupUrl">
            </div>
          </div>
        </div>
      </div>
    </a>
    <ReturnComent @returnToIndex="returnToIndex"></ReturnComent>
  </div>
</template>
<script>
  import  ReturnComent from './return/index.vue'
  export default {
    data (){
      return {
        videoSrc1: '',
        videoPoster: '',
        isShow: false,
        isVideoIcon: true,
        starName: '',

        qqGroupName1:'',
        groupHeadIcon1:'',
        toAddGroupUrl:'',

        listArr: [
          {
            src: 'static/101/chenyihan.png',
            name: '陈意涵',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/chenyihan.mp4',
            groupHeadIcon1:'static/101/cyh1.jpg',
            qqGroupName1:'陈意涵入驻粉丝团',
            toAddGroupUrl:'http://qm.qq.com/cgi-bin/qm/qr?k=duVOHjcYSBTNflcBC-V2wF9LwPUBzWxn',

          },
          {
            src: 'static/101/fuqin.png',
            name: '傅菁',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/fuqing.mp4',

            groupHeadIcon1:'static/101/fq1.jpg',
            qqGroupName1:'傅菁部落官方粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5dNtMIj',
          },
          {
            src: 'static/101/gaoyingxi.png',
            name: '高颖浠',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/gaoyingxi.mp4',

            groupHeadIcon1:'static/101/gyx1.png',
            qqGroupName1:'高颖浠官方粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5gkrpow',
          },
          {
            src: 'static/101/laimeiyun.png',
            name: '赖美云',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/laimeiyun.mp4',

            groupHeadIcon1:'static/101/lmy.jpg',
            qqGroupName1:'赖美云啦',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5tf4xYy',
          },
          {
            src: 'static/101/liurenyu.png',
            name: '刘人语',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/liurenyu.mp4',

            groupHeadIcon1:'static/101/lry2.jpg',
            qqGroupName1:'完美少女-刘人语',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5FfwDhA',
          },
          {
            src: 'static/101/lvxiaoyu.png',
            name: '吕小雨',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/lvxiaoyu.mp4',

            groupHeadIcon1:'static/101/lxy1.jpg',
            qqGroupName1:'初雨阁之吕小雨出道♡',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=55Je9SG',
          },
          {
            src: 'static/101/qiyandi.png',
            name: '戚砚笛',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/qiyandi.mp4',

            groupHeadIcon1:'static/101/qyd1.jpg',
            qqGroupName1:'戚砚笛粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5myyD6t',
          },
          {
            src: 'static/101/wuyingxiang.png',
            name: '吴映香',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wuyinxiang.mp4',

            groupHeadIcon1:'static/101/wyx2.png',
            qqGroupName1:'Lucia veryloveyou.♡',
            toAddGroupUrl:' https://jq.qq.com/?_wv=1027&k=5PtIe5v',
          },
          {
            src: 'static/101/xumengjie.png',
            name: '徐梦洁',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/xumengjie.mp4',

            groupHeadIcon1:'static/101/xmj1.png',
            qqGroupName1:'徐梦洁粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5wACeOb',
          },
          {
            src: 'static/101/xujingyun.png',
            name: '许婧韵',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/xujingyun.mp4',

            groupHeadIcon1:'static/101/xjy1.jpg',
            qqGroupName1:'Angela的天使',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=57fIWmy',
          },
          {
            src: 'static/101/yamy.png',
            name: 'Yamy',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/yamy.mp4',

            groupHeadIcon1:'static/101/yamy1.jpg',
            qqGroupName1:'yamy的芝士小窝',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=51jZE3C',

          },
          {
            src: 'static/101/yangchaoyue.png',
            name: '杨超越',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/yangchaoyue.mp4',

            groupHeadIcon1:'static/101/ycy1.jpg',
            qqGroupName1:'超越梦想{相信自我}',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5PNqcWO',
          },
          {
            src: 'static/101/fanhui.png',
            name: '范薇',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/fanwei.mp4',

            groupHeadIcon1:'static/101/fh1.png',
            qqGroupName1:'薇粉之家',
            toAddGroupUr1:'https://jq.qq.com/?_wv=1027&k=5I4ZE0o',
          },
          {
            src: 'static/101/jiangshen.png',
            name: '蒋申',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/jiangshen.mp4',

            groupHeadIcon1:'static/101/js1.jpg',
            qqGroupName1:'呆比-蒋申粉丝后援会',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5eBcGHo',
          },
          {
            src: 'static/101/liudanmeng.png',
            name: '刘丹萌',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/liudanmeng.mp4',

            groupHeadIcon1:'static/101/ldm1.png',  ////////////////////
            qqGroupName1:'刘丹萌打榜群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5qdS6hR',
          },
          {
            src: 'static/101/luxiaocao.png',
            name: '鹿小草',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/luxiaocao.mp4',

            groupHeadIcon1:'static/101/lxc1.jpg',
            qqGroupName1:'鹿小草全国粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5CStfYU',
          },
          {
            src: 'static/101/luoyitian.png',
            name: '罗怡恬',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/luoyitian.mp4',

            groupHeadIcon1:'static/101/lyt1.png',
            qqGroupName1:'罗怡恬粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5Tb71Mk',
          },
          {
            src: 'static/101/luoyijia.png',
            name: '罗奕佳',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/luoyijia.mp4',

            groupHeadIcon1:'static/101/lyj1.jpg',
            qqGroupName1:'往后余生  奕是暖阳',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5O7co8A',
          },
          {
            src: 'static/101/wangmohan.png',
            name: '王莫涵',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wangmohan.mp4',

            groupHeadIcon1:'static/101/wmh1.jpg',
            qqGroupName1:'王莫涵的小可耐',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=51AFLmf',
          },
          {
            src: 'static/101/wangting.png',
            name: '王婷',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wangting.mp4',

            groupHeadIcon1:'static/101/wt1.png',
            qqGroupName1:'王婷粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5aZXF04',
          },
          {
            src: 'static/101/weijing.png',
            name: '魏瑾',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/weijing.mp4',

            groupHeadIcon1:'static/101/wj1.png',
            qqGroupName1:'魏瑾打榜群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5Io1ork',
          },
          {
            src: 'static/101/wuqianying.png',
            name: '吴芊盈',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/wuqianyin.mp4',

            groupHeadIcon1:'static/101/wqy1.jpg',
            qqGroupName1:'ink工作室',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5hotk8X',
          },
          {
            src: 'static/101/zhaoyaoke.png',
            name: '赵尧珂',
            playIcon: 'static/101/sy_play.png',
            videoSrc: 'https://starcdn.xintiao100.com/starResources/videos/101/zhaoyaoke.mp4',

            groupHeadIcon1:'static/101/zyk1.jpg',
            qqGroupName1:'赵尧珂粉丝群',
            toAddGroupUrl:'https://jq.qq.com/?_wv=1027&k=5gsCy1j',
          }

        ]
      }
    },
    mounted(){
      let tempNum = this.$route.params.tempNum;
//      console.log(this.$route.params.tempNum, '----')
      for (let i = 0; i < this.listArr.length; i++) {
        if (i == tempNum) {
          this.videoSrc1 = this.listArr[i]['videoSrc'];
          this.videoPoster = this.listArr[i]['src'];
          this.starName = this.listArr[i]['name'];


          this.qqGroupName1 = this.listArr[i]['qqGroupName1'];

          this.groupHeadIcon1 = this.listArr[i]['groupHeadIcon1'];
          this.toAddGroupUrl = this.listArr[i]['toAddGroupUrl'];

          this.qqGroupName2 = this.listArr[i]['qqGroupName2'];
          console.log(i,'---');

          this.toAddGroupUr2 = this.listArr[i]['toAddGroupUr2'];
          this.groupHeadIcon2 = this.listArr[i]['groupHeadIcon2'];

          this.toAddGroupUrl1 = this.listArr[i]['toAddGroupUrl1'];
          this.toAddGroupUrl2 = this.listArr[i]['toAddGroupUrl2'];

          console.log(i)
        }
      }

      if (!tempNum) {
        return;
      }

//        let myVideo = this.$refs.myVideo;
//        myVideo.play();
//        myVideo.addEventListener('play', (e) => {
//          this.isShow = true;
//          this.isVideoIcon = false
//        });
//        audio.addEventListener('ended', (e) => {
//          this.isShow = false;
//          this.isVideoIcon = true;
//        });
//        audio.addEventListener('pause', (e) => {
//          this.isShow = false;
//          this.isVideoIcon = true;
//        })
    },
    methods: {
      onClickPlayVideo(){

        this.isShow = false;
        let myVideo = this.myVideo = this.$refs.myVideo;
        if(myVideo.paused){
          this.isShow = true;
          myVideo.play()
        }else{
          this.isShow = false;
          myVideo.pause();
        }

        myVideo.addEventListener('play', (e) => {
          this.isShow = true;
        });
        myVideo.addEventListener('ended', (e) => {
          this.isShow = false;
        });
        myVideo.addEventListener('pause', (e) => {
          this.isShow = false;
        });
      },
      //暂停播放
      onClickPaused(){
        let myVideo = this.myVideo = this.$refs.myVideo;
        if(myVideo.paused){
          this.isShow = true;
          myVideo.play()
        }else{
          this.isShow = false;
          myVideo.pause();
        }
      },
      //去加群
      toAddGoup1(i){
        window.location.href = 'toAddGroupUrl1'
      },
      returnToIndex(){
        this.$router.go(-1)
      },
      //微信分享
      addSdk(src, cb){

      }
    },
    components:{
      ReturnComent
    }
  }
</script>
<style>
  .videoContainerCont {
    width:100%;
    height: 13.34rem;
    background: url('../../static/101/videoBg.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .topFontInfo {

    width: 100%;
    line-height: 1;
    text-align: center;
    padding-top:.65rem;
  }

  .topFontInfo > p {
    color: #A62751;
    font-size: .36rem;
    font-weight:bold;
  }

  .videoPage1 {
    position: relative;
    max-width:7.5rem;
    line-height: 1;
    /* justify-items: center
    *justify-items: center;*/

  }

  .videoFenMianImg {
    position: absolute;
    top: 0.2rem;
    left: .3rem;
    height: 4.49rem;
    margin-top: .8rem;

    border-radius: .4rem;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .videoPage1 img {
    width: 6.82rem;
    display: inline-block;
    padding-top: 3rem;
    border-radius: .4rem;
  }


  .toPlayVideoIcon {
    width:50%;
    height:.75rem;
    position:absolute;
    top:0;
    left:45%;
    z-index:101;

    /*width:100%;*/
    /*height:.75rem;*/
    /*position:absolute;*/
    /*top:0;*/
    /*left:45%;*/
    /*z-index:103;*/


  }

  .toPlayVideoIcon>img{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width:.75rem;
  }


  .addGroupContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .findPage {
    margin-top: .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .groupImg {
    width: 6%;
    border-radius: 50%;
    margin-right: 2rem;
    margin-top: .3rem;
  }

  .toAddGroup {
    width: .8rem;
    margin-left: 2rem;

  }

  .fansGroup {
    font-size: .2rem;
    height: .6rem;
    line-height: .6rem;
    color: #000;
    margin-left: .2rem;
  }

  .bottomAddGroup{
    position:absolute;
    top:8.5rem;
    left:.5rem;
    /*width:100%;*/
    height:1.45rem;

    /*margin-top:.88rem;*/
  }
  .addGroupBg2{
    position: absolute;
    top: 2rem;
    left: 0;
    width: 6.56rem;
    height: 1.45rem;
    background:url('../../static/101/qun.png') no-repeat;
    background-size:100% 100%;
  }
  .addGroupBg{
    position: absolute;
    top: 0;
    left: 0;
    width: 6.56rem;
    height: 1.45rem;
    background:url('../../static/101/qun.png') no-repeat;
    background-size:100% 100%;
  }
  .qqGroup1{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-radius:12%;
  }
  .qqGroup1 img{
    width:.85rem;
    height:.85rem;
    margin-left:.3rem;
    border-radius:12%;
  }
  .qqGroupNameInfo{
    font-size:.3rem;
    color:#eb3a8b;
    line-height:1.27rem;
    height:1.27rem;
  }
  .qqGroupUrl{
    width:1.19rem;
    height:.57rem;
    margin-right:.45rem;
  }
  .qqGroupUrl a{
    width:1.19rem;
    height:.57rem;
    margin-right:.45rem;
    display:inline-block;
  }

  /*视频在框内播放*/
  .videoBox{
    width:6.82rem;
    height:7rem;
    overflow: hidden;
    position:relative;
    text-align:center;
  }
  .videoBox video{
    position: absolute;
    top: 1rem;
    left: 0;
    width: 7.2rem;
    height: 4.4rem;
  }
</style>
