import eventBus from "@/eventBus.js"
import defaultGif from "@/assets/default.gif";
import { debounce } from "@/utils";

let imgs = [];
function handleimg(img) {
    img.dom.src = defaultGif
    const rect = img.dom.getBoundingClientRect()
    const clientHeight = document.documentElement.clientHeight;
    const height = rect.height || 150
    if (rect.top > -height && rect.top < clientHeight) {
        const nImage = new Image();
        nImage.src = img.url
        nImage.onload = function () {
            img.dom.src = nImage.src;
        }
        // img.dom.src = img.url;
        imgs = imgs.filter(i => i !== img)
    }
}
function handleimgs() {
    for (const img of imgs)
        handleimg(img)
}
function handleScroll(dom) {
    handleimgs()
    console.log(1)
}

eventBus.$on("mainScroll", debounce(handleScroll), 50)

export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            url: bindings.value
        }
        imgs.push(img)
        handleimg(img)
    },
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el);
    },
}