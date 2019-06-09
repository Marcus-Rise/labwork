<template lang="pug">
    v-layout(
        justify-end
    )
        v-icon.hover(
            @click="open"
        ) lock

        v-dialog(v-model="show" width="500" persistent)
            v-card
                v-card-title.primary-title.headline Пропустить тестирование

                v-card-text
                    v-form(@submit.prevent="submit")
                        v-container
                            v-layout(
                                row
                                wrap
                            )
                                v-flex(
                                    sm12
                                )
                                    v-text-field(
                                        v-model="password"
                                        label="Пароль"
                                        type="password"
                                        :error-messages="errors"
                                    )
                                v-flex(
                                    sm12
                                    layout
                                    justify-center
                                    row
                                )
                                    v-btn(
                                        color="primary"
                                        type="submit"
                                        large
                                    ) Разблокировать



                v-card-actions
                    v-spacer
                    v-btn(color="green darken-1" flat @click="close") Отмена
</template>

<script lang="ts">
    import {Component, Emit, Vue} from "vue-property-decorator";

    @Component
    export default class TestingUnlockCmpt extends Vue {
        show: boolean = false;
        password: string = "";
        errors: string[] = [];

        frase: string = "олечка";

        close(): void {
            this.show = false;
        }

        open(): void {
            this.errors = [];
            this.password = "";
            this.show = true;
        }

        submit(): void {
            if (this.isValid()) {
                if (this.password === this.frase) {
                    this.unlock();
                } else {
                    this.errors.push("Пароль неверен");
                }
            }
        }

        isValid(): boolean {
            this.errors = [];

            const rule: boolean = this.password.length > 0;

            if (!rule) {
                this.errors.push("Проверьте пароль");
            }

            return rule;
        }

        @Emit()
        unlock(): void {
            this.close();
        }
    }
</script>

<style lang="scss" scoped>
    .hover {
        cursor: pointer;
    }
</style>
