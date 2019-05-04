<template lang="pug">
    v-dialog(v-model="show" width="500" persistent)
        v-card
            v-card-title.primary-title.headline Настройка оптического развязывающего устройства
            v-card-text.main-content
                v-subheader.justify-center.text-xs-center.slider-header Пропускание, dB
                v-slider(v-model="opticalRouter.passing" thumb-label="always" step="5" min="0" max="55")
            v-card-actions
                v-spacer
                v-btn(color="green darken-1" flat @click="close") Закрыть
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import OpticalRouterDevice from "@/models/scheme/OpticalRouterDevice";

    @Component
    export default class OpticalRouterDeviceDialog extends Vue {
        @Prop({type: Boolean, default: false}) show?: boolean;
        @Prop({type: Object, default: null, required: true}) opticalRouter?: OpticalRouterDevice;

        @Emit()
        close() {
        }
    }
</script>

<style lang="scss" scoped>
    .main-content {
        display: flex;
        flex-direction: column;
        justify-content: center;

        * {
            display: flex;
            justify-content: center;
        }
    }
</style>
