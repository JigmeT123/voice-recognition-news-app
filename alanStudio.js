
// intent('whose the boss', 'who is the cool guy', p => {
//     p.play('(it is acho Jigme Tashi Namgyal ofcourse|hi there)');
// });

// const API_KEY = "6372893783ea4654a4b96ecef7a903c9";
// let globalArticles = [];

// intent(
//     "what is this app about?",
//     reply('This is a news app build by Jigme Tashi Namgyal for 7 Days 7 website challenge')
// );

// intent(
//     "What can I do here?",
//     reply('you can use voice command to search for reliable news on any topic')
// );

// //news from the source

// intent('give me the news from $(source* (.*))', p => {
//     let NEWS_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

//     if (p.source.value) {
//         NEWS_URL = `${NEWS_URL}&sources=${p
//             .source
//             .value
//             .toLowerCase()
//             .split(" ")
//             .join("-")}`;
//     }

//     api.request(NEWS_URL, (error, response, body) => {
//         const {articles} = JSON.parse(body);

//         if (!articles.length) {
//             p.play("Sorry la, Please try searching for news from different source");
//             return;
//         }

//         globalArticles = articles;

//         p.play({command: 'sourceNews', articles});
//         p.play(`Here are the (latest| recent) news ${p.source.value}`);
//         p.play('Would you like me to read the headlines?');
//         p.then(confirmation);
//     })
// })

// //news by terms
// intent('what\'s up with $(term* (.*))', p => {
//     let NEWS_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

//     if (p.term.value) {
//         NEWS_URL = `${NEWS_URL}&q=${p.term.value}`
//     }

//     api.request(NEWS_URL, (error, response, body) => {
//         const {articles} = JSON.parse(body);
//         if (!articles.length) {
//             p.play('Sorry, please try searching for something else.');
//             return;
//         }
//         globalArticles = articles;

//         p.play({command: 'sourceNews', articles});
//         p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);

//         p.play('Would you like me to read the headlines?');
//         p.then(confirmation);
//     })
// })

// //news by categories

// const CATEGORIES = [
//     'business',
//     'entertainment',
//     'general',
//     'health',
//     'science',
//     'sports',
//     'technology'
// ];
// const CATEGORIES_INTENT = `${CATEGORIES
//     .map(
//         (category) => `${category}~${category}`
//     )
//     .join('|')}|`;

// intent(
//     `(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
//     `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`,
//     (p) => {
//         let NEWS_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

//         if (p.C.value) {
//             NEWS_URL = `${NEWS_URL}&category=${p.C.value}`
//         }

//         api.request(NEWS_URL, (error, response, body) => {
//             const {articles} = JSON.parse(body);

//             if (!articles.length) {
//                 p.play('Sorry, please try searching for a different category.');
//                 return;
//             }

//             globalArticles = articles;

//             p.play({command: 'sourceNews', articles});

//             if (p.C.value) {
//                 p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
//             } else {
//                 p.play(`Here are the (latest|recent) news`);
//             }

//             p.play('Would you like me to read the headlines?');
//             p.then(confirmation);

//         });
//     }
// );

// const confirmation = context(() => {
//     intent('yes', async p => {
//         for (let i = 0; i < globalArticles.length; i++) {
//             p.play({command: "highlights", article: globalArticles[i]});
//             p.play(`${globalArticles[i].title}`)
//         }
//     })

//     intent('no', p => {
//         p.play('Sure, sounds good to me.');
//     })
// })

// intent('open (article|) (number|) $(number* (.*))', p => {
//     p.play({command: "open", number: p.number.value, articles: globalArticles});
// });

// intent('(go back|back)', p => {
//     p.play('sure, going back now');
//     p.play({command: 'sourceNews', articles: []})
// })