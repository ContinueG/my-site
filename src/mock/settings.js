import mock from "mockjs"
mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: "https://iconfont.alicdn.com/t/02a1c55f-ce6d-49ea-af1b-c742524b34d1.png",
        siteTitle: "我的个人空间",
        github: "https://github.com/DuYi-Edu",
        qq: "2609973879",
        qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
        weixin: "17612700215",
        weixinQrCode: "https://iconfont.alicdn.com/t/c686ee96-94d7-4239-aa11-f95a3afaae59.png",
        mail: "duyi@gmail.com",
        icp: "黑ICP备17001719号",
        githubName: "DuYi-Edu",
        favicon: "https://iconfont.alicdn.com/t/88562e11-c4a5-4bf4-9175-139926ed596e.png",
    }
})