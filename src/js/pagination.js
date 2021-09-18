import { refsGen } from './refs';
import { renderService } from './search-render-service';
import { eventsApiService } from './api-event-service';

const element = document.querySelector(".pagination__list");

export function createPagination(totalPages, page){
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if(page > 2){ 
    liTag += `<li class="first numb"><span>1</span></li>`;
    if(page > 3){ 
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page === 1) {
    afterPage += 3;
  } else if (page === 2) {
    afterPage += 1;
  }

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { 
      continue;
    }
    if (plength === 0) { 
      plength += 1;
    }
    if(page === plength){ 
      active = "active";
    } else { 
      active = "";
    }
    liTag += `<li class="numb ${active}"><span>${plength}</span></li>`;
  }

  if(page < totalPages - 1){ 
    if(page < totalPages - 2){ 
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb"><span>${totalPages}</span></li>`;
  }

  element.innerHTML = liTag; 
  return liTag; 
};


element.addEventListener('click', e => onClickPagination(e, refsGen));

function onClickPagination(e, ref) {
  eventsApiService.page = Number(e.target.textContent) - 1;
  renderService.resetAtPaginationAndKeyWord(ref);
  return renderService.fetchAndRenderEvents(ref);
};