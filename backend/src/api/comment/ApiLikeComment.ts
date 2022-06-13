import { Global } from './../../models/Global';
import { ApiCall } from "tsrpc";
import { ReqLikeComment, ResLikeComment } from "../../shared/protocols/comment/PtlLikeComment";

export async function ApiLikeComment(call: ApiCall<ReqLikeComment, ResLikeComment>) {
    let op = await Global.collection('Post').updateOne(
        { 'comments.uid': call.req.comment_uid },
        { $push: { 'comments.$.likes': call.req.user } },
    )
    if (!op) {
        call.error('API LikeComment fail');
        return;
    }
    call.succ({});
}