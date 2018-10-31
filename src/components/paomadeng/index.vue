<template>
    <section class="paoMaDeng">
        <section class="paoMaDengSec">
            <section v-for="(item,index) in list" :key="index" class="choose">
                <section class="items" v-if="item.select" v-html="item.key">
                </section>
                <section class="item" v-if="!item.select" v-html="item.key">
                </section>
            </section>
        </section>
        <section class="start" @click="start">
            开始
        </section>
    </section>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                list:[
                    {
                        key:'邓紫棋<br>签名照',
                        select:false,
                    },
                    {
                        key:'邓紫棋<br>签名海报',
                        select:false
                    },
                    {
                        key:'邓紫棋<br>演唱会门票',
                        select:false
                    },
                    {
                        key:'幸运星<br>10枚',
                        select:false
                    },
                    {
                        key:'谢谢参与',
                        select:true
                    },
                    {
                        key:'幸运星<br>60枚',
                        select:false
                    }
                ],
                canRun:true,
                times:0,
                pos:0,
                index:3,
                spped:100,
                cycle:50
            }
        },
        methods:{
            start(){
                if(this.canRun ){
                    this.canRun = false;
                    this.pos = 3;
                    this.rollRun();
                }
            },

            rollRun(){
                this.times+=1;
                this.roll();
                if(this.times > this.cycle+10  && this.pos == this.index){
                    this.canRun = true;
                    this.spped = 100;
                    this.times = 0;
                    return false
                }else{
                    if(this.times<this.cycle){
                        this.spped -= 5;
                    }else{
                        if(this.times> this.cycle+10 && this.pos == this.index+1){
                            this.spped += 150
                        }else{
                            this.spped += 5
                        }
                    }
                    if(this.spped<40){
                        this.spped = 40
                    }

                    setTimeout(()=>{
                        this.rollRun()
                    },this.spped);

                    return false
                }
            },

            roll(){
                if(this.index != -1){
                    this.$set(this.list[this.index],'select',false);
                }
                this.index += 1;
                if(this.index == this.list.length){
                    this.index = 0
                }

                this.$set(this.list[this.index],'select',true);
            }

        }
    }
</script>

<style  scoped>
    .paoMaDeng{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,1);
        z-index: 100;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
    }
    .paoMaDengSec{
        font-size: 1rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
    }
    .choose:nth-of-type(4){
        position: absolute;
        right: 0.15rem;
        top: 1.4rem;
    }
    .choose:nth-of-type(6){
        align-self: flex-start;
        flex-flow: row-reverse;
        position: absolute;
        left: 0.15rem;
        top: 1.4rem;
    }
    .items{
        width: 2rem;
        height: 1rem;
        margin: 0.2rem 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.2rem;
        text-align: center;
        border: 2px solid white;
        border-radius: 0.2rem;
        font-weight: bold;
    }
    .item{
         width: 2rem;
         height: 1rem;
         border: 1px solid #fefefe;
         margin: 0.2rem 0.2rem;
         display: flex;
         justify-content: center;
         align-items: center;
        font-size: 0.2rem;
        text-align: center;
        text-align: center;
        border-radius: 0.2rem;
     }
    .start{
        width: 50%;
        height: 1.4rem;
        background-color: white;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-size: 1rem;
    }
</style>
