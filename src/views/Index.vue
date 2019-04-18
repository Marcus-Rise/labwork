<template lang="pug">
  v-layout.row.wrap
    v-flex.xs12
      h1.title.text-xs-center Лабораторная работа
    v-flex.xs12.d-flex.justify-center.align-center
      app-logo.d-inline
    v-flex.xs12
      h2.subtitle.text-xs-center "Оптический дуплексный усилитель"

</template>

<script lang="ts">
  import AppLogo from '@/components/AppLogo.vue'
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    components: {
      AppLogo
    }
  })
  export default class Index extends Vue {
  }
</script>

<style lang="scss" scoped>


  .flex {
    img {
      height: 350px;
      width: auto;
    }

    .title {
      font-size: 60px !important;
      line-height: 80px !important;
      margin-bottom: 40px;
      font-family: $font-bold;
    }

    .subtitle {
      font-size: 35px !important;
      //font-family: $font-regular;
    }
  }

</style>

