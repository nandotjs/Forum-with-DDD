import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resouce-not-found-error";

interface EditAnswerRequest {
    answerId: string;
    authorId: string;
    content: string;
}

type EditAnswerResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        answer: Answer;
    }
>

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ answerId, authorId, content }: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError());
        }

        answer.content = content;

        await this.answersRepository.save(answer);

        return right({
            answer
        });
    }
}