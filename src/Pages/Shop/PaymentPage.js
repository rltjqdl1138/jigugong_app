import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import {SimpleHeader} from '../../Header'
import {Shop, Clayful} from '../../Network'
const SELECTED_TAP_COLOR = '#C4C4C4'
export default class PaymentPage extends Component {
    constructor(){
        super()
        this.state = {
            shippingTap:0,
            productTap:true,
            paymentTap:1,

            shippingMethod:{

            },
            newAddress:{
                checked: false,
                editable: true,
                name:'',
                phone:'',
                state:'',
                city:'',
                postcode:'',
                address:'',
                address2:'',
                fullAddress:'',
                extraAddr:''
            },
            products:[],
            total:{},
            selectedCard:0,
            creditCardList:[]
        }
    }
    componentDidMount(){
        this._LoadMyCart()
        this._LoadCreditCards()
    }
    _LoadCreditCards = async()=>{
        const response = await Shop.LoadRegisteredCreditCard()
        const creditCardList = response && response.success && response.data && response.data.length ? response.data : []
        this.handleChange('creditCardList', creditCardList)
    }
    _LoadMyCart = async()=>{
        const data = await Clayful.getItemFromCart()
//        console.warn(data.cart.shipments)
        if(!data || !data.cart)
            return;
        if(data.cart.items){
            const items = data.cart.items
            //const cart = data.cart.items.reduce((prev, item) => item.product ? [...prev, item] : prev, [])
            this.handleChange('products', items)
        }
        if(data.cart.total)
            this.handleChange('total', data.cart.total)
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    PriceComponent = ()=>{
        const {total} = this.state
        const productPrice = total && total.price && total.price.sale ? total.price.sale : {raw:0, formatted:'-'}
        const shippingPrice = {raw:2500, formatted:'₩2,500'}
        const totalPrice = productPrice.raw + shippingPrice.raw
        return (
            <View style={{width:'100%'}}>
                <View style={{width:'100%',flexDirection:'row', paddingTop:6, paddingBottom:6, paddingLeft:16, paddingRight:16}}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'left', fontSize:16}}>주문 금액</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'right', fontSize:18}}>{productPrice.formatted}</Text>
                    </View>
                </View>
                <View style={{width:'100%',flexDirection:'row', paddingTop:6, paddingBottom:6, paddingLeft:16, paddingRight:16}}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'left', fontSize:16}}>배송비</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'right', fontSize:18}}>{shippingPrice.formatted}</Text>
                    </View>
                </View>
                <View style={{width:'100%',flexDirection:'row', paddingTop:6, paddingBottom:6, paddingLeft:16, paddingRight:16}}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'left', fontSize:16}}>지구자원 할인</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'right', fontSize:18}}>0원</Text>
                    </View>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#C4C4C4'}}/>

                <View style={{width:'100%',flexDirection:'row', paddingTop:10, paddingBottom:10, paddingLeft:16, paddingRight:16}}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'left', fontSize:18}}>총 결제금액</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'right', fontSize:18}}>{totalPrice}</Text>
                    </View>
                </View>
            </View>
        )
    }
    ProductComponent = (payload)=>{
        const {product} = payload
        return !product ?(
            <View key={payload._id} style={[styles.productContainer,{alignItems:'center', justifyContent:'center'}]}>
                <Text style={{textAlign:'center'}}>상품에 오류가 있습니다.</Text>
            </View>):
            (<View key={payload._id} style={styles.productContainer}>
                <View style={styles.productImageContainer}>
                    <Image style={styles.productImage} source={{uri:product.thumbnail.url}}/>
                </View>
                <View style={styles.productContentContainer}>
                    <View style={styles.productContentComponent}>
                        <Text style={[styles.productContentText,{fontSize:10}]}>
                            {payload.brand ? payload.brand.name : ''}
                        </Text>
                    </View>
                    <View style={styles.productContentComponent}>
                        <Text style={[styles.productContentText,{fontSize:14}]}>
                            {product.name}
                        </Text>
                    </View>
                    <View style={styles.productContentComponent}>
                        <Text style={[styles.productContentText,{fontSize:10}]}>
                            ""옵션""
                        </Text>
                    </View>
                    <View style={styles.productContentComponent}>
                        <Text style={[styles.productContentText,{fontSize:12}]}>
                            {`${payload.quantity.formatted}개, ${payload.price.sale.formatted}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    ShippingComponent = ()=>{
        const {shippingTap, newAddress} = this.state
        switch(shippingTap){
            case 0:
                return true ? (
                    <View style={[styles.shippingContainer, {height:200, justifyContent:'center'}]}>
                        <Text style={{textAlign:'center'}}>기본 배송지 정보가 없습니다.</Text>
                        <Text style={{textAlign:'center'}}>신규 입력 탭에서 배송지를 등록해주세요.</Text>
                    </View>) : null
            case 1:
                return true ? (
                    <View style={[styles.shippingContainer, {height:200, justifyContent:'center'}]}>
                        <Text style={{textAlign:'center'}}>등록된 배송지가 없습니다.</Text>
                        <Text style={{textAlign:'center'}}>신규 입력 탭에서 배송지를 등록해주세요.</Text>
                    </View>) : null
            case 2:
                return (
                    <View style={styles.shippingContainer}>
                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>받는분</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}
                                    value={newAddress.name}
                                    onChangeText={(text)=>this.handleChange('newAddress', {...address, name:text})}
                                />
                            </View>
                        </View>
                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>핸드폰번호</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput} keyboardType="number-pad"
                                    onChangeText={(text)=>this.handleChange('newAddress', {...address, phone:text})}
                                    value={newAddress.phone}
                                />
                            </View>
                        </View>

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>주소</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}
                                    allowFontScaling={false}
                                    editable={newAddress.editable}                          
                                    value={newAddress.postcode} />
                            </View>

                            <View style={{flex:1, marginLeft:10}}>
                                <TouchableOpacity style={styles.postCodeFindButton}
                                    onPress={()=>this.props.navigator.push('FindPostCodePage', {handler:(value)=>this.handleChange('newAddress',value)})} >
                                    <Text style={{textAlign:'center'}}>우편번호 찾기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader} />
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}
                                    editable={newAddress.editable}
                                    value={newAddress.fullAddress}
                                    allowFontScaling={false} />
                            </View>
                        </View>

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>세부주소</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}
                                    onChangeText={(text)=>this.handleChange('newAddress', {...address, address2:text})}
                                    value={newAddress.address2}
                                    allowFontScaling={false} />
                            </View>
                        </View>
                        <View style={styles.shippingCheckContainer}>
                            <TouchableOpacity style={styles.shippingCheckButton}
                                onPress={()=>this.handleChange('newAddress', {...newAddress, checked: !newAddress.checked})}>
                                <View style={[styles.shippingCheckImage, {backgroundColor:newAddress.checked ? 'green' : 'white'}]} />
                            </TouchableOpacity>
                            <Text style={styles.shippingCheckText}>
                                기본 배송지로 등록
                            </Text>
                        </View>
                        <View style={styles.shippingConfirmContainer}>
                            <TouchableOpacity style={styles.shippingConfirmButton}>
                                <Text style={styles.shippingConfirmText}>저장</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
            default:
                return null;
        }
    }
    CardComponent = (props)=>{
        const {selectedCard} = this.state
        const {index, name, number} = props
        return (
            <View style={{height:88, widht:'100%', paddingTop:8, paddingBottom:8}}>
                <TouchableOpacity style={{width:'100%', height:'100%', flexDirection:'row', backgroundColor:'#F6F6F6'}}
                    onPress={()=>this.handleChange('selectedCard', index)}
                    >
                    <View style={{flex:1, paddingLeft:16}}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Text>{name}</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Text>{number}</Text>
                        </View>
                    </View>
                    <View style={{width:50, height:'100%', backgroundColor: selectedCard===index ? 'green' : null}}>

                    </View>
                </TouchableOpacity>
            </View>)
    }
    PaymentComponent = ()=>{
        const {paymentTap, creditCardList} = this.state
        const {CardComponent} = this
        switch(paymentTap){
            case 1:
                return (
                    <View style={{width:'100%'}}>
                        {creditCardList.map((card, index)=>(<CardComponent key={card.id} name={card.name} number={card.number} index={index}/>))}

                        <View style={{height:88, widht:'100%', paddingTop:8, paddingBottom:8}}>
                            <TouchableOpacity style={{width:'100%', height:'100%', borderWidth:1, borderColor:'black', borderStyle:'dashed', justifyContent:'center'}}
                                onPress={()=>this.props.navigator.push('RegisterCardPage', {handler:this._LoadCreditCards})} >
                                <View>
                                    <Text style={{textAlign:'center'}}>새로운 카드 등록하기</Text>
                                </View>
                                <View>
                                    <Text style={{textAlign:'center'}}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>)

            default:
                return null
        }
    }
    render(){
        const {shippingTap, products, productTap, total, paymentTap} = this.state
        return (
            <View style={styles.container}>
                <SimpleHeader title="상품 결제하기" handlePop={()=>this.props.navigator.pop('PaymentPage')} />
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>주문 고객 정보</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>
                            <View style={styles.customerInputContainer}>
                                <View style={styles.customerInputHeader}>
                                    <Text style={styles.customerText}>이름</Text>
                                </View>
                                <View style={styles.customerInputBody}>
                                    <TextInput style={styles.customerTextInput}/>
                                </View>
                            </View>

                            <View style={styles.customerInputContainer}>
                                <View style={styles.customerInputHeader}>
                                    <Text style={styles.customerText}>이메일</Text>
                                </View>
                                <View style={styles.customerInputBody}>
                                    <TextInput style={styles.customerTextInput}/>
                                </View>
                            </View>

                            <View style={styles.customerInputContainer}>
                                <View style={styles.customerInputHeader}>
                                    <Text style={styles.customerText}>핸드폰번호</Text>
                                </View>
                                <View style={styles.customerInputBody}>
                                    <TextInput style={styles.customerTextInput} keyboardType="number-pad"/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>배송지 정보</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>
                            <View style={styles.shippingTapContainer}>
                                <TouchableOpacity style={[styles.shippingTapComponent, {backgroundColor: shippingTap===0? SELECTED_TAP_COLOR : null} ]} onPress={()=>this.handleChange('shippingTap',0)}>
                                    <Text style={styles.shippingTapText}>기본 배송지</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.shippingTapComponent, {backgroundColor: shippingTap===1? SELECTED_TAP_COLOR : null}]} onPress={()=>this.handleChange('shippingTap',1)}>
                                    <Text style={styles.shippingTapText}>배송지 목록</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.shippingTapComponent, {backgroundColor: shippingTap===2? SELECTED_TAP_COLOR : null}]} onPress={()=>this.handleChange('shippingTap',2)}>
                                    <Text style={styles.shippingTapText}>신규 입력</Text>
                                </TouchableOpacity>
                            </View>
                            {this.ShippingComponent()}
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={[styles.contentHeaderContainer, {flexDirection:'row', alignItems:'center'}]}>
                            <Text style={styles.titleText}>{`주문상품 ${products.length}개`}</Text>
                            <TouchableOpacity style={{width:30, height:30, backgroundColor:'gray'}}
                                onPress={()=>this.handleChange('productTap', !productTap)} >
                            </TouchableOpacity>
                        </View>
                        { !productTap ? null :
                            (<View style={styles.contentBodyContainer}>
                                { /*products.map(item=>this.ProductComponent(item)) */}
                            </View>)}
                    </View>


                    <View style={styles.contentContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>쿠폰 / 지구자원</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>

                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>결제금액</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>
                            {/*this.PriceComponent()*/}
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>결제수단</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>
                            <View style={styles.paymentSelectionContainer}>
                                <View style={styles.paymentSelectionRow}>
                                    <View style={styles.paymentSelectionButtonContainer}>
                                        <TouchableOpacity style={[styles.paymentSelectionButton, {backgroundColor:paymentTap === 1 ? 'gray':'#C4C4C4'}]}
                                                onPress={()=>this.handleChange('paymentTap',1)}>
                                            <Text style={styles.paymentSelectionButtonText}>신용/체크카드</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View width={8}/>
                                    <View style={styles.paymentSelectionButtonContainer}>
                                        <TouchableOpacity style={[styles.paymentSelectionButton, {backgroundColor:paymentTap === 2 ? 'gray':'#C4C4C4'}]}
                                                onPress={()=>this.handleChange('paymentTap',2)}>
                                            <Text style={styles.paymentSelectionButtonText}>네이버페이</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.paymentSelectionRow}>
                                    <View style={styles.paymentSelectionButtonContainer}>
                                        <TouchableOpacity style={[styles.paymentSelectionButton, {backgroundColor:paymentTap === 3 ? 'gray':'#C4C4C4'}]}
                                                onPress={()=>this.handleChange('paymentTap',3)}>
                                            <Text style={styles.paymentSelectionButtonText}>무통장입금</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View width={8}/>
                                    <View style={styles.paymentSelectionButtonContainer}>
                                        <TouchableOpacity style={[styles.paymentSelectionButton, {backgroundColor:paymentTap === 4 ? 'gray':'#C4C4C4'}]}
                                                onPress={()=>this.handleChange('paymentTap',4)}>
                                            <Text style={styles.paymentSelectionButtonText}>휴대폰</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {this.PaymentComponent()}
                        </View>
                    </View>

                    <View style={{height:100}} />
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    contentContainer:{
        paddingLeft:16,
        paddingRight:16
    },
    contentHeaderContainer:{
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'center'
    },
    contentBodyContainer:{

    },
    customerInputContainer:{
        flexDirection:'row',
        width:'100%',
        paddingTop:5,
        paddingBottom:5,
    },
    customerInputHeader:{
        width:100,
        justifyContent:'center'
    },
    customerInputBody:{
        flex:1,
        height:35,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center'
    },
    customerText:{

    },
    customerTextInput:{
        flex:1,
        fontSize:12,
        paddingLeft:10,
        paddingRight:10
    },
    titleText:{
        flex:1,
        fontSize:18
    },

    shippingTapContainer:{
        flexDirection:'row',
        height:40
    },
    shippingTapComponent:{
        flex:1,
        justifyContent:'center'
    },
    shippingTapText:{
        textAlign:'center'
    },
    shippingContainer:{
        padding:10,
        borderColor:'gray',
        borderWidth:1
    },
    shippingInputContainer:{
        flexDirection:'row',
        width:'100%',
        paddingTop:5,
        paddingBottom:5,
    },
    shippingInputHeader:{
        width:80,
        justifyContent:'center'
    },
    shippingInputBody:{
        flex:1,
        height:35,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center'
    },
    shippingTextInput:{
        fontSize:14,
        paddingLeft:10,
        paddingRight:10
    },
    postCodeFindButton:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'gray',
        borderRadius:6
    },
    shippingCheckContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:15,
    },
    shippingCheckButton:{
        width:40,
        justifyContent:'center',
        alignItems:'center'
    },
    shippingCheckImage:{
        width:20,
        height:20,
        borderRadius:10,
    },
    shippingCheckText:{
        fontSize:13
    },
    shippingConfirmContainer:{
        paddingLeft:30,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10
    },
    shippingConfirmButton:{
        borderRadius:20,
        backgroundColor:SELECTED_TAP_COLOR,
        justifyContent:'center',
        height:40
    },
    shippingConfirmText:{
        textAlign:'center'
    },

    productContainer:{
        width:'100%',
        height:90,
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5
    },
    productImageContainer:{
        width:80,
        height:'100%'
    },
    productImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    productContentContainer:{
        flex:1,
        paddingLeft:16
    },
    productContentComponent:{
        flex:1,
        justifyContent:'center'
    },
    productContentText:{

    },


    paymentSelectionContainer:{
        width:'100%'
    },
    paymentSelectionRow:{
        flexDirection:'row',
        width:'100%',
        height:60
    },
    paymentSelectionButtonContainer:{
        flex:1,
        paddingTop:8,
        paddingBottom:8
    },
    paymentSelectionButton:{
        width:'100%',
        height:'100%',
        backgroundColor:'#C4C4C4',
        justifyContent:'center'
    },
    paymentSelectionButtonText:{
        textAlign:'center'
    }
})