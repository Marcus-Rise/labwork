<template lang="pug">
    div


        v-container
            v-layout(
                v-if="quiz && !isComplete"
                row
                wrap
            )
                testing-unlock-cmpt(
                    @unlock="unlock"
                )
                v-flex.xs12.pagination.text-xs-center
                    v-pagination(
                        v-model="questionIndexCurrent"
                        :length="quiz.questions.length"
                    )
                template(
                    v-if="question"
                )
                    v-flex(
                        sm12
                    )
                        .text-xs-center
                            h1 Вопрос {{questionIndexCurrent}}. {{question.title}}

                    v-flex(
                        v-if="question.img"
                        sm12
                        style="margin-bottom: 15px"
                    )
                        v-img.grey.lighten-2(
                            :src="question.img"
                            :lazy-src="question.img"
                            aspect-ratio="1"
                            height="300"
                            contain
                        )
                    v-flex(
                        sm12
                    ).answerList
                        ul
                            li(
                                v-for="(answer, index) in question.answers"
                                :class="{'light': !isDark, 'dark': isDark}"
                            )
                                v-layout(
                                    row
                                )
                                    v-flex(
                                        sm1
                                        layout
                                        align-center
                                    )
                                        v-checkbox(
                                            v-if="question.multiply"
                                            v-model="answer.selected"
                                            @change="updateAnswers"
                                            :disabled="isQuestionDisabled"
                                        )

                                        v-radio-group(
                                            v-if="!question.multiply"
                                            v-model="answer.selected"
                                            @change="updateAnswers(answer)"
                                            :disabled="isQuestionDisabled"
                                        )
                                            v-radio(
                                                :value="true"
                                            )
                                            v-radio(
                                                :value="false"
                                                v-show="false"
                                            )
                                    v-flex(
                                        sm1
                                        layout
                                        align-center
                                    )
                                        p {{index + 1}}.
                                    v-flex(
                                        sm11
                                        layout
                                        align-center
                                        justify-center
                                        row
                                    )
                                        v-flex(
                                            v-if="answer.title"
                                            sm
                                        )
                                            p {{answer.title}}
                                        v-flex(
                                            sm6
                                        )
                                            v-img.grey.lighten-2(
                                                v-if="answer.img"
                                                :src="answer.img"
                                                :lazy-src="answer.img"
                                                :height="getAnswerImgSize(answer).height"
                                                :width="getAnswerImgSize(answer).width"
                                                style="margin: 0 auto"
                                                contain
                                            )
                    v-flex(
                        v-if="!isQuestionDisabled"
                        layout
                        justify-center
                        sm12
                    )
                        v-btn(
                            color="primary"
                            large
                            @click="answerQuestion(selectedAnswers)"
                            :disabled="selectedAnswers.length === 0"
                        ) Ответить


            v-layout.row.justify-center.wrap(
                v-if="quiz && isComplete"
            )
                v-flex.xs12
                    .text-xs-center
                        h1(
                            v-if="quiz.status"
                        ) Допуск получен
                        h1(
                            v-if="!quiz.status"
                        ) Допуск не получен
                v-flex.xs12.text-xs-center
                    v-btn(
                        v-if="!quiz.status"
                        color="info"
                        @click="restart()"
                    ) Пройти тест еще раз
                v-layout.row.wrap
                    v-flex.sm12.text-xs-center
                        router-link(
                            v-if="quiz.status"
                            :to="{name: 'labwork'}"
                        ) Перейти к выполнению лабораторной работы №1
                    v-flex.sm12.text-xs-center
                        router-link(
                            v-if="quiz.status"
                            :to="{name: 'labwork2'}"
                        ) Перейти к выполнению лабораторной работы №2
                    v-flex.sm12.text-xs-center
                        router-link(
                            v-if="quiz.status"
                            :to="{name: 'labwork3'}"
                        ) Перейти к выполнению лабораторной работы №3

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import data from '@/assets/questions.json';
    import Quiz from "@/models/testing/Quiz";
    import Question from "@/models/testing/Question";
    import {Getter, Mutation} from "vuex-class";
    import Answer from "@/models/testing/Answer";
    import TestingUnlockCmpt from "@/components/TestingUnlockCmpt.vue";

    @Component({
        components: {TestingUnlockCmpt}
    })
    export default class Testing extends Vue {
        @Getter isDark?: boolean;
        @Mutation passExam?: any;

        quiz?: Quiz;
        questionIndexCurrent: number = 1;
        isComplete: boolean = false;
        selectedAnswers: Answer[] = [];
        isQuestionDisabled: boolean = false;

        unlock(): void {
            if (this.quiz) {
                this.quiz.unlock();
                this.isComplete = true;
            }
        }

        created(): void {
            this.quiz = new Quiz(data);
        }

        get question(): Question | null {
            const question: Question | null = this.quiz &&
            this.quiz.questions.length > 0 ? this.quiz.questions[this.questionIndexCurrent - 1] : null;


            if (question) {
                this.selectedAnswers = question.answers.filter(item => item.selected);
                this.isQuestionDisabled = question.status !== null;
            } else {
                this.selectedAnswers = [];
                this.isQuestionDisabled = false;
            }

            return question;
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

        updateAnswers(answer?: Answer): void {
            if (this.question && answer && !this.question.multiply) {
                this.question.clearAnswers();
                answer.selected = true;
            }

            this.selectedAnswers = this.getSelectedAnswers();
        }

        getSelectedAnswers(): Answer[] {
            let value: Answer[] = [];

            if (this.question) {
                value = this.question.answers.filter(item => item.selected);
            }

            return value;
        }

        answerQuestion(answers: Answer[]): void {
            if (!this.isQuestionDisabled) {

                if (this.quiz && this.question) {
                    this.question.answer(answers);
                    this.isQuestionDisabled = true;

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
                    const percent: number = this.quiz.questions.filter(item => {
                        return item.status === true
                    }).length / this.quiz.questions.length * 100;

                    console.log("%", parseInt(String(percent)));

                    console.log("isComplete", this.isComplete);
                }
            }

        }

        getAnswerImgSize(answer: Answer): { width: number, height: number } {
            const width: number = answer.imgWidth ? parseInt(answer.imgWidth) : 450;
            const height: number = answer.imgHeight ? parseInt(answer.imgHeight) : 200;

            return {
                width,
                height
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

                    &:not(.disabled):hover {
                        filter: brightness(105%);
                    }
                }

                &.dark {
                    background-color: #6E6E6E;

                    &:not(.disabled):hover {
                        filter: brightness(110%);
                    }
                }

                p {
                    margin: 0;
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

