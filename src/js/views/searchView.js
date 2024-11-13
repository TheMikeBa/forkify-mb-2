class SearchView {
  parent = document.querySelector('.search');

  addHandlerSearch(handler) {
    this.parent.addEventListener('submit', e => {
      e.preventDefault();
      handler(document.querySelector('.search__field').value);
      document.querySelector('.search__field').value = '';
    });
  }
}

export default new SearchView();
