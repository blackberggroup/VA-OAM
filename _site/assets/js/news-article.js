document.addEventListener("DOMContentLoaded", function() {
    const slug = getQueryVariable('article');
    let output = document.getElementById('template-output');
    let template = '';

    fetch('https://data.bgsandbox.com/oam-sharepoint-products/product-data.JSON') 
    .then(response => response.json())
    .then(data => {

    // Generate slug for each article
    const dataFormatted = data.map(item => ({
        ...item,
        slug: titleToSlug(item.Title)
    }));

    // Find article based on slug
    const article = dataFormatted.find(article => article.slug === slug); 
    if (article) {

        // TODO - update with item date when the new JSON is ready
        // TODO - update content when the new JSON is ready
        template += `
        <div class="grid-col-12 grid-offset-0 tablet-lg:grid-col-8 tablet-lg:grid-offset-2">
            <div class=" margin-top-6">
                <h1 class="margin-0 gradient-text" id="article-title">${article['Title']}</h1>
                <div class="text-bold text-primary" id="article-date">FY24 Q3</div>
            </div>
            <div class="article-body padding-top-5" id="article-content">
            ${article['Brief Description']}
            </div>
        </div>	 
      `;

      output.innerHTML = template;
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