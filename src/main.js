import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import marked from 'marked';
import { pad } from './util';
import App from './App';
import Posts from './components/Posts.vue';
import Single from './components/Single.vue';
import Filter from './components/Filter.vue';
import NotFound from './components/404.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import './assets/style.css';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.http.options.root = '/api/v1';

// Vue.filter('marked', function (val) {
//   return marked(val || '');
// });

const router = new VueRouter({
  routes: {
    '/posts/:page': {
      component: Posts,
      alias: ['/', '/posts']
    },
    '/post/:slug': {
      component: Single
    },
    '/filter/:type/:query': {
      component: Filter,
      alias: [
        { path: '/tag/:query', params: { type: 'tag' } },
        { path: '/category/:query', params: { type: 'category' } },
        { path: '/search/:query', params: { type: 'none' } }
      ]
    },
    '*': {
      component: NotFound
    }
  },
  mode: 'history'
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
    UPDATE_TITLE(state, title) {
      let perfix = '泠的博客';
      state.title = document.title = title ? `${perfix} - ${title}` : perfix;
    },
    UPDATE_CURRENT_PAGE(state, res) {
      state.size = res.size;
      state.total = res.count;
      state.currentPage = res.data;
    },
    UPDATE_CURRENT_POST(state, post) {
      state.currentPost = post;
    },
    FETCH_OPTION(state, res) {
      state.pages = res.pages;
      state.links = res.links;
      state.tags = res.metas.filter(meta => meta.type === 'tag');
      state.categories = res.metas.filter(meta => meta.type === 'category')
    },
    SEARCH(state, res) {
      state.searchResult = res;
    },
    RESET_SEARCH(state) {
      state.searchResult = [];
    }
  }
});

router.start({...App, store}, 'app');
