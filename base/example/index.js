import { 
    SPARouter,
    navigateTo as _navigateTo
} from "../dist/pheasant_routing.min.js";

function navigateTo(url) {
    _navigateTo(url);
}

const router = new SPARouter('/');
router.get('/', (_, __) => {
    console.log("Hello");
});
router.get('/page1', (_, __) => {
    console.log("Welcome to Page 1");
});
router.get('/page2', (_, __) => {
    console.log("Welcome to Page 2");
});

router.init();