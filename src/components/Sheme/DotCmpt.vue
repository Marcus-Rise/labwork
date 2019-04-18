<template lang="pug">
  .dot-wrapper(:style="styles" :class="{'dark': isDark, 'light': !isDark}")
    .dot
    span(v-if="value !== undefined")
      b {{defaultValue + value}}
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {Getter} from "vuex-class";

  interface Position {
    left: number
    top: number
  }

  @Component
  export default class DotCmpt extends Vue {
    @Getter isDark?: boolean;
    @Prop({type: Number, default: 0}) defaultValue?: number;
    @Prop({type: Number, default: 0}) value?: number;
    @Prop({type: Object, required: true}) position?: Position;

    get styles(): string {
      return this.position ? `left: ${this.position.left}px; top: ${this.position.top}px` : '';
    }
  }
</script>

<style lang="scss" scoped>


  .dot-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    align-items: center;
    width: 35px;

    &.dark {

      & > .dot {
        background-color: $color-pink;
      }

      & > span {
        color: $color-blue;
      }
    }

    &.light {
      & > .dot {
        background-color: black;
      }
    }

    & > .dot {
      $size: 10px;
      width: $size;
      height: $size;
      border-radius: 100%;


    }

    & > span {

    }
  }
</style>
