import 'dart:js_interop';

// TODO: Document

@JS('Router')
@staticInterop
class JSRouter {
  external factory JSRouter([String initialRoute = '/']);
}

@staticInterop
extension JSRouterMethods on JSRouter {
  external void get(String uri, JSFunction callback);
  external void init();
}

