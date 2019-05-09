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

        template(v-if="showCharts")
            v-flex.xs12.chart
                line-chart(:chart-data="dataCollection" :height='100' :options="options")

</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {Getter} from "vuex-class";
    import DotCmpt from "@/components/Sheme/DotCmpt.vue";
    import Signal from "@/models/scheme/Signal";
    import SignalSetupDialogCmpt from "@/components/Sheme/SignalSetupDialogCmpt.vue";
    //@ts-ignore
    import LineChart from "@/components/LineChart.js";
    import {app} from "@/services/AppService";
    import {ChartData, ChartOptions} from "chart.js";

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
        showCharts: boolean = app.isDevMode;
        signal: Signal = new Signal();
        dataCollection: ChartData = {};

        options: ChartOptions = {
            legend: {
                labels: {
                    filter: (item, chart) => {
                        // Logic to remove a particular legend item goes here
                        return item.text && !item.text.includes('Значение функции');
                    }
                }
            },
            tooltips: {
                callbacks: {
                    // label: (tooltipItem, data) => {
                    //     return <string | string[]>tooltipItem.yLabel;
                    // }
                }
            },
            responsive: true,
            elements: {
                // line: {
                //     borderColor: 'rgba(153,238,255,0.45)'
                // },
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "P выхода, dB"
                    },
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "P входа, dB"
                    },
                    ticks: {
                        beginAtZero: true,
                        min: -10,
                        max: 20,

                    }
                }]
            },

        };

        @Watch('signal', {deep: true})
        signalWatcher() {
            if (!this.showCharts && this.signal.input === 0) {
                this.showCharts = true;
            }
        }

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
            let points: { x: number, y: number }[] = [];

            for (let i = -40; i <= 0; i += 5) {
                points.push({
                    x: i,
                    y: this.signal.getOutput(i)
                })
            }

            this.dataCollection = {
                labels: [...points.map(item => '' + item.x)],
                datasets: [
                    {
                        fill: false,
                        label: "Значение функции",
                        borderColor: 'rgba(167,36,255,0.49)',
                        backgroundColor: 'rgb(167,36,255)',
                        data: points
                    }, {
                        fill: false,
                        label: 'Предел, dB',
                        borderColor: 'rgba(88,255,74,0.49)',
                        backgroundColor: 'rgb(88,255,74)',
                        data: [...points.map(item => {
                            return {x: item.x, y: 13}
                        })]
                    }
                ]
            }
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
