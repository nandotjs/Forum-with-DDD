import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("GetQuestionBySlugUseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
    });

    it("should be able to get a question by slug", async () => {
        const newQuestion = Question.create({
            title: "Example Question",
            slug: Slug.create("example-question"),
            authorId: new UniqueEntityID("1"),
            content: "Example content"
        });

        await inMemoryQuestionsRepository.create(newQuestion);

        const { question } = await sut.execute({
            slug: "example-question"
        });

        expect(question.title).toEqual("Example Question");
    });
});