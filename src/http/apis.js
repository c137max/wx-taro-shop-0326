

class LOGIN_API {
    static code2Session = '/wxLogin/code2Session'
    static updateUserProfile = '/user/wxUser/'
}
class MAPPER_API {
    static locationDesc = 'https://h5gw.map.qq.com/ws/geocoder/v1/'
    static wordTransToCoordinate = 'https://h5gw.map.qq.com/ws/geocoder/v1'
}

const UNNEEDED_TOKEN_APIS = [  // 不需要Token的接口
    LOGIN_API.code2Session,
    MAPPER_API.locationDesc,
    MAPPER_API.wordTransToCoordinate,
]

const NO_DEEL_RESPONSE_APIS = [  // 不需要在响应拦截器中处理响应数据的接口
    MAPPER_API.locationDesc,
    MAPPER_API.wordTransToCoordinate,
]

export {
    LOGIN_API,
    MAPPER_API,
    UNNEEDED_TOKEN_APIS,
    NO_DEEL_RESPONSE_APIS
}
