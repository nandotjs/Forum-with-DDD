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
        const { answer } = await sut.execute({
            instructorId: "1",
            questionId: "1",
            content: "Nova resposta"
        });

        expect(answer.content).toEqual("Nova resposta");
        expect(answer.authorId.toString()).toEqual("1");
        expect(answer.questionId.toString()).toEqual("1");
    });
});