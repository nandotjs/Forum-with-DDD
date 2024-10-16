import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("FetchRecentQuestionsUseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
    });

    it("should fetch recent questions", async () => {
        const currentYear = new Date().getFullYear();

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(currentYear, 0, 20),
        }));

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(currentYear, 0, 18),
        }));

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(currentYear, 0, 23),
        }));

        const { questions } = await sut.execute({ page: 1 });
        
        expect(questions[0].createdAt).toEqual(new Date(currentYear, 0, 23));
        expect(questions[1].createdAt).toEqual(new Date(currentYear, 0, 20));
        expect(questions[2].createdAt).toEqual(new Date(currentYear, 0, 18));
    });

    it("should fetch paginated recent questions", async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionsRepository.create(makeQuestion());
        }

        const { questions } = await sut.execute({ page: 2 });
        
        expect(questions).toHaveLength(2);
    }); 
});
