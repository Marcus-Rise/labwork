<template lang="pug">
  v-layout.row.wrap
    v-flex.xs12

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    components: {
    }
  })
  export default class Theory extends Vue {
  }
</script>

<style lang="scss" scoped>
  .flex {
    img {
      height: 200px;
    }
  }

</style>

