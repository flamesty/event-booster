const rr = {
    modalTeam: document.querySelector('.students-team'),
    teamModal: document.querySelector('.team-modal'),
    teamCards: document.querySelectorAll('.team-img-card'),
    closeBtn: document.querySelector('.team-close-btn'),
    overlayTeam: document.querySelector('.team-modal-overlay'),

};
rr.modalTeam.addEventListener('click', openTeamModal);

rr.closeBtn.addEventListener('click', closeTeamModal);
rr.overlayTeam.addEventListener('click', e => onOverlay(e));

function openTeamModal() {   
    rr.teamModal.classList.add('is-open');
    rr.teamCards.forEach(el => el.classList.add('slide-team'));
    stopScroll();
};

function closeTeamModal() {
    rr.teamModal.classList.remove('is-open');
    rr.teamCards.forEach(el => el.classList.remove('slide-team'));
    startScroll();
};

function onOverlay(e) {
    if (e.target === e.currentTarget) {
        closeTeamModal()
    }
};

/* ============остановка скролла под модальным окном============ */

function stopScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100wh";
};

/* =========запуск скролла после закрытия модального окна========= */

function startScroll() {
    document.body.style.overflow = "auto"; 
    document.body.style.height = "auto";
};