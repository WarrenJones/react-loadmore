# SnapShots

a configurable turnplate in React

![](https://res.unclewarren.cn/react-loadmore-snapshot.gif)
---

# react-more-load

```
$ npm install --save  react-more-load
```

# how to use
```
  import ReactLoadMore from "react-more-load";
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
```
you can also fork the code and `npm start` to run the example.

## props 

| params        | type   |  desc  | necessary |
| --------   | -----:  | :----:  |:----:  |
| onBottom | func | when the user scroll to the bottom| true|
| fetching | bool | isFetchingData| true|
| fetching | bool | isFetchingData| true|
| hasMore | bool | has more data| true|
| NoResult | func | return the ui dom of no result | false|
| Footer | func | return the ui dom loading Footer | false|


## more
you can fork and check the example code to see the fully complishment.

**If you have any of ideas,don't forget to leave an issue! And also star haha**

## License

ISC
