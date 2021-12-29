const Helper = require('@codeceptjs/helper');

class Calc extends Helper {

    sum(number1: number, number2: number) {
        return (number1 + number2) as number;
    }
}

export = Calc