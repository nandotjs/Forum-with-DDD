import { InMemoryQuestionsCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("DeleteQuestionCommentUseCase", () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionsCommentsRepository();
        sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
    });

    it("should be able to delete a question comment", async () => {
        const comment = makeQuestionComment({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("comment-1"));

        await inMemoryQuestionCommentsRepository.create(comment);

        await sut.execute({
            questionCommentId: "comment-1",
            authorId: "author-1"
        });

        expect(inMemoryQuestionCommentsRepository.comments).toHaveLength(0);
    });

    it("should not be able to delete a comment from another user", async () => {
        const comment = makeQuestionComment({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("comment-1"));

        await inMemoryQuestionCommentsRepository.create(comment);

        await expect(() => {
            return sut.execute({
                questionCommentId: "comment-1",
                authorId: "author-2"
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should throw an error if the comment does not exist", async () => {
        await expect(sut.execute({
            questionCommentId: "non-existent-comment-id",
            authorId: "author-1"
        })).rejects.toThrow("Comment not found.");
    });
});
