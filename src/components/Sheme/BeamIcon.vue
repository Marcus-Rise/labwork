<template lang="pug">
    img.beam(src="@/assets/beam.png" :style="styles")
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Position from "@/core/Position";

    @Component
    export default class BeamIcon extends Vue {
        @Prop({type: Object, required: true}) position?: Position;
        @Prop({type: Number, default: 0}) rotate?: number;

        get styles(): string {
            let styles: string = '';

            if (this.position) {
                styles += `left: ${this.position.left}px; top: ${this.position.top}px;`;
            }

            if (this.rotate) {
                styles += ` transform: rotate(${this.rotate}deg);`
            }

            return styles;
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes opacity {
        50% {
            opacity: .5;
            animation-timing-function: ease-in;
        }
        100% {
            opacity: 1;
        }
    }

    img {
        position: absolute;
        width: 100px;
        object-fit: contain;
        height: 35px;
        animation: opacity 1s infinite linear;

    }
</style>
