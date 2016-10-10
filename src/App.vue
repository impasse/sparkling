<template>
    <div>
        <a class="sr-only sr-only-focusable" href="#content">Skip to main content</a>
        <div id="page" class="hfeed site">
            <header id="masthead" class="site-header" role="banner">
                <nav class="navbar navbar-default " role="navigation">
                    <div class="container">
                        <div class="row">
                            <div class="site-navigation-inner col-sm-12">
                                <div class="navbar-header">
                                    <button type="button" class="btn navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                    <div id="logo">
                                        <h1 class="site-name">
                                            <router-link class="navbar-brand" to="/" :title="head_title" rel="home">{{title}}</router-link>
                                        </h1>
                                    </div>
                                </div>
                                <div class="collapse navbar-collapse navbar-ex1-collapse">
                                    <ul id="menu-top" class="nav navbar-nav">
                                        <li v-for="page of pages" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-home">
                                            <router-link :title="page.title" :to="`/post/${page.slug}`" v-html="page.title"></router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div id="content" class="site-content">
                <div class="top-section">
                </div>

                <div class="container main-content-area">
                    <div class="row side-pull-left">
                        <router-view></router-view>
                        <side-bar></side-bar>
                    </div>
                </div>
            </div>

            <div id="footer-area">
                <div class="container footer-inner">
                    <div class="row">
                    </div>
                </div>

                <footer id="colophon" class="site-footer" role="contentinfo">
                    <div class="site-info container">
                        <div class="row">
                            <nav role="navigation" class="col-md-6">
                            </nav>
                            <div class="copyright col-md-6">
                                sparkling Theme by <a href="http://colorlib.com/" target="_blank">Colorlib</a> Powered by
                                <a href="http://vuejs.org/" target="_blank">Vue</a></div>
                        </div>
                    </div>
                    <div class="scroll-to-top" @click="scrollToTop" v-show="scrollBtnShow"><i class="fa fa-angle-up"></i>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    import Posts from './components/Posts.vue'
    import SideBar from './components/SideBar.vue'
    export default {
      data(){
        return {
          scrollBtnShow: false
        }
      },
      vuex: {
        getters: {
          pages: state=>state.pages,
          title: state=>state.title
        }
      },
      mounted(){
        window.addEventListener('scroll', ()=> {
          this.scrollBtnShow = window.scrollY > 100;
        })
      },
      methods: {
        scrollToTop(){
          jQuery('body').animate({scrollTop: 0}, 'slow');
        }
      },
      components: {
        Posts,
        SideBar
      }
    }
</script>
<style>

</style>
