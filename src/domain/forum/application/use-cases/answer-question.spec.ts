import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("AnswerQuestionUseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
    });

    it("create an answer", async () => {
        const result = await sut.execute({
            instructorId: "1",
            questionId: "1",
            content: "Nova resposta"
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryAnswersRepository.answers[0]).toEqual(result.value?.answer);
    });
});