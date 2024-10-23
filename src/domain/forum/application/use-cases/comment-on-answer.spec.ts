import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("CommentOnAnswerUseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
    });

    it("should create a comment on an answer", async () => {
        const answer = makeAnswer();
        await inMemoryAnswersRepository.create(answer);

        const { answerComment } = await sut.execute({
            authorId: "2",
            answerId: answer.id.toString(),
            content: "This is a comment"
        });

        expect(answerComment.content).toEqual("This is a comment");
        expect(answerComment.authorId.toString()).toEqual("2");
        expect(answerComment.answerId.toString()).toEqual(answer.id.toString());
    });

    it("should throw an error if the answer does not exist", async () => {
        await expect(sut.execute({
            authorId: "2",
            answerId: "non-existent-answer-id",
            content: "This is a comment"
        })).rejects.toThrow("Answer not found.");
    });
});
