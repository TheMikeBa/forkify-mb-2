import View from './View';
import icons from '../../img/icons.svg';

class addRecipeView extends View {
  parent = document.querySelector('.upload');
  message = 'Recipe successfully uploaded.';
  window = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  buttonOpen = document.querySelector('.nav__btn--add-recipe');
  buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerToggleWindow();
  }

  toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }

  // hideMessage() {
  //   document.querySelector('.message').classList.add();
  // }

  addHandlerToggleWindow() {
    [this.buttonOpen, this.buttonClose].forEach(button => {
      button.addEventListener('click', () => {
        this.toggleWindow();
      });
    });
  }

  addHandlerUpload(handler) {
    this.parent.addEventListener('submit', function (e) {
      e.preventDefault();
      let data = [...new FormData(this)];
      handler(data);
    });
  }

  generateMarkup() {
    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="ALL CAPS RECIPE" required name="title" type="text" />
        <label>URL</label>
        <input
          value="https://jonas.io/"
          required
          name="sourceUrl"
          type="text"
        />
        <label>Image URL</label>
        <input
          value="https://jonas.io/assets/img/JS-light-small.png"
          required
          name="image"
          type="text"
        />
        <label>Publisher</label>
        <input value="Jonas House" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="123" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="1" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5,kg,Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>`;
  }
}

export default new addRecipeView();
