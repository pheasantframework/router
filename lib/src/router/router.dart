import 'dart:js_interop';
import 'js/spa_router.dart';

import 'js/router.dart';

// TODO: Document

interface class BaseRouter {
  bool _hasbeeninit = false;

  void init() {
    if (_hasbeeninit) return;
    _hasbeeninit = true;
  }
}

class Router extends BaseRouter {
  final JSRouter _router;
  

  Router([String initialLocation = '/']) : _router = JSRouter(initialLocation);

  void get(String uri, RouterFunction function) {
    _router.get(uri, (function.jsify() as JSFunction));
  }

  @override
  void init() {
    super.init();
    _router.init();
  }
}

class SPARouter extends BaseRouter {
  final JSSPARouter _router;

  SPARouter([String initialLocation = '/'])
      : _router = JSSPARouter(initialLocation);

  void get(String uri, SPARouterFunction function) {
    _router.get(uri, (function.jsify() as JSFunction));
  }

  @override
  void init() {
    super.init();
    _router.init();
  }
}

typedef RouterFunction = void Function(dynamic req);

typedef SPARouterFunction = void Function(dynamic req, dynamic state);
