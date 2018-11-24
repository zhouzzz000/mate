<template>
  <div class="div-1">
    <div class="div-2"><span class="span-1">请先完善资料</span></div>
    <div class="div-3">
      <div class="div-4">
        <label>*昵称:</label>
        <input
          v-model="nick"
          class="input-1"
          type="text"
          name="nick"
          :placeholder="userInfo.nick"
        />
      </div>

      <div class="div-4">
        <label>*性别:</label>
        <el-radio-group
          style="margin-left: 20px"
          v-model="sex"
          text-color="blue"
          @change="clickInfo"
        >
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </div>

      <div class="div-4">
        <label>*生日:</label>
        <el-date-picker
          style="bottom: 3px;left: 15px;width: 245px"
          size="small"
          v-model="birth"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="clickInfo"
        ></el-date-picker>
      </div>

      <div class="div-4">
        <label>*签名:</label>
        <input
          v-model="signature"
          class="input-1"
          type="text"
          name="sign"
          :placeholder="defaultSignature"
        />
      </div>

      <div class="div-4 div-5">
        <label style="position: relative;">*头像:</label>
        <div class="div-6" v-for="item in avator">
          <img
            style="border: 1px solid #999;border-radius: 51%"
            class="img-1"
            :src="item.url"
          />
          <el-radio
            style="margin-top: 10px"
            v-model="avatorId"
            :label="item.id"
            @change="clickInfo"
            >{{ xxxx }}</el-radio
          >
        </div>
      </div>
      <div style="margin-left: auto;margin-right: auto;margin-top: 12px">
        <span>（请从上面三选一）</span>
      </div>
    </div>

    <div class="div-7">
      <button @click="clickConfirm" class="button-1">Confirm</button>
    </div>

    <div v-if="userInfo.is_modify" class="div-7" @click="clickBack">
      <button  style="background-color: #199ed8;color: #fff" class="button-1"><< Back</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "info",
  mounted() {
    this.$http.get(this.$store.state.url + "image/default").then(
      e => {
        this.avator = e.body;
      },
      err => {
        console.log(err);
      }
    );
    this.$http
      .get(this.$store.state.url + "user/info", {
        headers: { token: this.$cookie.get("token") }
      })
      .then(e => {
        this.$store.commit("myInfo", e.body);
        if (this.userInfo.sex) {
          this.sex = this.userInfo.sex;
        }
        if (this.userInfo.birth) {
          this.birth = this.userInfo.birth;
        }
        if (this.userInfo.signature) {
          this.defaultSignature = this.userInfo.signature;
        }
        if (this.userInfo.avator.id) {
          this.avatorId = this.userInfo.avator.id;
        }
      });
  },
  data() {
    return {
      sex: -1,
      birth: "",
      nick: "",
      signature: "",
      avator: "http://zzwzs.xyz/images/avator1.jpg",
      avatorId: "",
      xxxx: "",
      defaultSignature: "Signature"
    };
  },
  methods: {
    clickConfirm(e) {
      let data;
      if (this.nick && !this.nickIsok) {
        console.log(this.nickIsok)
        this.$message({
          message: "昵称不能少于三位字符",
          type: "warning",
          duration: 1000
        });
      } else if (this.sex == -1) {
        this.$message({
          message: "请选择性别",
          type: "warning",
          duration: 1000
        });
      } else if (this.birth == "") {
        this.$message({
          message: "请选择生日",
          type: "warning",
          duration: 1000
        });
      } else if (this.avatorId == "") {
        this.$message({
          message: "请选择头像",
          type: "warning",
          duration: 1000
        });
      } else {
        let tmp = new Date();
        let year = tmp.getFullYear();
        let tt = this.birth.split('-')[0];
        let age = year - tt;
        data = {
          sex: this.sex,
          birth: this.birth,
          signature: this.signature,
          avator: this.avatorId,
          is_modify: 1,
          age:age
        };
        if (this.nick) {
          data["nick"] = this.nick;
        }
        if (!this.signature)
        {
          data.signature = this.defaultSignature;
        }
        let header = {
          token:this.$cookie.get("token")
        };
        this.$http.post(this.$store.state.url+'user/change/info',data,{headers:header}).then(
          (e)=>{
            this.$message({
              message: "修改成功！",
              type: "success",
              duration: 1000
            });
            this.$router.push({name:'main',replace:false})
          }
        );

      }
    },
    clickInfo(e) {},
    clickBack(){
      this.$router.push({name:'main'});
    }
  },
  computed: mapState({
    userInfo: state => state.myInfo,
    nickIsok: function() {
      if (!/^\w{3,25}$/.test(this.nick)) {
        return false;
      }
      return true;
    }
  })
};
</script>

<style scoped>
.div-1 {
  font-family: Arial;
  color: #666;
  font-size: 15px;
  margin: 0;
  padding: 0;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 600px;
  width: 420px;
  top: 50px;
  /*border: 1px solid red;*/
  border-radius: 30px;
  background-color: #ededed;
  overflow: hidden;
}

.div-2 {
  margin: 0;
  padding: 0;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  width: 420px;
  top: 0px;
  border-top-radius: 30px;
  background-color: #fff;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
}

.span-1 {
  position: relative;
  margin-top: auto;
  font-family: Adobe 楷体 Std;
  font-size: 24px;
  color: #666;
}

.div-3 {
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
}

.div-4 {
  margin: 0px;
  padding: 0px;
  margin-top: 30px;
  margin-left: 20px;
}

.input-1 {
  position: relative;
  top: -3px;
  width: 250px;
  height: 28px;
  border-radius: 20px;
  border: 1px solid #999;
  font-size: 13px;
  font-family: Arial;
  /*margin-bottom: 30px;*/
  margin-left: 10px;
  outline: none;
  text-align: center;
}

.input-1::-webkit-input-placeholder {
  position: relative;
  font-family: Arial;
  font-size: 8px;
  font-style: normal;
  left: -90px;
  /*color: red;*/
}

.input-1:focus::-webkit-input-placeholder {
  top: -10px;
  color: #199ed8;
}

.img-1 {
  width: 90px;
  height: 90px;
}

.div-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  flex-wrap: wrap;
}

.div-5 {
  display: flex;
  flex-direction: row;
}

.div-7 {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-1 {
  position: relative;
  top: -3px;
  width: 250px;
  height: 35px;
  border-radius: 20px;
  border: 1px solid #999;
  font-size: 13px;
  font-family: Arial;
  /*margin-bottom: 30px;*/
  background-color: #fff;
  margin-left: 10px;
  outline: none;
  text-align: center;
}

.button-1:hover {
  background-color: #199ed8;
  color: #fff;
  border: #fff;
}
</style>
