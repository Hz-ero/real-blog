import { ObjectID } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqAddComment, ResAddComment } from "../../shared/protocols/comment/PtlAddComment";

export async function ApiAddComment(call: ApiCall<ReqAddComment, ResAddComment>) {
    let op = await Global.collection('Post').updateOne(
        { _id: new ObjectID(call.req.post_id) },
        { $push: { comments: call.req.comment } },
    )
    if (!op) {
        call.error('API AddComment fail');
        return;
    }
    call.succ({});
}