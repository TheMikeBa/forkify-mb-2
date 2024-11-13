import previewView from './previewView';
import View from './View';

class BookmarksView extends View {
  parent = document.querySelector('.bookmarks__list');
  errorMessage =
    'No bookmarks yet. Find a nice recipe to add your bookmarks array!';
  message = '';

  addHanderRender(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
