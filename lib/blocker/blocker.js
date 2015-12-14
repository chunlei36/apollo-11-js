'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _blockerStyles = require('./blocker-styles');

var _blockerStyles2 = _interopRequireDefault(_blockerStyles);

var _blockerStack = require('./blocker-stack');

var _blockerStack2 = _interopRequireDefault(_blockerStack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//const Blocker = React.createClass({
var Blocker = (function (_React$Component) {
  _inherits(Blocker, _React$Component);

  function Blocker(props) {
    _classCallCheck(this, Blocker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Blocker).call(this, props));

    _this.state = { active: false };
    _this.onStackChange = _this.onStackChange.bind(_this);
    return _this;
  }

  _createClass(Blocker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._stackId = _uuid2.default.v1();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _blockerStack2.default.addChangeListener(this.onStackChange);
      this.initialize(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.initialize(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _blockerStack2.default.removeChangeListener(this.onStackChange);
      _blockerStack2.default.removeLoader(this._stackId);
    }
  }, {
    key: 'initialize',
    value: function initialize(props) {
      if (props.show) {
        _blockerStack2.default.addLoader(this._stackId, props.priority);
      } else {
        _blockerStack2.default.removeLoader(this._stackId);
      }
    }
  }, {
    key: 'onStackChange',
    value: function onStackChange() {
      this.setState({
        active: _blockerStack2.default.getMaxPriority() === this.props.priority
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var backgroundStyle = _props.backgroundStyle;
      var children = _props.children;
      var contentBlur = _props.contentBlur;
      var disableDefaultStyles = _props.disableDefaultStyles;
      var foregroundStyle = _props.foregroundStyle;
      var hideContentOnLoad = _props.hideContentOnLoad;
      var message = _props.message;
      var style = _props.style;
      var show = _props.show;
      var active = this.state.active;

      var shouldShowLoader = !!active && !!show;

      var bgStyle = Object.assign({}, disableDefaultStyles ? {} : _blockerStyles2.default.backgroundDefaultStyle, backgroundStyle || {});

      var fgStyle = Object.assign({}, disableDefaultStyles ? {} : _blockerStyles2.default.foregroundDefaultStyle, foregroundStyle || {});

      var msgStyle = disableDefaultStyles ? {} : _blockerStyles2.default.messageDefaultStyle;

      var loaderStyle = _extends({ position: 'relative' }, style);

      var contentStyle = Object.assign({
        position: 'relative',
        opacity: hideContentOnLoad && show ? 0 : 1
      }, shouldShowLoader && contentBlur ? {
        'WebkitFilter': 'blur(' + contentBlur + 'px)',
        'MozFilter': 'blur(' + contentBlur + 'px)',
        'OFilter': 'blur(' + contentBlur + 'px)',
        'msFilter': 'blur(' + contentBlur + 'px)',
        'filter': 'blur(' + contentBlur + 'px)'
      } : {});

      return shouldShowLoader ? _react2.default.createElement(
        'div',
        { className: 'Loader', style: loaderStyle },
        _react2.default.createElement(
          'div',
          { className: 'Loader__content', style: contentStyle },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: 'Loader__background', style: bgStyle },
          _react2.default.createElement(
            'div',
            { className: 'Loader__foreground', style: fgStyle },
            _react2.default.createElement(
              'div',
              { className: 'Loader__message', style: msgStyle },
              message || 'Carregando...'
            )
          )
        )
      ) : _react2.default.createElement(
        'div',
        { style: loaderStyle },
        children
      );
    }
  }]);

  return Blocker;
})(_react2.default.Component);

Blocker.propTypes = {
  backgroundStyle: _react2.default.PropTypes.object,
  children: _react2.default.PropTypes.node,
  contentBlur: _react2.default.PropTypes.number,
  disableDefaultStyles: _react2.default.PropTypes.bool,
  foregroundStyle: _react2.default.PropTypes.object,
  hideContentOnLoad: _react2.default.PropTypes.bool,
  message: _react2.default.PropTypes.node,
  priority: _react2.default.PropTypes.number,
  show: _react2.default.PropTypes.bool.isRequired,
  style: _react2.default.PropTypes.object
};

Blocker.defaultProps = {
  priority: 0
};

exports.default = Blocker;