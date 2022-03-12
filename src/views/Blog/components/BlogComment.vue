<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    isoverTotal() {
      return this.data.rows.length > this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    handleScroll(dom) {
      const range = 200;
      const nowTop = Math.abs(
        dom.scrollHeight - dom.clientHeight - dom.scrollTop
      );
      if (nowTop <= range && this.isLoading == false) {
        this.addData();
      }
    },
    async addData() {
      if (this.isoverTotal) {
        return;
      } else {
        this.page++;
        this.isLoading = true;
        const newData = await this.fetchData();
        this.data.rows = this.data.rows.concat(newData.rows);
        this.isLoading = false;
      }
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功"); // 告诉子组件，我这边处理完了，你继续
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
