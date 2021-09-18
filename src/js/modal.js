import { eventsApiService } from "./api-event-service.js";
import { renderService } from "./search-render-service.js";
import modalMarkup from '../templates/modal-markup.hbs';
import { tempEventsArray } from './refs';
// import evtListTpl from '../templates/events-list.hbs';
import { refsGen } from "./refs";
import axios from "axios";

const refs = {
modal: document.querySelector('.modal'),
modalContainer: document.querySelector('.modal__content'),
button: document.querySelector('.modal__button'),
overlay: document.querySelector('.backdrop'),
eventsList: document.querySelector('.events-list'),
  lightbox: document.querySelector('.js-lightbox'),
inputCountry: document.querySelector(".input-country"),
}
refs.eventsList.addEventListener('click', modalIsOpen);
refs.button.addEventListener('click', onCloseModalBtn);
refs.overlay.addEventListener('click', onCloseModalOverlay);
window.addEventListener('keyup', onCloseModalEsc);

const renderArr = [];
function modalIsOpen(e) {
  // решение не-открытия модалки при клике между карточками
  if (e.target.nodeName !== 'IMG' && !e.target.classList.contains('decorative-frame')) {
    return;
  }
  const eventId = document.activeElement.dataset.id;
  const eventIndex = tempEventsArray.findIndex(obj => obj.id === eventId);
  const eventObj = tempEventsArray[eventIndex]

  console.log('id: ', eventId, ' index: ', eventIndex, ' eventObj ', eventObj)
  refs.overlay.classList.add('is-open');
  refs.overlay.classList.remove('is-hidden');
  refs.modalContainer.innerHTML = modalMarkup(eventObj);



  // Added by Aleksey, for MoreFromThisAuthor btn 
  refs.modalContainer.lastElementChild.addEventListener('click', onCloseModalOverlay);
  refs.modalContainer.lastElementChild.addEventListener('click', () => renderByMoreFromThisAuthor(refsGen))
  

  // Render MoreFromThisAuthor 
  function renderByMoreFromThisAuthor(ref) {
    eventObj._embedded.attractions === undefined ?
      refsGen.currentSearchQuery = eventObj.name :
      refsGen.currentSearchQuery = eventObj._embedded.attractions[0].name;
    refsGen.currentSearchQuery = eventObj.name;
    renderService.onKeyWord(ref);
    renderService.resetAtPaginationAndKeyWord(ref);
    return renderService.fetchAndRenderEvents(ref);
  }
}


// не понимаю куда эту хрень засунуть, чтобы получать норм обьект и отрендерить в модалку 

  // eventsApiService
  // .fetchEvents(eventIndex)
  // .then(data => (data))
  // const evt = {
  //   ...data,
  //   smallImg: data.images[6].url,
  //   bigImg: data.images[9].url,
  //   name: data.name,
  //   date: data.dates.start.localDate,
  //   time: data.dates.start.localTime,
  //   timezone: dates.timezone,
  //   city: data._embedded.venues[0].city.name,
  //   country: data._embedded.venues[0].country.name,
  //   place: data._embedded.venues[0].name,
  //   author: data._embedded.attractions[0].name,
  //   minPrice: data.priceRanges[0].min,
  //   maxPrice: data.priceRanges[0].max,
  //   currency: priceRanges[0].currency
  // .catch(err => err(error))};


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


  // --------------------- MoreFromThisAuthor button ------------------------
function createOneCard(obj) {
  const markUp = 
    `<li class="event-item">
        <a href="javascript:void(0)" class="event-list-link" data-id="${obj.id}">
            <div class="decorative-frame"></div>
            <div class="img-frame">
                <img src="${obj.images[6].url}"  alt="${obj.name}" class="event-img" />
            </div>
        </a>
        <p class="event-description">
            ${obj.name}
        </p>
        <p class="event-data">
            ${obj.dates.start.localDate}, ${obj.dates.start.localTime}
        </p>
        <p class="event-lokation">
            <span class="material-icons event-place">
                place
            </span>
            ${obj._embedded.venues[0].name}, ${obj._embedded.venues[0].city.name}
        </p>  
    </li>`
  refs.eventsList.insertAdjacentHTML('beforeend',markUp);
}
function renderList(arr) {
  clearMarkUp();
  arr.forEach(el => createOneCard(el));
}
function clearMarkUp() {
  refs.eventsList.innerHTML = ''
}
// function searchUserCountry() {
//   axios.get('https://ipapi.co/json/')
//     .then((response) => {
//       let data = response.data;
//       console.log(data);
//       refs.inputCountry.value = `${data.country_name}`
//     })
//     .catch((err) => console.log(err))
// }
// searchUserCountry();