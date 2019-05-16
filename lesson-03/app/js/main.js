const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

function addCart(id) {
    cart.addToCart(id);
}

function viewCart() {
    cart.render();
}

function deleteItem(id) {
    cart.deleteCartItem(id);
}

function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

class GoodsItem {
    constructor(title = '-----', price = 0, image = '', productid )
    {
        this.product_name = title;
        this.price = price;
        this.image = image;
        this.id_product = productid;
    }
    render()
    {
        return `
        <div class="goods-item">
            <div class="goods-image">
                        <img src="${this.image}" alt="">
                    </div>
                    <div class="goods-info">
                        <h2>${this.product_name}</h2>
                        <h3>${this.price}&nbsp;&euro;</h3>
                        <button id="${this.id_product}" onclick='addCart(${this.id_product})'><i class="fas fa-cart-arrow-down"></i>Add to cart</button>
                    </div>
            </div>`
    }
}

class GoodsList {
    constructor()
    {
        this.goods = []
    }

    fetchGoods(callback) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            callback()
        });
    }

    calcAllGoods() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
            if(good.price !== undefined) {
                totalPrice += good.price;
            }
        });


        let totalGoodsAnswer = "Всего: $" + summ;
        document.querySelector('.cart-list-total').innerHTML = totalGoodsAnswer;
    }

    render()
    {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.image, good.id_product);
            listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class CartItem {
    constructor(title = '-----', price = 0, productid )
    {
        this.product_name = title;
        this.price = price;
        this.id_product = productid;
    }
    render()
    {
        console.log(this.id_product);
        return `<div class="cart-container"><h3>${this.product_name}</h3><p>${this.price}</p><div onclick='deleteItem(${this.id_product})' class="button"><i class="fas fa-window-close"></i></div>`;
    }
}

class CartList {
    constructor()
    {
        this.goods = [];
    }

    addToCart(id_product) {
        let toCart;
        list.goods.forEach(function(item) {
            console.log(id_product);
            if(id_product === item.id_product) {
                toCart = {
                    id_product: item.id_product,
                    product_name: item.product_name,
                    price: item.price
                }
            }
        });
        this.goods.push(toCart);
        this.cartCount();
    }

    calcAllGoods() {
        let summ = 0;
        this.goods.forEach((good) => {
            if (good.price !== undefined) {
                summ += good.price;
            }
        });

        let totalGoodsAnswer = "Всего: $" + summ;
        document.querySelector('.cart-list-total').innerHTML = totalGoodsAnswer;
    }

    cartCount() {
        let count = this.goods.length;
        document.getElementById('cartCounter').innerHTML = count;
    }

    deleteCartItem(id_product) {
        let getIdElemen;
        this.goods.forEach(function(item, i) {
            let thisId = item.id_product;
            if(id_product === thisId) {
                getIdElemen = i;
            }

        });
        this.goods.splice(getIdElemen, 1);
        this.render();
        this.cartCount();
    }

    calcAllItemsInCart() {}

    istGoodsinCart() {}

    render() {
        let readHtml = '';
        this.goods.forEach((good) => {
            const cartItem = new CartItem(good.product_name, good.price, good.id_product);
            readHtml += cartItem.render();
        });
        document.querySelector('.cart-list').innerHTML = readHtml;
        this.calcAllGoods();
    }
}

const list = new GoodsList();
const cart = new CartList();
list.fetchGoods(() => {
    list.render();
});