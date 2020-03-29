<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12
            task-modal-window(v-model="supportShow")
                pdf-viewer(src="/tasks.pdf" fixed-page="2")

        v-flex.xs12.schemeContainer
            img(src="@/assets/scheme/dark2.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light2.png" usemap="#image-map" v-if="!isDark")
            .telephone-device-dialog_1.mapped-element(@click="telephoneDeviceDialog_1 = true")
            .telephone-device-dialog_2.mapped-element(@click="telephoneDeviceDialog_2 = true")
            .optical-router-device.mapped-element(@click="opticalRouterDeviceSetup()")
            .optical-router-device-duplicate.mapped-element(@click="opticalRouterDeviceSetup()")

            TelephoneDeviceDialog(
                :show="telephoneDeviceDialog_1"
                :telephone="telephoneDevice_1"
                @close="telephoneDevice_1_Settuped()"
            )
            TelephoneDeviceDialog(
                :show="telephoneDeviceDialog_2"
                :telephone="telephoneDevice_2"
                @close="telephoneDevice_2_Settuped()"
            )

            OpticalRouterDeviceDialog(
                :show="opticalRouterDeviceDialog"
                :opticalRouter="opticalRouterDevice"
                @close="opticalRouterDeviceSettuped()"
            )

            template(v-if="telephoneDevice_1.powerOn")
                dot-cmpt(:position="{left: 45, top: 95}" :value="0" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 120, top: 95}" :value="-3.5" suffix="dB"  value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 180, top: 35}" :value="-13" suffix="dB")
                dot-cmpt(:position="{left: 270, top: 35}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 316, top: 95}" :value="-4.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 407, top: 95}" :value="-34.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 460, top: 35}" :value="-39" suffix="dB" value-style="margin-top: 10px")
                dot-cmpt(:position="{left: 540, top: 35}" :value="0" suffix="dB" value-style="margin-top: 10px")
                dot-cmpt(:position="{left: 590, top: 95}" :value="-4.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 683, top: 95}" :value="-34.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 730, top: 35}" :value="-39" suffix="dB" value-style="margin-top: 10px")
                dot-cmpt(:position="{left: 820, top: 35}" :value="4.3" suffix="dB" value-style="margin-top: 10px")
                dot-cmpt(:position="{left: 875, top: 94}" :value="-3.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 946, top: 94}" :value="-7" suffix="dB" value-style="margin-top: 20px")
                beam-icon(:position="{left: 230, top: -40}")
                sinusoid-icon(:position="{left: -10, top: 0}")
                sinusoid-icon(:position="{left: 930, top: 0}")

            template(v-if="telephoneDevice_1.powerOn || opticalRouterDevice.passing <= 35")
                beam-icon(:position="{left: 504, top: -39}")


            template(v-if="telephoneDevice_2.powerOn || opticalRouterDevice.passing <= 35")
                beam-icon(:position="{left: 434, top: 200}" :rotate="180")

            template(v-if="telephoneDevice_2.powerOn")
                dot-cmpt(:position="{left: 45, top: 95}" :value="-7" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 120, top: 95}" :value="-3.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 180, top: 152}" :value="4.3" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 270, top: 152}" :value="-39" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 320, top: 95}" :value="-34.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 405, top: 95}" :value="-4.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 460, top: 152}" :value="0" suffix="dB" value-style="margin-top: 15px")
                dot-cmpt(:position="{left: 540, top: 152}" :value="-39" suffix="dB" value-style="margin-top: 15px")
                dot-cmpt(:position="{left: 590, top: 95}" :value="-34.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 683, top: 95}" :value="-4.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 730, top: 152}" :value="0" suffix="dB" value-style="margin-top: 15px")
                dot-cmpt(:position="{left: 820, top: 152}" :value="-13" suffix="dB" value-style="margin-top: 15px")
                dot-cmpt(:position="{left: 875, top: 95}" :value="-3.5" suffix="dB" value-style="margin-top: 20px")
                dot-cmpt(:position="{left: 945, top: 95}" :value="0" suffix="dB" value-style="margin-top: 20px")

                sinusoid-icon(:position="{left: -10, top: 150}")
                sinusoid-icon(:position="{left: 930, top: 150}")
                beam-icon(:position="{left: 154, top: 200}" :rotate="180")

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Getter} from "vuex-class";
    import TelephoneDevice from "@/models/scheme/TelephoneDevice";
    import TelephoneDeviceDialog from "@/components/Sheme/TelephoneDeviceDialog.vue";
    import DotCmpt from "@/components/Sheme/DotCmpt.vue";
    import BeamIcon from "@/components/Sheme/BeamIcon.vue";
    import OpticalRouterDevice from "@/models/scheme/OpticalRouterDevice";
    import OpticalRouterDeviceDialog from "@/components/Sheme/OpticalRouterDeviceDialog.vue";
    import {app} from "@/services/AppService";
    import TaskModalWindow from "@/components/Sheme/TaskModalWindow.vue";
    import SymbolCmpt from "@/components/SymbolCmpt.vue";
    import SinusoidIcon from "@/components/Sheme/SinusoidIcon.vue";
    import PdfViewer from "@/components/PdfViewer.vue";

    @Component({
        components: {
            PdfViewer,
            SinusoidIcon,
            OpticalRouterDeviceDialog,
            BeamIcon,
            DotCmpt,
            SymbolCmpt,
            TelephoneDeviceDialog,
            TaskModalWindow,

        }
    })
    export default class Labwork2 extends Vue {
        @Getter isDark?: boolean;

        supportShow: boolean = true;
        telephoneDeviceDialog_1: boolean = false;
        telephoneDeviceDialog_2: boolean = false;
        opticalRouterDeviceDialog: boolean = false;
        telephoneDevice_1: TelephoneDevice = new TelephoneDevice();
        telephoneDevice_2: TelephoneDevice = new TelephoneDevice();
        opticalRouterDevice: OpticalRouterDevice = new OpticalRouterDevice();

        opticalRouterDeviceSetup(): void {
            this.opticalRouterDeviceDialog = true;
        }

        opticalRouterDeviceSettuped(): void {
            this.opticalRouterDeviceDialog = false;
        }

        telephoneDevice_1_Settuped(): void {
            this.telephoneDeviceDialog_1 = false;

            if (this.telephoneDevice_1.powerOn) {
                this.telephoneDevice_2.powerOn = false;
            }
        }

        telephoneDevice_2_Settuped(): void {
            this.telephoneDeviceDialog_2 = false;

            if (this.telephoneDevice_2.powerOn) {
                this.telephoneDevice_1.powerOn = false;
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

        $size: 1024;
        min-width: #{$size}px;
        max-width: #{$size}px;

        display: flex;
        justify-content: center;
    }

    .optical-router-device, .optical-router-device-duplicate {
        $size: 40px;
        width: $size;
        height: $size;
        position: absolute;
    }

    .optical-router-device {
        top: 80px;
        left: 563px;
    }

    .optical-router-device-duplicate {
        top: 80px;
        left: 430px;
    }

    .telephone-device-dialog_1, .telephone-device-dialog_2 {
        $size: 40px;
        width: $size;
        height: $size;
        position: absolute;
    }

    .telephone-device-dialog_1 {
        top: 78px;
        left: 6px;
    }

    .telephone-device-dialog_2 {
        top: 78px;
        left: 977px;
    }
</style>

