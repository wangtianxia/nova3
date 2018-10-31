<template>
  <div class="resultContainer">
    <img class="result_bg" :src="resultBg" alt="">
    <img class="fast_root_img" :src="fastRootImg" @click="toLocation" alt="">
    <img class="free_root_img" :src="freeRootImg" @click="toGetLuckyStar" alt="">
    <div class="showSucess" v-show="isShowMessage">
      <span>{{messageWord}}</span>
    </div>
    <div class="getLuckyContainer" v-if="isShow">
      <img class="luck_main_bg" :src="luckAlertBg" alt="">
      <img class="close_img" :src="closeImg" @click="closeBox" alt="">

      <!--转盘-->
      <section class="luck_main_conent">
        <section class="choose" v-for="(item,index) in luckList" :key="index">
          <section class="items" v-if="item.select" v-html="item.key">
          </section>
          <section class="item" v-if="!item.select" v-html="item.key">
          </section>
        </section>
        <section class="goToRecordsBtn" @click="goToRecords">
          <img :src="goToRecordsImg" alt="">
        </section>
      </section>

    </div>
  </div>
</template>
<script type="text/javascript">
  import ajaxData from "../../config/ajax.js";
  import DataManager from "../../dataManager/data";
  import md5 from "../../config/md5";
  export default {
    name: "result",
    data (){
      return {
        resultBg: '',
        fastRootImg: './static/img/fast_root_img.png',
        freeRootImg: './static/img/free_root_img.png',
        luckAlertBg: './static/img/rule.png',
        isShow: false,
        closeImg: './static/img/close.png',
        goToRecordsImg: './static/img/toClickGetRerond.png',
        isShowGetRecord: false,
        isShowMessage: false,  //消息提示弹窗
        messageWord: '',
        isCanClick: true,
        luckList: [
          {
            key: '邓紫棋<br>签名照',
            select: false,
          },
          {
            key: '邓紫棋<br>签名海报',
            select: false
          },
          {
            key: '邓紫棋<br>演唱会门票',
            select: false
          },
          {
            key: '幸运星<br>30枚',
            select: false
          },
          {
            key: '谢谢参与',
            select: true
          },
          {
            key: '幸运星<br>10枚',
            select: false
          }
        ],
        canRun: true,
        times: 0,
        pos: 0,
        index: 3,
        spped: 100,
        cycle: 50
      }
    },
    mounted(){
      let gradeNum = this.$route.params.gradeNum;
      if (gradeNum == 100) {

        this.resultBg = './static/img/100.jpg'

      } else if (gradeNum == 75) {

        this.resultBg = './static/img/75.jpg'

      } else if (gradeNum == 50) {

        this.resultBg = './static/img/50.jpg'

      } else if (gradeNum == 25) {

        this.resultBg = './static/img/25.jpg'

      } else if (gradeNum == 0) {

        this.resultBg = './static/img/0.jpg'
      }
    },
    methods: {
      toLocation(){
        window.location.href = 'https://www.damai.cn/ticketbook_17267.html'
      },
      toGetLuckyStar(){
        let gradeNum = this.$route.params.gradeNum;
        if (gradeNum >= 75) {
          this.isShow = true;
        } else {
          setTimeout(() => {
            this.isShowMessage = false;
          }, 2000)
          this.isShowMessage = true;
          this.isShowMessage1();

        }

      },
      closeBox(){
        this.isShow = false;
      },
      /*抽奖*/
      goToRecords(){
        let data = {
          user_id: DataManager.user_id,
          bid: DataManager.bid,
          group_openid: DataManager.group_openid
        };
        data.sign = md5.makeSign(data);
        (new ajaxData()).sendJSON(
          "https://sf.xintiao100.com/dzqLuckDraw",  //  //https://sf.xintiao100.com/dzqLuckDraw
          data,
          res => {
            if (res['st'] == 1) {
              if (res['data']['random'] == 3) {  // 即奖励下标, 3:10幸运星, 4:啥也没, 5:30幸运星
                if (this.canRun) {
                  this.canRun = false;
                  this.pos = 5;
                  this.rollRun();
                }
              } else if (res['data']['random'] == 4) {
                if (this.canRun) {
                  this.canRun = false;
                  this.pos = 4;  //
                  this.rollRun();
                }
              } else if (res['data']['random'] == 5) {
                if (this.canRun) {
                  this.canRun = false;
                  this.pos = 3;   //30个幸运星
                  this.rollRun();
                }
              }
            } else if (res["st"] == 2) {
              setTimeout(() => {
                this.isShowMessage = false;
              }, 2000);
              this.isShowMessage = true;
              this.isShowFuction();
            }
          }
        )},
      isShowMessage1(){
        this.messageWord = '免费通道仅对资深渔民开放哦！'
      },
      isShowFuction(){
        this.messageWord = '您的3次抽奖机会已经用完！'
      },
      rollRun(){
        this.times += 1;
        this.roll();
        if (this.times > this.cycle + 10 && this.pos == this.index) {
          this.canRun = true;
          this.spped = 100;
          this.times = 0;
          return false
        } else {
          if (this.times < this.cycle) {
            this.spped -= 5;
          } else {
            if (this.times > this.cycle + 10 && this.pos == this.index + 1) {
              this.spped += 150
            } else {
              this.spped += 5
            }
          }
          if (this.spped < 40) {
            this.spped = 40
          }

          setTimeout(() => {
            this.rollRun()
          }, this.spped);

          return false
        }
      },

      roll(){
        if (this.index != -1) {
          this.$set(this.luckList[this.index], 'select', false);
        }
        this.index += 1;
        if (this.index == this.luckList.length) {
          this.index = 0
        }
        this.$set(this.luckList[this.index], 'select', true);
      }

    }
  }
</script>
<style>
  .resultContainer {
    width: 100%;
    height: 100%;
    background: rgb(214, 223, 228)
  }

  .result_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 13.32rem;
    z-index: 1;
  }

  .fast_root_img {
    width: 5.75rem;
    height: .75rem;
    position: absolute;
    top: 9rem;
    left: .87rem;
    z-index: 2;
  }

  .free_root_img {
    width: 5.75rem;
    height: .75rem;
    position: absolute;
    top: 10rem;
    left: .87rem;
    z-index: 3;
  }

  .getLuckyContainer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;

  }

  .luck_main_bg {
    width: 100%;
    height: 13.32rem;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*关闭按钮*/
  .close_img {
    position: absolute;
    top: 4.2rem;
    right: 0.5rem;
    width: .47rem;
    height: .47rem;
  }

  .luck_main_conent {
    width: 6.87rem;
    height: 6rem;
    position: absolute;
    top: 4.6rem;
    left: 0.28rem;
    z-index: 6;
    justify-content: center;
    align-items: center;
  }

  /*.choose{*/
  /*position:absolute;*/
  /*top:0;*/
  /*left:0;*/
  /*width:1.97rem;*/
  /*height:1.07rem;*/
  /*z-index:6;*/
  /*border:1px solid #fefefe;*/
  /*border-radius:5%;*/
  /*font-size:.3rem;*/
  /*color:#fff;*/
  /*text-align:center;*/
  /*line-height:.36rem;*/
  /*}*/
  .items {
    width: 1.97rem;
    height: 1.07rem;
    border-radius: 5%;
    z-index: 6;
    font-size: .3rem;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    border: 2px solid #fefefe;
    align-items: center;
  }

  .item {
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;
    border-radius: 5%;
    font-size: .3rem;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    border: 1px solid #fefefe;
    align-items: center;
  }

  .choose:first-child {
    position: absolute;
    top: 0.25rem;
    left: 0.3rem;
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;
  }

  .choose:nth-child(2) {
    position: absolute;
    top: 0.25rem;
    left: 2.45rem;
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;

  }

  .choose:nth-child(3) {
    position: absolute;
    top: 0.25rem;
    left: 4.55rem;
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;

  }

  .choose:nth-child(4) {
    position: absolute;
    top: 1.45rem;
    left: 4.55rem;
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;

  }

  .choose:nth-child(5) {
    position: absolute;
    top: 1.45rem;
    left: 2.43rem;
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;

  }

  .choose:nth-child(6) {
    position: absolute;
    top: 1.45rem;
    left: 0.3rem;
    width: 1.97rem;
    height: 1.07rem;
    z-index: 6;

  }

  /*按钮*/
  .goToRecordsBtn {
    width: 100%;
    height: .75rem;
    position: absolute;
    top: 5.05rem;
    left: 24%;
  }

  .goToRecordsBtn img {
    width: 3.71rem;
    height: .75rem;
  }

  /*.choose:nth-of-type(4){*/
  /*position: absolute;*/
  /*right: 0.15rem;*/
  /*top: 1.4rem;*/

  /*}*/
  /*.choose:nth-of-type(6){*/
  /*align-self: flex-start;*/
  /*flex-flow: row-reverse;*/
  /*position: absolute;*/
  /*left: 0.15rem;*/
  /*top: 1.4rem;*/
  /*}*/

  .showSucess {
    position: absolute;
    z-index: 100;
    width: 80%;
    height: .8rem;
    line-height: .8rem;
    background: rgba(0, 0, 0, .6);
    text-align: center;
    bottom: 50%;
    left: 10%;
    font-size: 0.4rem;
    border-radius: 5%;

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

</style>
