<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12.schemeContainer
            img(src="@/assets/scheme/dark2.png" usemap="#image-map" v-if="isDark")
            img(src="@/assets/scheme/light2.png" usemap="#image-map" v-if="!isDark")

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Scheme from "@/components/Sheme/Scheme.vue";
    import {Getter} from "vuex-class";

    @Component({
        components: {
            Scheme,
        }
    })
    export default class Labwork2 extends Vue {
        @Getter isDark?: boolean;
    }
</script>

<style lang="scss" scoped>
    .schemeContainer {
        margin: 0 auto;
        position: relative;
        $size: 1500px;
        max-width: $size;
        min-width: $size;
        img {
            width: 100%;
        }
    }

</style>

