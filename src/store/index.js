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
    cartProducts: [],
    userAccessKey: null,

    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductsAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId);

      if (item) {
        item.amount = amount;
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
    addProductToCart(context, { productId, amount }) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductsAmount(context, { productId, amount }) {
      context.commit('updateCartProductsAmount', { productId, amount });

      if (amount < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          // eslint-disable-next-line object-shorthand
          productId: productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, { productId }) {
      context.commit('deleteCartProduct', { productId });

      // eslint-disable-next-line consistent-return
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            // eslint-disable-next-line object-shorthand
            productId: productId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
  },
});
