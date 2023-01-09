// import Card from "./Card";
import { useEffect, useState } from "react";



import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@mui/material'
import orderBy from 'lodash/orderBy'




export default function GridComponent() {


  // ===================

   const [productList, setProductList] = useState([]);

  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState("no_of_comments");
  const [showCategory, setShowCategory] = useState({
    Bullish: 'Bullish',
    Bearish: 'Bearish',
  });

  // OBJECT. Sort every category
  const categoryNames = productList.map((product) => {
    return product.sentiment;
  });

  console.log("categoryNames", categoryNames);

  // set new array with unique values
  const newCategoryNames = [...new Set(categoryNames)];

  console.log("newCategoryNames", newCategoryNames);

  const showStyles = newCategoryNames.filter(
    // eslint-disable-next-line array-callback-return
    (category) => {
      if (showCategory[category]) {
        return category === "Bearish" || category === "Bullish";
      }
    }
  );

  console.log("showStyles", showStyles);

  // Filter all product that match the category
  const filteredProducts = productList.filter((product) =>
    showStyles.includes(product.sentiment)
  );

  console.log("filteredProducts", filteredProducts);

  // Collection, iteratees, orders
  const sortedProducts = orderBy(filteredProducts, sortField, sortDirection);

  console.log("sortedProducts", sortedProducts);

  // FILTER
  // Categories being shown
  const changeShowCategories = (e) => {
    setShowCategory({
      ...showCategory,
      [e.target.name]: e.target.checked,
    });
  };

  console.log(  "changeShowCategories", changeShowCategories)

  // DIRECTION
  // ASCENDING, DESCENDING
  const changeSortDirection = (e) => {
    setSortDirection(e.target.value);
  };

  // DROPDOWN
  // SORT ON NAME, PRICE
  function changeSortField(e) {
    setSortField(e.target.value);
  }

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await fetch(`http://localhost:3001/products`);

  //     const productList = await res.json();

  //     setProductList(productList);
  //   };

  //   getProducts();
  // }, []);

  // if (!productList) {
  //   return <div>Product not found</div>;
  // }

  // ====================


  // const [stocks, setStocks] = useState([]);

  const API_URL_REDDIT = "https://tradestie.com/api/v1/apps/reddit";

  useEffect(() => {
    const getStocks = async () => {
      const stocksFromServer = await fetch(API_URL_REDDIT);
      const productList = await stocksFromServer.json();

      setProductList(productList);
    };
    getStocks();
  }, []);

    if (!productList) {
    return <div>Product not found</div>;
  }

  console.log("stocks: ", productList);

  // return (
  //   <div className="row">
  //     <div className="side">
  //       <h2>About Me</h2>
  //       <h5>Photo of me:</h5>
  //       <div className="fakeimg" style={{ height: "200px" }}>
  //         Image
  //       </div>
  //       <p>Some text about me</p>
  //       <h3>More Text</h3>
  //       <p>Lorem ipsum dolor sit ame</p>
  //       <div className="fakeimg" style={{ height: "60px" }}>
  //         Image
  //       </div>
  //       <div className="fakeimg" style={{ height: "60px" }}>
  //         Image
  //       </div>
  //       <div className="fakeimg" style={{ height: "60px" }}>
  //         Image
  //       </div>
  //     </div>
  //     <div className="main">
  //       <h2>TITLE HEADING</h2>
  //       <h5>HERE</h5>
  //       {stocks.map((stock) => (
  //         <Card
  //           key={stock.ticker}
  //           ticker={stock.ticker}
  //           comments={stock["no_of_comments"]}
  //           sentiment_score={stock["sentiment_score"]}
  //           sentiment={stock["sentiment"]}
  //         />
  //       ))}
  //       <div className="fakeimg" style={{ height: "200px" }}>
  //         Image
  //       </div>
  //       <p>Some text...</p>
  //       <p>
  //         Sunt calupa Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  //         Assumenda, possimus.
  //       </p>
  //       <h2>TITLE HEADING</h2>
  //       <h5>Title description, Sep 2, 2017</h5>
  //       <div className="fakeimg" style={{ height: "200px" }}></div>
  //       <p>Some text..</p>
  //       <p>
  //         Sunt in culpa qui officia deserunt mollit anim id est laborum
  //         consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
  //         exercitation ullamco.
  //       </p>
  //       <p>loremx200</p>
  //     </div>
  //   </div>
  // );








  //  const [sortField, setSortField] = useState('ticker')
  // const [sortDirection, setSortDirection] = useState('asc')
  // const [showColor, setShowColor] = useState({
  //   bullish: 'bullish',
  //   bearish: 'bearish',
  // })

  // const changeSortField = (e) => {
  //   setSortField(e.target.value)
  // }

  // const changeSortDirection = (e) => {
  //   setSortDirection(e.target.value)
  // }

  // const changeShowColors = (e) => {
  //   setShowColor({
  //     ...showColor,
  //     [e.target.name]: e.target.checked
  //   })
  // }

  // const colorNames = Object.keys(colors)
  // const showStyles = colorNames.filter(color => showColor[color]).map(color => colors[color]).flat()
  // const filteredProducts = products.filter(product => showStyles.includes(product.style))
  // const sortedProducts = orderBy(filteredProducts, sortField, sortDirection)

  return (
    <div className="outer-container">
      <Grid className="grid-container" container spacing={2} padding={4}>

      <Grid item xs={12}>
        <h1>🚀 Stocks List 🚀</h1>
      </Grid>

      <Grid item xs={4}>
        <FormControl>
          <FormLabel>Sort Direction</FormLabel>
          <RadioGroup
            name="sort-direction"
            value={sortDirection}
            onChange={changeSortDirection}
          >
            <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
            <FormControlLabel value="desc" control={<Radio />} label="Descending" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl>
          <FormLabel>Sort On</FormLabel>
          <Select
            value={sortField}
            onChange={changeSortField}
          >
            <MenuItem value={'ticker'}>Name</MenuItem>
            <MenuItem value={'sentiment'}>Sentiment</MenuItem>
            <MenuItem value={'no_of_comments'}>Number of comments</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormGroup>
          <FormLabel>Filter on Sentiment</FormLabel>
          {newCategoryNames.map((sentiment, i) =>
            <FormControlLabel
              key={i}
              control={<Checkbox checked={showCategory[sentiment]} onChange={changeShowCategories} name={sentiment} />}
              label={sentiment} />
          )}
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Number of Comments</TableCell>
              <TableCell>Sentiment Score</TableCell>
              <TableCell>Sentiment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((stock, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography color="white">{stock.ticker}</Typography></TableCell>
                <TableCell>{stock.no_of_comments}</TableCell>
                <TableCell>{stock.sentiment_score}</TableCell>
                <TableCell><Typography color={stock.sentiment === 'Bullish' ? 'green' : 'red'}>{stock.sentiment}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

    </Grid>

    </div>
    
  );
}
