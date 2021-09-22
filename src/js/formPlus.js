const refBtnOpenMenu = document.querySelector('.checkbox-open-menu')
const refFormSort = document.querySelector('.form-sort')

refBtnOpenMenu.addEventListener("click", openMenu);

function openMenu() {
    refFormSort.classList.toggle("hidden-visually")

}