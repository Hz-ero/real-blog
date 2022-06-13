import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqAddReply, ResAddReply } from "../../shared/protocols/comment/PtlAddReply";

export async function ApiAddReply(call: ApiCall<ReqAddReply, ResAddReply>) {
    let op = await Global.collection('Post').updateOne(
        { 'comments.uid': call.req.comment_uid },
        { $push: { 'comments.$.replies': call.req.reply } },
    )
    if (!op) {
        call.error('API AddReply fail');
        return;
    }
    call.succ({});
}