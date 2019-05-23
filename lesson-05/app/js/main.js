const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cartCount: 0,
        search: '',
        cartResult: [],
        cartgoods: [],
        isVisibleCart: false,
        cartTotal: 0
    },

    computed: {
        FilterGoods: function () {
            return this.goods.filter((good) => {
                return good.product_name.match(this.search);
            })
        }
    },

    methods: {

        addToCart(id_product) {
            let goodToAdd = this.goods.find(e => e.id_product === id_product);
            this.cartContainer.forEach(item => {
                if (goodToAdd.id_product === item.id_product && item.quantity === 0) {
                    item.quantity++;
                } else if (goodToAdd.id_product === item.id_product && item.quantity !== 0) {
                    item.quantity++;
                }
            });

            this.cartResult = [];
            let summOfGoods = 0;

            this.cartContainer.forEach(item => {
                if (item.quantity > 0) {
                    this.cartResult.push(item);
                    summOfGoods += item.quantity
                }
            });

            this.quantityCount(summOfGoods);
            this.calcAllGoods();
        },

        quantityCount(res) {
            console.log(res);
            document.getElementById('cartCounter').innerText = res;
            document.getElementById('cart-counter-goods').innerText = res;
            this.calcAllGoods();
        },


        calcAllGoods() {
            let cartTotal = 0;
            this.cartResult.forEach((good) => {
                if (good.price !== undefined) {
                    cartTotal += good.price*good.quantity;
                }
            });

            this.cartTotal = cartTotal;
        },

        viewCart()
        {
            switch(this.isVisibleCart) {
                case(false): {
                    this.isVisibleCart = true;
                    break;
                }
                case(true): {
                    this.isVisibleCart = false;
                    break;
                }
            }
        },

        removeFromCart(id_product)
        {

            let getIdElemen;
            this.cartResult.forEach(function(item, i) {
                let thisId = item.id_product;
                if(id_product == thisId) {
                    getIdElemen = i;
                }

            });
            this.cartResult[getIdElemen].quantity = 0;
            this.cartResult.splice(getIdElemen, 1);
            let sum = 0;
            this.cartResult.forEach(item => {
                sum += item.quantity;
            });
            this.quantityCount(sum);
            this.calcAllGoods();
        }

    },
    mounted() {
        fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
            .then(response => response.json())
            .then(goods => {
                this.goods = goods;
                this.cartContainer = [...goods];
                this.cartContainer.forEach(item => {
                    item.quantity = 0;
                });
            })

    }
});

