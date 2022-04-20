<template>
  <div class="coverdrawer-container">
    <el-button
      type="text"
      @click="table = true"
      class="el-icon-menu"
    ></el-button>
    <el-drawer
      title="抽屉"
      :visible.sync="table"
      direction="ltr"
      size="20%"
      class="drawer"
    >
      <!-- 自己信息的盒子 -->
      <div class="drawerMe">
        <!-- 头像 -->
        <el-avatar :size="150">
          <img :src="headImg" />
        </el-avatar>
        <h1>{{ $store.state.myName }}</h1>
        <!-- 小导航 -->
        <el-button type="text" @click="centerDialogVisible = true"
          >关于我</el-button
        >

        <el-dialog
          title="关于我"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
          :modal="false"
          :destroy-on-close="true"
        >
          <div class="aboutMe">
            <span>
              github:
              <a href="https://github.com/1209058433" target="_blank"
                >https://github.com/1209058433</a
              >
            </span>
            <span>
              gitee:
              <a href="https://gitee.com/yi-blow" target="_blank"
                >https://gitee.com/yi-blow</a
              >
            </span>
            <span> QQ:1209058433 </span><span> 微信:w15127292198 </span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>

        <router-link to="/home" class="goRouter">进入首页</router-link>
        <router-link to="/home/azurlane" class="goRouter">碧蓝航线</router-link>
        <router-link to="/home/backstage" class="goRouter"
          >后台管理</router-link
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import initData from "@/utils/initData.js";
import router from "@/router";
export default {
  name: "Drawer",
  created() {
    this.getmyself();
  },
  data() {
    return {
      //抽屉
      table: false,
      dialog: false,
      loading: false,
      //小导航栏
      centerDialogVisible: false,
      //自己的信息
      headImg: "",
    };
  },
  methods: {
    //抽屉
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },

    //自己的信息
    async getmyself() {
      const { data: res } = await initData.get("/getmyself");
      this.headImg = res.data.head;
    },
  },
};
</script>

<style lang="less" scoped>
.coverdrawer-container {
  //唤出抽屉的按钮
  .el-icon-menu {
    width: 80px;
    height: 80px;
    font-size: 35px;
    color: rgb(224, 224, 224);
    transition: 0.4s;
  }
  .el-icon-menu:hover {
    transform: rotate(180deg);
  }

  //抽屉本体
  .drawerMe {
    display: flex;
    flex-direction: column;
    align-items: center;
    .aboutMe {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        font-size: 16px;
        padding: 4px;
        a:hover {
          color: hotpink;
        }
      }
    }
    h1 {
      margin-top: 10px;
    }
    .goRouter {
      font-size: 20px;
      transition: 0.3s;
      padding: 10px 50px;
    }
    .goRouter:hover {
      font-size: 25px;
      border: 1px solid hotpink;
      color: hotpink;
    }
  }
}
</style>