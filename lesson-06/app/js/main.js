Vue.component('search',
    {
        template: "<input @input='sendValue' placeholder='search field' id='search'/>",
        methods: {
            sendValue(e)
            {
                console.log(this.$emit("data", e.target.value));
            }
        }
    });

Vue.component('cart',
    {
        props: ['goods', 'calcAllGoods'],
        template: '<div class="cart-wrapper" style="display: block">' +
                    '<div v-for="good in goods" :key="good.id_product" class="item">' +
                        '<div class="cart-product-name">{{good.product_name}}</div>' +
                        '<div class="cart-product-price">{{good.price}}</div>' +
                        '<div class="cart-product-quantity">{{good.quantity}}</div>' +
                        '<div class="cart-delete-button" :id="good.id_product" @click="removeFromCart(good.id_product)">' +
                            '<i class="fas fa-trash-alt"></i>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cart-product-sum">Всего <span id="cart-counter-goods" v-bind:="valueModel">{{ this.cartCount }}</span> товаров на {{ this.cartTotal }} руб.</div>' +
                '</div>',
        computed: {
          valueModel: {
              set(newValue){
                  this.$emit("click", calcAllGoods);
              },
              get(){

              }
          }
        },
        methods: {
            removeFromCart(id)
            {
                let getIdElemen;
                this.goods.forEach(function(item, i) {
                        let thisId = item.id_product;
                        if(id == thisId) {
                            getIdElemen = i;
                        }
                });
                this.goods[getIdElemen].quantity = 0;
                this.goods.splice(getIdElemen, 1);
                this.calculateCartState();
            },

            calculateCartState()
                {
                    let sumOfGoods = 0;
                    let sumOfprice = 0;
                    this.goods.forEach((item) => {
                        sumOfGoods += item.quantity;
                    });

                    this.goods.forEach((item) => {
                        sumOfprice += item.quantity*item.price;
                    });

                    this.cartCount = sumOfGoods;
                    this.cartTotal = sumOfprice;

                    console.log(this.calcAllGoods);
                }
        }
    });

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cartCount: 0,
        search: '',
        cartResult: [],
        cartgoods: [],
        data: 0,
        isVisibleCart: false,
        cartTotal: 0,
        sumOfGoods: 0
    },

    computed: {
        FilterGoods: function () {
            return this.goods.filter((good) => {
                return good.product_name.match(this.search);
            })
        }
    },

    methods: {

        updateSearch(value)
        {
            this.search = value;
        },

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
                    summOfGoods += item.quantity;
                }
            });

            this.quantityCount(summOfGoods);
            this.calcAllGoods();
        },

        quantityCount(res) {
            console.log(res);
            this.cartCount = res;
            // console.log(res);
            this.calcAllGoods();

        },


        calcAllGoods() {
            let cartTotal = 0;
            this.cartResult.forEach((good) => {
                if (good.price !== undefined) {
                    this.cartTotal += good.price*good.quantity;
                }
            });

            this.cartTotal = cartTotal;
            console.log(this.cartTotal);
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