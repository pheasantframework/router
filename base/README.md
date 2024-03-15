# Pheasant Routing Package
![Custom badge](https://shield.deno.dev/x/phs_routing)
![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fupdates%2Fhttps%2Fdeno.land%2Fx%2Fphs_routing%2Fmod.ts)
![Custom Badge](https://badgen.net/https/nikechukwu.npkn.net/jsr-endpoint/pheasant/router/version?icon=https://jsr.io/logo.svg)

This is the TypeScript Library used in making the base router class to be implemented by the Dart `pheasant_router` package in The Pheasant Framework.

This is also a TypeScript/JavaScript Library you can use in your web applications for powerful, functional and easy routing in your websites/web apps.

## Installation
This package is for utilization in the Pheasant Framework, but can be used outside of it as a client-side library for implementing routing in your web apps.

All you will need from this package to use the utilities in it is the bundled JavaScript files found in the `dist/` folder.

If you are using this in JavaScript/TypeScript outside Dart, or Pheasant, you can simply install this from jsr. See https://jsr.io/ for information. If you are using Deno, you can simply import this package from https://deno.land/x/.

## Implement
This library consists of routers that can be easily included in your web application at the client side. 

This includes the `Router` class, which can be used for basic routing in your web application. 

```javascript
import { Router } from 'https://deno.land/x/phs_routing/mod.ts';

// Create a new router object
let router = new Router('/');

// Add new routes
router.get('/', (req) => {
    // Handle 
    console.log("Hello World");
});

// Initialise the router on the web application
router.init();
```

The library also includes routing for single-page applications, or for fully client-side routing via the `SPARouter`, which can be used to create simple Single-Page Applications. 

```javascript
import { SPARouter } from 'https://deno.land/x/phs_routing/mod.ts';

// Create a new SPA router object
let router = new SPARouter('/');

// Add new routes
router.get('/', (req, state) => {
    // Handle 
    console.log(`Hello ${state.name}`);
});

// Initialise the router on the web application
router.init();
```

### JavaScript/Typescript
If you want to make use of this package on your own, you can make use of the functionality of this package from Deno. 

```javascript
import { Router } from 'https://deno.land/x/phs_routing/mod.ts';

let router = new Router();
router.get('/:id', (req) => {
    console.log(`${req.params.id}`);
});

// Initialise the router on the web application
router.init();
```

### Dart
The `pheasant_routing` package (not yet) on [pub.dev](https://pub.dev/) should contain full implementation of the library for the needs of the Pheasant Framework.

If you would want to make use of the router yourself (for contributions or whatever you would want to do), add the minified JavaScript file as a script tag, and then make use of the functionality in Dart as you normally would. 
```dart
@JS('Router')
@staticInterop
class Router {
    external factory Router(String? initialRoute);
}

@staticInterop
extension on Router {
    /* other functions implemented... */
}

@JS('SPARouter')
@staticInterop
class SPARouter {
    external factory SPARouter(String? initialRoute);
}

@staticInterop
extension on SPARouter {
    /* other functions implemented... */
}
```

You wouldn't need to do this unless you want to make use of **this library** rather than **the package**. 

> If you want to use the package, check the details here: https://github.com/pheasantframework/router.

If you're not conversant with JS interop in Dart, it would be helpful to check [this page on dart.dev](https://dart.dev/interop/js-interop).

## Contributions and Extensions
The library, as of its current version, doesn't make use of any external libraries. This means that you can make use of, edit and implement this library in NodeJS and Deno (although the library was originally made in Deno). 

If you want a full NPM implementation of this library, you can run the following command in the project root directory with the latest version of Deno:
```bash
deno run -A scripts/npm.ts
```

This will create an npm package using `dnt` in the `npm` directory.

To bundle/build this library, and generate the bundled, as well as minified, library, run the following command in the project root directory with the latest version of Deno:
```bash
deno run -A scripts/minify.ts
```
