
import {test,expect,Locator,Frame} from "@playwright/test"
import { url } from "inspector";

test("Handle All Iframes",async({page})=>{

    await page.goto("https://ui.vision/demo/webtest/frames/");
    const allFrames:Frame[]=page.frames();
    expect(allFrames).toHaveLength(7);

    //Frame 01
    const frame1=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
    if(frame1) await frame1.locator('[name="mytext1"]').fill("Aravind 01");
    else console.log("No Frame Found");

    //Frame 02
    await page.frameLocator('[src="frame_2.html"]').locator('[name="mytext2"]').fill("Engineer 02");

    //Frame 03
    
    const frame3=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
    if(frame3)
    {
        const childFrames=frame3.childFrames();
        console.log(childFrames.length);

        await childFrames[0].getByLabel('I am a human').check();
        const radio=childFrames[0].getByLabel("General Web Automation")
        await radio.check();

        await childFrames[0].locator('[jsname="wQNmvb"]').click();
        
    }

    // Frame 04
    await page.frameLocator('[src="frame_4.html"]').locator('[name="mytext4"]').fill("Engineer 04");


    await page.waitForTimeout(3000)


})