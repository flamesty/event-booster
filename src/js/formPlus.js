
import { refsGen } from '../js/refs';

const refBtnOpenMenu = document.querySelector('.checkbox-open-menu')
const refFormSort = document.querySelector('.form')
const refSelectSort = document.querySelector('.select-sort')
const refSelectScroll = document.querySelector('.select-scroll')

refBtnOpenMenu.addEventListener("click", openMenu);
refSelectSort.addEventListener("change", changeValueSort);
refSelectScroll.addEventListener("change", changeValueScroll);

function openMenu() {
    if (refBtnOpenMenu.checked === true) {
        refFormSort.classList.remove("hidden-visually")
        document.querySelector('.container-hero').classList.add("container-hero-big")
    } else {
        refFormSort.classList.add("hidden-visually")
        document.querySelector('.container-hero').classList.remove("container-hero-big")
    }
    


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
}
