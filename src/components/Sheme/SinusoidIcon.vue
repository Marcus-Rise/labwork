<template lang="pug">
    .sinusoid.sinusoid-icon(:style="styles")
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Position from "@/core/Position";

    @Component
    export default class SinusoidIcon extends Vue {
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
    @keyframes background {
        $offset: 200px;

        0% {
            background-position-x: -1000%;
        }
        100% {
            background-position-x: 1000%;
        }
    }

    .sinusoid {
        height: 50px;
        width: 100px;
        position: absolute;
    }

    .sinusoid-icon {
        background-image: url("../../assets/scheme/sinusoid.png");
        background-size: 300px;
        background-repeat: repeat-x;
        animation: background 70s infinite;
        animation-timing-function: linear;
    }
</style>
