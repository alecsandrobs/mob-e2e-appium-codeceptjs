import { CommonPage } from './common.page';
export class FormPage {

    static fieldName = CommonPage.contentDesc('nome', 'person name')
    static comboConsole = CommonPage.contentDesc('console', 'on console combo')
    static comboConsoleSelected = CommonPage.resourceId('android:id/text1', 'on console combo selected')
    static comboConsoleOptions = (text: string) => locate(`//android.widget.CheckedTextView[@text='${text}']`).as(`on console option with text ${text}`)
    static selectConsoleOption = (option: string) => {
        actor().tap(this.comboConsole)
        actor().tap(this.comboConsoleOptions(option))
    }
    static checkbox = CommonPage.contentDesc('check', 'on checkbox')

}