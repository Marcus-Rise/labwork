<template lang="pug">
  v-layout.row.wrap
    v-flex.xs12
      scheme

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Scheme from "@/components/Sheme/Scheme.vue";

  @Component({
    components: {
      Scheme,
    }
  })
  export default class Labwork extends Vue {
  }
</script>

<style lang="scss" scoped>


  .flex {
    img {
      height: 200px;
    }
  }

</style>

