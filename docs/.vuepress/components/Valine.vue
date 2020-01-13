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
    console.log('引入了吗')

    new Valine({
      el: '#vcomments',
      appId: 'ka4MFCFtjrXuBMGCMlmdNeG0-gzGzoHsz', // your appId
      appKey: 'YIhxzpl4dV9s6UtM0KWLAcbD', // your appKey
      path: window.location.pathname,
      notify: false,
      verify: false,
      avatar: 'mm',
      placeholder: '欢迎评论'
    })
  }
}
</script>
