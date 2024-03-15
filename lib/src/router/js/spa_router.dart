import 'dart:js_interop';

// TODO: Document

@JS('SPARouter')
@staticInterop
class JSSPARouter {
  external factory JSSPARouter([String initialRoute = '/']);
}

@staticInterop
extension JSSPARouterMethods on JSSPARouter {
  external void get(String uri, JSFunction callback);
  external void init();
}

