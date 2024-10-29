import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("ChooseQuestionBestAnswerUseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository);
    });

    it("should be able to choose a question best answer", async () => {
        const question = makeQuestion();
        const answer = makeAnswer({
            questionId: question.id
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString()
        });

        expect(inMemoryQuestionsRepository.questions[0].bestAnswerId).toEqual(answer.id);
    });

    it("should not be able to choose a question best answer from another user", async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID("author-1")
        });
        const answer = makeAnswer({
            questionId: question.id
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId: "author-2"
        });
        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
