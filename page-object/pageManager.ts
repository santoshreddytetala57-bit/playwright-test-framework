import { Page } from "@playwright/test";
import {NavigationPage} from '../page-object/navigationPage'
import {FormLayoutsPage} from '../page-object/formLayoutsPage'
import { DatePickerPage } from '../page-object/datePickerPage'

export class PageManager{
    private readonly page:Page
    private readonly navigationPage:NavigationPage
    private readonly formLayoutPage:FormLayoutsPage
    private readonly datePickerPage:DatePickerPage

    constructor(page:Page){
        this.page=page
        this.navigationPage=new NavigationPage(this.page)
         this.formLayoutPage=new FormLayoutsPage(this.page)
          this.datePickerPage=new DatePickerPage(this.page)
    }
    navigateTo(){
        return this.navigationPage
    }
    onFormLayoutPage(){
        return this.formLayoutPage
    }
    onDatePickerPage(){
        return this.datePickerPage
    }

}
