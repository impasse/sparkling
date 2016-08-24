export function setCurrentPost({dispatch}, slug) {
  return this.$http.get(`post/${slug}`).then(res=>dispatch('UPDATE_CURRENT_POST', res.json()));
}

export function setCurrentPage({dispatch}, pageNum) {
  return this.$http.get(`posts/${pageNum}`).then(res=>dispatch('UPDATE_CURRENT_PAGE', res.json()));
}

export function fetchOption({dispatch}) {
  this.$http.get('option').then(res=>dispatch('FETCH_OPTION', res.json()));
}

export function search({dispatch}, type, query) {
  this.$http.post('search', {
    type: type,
    query: query
  }).then(res=>dispatch('SEARCH', res.json()));
}

export function resetSearch({dispatch}) {
  dispatch('RESET_SEARCH');
}

export function updateTitle({dispatch}, title) {
  dispatch('UPDATE_TITLE', title);
}
