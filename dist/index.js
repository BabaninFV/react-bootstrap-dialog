'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _Prompts = require('./Prompts');

var _PromptInput = require('./PromptInput');

var _PromptInput2 = _interopRequireDefault(_PromptInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The modal dialog which can be altenative to `window.confirm` and `window.alert`.
 * @example <Dialog ref={(el) => {this.dialog = el} />
 * @example this.dialog.show({body: 'Hello!', actions: [Dialog.Action('do', () => console.log('ok'))]})
 * @example this.dialog.showAlert('Hello!')
 */
var Dialog = function (_React$Component) {
  (0, _inherits3.default)(Dialog, _React$Component);
  (0, _createClass3.default)(Dialog, null, [{
    key: 'setOptions',

    /**
     * Set default options for applying to all dialogs.
     * @param options
     */
    value: function setOptions(options) {
      Dialog.options = (0, _assign2.default)({}, Dialog.DEFAULT_OPTIONS, options);
    }

    /**
     * Reset default options to presets.
     */

  }, {
    key: 'resetOptions',
    value: function resetOptions() {
      Dialog.options = Dialog.DEFAULT_OPTIONS;
    }
  }, {
    key: 'initialState',
    value: function initialState() {
      return {
        title: null,
        body: null,
        showModal: false,
        actions: [],
        size: undefined,
        onHide: null,
        prompt: null
      };
    }
  }]);

  function Dialog(props) {
    (0, _classCallCheck3.default)(this, Dialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call(this, props));

    _this.promptInput = null;
    _this.keyBinds = [];
    _this.state = Dialog.initialState();
    _this.onHide = _this.onHide.bind(_this);
    _this.onSubmitPrompt = _this.onSubmitPrompt.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Dialog, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.showModal) {
        this.hide();
      }
    }

    /**
     * Show dialog with choices. This is similar to `window.confirm`.
     * @param options Object for dialog options.
     * @param options.title The title of dialog.
     * @param options.body The body of message.
     * @param options.actions {DialogAction} The choices for presenting to user.
     * @param options.size {[null, 'md', 'lg', 'sm']} The width size for dialog.
     * @param options.onHide {function} The method to call when the dialog was closed by clicking background.
     * @param options.prompt {[null, Prompt]} Use prompt for text input or password input.
     */

  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var keyBinds = {};
      var actions = options.actions || [];
      actions.forEach(function (action) {
        if (action.key) {
          action.key.split(',').forEach(function (key) {
            keyBinds[key] = function () {
              action.func && action.func(_this2);
            };
          });
        }
      });
      // TODO: Add keybinds
      this.keyBinds = keyBinds;
      options['showModal'] = true;
      this.setState(Dialog.initialState());
      this.setState(options);
    }

    /**
     * Show message dialog This is similar to `window.alert`.
     * @param body The body of message.
     * @param size {[null, 'md', 'lg', 'sm']} The width size for dialog.
     */

  }, {
    key: 'showAlert',
    value: function showAlert(body) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var options = {
        body: body,
        actions: [Dialog.SingleOKAction()],
        size: size
      };
      this.show(options);
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      var onHide = this.state.onHide;
      if (typeof onHide === 'function') {
        onHide(this);
      } else {
        this.hide();
      }
    }

    /**
     * Hide this dialog.
     */

  }, {
    key: 'hide',
    value: function hide() {
      if (!this.state.showModal) return;
      // TODO: Remove keybinds
      this.setState({ showModal: false });
    }

    /**
     * Get the value in prompt.
     * @return {string, null}
     */

  }, {
    key: 'onSubmitPrompt',
    value: function onSubmitPrompt() {
      var action = this.keyBinds['enter'];
      action && action();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var size = typeof this.state.size === 'undefined' ? 'sm' : this.state.size === 'md' ? null : this.state.size;
      return _react2.default.createElement(
        _reactBootstrap.Modal,
        { show: this.state.showModal, onHide: this.onHide, size: size },
        this.state.title && _react2.default.createElement(
          _reactBootstrap.Modal.Header,
          null,
          _react2.default.createElement(
            _reactBootstrap.Modal.Title,
            null,
            this.state.title
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Body,
          null,
          typeof this.state.body === 'string' ? _react2.default.createElement(
            'p',
            null,
            this.state.body
          ) : this.state.body,
          this.state.prompt && _react2.default.createElement(_PromptInput2.default, {
            ref: function ref(el) {
              _this3.promptInput = el;
            },
            prompt: this.state.prompt,
            onSubmit: this.onSubmitPrompt
          })
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Footer,
          null,
          this.state.actions.map(function (action) {
            return _react2.default.createElement(
              'button',
              {
                key: action.key,
                type: 'button',
                className: 'btn btn-sm ' + action.className,
                onClick: function onClick() {
                  action.func && action.func(_this3);
                },
                style: { minWidth: 82 } },
              action.label
            );
          })
        )
      );
    }
  }, {
    key: 'value',
    get: function get() {
      if (this.promptInput) {
        return this.promptInput.value;
      }
      return null;
    }
  }]);
  return Dialog;
}(_react2.default.Component);

/**
 * The class to construct a choice for Dialog.
 * Use `Dialog.Action(options)`.
 */


var DialogAction = function () {
  /**
   * Constructor
   * @param label The text or node for button. Default is `OK`.
   * @param func The function to execute when button is clicked. Default is null.
   * @param className The class name for button. Default is ''.
   */
  function DialogAction(label, func, className, key) {
    (0, _classCallCheck3.default)(this, DialogAction);

    this.label = label || Dialog.options.defaultOkLabel;
    this._func = func;
    this.className = className || 'btn-default';
    this.key = key;
  }

  (0, _createClass3.default)(DialogAction, [{
    key: 'func',
    value: function func(dialog) {
      dialog.hide();
      this._func && this._func(dialog);
    }
  }]);
  return DialogAction;
}();

Dialog.DEFAULT_OPTIONS = {
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary'
};

Dialog.options = Dialog.DEFAULT_OPTIONS;

Dialog.Action = function (label, func, className, key) {
  return new DialogAction(label, func, className, key);
};
Dialog.DefaultAction = function (label, func, className) {
  return new DialogAction(label, func, className && className.length > 0 ? className : Dialog.options.primaryClassName, 'enter');
};
Dialog.OKAction = function (func) {
  return new DialogAction(Dialog.options.defaultOkLabel, function (dialog) {
    dialog.hide();func && func(dialog);
  }, Dialog.options.primaryClassName, 'enter');
};
Dialog.CancelAction = function (func) {
  return new DialogAction(Dialog.options.defaultCancelLabel, function (dialog) {
    dialog.hide();func && func(dialog);
  }, null, 'esc');
};
Dialog.SingleOKAction = function () {
  return new DialogAction(Dialog.options.defaultOkLabel, function (dialog) {
    dialog.hide();
  }, Dialog.options.primaryClassName, 'enter,esc');
};

Dialog.TextPrompt = function (options) {
  return new _Prompts.TextPrompt(options);
};
Dialog.PasswordPrompt = function (options) {
  return new _Prompts.PasswordPrompt(options);
};

Dialog.displayName = 'Dialog';
module.exports = Dialog;