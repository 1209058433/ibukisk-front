<template>
  <div class="cover-container">
    <!-- 背景图片 -->
    <div class="backgroundImg">
      <img src="@/assets/cover.webp" />
    </div>

    <!-- 左边的抽屉 -->
    <Drawer></Drawer>

    <!-- 中间的欢迎语句和按钮盒子 -->
    <div class="banner">
      <div class="middleBox">
        <h1 class="animate__animated animate__rubberBand">伊吹四季</h1>
        <div class="middle animate__animated animate__fadeIn">
          <h2>Hi~欢迎你</h2>
        </div>
        <div class="here">
          <el-button round class="herebtn" @click="goHome">
            <span>进入首页</span>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 下面的随机句子 -->
    <h3>
      {{ bottomSentence }}
    </h3>

    <!-- 自己的彩蛋 -->
    <div class="coverBottom">
      <h2>这里是{{ $store.state.myName }}的个人练习网站</h2>
      <h4>在学习Vue2后进行的第一个项目练习,也是学习前端以来第一个项目练习</h4>
      <h6>就当做黑历史好好保存吧</h6>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import initData from "@/utils/initData.js";
//抽屉组件
import Drawer from "@/components/Cover/Drawer.vue";

export default {
  name: "Cover",
  created() {
    this.initSentence();
    this.changeSentence();
  },
  data() {
    return {
      //下面句子的内容
      apiSentence: [],
      bottomSentence: "",
      //封面
    };
  },
  methods: {
    //去往首页
    goHome() {
      router.push("/home");
    },

    //发送句子请求
    async initSentence() {
      const { data: res } = await initData.get("/cover_sentences");
      this.apiSentence = [...res.data];
      const num = Math.round(Math.random() * (this.apiSentence.length - 1));
      this.bottomSentence = this.apiSentence[num];
    },

    //每n秒换一次句子
    changeSentence() {
      setInterval(() => {
        const num = Math.round(Math.random() * (this.apiSentence.length - 1));
        this.bottomSentence = this.apiSentence[num];
      }, 6000);
    },
  },
  components: {
    Drawer,
  },
};
</script>

<style lang="less" scoped>
@broom: #ffffff;

//根目录盒子
.cover-container {
  position: relative;
  //背景图片
  @keyframes bgcmove {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  .backgroundImg {
    animation: bgcmove 18s infinite;
    animation-delay: 1s;
    width: 100%;
    height: 1080px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.9;
    z-index: -1;
    img {
      width: 100%;
    }
  }
  //中间的欢迎语句和按钮盒子
  .banner {
    width: 100%;
    height: 920px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -60px;
    .middleBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -100px;
      h1 {
        color: @broom;
        font-size: 80px;
        align-self: flex-start;
      }
      .middle {
        display: flex;
        margin-top: -10px;
        h2 {
          color: @broom;
          font-size: 18px;
        }
        h4 {
          margin-left: 4px;
          color: @broom;
          font-size: 8px;
          align-self: flex-end;
        }
      }
      .myself {
        width: 240px;
        height: 100px;
        margin-top: 50px;
      }
    }
    .here {
      transition: 1.5s;
      .herebtn {
        margin-top: 30px;
        width: 110px;
        height: 42px;
        border-radius: 42px;
        border-color: @broom;
        font-size: 20px;
        color: @broom;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .herebtn:hover {
        transform: scale(1.2);
      }
    }
  }
  //自己的彩蛋
  .coverBottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 140px;
    h6 {
      color: transparent;
    }
  }
  //下面的随机句子
  @keyframes changeTips {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    20% {
      transform: translateY(-20px);
      opacity: 0;
    }
    60% {
      transform: translateY(0px);
      opacity: 1;
    }
    90% {
      transform: translateY(0px);
      opacity: 1;
    }
    100% {
      transform: translateY(10px);
      opacity: 0;
    }
  }
  h3 {
    margin-top: -120px;
    font-size: 20px;
    text-align: center;
    color: #fff;
    animation: changeTips 6s infinite;
  }
}
</style>