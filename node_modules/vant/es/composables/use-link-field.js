import { watch, inject } from 'vue';
import { FIELD_KEY } from '../field';
export function useLinkField(getValue) {
  var field = inject(FIELD_KEY, null);

  if (field && !field.childFieldValue.value) {
    field.childFieldValue.value = getValue;
    watch(getValue, function () {
      field.resetValidation();
      field.validateWithTrigger('onChange');
    });
  }
}