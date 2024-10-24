import { QuestionsCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentRequest {
    questionCommentId: string;
    authorId: string;
}

interface DeleteQuestionCommentResponse {}

export class DeleteQuestionCommentUseCase {
    constructor(private questionCommentsRepository: QuestionsCommentsRepository) {}

    async execute({ questionCommentId, authorId }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
        const comment = await this.questionCommentsRepository.findById(questionCommentId);

        if (!comment) {
            throw new Error("Comment not found.");
        }

        if (authorId !== comment.authorId.toString()) {
            throw new Error("Not allowed.");
        }

        await this.questionCommentsRepository.delete(comment);

        return {};
    }
}
