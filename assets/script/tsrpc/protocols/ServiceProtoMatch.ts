import { ServiceProto } from 'tsrpc-proto';
import { ReqLogined, ResLogined } from './match/admin/PtlLogined';
import { ReqRoomServerJoin, ResRoomServerJoin } from './match/admin/PtlRoomServerJoin';
import { ReqUserInfo, ResUserInfo } from './match/admin/PtlUserInfo';
import { ReqMatchStart, ResMatchStart } from './match/PtlMatchStart';
import { ReqRoomCreate, ResRoomCreate } from './match/PtlRoomCreate';
import { ReqRoomList, ResRoomList } from './match/PtlRoomList';

export interface ServiceType {
    api: {
        "admin/Logined": {
            req: ReqLogined,
            res: ResLogined
        },
        "admin/RoomServerJoin": {
            req: ReqRoomServerJoin,
            res: ResRoomServerJoin
        },
        "admin/UserInfo": {
            req: ReqUserInfo,
            res: ResUserInfo
        },
        "MatchStart": {
            req: ReqMatchStart,
            res: ResMatchStart
        },
        "RoomCreate": {
            req: ReqRoomCreate,
            res: ResRoomCreate
        },
        "RoomList": {
            req: ReqRoomList,
            res: ResRoomList
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 30,
    "services": [
        {
            "id": 6,
            "name": "admin/Logined",
            "type": "api",
            "conf": {
                "needCheckAddress": true
            }
        },
        {
            "id": 0,
            "name": "admin/RoomServerJoin",
            "type": "api",
            "conf": {
                "needCheckAddress": true
            }
        },
        {
            "id": 7,
            "name": "admin/UserInfo",
            "type": "api",
            "conf": {
                "needCheckAddress": true
            }
        },
        {
            "id": 4,
            "name": "MatchStart",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 5,
            "name": "RoomCreate",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 2,
            "name": "RoomList",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        }
    ],
    "types": {
        "admin/PtlLogined/ReqLogined": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../../module/account/bll/User/DbUser"
                    }
                }
            ]
        },
        "../base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "../../../module/account/bll/User/DbUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "key",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "createtime",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 4,
                    "name": "pos",
                    "type": {
                        "type": "Reference",
                        "target": "../../../tsrpc/types/RoleState/RolePosition"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "rotation",
                    "type": {
                        "type": "Reference",
                        "target": "../../../tsrpc/types/RoleState/RoleRotation"
                    },
                    "optional": true
                }
            ]
        },
        "../../../tsrpc/types/RoleState/RolePosition": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "x",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "y",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "z",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../../../tsrpc/types/RoleState/RoleRotation": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "x",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "y",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "z",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "w",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "admin/PtlLogined/ResLogined": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ]
        },
        "../base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "admin/PtlRoomServerJoin/ReqRoomServerJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "serverUrl",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlRoomServerJoin/ResRoomServerJoin": {
            "type": "Interface"
        },
        "admin/PtlUserInfo/ReqUserInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "admin/PtlUserInfo/ResUserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../../module/account/bll/User/DbUser"
                    }
                }
            ]
        },
        "PtlMatchStart/ReqMatchStart": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "PtlMatchStart/ResMatchStart": {
            "type": "Interface",
            "extends": [
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "serverUrl",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRoomCreate/ReqRoomCreate": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "roomName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRoomCreate/ResRoomCreate": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "serverUrl",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRoomList/ReqRoomList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "PtlRoomList/ResRoomList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "rooms",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 8,
                                    "name": "amount",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 9,
                                    "name": "max",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 3,
                                    "name": "serverUrl",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 4,
                                    "name": "roomId",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
};