import {
    Router, 
    SPARouter
} from './lib/router.ts';
import {
    navigateTo,
    navigateBack,
    pushEvent
} from './lib/src/spa/navigation.js'

// allow browser/dart to access object
Object.assign(window, { 
    Router: Router,
    SPARouter: SPARouter,
    navigateTo: navigateTo,
    navigateBack: navigateBack,
    pushEvent: pushEvent
});

export {
    Router,
    SPARouter,
    navigateBack,
    navigateTo,
    pushEvent
};