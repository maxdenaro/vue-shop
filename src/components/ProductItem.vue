<template>
  <li class="catalog__item" :product="product">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ColorsList :colors="product.colors" :current-color.sync="currentColor" />
  </li>
</template>

<script>
import ColorsList from './ColorsList.vue';

export default {
  props: ['product'],
  components: {
    ColorsList,
  },
  data() {
    return {
      currentColor: this.product.colors[0].id,
    };
  },
};
</script>
