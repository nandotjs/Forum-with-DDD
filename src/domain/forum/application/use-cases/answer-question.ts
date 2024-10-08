import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

interface AnswerQuestionResponse {
    answer: Answer;
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ instructorId, questionId, content }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
        const answer = Answer.create({ 
            content, 
            authorId: new UniqueEntityID(instructorId), 
            questionId: new UniqueEntityID(questionId)
        });

        await this.answersRepository.create(answer);

        return { answer };
    }
}