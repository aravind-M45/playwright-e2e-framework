import {test,expect} from "@playwright/test";
import {userLogin,downloadAndValidateFile} from "../src/utils/common";
import ExcelJs from "exceljs"

test("Validate Downloaded File content",async ({page})=>{

    await userLogin(page);
    await downloadAndValidateFile(page,"Download Excel","FullCourse.xlsx");
    const downloadedFilePath="./download/FullCourse.xlsx";
    const workbook=new ExcelJs.Workbook();
    await workbook.xlsx.readFile(downloadedFilePath);
    const sheet=workbook.getWorksheet("TestersTalk");

    if (!sheet) {
        throw new Error("Worksheet 'TestersTalk' was not found in the downloaded workbook.");
    }
    const row=sheet.getRow(2);

    const channel=row.getCell(1).text;
    console.log("Channel Name: ",channel)
    expect(channel).toBe("Testers Talk")

    const channelLink=row.getCell(3).hyperlink;
    console.log("Channel Link: ",channelLink)
    expect(channelLink).toBe("https://www.youtube.com/@testerstalk")

    const date=row.getCell(4).value;
    console.log("Date: ",date)
    expect(date).toBeInstanceOf(Date);
    expect((date as Date).toISOString()).toBe('2025-09-05T00:00:00.000Z');

    const number=row.getCell(5).value;
    console.log("Number: ",number)
    expect(number).toBe(1234567890)


})
