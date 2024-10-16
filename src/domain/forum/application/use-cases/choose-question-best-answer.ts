import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerRequest {
    authorId: string;
    answerId: string;
}

interface ChooseQuestionBestAnswerResponse {
    question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
    constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionsRepository) {}

    async execute({ authorId, answerId }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        const question = await this.questionsRepository.findById(answer.questionId.toValue());

        if (!question) {
            throw new Error("Question not found.");
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error("Not allowed.");
        }

        question.bestAnswerId = answer.id;

        await this.questionsRepository.save(question);

        return { question };
    }
}