import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native'
import {SimpleHeader} from '../../Header'
import {Clayful} from '../../Network'
const SELECTED_TAP_COLOR = '#C4C4C4'
export default class PaymentPage extends Component {
    constructor(){
        super()
        this.state = {
            shippingTap:0,
            shippingMethod:{

            }
        }
    }
    componentDidMount(){
        this._LoadMyCart()
    }
    _LoadMyCart = async()=>{
        const data = await Clayful.getItemFromCart()
        console.warn(data)
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    ShippingComponent = ()=>{
        const {shippingTap} = this.state
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
                                <TextInput style={styles.shippingTextInput}/>
                            </View>
                        </View>
                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>핸드폰번호</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput} keyboardType="number-pad"/>
                            </View>
                        </View>

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>주소</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}/>
                            </View>

                            <View style={{flex:1, marginLeft:10}}>
                                <TouchableOpacity style={styles.postCodeFindButton}>
                                    <Text style={{textAlign:'center'}}>우편번호 찾기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader} />
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}/>
                            </View>
                        </View>

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shippingInputHeader}>
                                <Text style={styles.customerText}>세부주소</Text>
                            </View>
                            <View style={styles.shippingInputBody}>
                                <TextInput style={styles.shippingTextInput}/>
                            </View>
                        </View>
                        <View style={styles.shippingCheckContainer}>
                            <View style={styles.shippingCheckButton}>
                                <View style={styles.shippingCheckImage} />
                            </View>
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
    render(){
        const {shippingTap} = this.state
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
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>{`주문상품 ${0}개`}</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>

                        </View>
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

                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.titleText}>결제수단</Text>
                        </View>
                        <View style={styles.contentBodyContainer}>

                        </View>
                    </View>


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
        paddingBottom:10
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
        fontSize:14
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
        backgroundColor:'green'
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
    }
})