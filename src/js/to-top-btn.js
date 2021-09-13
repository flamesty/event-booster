import { throttle } from '../../node_modules/throttle-debounce';

class ToTop {
    constructor() {
        this.markupString = '<button type="button" class="btn-gen opacity-btn fix-top-btn hide-el" data-action="to-top"><span class="material-icons">arrow_upward</span>to TOP</button>';
        // this.markupString = '<div class="modal js-modal"><div div class="modal__overlay"></div ><div class="modal__content"><div class="img-card"><img src="" alt="" class="img-card__image"/></div></div><button type="button" class="modal__button" data-action="close-modal"></button></div > ';
        this.toTopBtn;
    };

    createBtnAndEvnListeners() {
        document.querySelector('script').insertAdjacentHTML("beforebegin", this.markupString);
        this.toTopBtn = document.querySelector('[data-action="to-top"]');
        // this.modal = document.querySelector('.js-modal');
        // this.modalContent = document.querySelector('.modal__content');
        // this.modalCloser = document.querySelector('button[data-action="close-modal"]');
        // this.modalOverlay = document.querySelector('.modal__overlay');
        // this.modalImage = document.querySelector('.img-card__image');
        // this.listeningEl = document.querySelector(`.${listeningElClass}`)
        this.createAddEvtListenerBtn();
    };

    createAddEvtListenerBtn() {
        window.addEventListener('scroll', throttle(500, e => this.scrollWatch()));
        this.toTopBtn.addEventListener('click', () => this.toTop());
        // this.modalImage.addEventListener('click', e => this.onModalImageTurn(e));
        // this.modalCloser.addEventListener('click', () => this.closeModalOn());
        // this.modalOverlay.addEventListener('click', e => this.onCloseModalOverlay(e));
        // window.addEventListener('keydown', e => this.onKeyPress(e));
        // this.listeningEl.addEventListener('click', e => this.openModalClick(e));
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