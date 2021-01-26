<template>
  <section class="catalog">

    <ProductList :products="products" />

    <BasePagination v-on:paginate="page = $event"
    :count="countProducts" :per-page="productsPerPage" />
  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
