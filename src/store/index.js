import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 2,
      },
    ],
  },
  mutations: {
    addProductToCart(state, payLoad) {
      const item = state.cartProducts.find((el) => el.productId === payLoad.productId);

      if (item) {
        item.amount += payLoad.amount;
      } else {
        state.cartProducts.push({
          productId: payLoad.productId,
          amount: payLoad.amount,
        });
      }
    },
  },
});
