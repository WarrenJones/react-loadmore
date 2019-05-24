"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./reactLoadMore.scss");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _intersectionObserverPolyfill = require("intersection-observer-polyfill");

var _intersectionObserverPolyfill2 = _interopRequireDefault(_intersectionObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//这是intersection的polyfill


var ReactLoadMore = function (_React$Component) {
  _inherits(ReactLoadMore, _React$Component);

  function ReactLoadMore() {
    _classCallCheck(this, ReactLoadMore);

    var _this = _possibleConstructorReturn(this, (ReactLoadMore.__proto__ || Object.getPrototypeOf(ReactLoadMore)).apply(this, arguments));

    _this.insideViewportCb = _this.insideViewportCb.bind(_this);
    return _this;
  }

  _createClass(ReactLoadMore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.Footer) this._svgaLoad();
      try {
        var node = document.getElementById('bottom');
        this.observer = new _intersectionObserverPolyfill2.default(this.insideViewportCb);
        this.observer.observe(node);
      } catch (err) {
        console.log("err in finding node", err);
      }
      window.addEventListener("scroll", this.handleOnScroll);
    }
  }, {
    key: "insideViewportCb",
    value: function insideViewportCb(entries) {
      var _props = this.props,
          fetching = _props.fetching,
          onBottom = _props.onBottom;

      entries.forEach(function (element) {
        //在viewport里面
        if (element.intersectionRatio > 0 && !fetching) {
          onBottom();
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.observer) {
        this.observer = null;
      }
    }
  }, {
    key: "_svgaLoad",
    value: function _svgaLoad() {
      var SVGA = require("svgaplayerweb");
      var player = new SVGA.Player("#foot_loader");
      var parser = new SVGA.Parser("#foot_loader"); // Must Provide same selector eg:#demoCanvas IF support IE6+
      parser.load(require("./loading.svga"), function (videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          children = _props2.children,
          hasMore = _props2.hasMore,
          Footer = _props2.Footer,
          NoResult = _props2.NoResult;

      return _react2.default.createElement(
        "div",
        { className: "infinite-scroll" },
        _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)(className) },
          children,
          " "
        ),
        _react2.default.createElement(
          "div",
          { style: { clear: "both" } },
          " "
        ),
        _react2.default.createElement(
          "div",
          { style: { display: hasMore ? "block" : "none" }, id: "bottom" },
          Footer ? { Footer: Footer } : _react2.default.createElement(
            "div",
            { className: "list-loader" },
            _react2.default.createElement("div", { id: "foot_loader" })
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: "no-result",
            style: { display: hasMore ? "none" : "block" }
          },
          NoResult ? _react2.default.createElement(NoResult, null) : "No more result"
        )
      );
    }
  }]);

  return ReactLoadMore;
}(_react2.default.Component);

ReactLoadMore.propTypes = {
  onBottom: _propTypes2.default.func,
  fetching: _propTypes2.default.bool,
  hasMore: _propTypes2.default.bool,
  NoResult: _propTypes2.default.func,
  Footer: _propTypes2.default.func
};
exports.default = ReactLoadMore;