<template lang="pug">
    v-container.max-width
        pdf-viewer(src="theory.pdf")
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import PdfViewer from "@/components/PdfViewer.vue";

    @Component({
        components: {
            PdfViewer,
        }
    })
    export default class Theory extends Vue {

    }
</script>

<style scoped>
    .max-width {
        max-width: 1000px;
    }
</style>
