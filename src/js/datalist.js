

function doKeyAction(whichKey) {
  const focusPoint = document.activeElement
  switch(whichKey) {
      case 'ArrowDown':
          toggleList('Open')
          moveFocus(focusPoint, 'forward')
          break;
      case 'ArrowUp':
          toggleList('Open')
          moveFocus(focusPoint, 'back')
          break;
      case 'Enter':
          makeChoice(focusPoint)
          toggleList('Shut')
          setState('closed')
          break;
  }
}

csInput = document.querySelector(".input-country");
// console.log(csInput)

function makeChoice(whichOption) {
    const optionText = whichOption.documentQuerySelector('strong')
    csInput.value = optionText
}

options = ["Ukraine", "USE", "Uganda", "Canada"]
csOptions = document.querySelector(".country-datalist");
console.log(csOptions.innerText)


function doFilter() {
    const terms = csInput.value;
    const aFilteredOptions = options.filter(
        option => {
        if (option.toUpperCase().startsWith(terms.toUpperCase())) {
            return true
        } else {option.style.display = "none"}
        }
    )
    aFilteredOptions.map(inner)
    // hide all options
    // csOptions.forEach(option => option.style.display = "none")
    // re-show the options which match our terms
    // aFilteredOptions.forEach(function(option) {
        // option.style.display = ""
    // })
    // updateStatus(aFilteredOptions.length)
}

csInput.addEventListener("input", doFilter);

// function updateStatus(howMany) {
    //     console.log('updating status')
//     csStatus.textContent = howMany + " options available."
// }

// csSelector.setAttribute('role', 'combobox') 
// csSelector.setAttribute('aria-haspopup', 'listbox')
// csSelector.setAttribute('aria-owns', '#list') 
// csInput.setAttribute('aria-autocomplete', 'both')
// csInput.setAttribute('aria-controls', 'list')
