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
    "revision": "d388e94e61470aa9cf6e691267939dcd"
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
    "url": "assets/js/10.3b19c41b.js",
    "revision": "5fbe3344c38e28741f7679dec84d50f7"
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
    "url": "assets/js/30.f142a549.js",
    "revision": "ca6e9a6a74256e6d28339c81ce536d00"
  },
  {
    "url": "assets/js/31.49e30bad.js",
    "revision": "b69e5c2370c478c535c22d4786661321"
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
    "url": "assets/js/43.f6744197.js",
    "revision": "02f0bf1509e8fc43a2e9a5740a40c4cb"
  },
  {
    "url": "assets/js/44.6ed5f7f9.js",
    "revision": "a9ab68889e313cc96bf076059263d38b"
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
    "url": "assets/js/57.b04d077f.js",
    "revision": "c9a1abe787734c7a31f43cebfeadfd87"
  },
  {
    "url": "assets/js/58.a0758c48.js",
    "revision": "11b22e0044ae22e9c0aff8d2e39e17d5"
  },
  {
    "url": "assets/js/59.b61cb30f.js",
    "revision": "146108f0b8d03c328dbdb78c0e8ede0c"
  },
  {
    "url": "assets/js/6.c96f94a6.js",
    "revision": "b801a67be2d28eedce269e63b7cdce9d"
  },
  {
    "url": "assets/js/60.ffe5a729.js",
    "revision": "f30260b3fe5e26b20e098b732d0a39ba"
  },
  {
    "url": "assets/js/61.e9bf06ed.js",
    "revision": "db79c7fd0dac986cff150cd6b26f02fd"
  },
  {
    "url": "assets/js/62.ba1b3c82.js",
    "revision": "04deb4e9379267d002157431aaee4265"
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
    "url": "assets/js/65.79afb858.js",
    "revision": "6e1640e4666a6bc755c9650b0b18d8b4"
  },
  {
    "url": "assets/js/66.54ad80d0.js",
    "revision": "9faed6f11a277b70000715b0ab2fed31"
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
    "url": "assets/js/9.9a8aa94a.js",
    "revision": "29e3b65ba3694144a3768297025422eb"
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
    "url": "assets/js/92.6d5f4c11.js",
    "revision": "3b89c2f70cbe45cf1733c86713ac49cb"
  },
  {
    "url": "assets/js/93.523671a6.js",
    "revision": "0c2b415784b0ebfffb161a3950ad08e8"
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
    "url": "assets/js/app.675d9bf2.js",
    "revision": "c4b7f679a3679e95300a3ebcdd197aa3"
  },
  {
    "url": "blog/economics/index.html",
    "revision": "fc8086fdf1116b3fdd08684b59308fd8"
  },
  {
    "url": "blog/live/index.html",
    "revision": "9e5a1c2d990c25dc70d45622becfd75a"
  },
  {
    "url": "blog/live/note.html",
    "revision": "6202dc208f70c2fd9ccc6a30df7a0828"
  },
  {
    "url": "homePage.jpg",
    "revision": "95a05a8245caf9fa365ccbe87f962173"
  },
  {
    "url": "index.html",
    "revision": "92ebbef8a6800cfb5eec00732fab4c29"
  },
  {
    "url": "logo.jpg",
    "revision": "c259224475864eb121a80eba82347399"
  },
  {
    "url": "my-resume.html",
    "revision": "17d913c662378db159980c8cba86688a"
  },
  {
    "url": "p4/browser/BOM.html",
    "revision": "38c2069ff507355377f492eed9f43679"
  },
  {
    "url": "p4/browser/CSSOM.html",
    "revision": "58a66e97aa3347c802133db2e07664cb"
  },
  {
    "url": "p4/browser/DOM.html",
    "revision": "26bd6107ae5c68f1abcdcd08e20692d0"
  },
  {
    "url": "p4/browser/前端本地存储.html",
    "revision": "0d51c093e3685a1033d1a9ec9bf85fc9"
  },
  {
    "url": "p4/es-next/01 let 变量和 const 常量.html",
    "revision": "73a65195ad326087769a411ac7838813"
  },
  {
    "url": "p4/es-next/01 块级作用域.html",
    "revision": "06a88f4baab1d82ed4fc9c34827968a4"
  },
  {
    "url": "p4/es-next/02 数值的新特性.html",
    "revision": "7beae276c64901c28add8f2d545e983a"
  },
  {
    "url": "p4/es-next/03 字符串的新特性.html",
    "revision": "a3bd17461d816fbc9e817fbeccc27c3a"
  },
  {
    "url": "p4/es-next/04 数组的新特性.html",
    "revision": "0a07ffb2971196a68f17298c3f886845"
  },
  {
    "url": "p4/es-next/05 对象的新特性.html",
    "revision": "b713b44f3b4fa1acfb3022b879491663"
  },
  {
    "url": "p4/es-next/06 函数的新特性.html",
    "revision": "fa9956df48ed4b3d00a1a17d781f22b3"
  },
  {
    "url": "p4/es-next/07 解构赋值（脱壳）.html",
    "revision": "c39e19daae24c7dbe8fd3771cc6fc8d6"
  },
  {
    "url": "p4/es-next/08 class 类.html",
    "revision": "c1a38c210e357b4e161e85a971fc0ac1"
  },
  {
    "url": "p4/es-next/09 Set 和 Map 数据结构.html",
    "revision": "50588afa0f3f15d85a06988705ac3d67"
  },
  {
    "url": "p4/es-next/10 Promise 和 async_await.html",
    "revision": "c1531a2f257331db6ca5c479511fc97c"
  },
  {
    "url": "p4/es-next/11 Proxy 和 Reflect 代理对象.html",
    "revision": "17a836f1db1b1f031f7f529bafeffbc6"
  },
  {
    "url": "p4/es-next/12 Generator 异步迭代器.html",
    "revision": "b9a10efddd0de3d134a3c6fb4b0f912e"
  },
  {
    "url": "p4/es-next/13 前端模块化.html",
    "revision": "97324a62bfea982cd1dcd037b82b018a"
  },
  {
    "url": "p4/es-next/index.html",
    "revision": "9c4bb6d97ebd7b44a4a47842e4bebac6"
  },
  {
    "url": "p4/javascript/index.html",
    "revision": "a287e5fddfe761cdaa759a16b372c37c"
  },
  {
    "url": "p4/javascript/堆栈内存和作用域/作用域.html",
    "revision": "c34139faf798fe44dc552b40878d1350"
  },
  {
    "url": "p4/javascript/堆栈内存和作用域/堆栈内存.html",
    "revision": "805f5c3d6ee340fb8e67d69936ce60dc"
  },
  {
    "url": "p4/javascript/异步编程/Event Loop.html",
    "revision": "1247494c5755ab8aa3b27886232ad632"
  },
  {
    "url": "p4/javascript/异步编程/index.html",
    "revision": "db20b6177b20395c11c6773b8c5ecfd1"
  },
  {
    "url": "p4/javascript/异步编程/Promise 核心.html",
    "revision": "820cbacfbc70bb02dfeab4c88d58828c"
  },
  {
    "url": "p4/javascript/异步编程/异步解决方案.html",
    "revision": "6b02a4394b5e174b1619b8850ed9faf2"
  },
  {
    "url": "p4/javascript/异步编程/高阶函数.html",
    "revision": "45a476982895f9764c8802523f9e2678"
  },
  {
    "url": "p4/javascript/执行机制/01 事件机制.html",
    "revision": "16b069f31b4fe5a79a2dedaa6086bc98"
  },
  {
    "url": "p4/javascript/执行机制/02 作用域.html",
    "revision": "4c5c1f6b66ca867b7321d8831189c7e3"
  },
  {
    "url": "p4/javascript/执行机制/03 内存管理.html",
    "revision": "17afadb9083c1e07564e02f21c99a333"
  },
  {
    "url": "p4/javascript/执行机制/04 闭包.html",
    "revision": "6d1d10836bb2c35d8339c802c2026666"
  },
  {
    "url": "p4/javascript/数据类型/00 数据类型.html",
    "revision": "bb90849850d0f79ba58bd1d8acdbcaa7"
  },
  {
    "url": "p4/javascript/数据类型/01 数据类型判断.html",
    "revision": "1202f341932945fd426525f5cb984391"
  },
  {
    "url": "p4/javascript/数据类型/02 数据类型转换.html",
    "revision": "f11e2336e060e7e1aea46c611f2fe0e8"
  },
  {
    "url": "p4/javascript/面向对象/01 面向对象基础.html",
    "revision": "30e27b946f2bb53ad7a93f1e852a95f6"
  },
  {
    "url": "p4/javascript/面向对象/02 原始类型和引用对象.html",
    "revision": "d6a1fd62b020646f63906cde15cbef2a"
  },
  {
    "url": "p4/javascript/面向对象/03 函数.html",
    "revision": "fe93ee1c26fcee56d1a2892e8593ba16"
  },
  {
    "url": "p4/javascript/面向对象/04 对象.html",
    "revision": "e30551b8193cd89d565d531bfe3be621"
  },
  {
    "url": "p4/javascript/面向对象/05 构造函数和原型.html",
    "revision": "3f0a0bbcf062aa2a9c588019f866caa1"
  },
  {
    "url": "p4/javascript/面向对象/06 继承方案.html",
    "revision": "0c4d008a54c2fa8a91bafe4469431a7c"
  },
  {
    "url": "p4/javascript/面向对象/07 对象模式.html",
    "revision": "abfb10a100c985fc4bbfcf85fa1a201f"
  },
  {
    "url": "p4/javascript/面向对象/08 this 关键字.html",
    "revision": "fe0974df96e762a947e6ff862ca4bf2c"
  },
  {
    "url": "p4/javascript/面向对象/09 this 内置函数.html",
    "revision": "14322bb37b6b840ea460fc547c3cc1a1"
  },
  {
    "url": "p4/javascript/面向对象/10 this 应用实例.html",
    "revision": "57e9d439825ce580556a88db9e32e29c"
  },
  {
    "url": "p4/team/tools/github和picgo搭建图床.html",
    "revision": "d93a8a2b44c60eedcc58d64b3cab6ae1"
  },
  {
    "url": "p4/team/tools/index.html",
    "revision": "f70ee9353d8d92c6e36a64eca1fb3f43"
  },
  {
    "url": "p4/team/tools/vue-press.html",
    "revision": "c670e16b7589855c807edcb6c481d282"
  },
  {
    "url": "p4/typescript/00 基础知识.html",
    "revision": "744ac49fc0b68d215ff8fa1ea96f1245"
  },
  {
    "url": "p4/typescript/01 数据类型.html",
    "revision": "de1cb492fe286201ec28fd855ac15e65"
  },
  {
    "url": "p4/typescript/02 面向对象.html",
    "revision": "ff95a6fc52079fea3f102bb88e45dbdc"
  },
  {
    "url": "p4/typescript/10 Vue 应用.html",
    "revision": "c13f79cc5225b984af294a0a2ff169b5"
  },
  {
    "url": "p4/typescript/基础知识.html",
    "revision": "5c12ee8fc0ee80f403cb21a63857ea0b"
  },
  {
    "url": "p5/interview/business/index.html",
    "revision": "69d59ac91d2b2a8bb33f5d9d97571680"
  },
  {
    "url": "p5/interview/business/鉴权方式.html",
    "revision": "d132ce29fda8bb41d88d3ce75a3200ca"
  },
  {
    "url": "p5/interview/topic/index.html",
    "revision": "ab4e2f5f273ce16ae56d0a29ea5bbafa"
  },
  {
    "url": "p5/interview/topic/异步编程.html",
    "revision": "47e11410f545d81ae87d5412cb73d376"
  },
  {
    "url": "p5/interview/topic/闭包作用域.html",
    "revision": "c4d0d4ec325a553ac4c548ecd7f80efd"
  },
  {
    "url": "p5/interview/topic/面向对象.html",
    "revision": "4f2e67db3432f1e8c144732debc5f3c8"
  },
  {
    "url": "p5/vue-base/01 Vue 基础.html",
    "revision": "6fd230b3d5573730075362d53727cb18"
  },
  {
    "url": "p5/vue-base/02 Vue 项目启动和基本配置.html",
    "revision": "b4f0c17164a1b833d1cd989c190f1555"
  },
  {
    "url": "p5/vue-base/03 Vue 核心语法.html",
    "revision": "e3987431b5ba941a00f50479c4313edc"
  },
  {
    "url": "p5/vue-base/04 Vue 进阶语法.html",
    "revision": "07f771229328bc7e5e46c4317443a9e2"
  },
  {
    "url": "p5/vue-base/05 Vue 组件基础.html",
    "revision": "f694563dbdef92364c027a68cd204db6"
  },
  {
    "url": "p5/vue-base/06 Vue 父子组件通信.html",
    "revision": "fa62c65ebdc9c29f4fa4e0fa84d5be35"
  },
  {
    "url": "p5/vue-base/07 Vue 跨层级组件通信.html",
    "revision": "10d225213b3663e26d238c6ba1b5321c"
  },
  {
    "url": "p5/vue-base/08 Vue 函数式组件和 JSX 应用.html",
    "revision": "3c59ae47e381ddbb8879005b81daaf97"
  },
  {
    "url": "p5/vue-base/09 Vue 过渡和动画.html",
    "revision": "0528f8373ebe48b97cdfcb2b9ede0144"
  },
  {
    "url": "p5/vue-base/10 Vue-Cli 脚手架.html",
    "revision": "8f64000fbca142d4e195209707fa98b3"
  },
  {
    "url": "p5/vue-base/11 Vue-Router 路由器.html",
    "revision": "44e2baa965329bf8dd3e390b5de84889"
  },
  {
    "url": "p5/vue-base/12 Vuex 状态管理器.html",
    "revision": "cc05368d2db7812c252f2ce5d7c24a8b"
  },
  {
    "url": "p5/vue-base/13 Vant 项目.html",
    "revision": "a45ff77081491ad5529a8dc31475e065"
  },
  {
    "url": "p5/vue-base/14 v-tooltip 中文文档翻译.html",
    "revision": "16370d40335c40f825e28ddb88e3becc"
  },
  {
    "url": "p5/vue-base/index.html",
    "revision": "01c9aaed9668593fc0076510a3759179"
  },
  {
    "url": "p5/vue-element-admin/admin 项目创建.html",
    "revision": "8b2d2470593c35de650fc3dee8e65dc9"
  },
  {
    "url": "p5/vue-element-admin/API 统一管理.html",
    "revision": "a4c4f0bb2f4e010f91e928238944bf40"
  },
  {
    "url": "p5/vue-element-admin/index.html",
    "revision": "95fdc22f93e7d314097d9814fe472ad7"
  },
  {
    "url": "p5/vue-element-admin/Layout 布局框架.html",
    "revision": "4938fe93292a86ce0fb39c122aaee515"
  },
  {
    "url": "p5/vue-element-admin/Mock 服务.html",
    "revision": "5c7e48f10e71818c009038310e8b5cfc"
  },
  {
    "url": "p5/vue-element-admin/Node 本地开发服务器.html",
    "revision": "a407c1c55352d52a714f63b18638cd1c"
  },
  {
    "url": "p5/vue-element-admin/主题定制.html",
    "revision": "53defdd72096ad7288ed2266bb743a8e"
  },
  {
    "url": "p5/vue-element-admin/单元测试.html",
    "revision": "16ad07b5696c2c631052722fa8b1d0f3"
  },
  {
    "url": "p5/vue-element-admin/国际化切换.html",
    "revision": "014daf389c3ae49b5c4780e07aa44334"
  },
  {
    "url": "p5/vue-element-admin/布局、样式与图标.html",
    "revision": "3e1a3f98e0023b40ff82a01cabf333a7"
  },
  {
    "url": "p5/vue-element-admin/构建部署与发布.html",
    "revision": "962d292f889c5f43c669bcc8756039e6"
  },
  {
    "url": "p5/vue-element-admin/环境变量配置.html",
    "revision": "0d0af16357d0999c54938f12f0920357"
  },
  {
    "url": "p5/vue-element-admin/第三方库使用.html",
    "revision": "0d4e4ecb88742bb0d12e6c75d8d168cd"
  },
  {
    "url": "p5/vue-element-admin/路由菜单与用户权限.html",
    "revision": "7804dd7a7ca5ead5a1ae03fd641644c2"
  },
  {
    "url": "p5/vue-element-admin/路由页面刷新方案.html",
    "revision": "353b6ab1fcfbfa25085b66b38a99ce57"
  },
  {
    "url": "p6/vue-pro/01 准备工作.html",
    "revision": "8c3b42bedf5aa112debe29911c5efcd5"
  },
  {
    "url": "p6/vue-pro/index.html",
    "revision": "30c621239dd28d198ee040c8a3edbc5a"
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
