import {onPnNotice, onPnError, pN } from './pnotify-set'


/* =====контроль ввода латинских букв===== */

export function controlKeyUp(input) {
  if (/[^A-Za-z]/.test(input.value[input.value.length - 1])) {
      pNot.noticePn(pNot.setCreator(pNot.controlInput));
      onPnNotice(pN.controlA_Z);
  } 
  input.value = input.value.replace(/[^A-Za-z]/g, ''); 
};