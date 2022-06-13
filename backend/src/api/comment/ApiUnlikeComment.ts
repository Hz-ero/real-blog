import { Global } from './../../models/Global';
import { ApiCall } from "tsrpc";
import { ReqUnlikeComment, ResUnlikeComment } from "../../shared/protocols/comment/PtlUnlikeComment";

export async function ApiUnlikeComment(call: ApiCall<ReqUnlikeComment, ResUnlikeComment>) {
    let op = await Global.collection('Post').updateOne(
        { 'comments.uid': call.req.comment_uid },
        { $pull: { 'comments.$.likes': call.req.user } },
    )
    if (!op) {
        call.error('API UnlikeComment fail');
        return;
    }
    call.succ({});
}