import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";
import { createNamespace } from '../utils';
import { BORDER } from '../utils/constant';
import { STEPS_KEY } from '../steps';
import { useParent } from '@vant/use';
import Icon from '../icon';

var _createNamespace = createNamespace('step'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = useParent(STEPS_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var getStatus = function getStatus() {
      var active = +parent.props.active;

      if (index.value < active) {
        return 'finish';
      }

      if (index.value === active) {
        return 'process';
      }
    };

    var isActive = function isActive() {
      return getStatus() === 'process';
    };

    var lineStyle = computed(function () {
      var _parent$props = parent.props,
          activeColor = _parent$props.activeColor,
          inactiveColor = _parent$props.inactiveColor;

      if (getStatus() === 'finish') {
        return {
          background: activeColor
        };
      }

      return {
        background: inactiveColor
      };
    });
    var titleStyle = computed(function () {
      var _parent$props2 = parent.props,
          activeColor = _parent$props2.activeColor,
          inactiveColor = _parent$props2.inactiveColor;

      if (isActive()) {
        return {
          color: activeColor
        };
      }

      if (!getStatus()) {
        return {
          color: inactiveColor
        };
      }
    });

    var onClickStep = function onClickStep() {
      parent.emit('click-step', index.value);
    };

    var renderCircle = function renderCircle() {
      var _parent$props3 = parent.props,
          activeIcon = _parent$props3.activeIcon,
          activeColor = _parent$props3.activeColor,
          inactiveIcon = _parent$props3.inactiveIcon;

      if (isActive()) {
        if (slots['active-icon']) {
          return slots['active-icon']();
        }

        return createVNode(Icon, {
          "class": bem('icon', 'active'),
          "name": activeIcon,
          "color": activeColor
        }, null);
      }

      if (slots['inactive-icon']) {
        return slots['inactive-icon']();
      }

      if (inactiveIcon) {
        return createVNode(Icon, {
          "class": bem('icon'),
          "name": inactiveIcon
        }, null);
      }

      return createVNode("i", {
        "class": bem('circle'),
        "style": lineStyle.value
      }, null);
    };

    return function () {
      var _slots$default;

      var direction = parent.props.direction;
      var status = getStatus();
      return createVNode("div", {
        "class": [BORDER, bem([direction, _defineProperty({}, status, status)])]
      }, [createVNode("div", {
        "class": bem('title', {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), createVNode("div", {
        "class": bem('circle-container'),
        "onClick": onClickStep
      }, [renderCircle()]), createVNode("div", {
        "class": bem('line'),
        "style": lineStyle.value
      }, null)]);
    };
  }
});