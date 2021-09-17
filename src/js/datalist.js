import datalistTemplate from '../templates/datalistTemplate.hbs';
import { refsGen } from '../js/refs';
import { countries } from './renderCountries';
import { renderService } from './search-render-service';

const refInputSearch = document.querySelector(".input-search");
const refInput = document.querySelector(".input-country");
const refDatalist = document.querySelector(".datalist-country");
const submit = document.querySelector('.search-form');
let aFilteredOptions = [];

window.addEventListener('keyup', doKeyAction);
window.addEventListener("click", doMouseClick);
refInput.addEventListener("input", doFilter);
refInput.addEventListener("focus", openList);

function renderDatalistMarkup(data) {
    const datalistMarkup = data.map(datalistTemplate).join('');
    refDatalist.innerHTML = datalistMarkup;
};
renderDatalistMarkup(countries);

if (localStorage['CountryForBooster'] !== undefined) {
    refInput.value = localStorage['CountryForBooster'];
    refsGen.countryCode = localStorage['CountryCodeForBooster'];
}

for (let each of refDatalist.children) {
         aFilteredOptions.push(each)
    }

function doKeyAction(whichKey) {
    const focusPoint = document.activeElement
  switch(whichKey.key) {
    //   case 'ArrowDown':
        //   toggleListDown(focusPoint)
        //   break;
    //   case 'ArrowUp':
        //   toggleListUp(focusPoint)
        //   break;
      case 'Enter':
          selectOption()
          break;
      case 'Escape':
          closeList()
          break;
    }
}

function doMouseClick(e) {
    const clickPoint = document.activeElement
    if (clickPoint.nodeName !== undefined) {
          if (clickPoint.nodeName === 'INPUT') {
              if (clickPoint.classList.contains("input-search")) {
              closeList()
            }
              clickPoint.focus()
        } else {
            if (clickPoint.nodeName === 'LI') {
                doOptionClick(e)
            } else {
                closeList()
            }
        }
    }
}

function selectOption() {
    if (aFilteredOptions.length === 1) {
        acceptСhoice(aFilteredOptions[0])
    } else {
        if (aFilteredOptions.length !== 0 && document.activeElement.nodeName === "LI") {
            acceptСhoice(document.activeElement)
        }
    } 
}

function openList() {
    refDatalist.classList.remove("hidden-list");
    refInput.value = "";
    refInput.style.borderRadius = "20px 20px 0 0";
    displayItems()
}

function closeList() {
    refDatalist.classList.add("hidden-list")
    refInput.style.borderRadius = "20px";
    refInputSearch.focus()
}


// function toggleListUp(focusPoint) {
//     if (focusPoint.previousElementSibling === null) {
//         refInput.focus()
//     } else {focusPoint.previousElementSibling.focus()
//     }
// }
// function toggleListDown(focusPoint) {
//     if (focusPoint.classList.contains("input")) {
//         for (let i = 0; i < refDatalist.children.length; i += 1) {
//             if (refDatalist.children[i].style.display !== "none") {
//                 refDatalist.children[i].focus()
//                 return
//             }
//         }
//     } else {
//         focusPoint.nextElementSibling.focus()
//     }
// }


function doFilter() {
    displayItems()
    aFilteredOptions = []
    for (let each of refDatalist.children) {
        if (!each.innerText.toUpperCase().includes(refInput.value.toUpperCase())) {
            each.style.display = "none"
        } else { aFilteredOptions.push(each)}
    }
}

function displayItems() {
    for (let each of refDatalist.children) {
            each.style.display=""
    }
}

function doOptionClick(e) {
    acceptСhoice(e.target)
}

function acceptСhoice(el) {
    refInput.value = el.innerText;
    refsGen.countryCode = el.dataset.code;
    closeList()
    document.querySelector('.btn-search').click();
    localStorage.setItem('CountryForBooster', el.innerText);
    localStorage.setItem('CountryCodeForBooster', el.dataset.code);
}

// csSelector.setAttribute('role', 'combobox') 
// csSelector.setAttribute('aria-haspopup', 'listbox')
// csSelector.setAttribute('aria-owns', '#list') 
// refInput.setAttribute('aria-autocomplete', 'both')
// refInput.setAttribute('aria-controls', 'list')


