import React, {useState} from 'react';
import './App.css';
import { useNewsArticles } from './api';

function LikeCounter() {
  const[count, setCount]=useState(0);

  const increment = () => {
    setCount((oldCount) => oldCount + 1)
  }

  const decrement = () => {
    setCount((oldCount) => oldCount - 1)
  }
  return(
    <div>
      <p>Overall Count: {count}</p>
      <button onClick={increment}>Like</button>
      <button onClick={decrement}>Dislike</button>
    </div>
  )
}

function Headline(props) {
  return(
    <div>
      <h1>{props.title}</h1>
      <LikeCounter />
    </div>
  )
}

function Tabulate(props) {
  return(
    <table>
      <tr>
        <th>News titles</th>
      </tr>
      {Tablerow(props)}
    </table>
  )
}

function Tablerow(props) {
  return(
    <tr>
      {props.title}
    </tr>
  )
}

function SearchBar() {
  return(
    <div>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        ></input>
      <button
        id="search-button"
        type="button">
          {/*Set the button to button type b/c its not a form so the page
          wont try to submit anything*/}
          Search
        </button>
    </div>
  );
}

function App() {
  const { loading, headlines, error } = useNewsArticles();
  //no guarantee that title will be unique- add a key (in this case, url)
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>
  }
  return (
    <div className="App">
      <h1>News Headlines</h1>
      <SearchBar />
      <table>
        {headlines.map((headline) => (
          // headline is now an object
            // <Headline 
            //   key={headline.url}
            //   title={headline.title}
            // />
          <Headline key={headline.url} title={headline.title} />
        ))}
      </table>
      
    </div>
  );
}

export default App;
