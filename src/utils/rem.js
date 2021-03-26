/**
 *created by xuqiang 19/05/08
 * 用于动态计算html 的 font-size
 */
let resize = function () {

  let designSize = 1920; //默认设计图尺寸 11520*2160
  let html = document.documentElement;
  let wW = html.clientWidth; //窗口宽度
  // let wW = 1920; //窗口宽度
  let rem = (wW * 100) / designSize;
  html.style.fontSize = rem + 'px';
};
resize(); //初始化
window.addEventListener('resize', resize,false); //绑定到窗口事件中