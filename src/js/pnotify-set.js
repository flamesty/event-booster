import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/Angeler.css';
import { defaults } from '@pnotify/core';
defaults.closerHover = false;
defaults.styling = 'angeler';
defaults.icons = 'angeler';

export const pN = {
  basicSet: {
    title: 'No Sticky Button Notice',
    hide: false,
    sticker: false,
    shadow: true,
    animation: 'fade',
    animateSpeed: 'fast',
  },
  controlA_Z: {
    TITLE: 'WRONG ENTER',
    TEXT: 'Use only \"a-z\" \"A-Z\"!',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  controlInput: {
    TITLE: 'CONTROL INPUT',
    TEXT: 'Such request is completed. Change request!',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  emptyRequest: {
    TITLE: 'CONTROL INPUT',
    TEXT: 'Input is empty. Enter something!',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  setCreator: function (setData) {
    this.basicSet.title = setData.TITLE;
    this.basicSet.text = setData.TEXT;
    this.basicSet.addClass = setData.ADD__CLASS;
    return this.basicSet;
  }
};

function openModalPn() {
    document.querySelector('script').insertAdjacentHTML("beforebegin", '<div class="pnotify-overlay"></div>');
    let closerPn = document.querySelector('.pnotify-closer');
    closerPn.addEventListener('click', e => {
      document.querySelector('.pnotify-overlay').remove();
      // input.disabled = false;
      document.body.style.overflow = "auto"; // запуск скролла после закрытия модального окна
      document.body.style.height = "auto"; // запуск скролла после закрытия модального окна
    })
    // input.disabled = true;
    document.body.style.overflow = "hidden"; // остановка скролла под модальным окном
    document.body.style.height = "100wh"; // остановка скролла под модальным окном
};

export function onPnNotice(setData) {
  notice(pN.setCreator(setData));
  openModalPn();
}

export function onPnError(setData) {
  error(pN.setCreator(setData));
  openModalPn();
}


//импорт (путь указывать по месту)
// import {onPnNotice, onPnError, pN } from './js/pnotify-set'

//запуск - пример:(emptyRequest) - выбирать что надо
// onPnNotice(pN.emptyRequest)
// onPnError(pN.emptyRequest)