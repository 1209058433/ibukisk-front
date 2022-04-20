<template>
  <div class="backstage-container">
    <el-page-header @back="$router.back()" content="详情页面" class="goBack">
    </el-page-header>
    <ArticleBack></ArticleBack>
  </div>
</template>

<script>
import ArticleBack from "@/components/Article/articleBack.vue";
export default {
  components: {
    ArticleBack,
  },
};
</script>

<style lang="less" scoped>
.backstage-container {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  .goBack {
    padding: 10px 0;
    border-bottom: 1px solid rgb(243, 243, 243);
  }
}
</style>