import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

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
            content: "Conteúdo da pergunta",
            attachmentsIds: ["1", "2"]
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryQuestionsRepository.questions[0]).toEqual(result.value?.question);
        expect(inMemoryQuestionsRepository.questions[0].attachments.currentItems).toHaveLength(2);
        expect(inMemoryQuestionsRepository.questions[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
            expect.objectContaining({ attachmentId: new UniqueEntityID("2") }),
        ]);
    });
});