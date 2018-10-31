<template>
    <div class="musicContainer">
        <img class="music_bg" :src="musicBg" alt="">
        <div class="musicContent">
            <img class="rotateAc" :src="musicPosterImg" v-if="!isShowPause" alt="">
            <img class="rotateBc" :src="musicPosterImg" v-if="isShowPause" alt="">
            <img class="pause_img" :src="pauseImg" v-show="isShowPause" @click="toPause()" alt="">
            <img class="play_img" :src="playImg" v-show="!isShowPause" @click="toPlay()" alt="">
            <audio ref="audio" id="music" :src="musicSrc" autoplay>
                您的浏览器不支持 video 标签。
            </audio>
        </div>
        <div class="messageBox">
            <img class="messageLeftImg" :src="messageSrc" @click="messageAlert" alt="">
            <img class="goAwayRightImg" :src="goAway" @click="goToNext" alt="">
        </div>
        <div class="guessSongBox">
            <section class="songReluteBox" v-for="(item,index) in songWordsNameArr" :key="index">
                <section class="songRelute" v-show="isShowWords">
                  <span>
                    {{anserArr[index]}}
                  </span>

                </section> <!--blink-->

                <section class="songRelute" v-show="!isShowWords">
                  <span class="blink">
                    {{anserArr[index]}}
                  </span>

                </section>

            </section>
            <img class="reset_img" :src="resetImg" @click="resetActiveImg" alt="">
            <div class="otherWordsContainer">
                <section class="otherWordsBox" v-for="(item,index) in otherWordArr" @click="clickWordsItem(item,index)"
                         :key="index">
                    <section class="otherWords">{{item}}</section>
                </section>
            </div>

        </div>
        <!--猜对了-->
        <div class="GuessingContainer" v-show="GuessRightAlert" @click="closeGuessRightAlert">
            <img :src="GuessingImg" alt="">
        </div>
        <div class="messageAlertBox" v-show="isShowAlert" @click="closeAlertActive">
            <img :src="messageAlertImg" alt="">
        </div>
    </div>
</template>
<script type="text/javascript">
    import dataData from '../../config/dataData.js';

    export default {
        data() {
            return {
                musicBg: '',   //背景
                musicPosterImg: '',  //光盘的图
                musicSrc: '',  //歌曲的src
                messageAlertImg: '',  //提示的图
                otherWordArr: [],  //混淆字
                songWordsNameArr: [],  //'多', '远', '都', '要', '在', '一', '起',   歌名数组
                otherWorderList: [],  //混淆字 副本


                pauseImg: './static/img/pause.png',
                playImg: './static/img/play.png',
                activeRotate: true,
                isShowPause: false,
                isShowAlert: false,
                messageSrc: './static/img/message_btn.png',
                goAway: './static/img/come_go.png',
                resetImg: './static/img/reset.png',
                songName: '',
                otherWords: '',
                anserArr: [],  //存答长度的数组,
                GuessingImg: './static/img/answer.png',
                GuessRightAlert: false,
                isShowWords: true,    //字体发光
                tempArrNum: [],  //存放随机数的数组

                tableIndex: 0,
                grade: 0

            }
        },
        mounted() {
            let arr = [];
            for (let i = 0; i <= 3; i++) {
                this.getx(arr);
            }
            this.tempArrNum = arr;

            let tempNumber = this.tempArrNum[this.tableIndex];
            this.musicSrc = dataData[tempNumber]['musicSrc'];
            this.musicBg = dataData[tempNumber]['imgBgSrc'];

            let image = new Image();
            image.src = dataData[tempNumber]['rotateSrc'];
            image.onload = () => {
                this.musicPosterImg = dataData[tempNumber]['rotateSrc'];
            };

            this.messageAlertImg = dataData[tempNumber]['messageSrc'];
            this.otherWordArr = JSON.parse(JSON.stringify(dataData[tempNumber]['otherWords']));    //深度复制
            this.songWordsNameArr = dataData[tempNumber]['songName'];
            this.init();
        },
        methods: {
            getx(arr) {
                for (var i = 0; i > -1; i++) {
                    var flag = true;
                    var num = Math.floor(Math.random() * 8);
                    for (var i in arr) {
                        if (arr[i] == num) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag == true) {
                        console.log(num);
                        arr.push(num);
                        return;
                    }
                }
            },
            init() {
                let audio = this.$refs.audio;
                audio.addEventListener('play', (e) => {
                    this.isShowPause = false;
                });
                audio.addEventListener('ended', (e) => {
                    this.isShowPause = true;
                });
                audio.addEventListener('pause', (e) => {
                    this.isShowPause = true;
                })
            },
            //暂停
            toPause() {
                let audio = this.myVideo = this.$refs.audio;
                if (audio.paused) {
                    this.isShowPause = false;
                    audio.play()
                } else {
                    this.isShowPause = true;
                    audio.pause();
                }
            },
            //播放
            toPlay() {
                let audio = this.myVideo = this.$refs.audio;
                if (audio.paused) {
                    this.isShowPause = false;
                    audio.play();
                } else {
                    this.isShowPause = true;
                    audio.pause();
                }
            },
            //猜歌点击事件
            clickWordsItem(item, index) {
                if (this.songWordsNameArr.length == this.anserArr.length) {    //答案的数组长度 = 结果数组的长度
                    return false;
                } else {
                    this.anserArr.push(item);
                    this.otherWordArr.splice(index, 1);
                }

                if (this.songWordsNameArr.length > this.anserArr.length) {
                    return;
                }


                var index = 0;
                for (let i = 0; i < this.songWordsNameArr.length; i++) {
                    for (let j = 0; j < this.anserArr.length; j++) {
                        if (i == j && this.songWordsNameArr[i] == this.anserArr[j]) {
                            index += 1;
                        }
//
                    }
                }
                if (index == this.songWordsNameArr.length) {
                    this.GuessRightAlert = true;   //对的
                    this.grade += 25;
                    setTimeout(() => {
                        this.GuessRightAlert = false;
                        this.anserArr = [];
                        this.tableIndex++;
                        this.nextQuestion();   //进入下一道题
                    }, 1000);

                } else {
                    this.isShowWords = false;     //错的
                }

            },
            //弹窗点击
            messageAlert() {
                this.isShowAlert = true;
            },
            //切歌
            goToNext() {
                this.tableIndex++;
                this.nextQuestion()
            },
            //关闭弹窗
            closeAlertActive() {
                this.isShowAlert = false;
            },
            //重置
            resetActiveImg() {
                this.anserArr = [];
                let tempNumber = this.tempArrNum[this.tableIndex];
                this.otherWordArr = JSON.parse(JSON.stringify(dataData[tempNumber]['otherWords']));
            },
            //关闭弹窗
            closeGuessRightAlert() {
                this.GuessRightAlert = false;
            },
            //随机数
            /*下一题*/
            nextQuestion() {
                this.anserArr = [];
                if (this.tableIndex == this.tempArrNum.length) {
                    console.log('没题了', this.grade);
                    let gradeNum = this.grade;
                    this.$router.push('/resultPage' + '/' + gradeNum);
                    return;
                }

                let tempNumber = this.tempArrNum[this.tableIndex];
                this.musicSrc = dataData[tempNumber]['musicSrc'];
                this.musicBg = dataData[tempNumber]['imgBgSrc'];
                this.musicPosterImg = dataData[tempNumber]['rotateSrc'];
                this.messageAlertImg = dataData[tempNumber]['messageSrc'];
                this.otherWordArr = JSON.parse(JSON.stringify(dataData[tempNumber]['otherWords']));    //深度复制
                this.songWordsNameArr = dataData[tempNumber]['songName'];
                this.init();
            }

        }
    }
</script>
<style>
    .musicContainer {
        width: 100%;
        overflow: hidden;
    }

    .music_bg {
        width: 100%;
        /*height: 13.32rem;*/
        position: relative;
    }

    @keyframes p1Active {
        from {
            right: -200%;
        }
        to {
            right: 5%;
        }
    }

    .pause_img {
        width: 1.75rem;
        height: 1.74rem;
        position: absolute;
        top: 2.3rem;
    }

    .play_img {
        width: 1.75rem;
        height: 1.74rem;
        position: absolute;
        top: 2.4rem;
    }

    .musicContent {
        width: 100%;
        position: absolute;
        top: 1.8rem;
        z-index: 2;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        overflow: hidden;
    }

    .rotateAc {
        width: 6.65rem;
        height: 6.66rem;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        animation: rotate 4s linear infinite;
    }

    .rotateBc {
        width: 6.65rem;
        height: 6.66rem;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        overflow: hidden;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    /*提示弹窗*/
    .messageBox {
        position: absolute;
        top: 8rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 3;
    }

    .messageLeftImg {
        width: 1.17rem;
        height: .49rem;
        margin-left: 1.3rem;
    }

    .goAwayRightImg {
        width: .97rem;
        height: .49rem;
        margin-right: 1.3rem;
    }

    /*猜歌部分*/
    .guessSongBox {
        height: 3.4rem;
        position: absolute;
        top: 9rem;
        padding: 0 .4rem 0 .4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .songReluteBox {
        margin-left: .05rem;
        /*margin-right:.2rem;*/
        /*width: calc(100% - 0.2 * 2rem);*/
        height: .7rem;
    }

    /*结果列表*/
    .songRelute {
        width: .7rem;
        height: .7rem;
        background-color: #a81e22;
        border-radius: 10%;
        margin-right: .12rem;
        font-size: .5rem;
        font-weight: normal;
        color: #f3f2f8;
        text-align: center;
        line-height: .7rem;

    }

    /*提示弹窗*/
    .messageAlertBox {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
    }

    .messageAlertBox img {
        width: 100%;
        height: 13.32rem;
    }

    /*其他字*/
    .otherWordsContainer {
        height: 2rem;
        width: 5rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .otherWordsBox {
        border-radius: 10%;
        height: .9rem;
        width: .9rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        margin-right: .1rem;
        margin-bottom: .1rem;
    }

    .otherWords {
        width: .8rem;
        height: .8rem;
        background-color: #a81e22;
        line-height: .8rem;
        text-align: center;
        font-size: .5rem;
        font-weight: normal;
        color: #f3f2f8;
        border-radius: 10%;
    }

    .reset_img {
        /*position: absolute;*/
        /*top: 0.2rem;*/
        /*right: .1rem;*/
        width: .49rem;
        height: .49rem;
        margin-top: -0.2rem;

    }

    .GuessingContainer {
        position: absolute;
        top: -5%;
        z-index: 6;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .3)
    }

    .GuessingContainer img {
        width: 3.29rem;
        height: 3.14rem;
    }

    /*字体闪烁的效果 定义keyframe动画，命名为blink */
    @keyframes blink {
        0% {
            opacity: 1;
        }
        100% {
            opacity: .3;
        }
    }

    /* 添加兼容性前缀 */
    @-webkit-keyframes blink {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @-moz-keyframes blink {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @-ms-keyframes blink {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @-o-keyframes blink {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    /* 定义blink类*/
    .blink {
        color: #fff;
        animation: blink 1s ease-in-out infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: blink 1s linear infinite;
        -moz-animation: blink 1s linear infinite;
        -ms-animation: blink 1s linear infinite;
        -o-animation: blink 1s linear infinite;
    }

</style>
