import { HttpClient } from "tsrpc-browser";
import { serviceProto } from "@/shared/protocols/serviceProto";

export const client = new HttpClient(serviceProto, {
    server: import.meta.env.VITE_TSRPC_HOST,
    // json: true,
    logger: console,
});