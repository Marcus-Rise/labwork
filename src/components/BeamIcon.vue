<template lang="pug">
    img.beam(src="@/assets/beam.png" :style="styles")
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Position from "@/core/Position";

    @Component
    export default class BeamIcon extends Vue {
        @Prop({type: Object, required: true}) position?: Position;

        get styles(): string {
            return this.position ? `left: ${this.position.left}px; top: ${this.position.top}px` : '';
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
