<template>
  <div class="main-content-inner col-sm-12 col-md-8">
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <article
          class="post type-post status-publish format-aside hentry category-uncategorized tag-kk tag-ll tag-ok post_format-post-format-aside">
          <div class="post-inner-content">
            <header class="entry-header page-header">
              <h1 class="entry-title" style="display:block" v-html="title"></h1>
              <div class="entry-meta">
                                <span class="posted-on">
                                    <i class="fa fa-calendar"></i>
                                    <a :href="link" rel="bookmark">
                                        <time class="entry-date published"
                                              :datetime="create_time">{{created | fmtDate}}</time>
                                        <time class="updated" :datetime="update_time">{{modified | fmtDate}}</time>
                                    </a>
                                </span>
                <span class="byline">
                                    <i class="fa fa-user"></i>
                                    <span class="author vcard">
                                        <a class="url fn n" href="http://localhost/author/admin/">admin</a>
                                    </span>
                                </span>
                <span class="cat-links">
                                    <i class="fa fa-folder-open-o"></i>
                                    <a v-for="category of categories" track-by="name" v-link="'/category/'+category.key"
                                       rel="category tag">{{category.name}} </a>
                                </span>
              </div>
            </header>
            <div class="entry-content" v-html="text | marked">
            </div>
            <footer class="entry-meta">
              <div class="tagcloud" style="display: block;">
                <a v-for="tag of tags" v-link="'/tag/'+tag.key" v-text="tag.name"></a>
              </div>
            </footer>
          </div>
        </article>
        <div id="comments" class="comments-area">
        </div>
        <nav class="navigation post-navigation" role="navigation">
          <h1 class="screen-reader-text">文章导航</h1>
          <div class="nav-links">
            <div class="nav-previous" v-if="prev_post && prev_post.name">
              <a v-link="'/post/'+prev_post.id" rel="prev"><i
                class="fa fa-chevron-left"></i> {{prev_post.name}}</a></div>
            <div class="nav-next" v-if="next_post && prev_post.name">
              <a v-link="'/post/'+next_post.id" rel="next">{{next_post.name}} <i
                class="fa fa-chevron-right"></i></a>
            </div>
          </div>
        </nav>
      </main>
    </div>
  </div>
</template>

<script>
  import {setCurrentPost, updateTitle} from '../actions'
  export default{
    route: {
      data(){
        return this.setCurrentPost(this.$route.params.slug).then(()=> {
          this.updateTitle(this.title);
          let el = document.createElement('div');
          el.setAttribute('data-thread-key', this.key);
          el.setAttribute('data-url', this.url);
          DUOSHUO.EmbedThread(el);
          jQuery(this.$el).find('#comments').empty().append(el);
        });
      },
      activate(){
        jQuery('html, body').animate({scrollTop: 0}, 'slow');
      },
      deactivate(){
        return this.updateTitle();
      }
    },
    vuex: {
      getters: {
        cid: state=>state.currentPost.cid,
        title: state=>state.currentPost.title,
        slug: state=>state.currentPost.slug,
        text: state=>state.currentPost.text,
        created: state=>state.currentPost.created,
        modified: state=>state.currentPost.modified,
        allowComment: state=>state.currentPost.allowComment,
        metas: state=>state.currentPost.metas || [],
        key: state=>state.currentPost.cid,
        url: state=>`https://shyling.com/posts/${state.currentPost.slug}.html`
      },
      actions: {
        setCurrentPost,
        updateTitle
      }
    },
    computed: {
      tags(){
        return this.metas.filter(meta=>meta.type === 'tag');
      },
      categories(){
        return this.metas.filter(meta=>meta.type === 'category');
      }
    }
  }
</script>
