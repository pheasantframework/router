import 'dart:js_interop';
import 'js/spa_router.dart';

import 'js/router.dart';

// TODO: Document

class Router {
  final JSRouter _router;

  Router([String initialLocation = '/']) : _router = JSRouter(initialLocation);

  void get(String uri, RouterFunction function) {
    _router.get(uri, (function.jsify() as JSFunction));
  }

  void init() {
    _router.init();
  }
}

class SPARouter {
  final JSSPARouter _router;

  SPARouter([String initialLocation = '/'])
      : _router = JSSPARouter(initialLocation);

  void get(String uri, SPARouterFunction function) {
    _router.get(uri, (function.jsify() as JSFunction));
  }

  void init() {
    _router.init();
  }
}

typedef RouterFunction = void Function(dynamic req);

typedef SPARouterFunction = void Function(dynamic req, dynamic state);
