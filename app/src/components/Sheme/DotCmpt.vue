<template lang="pug">
    .dot-wrapper(:style="styles" :class="{'dark': isDark, 'light': !isDark, 'hover': hover}")
        .labelUp(v-if="labelUp") {{labelUp}}
        .dot
        span(v-if="value !== undefined")
            b {{defaultValue + value}}{{suffix}}
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Getter} from "vuex-class";
    import Position from "@/core/Position";

    @Component
    export default class DotCmpt extends Vue {
        @Getter isDark?: boolean;
        @Prop({type: Number, default: 0}) defaultValue?: number;
        @Prop({type: Number, default: 0}) value?: number;
        @Prop({type: String, default: ''}) suffix?: string;
        @Prop({type: Object, required: true}) position?: Position;
        @Prop({type: Boolean, default: false}) hover?: boolean;
        @Prop({type: String}) labelUp?: string;

        get styles(): string {
            return this.position ? `left: ${this.position.left}px; top: ${this.position.top}px` : '';
        }
    }
</script>

<style lang="scss" scoped>


    .dot-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        align-items: center;
        width: 35px;

        &.hover:hover {
            cursor: pointer;

            &.light > .dot {
                box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.5);
            }
            &.dark > .dot {
                box-shadow: 0px 0px 5px 5px rgba($color-pink,0.5);
            }
        }

        & > .labelUp {
            $height: 20;
            margin-top: -#{$height}px;
            height: #{$height}px
        }

        &.dark {
            & > .labelUp {
                color: $color-blue;
            }

            & > .dot {
                background-color: $color-pink;
            }

            & > span {
                color: $color-blue;
            }
        }

        &.light {
            & > .dot {
                background-color: black;
            }
        }

        & > .dot {
            $size: 10px;
            width: $size;
            height: $size;
            border-radius: 100%;
        }
    }
</style>
