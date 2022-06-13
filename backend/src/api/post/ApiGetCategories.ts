import { Global } from "./../../models/Global";
import { ApiCall } from "tsrpc";
import {
    ReqGetCategories,
    ResGetCategories,
} from "../../shared/protocols/post/PtlGetCategories";

export async function ApiGetCategories(
    call: ApiCall<ReqGetCategories, ResGetCategories>
) {
    // 查询结果
    let op = await Global.collection("Post").distinct("category");
    // 失败
    if (!op) {
        call.error("api GetCategories fial");
        return;
    }
    // 成功
    call.succ(op);
}
