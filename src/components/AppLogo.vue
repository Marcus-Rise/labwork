<template lang="pug">
  img(src="@/assets/logo@2x.png")

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class AppLogo extends Vue{

    }
</script>

<style lang="scss" scoped>

  img {
    object-fit: contain;
  }

  .VueToNuxtLogo {
    display: inline-block;
    animation: turn 2s linear forwards 1s;
    transform: rotateX(180deg);
    position: relative;
    overflow: hidden;
    height: 180px;
    width: 245px;
  }

  .Triangle {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;

    &#{&}--four {
      top: 120px;
      left: 70px;
      animation: godown 0.5s linear forwards 3s;
      border-left: 35px solid transparent;
      border-right: 35px solid transparent;
      border-bottom: 60px solid #fff;
    }

    &#{&}--three {
      top: 60px;
      left: 35px;
      animation: goright 0.5s linear forwards 3.5s;
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-bottom: 120px solid #35495E;
    }

    &#{&}--two {
      top: 30px;
      left: 35px;
      animation: goright 0.5s linear forwards 3.5s;
      border-left: 87.5px solid transparent;
      border-right: 87.5px solid transparent;
      border-bottom: 150px solid #3B8070;
    }

    &#{&}--one {
      border-left: 105px solid transparent;
      border-right: 105px solid transparent;
      border-bottom: 180px solid #41B883;
    }
  }

  @keyframes turn {
    100% {
      transform: rotateX(0deg);
    }
  }

  @keyframes godown {
    100% {
      top: 180px;
    }
  }

  @keyframes goright {
    100% {
      left: 70px;
    }
  }
</style>

