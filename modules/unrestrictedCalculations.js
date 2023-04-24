export class unrestrictedCalculations {
    constructor(a, b) {
        this.a = (2**53-1 < a || 2**53-1 < b || -(2**53-1) > a || -(2**53-1) > b) ? BigInt(a) : a
        this.b = (2**53-1 < a || 2**53-1 < b || -(2**53-1) > a || -(2**53-1) > b) ? BigInt(b) : b
    }

    sum(){
        return this.a + this.b
    }
    sub(){
        return this.a - this.b
    }
    mul(){
        return this.a * this.b
    }
    div(){
        return this.a / this.b
    }
}
