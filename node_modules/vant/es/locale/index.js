import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { ref, reactive } from 'vue';
import { deepAssign } from '../utils/deep-assign';
import defaultMessages from './lang/zh-CN';
var lang = ref('zh-CN');

var _messages = reactive({
  'zh-CN': defaultMessages
});

export default {
  messages: function messages() {
    return _messages[lang.value];
  },
  use: function use(newLang, newMessages) {
    lang.value = newLang;
    this.add(_defineProperty({}, newLang, newMessages));
  },
  add: function add() {
    var newMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    deepAssign(_messages, newMessages);
  }
};