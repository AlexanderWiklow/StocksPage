
import { useEffect, useState } from "react";

export default function Card({ ticker, comments, sentiment_score, sentiment }) {
    
    const API_URL_REDDIT = "https://tradestie.com/api/v1/apps/reddit";


    const [stocks, setStocks] = useState([]);

  useEffect(() => {
      const getStocks = async () => {
      const stocksFromServer = await fetch(
          API_URL_REDDIT)
      const stocks = await stocksFromServer.json();

      setStocks(stocks);
    };
    getStocks();
  },[] );

    console.log(typeof stocks);
    console.log(stocks[0]);
    // console.log("stocks: ", stocks[0].ticker);

    return (
        <div >
            <h1>{ticker}</h1>
            <h1>{comments}</h1>
            <h1>{sentiment_score}</h1>
            <h1>{sentiment}</h1>

            {/* {stocks.map((stock,i) => (
                <h1>{stock.ticker}</h1>
            ))} */}
        </div>
    )
}