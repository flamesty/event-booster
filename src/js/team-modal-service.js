class TeamModalService {
    constructor() {
        this.modalTeam = document.querySelector('.students-team');
        this.closeBtn = document.querySelector('.team-close-btn');
        this.overlayTeam = document.querySelector('.team-modal-overlay');
    };

    openTeamModal() {
        
        document.querySelectorAll('.team-img-card').forEach(el => el.classList.add('slide-team'));
        document.querySelector('.team-modal').classList.add('is-open');
        document.body.style.overflow = "hidden";
        document.body.style.height = "100wh";
    };  

    closeTeamModal() {
        document.querySelector('.team-modal').classList.remove('is-open');
        document.querySelectorAll('.team-img-card').forEach(el => el.classList.remove('slide-team'));
        document.body.style.overflow = "auto"; 
        document.body.style.height = "auto";
    };

    onOverlay(e) {
            if (e.target === e.currentTarget) {
                this.closeTeamModal();
            };
        };
    eventListenerCreator() {
        this.modalTeam.addEventListener('click', this.openTeamModal);
        this.closeBtn.addEventListener('click', this.closeTeamModal);
        this.overlayTeam.addEventListener('click', e => this.onOverlay(e)); 
    };

};
    
export const teamModalService = new TeamModalService;
