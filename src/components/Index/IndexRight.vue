<template>
  <div class="indexright-container">
    <div class="tip">
      <h2>关于这里</h2>
      <h3>{{ aboutIndex }}</h3>
    </div>
    <span class="topTip"
      >这里放一些网上复制来的东西吧,不知道放什么,自己写也可以</span
    >
    <el-tabs v-model="activeName" type="card" tab-position="left">
      <el-tab-pane
        :label="item.typeName"
        :name="String(item.id)"
        v-for="item in articleList"
        :key="item.id"
        ><div class="article">
          <ul
            class="infinite-list"
            v-infinite-scroll="load"
            style="overflow: auto"
          >
            <li
              v-for="art in item.content[0]"
              :key="art.id"
              class="infinite-list-item"
            >
              <router-link :to="{ path: '/home/article/' + art.id }">
                <!-- 加个图片封面 -->
                <el-image
                  style="width: 100px; height: 100px"
                  :src="art.cover"
                  fit="contain"
                ></el-image>
                <div class="about">
                  <!-- 作者 -->
                  <h4>作者:{{ art.author }}</h4>
                  <!-- 时间 -->
                  <h5>转发时间:{{ art.time }}</h5>
                </div>
                <div class="body">
                  <!-- 标题 -->
                  <h3>{{ art.title }}</h3>
                  <!-- 内容 -->
                  <p>{{ art.lightContent }}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import initData from "@/utils/initData";
import router from "@/router";
export default {
  created() {
    this.getAboutIndex();
    this.getArticle();
  },
  data() {
    return {
      aboutIndex: "",
      //文章列表
      articleList: [],
      //选项卡
      activeName: "1",
    };
  },
  methods: {
    async getAboutIndex() {
      const { data: res } = await initData.get("/about_index");
      this.aboutIndex = res.data;
    },

    load() {
      this.count += 2;
    },

    async getArticle() {
      const { data: res } = await initData.post("/article");
      this.articleList = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.indexright-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-tabs {
    background-color: rgba(247, 247, 247, 0.2);
    border-top-left-radius: 20px;
    width: 100%;
    /deep/.el-tabs__nav-scroll {
      border: none;
      margin-top: 100px;
      background-color: rgba(247, 247, 247, 0.6);
    }
  }

  .tip {
    margin: 20px 0;
    width: 80%;
    height: 140px;
    border-radius: 30px;
    border: 1px solid rgb(245, 245, 245);
    background-color: rgba(226, 226, 226, 0.2);
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    transition: 0.3s;
    background-color: rgb(247, 247, 247);
    h2 {
      text-align: center;
    }
    h3 {
      padding: 10px 20px;
      text-align: center;
      font-weight: 500;
      max-height: 190px;
      overflow: auto;
    }
  }
  .tip:hover {
    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .topTip {
    color: rgb(163, 163, 163);
    align-self: center;
  }
  .article {
    width: 95%;
    height: 660px;
    background-color: rgba(240, 240, 240, 0.2);
    border-radius: 10px;
    transition: 0.1s;
    display: flex;
    flex-direction: column;

    ul {
      width: 100%;
      height: 100%;
      li a {
        display: flex;
        justify-content: space-between;
        margin: 5px 10px;
        transition: 0.1s;
        min-width: 96%;
        height: 110px;
        overflow: hidden;
        padding: 4px 10px;
        background-color: rgb(252, 252, 252);
        border-radius: 15px;
        max-height: 120px;
        .body {
          flex: 1;
        }
        .about {
          max-width: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
        }
      }
      li a:hover {
        border: 1px solid rgb(86, 175, 235);
        background-color: #ebf8ff;
        cursor: pointer;
        transform: scale(1.01);
      }
    }
  }
}
</style>