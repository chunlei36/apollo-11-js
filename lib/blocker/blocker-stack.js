'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.max');

var _lodash2 = _interopRequireDefault(_lodash);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blockerStack = _extends({}, _events.EventEmitter.prototype, {
  stack: [],
  addLoader: function addLoader(id) {
    var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (this.getIndex(id) === -1) {
      this.stack.push({ id: id, priority: priority });
      this.emitChange();
    }
  },
  removeLoader: function removeLoader(id) {
    if (this.getIndex(id) !== -1) {
      this.stack.splice(this.getIndex(id), 1);
      this.emitChange();
    }
  },
  getIndex: function getIndex(id) {
    return this.stack.findIndex(function (loader) {
      return loader.id === id;
    });
  },
  getMaxPriority: function getMaxPriority() {
    var max = (0, _lodash2.default)(this.stack, function (loader) {
      return loader.priority;
    });
    return max ? max.priority : 0;
  },
  emitChange: function emitChange() {
    this.emit('change');
  },
  addChangeListener: function addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

exports.default = blockerStack;