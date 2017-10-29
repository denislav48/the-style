import { templates } from 'templates'

const fashionController = function() {
    const fashionRef = firebase.database().ref('all/articles');
    let articles = [],
    url;

    fashionRef.once('value', function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {
            if(childSnapshot.val().mainCategory == 'fashion') {

                let cat = childSnapshot.val().mainCategory,
                idd = childSnapshot.key;
                url = `#/${cat}/${idd}`;

                let article = {
                    'title': childSnapshot.val().title.toUpperCase(),
                    'article': childSnapshot.val().article,
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
        templates.getPage('fashion', articles).then(() => {
           
            $('.boxx').click(function(ev){
                let i = $('.boxx').index($(ev.target).closest('.boxx'));
                window.location.href = articles[i].url;
               
            });
            
        });
        
    })
    
}


export { fashionController }