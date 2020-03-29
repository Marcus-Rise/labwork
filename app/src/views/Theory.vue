<template lang="pug">
    pdf-viewer
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
