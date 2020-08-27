import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCard from './components/NewsCard/NewsCard';
import useStyles from './style';
import wordsToNumbers from'words-to-numbers'
function App() {
  const classes = useStyles();
  const apiKey = "9dccea7ca7b9299116fa4c5c57bc84fd2e956eca572e1d8b807a3e2338fdd0dc/stage";
  const [articlesFromSource, setArticlesFromSource] = useState([]);
  const [activeElement , setActiveElement] = useState(-1);
  useEffect(()=>{
    alanBtn({
      key: apiKey,
      onCommand: ({command, articles, number})=> {
        if(command === "sourceNews"){
          setArticlesFromSource(articles);
          setActiveElement(-1);
        }else if(command === "highlights"){
          setActiveElement((prevActiveElement) => prevActiveElement + 1);
        }else if(command === "open"){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}): number;
          const article = articles[parsedNumber - 1]

          if(parsedNumber > 20){
            alanBtn().playText('please try different number');
          }else if(article){
            window.open(article.url, '_blank');
            alanBtn().playText('Opening ...');
          }
         
        }
      }
    })
  }, []);
  return (
    <div>
      <div>
        <div className={classes.logoContainer}>
          <img className={classes.alanLogo} src="https://alan.app/voice/images/previews/preview.jpg" alt="My logo"/>
        </div>
        <NewsCard articles={articlesFromSource} activeElement={activeElement}/>
      </div>
    </div>
  );
}

export default App;
