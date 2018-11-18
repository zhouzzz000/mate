import Vue from 'vue'
import Vuex from 'vuex'
import ajax from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    url:'http://zzwzs.xyz/webmate/api/',
    user_id:'',
    token:'',
    userful:0,
    errCode: 0,
    myInfo:''
  },
  mutations:{
      userId(state,id)
      {
        this.state.user_id = id;
      },

      token(state,token){
         this.state.token = token;
       },

      myInfo(state,info){
        this.state.myInfo = info;
      }

  },
  actions:{
      getMyInfo(context) {
        if (this.token != '') {
          ajax({
            url: this.state.url + 'user/info',
            method: 'get',
            headers: {
              token: this.state.token,
            },
          }).then((e) => {
            // this.state.myInfo = e.data;
            // console.log(this.state.myInfo);
            context.commit('myInfo',e.data);
          }).catch((err)=>{
            console.log(err.response);
          })
        }
      }
  },
  getters:{

  }
});

export default store;
