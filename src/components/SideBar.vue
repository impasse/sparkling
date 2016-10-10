<template>
  <div id="secondary" class="widget-area col-sm-12 col-md-4" role="complementary">
    <div class="well">
      <aside class="widget widget_search">
        <form role="search" method="get" class="form-search">
          <div class="input-group">
            <label class="screen-reader-text" for="s">Search for:</label>
            <input type="text" class="form-control search-query" placeholder="Search…"
                   v-model="searchBuffer" id="s" title="Search for:">
            <span class="input-group-btn">
                            <button type="button" class="btn btn-default" value="Search" @click="search">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
          </div>
        </form>
      </aside>
      <aside class="widget widget_tag_cloud">
        <h3 class="widget-title">标签</h3>
        <div class="tagcloud" style="display: block;">
          <router-link v-for="tag of tags" :to="'/tag/'+tag.slug" class="tag-link-4 tag-link-position-1"
             :title="tag.count + '条'"
             style="font-size: 8pt;">{{tag.name}}</router-link>
        </div>
      </aside>
      <aside class="widget widget_categories">
        <h3 class="widget-title">分类目录</h3>
        <div class="cats-widget">
        <ul>
          <li class="cat-item cat-item-1" v-for="category of categories">
            <router-link :to="'/category/' + category.slug" :title="category.count + '条'">{{category.name}}</router-link>
            <span v-text="category.count"></span>
          </li>
        </ul>
        </div>
      </aside>
      <aside class="widget widget_meta"><h3 class="widget-title">友情链接</h3>
        <ul>
          <li v-for="link of links"><a :href="link.href" :title="link.name">{{link.name}}</a></li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
  import {fetchOption} from '../actions'
  export default{
    created(){
      this.fetchOption();
    },
    data(){
      return {
        searchBuffer: ''
      }
    },
    vuex: {
      getters: {
        tags: state=>state.tags,
        categories: state=>state.categories,
        links: state=>state.links
      },
      actions: {
        fetchOption
      }
    },
    methods: {
      search(){
        if (this.searchBuffer) {
          this.$router.go(`/search/${this.searchBuffer}`);
        }
      }
    }
  }
</script>
