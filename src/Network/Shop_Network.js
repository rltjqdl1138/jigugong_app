import Handler from './_Network'
export default class ShopNetwork extends Handler{
    constructor(){
        super()
    }
    tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJsdGpxZGwxMTM4QG5hdmVyLmNvbSIsInBsYXRmb3JtIjoib3JpZ2luYWwiLCJpYXQiOjE2MDI2MzE1MDAsImlzcyI6ImppZ3Vnb25nLmNvbSJ9.0zm5oiWQnN0usW5pJ9tkycBGjPw4fjmP1HY3TQxqAE0'

    LoadRegisteredCreditCard = async()=>{
        try{
            const response = await fetch(`${this.domain}/api/payment/card`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token': this.tempToken
                }})
            const data = await response.json()
            return data
        }catch(e){
            console.log(e)
            return false
        }
    }
    RegisterNewCreditCard = async(payload)=>{
        try{
            const response = await fetch(`${this.domain}/api/payment/card`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token': this.tempToken
                },body: JSON.stringify(payload)
            })
            const data = await response.json()
            return data
        }catch(e){
            console.log(e)
            return false
        }
    }
}