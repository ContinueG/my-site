<template>
  <div class="aboutContainer" v-loading="loading || !srcLoaded">
    <iframe
      :src="data"
      class="iframe-container"
      @load="srcLoaded = true"
      frameborder="0"
      v-if="data"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      srcLoaded: false,
    };
  },
  computed: {
    ...mapState("about", ["loading", "data"]),
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style scoped lang = "less">
.aboutContainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .iframe-container {
    width: 100%;
    height: 100%;
  }
}
</style>
