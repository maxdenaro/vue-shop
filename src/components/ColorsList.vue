<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors"
      :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only"
        type="radio" name="color" :value="color.id" v-model="compColor">
        <span class="colors__value" :style="{ background: color.code}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColorsList',
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    currentColor: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    compColor: {
      get() {
        return this.currentColor;
      },
      set(value) {
        this.$emit('update:currentColor', value);
      },
    },
  },
};
</script>
