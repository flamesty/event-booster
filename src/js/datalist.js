import datalistTemplate from '../templates/datalistTemplate.hbs';
import { refsGen } from '../js/refs';

const countries = [
  { code: "AD", name: "Andorra" },
  { code: "AI", name: "Anguilla" },
  { code: "AR", name: "Argentina" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BB", name: "Barbados" },
  { code: "BE", name: "Belgium" },
  { code: "BM", name: "Bermuda" },
  { code: "BR", name: "Brazil" },
  { code: "BG", name: "Bulgaria" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EE", name: "Estonia" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GB", name: "Great Britain" },
  { code: "GR", name: "Greece" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MY", name: "Malaysia" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "MC", name: "Monaco" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "NL", name: "Netherlands" },
  { code: "AN", name: "Netherlands Antilles" },
  { code: "NZ", name: "New Zealand" },
  { code: "ND", name: "Northern Ireland" },
  { code: "NO", name: "Norway" },
  { code: "PE", name: "Peru" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "LC", name: "Saint Lucia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "US", name: "United States Of America" },
  { code: "UY", name: "Uruguay" },
  { code: "VE", name: "Venezuela" },
];

const refInput = document.querySelector(".input-country");
const refDatalist = document.querySelector(".datalist-country");
const refItemDatalist = refDatalist.children;
let contentInput = refInput.value;



refInput.addEventListener('keyup', doKeyAction)
// refInput.addEventListener('blur', canCloseList)
refDatalist.addEventListener('keyup', doKeyAction)
refInput.addEventListener("input", doFilter);
refInput.addEventListener("focus", openList);
refDatalist.addEventListener("click", doСountryClick);
// refDatalist.addEventListener("dblclick", makeChoice);

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
    }
}

function makeChoice(whichOption) {
    // doFilter()
    let datalistLength = []
    let datalistName = []
    console.log(whichOption)
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
        refInput.blur()
    }
    if (whichOption.dataset.code !== undefined) {
        refInput.value = whichOption.innerText;
        refsGen.countryCode = whichOption.dataset.code;
        closeList()
        refInput.blur()
    }
}

function openList() {
    refDatalist.classList.remove("hidden-list");
    refInput.value = "";
    refInput.style.borderRadius = "20px 20px 0 0";
     for (let each of refItemDatalist) {
            each.style.display=""
    };
}

function closeList() {
    refDatalist.classList.add("hidden-list")
    refInput.style.borderRadius = "20px";
}

// function canCloseList() {
//     if (document.activeElement !== refDatalist) {
//         closeList()
//     }
// }

function toggleListUp(focusPoint) {
    if (focusPoint.previousElementSibling === null) {
        refInput.focus()
    } else {focusPoint.previousElementSibling.focus()
    }
}
function toggleListDown(focusPoint) {
    if (focusPoint.classList.contains("input")) {
        for (let i = 0; i < refItemDatalist.length; i += 1) {
            if (refItemDatalist[i].style.display !== "none") {
                refItemDatalist[i].focus()
                return
            }
        }
    } else {
        console.log("начинаю искать)")
        focusPoint.nextElementSibling.focus()
    }
    //     while (focusPoint.nextElementSibling !== null && focusPoint.nextElementSibling.style.display === "none") {
    //         focusPoint = focusPoint.nextElementSibling
    // } 
}

function doFilter() {
    contentInput = refInput.value;
    for (let each of refItemDatalist) {
            each.style.display=""
    }
    let aFilteredOptions = []
    for (let each of refItemDatalist) {
        if (!each.innerText.toUpperCase().includes(contentInput.toUpperCase())) {
            
            each.style.display = "none"
        } else { aFilteredOptions.push(each)}
    }

}


function doСountryClick(e) {
    refInput.value = e.target.innerText;
    refsGen.countryCode = e.target.dataset.code;
        closeList()
        refInput.blur()
    // refInput.value = e.target.innerText;
}



// function updateStatus(howMany) {
//     csStatus.textContent = howMany + " options available."
// }
// csSelector.setAttribute('role', 'combobox') 
// csSelector.setAttribute('aria-haspopup', 'listbox')
// csSelector.setAttribute('aria-owns', '#list') 
// refInput.setAttribute('aria-autocomplete', 'both')
// refInput.setAttribute('aria-controls', 'list')


