<template>
   <div class="div-1">
     <div class="div-header">
       <div class="div-3"  @click="clickChoose(0,-1)" >
          <img class="img-1" :src="userInfo.avator.url">
         <div class="div-4">
           <span class="span-1">{{userInfo.nick}}</span>
           <span class="span-1" style="letter-spacing: normal;font-size: 12px;margin-right: 10px;margin-top: 5px">
             {{userInfo.signature}}</span>
         </div>
       </div>
     </div>
     <div class="div-mid">
       <div  v-for="(item,index) in friendList">
         <div class="div-2" @click="clickChoose(item.fid,index)">
           <img class="img-2" :src="item.friend_info.avator.url" />
           <div class="div-5">
             <span class="span-1" style="color: #000">{{item.remarks?item.remarks:item.friend_info.nick}}</span>
             <span class="span-1" style="color: #000; letter-spacing: normal;font-size: 12px;margin-right: 20px;margin-top: 5px">
               {{item.friend_info.signature}}</span>
           </div>
           <div v-if="unreadList[item.fid]" class="div-7">{{unreadList[item.fid]}}</div>
         </div>
       </div>
     </div>
     <div class="div-footer">
       <div class="div-6">
         <button @click="clickToGuangchang" class="button-1"></button>
         <button @click="clickToEditInfo" class="button-2"></button>
         <button @click="clickToAddUser" class="button-3"></button>
         <button @click="clickToLogout" class="button-4"></button>
       </div>
     </div>
   </div>
</template>

<script>
   import { mapState } from 'vuex'
    export default {
        name: "friend",
        mounted(){
          this.$http.get(this.$store.state.url+'message/unread',{headers:{token:this.$cookie.get('token')}}).then(
            (e)=>{
              this.unreadList = e.body.num;
            }
          )
        },
        data() {
            return {
              chooseId:0,
              unreadList:''
            }
        },
        methods:{
          clickChoose(id,index){
            this.$emit('change',id,index);
            this.chooseId = id;
            this.unreadList[id] = 0;
          },
          clickToLogout(){
            this.$emit('logout');
          },
          clickToAddUser(){

          },
          clickToEditInfo(){
            this.$router.push({name:'info'});
          },
          clickToGuangchang(){

          }
        },
        computed:mapState({
          userInfo:state=>state.myInfo,
          friendList:state=>state.friendList
        })
    }
</script>

<style scoped>

  div{
    border: 0;
    padding: 0;
    margin: 0;
  }

  .div-1{
    position: relative;
    height: 600px;
    width: 250px;
    border-right:1px #8c939d solid ;
    border-radius: 20px;
    /*border: 1px solid blue;*/
    overflow-y:hidden ;
    overflow-x: hidden;
    border-bottom:1px #8c939d solid  ;
  }

  .div-header{
    position: relative;
    margin-top: 0;
    height: 70px;
    background-color: #000;
  }

  .div-footer{
    /*bottom: 0;*/
    position: relative;
    top: 0px;
    height: 50px;
    background-color: #E4E4E4;
    border-top: 1px solid #8c939d;
    border-left:  1px solid #8c939d;
  }

  .div-mid{
      position: relative;
      margin-top: 0;
      height: 480px;
      height: 480px;
      width: 270px;
      border-left:1px #8c939d solid ;

    /*background: #5daf34;*/
      overflow: auto;
      background: #E4E4E4
  }

  .div-2{
    height: 70px;
    border-bottom: 0.5px solid #8c939d;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    vertical-align: middle;
  }

  .div-2:hover{
    background-color: #dbdbdb;
  }

  .div-3{
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    vertical-align: middle;
  }

  .img-1{
    position: absolute;
    top: 10px;
    margin-left: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }


  .div-4{
    position: relative;
    display: flex;
    margin-top: 11px;
    margin-left: 80px;
    flex-direction: column;
  }

  .span-1{
    font-family: 华文楷体;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 2px;
    color: #fff;
  }

  .div-5{
    position: relative;
    display: flex;
    margin-top: -10px;
    margin-left: 80px;
    flex-direction: column;
  }

  .img-2{
    position: absolute;
    margin-left: 15px;
    width: 50px;
    height: 50px;
  }

  .div-6{
    display: flex;
    flex-direction: row;
    /*margin-left: 100px;*/
    margin-top: 10px;
  }

  .button-1{
    width: 35px;
    height: 35px;
    margin-left: 20px;
    margin-top: -5px;
    background-image: url("./../../assets/guangchanghaoyou.png");
    background-color:#E4E4E4;
    border: none;
    outline: none;
    background-repeat:no-repeat;
  }
  .button-2{
    width: 35px;
    height: 30px;
    margin-left:20px;
    background-image: url("./../../assets/ziliao.png");
    background-color:#E4E4E4;
    border: none;
    outline: none;
    background-repeat:no-repeat;
  }
  .button-3{
    width: 35px;
    height: 30px;
    margin-left: 20px;
    background-image: url("./../../assets/adduser.png");
    background-color:#E4E4E4;
    border: none;
    outline: none;
    background-repeat:no-repeat;
  }
  .button-4{
    width: 35px;
    height: 30px;
    margin-left: 20px;
    background-image: url("./../../assets/logout.png");
    background-color:#E4E4E4;
    border: none;
    outline: none;
    background-repeat:no-repeat;
  }

  .div-7{
    border-radius: 50%;
    background-color: #199ed8;
    color: #fff;
    width: 15px;
    height: 15px;
    font-size: 11px;
    /*border: 1px solid red;*/
    position: absolute;
    left: 210px;
    z-index: 10;
    text-align: center;
  }
</style>
