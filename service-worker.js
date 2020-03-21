/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1874206f93190da5727b0cc3d350d3f6"
  },
  {
    "url": "assets/css/0.styles.e45b6d8e.css",
    "revision": "ca581acfb2a57731034699c64f03e8a7"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5080ced0.js",
    "revision": "9b57b34afa345aacac830f612ef862f5"
  },
  {
    "url": "assets/js/100.acc12b55.js",
    "revision": "745b18da4b036620a92718f1fdcbf1c4"
  },
  {
    "url": "assets/js/101.703df793.js",
    "revision": "63a743b55766dc545a41b62a8b61f422"
  },
  {
    "url": "assets/js/102.aea63913.js",
    "revision": "f9e9dc9d82669caaa537ac4ffbf0f888"
  },
  {
    "url": "assets/js/103.52fd9c93.js",
    "revision": "4fd1256ed37eea80ecfa128428c3c04d"
  },
  {
    "url": "assets/js/11.cec1ebb3.js",
    "revision": "8764ccd72cb2535fdd1755109ae46286"
  },
  {
    "url": "assets/js/12.4b2a03c7.js",
    "revision": "591fa24f7d085a3959cd46c29283f643"
  },
  {
    "url": "assets/js/13.30948cab.js",
    "revision": "10e3edb6f35005af882a6c47ebf06950"
  },
  {
    "url": "assets/js/14.b5861d17.js",
    "revision": "17900c4e58388c15ad4f0b2cdcc51aaf"
  },
  {
    "url": "assets/js/15.b3fe6a46.js",
    "revision": "01e349b40e493a1f5189565f3d14f2d9"
  },
  {
    "url": "assets/js/16.b54c7eec.js",
    "revision": "22f4f1d0635a5e038659e1bf7838a475"
  },
  {
    "url": "assets/js/17.48d93c34.js",
    "revision": "0729dd620840b18f5ce9ba10eae1cd0e"
  },
  {
    "url": "assets/js/18.0c526b42.js",
    "revision": "762c49c0cc7faf38160ffc2ba79681f3"
  },
  {
    "url": "assets/js/19.9da136a0.js",
    "revision": "9618ebb453a5b3d4cbf974c7457d0d50"
  },
  {
    "url": "assets/js/2.e13c0dfc.js",
    "revision": "c97c4bb11126d8c39585d2daeb056c57"
  },
  {
    "url": "assets/js/20.fc0cc2de.js",
    "revision": "e31a0db32007b6d1dc2bff84e2c905a3"
  },
  {
    "url": "assets/js/21.323ba669.js",
    "revision": "238678de909cbb9f602b76112b9118e8"
  },
  {
    "url": "assets/js/22.c781e4b3.js",
    "revision": "61a84be6aeb023a1751b32a9f0e9d63d"
  },
  {
    "url": "assets/js/23.76a1b2a0.js",
    "revision": "c1711acd481d95b838da263a8e702ec5"
  },
  {
    "url": "assets/js/24.0bc4974b.js",
    "revision": "0c721a5cde2e7201fd2028549afb0c76"
  },
  {
    "url": "assets/js/25.f34dad9d.js",
    "revision": "2ca5cc54c49c5f742545f46d0d87e5ef"
  },
  {
    "url": "assets/js/26.01d63dde.js",
    "revision": "ef6642585d918d509bbd70c9a8a8c8ff"
  },
  {
    "url": "assets/js/27.5ed8ffac.js",
    "revision": "8acc23183c799c5d50b9b1e8b2fea880"
  },
  {
    "url": "assets/js/28.79087a03.js",
    "revision": "098c1c42ad19299bca6909317e2e2a20"
  },
  {
    "url": "assets/js/29.d0ee654e.js",
    "revision": "9008e32e7fabac5e7f1747c0162f4c3f"
  },
  {
    "url": "assets/js/3.7611bd43.js",
    "revision": "e3a863aa6282b539058a0de3988a579d"
  },
  {
    "url": "assets/js/30.d2bfcc51.js",
    "revision": "6f5fdc6619e21cbfd9a202c0213bda3f"
  },
  {
    "url": "assets/js/31.3dacf949.js",
    "revision": "d8b53428d333935c0a032f72981c68a5"
  },
  {
    "url": "assets/js/32.6bd49ece.js",
    "revision": "a82c14f4161e0181a95955c248e282ac"
  },
  {
    "url": "assets/js/33.dec9ad8a.js",
    "revision": "ec6294d099f8720a1adfedacb608101f"
  },
  {
    "url": "assets/js/34.7bad766d.js",
    "revision": "4cd57f8acd0e9dedb576c660f43721d2"
  },
  {
    "url": "assets/js/35.e0cd51ea.js",
    "revision": "ffcaa74b694e118c08dfd1bbdec5d86b"
  },
  {
    "url": "assets/js/36.43d6fb08.js",
    "revision": "a751d5d1762592889c8cac4efae42b00"
  },
  {
    "url": "assets/js/37.acc7b80e.js",
    "revision": "9bf6adbe415312594f1ca65358a8b17d"
  },
  {
    "url": "assets/js/38.272e2e72.js",
    "revision": "3b7ef06b23aeb8b4144b130212ac9fa2"
  },
  {
    "url": "assets/js/39.ddfe027f.js",
    "revision": "30018ff565078618077da97bc15f34f0"
  },
  {
    "url": "assets/js/4.006c3239.js",
    "revision": "32566fc456256be5392276be7311ed93"
  },
  {
    "url": "assets/js/40.3a01b9ab.js",
    "revision": "bee43ad0ededea986bee86ea0f08a246"
  },
  {
    "url": "assets/js/41.3c826b49.js",
    "revision": "44d125ed6fee579a648a03c90f679040"
  },
  {
    "url": "assets/js/42.f901dd74.js",
    "revision": "2129b4bed35b03bbd6d1428cb98c997d"
  },
  {
    "url": "assets/js/43.47a97e97.js",
    "revision": "58ee4b383f864056c86eb9d1b9bd73cc"
  },
  {
    "url": "assets/js/44.aea411c3.js",
    "revision": "7faad28ea0b1f5868f03bf8f7e236e35"
  },
  {
    "url": "assets/js/45.c8e69799.js",
    "revision": "4231862e5194f0d079026a3ae5bf58ec"
  },
  {
    "url": "assets/js/46.2066af0c.js",
    "revision": "9d180624f82e4323e4eae918586faa5f"
  },
  {
    "url": "assets/js/47.486093d6.js",
    "revision": "0d89137b02fbda330712c9e69ac81f6f"
  },
  {
    "url": "assets/js/48.fea3089b.js",
    "revision": "cd531b3a333a1bb99f02c332fc7380f0"
  },
  {
    "url": "assets/js/49.9e1bf2f1.js",
    "revision": "272ed45e3125b241ddb11a605bebaca7"
  },
  {
    "url": "assets/js/5.353e6219.js",
    "revision": "ecac982d292db813df0ee9695aebf211"
  },
  {
    "url": "assets/js/50.d959c541.js",
    "revision": "8cfff9c49063829fcf5feeae8780c6e6"
  },
  {
    "url": "assets/js/51.37619b9e.js",
    "revision": "9f3abc3d7d6b4ae970d90975468afda7"
  },
  {
    "url": "assets/js/52.c6eeddd2.js",
    "revision": "eecfea3a3cd7d076cd3ed7c5d13bba6f"
  },
  {
    "url": "assets/js/53.777f1a99.js",
    "revision": "cdfb616ed8695d7b23a85729f84c452b"
  },
  {
    "url": "assets/js/54.3a928b8b.js",
    "revision": "7e75fffca3069208664e511636340572"
  },
  {
    "url": "assets/js/55.da530c09.js",
    "revision": "f19a8cd649ca3f508895845682abd3fd"
  },
  {
    "url": "assets/js/56.1dfb41b8.js",
    "revision": "d42bddd75a2263b33f558ff285991e13"
  },
  {
    "url": "assets/js/57.216959fc.js",
    "revision": "e2ade395698eaf48bf5f910d9e471890"
  },
  {
    "url": "assets/js/58.a0758c48.js",
    "revision": "11b22e0044ae22e9c0aff8d2e39e17d5"
  },
  {
    "url": "assets/js/59.5ce91a2d.js",
    "revision": "6c6582a3016c6c20335402a2b5fc2a6f"
  },
  {
    "url": "assets/js/6.c96f94a6.js",
    "revision": "b801a67be2d28eedce269e63b7cdce9d"
  },
  {
    "url": "assets/js/60.7b906567.js",
    "revision": "8ec5d94a62e3e04f36f08409bfed6202"
  },
  {
    "url": "assets/js/61.42f0cd41.js",
    "revision": "7319419e71ff5ebe8a75e8543650b716"
  },
  {
    "url": "assets/js/62.72627354.js",
    "revision": "c234b12f28b1ae1ec9b436be7c8e8a65"
  },
  {
    "url": "assets/js/63.8cf84f66.js",
    "revision": "e3ca27a52ad42bab99741f384d2c5ace"
  },
  {
    "url": "assets/js/64.4148eacd.js",
    "revision": "d4e931b952ce1eece227e092263f77e2"
  },
  {
    "url": "assets/js/65.ad7bcf11.js",
    "revision": "cfbea1d3c598f08c5ed3ae1ac07e778b"
  },
  {
    "url": "assets/js/66.41628c42.js",
    "revision": "0bc13349e118bee7ef3c18abfcd9bd1b"
  },
  {
    "url": "assets/js/67.fa91107d.js",
    "revision": "9caf503b3101fdc2f25f1a8c6fb4e7d9"
  },
  {
    "url": "assets/js/68.e7a6771a.js",
    "revision": "4631b6d605e009f8c72185fdd18fc63f"
  },
  {
    "url": "assets/js/69.adb07a76.js",
    "revision": "2c1094cf42c5b5998e0f4fb48c5f9aad"
  },
  {
    "url": "assets/js/7.c6dd592b.js",
    "revision": "7ba95d473ecd8ef0d9a8e97e6754fb31"
  },
  {
    "url": "assets/js/70.883e83a8.js",
    "revision": "815cbf236056d1a3aa5e674b8bdede64"
  },
  {
    "url": "assets/js/71.04c8b4ca.js",
    "revision": "f083a442bd0489ce8a034b1006257a6c"
  },
  {
    "url": "assets/js/72.2888e9b0.js",
    "revision": "7f8ee36a6de0f02760ac5e2719b8487c"
  },
  {
    "url": "assets/js/73.c6bb9dfa.js",
    "revision": "39d53d6138fdd47c21bfd6518fb553e3"
  },
  {
    "url": "assets/js/74.650ae344.js",
    "revision": "d1ae435e626e92b960d4931cf648a875"
  },
  {
    "url": "assets/js/75.03556209.js",
    "revision": "17268a4258326bcb582937ee2e357734"
  },
  {
    "url": "assets/js/76.92302603.js",
    "revision": "96881fa93fc14dbfc71696813f8532b0"
  },
  {
    "url": "assets/js/77.06ffc25a.js",
    "revision": "1a274b8609939950b7bb8c81f084a6d0"
  },
  {
    "url": "assets/js/78.2433a431.js",
    "revision": "6ddd729c6cb0d6441bf407bf08ee031e"
  },
  {
    "url": "assets/js/79.3506d106.js",
    "revision": "fd75d0f5d3382109304aaa5a9ec4b60e"
  },
  {
    "url": "assets/js/8.18958710.js",
    "revision": "88584452efd544b92a8de2c113e672b2"
  },
  {
    "url": "assets/js/80.b01ec45a.js",
    "revision": "b913c7c744f0d219a6f6d89c03f29683"
  },
  {
    "url": "assets/js/81.58c7dc94.js",
    "revision": "5b61e1316b65d3edd847bf8b922c2b8d"
  },
  {
    "url": "assets/js/82.27922683.js",
    "revision": "b0ef7da6be5a100841209537102a0d3e"
  },
  {
    "url": "assets/js/83.6d434690.js",
    "revision": "8c4d8eca4ce9cd0c83761fc48fd53984"
  },
  {
    "url": "assets/js/84.164af512.js",
    "revision": "b1b3e9e75a7d26bfddff22a5d8f2915f"
  },
  {
    "url": "assets/js/85.c0a4b83c.js",
    "revision": "6a640a475cc31389854bd5a7b5b331d1"
  },
  {
    "url": "assets/js/86.c1a820c9.js",
    "revision": "ddf88e379407c827f790562206b45202"
  },
  {
    "url": "assets/js/87.06bfdf33.js",
    "revision": "6089a971d2c59892802db9e5e8e712e7"
  },
  {
    "url": "assets/js/88.a88abf23.js",
    "revision": "c70a630e944474761629df8777d1107f"
  },
  {
    "url": "assets/js/89.2f15869a.js",
    "revision": "e958c7f6a1f7ad994bf5e898264516b6"
  },
  {
    "url": "assets/js/9.dafc73ec.js",
    "revision": "733ffa97cfa3478a27d85d9a83898889"
  },
  {
    "url": "assets/js/90.9e02f225.js",
    "revision": "ac9d58922af3f413384d1d907643e8ea"
  },
  {
    "url": "assets/js/91.92f33ca4.js",
    "revision": "c22147dc9155dbf894575a6d6d8a8541"
  },
  {
    "url": "assets/js/92.72b24c0e.js",
    "revision": "54317f0b1cf34bc3241a7c31df786acd"
  },
  {
    "url": "assets/js/93.65956fda.js",
    "revision": "fd1a75e78d3beb97c48c0945b8353971"
  },
  {
    "url": "assets/js/94.cd96b01b.js",
    "revision": "f671417d27ab331d65626054b52eb0f0"
  },
  {
    "url": "assets/js/95.f9417ba0.js",
    "revision": "09f6fd21899f73764613b335b5995ec4"
  },
  {
    "url": "assets/js/96.74b47339.js",
    "revision": "08f446931bd1ce8c961dabae432f70dc"
  },
  {
    "url": "assets/js/97.0a771bb2.js",
    "revision": "45e74ad9adbdfdfa0c04f3f27a704c31"
  },
  {
    "url": "assets/js/98.77ae86f0.js",
    "revision": "0af1bb1520ec09da5c6f85a991db24ad"
  },
  {
    "url": "assets/js/99.09bcc662.js",
    "revision": "4f44fb945ea0e2ac1e0e78da047535dc"
  },
  {
    "url": "assets/js/app.a3debe68.js",
    "revision": "70652085d442929a22dbb25f47b32ae5"
  },
  {
    "url": "blog/economics/index.html",
    "revision": "dac33b90c30194ed2c3b7cf6d4eebd49"
  },
  {
    "url": "blog/live/index.html",
    "revision": "1871e4ad829947904d0295ee5c7fa957"
  },
  {
    "url": "blog/live/note.html",
    "revision": "6a4867c83c7fb1787b6c4f2c5415b1da"
  },
  {
    "url": "homePage.jpg",
    "revision": "95a05a8245caf9fa365ccbe87f962173"
  },
  {
    "url": "index.html",
    "revision": "a5db28cf4dd554b9025b4e15a7c93941"
  },
  {
    "url": "logo.jpg",
    "revision": "c259224475864eb121a80eba82347399"
  },
  {
    "url": "my-resume.html",
    "revision": "c8063645fd3b2aec5725a260da5bff71"
  },
  {
    "url": "p4/browser/BOM.html",
    "revision": "5ba1bd3c680eb1fcd5bfe7969283c899"
  },
  {
    "url": "p4/browser/CSSOM.html",
    "revision": "28eabb4b88f0beb94c71c2959f2e6734"
  },
  {
    "url": "p4/browser/DOM.html",
    "revision": "18d969a87dce63ed69d015dcc5372bc5"
  },
  {
    "url": "p4/browser/前端本地存储.html",
    "revision": "b342dfab1d928e991d641d92bac9dbfe"
  },
  {
    "url": "p4/es-next/01 let 变量和 const 常量.html",
    "revision": "453d247cf6ec7f32a17fc238bc88bbbe"
  },
  {
    "url": "p4/es-next/01 块级作用域.html",
    "revision": "0919ae6c3abb29b73e1ed714ff9bbbfb"
  },
  {
    "url": "p4/es-next/02 数值的新特性.html",
    "revision": "ba49748ac591ff5c2111a58d45d5bcb8"
  },
  {
    "url": "p4/es-next/03 字符串的新特性.html",
    "revision": "6f0cc7c43bd2d1c555ce247d75040826"
  },
  {
    "url": "p4/es-next/04 数组的新特性.html",
    "revision": "dba9139fc0048b6217f8a223100b8f39"
  },
  {
    "url": "p4/es-next/05 对象的新特性.html",
    "revision": "5736d88a340e2aac92106ebaddf0d3df"
  },
  {
    "url": "p4/es-next/06 函数的新特性.html",
    "revision": "6fae64e731591ab66818452cc5adc11c"
  },
  {
    "url": "p4/es-next/07 解构赋值（脱壳）.html",
    "revision": "199f4fbc542c88f0a90b4c8b7ed7a3f9"
  },
  {
    "url": "p4/es-next/08 class 类.html",
    "revision": "c565d84d815de3c844cc1fadf9025944"
  },
  {
    "url": "p4/es-next/09 Set 和 Map 数据结构.html",
    "revision": "ef133d136e151d47120ff24ccd17021a"
  },
  {
    "url": "p4/es-next/10 Promise 和 async_await.html",
    "revision": "74ddeae16be2ddab55e345854a9a6a10"
  },
  {
    "url": "p4/es-next/11 Proxy 和 Reflect 代理对象.html",
    "revision": "a44fcb505696f2dee6a1752a2ea00ddb"
  },
  {
    "url": "p4/es-next/12 Generator 异步迭代器.html",
    "revision": "d1ca9c591a60c1f0db516b5fbbcd7b80"
  },
  {
    "url": "p4/es-next/13 前端模块化.html",
    "revision": "71ea5d12bef8a4443fb03c9e67b17f31"
  },
  {
    "url": "p4/es-next/index.html",
    "revision": "5a9714f3fd4b79c2ba21854980b6733d"
  },
  {
    "url": "p4/javascript/index.html",
    "revision": "de60acc4c4cf6ee69c9014b916032df6"
  },
  {
    "url": "p4/javascript/堆栈内存和作用域/作用域.html",
    "revision": "e6737c2582faaa08e7e574c1ffacc62a"
  },
  {
    "url": "p4/javascript/堆栈内存和作用域/堆栈内存.html",
    "revision": "1b09a87e2e76a8870a8e9c7d300c8529"
  },
  {
    "url": "p4/javascript/异步编程/Event Loop.html",
    "revision": "4edf1deb0ec8d5f87ec361e3890bd28c"
  },
  {
    "url": "p4/javascript/异步编程/index.html",
    "revision": "cbd34cdcef56f8f8a8f817adde136520"
  },
  {
    "url": "p4/javascript/异步编程/Promise 核心.html",
    "revision": "6026f5719ed02757d75455115f6c3530"
  },
  {
    "url": "p4/javascript/异步编程/异步解决方案.html",
    "revision": "6f7a67c483bc4ad607d7f685bc13c2f9"
  },
  {
    "url": "p4/javascript/异步编程/高阶函数.html",
    "revision": "9fd76b5e405b2dc1dc563874ef0d306d"
  },
  {
    "url": "p4/javascript/执行机制/01 事件机制.html",
    "revision": "40fb7ff130b6f6b3db1f455cf3fe3005"
  },
  {
    "url": "p4/javascript/执行机制/02 作用域.html",
    "revision": "387aaca3355056c52fb34340b48916d4"
  },
  {
    "url": "p4/javascript/执行机制/03 内存管理.html",
    "revision": "221da970b9fe7cfc79a86a90657950c9"
  },
  {
    "url": "p4/javascript/执行机制/04 闭包.html",
    "revision": "dee39bed05a1dd99e108f5c621fec3f1"
  },
  {
    "url": "p4/javascript/数据类型/00 数据类型.html",
    "revision": "6b11b94ccba2c4f31e948423f8973384"
  },
  {
    "url": "p4/javascript/数据类型/01 数据类型判断.html",
    "revision": "d094fd8bd88567d245868490a811f196"
  },
  {
    "url": "p4/javascript/数据类型/02 数据类型转换.html",
    "revision": "3666d8d9b03283801958e7af5ad75d10"
  },
  {
    "url": "p4/javascript/面向对象/01 面向对象基础.html",
    "revision": "fac1bc2f999a71a6a1b3c622344167a7"
  },
  {
    "url": "p4/javascript/面向对象/02 原始类型和引用对象.html",
    "revision": "882d7c1a4828d2001b75b6e0c35cd537"
  },
  {
    "url": "p4/javascript/面向对象/03 函数.html",
    "revision": "b222f085a0162a347c96df527966f88f"
  },
  {
    "url": "p4/javascript/面向对象/04 对象.html",
    "revision": "c8089cd4f1657cb2a7cc3657a612ea70"
  },
  {
    "url": "p4/javascript/面向对象/05 构造函数和原型.html",
    "revision": "d7d4b3a8e90ccf6a29d6b3e3cd3bec00"
  },
  {
    "url": "p4/javascript/面向对象/06 继承方案.html",
    "revision": "2e9b6ee974a2a8911db4b2d2f8632c4a"
  },
  {
    "url": "p4/javascript/面向对象/07 对象模式.html",
    "revision": "bf8c468d118f7a47eeb86fb91fe8b132"
  },
  {
    "url": "p4/javascript/面向对象/08 this 关键字.html",
    "revision": "da51ce47629a3434e50853eed74d44e3"
  },
  {
    "url": "p4/javascript/面向对象/09 this 内置函数.html",
    "revision": "7be0f17695487c81ca010cd1fb810482"
  },
  {
    "url": "p4/javascript/面向对象/10 this 应用实例.html",
    "revision": "c615f48ed8d5707ec68d305d43611ac4"
  },
  {
    "url": "p4/team/tools/github和picgo搭建图床.html",
    "revision": "cecfa1650195c15124b2c0325c0af5de"
  },
  {
    "url": "p4/team/tools/index.html",
    "revision": "72cd5710b7fab04fad7fde5ee15340a4"
  },
  {
    "url": "p4/team/tools/vue-press.html",
    "revision": "8878656df506bf402955ff074eef1d95"
  },
  {
    "url": "p4/typescript/00 基础知识.html",
    "revision": "81b6e027d41e2b1bdae24dd4b91418dc"
  },
  {
    "url": "p4/typescript/01 数据类型.html",
    "revision": "560cd90e339a80b3acfd67dcd0df5e5a"
  },
  {
    "url": "p4/typescript/02 面向对象.html",
    "revision": "00e668a40bc1956f6a542a0506c01d9c"
  },
  {
    "url": "p4/typescript/10 Vue 应用.html",
    "revision": "6fdc98256da71298754db48063607e09"
  },
  {
    "url": "p4/typescript/基础知识.html",
    "revision": "6b20f54d787483092b5f13e6ebf63b0c"
  },
  {
    "url": "p5/interview/business/index.html",
    "revision": "22212edd5ac26f234453dc03f8518370"
  },
  {
    "url": "p5/interview/business/鉴权方式.html",
    "revision": "a33fefc6efa1aed07b370bc9b646d434"
  },
  {
    "url": "p5/interview/topic/index.html",
    "revision": "ddb3844ee1fdbcd6f2948a37786e246c"
  },
  {
    "url": "p5/interview/topic/异步编程.html",
    "revision": "aa2ba0ba9e3046288723d7b2a97187f5"
  },
  {
    "url": "p5/interview/topic/闭包作用域.html",
    "revision": "f0a9f951303f30447a766204b4459d3d"
  },
  {
    "url": "p5/interview/topic/面向对象.html",
    "revision": "8217a0fdab90eabe3faf99ea7b5022e4"
  },
  {
    "url": "p5/vue-base/01 Vue 基础.html",
    "revision": "4fe7a13571ba6c4565f2736994cea96a"
  },
  {
    "url": "p5/vue-base/02 Vue 项目启动和基本配置.html",
    "revision": "c47f392c4a5cbd3efcece35fc8a2cf2d"
  },
  {
    "url": "p5/vue-base/03 Vue 核心语法.html",
    "revision": "c81a00b49bfdf2f3ea9a41a964ce6a15"
  },
  {
    "url": "p5/vue-base/04 Vue 进阶语法.html",
    "revision": "4a1f12868742bf4b3b7e84ec9cf96886"
  },
  {
    "url": "p5/vue-base/05 Vue 组件基础.html",
    "revision": "f2484cd65f8f48d5519cb2d7ca3824f6"
  },
  {
    "url": "p5/vue-base/06 Vue 父子组件通信.html",
    "revision": "77a6cd63b128f5addb495d3e25f078e5"
  },
  {
    "url": "p5/vue-base/07 Vue 跨层级组件通信.html",
    "revision": "fb825f55f2147275d20e0fad1349d4cd"
  },
  {
    "url": "p5/vue-base/08 Vue 函数式组件和 JSX 应用.html",
    "revision": "8f77377020161ced38c8183d05845406"
  },
  {
    "url": "p5/vue-base/09 Vue 过渡和动画.html",
    "revision": "4bb027e89ca72ce3c6379e0ba5519061"
  },
  {
    "url": "p5/vue-base/10 Vue-Cli 脚手架.html",
    "revision": "38ebb6e11a44771a19cb5d0e12e1a0ae"
  },
  {
    "url": "p5/vue-base/11 Vue-Router 路由器.html",
    "revision": "f7298eb0769d0a7d524d6d466ac3851e"
  },
  {
    "url": "p5/vue-base/12 Vuex 状态管理器.html",
    "revision": "42da0c8c7ac25c1e7a95235717f754e8"
  },
  {
    "url": "p5/vue-base/13 Vant 项目.html",
    "revision": "88c8e1eef8629293b46b4c51c8363af3"
  },
  {
    "url": "p5/vue-base/14 v-tooltip 中文文档翻译.html",
    "revision": "51e93db9c8e0fc628c05b5d1cb16cf85"
  },
  {
    "url": "p5/vue-base/index.html",
    "revision": "2a9947a94191996a20c05f2e98ae6f31"
  },
  {
    "url": "p5/vue-element-admin/admin 项目创建.html",
    "revision": "e413bc4fad5370a97c53e985f1c0df52"
  },
  {
    "url": "p5/vue-element-admin/API 统一管理.html",
    "revision": "9d960d54ad36cdc806e016dc7d3bc2fa"
  },
  {
    "url": "p5/vue-element-admin/index.html",
    "revision": "a0a551add29f5d3143de3f360a4a9a1a"
  },
  {
    "url": "p5/vue-element-admin/Layout 布局框架.html",
    "revision": "1cc19a2b9f9179ef78162c2b17ebefcd"
  },
  {
    "url": "p5/vue-element-admin/Mock 服务.html",
    "revision": "205123e245e1df0ff26bb7ce7bddf6c5"
  },
  {
    "url": "p5/vue-element-admin/Node 本地开发服务器.html",
    "revision": "46634454444247fb32413a29fc7818c9"
  },
  {
    "url": "p5/vue-element-admin/主题定制.html",
    "revision": "b413294fb4e94dc1eeaa4f397eea9c3c"
  },
  {
    "url": "p5/vue-element-admin/单元测试.html",
    "revision": "197b1fc2da0fbedac55c06c0d5f262ff"
  },
  {
    "url": "p5/vue-element-admin/国际化切换.html",
    "revision": "57b2a7a81d550538380dd8be628b1e98"
  },
  {
    "url": "p5/vue-element-admin/布局、样式与图标.html",
    "revision": "29de70e68ddce15b290e79808dc32d62"
  },
  {
    "url": "p5/vue-element-admin/构建部署与发布.html",
    "revision": "f9e403b032c1672ddc92258b8289426f"
  },
  {
    "url": "p5/vue-element-admin/环境变量配置.html",
    "revision": "e64707a6964e55e28e40cc75e5f8a150"
  },
  {
    "url": "p5/vue-element-admin/第三方库使用.html",
    "revision": "4ba0ff38982fbd617cae386befd32376"
  },
  {
    "url": "p5/vue-element-admin/路由菜单与用户权限.html",
    "revision": "3b8820b1699f010c9097235ecfc25071"
  },
  {
    "url": "p5/vue-element-admin/路由页面刷新方案.html",
    "revision": "dd6a6da22591e5ca848377191999a58f"
  },
  {
    "url": "p6/vue-pro/01 准备工作.html",
    "revision": "99bcdf4d7115815f73517df129f72bb2"
  },
  {
    "url": "p6/vue-pro/index.html",
    "revision": "917c2142aee010c88f73e5ad77c85b66"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
