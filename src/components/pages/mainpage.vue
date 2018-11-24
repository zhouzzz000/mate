<template>
  <div class="div-1">
    <div class="div-2">
      <friend @logout="clickToLogout" @change="clickChoose"></friend>
      <chat class="div-3" :userId="friendId" :userIndex="friendIndex"></chat>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import  Friend from './../comm/friend'
  import  Chat from './../comm/chat'
    export default {
        name: "mainpage",
        mounted:function(e) {
          let ws = new WebSocket("ws://localhost:8281");
          this.$store.commit('ws',ws);
          this.ws = ws;
          this.ws.onopen = this.onopen;
          this.ws.onmessage = this.onmessage;
          this.ws.onclose = this.onclose;
          this.$http.get(this.$store.state.url+'user/info',{headers:{token:this.$cookie.get('token')}})
            .then((e)=>{
              this.$store.commit('myInfo',e.body);
              if (e.body.is_modify == 0)
              {
                this.$router.push({name:'info'});
              }
            }).catch((err)=>{
             this.$router.push({name:'index'});
          });
          this.$http.get(this.$store.state.url+'friend/list',{headers:{token:this.$cookie.get('token')}})
            .then((e)=>{
              this.$store.commit('friendList',e.body);
            }).catch((err)=>{
              console.log(err);
          });
        },
        data() {
            return {
              // userInfo:'',
              url:this.$store.state.url,
              friendId:0,
              friendIndex:-1,
              ws:'',
              client_id:'',
            }
        },
      methods: {
        clickToLogout() {
          this.$confirm('即将退出, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!',
              duration:1000,
            });
            this.$cookie.set('token','',-1);
            this.$store.commit('token','');
            this.$store.commit('userId','');
            this.$store.commit('myInfo','');
            this.$router.push({name:'index'});
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消退出',
              duration:1500,
            });
          });
        },
        clickChoose(id,firendIndex) {
          this.friendId = id;
          this.friendIndex = firendIndex;
        },
        onopen:function () {

        },
        onmessage:function (msg) {
          let data = JSON.parse(msg.data);
          console.log(data);
          if (data.type == 'login'){
            let res = {
              'client_id': data.client_id,
            };
            this.$http.post('http://localhost/webmate/public/chat/bind', res, {headers:{token:this.$cookie.get('token')}}).then(
              (e) => {
                console.log("bind successful");
              }, (err) => {console.log(err);})
          }
        },
        onclose:function () {
          this.ws.close();
        }
      },
      computed:mapState({
        userInfo:state=>state.myInfo,
        count:function () {
          return 1;
        }
      }),
      components:{
          Friend,
          Chat
      }
    }
</script>

<style scoped>
div{
  border: 0;
  padding: 0;
  margin: 0;
}


  .div-2{
    /*border: 1px solid red;*/
    width: 900px;
    height: 600px;
    position: relative;
    margin: auto;
    margin-top: 4%;
    display: flex;
    flex-direction: row;
  }

</style>
