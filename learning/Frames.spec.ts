//Handle Frames
// 1) page.frame();
// 2) page.frameLocator();

import {test,expect,Locator,Frame} from "@playwright/test"


test("Frames",async ({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frames=page.frames();
    console.log(frames.length)
})

test("Approach 01: iframe",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //Approach 01- using page.frame(); 
    const frames=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});

    if(frames)
    {
        await frames.locator('[name="mytext1"]').fill("QA Engineer");
        // await frames.fill("#mytext1","QA Engineer");
    }
    else
    {
        console.log("NO Frames are found!!!");
    }
    await page.waitForTimeout(3000)
})
test("Approach 02: iframe",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    await page.frameLocator('[src="frame_2.html"]').locator('[name="mytext2"]').fill("Iframes");
    await page.waitForTimeout(3000)
})




test.only("Child iframes",async ({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame=page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3.html"});
    
    if(frame)
    {
        frame.locator('[name="mytext3"]').fill("Iframe-01 test data");
        const childFrames:Frame[]=frame.childFrames();
        console.log("Length of CF: ", childFrames.length)
        const radio=childFrames[0].getByLabel("General Web Automation")
        await radio.check();
        expect(radio).toBeChecked();
    }
    else
    {
        console.log("No Iframe found")
    }
    await page.waitForTimeout(3000)
})

