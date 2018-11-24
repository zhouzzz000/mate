<template>
    <div @click="clickDiv" class="div-1">
      <label class="label-1">昵称:<span class="span-1">{{userInfo.nick}}</span></label>
      <label class="label-1">性别:<span class="span-1">{{userInfo.sex}}</span></label>
      <label class="label-1">生日:<span class="span-1">{{userInfo.birth[0]}} 年 {{userInfo.birth[1]}} 月 {{userInfo.birth[2].split(' ')[0]}} 日 </span></label>
      <label class="label-1">签名:<span class="span-1">{{userInfo.signature}}</span></label>
      <label class="label-1">头像:<img class="span-1" :src="userInfo.avator.url"></img></label>
      <button v-if="userIndex!=-1" @click="clickToHidden" class="button-1"><< back</button>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
      props: {
        userIndex: {
          type: Number
        }
      },
      mounted(){
        if (this.userIndex == -1) {
          this.userInfo = this.$store.state.myInfo;
        }else{
          this.userInfo = this.$store.state.friendList[this.userIndex].friend_info;
        }
        if (this.userInfo.sex == 2) {this.userInfo.sex = '女'}
        else {
          this.userInfo.sex = '男';
        }
        if (this.userInfo.birth !== null ) {
          this.userInfo.birth = this.userInfo.birth.split('-');
        }
      },
      name: "userinfo",
      data() {
        return {
          userInfo: ''
        }
      },
      methods: {
        clickDiv(){
        },
        clickToHidden(){
          this.$emit('change');
        }
      },
      computed: mapState({
        userInfo: function () {
          if (this.userIndex == -1) {
            this.userInfo = this.$store.state.myInfo;
            if (this.userInfo.sex == 2) {this.userInfo.sex = '女'}
            else {
              this.userInfo.sex = '男';
            }
          }else{
            this.userInfo = this.$store.state.friendList[this.userIndex].friend_info;
          }
        }
      }),
      watch: {
        userIndex: function (val) {
          if (val == -1) {
            this.userInfo = this.$store.state.myInfo;
          }
          else this.userInfo = this.$store.state.friendList[this.userIndex].friend_info;
          if (this.userInfo.sex === 1){ this.userInfo.sex = '男'}
          else {
            this.userInfo.sex = '女'
          }
          if (this.userInfo.birth!=null) {
            this.userInfo.birth = this.userInfo.birth.split('-');
          }
          if(this.userInfo.signature==null)
          {
            this.userInfo.signature = null;
          }
        },
      }
    }
</script>

<style scoped>
.div-1{
  font-family: Arial;
  /*border: 1px solid red;*/
  margin: 0;
  border: none;
  border-radius: unset;
  height: 520px;
  display: flex;
  flex-direction: column;

}

  .span-1{
    margin-left: 30px;

    /*position: relative;*/
    /*top: 50px;*/
    /*margin-top: 50px;*/
  }

  .label-1{
    display: flex;
    margin-top: 50px;
    margin-left: 200px;
  }

  .button-1{
    color: #fff;
    width: 260px;
    height: 30px;
    margin-top: 20px;
    border-radius: 20px;
    background-color: #4076FF;
    border: 0px;
    outline: none;
    margin-left: 170px;
  }
</style>
