<template lang="pug">
    v-layout(row wrap justify-center)
        v-flex.actions(
            v-if="!fixedPage"
            sm12 layout row justify-space-between align-center
        )
            v-icon(large @click="prev") chevron_left
            v-text-field.input(
                v-model="page"
                type="number"
                :min="1"
                :max="totalPages"
                :hint="actionsTitle"
                persistent-hint                )
            v-icon(large @click="next") chevron_right
        v-flex(sm12)
            pdf(:src="src" :resize="true" :scale="0.5" :page="parseInt(page)" @numpages="getPdf")
        v-flex.actions(
            v-if="!fixedPage"
            sm12 layout row justify-space-between align-center
        )
            v-icon(large @click="prev") chevron_left
            v-text-field.input(
                v-model="page"
                type="number"
                :min="1"
                :max="totalPages"
                :hint="actionsTitle"
                persistent-hint
            )
            v-icon(large @click="next") chevron_right
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    // @ts-ignore
    import pdf from 'pdfvuer';

    @Component({
        components: {
            pdf
        }
    })
    export default class Theory extends Vue {
        @Prop() public readonly fixedPage?: number;
        @Prop() public readonly src!: string;

        page: number = 1;
        totalPages: number = 0;

        get actionsTitle(): string {
            return this.page + ' страниц из ' + this.totalPages;
        }

        created() {
            if (this.fixedPage) {
                this.page = this.fixedPage;
                this.totalPages = 1;
            }
        }

        next(): void {
            if (this.page < this.totalPages) {
                this.page++;
            }
        }

        prev(): void {
            if (this.page > 1) {
                this.page--;
            }
        }

        getPdf(e: number): void {
            this.totalPages = e;
        }
    }
</script>

<style lang="scss" scoped>
    .actions {
        max-width: 300px;
        font-size: 1.2rem;
        margin: 10px 0;

        .input {
            max-width: 150px;
            text-align: center;
        }
    }
</style>

