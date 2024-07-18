document.addEventListener("DOMContentLoaded", function() {
    const slug = getQueryVariable('article');
    let output = document.getElementById('template-output');
    let template = '';

    fetch('https://data.bgsandbox.com/oam-newsletter-articles/newsletter-data.JSON') 
    .then(response => response.json())
    .then(data => {

    // Generate slug for each article
    // TODO - change to format after finding article
    const dataFormatted = data.map(item => ({
        ...item,
        slug: titleToSlug(item.Title),
        Content: item.Content.replace(/\\\"/g, '"'),
        FiscalDate: getFiscalYearAndQuarter(item.Date)
    }));

    // Find article based on slug
    const article = dataFormatted.find(article => article.slug === slug); 

    // Set breadcrumb with title
    document.getElementById("article-breadcrumb").innerHTML = article.Title;

    // Find featured image 
    const featuredImage = findImageWithFilenameStartingWith1(article.Image);

    // Split the content by <br><br> tags
    let contentParts = article.Content.split('\u003Cbr\u003E\u003Cbr\u003E');
    let imageIndex = 0;
    let contentWithImages = '';

    // Insert images at every other split point
    for (let i = 0; i < contentParts.length; i++) {
        contentWithImages += contentParts[i];
        if (i % 2 === 1 && imageIndex < article.Image.length) {
            contentWithImages += `<img src="${article.Image[imageIndex].URL}" alt="${article.Image[imageIndex].Alt}" class="inserted-image">`;
            imageIndex++;
        }
        if (i < contentParts.length - 1) {
            contentWithImages += '<br><br>';
        }
    }

    // Append any remaining images at the end if not all images have been used
    while (imageIndex < article.Image.length) {
        contentWithImages += `<img src="${article.Image[imageIndex].URL}" alt="${article.Image[imageIndex].Alt}" class="inserted-image">`;
        imageIndex++;
    }

    if (article) {

        template += `
        <div class="grid-col-12 grid-offset-0 tablet-lg:grid-col-8 tablet-lg:grid-offset-2">
            <div class=" margin-top-6">
                <h1 class="margin-0 gradient-text" id="article-title">${article['Title']}</h1>
                <div class="text-bold text-primary" id="article-date">${article['FiscalDate']}</div>
            </div>
            <div class="article-body padding-top-5" id="article-content">
             ${contentWithImages}
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