<template>
  <div class="div-1">
      <div class="div-2"  @click="clickToLogin"  v-loading="loading" :element-loading-text="loadingMsg">
          <div class="div-3" >
            <span class="span-1">WebMate</span>
          </div>
        <div class="div-4">
         <transition :name="sild" mode="out-in">
              <login key="login" v-if="isLogin" @submit="login" @change="clickToRegister"></login>
              <register key="register"  v-if="isRegister" @submit="register" @change="clickToLogin2"></register>
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
  import Login from './../comm/login'
  import $ from 'jquery'
  import Register from "./../comm/register"
    $(document).ready(function () {
      $(".div-2").click(function () {
        $(".div-3").animate({
            top:'-100px'
          },"500");
      });

    });
    export default {
        name: "index",
        components:{
          Register,
          Login,
        },
        mounted(){
          this.$http.post(this.$store.state.url+'user/login',null,{headers:{token:this.$cookie.get('token')}}).then(
            (e)=>{
              this.tokenIsUse = 1;
            },(err)=>{console.log(err)}
          )
        },
        data() {
            return {
              isLogin:0,
              isRegister:0,
              sild:'sildin',
              tokenIsUse:0,
              loading:0,
              loadingMsg:""
            }
        },
      methods:{
        clickToLogin()
        {
          var that = this;
          $(".div-1").click(function () {
            $(".div-3").animate({
              top: '-100px'
            }, "500")
          });
          setTimeout(function () {
            if (that.tokenIsUse)
            {
              that.$message({
                message:'登陆成功！',
                type:'success',
                duration:1000,
              });
              that.$router.push({name:'main'});
            }
            else if (!that.isRegister) {
              that.isLogin = 1;
            }
          },300);
        },
        clickToRegister()
        {
            this.isLogin = 0;
            this.isRegister = 1;
            this.sild = 'sildin';
        },
        clickToLogin2(){
          this.isLogin = 1;
          this.isRegister = 0;
          this.sild = 'sildout';
        },
        login(tag)
        {
          this.loadingMsg = '登陆中';
          this.loading = tag;
        },
        register(tag)
        {
          this.loadingMsg = '注册中';
          this.loading = tag;
        }
      }
    }
</script>

<style scoped>
  .sildin-enter-active, .sildin-leave-active{
    transition: all .5s ease-in-out;
    /*position: relative;*/
  }

  .sildin-enter{
     transform: translateX(300px);
   }
  .sildin-leave-to{
    transform: translateX(-300px);
    /*opacity: 0;*/
  }

  .sildout-enter-active, .sildout-leave-active{
    transition: all .5s ease-in-out;
    /*position: relative;*/
  }

  .sildout-enter{
    transform: translateX(-300px);
  }
  .sildout-leave-to{
    transform: translateX(300px);
    /*opacity: 0;*/
  }

  .div-1{
    overflow-x: hidden;
    /*border: 1px solid red;*/
    width: 350px;
    margin-left: auto;
    margin-right: auto;
  }

  .div-2{
    /*border: 1px solid red;*/
    text-align: center;
    width: 350px;
    height: 270px;
    border: 0;
    padding: 0;
    border-radius: 30px;
    background-color: #DBDBDB;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;

  }

  .div-3{
    /*border: 1px solid red;*/
    position: relative;
    top: 80px;
  }

  .div-4{
    position: relative;
    top:-60px;
  }

  .span-1{
    font-size: 65px;
    color: #FFFFFF;

    font-family: Matura MT Script Capitals;
  }
</style>
