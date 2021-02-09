<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ ((item.amount || item.quantity) * item.product.price) | numberFormat }} ₽</b>
        <span>Артикул: {{ item.productId || item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: {{ products.length | declOfNum(['товар', 'товара', 'товаров']) }}
        на сумму <b>{{ summ | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declOfNum from '@/helpers/declOfNum';

export default {
  props: ['products', 'summ'],
  filters: { numberFormat, declOfNum },
};
</script>
