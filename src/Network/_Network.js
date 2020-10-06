const LIST = [
    'http://192.168.0.23:4000',
    'http://192.168.1.40:4000',
    'http://192.168.1.3:4000',
    'http://172.20.10.3:19000'
]

class NetworkHandler {
    constructor(){
        LIST.map(item=>this.SendPing(item))
    }
    domain = 'http://localhost'
    SendPing = async(url)=>{
        try{
            const response = await fetch(url)
            const data = await response.json()
            if(!data || data.success !== true)
                return;
            this.domain = url
        }catch(e){}
    }
}

export default NetworkHandler