import { throttle } from '../../node_modules/throttle-debounce';
import { eventsApiService } from './api-event-service';
import evtListTpl from '../templates/events-list.hbs';
import { spinner } from './spin';
import { createPagination } from './pagination';
import { queryTotalPages, pageNumber } from "./api-event-service";
import { refsGen } from './refs';
import {pushNotify1, pushNotify2, pushNotify3, pushNotify4, myNotify1, myNotify2, myNotify3, myNotify4} from './notify'

class RenderService {
  constructor() {
    this.events;
    this.eventsList = document.querySelector('.events-list');
    this.doneBtn = document.querySelector('.js-done-btn');
    this.searchForm = document.querySelector('.search-form');
    this.inputCountry = document.querySelector(".input-country");
    this.tempRenderArr = [];
    this.infiniteScrollOn = 'off';
    this.tempCountryCode = '';
    // this.endedScroll = false;
    this.renderStoper = false;
  }

  // ======запуск поиска по клику или энтеру======

  onSearch(e, ref) {
    e.preventDefault();

    // ======проверка на пустой инпут======

    if (e.currentTarget.elements.query.value === '') {
      // return alert('Введи хоть что-то!');
      if (myNotify2) {
        myNotify2.close();
      };
      pushNotify2();
      return (this.renderStoper = false);
    };

    // ======проверка на повторный ввод того-же======

    if (e.currentTarget.elements.query.value === ref.currentSearchQuery && e.currentTarget.elements.query.value !== '' && ref.countryCode === this.tempCountryCode) {
    // return alert('такое уже есть...');
      if (myNotify4) {
        myNotify4.close();
      };
      return pushNotify4();
    };

    eventsApiService.searchQuery = e.currentTarget.elements.query.value;
    // console.log('на входе: ', eventsApiService.searchQuery);
    ref.currentSearchQuery = e.currentTarget.elements.query.value;
    this.clearFirstSearch(ref);
    return this.fetchAndRenderEvents(ref);
  };

  async fetchAndRenderEvents(ref) {
    spinner.spin(document.getElementById('events'));
    this.tempCountryCode = eventsApiService.countryCode; //для последующей проверки
    try {
      this.events = await eventsApiService.fetchEvents();
    } catch (error) {
      console.log('Error: request failed: ', error.message);
    }
    document.querySelector('.pagination__list').innerHTML = createPagination(queryTotalPages, pageNumber);
    // console.log('введенная страна: ', this.inputCountry.value);
    if (this.renderStoper) {
      spinner.stop(document.getElementById('events'));
      // alert('рендер остановился!');
      // this.doneBtn.classList.remove('hide-el');
      document.querySelector('.pagination').classList.add('hide-el'); // закрытие пагинации
      if (myNotify3) {
        myNotify3.close();
      };
      pushNotify3();
      return this.defaultSearchAndRender(ref);
    };

    // if (this.infiniteScrollOn === 'on') {
    //   this.endedScroll = false;
    //   window.addEventListener(
    //     'scroll',
    //     throttle(500, () => this.unlessScroll()),
    //   );
    //   //прописать закрытие пагинации
    //   this.renderEvtList(ref);
    // }

    document.querySelector('.pagination').classList.remove('hide-el'); // открытие пагинаци
    this.renderEvtList(ref);
    spinner.stop(document.getElementById('events'));
  };

  /* ===== запуск дефолтного поиска и рендера ===== */
  
  defaultSearchAndRender(ref) {
    eventsApiService.page = 0;   // передать страницу 0 в апи-сервис
    ref.pageNumber = 0; // то же в рефсы
    ref.countryCode = ' ',  // код страны обнулить в рефсах 
    eventsApiService.countryCode = ''; // код страны обнулить в апи сервисе
    this.inputCountry.value = ''; // название страны обнулить в инпуте 
    eventsApiService.searchQuery = ref.DEFAULT_QUERY;
    ref.currentSearchQuery = ref.DEFAULT_QUERY;
    this.searchForm.elements.query.value = ref.DEFAULT_QUERY;
    console.log('название страны: ', this.inputCountry.value)
    this.clearFirstSearch(ref);
    return this.fetchAndRenderEvents(ref);
  };

  renderEvtList({ tempEventsArray }) {
    this.tempRenderArrCreator();
    this.eventsList.insertAdjacentHTML(
      'beforeend',
      evtListTpl(this.tempRenderArr),
    );
    tempEventsArray.push(...this.events);
  };

  tempRenderArrCreator() {
    this.tempRenderArr.length = 0;
    for (let i = 0; i < this.events.length; i += 1) {
      let tempObj = {};
      tempObj.name = this.events[i].name;
      if(this.events[i]._embedded === undefined || this.events[i]._embedded.venues[0] === undefined || this.events[i]._embedded.venues[0].city === undefined) {
        tempObj.city = 'НЕИЗВЕСТНО';
      } else {
        tempObj.city = this.events[i]._embedded.venues[0].city.name;
      };
      if(this.events[i]._embedded === undefined || this.events[i]._embedded.venues[0] === undefined || this.events[i]._embedded.venues[0].city === undefined) {
        tempObj.location = 'НЕИЗВЕСТНО';
      } else {
        tempObj.location = this.events[i]._embedded.venues[0].name;
      };
      tempObj.id = this.events[i].id;
      tempObj.data = this.events[i].dates.start.localDate;
      tempObj.time = this.events[i].dates.start.localTime;
      // added by Yulia
      if(this.events[i]._embedded === undefined || this.events[i]._embedded.venues[0] === undefined || this.events[i]._embedded.venues[0].city === undefined) {
        tempObj.locationId = 'НЕИЗВЕСТНО';
      } else {
       tempObj.locationId = this.events[i]._embedded.venues[0].id; 
      };
      if(this.events[i]._embedded === undefined || this.events[i]._embedded.venues[0] === undefined || this.events[i]._embedded.venues[0].city === undefined) {
        tempObj.countryName = 'НЕИЗВЕСТНО';
      } else {
        tempObj.countryName = this.events[i]._embedded.venues[0].country.name;
      };
      // tempObj.time = this.events[i].dates.start.localTime.slice(0, 5); //со .slice(0, 5) может выдавать ошибку (видно на сервере не всегда корректно прописано)
      tempObj.url = this.events
        .map(item => item.images)
        .map(imgs => imgs.filter(img => img.ratio === '4_3'))
        .flat()
        .map(it => it.url)[i];

      this.tempRenderArr.push(tempObj);
    }
  };


  /* =======будет сделан ======= */
  // unlessScroll(){
  // if (this.endedScroll){
  //   return window.removeEventListener("scroll", throttle(0, () => this.unlessScroll()));
  // }
  // if(window.pageYOffset + window.innerHeight >= document.getElementById('events').offsetHeight){
  //         //загружаем новое содержимое в элемент
  //   this.fetchAndRenderEvents();
  //   eventsApiService.page += 1;
  // }
  // };

  /* = очистка при первом запросе в т.ч., когда новый вводился дополняя предыдущий = */

  clearFirstSearch(ref) {
    eventsApiService.resetPage();
    ref.tempEventsArray.length = 0;
    this.tempRenderArr.length = 0;
    this.doneBtn.classList.add('hide-el');
    this.eventsList.innerHTML = '';
    this.renderStoper = false; //может здесь и не нужно, но на всякий случай
  };

  /* ======================== очистка всего ======================== */

  resetAll(ref) {
    this.searchForm.reset();
    this.eventsList.innerHTML = '';
    eventsApiService.resetPage();
    ref.currentSearchQuery = '';
    ref.tempEventsArray.length = 0;
    this.doneBtn.classList.add('hide-el');
    //прописать закрытие пагинации
  };
  
  /* =============очистка при пагинации и при вводе ключевого слова============= */

  resetAtPaginationAndKeyWord(ref) {
    this.eventsList.innerHTML = '';
    this.tempRenderArr.length = 0;
    ref.tempEventsArray.length = 0;
    this.doneBtn.classList.add('hide-el');
  };

  /* ============= передача ключевого слова с модалки ============= */

  onKeyWord(ref) {
    eventsApiService.page = 0;   // передать страницу 0 в апи-сервис
    ref.pageNumber = 0; // то же в рефсы
    eventsApiService.searchQuery = ref.currentSearchQuery;// передать ключевое слово в апи - сервис  
    this.searchForm.elements.query.value = ref.currentSearchQuery; // перепрописать ключевое слово в инпут
    ref.countryCode = "",// код страны обнулить в рефсах
    eventsApiService.countryCode = ''; // код страны обнулить в апи сервисе
    this.inputCountry.value = ''; // название страны обнулить в инпуте 
  };

  /* =====контроль ввода латинских букв===== */

  controlKeyUp(e) {
    if (/[^A-Za-z ]/.test(e.currentTarget.elements.query.value[e.currentTarget.elements.query.value.length - 1],)) {
      if (myNotify1) {
        myNotify1.close();
      };
      pushNotify1();
    };
    e.currentTarget.elements.query.value = e.currentTarget.elements.query.value.replace(/[^A-Za-z ]/g, '');
  };

  /* =====создатель слушателей событий===== */

  eventsListCreator(ref) {
    this.searchForm.addEventListener('input', e => renderService.controlKeyUp(e));
    this.searchForm.addEventListener('submit', e => renderService.onSearch(e, ref),);
    this.doneBtn.addEventListener('click', () => {
      this.resetAll(ref);
      this.defaultSearchAndRender(ref);
    });
    document.querySelector('.js-logo-link').addEventListener('click', () => this.defaultSearchAndRender(ref))
  };

  /* ======инициализация при запуске приложения====== */

  initialAtStartup(ref) {
    this.eventsListCreator(ref);
    this.fetchAndRenderEvents(ref);
    this.searchForm.elements.query.value = ref.DEFAULT_QUERY;
  };
};
export const renderService = new RenderService();