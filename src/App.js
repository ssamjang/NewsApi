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
    <tr>
      <p>Overall Count: {count}</p>
      <button onClick={increment}>Like</button>
      <button onClick={decrement}>Dislike</button>
    </tr>
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

function SearchBar(props) {
  // Search held by the search bar itself before actual submit
  const [innerSearch, setInnerSearch] = useState(""); 

  return(
    <div>
      <p>{innerSearch}</p>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
        ></input>
      <button
        id="search-button"
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
        >
          Search
        </button>
    </div>
  );
}

function App() {
  const { loading, headlines, error } = useNewsArticles();
  const [search, setSearch] = useState(""); 
  const [test, setTest] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>
  }
  return (
    <div className="App">
      <h1>News Headlines</h1>
      {/*on submit in searchbar, you set the APP level search 
        to what ever the user has typed. This 'links' innerSearch
        with the outer App search so it's consistent*/}
      <SearchBar onSubmit={setSearch} />
  
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
