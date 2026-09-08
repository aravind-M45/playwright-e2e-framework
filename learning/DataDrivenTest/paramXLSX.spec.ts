
import {test,expect} from "@playwright/test"
import fs from 'fs'
import * as XLSX from "xlsx"

//File -> workbook -> sheet -> rows&columns
const path='learning/TestData/playwright_test_data.xlsx';
const workbook=XLSX.read(path);
const sheetName=workbook.SheetNames[0];
const worksheet=workbook.Sheets[sheetName];

//convert XLSX to JSON
const LoginData=XLSX.utils.sheet_to_json(worksheet);


test("Login with valid Credientials",async ({page})=>{
    
})