import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentRequest {
    answerCommentId: string;
    authorId: string;
}

type DeleteAnswerCommentResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({ answerCommentId, authorId }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
        const comment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!comment) {
            return left("Comment not found.");
        }

        if (authorId !== comment.authorId.toString()) {
            return left("Not allowed.");
        }

        await this.answerCommentsRepository.delete(comment);

        return right({});
    }
}
