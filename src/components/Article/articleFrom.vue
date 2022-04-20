<template>
  <div class="articlefrom-container">
    <el-page-header
      @back="$router.back()"
      content="编辑页面"
      class="goBack"
      ref="back"
    >
    </el-page-header>
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        class="formContent"
        enctype="multipart/form-data"
      >
        <el-form-item label="id:">
          <el-input v-model="form.id" :disabled="true"> </el-input>
        </el-form-item>
        <!-- 作者名字 -->
        <el-form-item label="作者:">
          <el-input v-model="form.author"></el-input>
          <h6>最好写上来自哪里,隔几个空格</h6>
        </el-form-item>
        <!-- //日期选择 -->
        <el-form-item label="时间:">
          <el-date-picker
            v-model="form.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 分类 -->
        <el-form-item label="选择类型:" prop="region">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              :label="item.typeName"
              :value="item.type"
              v-for="item in articleType"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 来自(填写来源网址，没有就空着) -->
        <el-form-item label="来自:">
          <el-input v-model="form.from"></el-input>
          <h6>填写来源网址，没有就空着</h6>
        </el-form-item>
        <!-- 旧封面 -->
        <el-form-item label="旧封面:">
          <el-image
            style="width: 600px"
            :src="form.cover"
            fit="cover"
          ></el-image>
        </el-form-item>
        <!-- 新封面 -->
        <el-form-item label="上传新封面:">
          <el-upload
            class="upload-demo"
            :drag="true"
            :action="$store.state.imgUpload"
            :multiple="false"
            :limit="1"
            :auto-upload="false"
            :on-change="fileChange"
            list-type="picture"
            name="file"
            ref="upload"
            :data="uploadData"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请尽量上传webp格式的图片
            </div>
          </el-upload>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="文章内容:">
          <div class="labelBtn">
            <el-button type="text" @click="openTip">使用小提示(心虚)</el-button>
            <el-button type="text" @click="addTitle">添加标题</el-button>
            <el-button type="text" @click="addSpace">添加空行</el-button>
            <el-button type="text" @click="addContent">添加段落</el-button>
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 24 }"
            placeholder="请输入内容"
            v-model="form.content"
            resize="none"
            ref="textArea"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import initData from "@/utils/initData";
import router from "@/router";
import qs from "qs";
export default {
  created() {
    this.getArticleList();
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      //表单信息
      form: {},
      fileList: [],
      articleType: [],
      uploadData: {
        id: "",
      },
      //时间选择器的快速选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    async getArticleList() {
      const { data: res } = await initData.post(
        "/article",
        qs.stringify({
          id: this.id,
        })
      );
      this.form = JSON.parse(JSON.stringify(res.data[0]));
      this.uploadData.id = String(this.form.id);
      this.articleType = res.types;
      this.articleType.splice(0, 1);
    },

    fileChange(file, fileList) {
      this.fileList = file;
    },
    async save() {
      const { data: res } = await initData.post(
        "/article",
        qs.stringify({
          id: this.id,
          formChange: JSON.stringify(this.form),
        })
      );
      this.$refs.upload.submit();
      if (res.status === 0) {
        alert("success");
        router.back();
      } else {
        alert("fail");
      }
    },

    addTitle() {
      this.form.content = this.form.content + "<h2></h2>";
      this.$refs.textArea.select();
    },

    addSpace() {
      this.form.content = this.form.content + "<br>";
      this.$refs.textArea.select();
    },

    addContent() {
      this.form.content = this.form.content + "<p></p>";
      this.$refs.textArea.select();
    },
  },
};
</script>

<style lang="less" scoped>
.articlefrom-container {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  .form {
    h6 {
      color: rgb(146, 146, 146);
    }
    .formContent {
      padding: 10px 0;
      padding-right: 100px;
      padding-left: 50px;
    }
  }

  .goBack {
    padding: 10px;
  }
}
</style>