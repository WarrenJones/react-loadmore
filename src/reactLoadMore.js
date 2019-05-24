import React from "react";
import PropTypes from "prop-types";
import "./reactLoadMore.scss";
import classnames from "classnames";
//这是intersection的polyfill
import IntersectionObserver from "intersection-observer-polyfill";
export default class ReactLoadMore extends React.Component {
  constructor() {
    super(...arguments);
    this.insideViewportCb = this.insideViewportCb.bind(this);
  }
  static propTypes = {
    onBottom: PropTypes.func,
    fetching: PropTypes.bool,
    hasMore: PropTypes.bool,
    NoResult: PropTypes.func,
    Footer: PropTypes.func
  };
  componentDidMount() {
    if (!this.props.Footer) this._svgaLoad();
    try {
      const node = document.getElementById('bottom')
      this.observer = new IntersectionObserver(this.insideViewportCb);
      this.observer.observe(node);
    } catch (err) {
      console.log("err in finding node", err);
    }
    window.addEventListener("scroll", this.handleOnScroll);
  }

  insideViewportCb(entries) {
    const { fetching, onBottom } = this.props;
    entries.forEach(element => {
      //在viewport里面
      if (element.intersectionRatio > 0&&!fetching) {
         onBottom();
      }
    });
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer = null;
    }
  }

  _svgaLoad() {
    const SVGA = require("svgaplayerweb");
    const player = new SVGA.Player("#foot_loader");
    var parser = new SVGA.Parser("#foot_loader"); // Must Provide same selector eg:#demoCanvas IF support IE6+
    parser.load(require("./loading.svga"), function(videoItem) {
      player.setVideoItem(videoItem);
      player.startAnimation();
    });
  }

  render() {
    const {
      className,
      children,
      hasMore,
      Footer,
      NoResult
    } = this.props;
    return (
      <div className={"infinite-scroll"}>
        <div className={classnames(className)}>{children} </div>
        <div style={{ clear: "both" }}> </div>
        <div style={{ display: hasMore ? "block" : "none" }} id='bottom'>
          {Footer ? (
            { Footer }
          ) : (
            <div className={"list-loader"}>
              <div id={"foot_loader"} />
            </div>
          )}
        </div>

        <div
          className={"no-result"}
          style={{ display: hasMore ? "none" : "block" }}
        >
          {NoResult ? <NoResult/> : "No more result"}
        </div>
      </div>
    );
  }
}
