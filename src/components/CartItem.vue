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

      <ProductCounter :current-value.sync="amount" class="product__counter" />

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
import ProductCounter from '@/components/ProductCounter.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: { numberFormat },
  components: { ProductCounter },
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
