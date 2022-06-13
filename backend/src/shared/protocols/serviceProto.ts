import { ServiceProto } from 'tsrpc-proto';
import { ReqAddAdmin, ResAddAdmin } from './admin/PtlAddAdmin';
import { ReqGetAdmin, ResGetAdmin } from './admin/PtlGetAdmin';
import { ReqLogin, ResLogin } from './admin/PtlLogin';
import { ReqAddComment, ResAddComment } from './comment/PtlAddComment';
import { ReqAddReply, ResAddReply } from './comment/PtlAddReply';
import { ReqGetComment, ResGetComment } from './comment/PtlGetComment';
import { ReqLikeComment, ResLikeComment } from './comment/PtlLikeComment';
import { ReqUnlikeComment, ResUnlikeComment } from './comment/PtlUnlikeComment';
import { ReqAddPost, ResAddPost } from './post/PtlAddPost';
import { ReqDelPost, ResDelPost } from './post/PtlDelPost';
import { ReqGetCategories, ResGetCategories } from './post/PtlGetCategories';
import { ReqGetCount, ResGetCount } from './post/PtlGetCount';
import { ReqGetPost, ResGetPost } from './post/PtlGetPost';
import { ReqGetTags, ResGetTags } from './post/PtlGetTags';
import { ReqUpdatePost, ResUpdatePost } from './post/PtlUpdatePost';

export interface ServiceType {
    api: {
        "admin/AddAdmin": {
            req: ReqAddAdmin,
            res: ResAddAdmin
        },
        "admin/GetAdmin": {
            req: ReqGetAdmin,
            res: ResGetAdmin
        },
        "admin/Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "comment/AddComment": {
            req: ReqAddComment,
            res: ResAddComment
        },
        "comment/AddReply": {
            req: ReqAddReply,
            res: ResAddReply
        },
        "comment/GetComment": {
            req: ReqGetComment,
            res: ResGetComment
        },
        "comment/LikeComment": {
            req: ReqLikeComment,
            res: ResLikeComment
        },
        "comment/UnlikeComment": {
            req: ReqUnlikeComment,
            res: ResUnlikeComment
        },
        "post/AddPost": {
            req: ReqAddPost,
            res: ResAddPost
        },
        "post/DelPost": {
            req: ReqDelPost,
            res: ResDelPost
        },
        "post/GetCategories": {
            req: ReqGetCategories,
            res: ResGetCategories
        },
        "post/GetCount": {
            req: ReqGetCount,
            res: ResGetCount
        },
        "post/GetPost": {
            req: ReqGetPost,
            res: ResGetPost
        },
        "post/GetTags": {
            req: ReqGetTags,
            res: ResGetTags
        },
        "post/UpdatePost": {
            req: ReqUpdatePost,
            res: ResUpdatePost
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 13,
    "services": [
        {
            "id": 14,
            "name": "admin/AddAdmin",
            "type": "api",
            "conf": {}
        },
        {
            "id": 16,
            "name": "admin/GetAdmin",
            "type": "api",
            "conf": {}
        },
        {
            "id": 15,
            "name": "admin/Login",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "comment/AddComment",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "comment/AddReply",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "comment/GetComment",
            "type": "api",
            "conf": {}
        },
        {
            "id": 17,
            "name": "comment/LikeComment",
            "type": "api",
            "conf": {}
        },
        {
            "id": 18,
            "name": "comment/UnlikeComment",
            "type": "api",
            "conf": {}
        },
        {
            "id": 2,
            "name": "post/AddPost",
            "type": "api",
            "conf": {
                "needRole": [
                    "admin"
                ]
            }
        },
        {
            "id": 8,
            "name": "post/DelPost",
            "type": "api",
            "conf": {
                "needRole": [
                    "admin"
                ]
            }
        },
        {
            "id": 3,
            "name": "post/GetCategories",
            "type": "api",
            "conf": {}
        },
        {
            "id": 9,
            "name": "post/GetCount",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "post/GetPost",
            "type": "api"
        },
        {
            "id": 10,
            "name": "post/GetTags",
            "type": "api",
            "conf": {}
        },
        {
            "id": 11,
            "name": "post/UpdatePost",
            "type": "api",
            "conf": {
                "needRole": [
                    "admin"
                ]
            }
        }
    ],
    "types": {
        "admin/PtlAddAdmin/ReqAddAdmin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__Token",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "admin/PtlAddAdmin/ResAddAdmin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__Token",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "admin/PtlGetAdmin/ReqGetAdmin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "admin/PtlGetAdmin/ResGetAdmin": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "admin/PtlGetAdmin/ResAdmin"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "admin/PtlGetAdmin/ResAdmin": {
            "target": {
                "type": "Reference",
                "target": "../models/index/Admin"
            },
            "keys": [
                "password"
            ],
            "type": "Omit"
        },
        "../models/index/Admin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "createdAt",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "admin/PtlLogin/ReqLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlLogin/ResLogin": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "admin/PtlLogin/ResAdmin"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "admin/PtlLogin/ResAdmin": {
            "target": {
                "type": "Reference",
                "target": "../models/index/Admin"
            },
            "keys": [
                "password"
            ],
            "type": "Omit"
        },
        "comment/PtlAddComment/ReqAddComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "post_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "comment",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/Comment"
                    }
                }
            ]
        },
        "../models/index/Comment": {
            "type": "Interface",
            "properties": [
                {
                    "id": 7,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "createdAt",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 8,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/User"
                    }
                },
                {
                    "id": 6,
                    "name": "replies",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/index/Reply"
                        }
                    }
                },
                {
                    "id": 9,
                    "name": "likes",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/index/User"
                        }
                    },
                    "optional": true
                }
            ]
        },
        "../models/index/User": {
            "type": "Interface",
            "properties": [
                {
                    "id": 8,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "createdAt",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 9,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "../models/index/Reply": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "target": {
                            "type": "Reference",
                            "target": "../models/index/Comment"
                        },
                        "keys": [
                            "replies"
                        ],
                        "type": "Omit"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "toUser",
                                "type": {
                                    "type": "String"
                                },
                                "optional": true
                            }
                        ]
                    }
                }
            ]
        },
        "comment/PtlAddComment/ResAddComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "comment/PtlAddReply/ReqAddReply": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 4,
                    "name": "comment_uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "reply",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/Reply"
                    }
                }
            ]
        },
        "comment/PtlAddReply/ResAddReply": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "comment/PtlGetComment/ReqGetComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "post_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "comment/PtlGetComment/ResGetComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "comments",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/index/Comment"
                        }
                    }
                }
            ]
        },
        "comment/PtlLikeComment/ReqLikeComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "comment_uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/User"
                    }
                }
            ]
        },
        "comment/PtlLikeComment/ResLikeComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "comment/PtlUnlikeComment/ReqUnlikeComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "comment_uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/User"
                    }
                }
            ]
        },
        "comment/PtlUnlikeComment/ResUnlikeComment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "post/PtlAddPost/ReqAddPost": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "post/PtlAddPost/NewPost"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "post/PtlAddPost/NewPost": {
            "target": {
                "type": "Reference",
                "target": "../models/index/Post"
            },
            "keys": [
                "_id"
            ],
            "type": "Omit"
        },
        "../models/index/Post": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "published",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 4,
                    "name": "tags",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "category",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "view",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "createdAt",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 8,
                    "name": "updatedAt",
                    "type": {
                        "type": "Date"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "comments",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/index/Comment"
                        }
                    },
                    "optional": true
                }
            ]
        },
        "post/PtlAddPost/ResAddPost": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "post/PtlAddPost/ResMsg"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "post/PtlAddPost/ResMsg": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "insertedId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "post/PtlDelPost/ReqDelPost": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "post/PtlDelPost/ResDelPost": {
            "type": "Interface"
        },
        "post/PtlGetCategories/ReqGetCategories": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "post/PtlGetCategories/ResGetCategories": {
            "type": "Array",
            "elementType": {
                "type": "String"
            }
        },
        "post/PtlGetCount/ReqGetCount": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "query",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/QueryType"
                    }
                }
            ]
        },
        "../models/index/QueryType": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/Category"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/Tag"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/ID"
                    }
                },
                {
                    "id": 5,
                    "type": {
                        "type": "Interface"
                    }
                }
            ]
        },
        "../models/index/Category": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "category",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../models/index/Tag": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "tag",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../models/index/ID": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "post/PtlGetCount/ResGetCount": {
            "type": "Number"
        },
        "post/PtlGetPost/ReqGetPost": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "query",
                    "type": {
                        "type": "Reference",
                        "target": "../models/index/QueryType"
                    }
                },
                {
                    "id": 1,
                    "name": "skip",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "post/PtlGetPost/ResGetPost": {
            "type": "Array",
            "elementType": {
                "type": "Reference",
                "target": "../models/index/Post"
            }
        },
        "post/PtlGetTags/ReqGetTags": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "post/PtlGetTags/ResGetTags": {
            "type": "Array",
            "elementType": {
                "type": "String"
            }
        },
        "post/PtlUpdatePost/ReqUpdatePost": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "updateDoc",
                    "type": {
                        "type": "Partial",
                        "target": {
                            "target": {
                                "type": "Reference",
                                "target": "../models/index/Post"
                            },
                            "keys": [
                                "_id"
                            ],
                            "type": "Omit"
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "upsert",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "post/PtlUpdatePost/ResUpdatePost": {
            "type": "Interface"
        }
    }
};