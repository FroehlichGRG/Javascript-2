class GoodsItem {
    constructor(title = '-----', price = 0, image = '', productid )
    {
        this.title = title;
        this.price = price;
        this.image = image;
        this.productid = productid;
    }
    render()
    {
        return `
        <div class="goods-item">
            <div class="goods-image">
                        <img src="${this.image}">
                    </div>
                    <div class="goods-info">
                        <h2>${this.title}</h2>
                        <h3>${this.price}&nbsp;&euro;</h3>
                        <button id="button-${this.productid}"><i class="fas fa-cart-arrow-down"></i>Add to cart</button>
                    </div>
            </div>`
    }
}


class GoodsList {
    constructor()
    {
        this.goods = []
    }

    fetchGoods() {
        this.goods = [
            { title: "Shirt", price: 150.99, image: "https://placehold.it/150x170", productid: 1 },
            { title: "Socks", price: 50.22, image: "https://placehold.it/150x170", productid: 2 },
            { title: "Jacket", price: 350.33, image: "https://placehold.it/150x170", productid: 3 },
            { title: "Shoes", price: 250.54, image: "https://placehold.it/150x170", productid: 4 },
            { title: "Shirt", price: 150.23, image: "https://placehold.it/150x170", productid: 5 },
            { title: "Socks", price: 50.99, image: "https://placehold.it/150x170", productid: 6 },
            { title: "Jacket", price: 350.31, image: "https://placehold.it/150x170", productid: 7 },
            { title: "Shoes", price: 250.14, image: "https://placehold.it/150x170", productid: 8 },
            { title: "Shirt", price: 149.11, image: "https://placehold.it/150x170", productid: 9 },
            { title: "Socks", price: 50, image: "https://placehold.it/150x170", productid: 10 },
            { title: "Jacket", price: 350, image: "https://placehold.it/150x170", productid: 11 },
            { title: "Shoes", price: 250, image: "https://placehold.it/150x170", productid: 12 }
        ];

        return this.goods;
    }

    render()
    {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.image, good.productid);
            listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}


class CartItem {
    constructor(title = '-----', price = 0, image = '', productid )
    {
        this.title = title;
        this.price = price;
        this.productid = productid;
    }
    render()
    {
        return `<div class="cart-item"><p>${this.title}${this.price}${this.quantity}</p></div>`
    }
}


class CartList {
    constructor()
    {
        this.goods = []
    }

    fetchGoods() {
        this.goods = [
            { title: "Shirt", price: 150.99, image: "https://placehold.it/150x170", productid: 1 },
            { title: "Socks", price: 50.22, image: "https://placehold.it/150x170", productid: 2 },
            { title: "Jacket", price: 350.33, image: "https://placehold.it/150x170", productid: 3 },
            { title: "Shoes", price: 250.54, image: "https://placehold.it/150x170", productid: 4 },
            { title: "Shirt", price: 150.23, image: "https://placehold.it/150x170", productid: 5 },
            { title: "Socks", price: 50.99, image: "https://placehold.it/150x170", productid: 6 },
            { title: "Jacket", price: 350.31, image: "https://placehold.it/150x170", productid: 7 },
            { title: "Shoes", price: 250.14, image: "https://placehold.it/150x170", productid: 8 },
            { title: "Shirt", price: 149.11, image: "https://placehold.it/150x170", productid: 9 },
            { title: "Socks", price: 50, image: "https://placehold.it/150x170", productid: 10 },
            { title: "Jacket", price: 350, image: "https://placehold.it/150x170", productid: 11 },
            { title: "Shoes", price: 250, image: "https://placehold.it/150x170", productid: 12 }
        ];

        return this.goods;
    }

    render()
    {

        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}





const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.fetchGoods());