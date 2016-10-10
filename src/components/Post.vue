<template>
  <article class="post type-post status-publish format-standard hentry category-uncategorized tag-html tag-wordpress">
    <div class="blog-item-wrap">
      <router-link :to="'/post/'+slug" :title="title"></router-link>
      <div class="post-inner-content">
        <header class="entry-header page-header">
          <h2 class="entry-title">
            <router-link :to="'/post/'+slug" rel="bookmark" v-html="title"></router-link>
          </h2>
          <div class="entry-meta">
            <span class="posted-on"><i class="fa fa-calendar"></i>
              <router-link :to="'/post/'+key" rel="bookmark">
                <time class="entry-date published" :datetime="created" v-text="fmtDate(created)"></time>
                <time class="updated" :datetime="fmtDate(modified)" v-text="fmtDate(modified)"></time>
              </router-link>
            </span>
            <span class="byline"> <i class="fa fa-user"></i> <span class="author vcard"><router-link class="url fn n" :to="author_url">{{author_name}}</router-link></span></span>
            <span class="comments-link"><i class="fa fa-comment-o"></i><router-link :to="'/post/'+key" v-text="comments_count_string"></router-link></span>
          </div>
        </header>
        <div class="entry-content">
          <p v-html=""></p>
          <p>
            <router-link class="btn btn-default read-more" :to="'/post/'+slug" :title="title">查看更多</router-link>
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import markdown from "marked";
  export default{
    props: ['cid'],
    data(){
      return {
        title: '',
        slug: '',
        created: 0,
        modified: 0,
        commentsNum: 0,
        allowComment: true,
        text: ''
      }
    },
    methods:{
      fmtDate (val, human = true) {
        let d = new Date(val * 1000);
        if (human) {
          return `${d.getFullYear()}年${pad(d.getMonth() + 1)}月${pad(d.getDay())}日`;
        } else {
          return d.toISOString();
        }
      },
      marked(text){
        console.log(text);
        return '';
        // return markdown(text || '');
      }
    },
    created(){
      let p = this.posts.find(i=>i.cid === this.cid) || [];
      for (let i of Object.keys(p)) {
        if (i in this) {
          this[i] = p[i];
        }
      }
    },
    vuex: {
      getters: {
        posts: state=>state.currentPage
      }
    },
    computed: {
      comments_count_string(){
        let c = Number(this.comments_count) || 0;
        if (c === 0) {
          return '无评论';
        } else {
          return `${c}条评论`;
        }
      }
    },
    components: {}
  }
</script>
