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

    static seekbar = CommonPage.contentDesc('slid', 'on seekbar')
    // static seekbar = locate('//android.widget.SeekBar').as('seekbar')

    static calcDiff = (percentual: number) => {
        let diff: number = 0
        if(percentual >= 0 && percentual <= 2) diff = 75
        if(percentual >= 3 && percentual <= 15) diff = 70
        if(percentual >= 16 && percentual <= 25) diff = 60
        if(percentual >= 26 && percentual <= 29) diff = 55
        if(percentual >= 30 && percentual <= 35) diff = 50
        if(percentual >= 36 && percentual <= 39) diff = 45
        if(percentual >= 40 && percentual <= 45) diff = 40
        if(percentual >= 46 && percentual <= 49) diff = 35
        if(percentual >= 50 && percentual <= 55) diff = 30
        if(percentual >= 56 && percentual <= 59) diff = 25
        if(percentual >= 60 && percentual <= 65) diff = 20
        if(percentual >= 66 && percentual <= 69) diff = 15
        if(percentual >= 70 && percentual <= 75) diff = 10
        if(percentual >= 76 && percentual <= 79) diff = 5
        if(percentual >= 80 && percentual <= 85) diff = 0
        if(percentual >= 86 && percentual <= 89) diff = -5
        if(percentual >= 90 && percentual <= 95) diff = -10
        if(percentual >= 96 && percentual <= 99) diff = -15
        if(percentual === 100) diff = -20
        return diff
    }
    
    static tapOnSeekBarAt = async (percent: number) => {
        const elementBoundingRect: any = await actor().grabElementBoundingRect(FormPage.seekbar)
        await actor().say(`I tap on ${percent}% on seekbar`)
            await actor().touchPerform([{
                action: 'tap',
                options: {
                    x: ((elementBoundingRect.width*percent)/100)+this.calcDiff(percent),
                    y: elementBoundingRect.y
                },
                as: `on ${percent}%`
            }]);
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

    static repeatClick = (element: any, times: number) => {
        for(let i=0; i<times; i++){
            actor().tap(element)
        }
    }
    
    static selectMonth = async (month: string) => {
        const monthInit = 'Feb'
        const monthText: string = await actor().grabTextFrom(this.currentMonth)    
        if(monthText.includes(monthInit)){
            switch (month){
                case '1': this.repeatClick(this.previousMonth, 1); break;
                case '2': break;
                case '3': this.repeatClick(this.nextMonth, 1); break;
                case '4': this.repeatClick(this.nextMonth, 2); break;
                case '5': this.repeatClick(this.nextMonth, 3); break;
                case '6': this.repeatClick(this.nextMonth, 4); break;
                case '7': this.repeatClick(this.nextMonth, 5); break;
                case '8': this.repeatClick(this.nextMonth, 6); break;
                case '9': this.repeatClick(this.nextMonth, 7); break;
                case '10': this.repeatClick(this.nextMonth, 8); break;
                case '11': this.repeatClick(this.nextMonth, 9); break;
                case '12': this.repeatClick(this.nextMonth, 10); break;
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

    static getHoursFromTime = (time: string) => {
        return Number.parseInt(time.split(':')[0]).toString()
    }
    
    static getMinutesFromTime = (time: string) => {
        return Number.parseInt(time.split(':')[1]).toString()
    }
    
    static getTimeDisplay = (time:string) => {
        return `${this.getHoursFromTime(time)}:${this.getMinutesFromTime(time)}`
    }
    
    static selectTime = (time: string) => {
        const timeDefault = '06:00'
        const hour = this.getHoursFromTime(time)
        let min = this.getMinutesFromTime(time)
        actor().tap(timeDefault)
        actor().tap(CommonPage.contentDesc(hour, `on hour ${hour}`))
        actor().tap(CommonPage.contentDesc(min, `on minute(s) ${min}`))
        actor().tap('OK')
    }
    
    static timeDisplayed = (time: string) => locate(`//android.widget.TextView[@text='${time}']`).as(`time with text ${time}`)

}