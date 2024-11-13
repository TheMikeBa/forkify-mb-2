import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  parent = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this.parent.addEventListener('click', e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      handler(+button.dataset.goto);
    });
  }

  generateMarkup() {
    const prevButton = `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this.data.page - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.data.page - 1}</span>
      </button>`;
    const nextButton = `
      <button class="btn--inline pagination__btn--next" data-goto="${
        this.data.page + 1
      }">
        <span>Page ${this.data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;

    const numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    // page 1 and other pages
    if (this.data.page === 1 && numPages > 1) return nextButton;
    // page 1 and no other pages
    if (this.data.page === 1 && numPages === 1) return '';
    // last page
    if (this.data.page === numPages) return prevButton;
    // other page
    return prevButton + nextButton;
  }
}

export default new PaginationView();
