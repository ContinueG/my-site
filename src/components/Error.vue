<template>
  <div class="errorContainer">
    <img :src="handsome" alt="" />
    <h2>走错地方啦~~~~</h2>
  </div>
</template>

<script>
import Handsome from "@/assets/handsome.jpg";
export default {
  data() {
    return {
      handsome: Handsome,
    };
  },
};
</script>

<style scoped lang="less">
.errorContainer {
  width: 100%;
  height: 100%;
  & img {
    height: 400px;
    width: 300px;
    object-fit: cover;
    position: fixed;
    left: calc(50% - 150px);
    top: calc(50% - 200px);
  }
}
</style>