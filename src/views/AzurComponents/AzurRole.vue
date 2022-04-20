<template>
  <div class="azurrole-container">
    <el-page-header @back="$router.back()" content="详情页面"> </el-page-header>
    <div class="up">
      <!-- 角色信息 -->
      <div class="roleInfo">
        <div class="roleName">
          <span>{{ titleName }}</span>
        </div>
        <div class="table">
          <el-table :data="rolesInfo" border style="width: 100%">
            <el-table-column
              prop="title"
              label="属性"
              width="180px"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              width="550px"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 角色立绘 -->
      <div class="roleImg">
        <div class="imgTitle">
          <span>立绘</span>
        </div>
        <el-tabs v-model="activeName" type="card">
          <img :src="bgimg" alt="" class="bgimg" />
          <el-tab-pane
            :label="item.title"
            :name="String(item.id)"
            v-for="item in roleClothes"
            :key="item.id"
          >
            <el-image
              style="width: 100%"
              :src="item.content"
              :preview-src-list="[item.content]"
              fit="cover"
            >
            </el-image>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="down">
      <RoleDown :id="this.id"></RoleDown>
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
import initData from "@/utils/initData";
import RoleDown from "@/components/Azur/RoleDown.vue";
export default {
  created() {
    this.getRoles();
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      activeName: "1",
      //角色换装
      roleClothes: [],
      //皮肤背景
      bgimg: "",
      //角色信息
      rolesInfo: [],
      titleName: "",
    };
  },
  methods: {
    async getRoles() {
      const { data: res } = await initData.get("/azur", {
        params: {
          id: this.id,
        },
      });
      this.roleClothes = res.theRole[0].roleColthes;
      this.bgimg = res.roleBgImg;
      this.rolesInfo = res.theRole[0].rolesInfo;
      this.titleName = res.theRole[0].titleName;
    },
  },
  components: {
    RoleDown,
  },
};
</script>

<style lang="less" scoped>
@titleColor: #b5c9d9;
.azurrole-container {
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border: 1px solid rgb(185, 185, 185);
  .el-page-header {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 10px;
    align-self: flex-start;
  }
  .up {
    display: flex;
    .roleInfo {
      margin-right: 5px;
      .roleName {
        height: 30px;
        background-color: @titleColor;
        font-size: 15px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .roleImg {
      position: relative;
      .imgTitle {
        height: 30px;
        background-color: @titleColor;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
      }
      .bgimg {
        height: 100%;
        position: absolute;
      }
      /deep/.el-tabs__nav-wrap {
        background-color: #f1f1f1;
      }
      /deep/.el-image {
        height: 900px;
      }
      /deep/.el-tabs__header {
        margin-bottom: 0;
      }
    }
  }
}
</style>