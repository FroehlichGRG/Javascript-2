const goods = [
    { title: "Shirt", price: 150 },
    { title: "Socks", price: 50 },
    { title: "Jacket", price: 350 },
    { title: "Shoes", price: 250 }
];

const renderGoodsItem = (title = '', price = 0) => {
    return `<div class="goods-item card box-shadow">
    <div class="card-header my-0 font-weight-normal">
    <h3>${title}</h3>
    </div>
    <div class="card-body">
    <h1 class="card-title pricing-card-title my-5">${price}<small class="text-muted"> руб.</small></h1>    
    <button type="button" class="btn btn-lg btn-block btn-primary mt-5">Добавить</button>
  </div></div>`;
};

const renderGoodsList = (list) => {
    const goodsList = list.map(item =>
        renderGoodsItem(item.title, item.price)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
};

renderGoodsList(goods);


