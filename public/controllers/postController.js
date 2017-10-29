import { templates } from 'templates'
import 'jquery'
const postController = function (params) {
    let subCategory;
    let obj = [];
    let url;
    if(params.length>1){
        subCategory = params.category.toUpperCase();
    }
        let id = params.id;
        const subRef = firebase.database().ref('all/articles');
        let articles = [],
        articlesPlusRecent = [];
        let c = -1;

        subRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
    
                if(subCategory) {
                if(childSnapshot.val().category === subCategory && childSnapshot.key === id) {
                  
                    let article = {
                        'title': childSnapshot.val().title.toUpperCase(),
                        'article': childSnapshot.val().article,
                        'fragrances': childSnapshot.val().fragrances,
                        'mainCategory': childSnapshot.val().mainCategory,
                        'comments': childSnapshot.val().comments,
                        'category': childSnapshot.val().category,
                        'month': childSnapshot.val().month,
                        'date': childSnapshot.val().date,
                        'id': childSnapshot.key
                    };
                
                
                    if(article.title.length > 20) {
                        article.size = 'big';
                    } 
    
                    articles.push(article);
                }
            } else {
                if(childSnapshot.key === id) {
                    let article = {
                        'title': childSnapshot.val().title.toUpperCase(),
                        'article': childSnapshot.val().article,
                        'fragrances': childSnapshot.val().fragrances,
                        'mainCategory': childSnapshot.val().mainCategory,
                        'comments': childSnapshot.val().comments,
                        'month': childSnapshot.val().month,
                        'date': childSnapshot.val().date,
                        'id': childSnapshot.key
                    };
                
                
                    if(article.title.length > 20) {
                        article.size = 'big';
                    } 
    
                    articles.push(article);
                }
            }
            })

            let recentPostsRef = firebase.database().ref('all/articles').limitToLast(4);
            let recentArticles = [];

            recentPostsRef.on('value', (snapshot) => {
                articlesPlusRecent = articles.slice(0);
                snapshot.forEach((childSnap) => {
                    let recentArticle= {};

                    
                    if(childSnap.val().category){

                        let mainCat = childSnap.val().mainCategory,
                        cat = childSnap.val().category,
                        idd = childSnap.key;
                        url = `#/${mainCat}/${cat}/${idd}`;

                    recentArticle = {
                        'rtitle': childSnap.val().title.toUpperCase(),
                        'rarticle': childSnap.val().article,
                        'rmainCategory': childSnap.val().mainCategory,
                        'rcategory': childSnap.val().category,
                        'rmonth': childSnap.val().month,
                        'rdate': childSnap.val().date,
                        'rid': childSnap.key,
                        'ruserPic': childSnap.val().userPic,
                        'url': url
                    };
            
                } else {
                    let mainCat = childSnap.val().mainCategory,
                    idd = childSnap.key;
                    url = `#/${mainCat}/${idd}`;

                     recentArticle = {
                        'rtitle': childSnap.val().title.toUpperCase(),
                        'rarticle': childSnap.val().article,
                        'rmainCategory': childSnap.val().mainCategory,
                        'rmonth': childSnap.val().month,
                        'rdate': childSnap.val().date,
                        'rid': childSnap.key,
                        'ruserPic': childSnap.val().userPic,
                        'url': url
                    };
            
                }
               
                    // recentArticles.push(recentArticle);
                    articlesPlusRecent.push(recentArticle);
                    
                })
                 
            })
      
            // articles.push(recentArticles);
            templates.getPage('post', articlesPlusRecent).then(() => {

                articlesPlusRecent = articles;
                $('.submit-comment').on('click', function() {
                    // A post entry.
                    let postData = {
                      'user': $('.user-name').val(),
                      'id': id,
                      'comment': $('.user-comment').val(),
                      'url': $('.user-avatar').val(),
                    };
                  
                    // Get a key for a new Post.
                    var newPostKey = firebase.database().ref('all/articles').child(id + '/comments').push().key;
                  
                    // Write the new post's data simultaneously in the posts list and the user's post list.
                    var updates = {};
                  
                    updates['/all/articles/' + id + '/comments/' + newPostKey] = postData;

                  
                    return firebase.database().ref().update(updates);
                  })
                  
            });
        })
        

        // Update with comments

     
    }
    
    export {postController}