const Helper = require('@codeceptjs/helper');
// const I = actor()

class FormActions extends Helper {

    lastYear: any = locate(`//*[@resource-id='android:id/text1']`).last().as('last year')
    inYear: any = (year: string) => locate(`//android.widget.TextView[@text='${year}']`).as(`year ${year} in years list`)

    async selectYear(year: string) {
        console.log('1')
        let found = false
        console.log('2')
        let count = 10
        console.log('3')
        while(count > 1 || found) {
            console.log('4')
            const amount = await actor().grabNumberOfVisibleElements(this.inYear(year))
            console.log('5')
            if(amount > 0) {
                console.log('6')
                actor().tap(this.inYear(year))
                console.log('7')
                break
            } else {
                console.log('8')
                actor().swipeDown(this.lastYear, 100, 10)
                console.log('9')
            }
            console.log('10')
            count--
            console.log('11')
        }
    }

    previousMonth: any = locate(`//*[@content-desc='Previous month']`).as('previous month')
    nextMonth: any = locate(`//*[@content-desc='Next month']`).as('next month')
    currentMonth: any = locate(`//*[@resource-id='android:id/date_picker_header_date']`).as('current month')

    repeatClick(element: any, times: number) {
        for(let i=0; i<times; i++){
            actor().tap(element)
        }
    }

    async selectMonth(month: string) {
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

    async selectDate(date: string) {
        const day: string = date.split('/')[0]
        const month: string = date.split('/')[1]
        const year: string = date.split('/')[2]
        await this.selectYear(year)
        await this.selectMonth(month)
        actor().tap(day)
        actor().tap('OK')
    }
}

export = FormActions