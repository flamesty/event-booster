import { throttle } from '../../node_modules/throttle-debounce';

class ToTop {
    constructor() {
        this.markupString = '<button type="button" class="btn-gen opacity-btn fix-top-btn hide-el" data-action="to-top"><span class="material-icons">arrow_upward</span>to TOP</button>';
        this.toTopBtn;
    };

    createBtnAndEvnListeners() {
        document.querySelector('script').insertAdjacentHTML("beforebegin", this.markupString);
        this.toTopBtn = document.querySelector('[data-action="to-top"]');
        this.createAddEvtListenerBtn();
    };

    createAddEvtListenerBtn() {
        window.addEventListener('scroll', throttle(500, e => this.scrollWatch()));
        this.toTopBtn.addEventListener('click', () => this.toTop());
    };

    toTop() {
        document.querySelector('body').scrollIntoView({block: "start", behavior: "smooth"});
    };
    
    scrollWatch() {
        let scroll_position = window.scrollY;
        scroll_position > 140?
            this.toTopBtn.classList.remove('hide-el') :
            this.toTopBtn.classList.add('hide-el');
    };
};

export const toTop = new ToTop;