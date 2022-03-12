export default function (domContainer = null) {
    return {
        methods: {
            handleScroll() {
                //向事件总线触发mainScroll事件，并传递当前的dom元素
                this.$bus.$emit("mainScroll", this.$refs[domContainer]);
            },
            handleSrollTop(top) {
                this.$refs[domContainer].scrollTop = top;
            },
        },
        mounted() {
            //必须是挂载的时候才能够获取到dom元素。
            this.$refs[domContainer].addEventListener("scroll", this.handleScroll);
            this.$bus.$on("setMainScroll", this.handleSrollTop);
        },
        beforeDestroy() {
            //销毁的时候移除监听
            this.$bus.$emit("mainScroll");
            this.$refs[domContainer].removeEventListener("scroll", this.handleScroll);
            this.$bus.$off("setMainScroll", this.handleSrollTop);
        },
    }
}