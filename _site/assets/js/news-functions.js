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