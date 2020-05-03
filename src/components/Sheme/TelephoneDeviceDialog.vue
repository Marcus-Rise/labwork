<template lang="pug">
    v-dialog(v-model="show" width="500" persistent)
        v-card
            v-card-title.primary-title.headline Настройка телефонного аппарата
            v-card-text.main-content
                v-subheader.justify-center.text-xs-center.slider-header Подача сигнала
                v-switch(v-model="telephone.powerOn")
            v-card-actions
                v-spacer
                v-btn(color="green darken-1" flat @click="close") Закрыть
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import TelephoneDevice from "@/models/scheme/TelephoneDevice";

    @Component
    export default class TelephoneDeviceDialog extends Vue {
        @Prop({type: Boolean, default: false}) show?: boolean;
        @Prop({type: Object, default: null, required: true}) telephone?: TelephoneDevice;

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
