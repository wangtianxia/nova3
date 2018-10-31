<template>
    <div id='return' v-on:click='returnToIndex'>
        <img src="static/return.png" style='width:0.56rem;'>
    </div>
</template>

<script>
    export default {
        name: "return",

        methods:{
            returnToIndex(){
                this.$emit('returnToIndex')
            }
        }
    }
</script>

<style scoped>
    #return{
        position: absolute;
        left: 0;
        z-index: 105;
        top: 0;
        width: 1rem;
        height: 1rem;
    }
    #return>img{
        width: 0.56rem;
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
    }
</style>
