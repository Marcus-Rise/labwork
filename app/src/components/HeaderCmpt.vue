<template lang="pug">
    v-toolbar
        v-toolbar-side-icon
        v-toolbar-title
            router-link.link(:to="{name: 'index'}") Оптический дуплексный усилитель
        v-spacer
        div.d-flex.align-center.justify-center
            v-icon wb_sunny
            v-switch.align-center.flex.themeSwitch(:value="isThemeDark" @change="toggleTheme(!isDark)")
            v-icon brightness_3
        v-spacer
        v-toolbar-items.hidden-sm-and-down
            router-link.navLink.link(:to="{name: 'theory'}" :class="{'light': !isDark, 'dark': isDark}") Теория
            router-link.navLink.link(v-if="!examPassed" :to="{name: 'testing'}" :class="{'light': !isDark, 'dark': isDark}") Тестирование
            router-link.navLink.link(v-if="examPassed" :to="{name: 'labwork'}" :class="{'light': !isDark, 'dark': isDark}") Часть 1
            router-link.navLink.link(v-if="examPassed" :to="{name: 'labwork2'}" :class="{'light': !isDark, 'dark': isDark}") Часть 2
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter, Mutation, } from "vuex-class";

    @Component
    export default class HeaderCmpt extends Vue {
        @Getter examPassed?: boolean;
        @Getter isDark?: boolean;
        @Mutation toggleTheme: any;

        isThemeDark: boolean = false;


        mounted() {
            this.isThemeDark = this.$store.getters.isDark;
        }
    }
</script>

<style lang="scss" >
    @import "~vuetify-scss";

    .themeSwitch {
        margin: 0 10px !important;

        & > .v-input__control > .v-input__slot {
            margin: 0;
        }
    }

    a.link {
        text-decoration: none;
        color: inherit;
    }

    .navLink {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 1.2rem;
        padding: 0 15px;

        &.light {
            &:hover {
                background-color: #dfdfdf;
            }
        }

        &.dark {
            &:hover {
                background-color: #3f3f3f;
            }
        }

        &:not(:last-child) {
            /*margin-right: 15px;*/
        }
    }
</style>
