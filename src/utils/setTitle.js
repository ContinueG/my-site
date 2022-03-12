let siteTitle = "", routeTitle = ""

function setTitle() {
    if (!siteTitle && !routeTitle) {
        document.title = "等一下下。。。"
    } else if (!siteTitle && routeTitle) {
        document.title = routeTitle
    } else if (siteTitle && !routeTitle) {
        document.title = siteTitle
    } else {
        document.title = routeTitle + "-" + siteTitle
    }

}


export default {
    setRouteTitle(title) {
        routeTitle = title
        setTitle()
    },
    setSiteTitle(title) {
        siteTitle = title
        setTitle()
    }
}