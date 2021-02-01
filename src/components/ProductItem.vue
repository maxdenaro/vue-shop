<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ColorsList :colors="product.colors" :current-color.sync="currentColor" />
  </li>
</template>

<script>
import ColorsList from '@/components/ColorsList.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  components: {
    ColorsList,
  },
  data() {
    return {
      currentColor: this.product.colors[0].id,
    };
  },
  methods: {
    gotoPage,
  },
};
</script>
