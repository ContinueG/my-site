<template>
  <div class="messageContainer" ref="messageContainer">
    <MessageArea
      class="MessageAreaContainer"
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handlesubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getMessages, postMessage } from "@/api/message";
import TopScroll from "@/mixins/TopScroll";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), TopScroll("messageContainer")],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    isoverTotal() {
      return this.data.rows.length > this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScrolled);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScrolled);
  },
  methods: {
    async fetchData() {
      return await getMessages(this.page, this.limit);
    },
    async handlesubmit(data, callback) {
      const resp = await postMessage(data);
      callback("下次再来");
      this.data.total++;
      this.data.rows.unshift(resp);
    },
    handleScrolled(dom) {
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
  },
};
</script>

<style scoped lang="less">
.messageContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  padding: 28px 0px;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.MessageAreaContainer {
  width: 700px;
  margin: 0 auto;
}
</style>
