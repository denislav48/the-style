import { templates } from 'templates'

const fragrancesController = function() {
    const fragrancesRef = firebase.database().ref('all/articles');
    let articles = [];
    let url;



    fragrancesRef.once('value', function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {
            if(childSnapshot.val().mainCategory === 'fragrances') {
                let cat = childSnapshot.val().mainCategory,
                idd = childSnapshot.key;
                url = `#/${cat}/${idd}`;

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
        templates.getPage('fragrances', articles).then(() => {
            
             $('.boxx').click(function(ev){
                 let i = $('.boxx').index($(ev.target).closest('.boxx'));
                 window.location.href = articles[i].url;
                
             });
    })
})
}

export { fragrancesController }