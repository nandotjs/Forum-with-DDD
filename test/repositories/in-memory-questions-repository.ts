import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    private questions: Question[] = [];

    async create(question: Question): Promise<void> {
        this.questions.push(question);
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.questions.find(question => question.slug.value === slug);

        if (!question) {
            return null;
        }

        return question;
    }

    findAll(): Question[] {
        return this.questions;
    }
}