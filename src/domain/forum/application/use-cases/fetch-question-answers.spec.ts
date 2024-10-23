import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("FetchQuestionAnswersUseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
    });

    it("should fetch question answers", async () => {
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("1"),
        }));
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("1"),
        }));
        await inMemoryAnswersRepository.create(makeAnswer({
            questionId: new UniqueEntityID("1"),
        }));

        const { answers } = await sut.execute({ page: 1, questionId: "1" });
        
        expect(answers).toHaveLength(3);
    });

    it("should fetch paginated question answers", async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(makeAnswer({
                questionId: new UniqueEntityID("1"),
            }));
        }

        const { answers } = await sut.execute({ page: 2, questionId: "1" });
        
        expect(answers).toHaveLength(2);
    }); 
});
