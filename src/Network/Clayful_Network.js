const CLAYFUL = 'https://api.clayful.io'
import Handler from './_Network'
export default class ClayfulNetwork extends Handler{
    constructor(){
        super()
    }
    headers = {
        'Accept-Encoding':'gzip',
        'Accept':'application/json',
        'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRmNTcxNWVlZTM4ZGQyNTNmYzMzY2M5MDRiYTM4NDM1NDgxOTU0ZjA3NjFlY2JmMTQ4MWM4NjQ4ZmYwZGUwNzciLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjAxOTQ2OTY2LCJzdG9yZSI6Ijc4RzUzQ0paSENEMy5VTUY2UEQ5Wk41WVIiLCJzdWIiOiI5OExCQ1ZDQzQ1QlUifQ.7J9E9djyqincl5F5vZXwZalwK7bYK0v6QSSpYiMIWFc'
    }
    _getProductsByCollectionList = (CollectionList)=>{
        const functions = CollectionList.map( collection => this._getProductByCollectionID(collection.collectionID) )
        return Promise.all(functions)
    }
    _getProductByCollectionID = async(CollectionID)=>{
        const response = await fetch(`${CLAYFUL}/v1/products?collection=${CollectionID}`,{ headers: this.headers })
        const data = await response.json()
        return data.map(item=>item._id)
    }
    getDisplayItems = async()=>{
        const response = await fetch(`${CLAYFUL}/v1/collections`,{ headers: this.headers })
        const data = await response.json()
        data.sort((left, right) => left.meta.display.raw - right.meta.display.raw )
        const collectionsForDisplay = data.reduce( (prev, collection) => 
            !collection.meta.display.raw ?
                // display value is 0
                prev :
                // display value is upper than 0
                [...prev, {
                    collectionID: collection._id,
                    display: collection.meta.display.raw,
                    products:[]
                } ], [])
        const products = await this._getProductsByCollectionList(collectionsForDisplay)
        products.map( (product, index) => collectionsForDisplay[index].products = product)
        return collectionsForDisplay
    }
}