/* eslint-disable arrow-body-style */
import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

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
    updateCartProductAmount(state, payLoad) {
      const item = state.cartProducts.find((el) => el.productId === payLoad.productId);

      if (item) {
        item.amount = payLoad.amount;
      }
    },
    deleteCartProduct(state, payLoad) {
      // eslint-disable-next-line max-len
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== payLoad.productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        return {
          ...item,
          product: products.find((prod) => prod.id === item.productId),
        };
      });
    },
    cartTotalPrice(state, getters) {
      // eslint-disable-next-line max-len
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});
