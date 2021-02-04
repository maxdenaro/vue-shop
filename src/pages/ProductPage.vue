<template>
  <div v-if="productLoading">Загрузка товара...</div>
  <div v-else-if="!productData">
    Не удалось получить товар
    <button @click.prevent="loadProducts">Повторить загрузку</button>
  </div>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url"
          :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">{{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ColorsList :colors="product.colors" :current-color.sync="compColor"
              class="product-colors" />
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объем в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only"
                    type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <BaseCounter :current-value.sync="productAmount" />
              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер,
            который позволяет оптимизировать свои велотренировки,
            сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков.
            Велокомпьютер точно отслеживает местоположение, принимая сигнал
            с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные маршруты и
            планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость, а также полученная со
            смартфона и синхронизированных датчиков информация: интенсивность,
            скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7.
            Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
/* eslint-disable no-return-assign */

import BaseCounter from '@/components/BaseCounter.vue';
import gotoPage from '@/helpers/gotoPage';
import ColorsList from '@/components/ColorsList.vue';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      productAmount: 1,
      currentColor: null,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,
    };
  },
  mounted() {
    // this.currentColor = this.productData.colors[0].id;
  },
  filters: {
    numberFormat,
  },
  components: {
    ColorsList, BaseCounter,
  },
  computed: {
    compColor: {
      get() {
        return this.productData.colors[0].id;
      },
      set(v) {
        console.log(v);
      },
    },
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    gotoPage,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount },
      );
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => this.productData = response.data)
          .catch(() => this.productLoadingFailed = true)
          .then(() => this.productLoading = false);
      }, 0);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
        // if (!this.productData) {
        //   this.$router.push({
        //     name: 'notFound',
        //   });
        // }
      },
      immediate: true,
    },
  },
};
</script>

<style>
  .product-colors {
    --border-color: #fff;
  }
</style>
