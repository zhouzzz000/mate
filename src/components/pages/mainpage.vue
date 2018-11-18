<template>
  <div>
    hello {{userInfo.nick}}<br />
    <button @click="clickToLogout">登出</button>
    <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        name: "mainpage",
        mounted:function(e) {
          this.$http.get(this.url+'user/info',{headers:{token:this.$cookie.get('token')}})
            .then((e)=>{
              this.$store.commit('myInfo',e.body);
            }).catch((err)=>{
             this.$router.push({name:'index'});
          });
        },
        data() {
            return {
              // userInfo:'',
              url:this.$store.state.url,
            }
        },
      methods: {
        clickToLogout() {
            this.$cookie.set('token','',-1);
            this.$store.commit('token','');
            this.$store.commit('userId','');
            this.$store.commit('myInfo','');
            this.$router.push({name:'index'});
        }
      },
      computed:mapState({
        userInfo:state=>state.myInfo,
      })
    }
</script>

<style scoped>

</style>
