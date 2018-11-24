<template>
  <div class="div-1">
    <div class="div-2">
      <transition-group name="slide">
        <div v-for="(item,index) in message"  :key="index" :class='userId == item.sid?"div-msg":"div-msg-2"'>{{item.content}}</div>
      </transition-group>
    </div>
    <div class="div-3">
        <button class="button-2"></button>
        <button class="button-3"></button>
    </div>
    <textarea placeholder="请输入内容" class="textarea-4"></textarea>
    <button class="button-1">发送</button>
  </div>
</template>

<script>
  import $ from 'jquery'

    // $('.textarea-4').emoji('.button-1')
    export default {
        name: "msg",
        props:{
          userIndex:{
            type:Number
          }
        },
        mounted(){
          console.log(this.$store.state.ws);
          this.userId = this.$cookie.get('user_id');
          console.log(this.userId);
        },
        data() {
            return {
              message:'',
              userId:'',
            }
        },
        watch:{
          userIndex:function (val) {
             let uid = this.$store.state.friendList[val].fid;
             this.$http.get(this.$store.state.url+'message/history?fid='+uid,{headers:{token:this.$cookie.get('token')}})
               .then((e)=>{
                 this.message = e.body;
                 this.userId = this.$cookie.get('user_id');
                 console.log(this.message)
               },(err)=>{console.log(err)});
          }
        },
    }
</script>

<style scoped>
  .div-1{
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 0px;
    /*border: 1px solid red;*/
  }

  .div-2{
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    border: 0;
    width: 620px;
    /*border: 1px solid red;*/
    border-bottom: 1px solid #999;
    height: 360px;
    overflow-y: scroll;
    margin-bottom: 5px;
    margin-top: 10px;
  }

  .div-3{
    padding: 0;
    margin: 0;
    border: 0;
    width: 620px;
    /*border: 1px solid red;*/
    height: 30px;
  }
  .textarea-4{
    color: #000;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 700;
    padding: 0;
    margin: 0;
    border: 0;
    width: 600px;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid #66b1ff;
    height: 60px;
  }

  .button-1{
    letter-spacing: 5px;
    width: 65px;
    height: 25px;
    border-radius: 20px;
    border: 1px solid #999;
    background-color: #fff;
    float: right;
    margin-right: 30px;
    margin-top: 5px;
    outline: none;
  }

  .button-1:hover{
    background-color: #199ED8;
    color: #fff;
  }

  .div-msg{
    color: #fff;
    padding: 5px;
    background-color: #66b1ff;
    max-width: 150px;
    border-radius: 7px;
    word-break: break-all;
    margin-left: 15px;
    margin-top: 5px;
  }

  .div-msg-2{
    color: #fff;
    padding: 5px;
    background-color: #00ff00;
    max-width: 150px;
    border-radius: 7px;
    word-break: break-all;
    margin-right: 15px;
    margin-top: 5px;
    position: relative;
    left: 430px;
  }

  .slide-enter-active, .slide-enter-active{
    transition: all .5s;
  }

  .slide-enter{
    opacity: 0;
  }

  .button-2{
    width: 24px;
    height: 24px;
    border: 0px;
    padding: 0px;
    background-image: url("./../../assets/emot.png");
    background-color: #fff;
    margin-left: 20px;
    /*margin-top: 5px;*/
    position: relative;
    top: 3px;
  }

  .button-3{
    width: 24px;
    height: 19px;
    border: 0px;
    padding: 0px;
    margin-left: 20px;
    margin-top: -10px;
    background-color: #fff;
    background-image: url("./../../assets/image.png");
  }

</style>
