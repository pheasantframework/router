import 'package:pheasant/custom.dart';

/// This is the name of your plugin component.
/// 
/// Change this, or make a function to call the constructor in order to change the name of the component when rendered
/// 
/// For more guidelines on making your custom component check: https://github.com/pheasantframework/pheasant/blob/patch/docs/custom/components.md
class PlaceholderPlugin extends PheasantComponent {
  // You can add attribute definitions as well to your component

  // This function must always be overriden to provide the element.
  @override
  Element renderComponent([TemplateState? state]) {
    return ParagraphElement()..text = "Hello World!";
  }
}

// You can add more components, but it is recommended to export them all into one file for ease of access by the framework renderer.
