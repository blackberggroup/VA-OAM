document.addEventListener('DOMContentLoaded', function () {
  
    fetch('https://data.bgsandbox.com/oam-newsletter-articles/newsletter-data.JSON')
        .then(response => response.json())
        .then(data => {

            //console.log('JSON Data: ', data);
            let output = document.getElementById('template-output');
            let outputArchive = document.getElementById('newsletter-archive');
            const currentDate = new Date(); 
            const currentFiscal = getFiscalYearAndQuarter(currentDate);
            const dataFormatted = normalizeData(data);
              
            dataFormatted.forEach(item => {

                // Get fiscal year and quarter from date
                const articleFiscal = getFiscalYearAndQuarter(item.Date);
                const featuredImage = findImageWithFilenameStartingWith1(item.Image);
                const article = document.createElement('article');
                const targetAttribute = item['External'] ? ' target="_blank"' : '';
                article.className = 'usa-card newsletter-article__item grid-col-12 tablet:grid-col-6 tablet-lg:grid-col-4 desktop:grid-col-4';

                // Filter current articles
                if (articleFiscal === currentFiscal) {
                    article.innerHTML += `
                      <div class="usa-card__container shadow-3">
                          <div class="usa-card__media usa-card__media--exdent products-overview__item-header">
                              <div class="usa-card__img">
                                  <a href="${item['Article URL']}" class="display-block" ${targetAttribute}>
                                      <img loading="lazy" src="${featuredImage.URL}" alt="${featuredImage.Alt}" class="img-fluid lazy" />
                                  </a>
                              </div>
                          </div>
                          <div class="usa-card__body products-overview__item-body padding-top-2">
                              <h3 class="margin-0 line-height-sans-3">
                                  <a href="${item['Article URL']}" ${targetAttribute} class="text-primary text-no-underline">
                                      ${item.Title}
                                  </a>
                              </h3>
                          </div>
                      </div>
                `;
                output.append(article);
              } 
              // Filter archive articles
              else if (articleFiscal !== currentFiscal) {
                article.setAttribute('data-jplist-item', '');

                article.innerHTML += `
                    <div class="usa-card__container shadow-3">
                        <div class="usa-card__media usa-card__media--exdent products-overview__item-header">
                            <div class="usa-card__img">
                                <a href="${item['Article URL']}" ${targetAttribute}>
                                    <img loading="lazy" src="${item.Image[0].URL}" alt="${item.Image[0].Alt}" class="img-fluid" />
                                </a>
                            </div>
                        </div>
                        <div class="usa-card__body products-overview__item-body padding-top-2">
                            <h3 class="margin-0 line-height-sans-3"><a href="${item['Article URL']}" ${targetAttribute} class="text-primary text-no-underline">${item.Title}</a></h3>
                            <span class="date">${item.Date}</span>
                        </div>
                    </div>
              `;

              outputArchive.append(article);
              }

            });

            if(outputArchive.innerHTML === "") {
                document.getElementById("external-articles").style.display = "none";
            }

            jplist.init();
        })
        .catch(error => {

            document.getElementById('no-data').innerHTML = 'News not found';
            document.getElementById("external-articles").style.display = "none";

        });
});

