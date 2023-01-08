import Card from "./Card";
import { useEffect, useState } from "react";

export default function GridComponent() {
  const [stocks, setStocks] = useState([]);

  const API_URL_REDDIT = "https://tradestie.com/api/v1/apps/reddit";

  useEffect(() => {
    const getStocks = async () => {
      const stocksFromServer = await fetch(API_URL_REDDIT);
      const stocks = await stocksFromServer.json();

      setStocks(stocks);
    };
    getStocks();
  }, []);

  return (
    <div className="row">
      <div className="side">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <div className="fakeimg" style={{ height: "200px" }}>
          Image
        </div>
        <p>Some text about me</p>
        <h3>More Text</h3>
        <p>Lorem ipsum dolor sit ame</p>
        <div className="fakeimg" style={{ height: "60px" }}>
          Image
        </div>
        <div className="fakeimg" style={{ height: "60px" }}>
          Image
        </div>
        <div className="fakeimg" style={{ height: "60px" }}>
          Image
        </div>
      </div>
      <div className="main">
        <h2>TITLE HEADING</h2>
        <h5>HERE</h5>
        {stocks.map((stock) => (
          <Card
            key={stock.ticker}
            ticker={stock.ticker}
            comments={stock["no_of_comments"]}
            sentiment_score={stock["sentiment_score"]}
            sentiment={stock["sentiment"]}
          />
        ))}
        <div className="fakeimg" style={{ height: "200px" }}>
          Image
        </div>
        <p>Some text...</p>
        <p>
          Sunt calupa Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Assumenda, possimus.
        </p>
        <h2>TITLE HEADING</h2>
        <h5>Title description, Sep 2, 2017</h5>
        <div className="fakeimg" style={{ height: "200px" }}></div>
        <p>Some text..</p>
        <p>
          Sunt in culpa qui officia deserunt mollit anim id est laborum
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco.
        </p>
        <p>loremx200</p>
      </div>
    </div>
  );
}
