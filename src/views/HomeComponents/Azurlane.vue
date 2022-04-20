<template>
  <div class="azurlane-container">
    <div class="role" v-for="item in names" :key="item.id">
      <router-link :to="'/home/azurlane/' + item.id">
        <img
          :src="item.content"
          :alt="item.name"
          :id="item.id"
          @mouseover="changeImg"
          @mouseout="changeImg2"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import initData from "@/utils/initData";
export default {
  name: "Azurlane",
  created() {
    this.getAzur();
  },
  data() {
    return {
      names: [],
    };
  },
  methods: {
    async getAzur() {
      const { data: res } = await initData("/azur");
      this.names = res.names;
    },

    changeImg(e) {
      e.target.src = this.names[e.target.id - 1].content2;
    },
    changeImg2(e) {
      e.target.src = this.names[e.target.id - 1].content;
    },
  },
};
</script>

<style lang="less" scoped>
.azurlane-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .role {
    margin: 20px 60px;
    width: 343px;
    height: 434px;
    transition: all 10s;
    :hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: 0.3s;
    }
    img {
      border-radius: 12px;
    }
  }
}
</style>