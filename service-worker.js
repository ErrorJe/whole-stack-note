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
    "revision": "268a83167f231096b356967c81e05f77"
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
    "url": "assets/js/12.af42a027.js",
    "revision": "3267b4b624446687280d84a6dc1f52c7"
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
    "url": "assets/js/41.320c56ec.js",
    "revision": "bf2049607d9bd51652126b5f1f48a9dd"
  },
  {
    "url": "assets/js/42.bccd4f9b.js",
    "revision": "032171066e64f68cd80ea3b93109d857"
  },
  {
    "url": "assets/js/43.89354e9c.js",
    "revision": "b35d8028c51e53889dfa967aab2d345b"
  },
  {
    "url": "assets/js/44.aea411c3.js",
    "revision": "7faad28ea0b1f5868f03bf8f7e236e35"
  },
  {
    "url": "assets/js/45.2eeb97df.js",
    "revision": "8536ed5c5b85b7d17f6d5fd718d50e17"
  },
  {
    "url": "assets/js/46.1f0c5056.js",
    "revision": "e4e9e1ff873dc97697ef3d79e0fada8b"
  },
  {
    "url": "assets/js/47.36314954.js",
    "revision": "f2141bc747242d5fc21718a45091849e"
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
    "url": "assets/js/57.eae4eae8.js",
    "revision": "eaeefdd95453d2fd6b5836ed2038f4a8"
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
    "url": "assets/js/61.4d627f04.js",
    "revision": "c520887ad1091a980edad540fab131d1"
  },
  {
    "url": "assets/js/62.72627354.js",
    "revision": "c234b12f28b1ae1ec9b436be7c8e8a65"
  },
  {
    "url": "assets/js/63.5dac86c7.js",
    "revision": "17da30fa46c6ee32dbfefa2ae06eb2c4"
  },
  {
    "url": "assets/js/64.4daccaa3.js",
    "revision": "9e0599766361f779d81b47c782df2ff7"
  },
  {
    "url": "assets/js/65.95f93d6f.js",
    "revision": "50ffd445e71202842ccbc0ea189bd9ad"
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
    "url": "assets/js/68.a0bfb54b.js",
    "revision": "1742d08cdc8cab6047026f9f535e985c"
  },
  {
    "url": "assets/js/69.44695771.js",
    "revision": "5ebb6703cb2da128b38f5f369432b605"
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
    "url": "assets/js/72.73ff2746.js",
    "revision": "46360fee58967ba127a666d138f23da2"
  },
  {
    "url": "assets/js/73.e54ae128.js",
    "revision": "9775abe879a31baae95472720b70dab0"
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
    "url": "assets/js/app.32c79e15.js",
    "revision": "ddf2609c17fe6b573d273fd6174e3b3c"
  },
  {
    "url": "blog/economics/index.html",
    "revision": "1ebed56dd2819e1bb76b4bacf3ad9d10"
  },
  {
    "url": "blog/live/index.html",
    "revision": "c938442115ba496f9d010901de2ae886"
  },
  {
    "url": "blog/live/note.html",
    "revision": "e9c71a2b857550f403aa6e3db1cf9129"
  },
  {
    "url": "homePage.jpg",
    "revision": "95a05a8245caf9fa365ccbe87f962173"
  },
  {
    "url": "index.html",
    "revision": "c7684e065e9dc382cee1a446e9a8ae84"
  },
  {
    "url": "logo.jpg",
    "revision": "c259224475864eb121a80eba82347399"
  },
  {
    "url": "my-resume.html",
    "revision": "8598cf83c966b1c6250576f4e43199ed"
  },
  {
    "url": "p4/browser/BOM.html",
    "revision": "170afa2165161c648d05355328811fe0"
  },
  {
    "url": "p4/browser/CSSOM.html",
    "revision": "258a456bcb5c61e135558898a982af93"
  },
  {
    "url": "p4/browser/DOM.html",
    "revision": "7ae5466a24173dfafdbcea1383e5e260"
  },
  {
    "url": "p4/browser/前端本地存储.html",
    "revision": "138fdec08ad13d9e1f4e218c44b53705"
  },
  {
    "url": "p4/es-next/01 let 变量和 const 常量.html",
    "revision": "05a7f9609d592b8c32644bfebbb4de5d"
  },
  {
    "url": "p4/es-next/01 块级作用域.html",
    "revision": "39d88d19779455de854ed584ae99d8c6"
  },
  {
    "url": "p4/es-next/02 数值的新特性.html",
    "revision": "202bcefa38eda1d91f7ca2d8313feecf"
  },
  {
    "url": "p4/es-next/03 字符串的新特性.html",
    "revision": "0e2a3a1075fa1a8312f84bfd115a1cee"
  },
  {
    "url": "p4/es-next/04 数组的新特性.html",
    "revision": "b83df80dd129dfe28ebbc826a50cf55d"
  },
  {
    "url": "p4/es-next/05 对象的新特性.html",
    "revision": "ac5e8a5f6078521f809faa8169a565c7"
  },
  {
    "url": "p4/es-next/06 函数的新特性.html",
    "revision": "a38da7274850256490cfe86af244e52b"
  },
  {
    "url": "p4/es-next/07 解构赋值（脱壳）.html",
    "revision": "4ffa5d0732a3b2bf8a598475e96afc40"
  },
  {
    "url": "p4/es-next/08 class 类.html",
    "revision": "17b777de7614e036d2c1a4721e3e876a"
  },
  {
    "url": "p4/es-next/09 Set 和 Map 数据结构.html",
    "revision": "96ced0f55405506069cb7521c0bf64c7"
  },
  {
    "url": "p4/es-next/10 Promise 和 async_await.html",
    "revision": "74df8c5538b6b1dab41fcaeb873e8ba2"
  },
  {
    "url": "p4/es-next/11 Proxy 和 Reflect 代理对象.html",
    "revision": "035b46f01db18e56e0583f11e2608b12"
  },
  {
    "url": "p4/es-next/12 Generator 异步迭代器.html",
    "revision": "3ca6df8793a9026f9589dc17cd67445f"
  },
  {
    "url": "p4/es-next/13 前端模块化.html",
    "revision": "5c9f909f6c3d2e3ec1f53e2de7012d22"
  },
  {
    "url": "p4/es-next/index.html",
    "revision": "795c25b0c718bacfa6e173888a128c7b"
  },
  {
    "url": "p4/javascript/index.html",
    "revision": "b906317e5f3e39f6230173220b1ee293"
  },
  {
    "url": "p4/javascript/堆栈内存和作用域/作用域.html",
    "revision": "ab4b0406eb09d55e3a9bff5d53c82401"
  },
  {
    "url": "p4/javascript/堆栈内存和作用域/堆栈内存.html",
    "revision": "9e064a834de21539c7620b7cd533196b"
  },
  {
    "url": "p4/javascript/异步编程/Event Loop.html",
    "revision": "476475ab966d24ba89b6f80a0805acf4"
  },
  {
    "url": "p4/javascript/异步编程/index.html",
    "revision": "d3da09245fbde5d2fd3c90cab6d1cc19"
  },
  {
    "url": "p4/javascript/异步编程/Promise 核心.html",
    "revision": "84a183b085ad2a13142bc3b3ec1f4bb5"
  },
  {
    "url": "p4/javascript/异步编程/异步解决方案.html",
    "revision": "9aca718a7859a0ffc666b937e96b3dc5"
  },
  {
    "url": "p4/javascript/异步编程/高阶函数.html",
    "revision": "8f2d5fca04d639c1b503ab3ff774374f"
  },
  {
    "url": "p4/javascript/执行机制/01 事件机制.html",
    "revision": "b0529e816cc4a4426b1e81ecac621421"
  },
  {
    "url": "p4/javascript/执行机制/02 作用域.html",
    "revision": "fa433acb159f8d14fde81677fd9ebd50"
  },
  {
    "url": "p4/javascript/执行机制/03 内存管理.html",
    "revision": "42bd9db221dad42f22596bcbf8aae108"
  },
  {
    "url": "p4/javascript/执行机制/04 闭包.html",
    "revision": "146d8b38de45ac8b6db7280702049fea"
  },
  {
    "url": "p4/javascript/数据类型/00 数据类型.html",
    "revision": "ae15beb4b5f57cdf1393555f68bd6783"
  },
  {
    "url": "p4/javascript/数据类型/01 数据类型判断.html",
    "revision": "d7a6e7b0af5aa7b1aa4999068d651fb7"
  },
  {
    "url": "p4/javascript/数据类型/02 数据类型转换.html",
    "revision": "80b3f4f6a3ed1e8fb939bd2a8b7cbf81"
  },
  {
    "url": "p4/javascript/面向对象/01 面向对象基础.html",
    "revision": "e05053f7499ac1bd14539e58b23daf08"
  },
  {
    "url": "p4/javascript/面向对象/02 原始类型和引用对象.html",
    "revision": "19c3d3bfe32d7d1edb330efa89cb96c1"
  },
  {
    "url": "p4/javascript/面向对象/03 函数.html",
    "revision": "b5721dc5a84ebd495f398d1017d626f3"
  },
  {
    "url": "p4/javascript/面向对象/04 对象.html",
    "revision": "8644b7159cce5d2e154172c8c9a75edf"
  },
  {
    "url": "p4/javascript/面向对象/05 构造函数和原型.html",
    "revision": "f27200d1a22e940837c06fe508be29ab"
  },
  {
    "url": "p4/javascript/面向对象/06 继承方案.html",
    "revision": "fb565b8b4a0f774f962b7d27a67b4491"
  },
  {
    "url": "p4/javascript/面向对象/07 对象模式.html",
    "revision": "516893956fbfcaeee5175811aec52b8e"
  },
  {
    "url": "p4/javascript/面向对象/08 this 关键字.html",
    "revision": "4e730fe87cc7c5054745cae904f647fc"
  },
  {
    "url": "p4/javascript/面向对象/09 this 内置函数.html",
    "revision": "946c6832d8fefc7213671852af191e71"
  },
  {
    "url": "p4/javascript/面向对象/10 this 应用实例.html",
    "revision": "acf2f1152a955432a625382f177c8b4b"
  },
  {
    "url": "p4/team/tools/github和picgo搭建图床.html",
    "revision": "d27de4fea44071767b30532fc83adad3"
  },
  {
    "url": "p4/team/tools/index.html",
    "revision": "86e8c9912179ff6f38a82c1c4ad1244d"
  },
  {
    "url": "p4/team/tools/vue-press.html",
    "revision": "9d8a1f1e664319629315c95710eaabde"
  },
  {
    "url": "p4/typescript/00 基础知识.html",
    "revision": "4ec5624e3a37504ec2c38a4999d552d5"
  },
  {
    "url": "p4/typescript/01 数据类型.html",
    "revision": "021a06d7b349f6c2f6761902cacb956b"
  },
  {
    "url": "p4/typescript/02 面向对象.html",
    "revision": "fc50a3b309962cc697068615b6ba1ceb"
  },
  {
    "url": "p4/typescript/10 Vue 应用.html",
    "revision": "caa1f90485006a57899dace4308075ee"
  },
  {
    "url": "p4/typescript/基础知识.html",
    "revision": "f416c2851cb83a4cbbde05ba60a2832a"
  },
  {
    "url": "p5/interview/business/index.html",
    "revision": "0d7694fb68e25489b51d20ffe71283a1"
  },
  {
    "url": "p5/interview/business/鉴权方式.html",
    "revision": "dfbaa16134dd0b7687452d3f1aa42133"
  },
  {
    "url": "p5/interview/topic/index.html",
    "revision": "ee48b6694ae4e7aee03db210bef08706"
  },
  {
    "url": "p5/interview/topic/异步编程.html",
    "revision": "f50652c94b39dd24cbf2d5f1cdf61d9b"
  },
  {
    "url": "p5/interview/topic/闭包作用域.html",
    "revision": "3ec37cb8a313ef61313f69efef8d33d4"
  },
  {
    "url": "p5/interview/topic/面向对象.html",
    "revision": "4f2bafb64e493611aa02dc693aaf8265"
  },
  {
    "url": "p5/vue-base/01 Vue 基础.html",
    "revision": "e45aaf9a3c6a254dbbed309027fe99d6"
  },
  {
    "url": "p5/vue-base/02 Vue 项目启动和基本配置.html",
    "revision": "c6b4c5268b4d1892061d8e0730f01e54"
  },
  {
    "url": "p5/vue-base/03 Vue 核心语法.html",
    "revision": "a44fe1a5ca2339bb9e813e4c6f679c2a"
  },
  {
    "url": "p5/vue-base/04 Vue 进阶语法.html",
    "revision": "2408df16439ebf707978eb3ff5badd79"
  },
  {
    "url": "p5/vue-base/05 Vue 组件基础.html",
    "revision": "b634be3497877097e61379dc46c81004"
  },
  {
    "url": "p5/vue-base/06 Vue 父子组件通信.html",
    "revision": "4c3e2d4e2422e4008e6b68cadf7c45cd"
  },
  {
    "url": "p5/vue-base/07 Vue 跨层级组件通信.html",
    "revision": "0f32f0ed2ec69891705737ed74e0ac85"
  },
  {
    "url": "p5/vue-base/08 Vue 函数式组件和 JSX 应用.html",
    "revision": "4dc92c3d2c09107004dfdf4d317abde0"
  },
  {
    "url": "p5/vue-base/09 Vue 过渡和动画.html",
    "revision": "f4d449c2baafd41c2d0a237a7db19246"
  },
  {
    "url": "p5/vue-base/10 Vue-Cli 脚手架.html",
    "revision": "6be074590a0e41111cbb1863a0549259"
  },
  {
    "url": "p5/vue-base/11 Vue-Router 路由器.html",
    "revision": "50241a9801d5fe0a39e75451c6d9aa42"
  },
  {
    "url": "p5/vue-base/12 Vuex 状态管理器.html",
    "revision": "5907c5f2086819f9fb8e2bbc750c7e99"
  },
  {
    "url": "p5/vue-base/13 Vant 项目.html",
    "revision": "997a97f581e5f942d197f77a2d1be950"
  },
  {
    "url": "p5/vue-base/14 v-tooltip 中文文档翻译.html",
    "revision": "338052e32325210b72d29c1557717ac2"
  },
  {
    "url": "p5/vue-base/index.html",
    "revision": "28816fc6e9e60721116086c77b8f3c77"
  },
  {
    "url": "p5/vue-element-admin/admin 项目创建.html",
    "revision": "3b9e20fa154f9806f0fe2b2bb66354fd"
  },
  {
    "url": "p5/vue-element-admin/API 统一管理.html",
    "revision": "15cdc3624b841f9583ef771f1e8c1b14"
  },
  {
    "url": "p5/vue-element-admin/index.html",
    "revision": "0094cae41e52944c61129e4d7a777425"
  },
  {
    "url": "p5/vue-element-admin/Layout 布局框架.html",
    "revision": "9802a28c4c146346279cfd98f2e67e9a"
  },
  {
    "url": "p5/vue-element-admin/Mock 服务.html",
    "revision": "51d7bc0676f40b47074bd05ee53521a1"
  },
  {
    "url": "p5/vue-element-admin/Node 本地开发服务器.html",
    "revision": "b84c248d249e12faf0d301dc58ab1c17"
  },
  {
    "url": "p5/vue-element-admin/主题定制.html",
    "revision": "9074126b43850d370ad2602e23c154be"
  },
  {
    "url": "p5/vue-element-admin/单元测试.html",
    "revision": "7909d22ce8f69a7272189d014f51a6d7"
  },
  {
    "url": "p5/vue-element-admin/国际化切换.html",
    "revision": "ae759ccc28d67108b371e9953df1decb"
  },
  {
    "url": "p5/vue-element-admin/布局、样式与图标.html",
    "revision": "ffa7f146e0e1c6c26f3dbd2a6876a8f6"
  },
  {
    "url": "p5/vue-element-admin/构建部署与发布.html",
    "revision": "f2cd5d5d6f57181a6f8e458ba25b0571"
  },
  {
    "url": "p5/vue-element-admin/环境变量配置.html",
    "revision": "091ed5adb907d2d1f199cde7429da822"
  },
  {
    "url": "p5/vue-element-admin/第三方库使用.html",
    "revision": "fd852984e0bc8fe3b0fc2a717416d94a"
  },
  {
    "url": "p5/vue-element-admin/路由菜单与用户权限.html",
    "revision": "3df580b11ebd0a7c1c4848efc3c776b6"
  },
  {
    "url": "p5/vue-element-admin/路由页面刷新方案.html",
    "revision": "e5b3671845155e63852f3cbe7c7e93ea"
  },
  {
    "url": "p6/vue-pro/01 准备工作.html",
    "revision": "3189a6f34747b21bdc13bf7fa14b1f88"
  },
  {
    "url": "p6/vue-pro/index.html",
    "revision": "278ede03a1fcb6204256ddf952ad0488"
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
