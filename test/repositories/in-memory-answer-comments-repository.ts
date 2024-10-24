import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
    public comments: AnswerComment[] = [];

    async create(answerComment: AnswerComment): Promise<void> {
        this.comments.push(answerComment);
    }

    async findById(id: string): Promise<AnswerComment | null> {
        const comment = this.comments.find(comment => comment.id.toString() === id);

        if (!comment) {
            return null;
        }

        return comment;
    }

    async delete(answerComment: AnswerComment): Promise<void> {
        this.comments = this.comments.filter(comment => comment.id !== answerComment.id);
    }
}
