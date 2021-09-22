
import { refsGen } from '../js/refs';

const refBtnOpenMenu = document.querySelector('.checkbox-open-menu')
const refFormSort = document.querySelector('.form')
const refSelectSort = document.querySelector('.select-sort')
const refSelectScroll = document.querySelector('.select-scroll')

refBtnOpenMenu.addEventListener("click", openMenu);
refSelectSort.addEventListener("change", changeValueSort);
refSelectScroll.addEventListener("change", changeValueScroll);

function openMenu() {
    refFormSort.classList.toggle("hidden-visually")

}


function changeValueSort(e) {
    let n = refSelectSort.options.selectedIndex
    refsGen.sortType = refSelectSort.options[n].value
}

function changeValueScroll(e) {
    let n = refSelectScroll.options.selectedIndex
    if (refSelectScroll.options[n].value === "true") {
        refsGen.UNLESS_SCROLL = true
    } else {
        refsGen.UNLESS_SCROLL = false
    }
    console.log(refsGen.UNLESS_SCROLL)
}