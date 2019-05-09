<template lang="pug">
    div
        v-layout.row.wrap(v-if="quiz && !isComplete")
            v-flex.xs12.pagination
                .text-xs-center
                    v-pagination(v-model="questionIndexCurrent" :length="quiz.questions.length")
            v-flex.xs12(v-if="question")
                .text-xs-center
                    h1 Вопрос {{questionIndexCurrent}}. {{question.title}}
                v-container
                    .answerList
                        ul
                            li(v-for="(answer, index) in question.answers"
                                :class="{'light': !isDark, 'dark': isDark}"
                                @click="answerQuestion(answer)"
                            ) {{index + 1}}. {{answer.title}}

        v-layout.row.justify-center.wrap(v-if="quiz && isComplete")
            v-flex.xs12
                .text-xs-center
                    h1(v-if="quiz.status") Допуск получен
                    h1(v-if="!quiz.status") Допуск не получен
            v-flex.xs12.text-xs-center
                v-btn(color="info" @click="restart()" v-if="!quiz.status") Пройти тест еще раз
            v-layout.row.wrap
                v-flex.sm12.text-xs-center
                    router-link(:to="{name: 'labwork'}" v-if="quiz.status") Перейти к выполнению лабораторной работы №1
                v-flex.sm12.text-xs-center
                    router-link(:to="{name: 'labwork2'}" v-if="quiz.status") Перейти к выполнению лабораторной работы №2
                v-flex.sm12.text-xs-center
                    router-link(:to="{name: 'labwork3'}" v-if="quiz.status") Перейти к выполнению лабораторной работы №3

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import data from '@/models/testing/questions.json';
    import Quiz from "@/models/testing/Quiz";
    import Question from "@/models/testing/Question";
    import {Getter, Mutation} from "vuex-class";
    import Answer from "@/models/testing/Answer";

    @Component({
        components: {}
    })
    export default class Testing extends Vue {
        @Getter isDark?: boolean;
        @Mutation passExam?: any;

        quiz?: Quiz;
        questionIndexCurrent: number = 1;
        isComplete: boolean = false;

        created(): void {
            this.quiz = new Quiz(data);
        }

        get question(): Question | null {
            return this.quiz && this.quiz.questions.length > 0 ? this.quiz.questions[this.questionIndexCurrent - 1] : null;
        }

        @Watch('isComplete')
        completeWatch() {
            if (this.quiz) {
                this.passExam(this.quiz.status);
            }
        }

        next(): void {
            if (this.quiz && this.questionIndexCurrent < this.quiz.questions.length) {
                this.questionIndexCurrent++;
            }
        }

        answerQuestion(answer: Answer): void {
            if (this.quiz && this.question) {
                this.question.answer(answer);
                const index: number | null = this.quiz.firstUnAnsweredIndex;

                console.log(this.quiz);

                if (!this.quiz.isComplite) {
                    if (index && this.questionIndexCurrent === this.quiz.questions.length) {
                        this.questionIndexCurrent = index + 1;
                    } else {
                        this.next();
                    }
                }

                this.isComplete = this.quiz.isComplite;
                console.log("isComplete", this.isComplete);
            }
        }

        restart(): void {
            if (this.quiz) {
                this.quiz.clear();
                this.questionIndexCurrent = 1;
                this.isComplete = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        margin-bottom: 20px;
    }

    .answerList {
        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;

            li {
                font-size: 1.5rem;
                padding: 10px 20px;

                margin-bottom: 15px;

                &.light {
                    background-color: #c6c6c6;

                    &:hover {
                        filter: brightness(105%);
                    }
                }

                &.dark {
                    background-color: #6E6E6E;

                    &:hover {
                        filter: brightness(110%);
                    }
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .flex {
        img {
            height: 200px;
        }
    }

</style>

