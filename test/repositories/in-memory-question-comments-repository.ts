import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
    public comments: QuestionComment[] = [];

    async create(questionComment: QuestionComment): Promise<void> {
        this.comments.push(questionComment);
    }
}