<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.id">
        <h3>{{ item.title }}</h3>
        <b>{{ (item.quantity * item.price) | numberFormat }} ₽</b>
        <span>Артикул: {{ item.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: {{ products.length | declOfNum(['товар', 'товара', 'товаров']) }}
        на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declOfNum from '@/helpers/declOfNum';

export default {
  props: ['products'],
  filters: { numberFormat, declOfNum },
  computed: {
    totalPrice() {
      return this.products.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
    },
  },
};
</script>
