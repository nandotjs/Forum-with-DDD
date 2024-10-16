import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public questions: Question[] = [];

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

    async findById(id: string): Promise<Question | null> {
        const question = this.questions.find(question => question.id.toString() === id);

        if (!question) {
            return null;
        }

        return question;
    }

    async save(question: Question): Promise<void> {
        const questionIndex = this.questions.findIndex((q) => q.id === question.id);

        if (questionIndex === -1) {
            return;
        }

        this.questions[questionIndex] = question;
    }
    
    async delete(question: Question): Promise<void> {
        const questionIndex = this.questions.findIndex((q) => q.id === question.id);

        if (questionIndex === -1) {
            return;
        }

        this.questions.splice(questionIndex, 1);
    }

    async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
        const questions = this.questions
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20);

        return questions;
    }

    findAll(): Question[] {
        return this.questions;
    }
}