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

    return `FY${fiscalYear.toString().slice(-2)}Q${quarter}`;
}

function titleToSlug(title) {
    return title
      .toLowerCase() 
      .replace(/[^a-z0-9 -]/g, '') 
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

// Function to find the image with filename starting with "1" or default to the first item
function findImageWithFilenameStartingWith1(images) {
    return images.find(image => {
        const filename = image.URL.split('/').pop();
        return filename.startsWith('1');
    }) || images[0];
}
