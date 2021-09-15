import './sass/main.scss';
import './js/pagination.js';
import './js/modal.js';
import { refsGen } from './js/refs';
import { renderService } from './js/search-render-service';
renderService.fetchAndRenderEvents(refsGen);
import { toTop } from './js/to-top-btn';
toTop.createBtnAndEvnListeners();





console.log('массив всех объектов-событий, полученых с сервера и отрендереных на экране: refs.tempEventsArray ', refsGen.tempEventsArray);

console.log("Привіт, світ!))) Життя ДУЖЕ брутальне!(((");