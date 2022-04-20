<template>
  <div class="index-container">
    <!-- 左大块 -->
    <div class="left">
      <IndexLeft></IndexLeft>
    </div>

    <!-- 右大块 -->
    <div class="right">
      <IndexRight></IndexRight>
    </div>
  </div>
</template>

<script>
import IndexRight from "@/components/Index/IndexRight.vue";
import IndexLeft from "@/components/Index/IndexLeft.vue";

export default {
  name: "Index",

  components: {
    IndexRight,
    IndexLeft,
  },
};
</script>

<style lang="less" scoped>
.index-container {
  display: flex;
  .left {
    flex: 1;
  }
  .right {
    flex: 4;
  }
}
</style>