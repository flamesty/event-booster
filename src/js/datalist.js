import datalistTemplate from '../templates/datalistTemplate.hbs';
import { refsGen } from '../js/refs';
import { countries } from './renderCountries'


const refInput = document.querySelector(".input-country");
const refDatalist = document.querySelector(".datalist-country");
const refItemDatalist = refDatalist.children;
let contentInput = refInput.value;


refInput.addEventListener('keyup', doKeyAction)
refDatalist.addEventListener('keyup', doKeyAction)
refInput.addEventListener("input", doFilter);
refInput.addEventListener("focus", openList);
refDatalist.addEventListener("click", doСountryClick);

function renderDatalistMarkup(data) {
    const datalistMarkup = data.map(datalistTemplate).join('');
    refDatalist.innerHTML = datalistMarkup;
};
renderDatalistMarkup(countries);

function doKeyAction(whichKey) {
    const focusPoint = document.activeElement
  switch(whichKey.key) {
    //   case 'ArrowDown':
        //   toggleListDown(focusPoint)
        //   moveFocus(focusPoint, 'forward')
        //   break;
    //   case 'ArrowUp':
        //   toggleListUp(focusPoint)
        //   moveFocus(focusPoint, 'back')
        //   break;
      case 'Enter':
          makeChoice(focusPoint)
        //   toggleList('Shut')
        //   setState('closed')
          break;
      case 'Escape':
          closeList()
          break;
    }
}

function makeChoice(whichOption) {
    let datalistLength = []
    let datalistName = []
    for (let i = 0; i < refItemDatalist.length; i += 1) {
        if (refItemDatalist[i].innerText.toUpperCase().includes(contentInput.toUpperCase())) {
            datalistLength.push(refItemDatalist[i].dataset.code)
            datalistName.push(refItemDatalist[i].innerText)
        }
    }
    if (datalistLength.length === 1) {
        refInput.value = datalistName[0];
        refsGen.countryCode = datalistLength[0];
        closeList()
    }
    if (whichOption.dataset.code !== undefined) {
        refInput.value = whichOption.innerText;
        refsGen.countryCode = whichOption.dataset.code;
        closeList()
    }
    
}

function openList() {
    refDatalist.classList.remove("hidden-list");
    refInput.value = "";
    refInput.style.borderRadius = "20px 20px 0 0";
    displayItemsList()
}

function closeList() {
    refDatalist.classList.add("hidden-list")
    refInput.style.borderRadius = "20px";
    refInput.blur();
}

// function canCloseList() {
//     if (document.activeElement !== refDatalist) {
//         closeList()
//     }
// }
// function toggleListUp(focusPoint) {
//     if (focusPoint.previousElementSibling === null) {
//         refInput.focus()
//     } else {focusPoint.previousElementSibling.focus()
//     }
// }
// function toggleListDown(focusPoint) {
//     if (focusPoint.classList.contains("input")) {
//         for (let i = 0; i < refItemDatalist.length; i += 1) {
//             if (refItemDatalist[i].style.display !== "none") {
//                 refItemDatalist[i].focus()
//                 return
//             }
//         }
//     } else {
//         focusPoint.nextElementSibling.focus()
//     }
// }

function doFilter() {
    contentInput = refInput.value;
    displayItemsList()
    let aFilteredOptions = []
    for (let each of refItemDatalist) {
        if (!each.innerText.toUpperCase().includes(contentInput.toUpperCase())) {
            each.style.display = "none"
        } else { aFilteredOptions.push(each)}
    }
}

function displayItemsList() {
    for (let each of refItemDatalist) {
            each.style.display=""
    }
}

function doСountryClick(e) {
    refInput.value = e.target.innerText;
    refsGen.countryCode = e.target.dataset.code;
    closeList()
}


// function updateStatus(howMany) {csStatus.textContent = howMany + " options available."}
// csSelector.setAttribute('role', 'combobox') 
// csSelector.setAttribute('aria-haspopup', 'listbox')
// csSelector.setAttribute('aria-owns', '#list') 
// refInput.setAttribute('aria-autocomplete', 'both')
// refInput.setAttribute('aria-controls', 'list')


