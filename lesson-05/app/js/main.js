const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cartCount: 0,
        search: ''
    },

    computed: {
        FilterGoods: function() {
             return this.goods.filter((good) => {
                 return good.product_name.match(this.search);
             })
         }
     },

    methods: {

        addToCart(id_product)
        {
            let goodToAdd = this.goods.find(e => e.id_product === id_product);
            this.cartContainer.forEach(item => {
                if (goodToAdd.id_product === item.id_product && item.quantity === 0)
                {
                    item.quantity++;
                }
                else if (goodToAdd.id_product === item.id_product && item.quantity !== 0)
                {
                    item.quantity++;
                }

            });
            console.log(this.cartContainer);

        },


    },
    mounted() {
        fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
            .then(response => response.json())
            .then(goods => { this.goods = goods;
                this.cartContainer = [...goods];
                this.cartContainer.forEach( item => { item.quantity = 0; });
            })

    }
});

