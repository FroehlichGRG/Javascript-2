class Param{
    constructor(element)
    {
        this.name = element.value;
        this.price = +element.dataset['price'];
    }
}

class Burger {
    constructor(burgersize, filler, extraoption)
    {
        this.burgersize = new Param(this._selectCheckbox(burgersize));
        this.filler = new Param(this._selectCheckbox(filler));
        this.extraoption = this._getToppings(extraoption);
    }

    _selectCheckbox(name){
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    _selectAllCheckbox(name){
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
    }

    _getToppings(extraoption){
        let result = [];
        this._selectAllCheckbox(extraoption).forEach(e => result.push(new Param(e)));
        return result
    }

    _sumPriceAndCallories(){
        let pricesum = 0, price = 0, callories = 0, calloriessum = 0;
        let burgersize = this.burgersize.name;

        switch(burgersize) {
            case 'Big':
                price = 100;
                callories = 40;
                break;

            case 'Small':
                price = 50;
                callories = 20;
                break;
            default:
        }

        pricesum += price;
        calloriessum += callories;

        let filler = this.filler.name;

        switch(filler) {
            case 'One':
                price = 10;
                callories = 20;
                break;
            case 'Two':
                price = 20;
                callories = 5;
                break;
            case 'Three':
                price = 15;
                callories = 10;
                break;
            default:
        }

        pricesum += price;
        calloriessum += callories;

        for (var i = 0; i< this.extraoption.length; i++)
        {
            switch(this.extraoption[i].name) {
                case 'Seasoning':
                    price = 15;
                    callories = 0;
                    break;
                case 'Mayonnaise':
                    price = 20;
                    callories = 5;
                    break;
                default:
            }

            pricesum += price;
            calloriessum += callories;
        }

        return [pricesum, calloriessum];
    }

    showSum(price){
        document.getElementById(price).textContent = this._sumPriceAndCallories()[0];
    }

    showSumCalories(calories) {
        document.getElementById(calories).textContent = this._sumPriceAndCallories()[1];
    }
}

window.onload = () => {
    document.getElementById('check').addEventListener('click', () => {
        let burger = new Burger('burgersize', 'filler', 'extraoption');
        burger.showSum('price');
        burger.showSumCalories('calories');
    })
};