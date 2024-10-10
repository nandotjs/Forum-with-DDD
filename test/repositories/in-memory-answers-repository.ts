import { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    public answers: Answer[] = [];

    async create(answer: Answer): Promise<void> {
        this.answers.push(answer);
    }

    async findById(id: string): Promise<Answer | null> {
        const answer = this.answers.find((answer) => answer.id.toString() === id);

        if (!answer) {
            return null;
        }

        return answer;
    }

    async save(answer: Answer): Promise<void> {
        const answerIndex = this.answers.findIndex((a) => a.id === answer.id);

        if (answerIndex === -1) {
            throw new Error("Answer not found.");
        }

        this.answers[answerIndex] = answer;
    }

    async delete(answer: Answer): Promise<void> {
        this.answers = this.answers.filter((a) => a.id !== answer.id);
    }

    findAll(): Answer[] {
        return this.answers;
    }
}