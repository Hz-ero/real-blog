import { Global } from "./../../models/Global";
import { ApiCall } from "tsrpc";
import {
    ReqGetCount,
    ResGetCount,
} from "../../shared/protocols/post/PtlGetCount";
import { TypeDeduce } from "../../shared/models";

export async function ApiGetCount(call: ApiCall<ReqGetCount, ResGetCount>) {
    let queryOption = {};
    let query = call.req.query;
    TypeDeduce.isTag(query) && Object.assign(queryOption, { tags: query.tag });
    TypeDeduce.isCategory(query) &&
        Object.assign(queryOption, { category: query.category });

    let op = await Global.collection("Post").countDocuments(queryOption);
    if (!op) {
        call.error("api getCount fail");
        return;
    }
    call.succ(op);
}
