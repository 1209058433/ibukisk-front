<template>
  <div class="roledown-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="item.name"
        :name="String(item.id)"
        v-for="item in clothesLines"
        :key="item.id"
      >
        <el-table
          :data="item.lines"
          style="width: 100%"
          :cell-style="fontWeight"
        >
          <el-table-column prop="title" label="标题" width="180" align="center">
          </el-table-column>
          <el-table-column prop="content" label="内容" width="1240">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import initData from "@/utils/initData";
export default {
  created() {
    this.getRoleLines();
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      activeNames: "1",
      clothesLines: [],
    };
  },
  methods: {
    async getRoleLines() {
      const { data: res } = await initData.get("/azur", {
        params: {
          id: this.id,
        },
      });
      this.clothesLines = res.theRole[0].clothesLines;
    },
    fontWeight(row) {
      if (row.column.label === "标题") {
        return "font-weight:700";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@titleColor: #b5c9d9;
.roledown-container {
  /deep/.el-collapse-item__header {
    background-color: @titleColor;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 700;
  }
  /deep/.el-table_32_column_63 {
    font-weight: 700;
  }
}
</style>