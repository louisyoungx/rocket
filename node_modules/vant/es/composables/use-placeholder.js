import { createVNode } from "vue";
import { useHeight } from './use-height';
export function usePlaceholder(contentRef, bem) {
  var height = useHeight(contentRef);
  return function (renderContent) {
    return createVNode("div", {
      "class": bem('placeholder'),
      "style": {
        height: height.value ? "".concat(height.value, "px") : undefined
      }
    }, [renderContent()]);
  };
}