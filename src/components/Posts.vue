<template>
  <div class="main-content-inner col-sm-12 col-md-8">
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <post v-for="p of posts" :cid="p.cid"></post>
        <nav class="navigation paging-navigation" role="navigation">
          <h1 class="screen-reader-text">文章导航</h1>
          <div class="nav-links">
            <div class="nav-previous" v-if="has_prev">
              <a v-link="'/posts/'+(current_page - 1)"><i class="fa fa-chevron-left"></i> 较新的文章</a>
            </div>
            <div class="nav-next" v-if="has_next">
              <a v-link="'/posts/'+ (current_page + 1)">较旧的文章 <i class="fa fa-chevron-right"></i></a>
            </div>
          </div>
        </nav>
      </main>
    </div>
  </div>
</template>

<script>
  import Post from './Post.vue'
  import {setCurrentPage, updateTitle} from '../actions'
  export default{
    vuex: {
      getters: {
        posts: state=>state.currentPage,
        total: state=>state.total,
        size: state=>state.size
      },
      actions: {
        setCurrentPage,
        updateTitle
      }
    },
    route: {
      data(){
        this.updateTitle();
        return this.setCurrentPage(this.$route.params.page);
      }
    },
    computed: {
      current_page(){
        return parseInt(this.$route.params.page);
      },
      has_prev(){
        return this.current_page > 0;
      },
      has_next(){
        return (this.current_page + 1) * this.size < this.total;
      }
    },
    components: {
      Post
    }
  }
</script>
