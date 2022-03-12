import Error404 from "@/components/Error.vue"
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";

configure({
  trickleSpeed: 20,
  showSpinner: false,
});
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}
function setAsync(fn) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      await delay(2000);
    }
    const comp = await fn();
    done();
    return comp;
  };
}
export default [
  {
    name: "Home",
    path: "/",
    component: setAsync(() =>
      import(/*webpackChunkName:"home"*/"@/views/Home"))
    ,
    meta: {
      title: "首页"
    }
  },
  {
    name: "About",
    path: "/about",
    component: setAsync(() => import(/*webpackChunkName:"about"*/"@/views/About"))
    ,
    meta: {
      title: "关于我"
    }
  },
  {
    name: "Blog",
    path: "/article",
    component: setAsync(() =>

      import(/*webpackChunkName:"Blog"*/"@/views/Blog"))
    ,
    meta: {
      title: "博客"
    }
  },
  {
    name: "CategoryBlog",
    path: "/article/cate/:categoryId",
    component: setAsync(() => import( /*webpackChunkName:"Blog"*/"@/views/Blog"))
    ,
    meta: {
      title: "博客分类"
    }
  },
  {
    name: "BlogDetail",
    path: "/article/:id",
    component: setAsync(() => import(/*webpackChunkName:"BlogDetail"*/"@/views/Blog/Detail"))
    ,
    meta: {
      title: "博客详情"
    }
  },
  {
    name: "Project",
    path: "/project",
    component: setAsync(() =>

      import(/*webpackChunkName:"Project"*/"@/views/Project"))
    ,
    meta: {
      title: "项目"
    }
  },
  {
    name: "Message",
    path: "/message",
    component: setAsync(() => import(/*webpackChunkName:"Message"*/"@/views/Message"))
    ,
    meta: {
      title: "信息"
    }
  },
  {
    name: "404",
    path: "*",
    component: Error404,
    meta: {
      title: "错误"
    }
  },
];
