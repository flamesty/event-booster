import axios from '../../node_modules/axios';
import { refsGen } from './refs';
import { renderService } from './search-render-service';

class EventsApiService {
    constructor() {
        this.searchQuery = 'rock and roll';
        this.KEY = 'UpgHSJqZ1Y8ozVdUGkbpn88huHj46iS1';
        this.BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
        this.countryCode = '';
        this.page = 0;
    }

    /* вариант используя async-away + axios + try-catch, который применен в ф-ции fetchAndRenderEvents*/
    
    async fetchEvents() {
        const url = `${this.BASE_URL}events.json?keyword=${this.searchQuery}&countryCode=${this.countryCode}&size=24&number=3&page=${this.page}&apikey=${this.KEY}`;
        renderService.renderStoper = 0;
        console.log('ищу: ',this.searchQuery )
        const response = await axios.get(url);
        // console.log('response: ',response);
        if (response.data._embedded === undefined || response.data._embedded.events.length === 0 || response.data.page.totalPages === 0) {
            renderService.renderStoper = true;
            alert('а нифига не найдено!!!!')
            return
        }
        refsGen.totalPages = response.data.page.totalPages;
        console.log('refsGen.totalPages: ',refsGen.totalPages);
        this.incrementPage();
        return response.data._embedded.events;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 0;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    
};

export const eventsApiService = new EventsApiService;
