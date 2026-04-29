import {test,expect} from '@playwright/test'
test.beforeEach(async({page})=>{
    await page.goto('/')
     await page.getByText('Forms').click()
      await page.getByText('Form Layouts').click()
})
test('Locator syntax rules',async({page})=>{
   //by tagname
   await page.locator('input').first().click()
   //by id
   page.locator('#inputEmail1')
   //by class value
   page.locator('.shape-rectangle')
   //by attribute
   page.locator('[placeholder="Email"]')
   //by class value(full)
   page.locator('[class=input-full-width size-medium status-basic shape-rectangle nb-transition"]')
   //combine different selection
   page.locator('input[placeholder="Email"][nbinput]')
   //by xpath(not recommended)
   page.locator('//*[@id="inputEmail1"]')
   //by partial text match
   page.locator(':text("Using")')
   //by exact text match
   page.locator(':text-is("Using the Grid")')

})
test('User facing locators',async({page})=>{
  await page.getByRole('textbox',{name:"Email"}).first().click()
  await page.getByRole('button',{name:"SIGN IN"}).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
  await page.getByTestId('SignIn').click()
  //await page.getByTitle('IoT Dashboard').click()
})
test('locating child elements', async({page})=>{
  //wait page.locator('nb-card nb-radio :text-is("option 1")').click()
  await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()
  await page.locator('nb-card').nth(3).getByRole('button').click()
})
test('locating parent elements',async({page})=>{
await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Email"}).click()
//ait page.locator(':text-is("using the grid")').locator('..').getByRole('textbox',{name:"Email"}).click()
})
test('reusing the locator',async({page})=>{
   const basicForm= page.locator('nb-card').filter({hasText:"Basic Form"})
   const emailField=basicForm.getByRole('textbox',{name:"Email"})

   await emailField.fill('test@test.com')
   await basicForm.getByRole('textbox',{name:"Password"}).fill(' Welcome123')
   await basicForm.locator('nb-checkbox').click()
   await basicForm.getByRole('button').click()
   await expect(emailField).toHaveValue('test@test.com')


})
test('extract diff values',async ({page})=>{
   //single test value
   const basicForm= page.locator('nb-card').filter({hasText:"Basic Form"})
   const buttonText=await basicForm.locator('button').textContent()
   expect(buttonText).toEqual('Submit')

//all text values
const allRadioButtonLabel=await page.locator('nb-radio').allTextContents()
expect(allRadioButtonLabel).toContain("Option 1")
//input value
const emailField=basicForm.getByRole('textbox',{name:"Email"})
await emailField.fill('test@test.com')
const emailValue=emailField.inputValue()
expect(emailValue).toEqual('test@test.com')
const placeHolderValue=await emailField.getAttribute('placeholder')
expect(placeHolderValue).toEqual('Email')
})
//general assertion
test('assertions',async ({page})=>{
    const basicFormButton= page.locator('nb-card').filter({hasText:"Basic Form"}).locator('button')
   const value=5
expect(value).toEqual(5)
const text=await basicFormButton.textContent()
expect(text).toEqual("Submit")
//Locator assertion
await expect(basicFormButton).toHaveText('Submit5')
//soft assertion
await expect.soft(basicFormButton).toHaveText('Submit5')
await basicFormButton.click()
})