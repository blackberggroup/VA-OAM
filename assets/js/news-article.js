document.addEventListener("DOMContentLoaded", function() {
    const slug = getQueryVariable('article');
    let output = document.getElementById('template-output');
    let template = '';

    fetch('https://data.bgsandbox.com/oam-newsletter-articles/newsletter-data.JSON') 
    .then(response => response.json())
    .then(data => {

    // Find article based on slug
    const tempArticle = data.find(item => titleToSlug(item.Title) === slug);

    // Format the data in the found article
    const article = {
        ...tempArticle,
        slug: titleToSlug(tempArticle.Title),
        Content: tempArticle.Content.replace(/\\\"/g, '"'),
        FiscalDate: getFiscalYearAndQuarter(tempArticle.Date)
    };

    // Generate slug for each article
    // TODO - change to format after finding article
    // const dataFormatted = data.map(item => ({
    //     ...item,
    //     slug: titleToSlug(item.Title),
    //     Content: item.Content.replace(/\\\"/g, '"'),
    //     FiscalDate: getFiscalYearAndQuarter(item.Date)
    // }));

    // Find article based on slug
    //const article = dataFormatted.find(article => article.slug === slug); 

    if (article) {

        // Set breadcrumb with title
        document.getElementById("article-breadcrumb").innerHTML = article.Title;

        // Split the content by <br><br> tags
        let contentParts = article.Content.split('\u003Cbr\u003E\u003Cbr\u003E');
        let midpoint = Math.floor(contentParts.length / 2);

        // Combine content parts and insert images at the midpoint
        const images = removeImagesStartingWith1(article.Image);
        let contentWithImages = '';
        for (let i = 0; i < contentParts.length; i++) {
            contentWithImages += contentParts[i];
            if (i === midpoint) {
                contentWithImages += '<div class="grid grid-image"><div class="grid-col grid-col--1"></div><div class="grid-col grid-col--2"></div><div class="grid-col grid-col--3"></div>';
                images.forEach((image,index) => {
                    if (index % 3 === 0) {
                        contentWithImages += `<div class="grid-item"><img src="${image.URL}" alt="${image.Alt}" class="inserted-image"></div>`;
                    } else {
                        contentWithImages += `<div class="grid-item"><img src="${image.URL}" alt="${image.Alt}" class="inserted-image"></div>`;
                    }
                });
                contentWithImages += '</div>';
            }
            if (i < contentParts.length - 1) {
                contentWithImages += '\u003Cbr\u003E\u003Cbr\u003E';
            }
        }

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

        $('.grid').colcade({
            columns: '.grid-col',
            items: '.grid-item'
        });
          
    } else {
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