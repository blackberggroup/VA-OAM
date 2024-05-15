function getFiscalYearAndQuarter(date) {
    // Fiscal year starts in October, adjust if different
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
