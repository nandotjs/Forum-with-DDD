import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("CreateQuestionUseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
    });

    it("should create a question", async () => {
        const result = await sut.execute({
            authorId: "1",
            title: "Nova Pergunta",
            content: "Conteúdo da pergunta"
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryQuestionsRepository.questions[0]).toEqual(result.value?.question);
    });
});