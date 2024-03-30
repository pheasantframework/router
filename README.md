# The Pheasant Routing Package
This is the pheasant routing package, a plugin package for the Pheasant Framework used in routing web pages.

It makes use of the [deno routing package](https://deno.land/x/phs_routing) under the hood to allow for more powerful and configurable routing on your web pages.

## Using This Plugin
The main functionality provided by this plugin is the `Router` and `SPARouter`, which is used for routing your applications, as well as being able to handle dynamic routes and get information from routes like dynamic route variables, queries etc.

```dart
final router = Router();

// Add routes to the router.
router.get('/', (req) {
    print("Hello World")
});

router.get('/:id', (req) {
    print(req.params.id);
});

// Initialise the router
router.init();
```

The request object `req` contains information about the route changes like the current path (`req.path`), queries (`req.query`), hashes (`req.hash`) and parameters (`req.params`).

The preferred router to use for your applications, especially if they are not to be server rendered, is the `SPARouter`.
```dart
final router = SPARouter();

// Note that you will need to know the state when changing routes
router.get('/', (req, state) {
    print("Hello World");
});

router.get('/:id', (req, state) {
    print("${req.params.id} -- ${state.name}");
});

// Initialise the router
router.init();
```

It also provides the `PheasantRouterApp`, which enables support for routing in your web applications. 
```dart
import 'package:pheasant/pheasant.dart';
import 'package:pheasant_router/pheasant_router.dart';

void main() {
    final app = PheasantRouterApp(App);
    final router = SPARouter();

    // Router code

    app.router(router);
    app.build();
}
```

## Versions
Dart Package: ![Pub Version](https://img.shields.io/pub/v/pheasant_router?labelColor=rgb(245%2C%20193%2C%2066)&link=https%3A%2F%2Fpub.dev%2Fpackages%2Fpheasant_router)

Deno Package: 
![Custom badge](https://shield.deno.dev/x/phs_routing)
![Custom Badge](https://badgen.net/https/nikechukwu.npkn.net/jsr-endpoint/pheasant/router/version?icon=https://jsr.io/logo.svg)