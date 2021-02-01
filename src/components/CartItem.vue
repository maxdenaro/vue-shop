<template>
  <li class="cart__item product">
      <div class="product__pic">
        <img :src="item.product.image" width="120" height="120"
        srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">
      </div>
      <h3 class="product__title">
        {{ item.product.title }}
      </h3>
      <span class="product__code">
        Артикул: {{ item.productId }}
      </span>

      <div class="product__counter form__counter">
        <button type="button" aria-label="Убрать один товар">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>

        <input type="text" v-model.number="amount" name="count">

        <button type="button" aria-label="Добавить один товар">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>
      </div>

      <b class="product__price">
        {{ (item.amount * item.product.price) | numberFormat }} ₽
      </b>

      <button class="product__del button-del" type="button"
      aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: { numberFormat },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit(
          'updateCartProductAmount',
          { productId: this.item.productId, amount: value },
        );
      },
    },
  },
  methods: {
    deleteProduct(productId) {
      this.$store.commit('deleteCartProduct', { productId });
    },
  },
};
</script>
