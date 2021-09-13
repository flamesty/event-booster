import axios from '../../node_modules/axios';

class EventsApiService {
    constructor() {
        this.searchQuery = 'music';
        this.KEY = 'MkxNTXYXUEQRlh118nYnjnST38862gPB';
        this.BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
        this.countryCode = '';
        this.page = 0;
        this.tempEventsArray = [];
    }

    /* вариант используя async-away + axios + try-catch, который применен в ф-ции fetchAndRender*/
    
    async fetchEvents(gameOver) {
        const url = `${this.BASE_URL}events.json?keyword=${this.searchQuery}&countryCode=${this.countryCode}&size=24&number=3&page=${this.page}&apikey=${this.KEY}`;
        const response = await axios.get(url);
        if (response.data._embedded === undefined || response.data._embedded.events.length === 0) {
            // console.log('повна дупа!')
            return gameOver
        }
        let result = response.data._embedded.events;
        // console.log(result);
        this.tempEventsArray.push(...result);
        this.incrementPage();
//адреса карточек 4_3
        // console.log(
        //     result
        //         .map(item => item.images)
        //         .map(imgs => imgs.filter(img => img.ratio === '4_3'))
        //         .flat().map(it => it.url)
        // );
//получение ссылки на покупку билетов
        // console.log(result[5].products[0].url)
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