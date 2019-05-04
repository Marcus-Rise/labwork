<template lang="pug">
  v-dialog(v-model="show" width="500" persistent)
    v-card
      v-card-title.primary-title.headline Настройка генератора
      v-card-text
        v-subheader.justify-center.text-xs-center.slider-header Мощность оптического излучения
        v-slider(v-model="generator.power" thumb-label="always" step="0.5" min="-3" max="3")
        v-layout.justify-space-between
          span -3дБ
          span 3дБ
        v-subheader.justify-center.text-xs-center.slider-header Длина волны
        v-radio-group(v-model="generator.waveLength")
          v-radio(:key="1530" :label="`1530нм`" :value="1530")
          v-radio(:key="1550" :label="`1550нм`" :value="1550")
          v-radio(:key="1565" :label="`1565нм`" :value="1565")
      v-card-actions
        v-spacer
        v-btn(color="green darken-1" flat @click="close") Закрыть
</template>

<script lang="ts">
  import {Component, Prop, Vue, Emit} from "vue-property-decorator";
  import SchemeGenerator from "@/models/scheme/SchemeGenerator";

  @Component
  export default class GeneratorSetupDialogCmpt extends Vue {
    @Prop({type: Boolean, default: false}) show?: boolean;
    @Prop({type: Object, default: null, required: true}) generator?: SchemeGenerator;

    @Emit()
    close() {}
  }
</script>

<style lang="scss" scoped>

</style>
