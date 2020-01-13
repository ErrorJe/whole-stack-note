<template>
  <div id="vcomments"></div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function() {
    // require window
    const Valine = require('valine')
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
    }
    const APP_KEY = require('../config/cfg.js')
    new Valine({
      el: '#vcomments',
      ...APP_KEY,
      path: window.location.pathname,
      notify: false,
      verify: false,
      avatar: 'mm',
      placeholder: '欢迎评论'
    })
  }
}
</script>
