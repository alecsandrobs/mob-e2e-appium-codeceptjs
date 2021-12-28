export class CommonPage {

    static contentDesc = (desc: string, named: string = '???') => locate(`//*[@content-desc='${desc}']`).as(named)
    static resourceId = (desc: string, named: string = '???') => locate(`//*[@resource-id='${desc}']`).as(named)
    static textView = (text: string, named: string = '???') => locate(`//android.widget.TextView[@text='${text}']`).as(named)

}