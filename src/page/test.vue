<template>
  <div class="home">
    <div class="homeBg" ></div>
    <img class="dZq_img" :src="starImg" v-show="isShow" alt="">
    <div class="content" v-show="isShowContent">
      <img class="logo" :src="head_Abc" alt="">
      <div class="red_bg" >
        <div class="head_box">
          <img class="p1" :src="img_p1" v-show="p1Active" alt="">
          <img class="p2" :src="img_p2" v-show="p2Active" alt="">
          <img class="p3" :src="img_p3" v-show="p3Active" alt="">
          <img class="p4" :src="img_p4" v-show="p4Active" alt="">
        </div>
        <img class="toPlayBtn" :src="toPlayImg"   @click="toPlayPage" v-show="toPlay" alt=""> <!---->
      </div>
    </div>
  </div>
</template>
<script>
  import Ajax from '../config/ajax';
  import md5 from '../config/md5'
  export default {
    data() {
      return {
        starImg: './static/img/first_bg.jpg',
        head_Abc: './static/img/head_info.png',
        img_p1: './static/img/info1.png',
        img_p2: './static/img/info2.png',
        img_p3: './static/img/info3.png',
        img_p4: './static/img/info4.png',
        toPlayImg:'./static/img/toPlayBtn.png',
        isShow: false,
        isShowContent: false,
        toPlay:false,

        p1Active:false,
        p2Active:false,
        p3Active:false,
        p4Active:false
      }
    },
    mounted(){
      setTimeout(() => {
        this.isShow = true;
      }, 1000);
      setTimeout(() => {
        this.isShowContent = true
      }, 2000);
      setTimeout(() => {
        this.p1Active = true
      }, 3000);
      setTimeout(() => {
        this.p2Active = true
      }, 4000);
      setTimeout(() => {
        this.p3Active = true
      }, 5000);
      setTimeout(() => {
        this.p4Active = true
      }, 6000);
      setTimeout(()=>{
        this.toPlay = true
      },7000)

    },
    methods: {
      toPlayPage(){
//        let tempNum = this.RndNum();
        this.$router.push('/musicPage');
      },
      //产生(1-8)随机数函数
      RndNum(){
        return Math.floor(Math.random()*8);
      }
    }
  }
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(214, 223, 228)
  }

  .homeBg {
    width: 100%;
    height: 13.3rem;
    position: absolute;
    background: url('../../static/img/main_bg.png') no-repeat;
    background-size: 100% 100%;
    animation: home1Ac 0.5s ease;
    animation-fill-mode: both;
    z-index: 999;
  }

  /*线框由大变小再变大*/
  @keyframes home1Ac {
    0% {
      transform: scale(1.5);
    }
    50% {
      transform: scale(.8);
    }
    100% {
      transform: scale(1);
    }
  }

  /*人物动画*/
  @keyframes peopleAc {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .dZq_img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 13.32rem;
    animation: peopleAc 0.5s ease-in;
    animation-fill-mode: both;
  }

  .logo {
    position: absolute;
    top: 4.8rem;
    left: .6rem;
    z-index: 999;
    width: 6.21rem;
    height: 2.41rem;
    box-shadow: 0 0 0 0 rgba(8, 1, 3, 0.75);
    animation: logoActive 1s ease-out;
    animation-fill-mode: both;

  }

  .content {
    width: 100%;
  }

  .red_bg {
    position: absolute;
    top: 7.4rem;
    left: 10%;
    width: 6.01rem;
    height: 3.59rem;
    background: url('../../static/img/red_Bg.png') no-repeat top center;
    background-size: 100% 100%;
    animation: headActive .5s ease-out;
    animation-fill-mode: both;
  }

  /*动画*/
  @keyframes headActive {
    0% { right: -200% }
    100% { right: 10%; }
  }

  /*logo标题动画*/
  @keyframes logoActive {
    0% { left: -200%;}
    70%{left: 10%;}
    80%{left: 5%;}
    90%{left: 15%;}
    100%{left: 10%;}
  }

  .head_box {
    width: 100%;
    margin: .3rem .3rem 0.1rem .3rem;
    line-height: .3rem;
    display: inline-block;
  }

  .head_box img {
    width: 5.32rem;
    height: .3rem;
  }

  .p1 {
    position: absolute;
    top: .3rem;
    animation: p1Active .5s ease;
    animation-fill-mode: both;
  }

  .p2 {
    position: absolute;
    top: .75rem;
    animation: p1Active .5s ease;
    animation-fill-mode: both;
  }

  .p3 {
    position: absolute;
    top: 1.2rem;
    animation: p1Active .5s ease;
    animation-fill-mode: both;
  }

  .p4 {
    position: absolute;
    top: 1.65rem;
    animation: p1Active .5s ease;
    animation-fill-mode: both;
  }

  @keyframes p1Active{
    from{
      right:-200%;
    }
    to{
      right:5%;
    }
  }

  .toPlayBtn{
    width:3.74rem;
    height:.82rem;
    position:absolute;
    top:2.4rem;
    left:20%;
    z-index:999;
    animation: shineActive .5s ease infinite;
    animation-fill-mode: both;
  }
  /*闪烁*/
  @keyframes shineActive{
    from {
      opacity: 0;
    }
    to {
      opacity:.5;
    }
  }
</style>
