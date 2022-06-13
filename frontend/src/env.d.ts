/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// TSRPC would decode ObjectId as string in frontend.
declare module "mongodb" {
    export type ObjectId = string;
    export type ObjectID = string;
}
declare module "bson" {
    export type ObjectId = string;
    export type ObjectID = string;
}
