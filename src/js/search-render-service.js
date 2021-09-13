import { throttle } from '../../node_modules/throttle-debounce';
import { eventsApiService } from './api-event-service';
import evtListTpl from '../templates/events-list.hbs';

class RenderService {
    constructor() {
        this.events;
        this.eventsList = document.querySelector('.events-list');
        this.tempRenderArr = [];
        this.infiniteScrollOn = 'off';
        this.endedScroll = false;
    };


    // onSearch(e, ref, pNot) {

    //     e.preventDefault();
        
    //     if (e.currentTarget.elements.query.value === '') {
    //         // return alert('Введи что-то нормальное');
    //         pNot.noticePn(pNot.setCreator(pNot.emptyRequest));
    //         openModalPn(ref);
    //         return resetAll(ref) 
    //     }

    //     if (e.currentTarget.elements.query.value === ref.currentSearchQuery) {
    //         // return alert('такое уже есть');
    //         pNot.noticePn(pNot.setCreator(pNot.controlInput));
    //         return openModalPn(ref);
    //     }
        
    //     imagesApiService.query = e.currentTarget.elements.query.value;
    //     ref.currentSearchQuery = e.currentTarget.elements.query.value;
    //     clearFirstSearch(ref)
    //     return fetchAndRenderImages(ref, pNot);
    // };






    async fetchAndRenderEvents(ref) {    
    try {
        this.events = await eventsApiService.fetchEvents();
    }
    catch (error) {
        console.log('Error: request failed');
        };

        if (eventsApiService.searchResult === 'nothing') {
            this.clearIfAllDone();
            // return alert('Введи что-то нормальное');
        }
        
    if (this.infiniteScrollOn === 'on') {
        this.endedScroll = false;
        window.addEventListener("scroll", throttle(500, () => this.unlessScroll()));
        this.renderEvtList(ref);  
        };

     this.renderEvtList(ref);   
    };

    renderEvtList({tempEventsArray}) {
        this.tempRenderArrCreator();
        this.eventsList.insertAdjacentHTML('beforeend', evtListTpl(this.tempRenderArr));
        tempEventsArray.push(...this.tempRenderArr);
    };

    tempRenderArrCreator() {
        for (let i = 0; i < this.events.length; i += 1) {
            let tempObj = {};
            tempObj.name = this.events[i].name;
            tempObj.city = this.events[i]._embedded.venues[0].city.name;
            tempObj.location = this.events[i]._embedded.venues[0].name;
            tempObj.id = this.events[i].id;
            tempObj.data = this.events[i].dates.start.localDate;
            tempObj.time = this.events[i].dates.start.localTime.slice(0, 5);
            tempObj.url = this.events
                .map(item => item.images)
                .map(imgs => imgs.filter(img => img.ratio === '4_3'))
                .flat()
                .map(it => it.url)[i];
            
            this.tempRenderArr.push(tempObj);
        }
        // console.log(this.tempRenderArr);
    };

    unlessScroll(){
    if (this.endedScroll){
      return window.removeEventListener("scroll", throttle(500, () => this.unlessScroll()));
    }
    if(window.pageYOffset + window.innerHeight >= document.getElementById('unless-scroll').offsetHeight){
            //загружаем новое содержимое в элемент
      this.fetchAndRenderEvents();
      eventsApiService.page += 1;
    }
    };

    /* = очистка при первом запросе в т.ч., когда новый вводился дополняя предыдущий = */

    // clearFirstSearch(ref) {
    //     imagesApiService.resetPage();
    //     ref.tempImgURLs = [];
    //     ref.optionBox.classList.add('hide-el');
    //     clearImgList(ref);
    //     loadMoreBtn.hide();
    // };

/* = очистка, когда все запросы выполнены = */

    clearIfAllDone() {
        this.endedScroll = true;
        // ref.doneBtn.classList.remove('hide-el');
        document.querySelector('.result-section').scrollIntoView({block: "end", behavior: "smooth"});
    };

/* ======================== очистка всего ======================== */

    // resetAll(ref) {
    //     loadMoreBtn.hide();
    //     ref.searchForm.reset();
    //     clearImgList(ref);
    //     imagesApiService.resetPage();
    //     ref.currentSearchQuery = '';
    //     ref.tempImgURLs = [];
    //     ref.optionBox.classList.remove('hide-el');
    //     ref.doneBtn.classList.add('hide-el');
    // };

};
export const renderService = new RenderService;
