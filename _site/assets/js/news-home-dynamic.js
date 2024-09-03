document.addEventListener('DOMContentLoaded', function () {
  
    fetch('https://data.bgsandbox.com/oam-newsletter-articles/newsletter-data.JSON')
        .then(response => response.json())
        .then(data => {

            //console.log('JSON Data: ', data);
            let output = document.getElementById('news-home-row');
            const currentDate = new Date(); 
            const currentFiscal = getFiscalFullYearAndQuarter(currentDate);
            const dataFormatted = normalizeData(data);
              
            dataFormatted.forEach(item => {

                // Get fiscal year and quarter from date
                const articleFiscal = getFiscalFullYearAndQuarter(item.Date);
                const article = document.createElement('div');
                const targetAttribute = item['External'] ? ' target="_blank"' : '';
                article.className = 'grid-col-12 tablet-lg:grid-col-6 news-and-events__item-column margin-bottom-4';

                // Filter current articles
                if (articleFiscal === currentFiscal) {
                    article.innerHTML += `
                      <div class="news-and-events__item">
                         <span class="news-and-events__item-date">${articleFiscal}</span><br />
                            <h3 class="news-and-events__item-title margin-top-1 text-primary">
                                <a href="news-and-events/${item['Article URL']}" class="link text-primary news-and-events__item-link" ${targetAttribute}>
                                    ${item.Title}
                                </a>
                            </h3>
                          <p class="news-and-events__item-description">
                          ${item['Brief Description'] || (item.Content ? item.Content.split(/(?<=\.)\s/)[0] : "No summary available.")}
                          </p>
                      </div>
                `;
                output.append(article);
              } 

            });

        })
        .catch(error => {

            document.getElementById('no-data').innerHTML = 'News not found';

        });
});
