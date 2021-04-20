import { useState, useEffect } from 'react';

const API_KEY = '1bc15cde092f458baeb641dfa98aae14'

async function getHeadlines(search) {
    const url = 
        `https://newsapi.org/v2/top-headlines?country=au&apiKey=${API_KEY}&q=${search}`;
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

export function useNewsArticles(search) {
    const [loading, setLoading] = useState(true);
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                setHeadlines( await getHeadlines(search)); 
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);
            }
            
        })();
        },[search]
    );
      return {
          loading,
          headlines,
          error
      }
}