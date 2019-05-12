<template lang="pug">
    .d-inline-block(:style="stylesMain")
        span.main {{value}}
        span.undo-suffix(v-if="undoSuffix" :style="stylesUndo") {{undoSuffix}}
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class SymbolCmpt extends Vue {
        @Prop({type: String}) value?: string;
        @Prop({type: Number}) fontSize?: number;
        @Prop({type: String}) undoSuffix?: string;
        @Prop({type: Number, default: 0.4}) fontSizeUndo?: number;

        get stylesMain(): string {
            let value: string = '';

            if (this.fontSize) {

                value += `font-size: ${this.fontSize}em`;
            }

            return value;
        }

        get stylesUndo(): string {
            let value: string = '';

            if (this.fontSizeUndo) {

                value += `font-size: ${this.fontSizeUndo}em`;
            }

            return value;
        }
    }
</script>

<style lang="scss" scoped>

</style>
