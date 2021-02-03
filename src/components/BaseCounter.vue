<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="count--">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input type="text" v-model.number="count" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="count++">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseCounter',
  props: ['currentValue'],
  computed: {
    count: {
      get() {
        return this.currentValue;
      },
      set(value) {
        if (value >= 1) {
          this.$emit('update:currentValue', value);
        }
      },
    },
  },
};
</script>
