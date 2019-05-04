<template lang="pug">
    div
        v-app( :dark="isDark")
            header-cmpt
            v-container.fluid
                router-view
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter, Mutation} from "vuex-class";
    import HeaderCmpt from "@/components/HeaderCmpt.vue";
    @Component({
        components: {HeaderCmpt}
    })
    export default class extends Vue {
        @Getter isDark?: boolean;
    }
</script>

<style lang="scss">
    .mapped-element {
        &:hover {
            background-color: rgba(167, 36, 255, 0.35);
            cursor: pointer;
        }
    }
</style>

