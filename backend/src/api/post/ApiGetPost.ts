import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { TypeDeduce } from "../../shared/models";
import { ReqGetPost, ResGetPost } from "../../shared/protocols/post/PtlGetPost";

export async function ApiGetPost(call: ApiCall<ReqGetPost, ResGetPost>) {
    let queryOption = {};
    const { skip, limit } = call.req;
    let query = call.req.query;
    TypeDeduce.isID(query) &&
        Object.assign(queryOption, { _id: new ObjectId(query._id) });
    TypeDeduce.isTag(query) && Object.assign(queryOption, { tags: query.tag });
    TypeDeduce.isCategory(query) &&
        Object.assign(queryOption, { category: query.category });

    // 执行查询
    let op = await Global.collection("Post")
        .find(queryOption)
        .skip(skip)
        .limit(limit)
        .toArray();
    if (!op) {
        call.error("X ApiGetPost: 查询失败");
        return;
    }
    let posts: any = op.map((it) => {
        let { _id, ...rest } = it;
        return {
            _id: _id.toHexString(),
            ...rest,
        };
    });

    // 返回结果
    call.succ(posts);
}
