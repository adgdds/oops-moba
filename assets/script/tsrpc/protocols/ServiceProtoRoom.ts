import { ServiceProto } from 'tsrpc-proto';
import { MsgRoomUpdateState } from './room/admin/MsgRoomUpdateState';
import { ReqAuth, ResAuth } from './room/admin/PtlAuth';
import { ReqRoomCreate, ResRoomCreate } from './room/admin/PtlRoomCreate';
import { MsgRoleMove } from './room/client/MsgRoleMove';
import { MsgRoleState } from './room/client/MsgRoleState';
import { ReqRoomChat, ResRoomChat } from './room/PtlRoomChat';
import { ReqRoomJoin, ResRoomJoin } from './room/PtlRoomJoin';
import { ReqRoomLeave, ResRoomLeave } from './room/PtlRoomLeave';
import { MsgChat } from './room/server/MsgChat';
import { MsgRoleAttack } from './room/server/MsgRoleAttack';
import { MsgRoleJoin } from './room/server/MsgRoleJoin';
import { MsgRoleLeave } from './room/server/MsgRoleLeave';
import { MsgRoleMove as MsgRoleMove_1 } from './room/server/MsgRoleMove';
import { MsgRoleRevive } from './room/server/MsgRoleRevive';
import { MsgRoomRoleState } from './room/server/MsgRoomRoleState';

export interface ServiceType {
    api: {
        "admin/Auth": {
            req: ReqAuth,
            res: ResAuth
        },
        "admin/RoomCreate": {
            req: ReqRoomCreate,
            res: ResRoomCreate
        },
        "RoomChat": {
            req: ReqRoomChat,
            res: ResRoomChat
        },
        "RoomJoin": {
            req: ReqRoomJoin,
            res: ResRoomJoin
        },
        "RoomLeave": {
            req: ReqRoomLeave,
            res: ResRoomLeave
        }
    },
    msg: {
        "admin/RoomUpdateState": MsgRoomUpdateState,
        "client/RoleMove": MsgRoleMove,
        "client/RoleState": MsgRoleState,
        "server/Chat": MsgChat,
        "server/RoleAttack": MsgRoleAttack,
        "server/RoleJoin": MsgRoleJoin,
        "server/RoleLeave": MsgRoleLeave,
        "server/RoleMove": MsgRoleMove_1,
        "server/RoleRevive": MsgRoleRevive,
        "server/RoomRoleState": MsgRoomRoleState
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 44,
    "services": [
        {
            "id": 0,
            "name": "admin/RoomUpdateState",
            "type": "msg",
            "conf": {
                "needCheckAddress": true
            }
        },
        {
            "id": 1,
            "name": "admin/Auth",
            "type": "api",
            "conf": {
                "needCheckAddress": true
            }
        },
        {
            "id": 2,
            "name": "admin/RoomCreate",
            "type": "api",
            "conf": {
                "needCheckAddress": true
            }
        },
        {
            "id": 24,
            "name": "client/RoleMove",
            "type": "msg"
        },
        {
            "id": 27,
            "name": "client/RoleState",
            "type": "msg"
        },
        {
            "id": 5,
            "name": "RoomChat",
            "type": "api"
        },
        {
            "id": 6,
            "name": "RoomJoin",
            "type": "api"
        },
        {
            "id": 7,
            "name": "RoomLeave",
            "type": "api"
        },
        {
            "id": 17,
            "name": "server/Chat",
            "type": "msg"
        },
        {
            "id": 25,
            "name": "server/RoleAttack",
            "type": "msg"
        },
        {
            "id": 28,
            "name": "server/RoleJoin",
            "type": "msg"
        },
        {
            "id": 29,
            "name": "server/RoleLeave",
            "type": "msg"
        },
        {
            "id": 26,
            "name": "server/RoleMove",
            "type": "msg"
        },
        {
            "id": 31,
            "name": "server/RoleRevive",
            "type": "msg"
        },
        {
            "id": 30,
            "name": "server/RoomRoleState",
            "type": "msg"
        }
    ],
    "types": {
        "admin/MsgRoomUpdateState/MsgRoomUpdateState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "rooms",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../../types/RoomState/RoomState"
                        }
                    }
                }
            ]
        },
        "../../types/RoomState/RoomState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "amount",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 7,
                    "name": "max",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 4,
                    "name": "timeUpdate",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 5,
                    "name": "timeStartMatch",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    },
                    "optional": true
                }
            ]
        },
        "admin/PtlAuth/ReqAuth": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "MatchServer"
                    }
                }
            ]
        },
        "admin/PtlAuth/ResAuth": {
            "type": "Interface"
        },
        "admin/PtlRoomCreate/ReqRoomCreate": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "roomName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlRoomCreate/ResRoomCreate": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "client/MsgRoleMove/MsgRoleMove": {
            "target": {
                "type": "Reference",
                "target": "../../types/RoleState/RoleMove"
            },
            "keys": [
                "uid"
            ],
            "type": "Omit"
        },
        "../../types/RoleState/RoleMove": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "target",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RolePosition"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "vector",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RolePosition"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "angle",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "joystick",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "skillId",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "targetId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "../../types/RoleState/RolePosition": {
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
        "client/MsgRoleState/MsgRoleState": {
            "target": {
                "type": "Reference",
                "target": "../../types/RoleState/RoleState"
            },
            "keys": [
                "id"
            ],
            "type": "Omit"
        },
        "../../types/RoleState/RoleState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "pos",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RolePosition"
                    }
                },
                {
                    "id": 2,
                    "name": "rotation",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleRotation"
                    }
                },
                {
                    "id": 3,
                    "name": "action",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../../types/RoleState/RoleRotation": {
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
        "PtlRoomChat/ReqRoomChat": {
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
                    "name": "content",
                    "type": {
                        "type": "String"
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
        "PtlRoomChat/ResRoomChat": {
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
        "PtlRoomJoin/ReqRoomJoin": {
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
                    "id": 2,
                    "name": "userId",
                    "type": {
                        "type": "Number"
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
        "PtlRoomJoin/ResRoomJoin": {
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
                    "id": 3,
                    "name": "roleId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "room",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoomState/RoomDetailed"
                    }
                }
            ]
        },
        "../../types/RoomState/RoomDetailed": {
            "type": "Interface",
            "properties": [
                {
                    "id": 4,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "max",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 7,
                    "name": "timeLastEmpty",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 8,
                    "name": "timeStartMatch",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "timeUpdate",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 12,
                    "name": "roles",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../../types/RoleState/RoleDetailed"
                        }
                    }
                },
                {
                    "id": 13,
                    "name": "npcs",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../../types/RoleState/RoleDetailed"
                        }
                    }
                },
                {
                    "id": 10,
                    "name": "messages",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "time",
                                    "type": {
                                        "type": "Date"
                                    }
                                },
                                {
                                    "id": 4,
                                    "name": "role",
                                    "type": {
                                        "type": "Reference",
                                        "target": "../../types/RoleState/RoleInfo"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "content",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "../../types/RoleState/RoleDetailed": {
            "type": "Interface",
            "properties": [
                {
                    "id": 3,
                    "name": "roleInfo",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleInfo"
                    }
                },
                {
                    "id": 0,
                    "name": "state",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleState"
                    }
                },
                {
                    "id": 1,
                    "name": "attributes",
                    "type": {
                        "type": "Interface",
                        "indexSignature": {
                            "keyType": "String",
                            "type": {
                                "type": "Number"
                            }
                        }
                    }
                }
            ]
        },
        "../../types/RoleState/RoleInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "nickname",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRoomLeave/ReqRoomLeave": {
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
        "PtlRoomLeave/ResRoomLeave": {
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
        "server/MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 4,
                    "name": "roleInfo",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "server/MsgRoleAttack/MsgRoleAttack": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "skillId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "state",
                    "type": {
                        "type": "Reference",
                        "target": "server/MsgRoleAttack/SkillState"
                    }
                },
                {
                    "id": 1,
                    "name": "targetId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "pos",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RolePosition"
                    },
                    "optional": true
                }
            ]
        },
        "server/MsgRoleAttack/SkillState": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 0
                },
                {
                    "id": 1,
                    "value": 1
                },
                {
                    "id": 2,
                    "value": 2
                }
            ]
        },
        "server/MsgRoleJoin/MsgRoleJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 4,
                    "name": "role",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleDetailed"
                    }
                },
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "server/MsgRoleLeave/MsgRoleLeave": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 2,
                    "name": "roleInfo",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleInfo"
                    }
                }
            ]
        },
        "server/MsgRoleMove/MsgRoleMove": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "state",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoleState/RoleMove"
                    }
                }
            ]
        },
        "server/MsgRoleRevive/MsgRoleRevive": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "server/MsgRoomRoleState/MsgRoomRoleState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "states",
                    "type": {
                        "type": "Interface",
                        "indexSignature": {
                            "keyType": "String",
                            "type": {
                                "type": "Reference",
                                "target": "../../types/RoleState/RoleState"
                            }
                        }
                    }
                }
            ]
        }
    }
};