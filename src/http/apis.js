

class LOGIN_API {
    static code2Session = '/wxLogin/code2Session'
}

const UNNEEDED_TOKEN_APIS = [
    LOGIN_API.code2Session,
]

export {
    LOGIN_API,
    UNNEEDED_TOKEN_APIS,
}
