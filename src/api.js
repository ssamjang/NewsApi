import { useState, useEffect } from 'react';

const API_KEY = '1bc15cde092f458baeb641dfa98aae14'

async function getHeadlines() {
    const url = `https://newsapi.org/v2/top-headlines?country=au&apiKey=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    let articles = data.articles; //get a list of articles
    return (
        articles.map((article) => ({
            title: article.title,
            url: article.url
        }))
    )
}

export function useNewsArticles() {
    const [loading, setLoading] = useState(true);
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                setHeadlines( await getHeadlines()); 
                setLoading(false);
            }catch(err){
                setError(err);
                setLoading(false);
            }
            
        })();
        },[]
    );
      return {
          loading,
          headlines,
          error: null
      }
}