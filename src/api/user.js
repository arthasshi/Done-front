import fetch from '@/utils/fetch'

const REGIST = '/user/regist/'
const USERLIST = '/user'
export const regist = (data) => {
    return fetch({
        url: REGIST,
        method: "POST",
        data
    })
}

export const getUserList = (page, size) => {
    return fetch({
        url: USERLIST + `?page=${page}&size=${size}`
    })
}
