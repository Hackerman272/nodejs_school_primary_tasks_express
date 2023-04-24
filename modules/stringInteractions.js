// 1. Написать модуль, который будет включать в себя следующие методы.
// 1.1. Преобразование строки к нижнему регистру, но первая буква большая. “Abscd”
// 1.2. Преобразование строки с целью правильно расстановки пробелов. “Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.” =>
// “Вот пример строки,в которой используются знаки препинания. После знаков должны стоять пробелы, а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены.”
// 1.3. Посдчитывающие кол-во слов в строке.
// 1.4. Подсчитывающий, уникальные слова. “Текст, в котором слово текст несколько раз встречается и слово тоже” - в ответе, что “слово - 2 раза, текст - 2 раза, в - 1 раз, несколько - 1 раз“. Самостоятельно придумать наиболее удачную структуру данных для ответа.

export class stringInteractions {
    constructor(string) {
        this.string = string;
    }

    toLowerWithCapital() {
        let newStr = this.string[0].toUpperCase() + this.string.toLowerCase().slice(1);
        console.log(newStr);
        return newStr;
    }

    toCleverSpaces() {
        const reg = /  +/gm
        const str = this.string;
        let newStr = str.replace(reg, " ");
        const reg2 = / +[^a-zA-Zа-яА-Я0-9_ ]/gm
        const replacingArraySpacesBefore = [...str.matchAll(reg2)];
        for (let replacingItem of replacingArraySpacesBefore) {
            newStr = newStr.replace(replacingItem, replacingItem[0].slice(-1))
        }
        const reg3 = /[^a-zA-Zа-яА-Я0-9_ ] {0}[a-zA-Zа-яА-Я0-9_]/gm
        const replacingArraySpacesAfter = [...str.matchAll(reg3)];
        for (let replacingItem2 of replacingArraySpacesAfter) {
            newStr = newStr.replace(replacingItem2, replacingItem2[0][0] + " " + replacingItem2[0].slice(-1))
        }
        console.log(newStr);
        return newStr;
    }

    wordsCounter() {
        let count = 0;
        const str = this.string;
        const reg = /\S+/g
        const protoWords = [...str.matchAll(reg)];
        const notWordsElements = ["-", "=", "+", "/", "*"]
        for (let protoWord of protoWords) {
            if (!notWordsElements.includes(protoWord[0])) count += 1;
        }
        console.log(count)
        return count
    }

    uniqueWordsCounter() {
        let wordCount = {}
        const str = this.string;
        const reg = /\S+/g
        const protoWords = [...str.matchAll(reg)];
        const notWordsElements = ["-", "=", "+", "/", "*"]
        for (let protoWord of protoWords) {
            if (!notWordsElements.includes(protoWord[0])) {
                (protoWord[0] in wordCount) ? wordCount[protoWord[0]] += 1 : wordCount[protoWord[0]] = 1
            }
        }
        console.log(wordCount)
        return wordCount
    }
}
