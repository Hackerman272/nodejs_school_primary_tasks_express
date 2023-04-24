// На выходе возвращает массив, только с подходящими объектами
// возможны (contains, starts, ends для строковых и <, =, >, <=, >= для числовых)
// name-contains-fd&price-=2&quantity->5&description-ends-abc

export class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }

    static filterProducts(filterString, filterArr) {
        let filters = filterString.split("&")
        // console.log(filters)
        for (let specificFilter of filters) {
            let specificFilterName = specificFilter.split("-")[0]
            let rule = specificFilter.split("-")[1]
            let value = specificFilter.split("-").splice(-1).toString()
            if (rule === "contains"){
                filterArr = filterArr.filter(function(product) {
                    return product[specificFilterName].toLowerCase().includes(value)
                })
            } else if (rule === "starts"){
                filterArr = filterArr.filter(function(product) {
                    return product[specificFilterName].toLowerCase().startsWith(value)
                })
            } else if (rule === "ends"){
                filterArr = filterArr.filter(function(product) {
                    return product[specificFilterName].toLowerCase().endsWith(value)
                })
            } else {
                specificFilterName = specificFilter.split("-")[0]
                let value = specificFilter.split("-")[1].split(/[<>=]/g).slice(-1)[0].split(/[<=>]/g).slice(-1)[0]
                rule = specificFilter.match(/[<>=]/g).join('')
                if (rule === ">"){
                    filterArr = filterArr.filter(function(product) {
                        return product[specificFilterName] > value
                    })
                } else if (rule === "<"){
                    filterArr = filterArr.filter(function(product) {
                        return product[specificFilterName] < value
                    })
                } else if (rule === "="){
                    filterArr = filterArr.filter(function(product) {
                        return product[specificFilterName] = value
                    })
                } else if (rule === "<="){
                    filterArr = filterArr.filter(function(product) {
                        return product[specificFilterName] <= value
                    })
                } else if (rule === ">="){
                    filterArr = filterArr.filter(function(product) {
                        return product[specificFilterName] >= value
                    })
                }
            }
        }
        return filterArr;
    }
}
