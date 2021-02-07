<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" :error="formError.name"
            title="ФИО" placeholder="Введите ваше полное имя" />

            <BaseFormText v-model="formData.address" :error="formError.address"
            title="Адрес доставки" placeholder="Введите ваш адрес" />

            <BaseFormText v-model="formData.phone" :error="formError.phone"
            title="Телефон" placeholder="Введите ваш телефон" />

            <BaseFormText v-model="formData.email" :error="formError.email"
            title="Email" placeholder="Введите ваш Email" />

            <BaseFormTextarea v-model="formData.comment" :error="formError.comment"
            title="Комментарий к заказу" placeholder="Ваши пожелания" />
          </div>
        </div>

        <div class="cart__block">

          <OrderExtraInfo :products="products" :summ="totalPrice" />

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
          <div v-if="formPostLoading">Отправка формы...</div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderExtraInfo from '@/components/OrderExtraInfo.vue';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formPostLoading: false,
    };
  },
  components: { BaseFormText, BaseFormTextarea, OrderExtraInfo },
  methods: {
    order() {
      this.formPostLoading = true;
      this.formError = {};
      this.formErrorMessage = '';

      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.formPostLoading = false;
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formPostLoading = false;
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
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
