document.addEventListener('DOMContentLoaded', function () {
  
    fetch('https://data.bgsandbox.com/oam-sharepoint-products/product-data.JSON')

        .then(response => response.json())
        .then(data => {

            let output = document.getElementById('template-output');
            let outputArchive = document.getElementById('newsletter-archive');
            let template = '';
            let templateArchive = '';
            const currentDate = new Date(); 
            const currentFiscal = getFiscalYearAndQuarter(currentDate);

            // Generate slug for each article
            const dataFormatted = data.map(item => ({
                ...item,
                slug: titleToSlug(item.Title)
              }));
              
            dataFormatted.forEach(item => {

              // Get fiscal year and quarter from date
              // TODO - update with item date when the new JSON is ready
              const articleDate = new Date();
              const articleFiscal = getFiscalYearAndQuarter(articleDate);

              // Filter current articles
              if (articleFiscal === currentFiscal) {
                template += `
                  <article class="usa-card newsletter-article__item grid-col-12 tablet:grid-col-6 tablet-lg:grid-col-4 desktop:grid-col-4">
                      <div class="usa-card__container shadow-3">
                          <div class="usa-card__media usa-card__media--exdent products-overview__item-header">
                              <div class="usa-card__img">
                                  <a href="/news-and-events/article/index.html?article=${item.slug}" class="display-block">
                                      <img loading="lazy" src="${item['Image URL']}" alt="${item.Title}" class="img-fluid lazy" />
                                  </a>
                              </div>
                          </div>
                          <div class="usa-card__body products-overview__item-body padding-top-2">
                              <h3 class="margin-0 line-height-sans-3">
                                  <a href="/news-and-events/article/index.html?article=${item.slug}" class="text-primary text-no-underline">
                                      ${item.Title}
                                  </a>
                              </h3>
                          </div>
                      </div>
                  </article>  
                `;
              } 
              // Filter archive articles
              // TODO - change to else statement when the new JSON is ready
              if (articleFiscal === currentFiscal) {
                templateArchive += `
                <article class="usa-card newsletter-article__item grid-col-12 tablet:grid-col-6 tablet-lg:grid-col-4 desktop:grid-col-4" data-jplist-item> 
                    <div class="usa-card__container shadow-3">
                        <div class="usa-card__media usa-card__media--exdent products-overview__item-header">
                            <div class="usa-card__img">
                            <a href="/news-and-events/article/index.html?article=${item.ID}">
                                <img loading="lazy" src="${item['Image URL']}" alt="${item.Title}" class="img-fluid" />
                            </a>
                            </div>
                        </div>
                        <div class="usa-card__body products-overview__item-body padding-top-2">
                            <h3 class="margin-0 line-height-sans-3"><a href="/news-and-events/article/index.html?article=${item.ID}" class="text-primary text-no-underline">${item.Title}</a></h3>
                            <span class="date"></span>
                        </div>
                    </div>
                </article>
              `;
              }
            })
    
            output.innerHTML = template;
            outputArchive.innerHTML = templateArchive;
            
        })
        .catch(error => console.error('Error:', error));
});