import { templates } from 'templates'
import 'jquery'

const entertainmentController = function (params) {

    
    const entertainmentRef = firebase.database().ref('all/articles');
    let articles = [];

    let url;
    entertainmentRef.on('value', function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {
            if(childSnapshot.val().mainCategory == 'entertainment') {

                let cat = childSnapshot.val().mainCategory,
                subCat = childSnapshot.val().category,
                idd = childSnapshot.key;
                url = `#/${cat}/${subCat}/${idd}`;
              
                let article = {
                    'title': childSnapshot.val().title.toUpperCase(),
                    'article': childSnapshot.val().article,
                    'fragrances': childSnapshot.val().fragrances,
                    'mainCategory': childSnapshot.val().mainCategory.toUpperCase(),
                    'month': childSnapshot.val().month,
                    'date': childSnapshot.val().date,
                    'url': url
                };
            
            
                if(article.title.length > 20) {
                    article.size = 'big';
                } 

                articles.push(article);
            }
        })
        console.log(articles);
        templates.getPage('entertainment', articles).then(() => {
            $('.boxx').click(function(ev){
                let i = $(ev.target).index();
                window.location.href = articles[i].url;
            })
        });
    })
}

export {entertainmentController}