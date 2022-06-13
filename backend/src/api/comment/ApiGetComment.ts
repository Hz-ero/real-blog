import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqGetComment, ResGetComment } from "../../shared/protocols/comment/PtlGetComment";

export async function ApiGetComment(call: ApiCall<ReqGetComment, ResGetComment>) {
    let op = await Global.collection('Post').findOne({ _id: new ObjectId(call.req.post_id) });
    if (!op?.comments) {
        call.error('API GetComment fail');
        return;
    }
    call.succ({ comments: op.comments });
}