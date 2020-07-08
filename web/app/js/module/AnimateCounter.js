import anime from 'animejs/lib/anime.es.js';

/**
 * AnimateCounter
 */
export default class AnimateCounter {
    /**
     * @constructor
     * @param {string} selector
     */
    constructor(selector) {
        this.target = document.querySelector(selector);
    }

    /**
     * start
     * @param {number} count
     */
    start(count) {
        this._setup();
        this._animate(count);
    }

    /**
     * setup
     */
    _setup() {
        if (this.anime) {
            this.anime.pause();
        }

        this.progress = parseInt(this.target.textContent, 10);
    }

    /**
     * animate
     * @param {number} count
     */
    _animate(count) {
        this.anime = anime({
            duration: 200,
            easing: 'linear',
            update: (anim) => {
                this.progress += Math.ceil((count - this.progress) * (anim.progress / 100));

                this.target.textContent = this.progress.toLocaleString();
            },
        });
    }
}
