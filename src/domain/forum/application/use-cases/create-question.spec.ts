import { CreateQuestionUseCase } from "./create-question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

const fakeQuestionsRepository: QuestionsRepository = {
    create: async (question: Question) => {
        return;
    }
}

test("create a question", async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

    const { question } = await createQuestion.execute({
        authorId: "1",
        title: "Nova Pergunta",
        content: "Conteúdo da pergunta"
    });

    expect(question.title).toEqual("Nova Pergunta");
    expect(question.content).toEqual("Conteúdo da pergunta");
    expect(question.authorId.toString()).toEqual("1");
});