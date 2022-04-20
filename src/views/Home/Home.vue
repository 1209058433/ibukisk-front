<template>
  <div class="home-container">
    <div class="topNav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="/cover">返回封面</el-menu-item>
        <el-menu-item index="/home/index">首页</el-menu-item>
        <el-menu-item index="/home/azurlane">碧蓝航线</el-menu-item>
        <el-menu-item index="/home/backstage">后台管理</el-menu-item>
        <!-- 登录 -->
        <div class="login">
          <el-button
            type="text"
            @click="centerDialogVisible = true"
            v-if="ifnotLog"
            >登录后可使用管理员功能</el-button
          >
          <span class="welcome" v-else
            >欢迎！点击<el-button type="text" @click="logout"
              >退出</el-button
            ></span
          >

          <el-dialog
            title="登录"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <el-input
              placeholder="请输入密码"
              v-model.lazy="inputPassword"
              show-password
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false" ref="cancel"
                >取 消</el-button
              >
              <el-button type="primary" @click="login">登 录</el-button>
            </span>
          </el-dialog>
        </div>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import initData from "@/utils/initData";
import qs from "qs";
export default {
  name: "Home",
  created() {
    this.activeIndex = this.$route.path;
    this.ifLog();
  },
  updated() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      activeIndex: "",
      //login
      centerDialogVisible: false,
      //登录密码
      inputPassword: "",
      //是否登录
      ifnotLog: true,
    };
  },
  methods: {
    async login() {
      const { data: res } = await initData.post(
        "/login",
        qs.stringify({
          password: this.inputPassword,
        })
      );
      if (res.status === 0) {
        this.ifnotLog = false;
        this.inputPassword = "";
        this.$refs.cancel.$el.click();
        sessionStorage.setItem("userAdmin", res.password);
      } else {
        this.$message({
          message: "密码错误，你是谁？",
          type: "warning",
        });
      }
    },

    // async logout() {
    //   const { data: res } = await initData.post("/logout");
    //   if (res.status === 0) {
    //     this.ifnotLog = true;
    //   } else {
    //     alert("出现错误，退出失败");
    //   }
    // },

    logout() {
      sessionStorage.removeItem("userAdmin");
      this.ifnotLog = true;
    },

    async ifLog() {
      const { data: res } = await initData.post(
        "/ifLog",
        qs.stringify({
          session: sessionStorage.getItem("userAdmin"),
        })
      );
      if (res.status === 0) {
        this.ifnotLog = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  position: relative;
  background-image: url("@/assets/bgimg.webp");
  background-repeat: no-repeat;
  .topNav {
    position: relative;
  }
  .login {
    position: absolute;
    top: 10px;
    right: 30px;
  }
  .welcome {
    font-size: 15px;
  }
}
</style>