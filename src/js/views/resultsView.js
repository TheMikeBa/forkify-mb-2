import previewView from './previewView';
import View from './View';

class ResultsView extends View {
  parent = document.querySelector('.results');
  errorMessage = 'No recipes found for your query. Please try again!';
  message = '';

  generateMarkup() {
    return this.data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
