<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12.schemeContainer()
            img(src="@/assets/scheme/dark3.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light3.png" usemap="#image-map" v-if="!isDark")

            dot-cmpt(
                :position="{left: 258, top: 22}"
                :value="signal.input"
                hover
                labelUp="P1"
                suffix="dB"
                @click.native="openModal()"
            )
            dot-cmpt(
                :position="{left: 378, top: 22}"
                :value="signal.output"
                suffix="dB"
                labelUp="P2"
            )

            SignalSetupDialogCmpt(:show="showSetupModal" @close="closeModal" :signal="signal")
            //img(src="@/assets/chart_input.png" width="800px" )

        v-flex.xs12.chart
            line-chart(:chart-data="datacollection" :height="100" :options="options")

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "vuex-class";
    import DotCmpt from "@/components/Sheme/DotCmpt.vue";
    import Signal from "@/models/scheme/Signal";
    import SignalSetupDialogCmpt from "@/components/Sheme/SignalSetupDialogCmpt.vue";
    //@ts-ignore
    import LineChart from "@/components/LineChart.js";

    @Component({
        components: {
            LineChart,
            SignalSetupDialogCmpt,
            DotCmpt,
        }
    })
    export default class Labwork3 extends Vue {
        @Getter isDark?: boolean;

        showSetupModal: boolean = false;
        signal: Signal = new Signal();
        datacollection: object = {};

        options: object = {
            responsive: true,

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: -10,
                        max: 20
                    }
                }]
            },

        };

        mounted() {
            this.fillData();
        }

        openModal(): void {
            this.showSetupModal = true
        }

        closeModal(): void {
            this.showSetupModal = false
        }

        fillData(): void {
            let points: {x: number, y: number}[] = [];

            for (let i=-40; i<=0; i+=5) {
                points.push({
                    x: i,
                    y: this.signal.getOutput(i)
                })
            }

            this.datacollection = {
                labels: [...points.map(item => item.x)],
                datasets: [
                    {
                        fill: false,
                        label: 'P входа, dB',
                        backgroundColor: 'rgb(167,36,255)',
                        data: points
                    }, {
                        fill: false,
                        label: 'Предел',
                        backgroundColor: 'rgb(88,255,74)',
                        data: [...points.map(item => {return {x: item.x, y: 13}})]
                    }
                ]
            }
        }

        getRandomInt(): number {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
    }
</script>

<style lang="scss" scoped>
    .schemeContainer {
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        position: relative;

        $size: 684;
        min-width: #{$size}px;
        max-width: #{$size}px;
    }

    .chart {
        max-width: 800px;
        margin: 10px auto;
    }

</style>
