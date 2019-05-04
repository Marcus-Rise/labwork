<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12.schemeContainer
            img(src="@/assets/scheme/dark2.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light2.png" usemap="#image-map" v-if="!isDark")
            .telephone-device-dialog_1(@click="telephoneDeviceDialog_1 = true")
            .telephone-device-dialog_2(@click="telephoneDeviceDialog_2 = true")

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

            template(v-if="telephoneDevice_1.powerOn")
                dot-cmpt(:position="{left: 290, top: 100}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 387, top: 100}" :value="-3.5" suffix="dB")
                dot-cmpt(:position="{left: 469, top: 22}" :value="-13" suffix="dB")
                dot-cmpt(:position="{left: 580, top: 22}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 660, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 747, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 829, top: 23}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 940, top: 23}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 1017, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 1109, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 1190, top: 22}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 1300, top: 22}" :value="4.3" suffix="dB")
                dot-cmpt(:position="{left: 1465, top: 100}" :value="-7" suffix="dB")

                beam-icon(:position="{left: 565, top: -5}")
                beam-icon(:position="{left: 925, top: -5}")
                beam-icon(:position="{left: 1285, top: -5}")

            template(v-if="telephoneDevice_2.powerOn")
                beam-icon(:position="{left: 565, top: 150}")
                beam-icon(:position="{left: 925, top: 150}")
                beam-icon(:position="{left: 1285, top: 150}")

                dot-cmpt(:position="{left: 290, top: 100}" :value="-7" suffix="dB")
                dot-cmpt(:position="{left: 465, top: 177}" :value="4.3" suffix="dB")
                dot-cmpt(:position="{left: 575, top: 177}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 655, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 745, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 825, top: 177}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 935, top: 177}" :value="-39" suffix="dB")
                dot-cmpt(:position="{left: 1015, top: 103}" :value="-34.5" suffix="dB")
                dot-cmpt(:position="{left: 1105, top: 103}" :value="-4.5" suffix="dB")
                dot-cmpt(:position="{left: 1185, top: 177}" :value="0" suffix="dB")
                dot-cmpt(:position="{left: 1295, top: 177}" :value="-13" suffix="dB")
                dot-cmpt(:position="{left: 1370, top: 100}" :value="-3.5" suffix="dB")
                dot-cmpt(:position="{left: 1465, top: 100}" :value="0" suffix="dB")


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Scheme from "@/components/Sheme/Scheme.vue";
    import {Getter} from "vuex-class";
    import TelephoneDevice from "@/models/scheme/TelephoneDevice";
    import TelephoneDeviceDialog from "@/components/Sheme/TelephoneDeviceDialog.vue";
    import DotCmpt from "@/components/Sheme/DotCmpt.vue";
    import BeamIcon from "@/components/BeamIcon.vue";

    @Component({
        components: {
            BeamIcon,
            DotCmpt,
            TelephoneDeviceDialog
        }
    })
    export default class Labwork2 extends Vue {
        @Getter isDark?: boolean;
        telephoneDeviceDialog_1: boolean = false;
        telephoneDeviceDialog_2: boolean = false;
        telephoneDevice_1: TelephoneDevice = new TelephoneDevice();
        telephoneDevice_2: TelephoneDevice = new TelephoneDevice();

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
        margin-top: 50px;
        position: relative;
        display: flex;
        justify-content: center;
    }

    .telephone-device-dialog_1, .telephone-device-dialog_2 {
        $size: 50px;
        width: $size;
        height: $size;
        position: absolute;
    }

    .telephone-device-dialog_1 {
        top: 80px;
        left: 236px;
    }

    .telephone-device-dialog_2 {
        top: 79px;
        left: 1504px;
    }

</style>

