import { test, expect } from '@playwright/test';
const ExcelJS = require('exceljs');

// This function reads an Excel file, searches for a specific text, and find the price column of that text and change the price of that text.
async function writeExcelData(searchText,replaceText,change,filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1'); // Get the first worksheet
    const output = await readExcelData(worksheet,searchText);
    
    const cell = worksheet.getCell(output.row, output.column+change.columnChange);  
    cell.value = replaceText; // Change the value of the cell
    await workbook.xlsx.writeFile(filePath); // Save the changes to the file
}

async function readExcelData(worksheet, searchText) {
    let output = {row:-1,column:-1};
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber; // Store the row number where 'Banana' is found
                output.column = colNumber; // Store the column number where 'Banana' is found
            }
        });
    });
    return output;

}
//writeExcelData("Mango",350,{rowChange:0,columnChange:2},"C:\\Manoj Kumar Behara\\manoj\\Playwright Project\\exceldownloadTest.xlsx");       

test('Excel Upload and Download Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    // Download the Excel file
    const downloadpromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadpromise;
    writeExcelData("Mango",350,{rowChange:0,columnChange:2},"C:\\Users\\IFOCUS\\Downloads\\download.xlsx");
    // Click on the upload file button
    await page.locator("#fileinput").click();
    // Upload the modified Excel file
    await page.locator("#fileinput").setInputFiles("C:\\Users\\IFOCUS\\Downloads\\download.xlsx");

    //await expect(page.locator('text=Upload successful')).toBeVisible();
});
// mared with test.only
test('Excel Upload and Download Test two', async ({ page }) => {
    
    const textSearch = "Banana";
    const updateValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    // Wait for and handle download
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()
    ]);

    // Get the real file name and save to a known path
    const fileName = download.suggestedFilename();
    const downloadPath = `C:\\Users\\IFOCUS\\Downloads\\${fileName}`;
    await download.saveAs(downloadPath); // Save the file using the actual name

    // Modify the Excel file
    await writeExcelData(textSearch, updateValue, { rowChange: 0, columnChange: 2 }, downloadPath);

    // Upload the modified file
    await page.locator("#fileinput").setInputFiles(downloadPath);

    // Optional assertion
     await expect(page.locator('text=Updated Excel Data Successfully.')).toBeVisible();

     const textlocator = page.getByText(textSearch);
     const desiredRow = page.getByRole('row').filter({ has: textlocator });
     await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});
