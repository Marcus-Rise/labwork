<template lang="pug">
    div.text-xs-right
        v-tooltip(
            lazy
            bottom
            @click.native="open()"
        )
            v-icon.open-icon(
                large
                slot="activator"
            ) help_outline
            span Справка
        v-dialog(v-model="show" :width="width" persistent)
            v-card
                slot
                v-card-actions
                    v-spacer
                    v-btn(color="green darken-1" flat @click="close") Закрыть
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class TaskModalWindow extends Vue {
        @Prop({type: Boolean, default: false}) value?: boolean;
        @Prop({default: 800}) width!: string | number;

        show: boolean = false;

        mounted() {
            if (this.value !== undefined) {
                this.show = this.value;
            }
        }

        open() {
            this.show = true;
        }

        @Watch('show')
        showWatcher() {
            this.updateModel();
        }

        @Watch('value')
        valueWatcher() {
            if (this.value !== undefined) {
                this.show = this.value;
            }
        }

        @Emit('input')
        updateModel() {
            return this.show;
        }

        close() {
            this.show = false;
        }
    }
</script>

<style lang="scss" scoped>
    .open-icon {
        user-select: none;

        &:hover {
            cursor: pointer;
        }
    }
</style>
