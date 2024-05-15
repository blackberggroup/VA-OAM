document.addEventListener("DOMContentLoaded", function() {
    const articleId = getQueryVariable('article');
    fetch('https://data.bgsandbox.com/oam-sharepoint-products/product-data.JSON') // Assumes your JSON file is accessible at this path
    .then(response => response.json())
    .then(data => {
    const article = data.find(article => article.ID === articleId); // Adjust this according to your JSON structure
    if (article) {
        document.getElementById('article-breadcrumb').innerHTML = article['Title'];
        document.getElementById('article-title').innerHTML = article['Title'];
        document.getElementById('article-content').innerHTML = article['Brief Description'];
    } else {
        console.error('Article not found');
        document.getElementById('article-title').innerHTML = 'Article not found';
    }
    })
    .catch(error => console.error('Error loading the articles:', error));
});

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
        }
    }
}