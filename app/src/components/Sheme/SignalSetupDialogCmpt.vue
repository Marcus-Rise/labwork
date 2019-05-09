<template lang="pug">
    v-dialog(v-model="show" width="500" persistent)
        v-card
            v-card-title.primary-title.headline Настройка
                v-card-text
                    v-slider(
                        v-model="signal.input"
                        ticks="always"
                        thumb-label="always"
                        step="5"
                        min="-40"
                        max="0"
                    )
                    v-layout.justify-space-between
                        span -40дБ
                        span 0дБ
            v-card-actions
                v-spacer
                v-btn(color="green darken-1" flat @click="close") Закрыть
</template>

<script lang="ts">
    import {Component, Prop, Vue, Emit} from "vue-property-decorator";
    import SchemeGenerator from "@/models/scheme/SchemeGenerator";
    import Signal from "@/models/scheme/Signal";

    @Component
    export default class SignalSetupDialogCmpt extends Vue {
        @Prop({type: Boolean, default: false}) show?: boolean;
        @Prop({type: Object, default: null, required: true}) signal?: Signal;

        @Emit()
        close() {
        }
    }
</script>

<style lang="scss" scoped>

</style>
