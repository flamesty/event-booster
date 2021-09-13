import { throttle } from '../../node_modules/throttle-debounce';
import { eventsApiService } from './api-event-service';
import evtListTpl from '../templates/events-list.hbs';

class RenderService {
    constructor() {
        this.events;
        this.eventsList = document.querySelector('.events-list');
        this.tempRenderArr = [];
    }
    async fetchAndRenderEvents() {    
    try {
        this.events = await eventsApiService.fetchEvents();
        console.log('массив объектов, получаемый с сервера - renderService.events: ', this.events)
    }
    catch (error) {
        console.log('Error: request failed');
    };
    this.tempRenderArrCreator();
        this.renderEvtList();
    };
    renderEvtList() {
        this.eventsList.insertAdjacentHTML('beforeend', evtListTpl(this.tempRenderArr));
    };
    tempRenderArrCreator() {
        for (let i = 0; i < this.events.length; i += 1) {
            let tempObj = {};
            tempObj.name = this.events[i].name;
            tempObj.data = this.events[i].dates.start.localDate;
            tempObj.time = this.events[i].dates.start.localTime.slice(0, 5);
            tempObj.url = this.events.map(item => item.images).map(imgs => imgs.filter(img => img.ratio === '4_3')).flat().map(it => it.url)[i];
            this.tempRenderArr.push(tempObj);
        }
    };
};
export const renderService = new RenderService;
