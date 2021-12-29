import { CommonPage } from './common.page';
export class FormPage {

    static nameField = CommonPage.contentDesc('nome', 'person name')
    static comboConsole = CommonPage.contentDesc('console', 'on console combo')
    static comboConsoleSelected = CommonPage.resourceId('android:id/text1', 'on console combo selected')
    static comboConsoleOptions = (text: string) => locate(`//android.widget.CheckedTextView[@text='${text}']`).as(`on console option with text ${text}`)
    static selectConsoleOption = (option: string) => {
        actor().tap(this.comboConsole)
        actor().tap(this.comboConsoleOptions(option))
    }
    static checkbox = CommonPage.contentDesc('check', 'on checkbox')
    static isChecked = () => actor().grabAttributeFrom(this.checkbox, 'checked')
    static switch = CommonPage.contentDesc('switch', 'on switch')
    static isSwitchOn = () => actor().grabAttributeFrom(this.switch, 'checked')

    static dateField: any = (text: string) => locate(`//android.widget.TextView[@text='${text}']`)
    static dateFieldDefault: any = this.dateField('01/01/2000')
    static yearField: any = CommonPage.resourceId('android:id/date_picker_header_year', 'on year field')
    static years: any = () => CommonPage.resourceId('android:id/text1', 'years list')
    static year: any = (text: string) => this.years().withText(text)
    // static year: any = (text: string) => CommonPage.resourceId('android:id/text1', 'years list').withText(text)
    static firstYear: any = CommonPage.resourceId('android:id/text1', 'years list').first()
    static lastYear: any = locate(`//*[@resource-id='android:id/text1']`).last().as('last year')
    // static lastYear: any = CommonPage.resourceId('android:id/text1', 'years list').last()
    static atYear: any = (position: number = 1) => CommonPage.resourceId('android:id/text1', 'years list').at(position)
    static inYear: any = (year: string) => locate(`//android.widget.TextView[@text='${year}']`).as(`year ${year} in years list`)

    static selectYear = async (year: string) => {
        let found = false
        let count = 10
        while(count > 1 || found) {
            const amount = await actor().grabNumberOfVisibleElements(this.inYear(year))
            if(amount > 0) {
                actor().tap(this.inYear(year))
                break
            } else {
                actor().swipeDown(this.lastYear, 100, 10)
            }
            count--
        }
    }

    static previousMonth: any = CommonPage.contentDesc('Previous month', 'previous month')
    static nextMonth: any = CommonPage.contentDesc('Next month', 'next month')
    static currentMonth: any = CommonPage.resourceId('android:id/date_picker_header_date', 'current month')
    
    static selectMonth = async (month: string) => {
        const monthInit = 'Feb'
        const monthText: string = await actor().grabTextFrom(this.currentMonth)    
        if(monthText.includes(monthInit)){
            switch (month){
                case '1': repeatClick(this.previousMonth, 1); break;
                case '2': break;
                case '3': repeatClick(this.nextMonth, 1); break;
                case '4': repeatClick(this.nextMonth, 2); break;
                case '5': repeatClick(this.nextMonth, 3); break;
                case '6': repeatClick(this.nextMonth, 4); break;
                case '7': repeatClick(this.nextMonth, 5); break;
                case '8': repeatClick(this.nextMonth, 6); break;
                case '9': repeatClick(this.nextMonth, 7); break;
                case '10': repeatClick(this.nextMonth, 8); break;
                case '11': repeatClick(this.nextMonth, 9); break;
                case '12': repeatClick(this.nextMonth, 10); break;
                default: break;
            }
        } else {
            actor().assertFail(false, 'O mês inicial não é Fevereiro')
        }
    }

    static selectDate = async (date: string) => {
        const day: string = date.split('/')[0]
        const month: string = date.split('/')[1]
        const year: string = date.split('/')[2]
        await this.selectYear(year)
        await this.selectMonth(month)
        actor().tap(day)
        actor().tap('OK')
    }

}

const repeatClick = (element: any, times: number) => {
    for(let i=0; i<times; i++){
        actor().tap(element)
    }
}