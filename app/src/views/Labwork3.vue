<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12.schemeContainer
            img(src="@/assets/scheme/dark3.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light3.png" usemap="#image-map" v-if="!isDark")

            dot-cmpt(
                :position="{left: 258, top: 22}"
                :value="-40"
                hover
                labelUp="P1"
            )
            dot-cmpt(
                :position="{left: 378, top: 22}"
                :value="-6"
                labelUp="P2"
            )

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "vuex-class";
    import DotCmpt from "@/components/Sheme/DotCmpt.vue";

    @Component({
        components: {
            DotCmpt,
        }
    })
    export default class Labwork3 extends Vue {
        @Getter isDark?: boolean;
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

</style>
