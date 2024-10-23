import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export interface AnsewrCommentProps extends CommentProps {
    answerId: UniqueEntityID;
}

export class AnsewrComment extends Comment<AnsewrCommentProps> {

    get answerId() {
        return this.props.answerId;
    }

    static create(props: Optional<AnsewrCommentProps, "createdAt">, id?: UniqueEntityID) {
        const ansewrComment = new AnsewrComment({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)

        return ansewrComment
    }
}