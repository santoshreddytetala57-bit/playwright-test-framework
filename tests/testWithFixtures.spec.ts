import {test} from '../test-options'
import {faker} from '@faker-js/faker'


test('paramaterized methods',async({pageManager}) =>{
    const randomFullName=faker.person.fullName()
    const randomEmail=`$(randomFullName.replace(' ',''))$(faker.number.int(1000))}@test.com`

     await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectingOption('process.env.USERNAME','process.env.PASSWORD','Option 1')
     await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckBox(randomFullName,randomEmail,false)
     
})