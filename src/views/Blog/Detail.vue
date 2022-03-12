<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";
import TopScroll from "@/mixins/TopScroll";
import { setTitle } from "@/utils";

export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mixins: [fetchData(null), TopScroll("mainContainer")],
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      if (!resp) {
        //文章数据不存在
        this.$router.push("/404");
        return;
      }
      setTitle.setRouteTitle(resp.title);
      return resp;
    },
  },
  mounted() {
    //必须是挂载的时候才能够获取到dom元素。
    this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("setMainScroll", this.handleSrollTop);
  },
  beforeDestroy() {
    //销毁的时候移除监听
    this.$bus.$emit("mainScroll");
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setMainScroll", this.handleSrollTop);
  },
  updated() {
    // 当页面刷新的时候，路由已存在，但是dom还没挂载，所以需要在页面更新的时候重新设置location.hash
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
