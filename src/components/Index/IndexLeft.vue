<template>
  <div class="indexleft-container">
    <!-- 个人资料 -->
    <div class="Ltop">
      <!-- 要有maring所以单独再搞一个盒子 -->
      <div class="myself">
        <el-avatar :size="120" class="headImg">
          <img :src="headImg" />
        </el-avatar>
        <h1>{{ $store.state.myName }}</h1>
        <h5>{{ idea }}</h5>
        <br />
        <span class="bailan">
          <p>嗯??:</p>
          {{ bailan }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import initData from "@/utils/initData.js";
export default {
  created() {
    this.getmyself();
  },
  data() {
    return {
      //essay
      essay: [],
      count: 0,
      //myself
      idea: "",
      favGames: "",
      favAnimates: "",
      headImg: "",
      favothers: "",
      bailan: "",
    };
  },
  methods: {
    //essay
    load() {
      this.count += 2;
    },
    //请求信息
    async getmyself() {
      const { data: res } = await initData.get("/getmyself");
      this.idea = res.data.idea;
      this.favGames = res.data.favGames;
      this.favAnimates = res.data.favAnimates;
      this.headImg = res.data.head;
      this.favothers = res.data.favOthers;
      this.bailan = res.data.bailan;
    },
  },
};
</script>

<style lang="less" scoped>
.indexleft-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .Ltop {
    width: 80%;
    height: 450px;
    border: 1px solid rgb(245, 245, 245);
    transition: 0.3s;
    background-color: rgb(247, 247, 247);
    border-bottom: 1px solid rgb(180, 180, 180);
    border-radius: 20px;
    margin-top: 100px;

    .myself {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      flex: 1;
      .headImg {
        align-self: center;
      }
      h5 {
        margin: 0 10px;
        text-indent: 2em;
      }
      span {
        margin: 0 10px;
        margin-top: 5px;
        align-self: flex-start;
        p {
          color: rgb(255, 134, 227);
        }
      }
      .bailan {
        max-height: 150px;
        overflow: auto;
      }
    }
  }
  .Ltop:hover {
    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>