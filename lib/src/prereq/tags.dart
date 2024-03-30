import 'dart:html';

void addScriptTag([bool minified = true]) {
  document.head!.append(ScriptElement()
    ..src = minified
        ? 'https://esm.sh/gh/pheasantframework/router@6ac4c05a32/base/dist/pheasant_routing.min.js'
        : 'https://esm.sh/gh/pheasantframework/router@6ac4c05a32/base/dist/pheasant_routing.js'
    ..type = 'module');
}
