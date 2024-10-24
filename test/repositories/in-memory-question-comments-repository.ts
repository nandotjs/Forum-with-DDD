import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
    public comments: QuestionComment[] = [];

    async create(questionComment: QuestionComment): Promise<void> {
        this.comments.push(questionComment);
    }

    async findById(id: string): Promise<QuestionComment | null> {
        const comment = this.comments.find(comment => comment.id.toString() === id);

        if (!comment) {
            return null;
        }

        return comment;
    }

    async delete(questionComment: QuestionComment): Promise<void> {
        this.comments = this.comments.filter(comment => comment.id !== questionComment.id);
    }
}
