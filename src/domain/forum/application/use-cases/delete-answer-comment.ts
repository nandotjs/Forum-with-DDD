import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentRequest {
    answerCommentId: string;
    authorId: string;
}

interface DeleteAnswerCommentResponse {}

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({ answerCommentId, authorId }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
        const comment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!comment) {
            throw new Error("Comment not found.");
        }

        if (authorId !== comment.authorId.toString()) {
            throw new Error("Not allowed.");
        }

        await this.answerCommentsRepository.delete(comment);

        return {};
    }
}
