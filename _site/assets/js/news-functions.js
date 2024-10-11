/**
 * Get the fiscal year and quarter from a given date string.
 * @param {string} dateString - The date string to be processed.
 * @returns {string} The fiscal year and quarter in the format 'FYXX QX'.
 */
function getFiscalYearAndQuarter(dateString) {
    // Fiscal year starts in October, adjust if different
    const date = new Date(dateString);
    const fiscalYearStartMonth = 10; 
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    let fiscalYear;
    let quarter;

    if (month >= fiscalYearStartMonth) {
        fiscalYear = year + 1; 
        quarter = Math.ceil((month - fiscalYearStartMonth + 1) / 3);
    } else {
        fiscalYear = year;
        quarter = Math.ceil((month + 12 - fiscalYearStartMonth + 1) / 3);
    }

    return `FY${fiscalYear.toString().slice(-2)} Q${quarter}`;
}

/**
 * Get the fiscal year and quarter from a given date string.
 * @param {string} dateString - The date string to be processed.
 * @returns {string} The fiscal year and quarter in the format 'FYXX QX'.
 */
function getFiscalFullYearAndQuarter(dateString) {
    // Fiscal year starts in October, adjust if different
    const date = new Date(dateString);
    const fiscalYearStartMonth = 10; 
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    let fiscalYear;
    let quarter;

    if (month >= fiscalYearStartMonth) {
        fiscalYear = year + 1; 
        quarter = Math.ceil((month - fiscalYearStartMonth + 1) / 3);
    } else {
        fiscalYear = year;
        quarter = Math.ceil((month + 12 - fiscalYearStartMonth + 1) / 3);
    }

    return `FY${fiscalYear.toString()} Q${quarter}`;
}

/**
 * Convert a title to a slug.
 * @param {string} title - The title to be converted.
 * @returns {string} The slugified title.
 */
function titleToSlug(title) {
    return title
        .trim()
        .toLowerCase() 
        .replace(/[^a-z0-9 -]/g, '') 
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
  }

/**
 * Find an image with a filename starting with '1'.
 * @param {Array} images - The array of image objects.
 * @returns {Object} The found image object or the first image if none found.
 */
function findImageWithFilenameStartingWith1(images) {
    return images.find(image => {
        const filename = image.URL.split('/').pop();
        return filename.startsWith('1') || filename.startsWith('01');
    }) || images[0];
}

/**
 * Remove images with filenames starting with '1' from an array.
 * @param {Array} array - The array of image objects.
 * @returns {Array} The array with the specified images removed.
 */
function removeImagesStartingWith1(array) {
    const imageToRemove = array.find(image => {
        const filename = image.URL.split('/').pop();
        return /^0?1/.test(filename); // Check if the filename starts with '1' or '01'
    });

    if (imageToRemove) {
        return array.filter(image => image !== imageToRemove);
    }

    return array;
}

/**
 * 
 * @param {Object} item - The item containing the Article URL.
 * @returns {string} The updated Article URL if an external link is found, otherwise the original Article URL.
 */
function getArticleLink(item) {
    const internalDomain = 'https://dvagov.sharepoint.com/sites/vhaoam/SitePages/';
    const articleUrl = item['Article URL'];
    const title = item['Title'];
    const slug = titleToSlug(title);

    // Check if the Article URL is an internal link
    if (articleUrl.includes(internalDomain)) {
        return "article/index.html?article=" + slug;
    } 

    // Check if the Article URL is empty
    else if (articleUrl === "") {
        return "article/index.html?article=" + slug;
    } 
    
    else {
        return articleUrl;
    }
}

/**
 * Normalize  data.
 * @param {Array} array - The array of article objects.
 * @returns {Array} The array with normalized data.
 */
function normalizeData(data) {
    return data.map(item => {
        // Generate slug from title
        const slug = titleToSlug(item.Title);

        // Get and process the article link
        let link = getArticleLink(item);

        // Determine if the link is internal or external
        const isInternalLink = link.includes('article/index.html?article');
        const externalLink = link && !isInternalLink;

        return {
            ...item,
            slug,
            'Article URL': link,
            'External': externalLink
        };
    });
}

/**
 * Get the previous fiscal year and quarter from a given date string.
 * @param {string} dateString - The date string to be processed.
 * @returns {string} The previous fiscal year and quarter in the format 'FYXX QX'.
 */
function getPreviousFiscalQuarter(dateString) {
    const date = new Date(dateString);
    const fiscalYearStartMonth = 10;
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    let fiscalYear;
    let quarter;

    if (month >= fiscalYearStartMonth) {
        fiscalYear = year + 1;
        quarter = Math.ceil((month - fiscalYearStartMonth + 1) / 3);
    } else {
        fiscalYear = year;
        quarter = Math.ceil((month + 12 - fiscalYearStartMonth + 1) / 3);
    }

    if (quarter === 1) {
        fiscalYear -= 1;
        quarter = 4;
    } else {
        quarter -= 1; 
    }

    return `FY${fiscalYear.toString()} Q${quarter}`;
}
