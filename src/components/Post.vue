<template>
  <article class="post type-post status-publish format-standard hentry category-uncategorized tag-html tag-wordpress">
    <div class="blog-item-wrap">
      <a v-link="'/post/'+slug" :title="title"></a>
      <div class="post-inner-content">
        <header class="entry-header page-header">
          <h2 class="entry-title"><a v-link="'/post/'+slug" rel="bookmark" v-html="title"></a></h2>
          <div class="entry-meta">
            <span class="posted-on"><i class="fa fa-calendar"></i>
              <a v-link="'/post/'+key" rel="bookmark">
                <time class="entry-date published" :datetime="created" v-text="created|fmtDate"></time>
                <time class="updated" :datetime="modified | fmtDate" v-text="modified | fmtDate"></time>
              </a>
            </span>
            <span class="byline"> <i class="fa fa-user"></i> <span class="author vcard"><a class="url fn n" v-link="author_url">{{author_name}}</a></span></span>
            <span class="comments-link"><i class="fa fa-comment-o"></i><a v-link="'/post/'+key" v-text="comments_count_string"></a></span>
          </div>
        </header>
        <div class="entry-content">
          <p v-html="text | marked"></p>
          <p><a class="btn btn-default read-more" v-link="'/post/'+slug" :title="title">查看更多</a></p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
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
    created(){
      let p = this.posts.find(i=>i.cid === this.cid) || [];
      for (let i of Object.keys(p)) {
        if (i in this) {
          this.$set(i, p[i]);
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
