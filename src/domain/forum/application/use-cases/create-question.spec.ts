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
        const { question } = await sut.execute({
            authorId: "1",
            title: "Nova Pergunta",
            content: "Conteúdo da pergunta"
        });

        expect(question.title).toEqual("Nova Pergunta");
        expect(question.content).toEqual("Conteúdo da pergunta");
        expect(question.authorId.toString()).toEqual("1");
    });
});