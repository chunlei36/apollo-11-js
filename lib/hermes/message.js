'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HermesApi = require('./HermesApi');

var _HermesApi2 = _interopRequireDefault(_HermesApi);

var _HermesStyles = require('./HermesStyles');

var _HermesStyles2 = _interopRequireDefault(_HermesStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = function Message(_ref) {
  var message = _ref.message;

  var deleteButton = message.isDeletable ? _react2.default.createElement(
    'button',
    { className: 'sv-button link', onClick: function onClick() {
        return _HermesApi2.default.removeMessage(message.id);
      } },
    '×'
  ) : '';

  return _react2.default.createElement(
    'li',
    { style: _HermesStyles2.default.msgStyle },
    deleteButton,
    message.text
  );
};

Message.displayName = 'Message';

exports.default = Message;