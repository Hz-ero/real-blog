import { HttpClient } from "tsrpc-browser";
import { serviceProto } from "@/shared/protocols/serviceProto";

export const client = new HttpClient(serviceProto, {
    server: import.meta.env.VITE_TSRPC_HOST,
    logger: console,
});

client.flows.preCallApiFlow.push(v => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
        v.req.__Token = token;
    }
    return v
})