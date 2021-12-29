import { CommonPage } from '../pages/common.page';
import { FormPage } from '../pages/form.page';
const I = actor()

Feature('Fill form');

Before(() => {
    I.tap('Formulário')
})

Scenario('Should fill field name', () => {
    const name = 'Joe Montana'
    I.fillField(FormPage.nameField, name)
    I.see(name, FormPage.nameField)
})

Scenario('Should select option in combo', () => {
    const optionSelect = "Nintendo Switch"
    FormPage.selectConsoleOption(optionSelect)
    I.see(optionSelect, FormPage.comboConsoleSelected)
})

Scenario('Should interact with checkbox', async () => {
    // I.dontSeeCheckboxIsChecked(FormPage.checkbox) ### It is not working ###
    I.assertEqual(await FormPage.isChecked(), 'false', 'that checkbox should be unchecked')
    I.tap(FormPage.checkbox)
    I.assertEqual(await FormPage.isChecked(), 'true', 'that checkbox should be checked')
    // I.seeCheckboxIsChecked(FormPage.checkbox) ### It is not working ###
})

Scenario('Should interact with switch', async () => {
    I.assertEqual(await FormPage.isSwitchOn(), 'true', 'that switch should be on')
    I.tap(FormPage.switch)
    I.assertEqual(await FormPage.isSwitchOn(), 'false', 'that switch should be off')
    I.tap(FormPage.switch)
    I.assertEqual(await FormPage.isSwitchOn(), 'true', 'that switch should be on')
})

Scenario('Should interact with datepicker', async () => {
    I.tap(FormPage.dateFieldDefault)
    I.tap(FormPage.yearField)
    const date: string = '29/12/2021'
    await FormPage.selectDate(date)
    // await I.selectDate(date)
    I.seeElement(FormPage.dateField(date))
}).tag('@wip')

Scenario('Filling form', () => {
    const name = 'John Joe Jones'
    const console = 'PS4'

    I.fillField(FormPage.nameField, name)
    FormPage.selectConsoleOption(console)
    I.tap(FormPage.checkbox)
    I.tap('SALVAR')

    I.seeElement(CommonPage.textView(`Nome: ${name}`, 'registered name'))
    I.seeElement(CommonPage.textView(`Console: ${console.toLocaleLowerCase()}`, 'selected console'))
    I.seeElement(CommonPage.textView('Slider: 25', 'on slider percent'))
    I.seeElement(CommonPage.textView('Switch: On', 'on switch option'))
    I.seeElement(CommonPage.textView('Checkbox: Marcado', 'of checkbox'))
    I.seeElement(CommonPage.textView('Data: 01/01/2000', 'registered date'))
    I.seeElement(CommonPage.textView('Hora: 06:00', 'registered time'))
});

After(() => { })

// const isChecked = (element: any) => I.grabAttributeFrom(element, 'checked')