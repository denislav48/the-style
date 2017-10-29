import { templates } from 'templates'
import 'jquery'

const subCategoryController = function (params) {
    let url;

    let subCategory = params.category.toUpperCase();
    const subRef = firebase.database().ref('all/articles');
    let articles = [];

    subRef.on('value', function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {

            console.log(childSnapshot.val().category);
            if(childSnapshot.val().category === subCategory) {
              let cat = childSnapshot.val().mainCategory,
              subCat = childSnapshot.val().category,
              idd = childSnapshot.key;
              url = `#/${cat}/${subCat}/${idd}`;
              console.log(url);
                let article = {
                    'title': childSnapshot.val().title.toUpperCase(),
                    'article': childSnapshot.val().article,
                    'fragrances': childSnapshot.val().fragrances,
                    'mainCategory': childSnapshot.val().mainCategory,
                    'category': childSnapshot.val().category,
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
        templates.getPage('subCategory', articles).then(() => {
            $('.boxx').click(function(ev){
                let i = $(ev.target).index();
                window.location.href = articles[i].url;
            });
           
        });
        
    })
}

export {subCategoryController}