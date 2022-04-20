<template>
  <div class="app-container">
    <aplayer :audio="audio" fixed mini :volume="0.5" />
    <router-view></router-view>
    <div class="record">
      <div class="ICP">
        ICP证：<a href="https://beian.miit.gov.cn" target="_blank"
          >冀ICP备2022005412号-1</a
        >
      </div>
      <div class="gongAn">
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13068202000183"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          ><img src="@/assets/备案图标.webp" style="float: left" />
          <p
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            冀公网安备 13068202000183号
          </p></a
        >
      </div>
    </div>
  </div>
</template>

<script>
//音乐播放器
import initData from "./utils/initData";
export default {
  created() {
    this.getMusicList();
  },
  data() {
    return {
      // 音频列表
      audio: [],
    };
  },
  methods: {
    async getMusicList() {
      const { data: res } = await initData.get("/musiclist");
      this.audio = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  overflow: hidden;
  .record {
    height: 40px;
    background-color: #252525;
    color: #939393;
    display: flex;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    .ICP {
      padding: 20px;
      margin-bottom: 4px;
      a {
        color: #939393;
        font-size: 14px;
      }
    }
  }
  .record a:hover {
    color: orange;
  }
}
</style>