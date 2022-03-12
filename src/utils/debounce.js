export default function (fn, duration = 100) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);//最开始的时候清除定时器
    timer = setTimeout(() => {
      //在duration内重复触发的时候，会重复设置多个定时器，但是此时第一个timer还未执行，所以都会被clearTimeOut清空
      fn(...args);
    }, duration);
  };
}
