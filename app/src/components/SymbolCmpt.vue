<template lang="pug">
    .d-inline-block(:style="styles")
        span.main {{value}}
        span.undo-suffix(v-if="undoSuffix") {{undoSuffix}}
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class SymbolCmpt extends Vue {
        @Prop({type: String}) value?: string;
        @Prop({type: Number}) fontSize?: number;
        @Prop({type: String}) undoSuffix?: string;

        get styles(): string {
            let value: string = '';

            if (this.fontSize) {

                value += `font-size: ${this.fontSize}em`;
            }

            return value;
        }
    }
</script>

<style lang="scss" scoped>
    .undo-suffix {
        font-size: 0.4em;
    }
</style>
