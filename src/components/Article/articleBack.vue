<template>
  <div class="articleBack-container">
    <div class="articleOperation">
      <router-link to="addarticle">
        <el-button size="small" round>添加文章</el-button>
      </router-link>
    </div>
    <el-table
      :data="articleList"
      border
      max-height="1500px"
      class="articleTable"
    >
      <el-table-column fixed prop="id" label="id" width="60"> </el-table-column>

      <el-table-column prop="cover" label="封面" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="150">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="150"> </el-table-column>
      <el-table-column prop="title" label="标题" width="300"> </el-table-column>
      <el-table-column prop="type" label="分类" width="100"> </el-table-column>
      <el-table-column prop="content" label="内容" width="6000">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <router-link :to="{ path: '/home/backstage/' + scope.row.id }">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button type="text" size="small" @click="open(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import router from "@/router";
import initData from "@/utils/initData";
import qs from "qs";
export default {
  created() {
    this.getArticleList();
  },
  data() {
    return {
      articleList: [],
    };
  },
  methods: {
    async getArticleList() {
      const { data: res } = await initData.post("/article");
      this.articleList = res.data[0].content[0];
    },

    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await initData.post(
            "/article",
            qs.stringify({
              del: "1",
              id: id,
            })
          );
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            history.go(0);
          } else {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.articleBack-container {
  width: 100%;
  .articleOperation {
    height: 40px;
    display: flex;
    align-items: center;
    button {
      margin-left: 20px;
    }
  }
  .articleTable {
    width: 100%;
    margin: 0 auto;
  }
}
</style>