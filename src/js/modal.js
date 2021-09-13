import { eventsApiService } from "./api-event-service.js";
import { renderService } from "./search-render-service.js";
import modalMarkup from '../templates/modal-markup.hbs';


const refs = {
modal: document.querySelector('.modal'),
modalContainer: document.querySelector('.modal__content'),
button: document.querySelector('.modal__button'),
overlay: document.querySelector('.backdrop'),
eventsList: document.querySelector('.events-list'),
lightbox: document.querySelector('.js-lightbox'),
}

refs.eventsList.addEventListener('click', modalIsOpen);
refs.button.addEventListener('click', onCloseModalBtn);
refs.overlay.addEventListener('click', onCloseModalOverlay);
window.addEventListener('keyup', onCloseModalEsc);






function renderModal (e) {
 refs.modalContainer.insertAdjacentHTML('afterbegin', modalMarkup)
  
}

console.log(renderService.events);

function modalIsOpen (e) {

// const eId = e.currentTarget.id;
// console.log(eId);

// renderService.tempRenderArrCreator = e.currentTarget.id;
// renderModal();




   refs.overlay.classList.add('is-open');
refs.overlay.classList.remove('is-hidden');




};





function onCloseModalBtn (e) {
    
      removeClassIsOpen();
    
      };


function onCloseModalOverlay (e) {
    if (e.currentTarget === e.target) {
      removeClassIsOpen();
  }
  };


function onCloseModalEsc (e) {
    if (e.key !== "Escape") {
      return;
    }
    removeClassIsOpen();
  };
  
  function removeClassIsOpen () {
    refs.overlay.classList.remove('is-open');
    refs.overlay.classList.add('is-hidden');
    
  };


