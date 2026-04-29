import {test,expect} from '@playwright/test'
import {PageManager} from '../page-object/pageManager'
import {faker} from '@faker-js/faker'
test.beforeEach(async({page})=>{
    await page.goto('/')

})
test('navigate to form page @smoke',async({page}) =>{
    const pm=new PageManager(page)
    const randomFullName =faker.person.fullName()
    const randomEmail=`${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
   await pm.navigateTo().formLayoutsPage()
   await pm.navigateTo().dataPickerPage()
   await pm.navigateTo().smartTablePage()
   await pm.navigateTo().toastrPage()
   await pm.navigateTo().tooltipPage()

})
test('paramaterized methods @smoke',async({page}) =>{
    const pm=new PageManager(page)
     await pm.navigateTo().formLayoutsPage()
     await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectingOption('process.env.USERNAME','process.env.PASSWORD','Option 1')
      await page.screenshot({path:'screenshots/formLayoutsPage.png'})
     await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckBox(randomFullName,randomEmail,false)
     await page.locator('nb-card',{hasText:"Inline form"}).screenshot({path:'screenshots/inlineForm.png'})
     const buffer=await page.screenshot()
     console.log(buffer.toString('base64'))
     await page.screenshot({path:'screenshots/formLayoutsPage.png'})
     await pm.navigateTo().dataPickerPage()
     await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
     await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6,15)

})