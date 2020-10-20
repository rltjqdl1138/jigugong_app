import Handler from './_Network'

export default class AccountNetworkHandler extends Handler{
    /*
     * @ Method CheckDuplicated
     * Case 1: key is "account"
     *    @ params     {String}    key
     *    @ params     {Object}    value
     *       @ attribute    {String}    id
     *       @ attribute    {String}    platform
     * 
     *  Case 2: key isn't "account"
     *      @ params     {String}    key
     *   @ parmas     {String}    value
     * 
    **/
   tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJsdGpxZGwxMTM4QG5hdmVyLmNvbSIsInBsYXRmb3JtIjoib3JpZ2luYWwiLCJpYXQiOjE2MDI2MzE1MDAsImlzcyI6ImppZ3Vnb25nLmNvbSJ9.0zm5oiWQnN0usW5pJ9tkycBGjPw4fjmP1HY3TQxqAE0'
    CheckDuplicated = async(key, value)=>{
        const {domain} = this
        try{
            const uri = `${domain}/api/account/duplicate-check/`+ (key==='account'? `${key}/${value.id}?platform=${value.platform}` : `${key}/${encodeURI(encodeURIComponent(value))}`)
            const response = await fetch(uri)
            return await response.json()
        }catch(e){
            return false
        }
    }
    RequestMobileAuth = async(mobile)=>{
        const {domain} = this
        try{
            const response = await fetch(`${domain}/api/account/mobile-auth`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({mobile})
            })
            const data = await response.json()
            return data.success
        }catch(e){
            return;
        }
    }
    VerifyMobileAuth = async(mobile, key)=>{
        const {domain} = this
        try{
            const response = await fetch(`${domain}/api/account/mobile-auth?mobile=${mobile}&key=${key}`)
            const data = await response.json()
            return data
        }catch(e){
            return;
        }
    }
    Signin = async(account)=>{
        const {domain} = this
        try{
            if(!account || !account.platform || !account.id )
                throw Error('empty')
            const response = await fetch(`${domain}/api/account/auth/${account.platform}`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(account)
            })
            const data = await response.json()
            return data
        }catch(e){
            return;
        }
    }
    Signup = async(payload, mobileToken)=>{
        const {domain} = this
        try{
            const response = await fetch(`${domain}/api/account/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-mobile-token':mobileToken
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            return data
        }catch(e){
            return;
        }
    }
}