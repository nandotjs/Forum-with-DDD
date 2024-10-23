import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface CommentOnAnswerRequest {
    authorId: string;
    answerId: string;
    content: string;
}

interface CommentOnAnswerResponse {
    answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
    constructor(private answersRepository: AnswersRepository,private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({ authorId, answerId, content }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        });

        await this.answerCommentsRepository.create(answerComment);

        return { answerComment };
    }
}