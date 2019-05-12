<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12
            task-modal-window(v-model="supportShow")
        v-flex.xs12.schemeContainer
            img(src="@/assets/scheme/dark2.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light2.png" usemap="#image-map" v-if="!isDark")
            .telephone-device-dialog_1.mapped-element(@click="telephoneDeviceDialog_1 = true")
            .telephone-device-dialog_2.mapped-element(@click="telephoneDeviceDialog_2 = true")
            template(v-if="telephoneDevice_1.powerOn || telephoneDevice_2.powerOn")
                v-tooltip(lazy bottom)
                    .optical-router-device.mapped-element(slot="activator")
                    span Отключите подачу сигнала
                v-tooltip(lazy bottom)
                    .optical-router-device-duplicate.mapped-element(slot="activator")
                    span Отключите подачу сигнала
            template(v-else)
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
                dot-cmpt(:position="{left: 65, top: 100}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 160, top: 100}" :value="-3.5" suffix="dB")
                dot-cmpt(:position="{left: 245, top: 22}" :value="-13" suffix="dB")
                dot-cmpt(:position="{left: 355, top: 22}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 435, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 523, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 605, top: 23}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 710, top: 23}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 790, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 880, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 960, top: 22}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 1070, top: 22}" :value="4.3" suffix="dB")
                dot-cmpt(:position="{left: 1240, top: 100}" :value="-7" suffix="dB")
                beam-icon(:position="{left: 335, top: -5}")
                beam-icon(:position="{left: 1055, top: -5}")

            template(v-if="telephoneDevice_1.powerOn || opticalRouterDevice.passing <= 35")
                beam-icon(:position="{left: 695, top: -5}")

            template(v-if="telephoneDevice_2.powerOn || opticalRouterDevice.passing <= 35")
                beam-icon(:position="{left: 553, top: 197}" :rotate="180")

            template(v-if="telephoneDevice_2.powerOn")
                dot-cmpt(:position="{left: 65, top: 100}" :value="-7" suffix="dB")
                dot-cmpt(:position="{left: 245, top: 177}" :value="4.3" suffix="dB")
                dot-cmpt(:position="{left: 355, top: 177}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 435, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 523, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 605, top: 177}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 710, top: 177}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 790, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 880, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 960, top: 177}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 1070, top: 177}" :value="-13" suffix="dB")
                dot-cmpt(:position="{left: 1150, top: 100}" :value="-3.5" suffix="dB")
                dot-cmpt(:position="{left: 1240, top: 100}" :value="0" suffix="dB")

                beam-icon(:position="{left: 195, top: 195}" :rotate="180")
                beam-icon(:position="{left: 911, top: 195}" :rotate="180")

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

    @Component({
        components: {
            OpticalRouterDeviceDialog,
            BeamIcon,
            DotCmpt,
            TelephoneDeviceDialog,
            TaskModalWindow,

        }
    })
    export default class Labwork2 extends Vue {
        @Getter isDark?: boolean;

        supportShow: boolean = !app.isDevMode;
        telephoneDeviceDialog_1: boolean = false;
        telephoneDeviceDialog_2: boolean = false;
        opticalRouterDeviceDialog: boolean = false;
        telephoneDevice_1: TelephoneDevice = new TelephoneDevice();
        telephoneDevice_2: TelephoneDevice = new TelephoneDevice();
        opticalRouterDevice: OpticalRouterDevice = new OpticalRouterDevice();

        opticalRouterDeviceSetup(): void {
            if (!this.telephoneDevice_1.powerOn && !this.telephoneDevice_2.powerOn) {
                this.opticalRouterDeviceDialog = true;
            }
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

        mounted() {
        }
    }
</script>

<style lang="scss" scoped>

    .schemeContainer {
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        position: relative;

        $size: 1336;
        min-width: #{$size}px;
        max-width: #{$size}px;
    }

    .optical-router-device, .optical-router-device-duplicate {
        $size: 50px;
        width: $size;
        height: $size;
        position: absolute;
    }

    .optical-router-device {
        top: 83px;
        left: 736px;
    }

    .optical-router-device-duplicate {
        top: 83px;
        left: 562px;
    }

    .telephone-device-dialog_1, .telephone-device-dialog_2 {
        $size: 50px;
        width: $size;
        height: $size;
        position: absolute;
    }

    .telephone-device-dialog_1 {
        top: 80px;
        left: 10px;
    }

    .telephone-device-dialog_2 {
        top: 79px;
        left: 1276px;
    }

</style>

