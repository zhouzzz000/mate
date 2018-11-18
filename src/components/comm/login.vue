<template>
  <div class="div-1">
    <input v-model.lazy.trim="email" type="text" placeholder="Email" class="input-1" />
    <input v-model.lazy.trim="password" type="password" placeholder="Passowrd" class="input-1" />
    <span class="span-2">{{content}}</span>
    <span class="span-1" >find passowrd</span>
    <button type="button" class="input-1 button-1"  @click="clickToLogin">Sign in</button>
    <button type="button" class="input-1 button-2" @click="clickToRe" >Register</button>
  </div>
</template>

<script>
  import $ from 'jquery';

  $(document).ready(function () {
    $(".input-1").focus(function () {
       $(this).css({
        "border-color":"#199ED8"
      });
    }).blur(function () {
      $(this).css({
        "border-color":"#999"
      });
    });
  });
    export default {
        name: "login",
        data() {
            return {
              content:'',
              email:'',
              password:'',
              passwordIsOk:0,
              emailIsOk:0,
              loading:1
            }
        },
        methods:{
          clickToRe(){
            this.$emit('change');
          },
          clickToLogin() {
             if (this.emailIsOk && this.passwordIsOk) {
               let data = {
                 email: this.email,
                 password: this.password
               };
               this.$emit('submit',1);
               this.$http.post(this.$store.state.url+'user/login',data).then(
                 (e)=>{
                    this.$store.commit('userId',e.body.id);
                    this.$store.commit('token',e.body.token);
                    this.$cookie.set('token',e.body.token,1);
                    this.$emit('submit',1);
                    this.$message({
                      message:'登陆成功！',
                      type:'success',
                      duration:1500,
                    });
                    this.$router.push({name:"main",replace:true});
                 },(e)=>{
                   this.$emit('submit',1);
                  let code = e.body.errorCode;
                  if (code == 10000)
                  {
                    this.content = "密码错误";
                  }else if (code == 10003)
                  {
                    this.content = "用户不存在"
                  }else{
                    this.content = "登陆失败"
                  }
                 }
               );
             }else{
               this.content = "账号或密码格式不对"
             }
          }
        },
        watch:{
            email:function (val) {
                if (val == '') {
                  this.emailIsOk = 0;
                  this.content = '';
                  return;
                }
                if (!/^\w+@\w+\.(com)$/.test(val))
                {
                  this.emailIsOk = 0;
                  this.content = '邮箱格式不对！';
                }else{
                  this.emailIsOk = 1;
                  this.content = '';
                  if (this.passwordIsOk == 1 && this.emailIsOk == 1)
                  {
                    $('.button-1').css({
                      "background-color":"#199ED8",
                      "color":"#fff"
                    })
                  }
                }
            },
            password:function (val) {
              if (val == ''){
                this.passwordIsOk = 0;
                this.content = '';
                return;
              }
              if (!/^.{6,16}$/.test(val))
              {
                this.passwordIsOk = 0;
                this.content = '密码不能少于六位！';
              }else{
                this.passwordIsOk = 1;
                this.content = '';
                if (this.passwordIsOk == 1 && this.emailIsOk == 1)
                {
                    $('.button-1').css({
                      "background-color":"#199ED8",
                      "color":"#fff"
                    })
                }
              }
            },
            passwordIsOk:function (val) {
              if (val == 0)
              {
                $('.button-1').css({
                  "background-color":"#fff",
                  "color":"#999"
                })
              }
            },
            emailIsOk:function (val) {
            if (val == 0)
            {
              $('.button-1').css({
                "background-color":"#fff",
                "color":"#999"
              })
            }
          }
        }
    }
</script>

<style scoped>
.div-1{
  display: flex;
  flex-direction: column;
  /*text-align: center;*/
  justify-content: center;
  justify-items: center;
  align-items: center;
}
  .input-1{
    width: 250px;
    height: 30px;
    border-radius: 20px;
    border: 1px solid #999;
    font-size: 13px;
    font-family: Arial;
    margin-bottom: 10px;
    outline: none;
    text-align: center;
  }

  .input-1::-webkit-input-placeholder{
    position: relative;
    font-family: Arial;
    font-size: 8px;
    font-style: normal;
    left: -90px;
    /*color: red;*/
  }

  .input-1:focus::-webkit-input-placeholder{
    top: -10px;
    color: #199ED8;
  }

  .span-1{
     position: relative;
     font-family: Arial;
     font-size: 13px;
     font-style: normal;
     color: #199ED8;
     margin-bottom: 10px;
     right: -80px;
   }

  .span-2{
    position: relative;
    font-family: Arial;
    font-size: 13px;
    font-style: normal;
    color: red;
    margin-bottom: 10px;
    right: 80px;
  }

  .button-1{
    background-color: #fff;
    color: #999;
  }

  .button-2{
    background-color: #199ED8;
    color: #fff;
  }
</style>
