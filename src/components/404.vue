<template>
  <div class="main-content-inner col-sm-12 col-md-8">
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <h1>404 Not Found</h1>
        <p>{{ttl}}秒后,你将回到主页.</p>
      </main>
    </div>
  </div>
</template>

<script>
  export default{
    route: {
      activate(){
        let timer = setInterval(()=> {
          if (this.ttl <= 0) {
            clearInterval(timer);
            this.$router.go('/');
          } else {
            --this.ttl;
          }
        }, 1000);
      }
    },
    data(){
      return {
        ttl: 5
      }
    }
  }
</script>
