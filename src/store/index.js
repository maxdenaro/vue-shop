/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import Vuex from 'vuex';
// import products from '@/data/products';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 2,
      },
    ],
    userAccessKey: null,

    cartProductsData: [],
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const product = state.cartProductsData.find((prod) => prod.product.id === item.productId).product;
        return {
          ...item,
          product,
        };
      });
    },
    cartTotalPrice(state, getters) {
      // eslint-disable-next-line max-len
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
    loadCart(context) {
      axios
        .get(`${API_BASE_URL}/api/baskets/`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
