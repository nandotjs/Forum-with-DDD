
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comments";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("DeleteAnswerCommentUseCase", () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
        sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
    });

    it("should be able to delete a answer comment", async () => {
        const comment = makeAnswerComment({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("comment-1"));

        await inMemoryAnswerCommentsRepository.create(comment);

        await sut.execute({
            answerCommentId: "comment-1",
            authorId: "author-1"
        });

        expect(inMemoryAnswerCommentsRepository.comments).toHaveLength(0);
    });

    it("should not be able to delete a comment from another user", async () => {
        const comment = makeAnswerComment({
            authorId: new UniqueEntityID("author-1")
        });

        await inMemoryAnswerCommentsRepository.create(comment);

        const result = await sut.execute({
            answerCommentId: comment.id.toString(),
            authorId: "author-2"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
