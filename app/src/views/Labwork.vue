<template lang="pug">
    v-layout.row.wrap.justify-center
        v-flex.xs12
            task-modal-window(v-model="supportShow")
                v-card-title.primary-title.headline Оптический линейный тракт
                v-card-text
                    ul
                        li Г – генератор оптического излучения;
                        li ОРУ – оптическое развязывающее устройство.
                v-card-title.primary-title.headline Задача
                v-card-text
                    ol
                        li Изменяйте уровень оптического излучения и длину волны;
                        li Зарисуйте схему. Изменяя параметры генератора наблюдайте как изменяется уровень сигнала при прохождении через линию.
                v-card-title.primary-title.headline Определить
                v-card-text
                    ol
                        li
                            |Затухание ОРУ в направлении пропускания,&nbsp;
                            symbol-cmpt(value="α" undo-suffix="ОРУ" :font-size="1.5")
                            |, dB.
                        li Коэффициент усиления усилителя, S, dB
                        li
                            |Затухание линии,&nbsp;
                            symbol-cmpt(value="α" undo-suffix="ЛС" :font-size="1.5")
                            |, dB
                        li Запишите полученные результаты (они пригодятся при расчетах).

        div.map-container
            img(src="@/assets/scheme/dark.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light.png" usemap="#image-map" v-if="!isDark")
            .map-generator-1.mapped-element(@click="generatorSetup_1()")
                span(:class="{'dark': isDark, 'light': !isDark}" v-if="generatorDots_1")
                    b {{generator1.power}}дБ
            .map-generator-2.mapped-element(@click="generatorSetup_2()")
                span(:class="{'dark': isDark, 'light': !isDark}" v-if="generatorDots_2")
                    b {{generator2.power}}дБ

            template(v-if="generatorDots_1")
                dot-cmpt(:position="{left: 170, top: 133}" :value="generator1.power" :defaultValue="-30")
                dot-cmpt(:position="{left: 275, top: 29}" :value="generator1.power" :defaultValue="-30 -5")
                dot-cmpt(:position="{left: 445, top: 29}" :value="generator1.power" :defaultValue="-30 -5 + 40")
                dot-cmpt(:position="{left: 540, top: 134}" :value="generator1.power" :defaultValue="-30 -5  + 40 -5")

                dot-cmpt(:position="{left: 630, top: 134}" :value="generator1.power" :defaultValue="-30 -5  + 40 -5 -30")
                dot-cmpt(:position="{left: 720, top: 29}" :value="generator1.power" :defaultValue="-30 -5  + 40 -5 -30 -5")
                dot-cmpt(:position="{left: 900, top: 29}" :value="generator1.power" :defaultValue="-30 -5  + 40 -5 -30 -5 + 40")
                dot-cmpt(:position="{left: 1090, top: 133}" :value="generator1.power" :defaultValue="-30 -5  + 40 -5 -30 -5 + 40 -5")

            template(v-if="generatorDots_2")
                dot-cmpt(:position="{left: 1000, top: 134}" :value="generator2.power" :defaultValue="-30")
                dot-cmpt(:position="{left: 900, top: 240}" :value="generator2.power" :defaultValue="-30 -5")
                dot-cmpt(:position="{left: 720, top: 240}" :value="generator2.power" :defaultValue="-30 -5 + 40")
                dot-cmpt(:position="{left: 630, top: 134}" :value="generator2.power" :defaultValue="-30 -5  + 40 -5")

                dot-cmpt(:position="{left: 540, top: 134}" :value="generator2.power" :defaultValue="-30 -5  + 40 -5 -30")
                dot-cmpt(:position="{left: 440, top: 240}" :value="generator2.power" :defaultValue="-30 -5  + 40 -5 -30 -5")
                dot-cmpt(:position="{left: 270, top: 240}" :value="generator2.power" :defaultValue="-30 -5  + 40 -5 -30 -5 + 40")
                dot-cmpt(:position="{left: 80, top: 134}" :value="generator2.power" :defaultValue="-30 -5  + 40 -5 -30 -5 + 40 -5")

        GeneratorSetupDialogCmpt(
            :show="generatorDialog_1"
            :generator="generator1"
            @close="generatorSetuped_1()"
        )
        GeneratorSetupDialogCmpt(
            :show="generatorDialog_2"
            :generator="generator2"
            @close="generatorSetuped_2()"
        )

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import GeneratorSetupDialogCmpt from "@/components/Sheme/GeneratorSetupDialogCmpt.vue";
    import DotCmpt from "@/components/Sheme/DotCmpt.vue";
    import {Getter} from "vuex-class";
    import SchemeGenerator from "@/models/scheme/SchemeGenerator";
    import {app} from "@/services/AppService";
    import TaskModalWindow from "@/components/Sheme/TaskModalWindow.vue";
    import SymbolCmpt from "@/components/SymbolCmpt.vue";

    @Component({
        components: {
            SymbolCmpt,
            DotCmpt,
            GeneratorSetupDialogCmpt,
            TaskModalWindow,
        }
    })
    export default class Labwork extends Vue {
        @Getter public isDark?: boolean;

        supportShow: boolean = true;//!app.isDevMode;
        generatorDialog_1: boolean = false;
        generatorDialog_2: boolean = false;
        generatorDots_1: boolean = false;
        generatorDots_2: boolean = false;
        generator1: SchemeGenerator = new SchemeGenerator();
        generator2: SchemeGenerator = new SchemeGenerator();

        generatorSetuped_1(): void {
            this.generatorDots_1 = true;
            this.generatorDots_2 = false;
            this.generatorDialog_1 = false;
        }

        generatorSetuped_2(): void {
            this.generatorDots_1 = false;
            this.generatorDots_2 = true;
            this.generatorDialog_2 = false;
        }

        generatorSetup_1(): void {
            this.generatorDialog_1 = true;
        }

        generatorSetup_2(): void {
            this.generatorDialog_2 = true;
        }
    }
</script>

<style lang="scss" scoped>
    .slider-header {
        margin-bottom: 40px;
        font-weight: 600;
        font-size: 1.1rem;
    }

    .map-container {
        min-width: 1200px;
        max-width: 1200px;
        position: relative;

        img {
            width: 100%;
        }

        .map-generator-1 {
            position: absolute;
            top: 103px;
            left: 0;
            width: 71px;
            height: 71px;
        }

        .map-generator-1, .map-generator-2 {
            span {
                bottom: -25px;
                position: absolute;
                left: 25px;

                &.dark {
                    color: $color-blue;
                }
            }
        }

        .map-generator-2 {
            position: absolute;
            top: 104px;
            right: 0;
            width: 72px;
            height: 70px;
        }
    }

    .flex {
        img {
            height: 200px;
        }
    }

</style>

