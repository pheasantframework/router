# Pheasant Routing Package
![Custom badge](https://shield.deno.dev/x/phs_routing)
![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fupdates%2Fhttps%2Fdeno.land%2Fx%2Fphs_routing%2Fmod.ts)

This is the TypeScript Library used in making the base router class to be implemented by the Dart `pheasant_router` package in The Pheasant Framework.

## Installation
This package is for utilization in the Pheasant Framework.

All you will need from this package to use the utilities in it is the bundled JavaScript files found in the `dist/` folder.

## Implement
### JavaScript/Typescript
If you want to make use of this package on your own, you can make use of the functionality of this package from Deno. 

```typescript
import { Router } from 'https://deno.land/x/phs_routing/mod.ts';

let router = new Router();
router.get('/:id', (req) => {
    console.log(`${req.params.id}`);
});

// Initialise the router on the web application
router.init();
```

### Dart
The `pheasant_routing` package (not yet) on [pub.dev] should contain full implementation of the library for the needs of the Pheasant Framework.

If you would want to make use of the router yourself (for contributions or whatever you would want to do), add the minified JavaScript file as a script tag, and then make use of the functionality in Dart as you normally would. 
```dart
@JS('Router')
@staticInterop
class Router {
    external factory Router();
}

@staticInterop
extension on Router {
    //... other functions implemented
}
```

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
