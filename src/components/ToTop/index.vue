<template>
  <div class="ToTop" @click="handleclick" v-show="show">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.topshow);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.topshow);
  },
  methods: {
    topshow(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleclick() {
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style scoped lang = "less">
.ToTop {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: skyblue;
  color: white;
  text-align: center;
  z-index: 99;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  line-height: 50px;
}
</style>