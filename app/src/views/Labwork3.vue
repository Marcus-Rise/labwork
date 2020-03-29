<template lang="pug">
    v-layout(row wrap)
        v-flex.xs12
            task-modal-window(v-model="supportShow")
                pdf-viewer
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

        template(v-if="showOutputSignalChart")
            v-flex.xs12
                .chart
                    line-chart(:chart-data="outputSignalChartDataCollection" :height='200' :options="outputSignalChartOptions")
            v-flex.xs12
                .chart
                    line-chart(:chart-data="amplitudeArequencyCharacteristicChartDataCollection" :height='300' :options="amplitudeArequencyCharacteristicChartOptions")

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
    import TaskModalWindow from "@/components/Sheme/TaskModalWindow.vue";
    import SymbolCmpt from "@/components/SymbolCmpt.vue";
    import PdfViewer from "@/components/PdfViewer.vue";

    @Component({
        components: {
            PdfViewer,
            SymbolCmpt,
            TaskModalWindow,
            LineChart,
            SignalSetupDialogCmpt,
            DotCmpt,
        }
    })
    export default class Labwork3 extends Vue {
        @Getter isDark?: boolean;

        supportShow: boolean = true;//!app.isDevMode;
        showSetupModal: boolean = false;
        showOutputSignalChart: boolean = false;//app.isDevMode;
        showAmplitudeArequencyCharacteristicChart: boolean = app.isDevMode;
        signal: Signal = new Signal();
        outputSignalChartDataCollection: ChartData = {};
        outputSignalChartOptions: ChartOptions = {
            responsive: true,
            legend: {
                labels: {
                    filter: (item, chart) => {
                        // Logic to remove a particular legend item goes here
                        return item.text && !item.text.includes('Значение функции');
                    }
                }
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
        amplitudeArequencyCharacteristicChartOptions: ChartOptions = {
            responsive: true,
            legend: {
                labels: {
                    filter: (item, chart) => {
                        // Logic to remove a particular legend item goes here
                        return item.text && !item.text.includes('Значение функции');
                    }
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "λ, нм"
                    },
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "P выхода, dB"
                    },
                    ticks: {
                        beginAtZero: true,
                        min: -10,
                        max: 10,
                    }
                }]
            },

        };

        @Watch('signal', {deep: true})
        signalWatcher() {
            if (!this.showOutputSignalChart && this.signal.input === 0) {
                this.showOutputSignalChart = true;
            }

            if (!this.showAmplitudeArequencyCharacteristicChart && this.signal.waveLength === 1560) {
                this.showAmplitudeArequencyCharacteristicChart = true;
            }
        }

        created() {
            this.fillData();

            // if (app.isDevMode) {
            //     this.signal.waveLength = 1560;
            //     this.supportShow = false;
            //     this.showOutputSignalChart = true;
            // }
        }

        openModal(): void {
            this.showSetupModal = true
        }

        closeModal(): void {
            this.showSetupModal = false
        }

        get amplitudeArequencyCharacteristicChartDataCollection(): ChartData {
            let data: ChartData;
            let points: { x: number, y: number }[] = [];

            if (this.signal.waveLength === 1560) {
                for (let i = 1520; i <= 1570; i += 5) {
                    points.push({
                        x: i,
                        y: this.signal.getYwaveLength(i)
                    })
                }
            } else {
                for (let i = 1520; i <= 1570; i += 5) {
                    let y: number;

                    switch (i) {
                        case 1520:
                            y = -10;
                            break;
                        case 1570:
                            y = -10;
                            break;
                        default:
                            y = this.getRandomInt(-6, 5);
                    }
                    points.push({
                        x: i,
                        y
                    })
                }
            }

            data = {
                labels: [...points.map(item => '' + item.x)],
                datasets: [
                    {
                        fill: false,
                        label: "Значение функции",
                        borderColor: 'rgba(167,36,255,0.49)',
                        backgroundColor: 'rgb(167,36,255)',
                        data: points
                    }
                ]
            };

            return data;
        }

        fillData(): void {
            let outputSignalPoints: { x: number, y: number }[] = [];

            for (let i = -40; i <= 0; i += 5) {
                outputSignalPoints.push({
                    x: i,
                    y: this.signal.getOutput(i)
                })
            }

            this.outputSignalChartDataCollection = {
                labels: [...outputSignalPoints.map(item => '' + item.x)],
                datasets: [
                    {
                        fill: false,
                        label: "Значение функции",
                        borderColor: 'rgba(167,36,255,0.49)',
                        backgroundColor: 'rgb(167,36,255)',
                        data: outputSignalPoints
                    }, {
                        fill: false,
                        label: 'Предел, dB',
                        borderColor: 'rgba(88,255,74,0.49)',
                        backgroundColor: 'rgb(88,255,74)',
                        data: [...outputSignalPoints.map(item => {
                            return {x: item.x, y: 13}
                        })]
                    }
                ]
            };


        }

        getRandomInt(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min
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
        max-width: 600px;
        margin: 10px auto;
    }

</style>
