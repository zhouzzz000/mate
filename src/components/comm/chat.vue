<template>
  <div class="div-1">
    <div class="div-header">
        <img class="img-1" :src="userInfo.avator.url">
        <div class="div-2">
          <span class="span-1">{{userInfo.nick}}</span>
          <span class="span-1" style="letter-spacing: normal;font-size: 15px;margin-right: 20px;margin-top: 5px">{{userInfo.signature}}</span>
        </div>
      <div class="div-3" v-if="userIndex != -1">
        <button class="button-1" style="position:relative;top: 7px"></button>
        <button class="button-2" @click="clickShowInfo"></button>
        <button class="button-3"></button>
      </div>
    </div>
    <div class="div-footer">
      <transition name="silder">
        <user-info v-if="showInfo" @change="clickToHidden" class="user-info" :userIndex="userIndex"></user-info>
      </transition>
      <msg :userIndex="userIndex" class="msg-1"></msg>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import UserInfo from './userinfo'
    import Msg from './msg'
    export default {
      components: {
        UserInfo,
        Msg,
      },
      props: {
          userId:{
            type:Number
          },
          userIndex:{
            type:Number
          },
        },
        name: "chat",
        data() {
            return {
              showInfo:1
            }
        },
        methods:{
          clickImg(){
          },
          clickShowInfo(){
            this.showInfo = !this.showInfo;
          },
          clickToHidden()
          {
            this.showInfo = 0;
          }
        },
        computed:mapState({
          userInfo:function () {
            if (this.userIndex == -1)
            {
              this.showInfo = 1;
              return this.$store.state.myInfo;
            }else{
              this.showInfo = 0;
              return this.$store.state.friendList[this.userIndex].friend_info;
            }
          },
          watch:{
            userIndex:function (val) {
              if (this.userIndex != -1){
                this.showInfo = 0;
              }
              this.userInfo = this.$store.state.friendList[this.userIndex].friend_info;
            }
          },
        })
    }
</script>

<style scoped>
  .div-1{
    width: 620px;
    margin-left: 30px;
    border-radius: 20px;
    height: 600px;
    border: 1px solid #8c939d;
    overflow: hidden;
  }

  .div-header{
    height: 80px;
    display: flex;
    flex-direction: row;
    background-color: #000;
  }

  .div-footer{
    background-color: #fff;
    /*border: 1px solid red;*/
    height: 520px;
  }

  .img-1{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-top: 4px;
    margin-left: 18px;
  }

  .div-2{
    margin-top: 7px;
    width:300px;
    max-width: 300px;
    /*border: 1px solid red;*/
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    color: white;
  }

  .span-1{
    font-family: 华文楷体;
    font-weight: 700;
    font-size: 23px;
    letter-spacing: 2px;
    color: #fff;
  }

  .div-3{
    /*position: absolute;*/
  }

  .button-1{
    background-image: url("./../../assets/gaungchangziji.png");
    /*opacity: 0;*/
    border: 0px;
    background-repeat:no-repeat;
    /*background: transparent;*/
    background-color:rgba(220,38,38,0.2);
    margin-left: 30px;
    width: 35px;
    height: 35px;
    margin-top: 20px;

  }

  .button-2{
    background-image: url("../../assets/userinfo.png");
    background-color:rgba(220,38,38,0.2);
    background-repeat:no-repeat;
    margin-left: 30px;
    border: 0px;
    width: 35px;
    height: 35px;
    margin-top: 20px;
  }

  button{
    outline: none;
  }

  .button-3{
    background-image: url("./../../assets/deluser.png");
    background-color:rgba(220,38,38,0.2);
    background-repeat:no-repeat;
    margin-left: 30px;
    border: 0px;
    width: 35px;
    height: 35px;
    margin-top: 20px;
  }

  .user-info{
    position: relative;
    z-index: 2;
    /*border: 3px solid red;*/
  }

  .msg-1{
    position: relative;
    z-index: 1;
  }

  .silder-enter-active, .silder-leave-active{
    transition: all .3s;
    /*top: -600px;*/
  }

  .silder-enter{
    transform: translateY(-450px);
  }

  .silder-leave-to{
    transform: translateY(-470px);
  }
</style>
