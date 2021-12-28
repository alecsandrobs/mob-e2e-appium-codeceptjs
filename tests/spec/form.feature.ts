import { CommonPage } from '../pages/common.page';
import { FormPage } from '../pages/form.page';
const I = actor()

Feature('Fill form');

Before(() => {
    I.tap('Formulário')
})

Scenario('Should fill field name', () => {
    const name = 'Joe Montana'
    I.fillField(FormPage.fieldName, name)
    I.see(name, FormPage.fieldName)
})

Scenario('Should select option in combo', () => {
    const optionSelect = "Nintendo Switch"
    FormPage.selectConsoleOption(optionSelect)
    I.see(optionSelect, FormPage.comboConsoleSelected)
})

Scenario('Filling form', () => {
    const name = 'John Joe Jones'
    const console = 'PS4'

    I.fillField(FormPage.fieldName, name)
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