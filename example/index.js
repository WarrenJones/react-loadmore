import React from "react";
import { render } from "react-dom";
import ReactLoadMore from "../src/reactLoadMore";
import mockUpData from "./data";

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = this._getInitialState();
  }
  _getInitialState() {
    return {
      fetching: false,
      hasMore: true,
      dataList: [].concat(mockUpData)
    };
  }
  loadMore() {
    const {dataList} = this.state;
    if(dataList.length<100){
      this.setState({fetching:true})
      setTimeout(()=>{
        this.setState({dataList:[...dataList,...mockUpData],fetching:false})
      },2000)
    }else{
      this.setState({hasMore:false,fetching:false})
    }
  }
  render() {
    const { fetching, hasMore, dataList } = this.state;

    const NoResult = ()=> <span>No more Result,~~</span>;
    return (
      <ReactLoadMore
        onBottom={this.loadMore.bind(this)}
        fetching={fetching}
        hasMore={hasMore}
        NoResult={NoResult}
        Footer={null}
      >
        {dataList.map((item,index) => {
          return (
            <div style={{ height: "35vw", position: "relative" }} key={index}>
              <img
                src={item.extra.thumbnail_pic}
                style={{
                  width: "40vw",
                  height: "25w",
                  borderRadius:'3vw',
                  position: "absolute",
                  top: "2vw",
                  left: "2vw"
                }}
              />
              <span style={{ fontSize: "4vw", position: "absolute",
                  top: "5vw",
                  fontWeight:'bold',
                  left: "46vw"}}>{item.title}</span>
            </div>
          );
        })}
      </ReactLoadMore>
    );
  }
}

render(<App />, document.getElementById("root"));
