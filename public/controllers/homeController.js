import { templates } from 'templates'
import 'jquery'

const homeController = function() {
    const homeRef = firebase.database().ref('all/articles');
    let articles = [],
    filtered = [],
    url;

    homeRef.on('value', function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {
            if(childSnapshot.val().category) {

                let cat = childSnapshot.val().mainCategory,
                subCat = childSnapshot.val().category,
                idd = childSnapshot.key;
                url = `#/${cat}/${subCat}/${idd}`;
            
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
              } else {

                let cat = childSnapshot.val().mainCategory,
                idd = childSnapshot.key;
                url = `#/${cat}/${idd}`;
                
                let article = {
                    'title': childSnapshot.val().title.toUpperCase(),
                    'article': childSnapshot.val().article,
                    'fragrances': childSnapshot.val().fragrances,
                    'mainCategory': childSnapshot.val().mainCategory,
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

        let reversedArcticles = [];
        let len = articles.length;
        for (let i = len-1; i >=0; i -= 1) {
            reversedArcticles.push(articles[i]);
        }
        templates.getPage('home', reversedArcticles)
        .then(() => {
            
             $('.boxx').click(function(ev){
                 let i = $('.boxx').index($(ev.target).closest('.boxx'));
                 window.location.href = reversedArcticles[i].url;
                
             });
    })
    .then(() => {
        $('.btn.btn-defaultt').on('click', function() {
            let btnVal = $('.form-control').val();
            if(btnVal !== '') {
             filtered =  reversedArcticles.filter((article) => {
                return article.title.indexOf(btnVal.toUpperCase()) >= 0;
            });
            templates.getPage('home', filtered)
            .then(() => {
                
                 $('.boxx').click(function(ev){
                     let i = $('.boxx').index($(ev.target).closest('.boxx'));
                     window.location.href = reversedArcticles[i].url;
                    
                 });
                 $('#homeBtn').click(function() {
                    templates.getPage('home', reversedArcticles);
                })
        })
        } else {
            templates.getPage('home', reversedArcticles)
            .then(() => {
                
                 $('.boxx').click(function(ev){
                     let i = $('.boxx').index($(ev.target).closest('.boxx'));
                     window.location.href = reversedArcticles[i].url;
                    
                 });
                 $('#homeBtn').click(function() {
                    templates.getPage('home', reversedArcticles);
                })
        })
        
        }
    })
    });
            
        })         
}



export { homeController }