const goods = [
    { title: "Shirt", price: 150.99, image: "https://placehold.it/150x170" },
    { title: "Socks", price: 50.22, image: "https://placehold.it/150x170" },
    { title: "Jacket", price: 350.33, image: "https://placehold.it/150x170" },
    { title: "Shoes", price: 250.54, image: "https://placehold.it/150x170" },
    { title: "Shirt", price: 150.23, image: "https://placehold.it/150x170" },
    { title: "Socks", price: 50.99, image: "https://placehold.it/150x170" },
    { title: "Jacket", price: 350.31, image: "https://placehold.it/150x170" },
    { title: "Shoes", price: 250.14, image: "https://placehold.it/150x170" },
    { title: "Shirt", price: 149.11, image: "https://placehold.it/150x170" },
    { title: "Socks", price: 50, image: "https://placehold.it/150x170" },
    { title: "Jacket", price: 350, image: "https://placehold.it/150x170" },
    { title: "Shoes", price: 250, image: "https://placehold.it/150x170" }
];

const renderGoodsItem = (title = '', price = 0, image = 'https://placehold.it/150x170') => {
    return `<div class="goods-item">
    <div class="goods-image">
    <img src="${image}">
    </div>
    <div class="goods-info">
    <h2>${title}</h2>
    <h3>${price} &euro;</h3>
    <button><i class="fas fa-cart-arrow-down"></i>Add to cart</button>
</div>
</div>`;
};

const renderGoodsList = (list) => {
    const goodsList = list.map(item =>
        renderGoodsItem(item.title, item.price, item.image)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
};

renderGoodsList(goods);


