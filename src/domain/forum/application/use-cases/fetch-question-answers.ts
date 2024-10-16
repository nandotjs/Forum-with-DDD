import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface FetchQuestionAnswersRequest {
    page: number;
    questionId: string;
}

interface FetchQuestionAnswersResponse {
    answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ page, questionId }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

        return { answers };
    }
}