import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryQuestionsCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("CommentOnQuestionUseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository();
        sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository);
    });

    it("should create a comment on a question", async () => {
        const question = Question.create({
            authorId: new UniqueEntityID("1"),
            title: "Sample Question",
            content: "This is a sample question content",
        });

        await inMemoryQuestionsRepository.create(question);

        const { questionComment } = await sut.execute({
            authorId: "2",
            questionId: question.id.toString(),
            content: "This is a comment"
        });

        expect(questionComment.content).toEqual("This is a comment");
        expect(questionComment.authorId.toString()).toEqual("2");
        expect(questionComment.questionId.toString()).toEqual(question.id.toString());
    });

    it("should throw an error if the question does not exist", async () => {
        await expect(sut.execute({
            authorId: "2",
            questionId: "non-existent-question-id",
            content: "This is a comment"
        })).rejects.toThrow("Question not found.");
    });
});

