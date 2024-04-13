import {defineStore} from 'pinia'
import {computed, ref} from "vue";


export const defaultUserState = {
    isLogin: false,
    nickName: '未登录用户',
    avatarAddress: '',
    token: '',
    uid: -1,
    unionID: -1
}
export const useUserStore = defineStore('user', () => {
    const userState = ref(defaultUserState)
    const isLogin = computed(() => {
        return userState.value.isLogin
    })
    const userInfo = computed(() => {
        return {
            isLogin: userState.value.isLogin,
            nickName: userState.value.nickName,
            avatarAddress: userState.value.avatarAddress,
            uid: userState.value.uid,
            unionID: userState.value.unionID,
        }
    })
    const login = ({nickName, avatarAddress, uid, unionID, token}) => {
        userState.value.isLogin = true
        userState.value.nickName = nickName
        userState.value.avatarAddress = avatarAddress
        userState.value.uid = uid
        userState.value.unionID = unionID
        userState.value.token = token
    }
    const logout = () => defaultUserState
    return { userState, isLogin, login, logout, userInfo }
})
