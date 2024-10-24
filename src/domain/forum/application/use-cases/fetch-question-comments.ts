import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsRequest {
    questionId: string;
    page: number;
}

interface FetchQuestionCommentsResponse {
    comments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

    async execute({ questionId, page }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
        const comments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

        return { comments };
    }
}
