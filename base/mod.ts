import Router from './lib/router.ts'

// allow browser/dart to access object
Object.assign(window, { Router: Router });

export { Router };