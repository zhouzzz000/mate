<template>
  <div class="div-1">
    <input v-model.lazy.trim="email" placeholder="Email" class="input-1" />
    <input v-model.lazy.trim="password" type="password" placeholder="Passowrd" class="input-1" />
    <input v-model.lazy.trim="nick" placeholder="Nick" class="input-1" />
    <span class="span-2">{{content}}</span>
    <button type="button" class="input-1 button-1" @click="clickToRegister" >confirm</button>
    <button type="button" class="input-1 button-2" @click="clickToBack"><< Back</button>
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
        name: "register",
        created:function(){
          var _this = this;
          document.onkeydown = function(e) {
            let key = window.event.keyCode;
            if (key == 13) {
              _this.clickToRegister();
            }
          };
        },
        data() {
            return {
             content:'',
             nick:'',
             password:'',
             email:'',
             isOK: 0,
             emailIsOk:0,
             nickIsOk:0,
             passwordIsOk:0
            }
        },
        methods: {
          clickToBack() {
            this.$emit('change');
          },
          clickToRegister()
          {
            if (this.passwordIsOk && this.nickIsOk && this.emailIsOk){
              let data = {
                password:this.password,
                nick:this.nick,
                email:this.email,
                sex:0,
                age:0,
                avator:3
              };
              this.$emit('submit',1);
              this.$http.post(this.$store.state.url+'/user/sign_in',data).then(
                (e)=>{
                  this.$store.commit('userId',e.body.id);
                  this.$store.commit('token',e.body.token);
                  this.$cookie.set('token',e.body.token,1);
                  this.$cookie.set('user_id',e.body.id,1);
                  this.$emit('submit',0);
                  this.$message({
                    message:'注册成功!',
                    type:'success',
                    duration:1500,
                  })
                  this.$router.push({name:"info",replace:true});
                },(e)=>{
                  this.$emit('submit',0);
                  let code = e.body.errorCode;
                  if (code == 10001)
                  {
                    this.content = '邮箱已被注册';
                  }else{
                    this.content = '注册失败';
                  }
                }
              )
            } else{
              this.content = '邮箱、密码或者昵称格式不对';
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
             if (this.passwordIsOk == 1 && this.emailIsOk == 1 && this.nickIsOk == 1)
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
             if (this.passwordIsOk && this.emailIsOk && this.nickIsOk)
             {
               $('.button-1').css({
                 "background-color":"#199ED8",
                 "color":"#fff"
               })
             }
           }
         },
         nick:function (val) {
           if (val == ''){
             this.nickIsOk = 0;
             this.content = '';
             return;
           }
           if (!/^\w{3,25}$/.test(val))
           {
             this.nickIsOk = 0;
             this.content = '昵称不能少于3位！';
           }else{
             this.nickIsOk = 1;
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
         nickIsOk:function (val) {
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
         },
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
