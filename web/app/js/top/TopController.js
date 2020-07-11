import AnimateCounter from '../module/AnimateCounter';
import API from '../const/API.json';
import ApiClient from '../module/ApiClient';
import Indeterminate from '../module/Indeterminate';
import NestedCheckbox from '../module/nestedCheckbox';
import Restorer from '../module/Restorer';
import UrlParameter from '../module/UrlParameter';
import Submit from '../module/Submit';

const SELECTOR = {
    ROOT: '#j-nestedCheckbox',
    SEARCH_RESULT: '#j-searchResult',
    INDETERMINATE: '#j-indeterminate',
    // 上の階層から定義する
    NESTED: [
        {
            GROUP: '.j-nestedCheckbox__group--layer1',
            TRIGGER: '.j-nestedCheckbox__trigger--layer1',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer2',
            TRIGGER: '.j-nestedCheckbox__trigger--layer2',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer3',
            TRIGGER: '.j-nestedCheckbox__trigger--layer3',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer4',
            TRIGGER: '.j-nestedCheckbox__trigger--layer4',
        },
    ],
    STATE: {
        INDETERMINATE: 'is-indeterminateEnabled',
    },
};

/**
 * TopController
 */
class TopController {
    /**
     * @constructor
     */
    constructor() {
        const root = document.querySelector(SELECTOR.ROOT);
        const urlParameter = new UrlParameter();

        this.indeterminate = new Indeterminate(
            root,
            root.querySelector(SELECTOR.INDETERMINATE),
            SELECTOR.STATE.INDETERMINATE
        );
        this.nestedCheckbox = new NestedCheckbox(root, SELECTOR.NESTED);
        this.restorer = new Restorer(root, urlParameter.getParameter());
        this.searchApiClient = new ApiClient(API.SEARCH);
        this.animateCounter = new AnimateCounter(root.querySelector(SELECTOR.SEARCH_RESULT));
        this.submit = new Submit(root, () => {
            return this.submitCallback();
        });
    }

    /**
     * init
     */
    init() {
        this.nestedCheckbox.init();
        this.restorer.restore();
        this.request();
        this.submit.init();
        this.nestedCheckbox.setCallback(() => {
            this.request();
        });
    }

    /**
     * request
     */
    request() {
        this.searchApiClient.get(this.nestedCheckbox.getParameter()).then((result) => {
            this.searchApiCallback(result);
        });
    }

    /**
     * searchApiCallback
     * @param {object} result
     */
    searchApiCallback(result) {
        this.animateCounter.start(result.count);
    }

    /**
     * submitCallback
     * @return object
     */
    submitCallback() {
        return this.nestedCheckbox.getParameter();
    }
}

window.TopController = TopController;
