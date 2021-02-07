<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title" v-if="products.length">
        Корзина
      </h1>
      <h1 class="content__title" v-else>
        Корзина пуста
      </h1>
      <span class="content__info" v-if="products.length">
        {{ products.length | declOfNum(['товар', 'товара', 'товаров']) }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block" v-if="products.length">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{ name: 'order' }"
          class="cart__button button button--primery">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declOfNum from '@/helpers/declOfNum';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  filters: { numberFormat, declOfNum },
  components: { CartItem },
  computed: {
    ...mapGetters(
      {
        products: 'cartDetailProducts',
        totalPrice: 'cartTotalPrice',
      },
    ),
  },
};
</script>
