<template>
  <div class="article-container">
    <el-page-header @back="$router.back()" content="详情页面"> </el-page-header>
    <div class="articleBox">
      <el-image :src="cover"></el-image>
      <h1>{{ title }}</h1>
      <div class="author">
        <h4>作者:{{ author }}</h4>
        <h4>转发时间:{{ time }}</h4>
      </div>
      <p v-html="content"></p>
      <br />
      <br />
      <h3>
        <a :href="from" target="_blank">原文地址:{{ from }}</a>
      </h3>
    </div>
    <el-backtop :right="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
            border-radius: 50%;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import initData from "@/utils/initData.js";
import qs from "qs";
export default {
  created() {
    this.getThisArticle();
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      cover: "",
      title: "",
      author: "",
      time: "",
      content: "",
      from: "",
    };
  },
  methods: {
    async getThisArticle() {
      const { data: res } = await initData.post(
        "/article",
        qs.stringify({
          id: this.id,
        })
      );
      this.cover = res.data[0].cover;
      this.title = res.data[0].title;
      this.author = res.data[0].author;
      this.time = res.data[0].time;
      this.content = res.data[0].content;
      this.from = res.data[0].from;
    },
  },
};
</script>

<style lang="less" scoped>
.article-container {
  width: 80%;
  margin: 0 auto;
  .el-page-header {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    padding-left: 10px;
  }
  .articleBox {
    box-sizing: border-box;
    padding: 0 140px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgb(233, 233, 233);
    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(250, 250, 250);
    h1 {
      text-align: center;
      margin-top: 20px;
    }
    .author {
      padding: 10px;
      h4 {
        padding: 5px;
        text-align: center;
      }
    }
    p {
      text-indent: 2em;
      font-size: 22px;
      line-height: 190%;
    }
  }
}
</style>