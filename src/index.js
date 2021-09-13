import './sass/main.scss';
import './js/pagination.js';
import './js/modal.js';
import { refs } from './js/refs';
import { Spinner } from 'spin.js';
import { renderService } from './js/search-render-service';
renderService.fetchAndRenderEvents(refs);
import { toTop } from './js/to-top-btn';
toTop.createBtnAndEvnListeners();

// настройки спиннера
var opts = {
  lines: 13, // The number of lines to draw
  length: 25, // The length of each line
  width: 12, // The line thickness
  radius: 25, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#dc56c5', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};
var spinner = new Spinner(opts);



console.log('массив всех объектов-событий, полученых с сервера и отрендереных на экране: refs.tempEventsArray ', refs.tempEventsArray);

console.log("Привіт, світ!))) Життя ДУЖЕ брутальне!(((");