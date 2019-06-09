<template lang="pug">
    div
        v-container
            v-layout(
                v-if="quiz && !isComplete"
                row
                wrap
            )
                v-flex.xs12.pagination
                    .text-xs-center
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
                    )
                        v-img.grey.lighten-2(
                            :src="question.img"
                            :lazy-src="question.img"
                            aspect-ratio="1"
                            height="300"
                        )
                    v-flex(
                        sm12
                    ).answerList
                        ul
                            template(
                                v-if="!question.multiply"
                            )
                                li(
                                    v-for="(answer, index) in question.answers"
                                    :class="{'light': !isDark, 'dark': isDark, 'disabled': isQuestionDisabled}"
                                    @click="answerQuestion([answer])"
                                )
                                    p {{index + 1}}. {{answer.title}}
                                    v-img(
                                        v-if="answer.img"
                                        :src="answer.img"
                                        :lazy-src="answer.img"
                                        :height="getAnswerImgSize(answer).height"
                                        :width="getAnswerImgSize(answer).width"
                                        style="margin: 0 auto"
                                        contain
                                    )
                            template(
                                v-else
                            )
                                li(
                                    v-for="(answer, index) in question.answers"
                                    :class="{'light': !isDark, 'dark': isDark}"
                                )
                                    v-layout(row)
                                        v-flex(sm1)
                                            v-checkbox(
                                                v-model="answer.selected"
                                                :disabled="isQuestionDisabled"
                                            )
                                        v-flex(sm11 layout align-center)
                                            p {{index + 1}}. {{answer.title}}
                                            v-img(
                                                v-if="answer.img"
                                                :src="answer.img"
                                                :lazy-src="answer.img"
                                                :height="getAnswerImgSize(answer).height"
                                                :width="getAnswerImgSize(answer).width"
                                                style="margin: 0 auto"
                                                contain
                                            )
                    v-flex(
                        v-if="question.multiply"
                        layout
                        justify-center
                        sm12
                    )
                        v-btn(
                            color="primary"
                            large
                            @click="answerQuestion(selectedAnswers)"
                            :disabled="isQuestionDisabled || selectedAnswers.length === 0"
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

        get selectedAnswers(): Answer[] {
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

        get isQuestionDisabled(): boolean {
            return this.question ? this.question.status !== null : false;
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

                &:not(.disabled):hover {
                    cursor: pointer;
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

