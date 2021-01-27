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

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
          :value="color.id" v-model="currentColor">
          <span class="colors__value" :style="{ background: color.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      currentColor: 0,
    };
  },
};
</script>
