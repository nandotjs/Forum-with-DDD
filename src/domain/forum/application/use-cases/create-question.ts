import { Either, right } from "@/core/either";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionRequest {
    authorId: string;
    title: string;
    content: string;
}

type CreateQuestionResponse = Either<
    null,
    {
        question: Question;
    }
>

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ authorId, title, content }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const question = Question.create({
            title,
            content,
            authorId: new UniqueEntityID(authorId)
        });

        await this.questionsRepository.create(question);

        return right({
            question
        });
    }
}
