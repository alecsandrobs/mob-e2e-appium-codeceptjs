const I = actor()

Feature('Fill form');

Before(() => {
    I.tap('Formulário')
})

Scenario('Filling form', () => {
    I.fillField(fieldName('Nome'), 'John Joe Jones')
    
    I.tap(combo)
    I.tap('PS4')
    
    I.tap(checkBox)

    I.tap('SALVAR')

    I.seeElement(textView('Nome: John Joe Jones'))
    I.seeElement(textView('Console: ps4'))
    I.seeElement(textView('Slider: 25'))
    I.seeElement(textView('Switch: On'))
    I.seeElement(textView('Checkbox: Marcado'))
    I.seeElement(textView('Data: 01/01/2000'))
    I.seeElement(textView('Hora: 06:00'))
});

After(() => { })

// Form fields
const fieldName = (text) => locate(`//android.widget.EditText[@text='${text}']`).as(`named ${text}`)
const combo = locate({id: 'android:id/text1'})
const checkBox = locate('//android.widget.CheckBox').as('checkbox unnamed')
const textView = (text) => locate(`//android.widget.TextView[@text='${text}']`).as(`with text value ${text}`)