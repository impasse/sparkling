<template>
  <div class="main-content-inner col-sm-12 col-md-8 search">
    <section id="primary" class="content-area">
      <main id="main" class="site-main" role="main" v-if="this.searchResult.length===0">
        <section class="no-results not-found">
          <header class="page-header page-header">
            <h1 class="page-title">找不到任何东西</h1>
          </header>
          <div class="page-content">
            <p>抱歉，没有符合的搜索结果，请尝试其他的关键词</p>
              <div class="input-group">
                <label class="screen-reader-text" for="s">Search for:</label>
                <input type="text" class="form-control search-query" placeholder="Search…"
                       v-model="$route.params.query" id="s" title="Search for:">
                <span class="input-group-btn">
                  <button @click="search" type="button" class="btn btn-default" value="Search">
                    <span class="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
          </div>
        </section>
      </main>
      <main id="main" class="site-main" role="main" v-if="this.searchResult.length!==0">
        <header class="page-header">
          <h1 class="page-title"><span v-html="$route.params.query"></span> 的搜索结果：</h1>
        </header>
        <article class="page type-page status-publish hentry" v-for="article of searchResult" track-by="cid">
          <div class="blog-item-wrap">
            <a v-link="'/post/'+article.slug" :title="article.title"></a>
            <div class="post-inner-content">
              <header class="entry-header page-header">
                <h2 class="entry-title"><a v-link="'/post/'+article.slug" rel="bookmark" v-html="article.title"></a>
                </h2>
              </header>
              <div class="entry-summary">
                <p v-html="article.text | marked"></p>
                <p>
                  <a class="btn btn-default read-more" v-link="'/post/'+article.slug">查看更多</a>
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </section>
  </div>
</template>

<script>
  import Post from './Post.vue'
  import {search, resetSearch} from '../actions'
  export default{
    route: {
      data(){
        let {type, query} = this.$route.params;
        return this.search(type, query);
      },
      deactivate(){
        return this.resetSearch();
      }
    },
    methods: {
      search(){
        this.$router.go(`/search/${this.$route.params.query}`);
      }
    },
    vuex: {
      getters: {
        searchResult: state=>state.searchResult
      },
      actions: {
        search,
        resetSearch
      }
    }
  }
</script>
