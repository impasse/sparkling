import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VueResource from "vue-resource";
import marked from "marked";
import {pad} from "./util";
import App from "./App";
import Posts from "./components/Posts.vue";
import Single from "./components/Single.vue";
import Filter from "./components/Filter.vue";
import NotFound from "./components/404.vue";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/font-awesome/css/font-awesome.css";
import "./assets/style.css";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.http.options.root = 'https://shyling.com/api/v1';

Vue.filter('marked', function (val) {
  return marked(val || '');
});
Vue.filter('fmtDate', function (val, human = true) {
  let d = new Date(val * 1000);
  if (human) {
    return `${d.getFullYear()}年${pad(d.getMonth() + 1)}月${pad(d.getDay())}日`;
  } else {
    return d.toISOString();
  }
});

const router = new VueRouter({
  history: true
});

const store = new Vuex.Store({
  state: {
    title: '泠的博客',
    total: 0,
    size: 0,
    currentPage: [],
    currentPost: {},
    pages: [],
    tags: [],
    categories: [],
    links: [],
    searchResult: []
  },
  mutations: {
    UPDATE_TITLE(state, title){
      let perfix = '泠的博客';
      state.title = document.title = title ? `${perfix} - ${title}` : perfix;
    },
    UPDATE_CURRENT_PAGE(state, res){
      state.size = res.size;
      state.total = res.count;
      state.currentPage = res.data;
    },
    UPDATE_CURRENT_POST(state, post){
      state.currentPost = post;
    },
    FETCH_OPTION(state, res){
      state.pages = res.pages;
      state.links = res.links;
      state.tags = res.metas.filter(meta=>meta.type === 'tag');
      state.categories = res.metas.filter(meta=>meta.type === 'category')
    },
    SEARCH(state, res){
      state.searchResult = res;
    },
    RESET_SEARCH(state){
      state.searchResult = [];
    }
  }
});

router.map({
  '/posts/:page': {
    component: Posts
  },
  '/post/:slug': {
    component: Single
  },
  '/filter/:type/:query': {
    component: Filter
  },
  '*': {
    component: NotFound
  }
});

router.alias({
  '/': '/posts/0',
  '/posts': '/posts/0',
  '/tag/:query': '/filter/tag/:query',
  '/category/:query': '/filter/category/:query',
  '/search/:query': '/filter/none/:query'
});

router.start({...App, store}, 'app');
