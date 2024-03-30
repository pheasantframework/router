import 'package:pheasant/custom.dart';
import 'package:pheasant_router/src/prereq/tags.dart';
import 'package:pheasant_router/src/router/router.dart';

class PheasantRouterApp extends PheasantBaseApp {
  Router _router;

  PheasantRouterApp(super.app, {Router? router})
      : _router = router ?? Router() {
    addScriptTag(true);
  }

  PheasantRouterApp use({required Router router}) {
    _router = router;
    _router.init();
    return this;
  }
}

typedef RouterApp = PheasantRouterApp;
