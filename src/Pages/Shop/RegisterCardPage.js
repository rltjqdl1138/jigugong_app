import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard} from 'react-native'
import {SimpleHeader} from '../../Header'
import {Shop, Clayful} from '../../Network'
const SELECTED_TAP_COLOR = '#C4C4C4'
const GRAY_FONT_COLOR = '#5A5A5A'

export default class RegisterCardPage extends Component {
    constructor(props){
        super()
        this.state = {
            card_number:['','','',''],
            expiry:['',''],
            birth:'',
            pwd:'',
            checked:false
        }
    }
    componentDidMount(){
        if(!this.props.config || !this.props.config.handler)
            return setTimeout(()=>this.props.navigator.pop('RegisterCardPage'), 100)
    }
    inputRefs=[]
    handleChange = (_field, _value) => {
        const {card_number, expiry} = this.state
        let MaxLength, index
        let field = _field;
        let value = _value

        switch(_field){
            case 'card_number0':
                value = card_number; field = 'card_number'
                value[0] = _value
                MaxLength = 4
                index = 0
                break
            case 'card_number1':
                value = card_number; field = 'card_number'
                value[1] = _value
                MaxLength = 4
                index = 1
                break
            case 'card_number2':
                value = card_number; field = 'card_number'
                value[2] = _value
                MaxLength = 4
                index = 2
                break
            case 'card_number3':
                value = card_number; field = 'card_number'
                value[3] = _value
                MaxLength = 4
                index = 3
                break
            case 'expiry1':
                value = expiry; field = 'expiry'
                value[0] = _value
                MaxLength = 2
                index = 4
                break
            case 'expiry2':
                value = expiry; field = 'expiry'
                value[1] = _value
                MaxLength = 2
                index = 5
                break
            case 'birth':
                MaxLength = 6
                index = 6
                break
            case 'pwd':
                MaxLength = 2
                index = 7
                break

            default:
                return this.setState({ [field]:value} )
        }
        let callback = ()=>{}
        if(_value.length === MaxLength)
            callback = this.inputRefs[index+1] ? ()=>this.inputRefs[index+1].focus() : ()=>Keyboard.dismiss()
        
        this.setState({ [field]:value}, callback )
    }
    handleConfirm = async ()=>{
        const {card_number, expiry, birth, pwd, checked} = this.state
        switch(true){
            case card_number[0].length !== 4:
            case card_number[1].length !== 4:
            case card_number[2].length !== 4:
            case card_number[3].length !== 4:

            case expiry[0].length !== 2:
            case expiry[1].length !== 2:
                
            case birth.length !== 6:
            case pwd.length !== 2:

            case checked === false:
                return;
        }
        const payload = {
            card_number: `${card_number[0]}-${card_number[1]}-${card_number[2]}-${card_number[3]}`,
            expiry: `20${expiry[1]}-${expiry[0]}`,
            pwd_2digit: pwd,
            birth
        }
        const response = await Shop.RegisterNewCreditCard(payload)
        if(!response){
            // Network Error
        }else if(response.success){
            // Success
            await this.props.config.handler()
            this.props.navigator.pop('RegisterCardPage')
        }else if(response.status === 403){
            // Info
        }else if(response.status === 500){
            // Server Error
        }
    }
    render(){
        const {card_number, expiry, birth, pwd, checked} = this.state
        return (
            <View style={styles.container}>
                <SimpleHeader title="카드 등록" handlePop={()=>this.props.navigator.pop('RegisterCardPage')} />
                <ScrollView style={{paddingTop:20}}>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text>카드번호</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={[styles.textInput, styles.textInputFont, styles.parsedTextInput]} placeholder="0000" keyboardType="number-pad" maxLength={4}
                                ref={(ref)=>this.inputRefs[0] =ref}
                                value={card_number[0]}
                                onChangeText={(text)=>this.handleChange('card_number0', text)}
                            />
                            <Text style={styles.textInputFont}>-</Text>
                            <TextInput style={[styles.textInput, styles.textInputFont, styles.parsedTextInput]} placeholder="0000" keyboardType="number-pad" maxLength={4}
                                ref={(ref)=>this.inputRefs[1] =ref}
                                value={card_number[1]}
                                onChangeText={(text)=>this.handleChange('card_number1', text)}
                            />
                            <Text style={styles.textInputFont}>-</Text>
                            <TextInput style={[styles.textInput, styles.textInputFont, styles.parsedTextInput]} placeholder="0000" keyboardType="number-pad" maxLength={4}
                                ref={(ref)=>this.inputRefs[2] =ref}
                                value={card_number[2]}
                                onChangeText={(text)=>this.handleChange('card_number2', text)}
                            />
                            <Text style={styles.textInputFont}>-</Text>
                            <TextInput style={[styles.textInput, styles.textInputFont, styles.parsedTextInput]} placeholder="0000" keyboardType="number-pad" maxLength={4}
                                ref={(ref)=>this.inputRefs[3] =ref}
                                value={card_number[3]}
                                onChangeText={(text)=>this.handleChange('card_number3', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text>유효기간</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={[styles.textInput, styles.textInputFont, styles.parsedTextInput]} placeholder="MM" keyboardType="number-pad" maxLength={2}
                                ref={(ref)=>this.inputRefs[4] =ref}
                                value={expiry[0]}
                                onChangeText={(text)=>this.handleChange('expiry1', text)}
                            />
                            <Text style={styles.textInputFont}>/</Text>
                            <TextInput style={[styles.textInput, styles.textInputFont, styles.parsedTextInput]} placeholder="YY" keyboardType="number-pad" maxLength={2}
                                ref={(ref)=>this.inputRefs[5] =ref}
                                value={expiry[1]}
                                onChangeText={(text)=>this.handleChange('expiry2', text)}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text>생년월일</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={[styles.textInput, styles.textInputFont, {flex:1}]} placeholder="6자리(YYMMDD)" keyboardType="number-pad" maxLength={6}
                                ref={(ref)=>this.inputRefs[6] =ref}
                                value={birth}
                                onChangeText={(text)=>this.handleChange('birth', text)}
                            />
                        </View>
                    </View>


                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text>비밀번호</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={[styles.textInput, styles.textInputFont, {flex:1}]} placeholder="앞 2자리 숫자" keyboardType="number-pad" maxLength={2}
                                ref={(ref)=>this.inputRefs[7] =ref}
                                value={pwd}
                                secureTextEntry={true}
                                onChangeText={(text)=>this.handleChange('pwd', text)}
                            />
                        </View>
                    </View>
                    <View style={styles.usageContainer}>
                        <TouchableOpacity style={styles.usageButtonContainer} onPress={()=>this.handleChange('checked', !checked)}>
                            <View style={{flex:1, borderWidth:1, borderColor:'black', backgroundColor:checked ? 'green' : 'white'}} />
                        </TouchableOpacity>
                        <View style={styles.usageTextContainer}>
                            <Text style={styles.usageText}>신용카드 간편결제 약관 내용에 동의합니다.</Text>
                        </View>
                        <TouchableOpacity style={styles.usageLinkContainer}>
                            <Text style={styles.usageLinkText}>보기</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.noticeText}>카드 정보는 단말기나 지구공에 저장되지 않고 결제 서비스를 제공하는 결제 대행사(NICEPAY)에만 암호화되어 저장됩니다.</Text>
                    <View style={styles.confirmButtonContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={()=>this.handleConfirm()}>
                            <Text style={styles.confirmButtonText}>등록</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff',
    },
    contentContainer:{
        width:'100%',
        paddingLeft:16,
        paddingRight:16
    },
    titleContainer:{
        paddingTop:5,
        paddingBottom:5
    },
    inputContainer:{
        height:50,
        flexDirection:'row',
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:2,
        paddingLeft:16,
        paddingRight:16,
        alignItems:'center'
    },
    textInput:{
        minWidth:50,
        height:'100%',
        marginLeft:5,
        marginRight:5
    },
    textInputFont:{
        fontSize:16,
    },
    parsedTextInput:{
        textAlign:'center'
    },
    usageContainer:{
        flexDirection:'row',
        height:60,
        paddingLeft:16,
        paddingRight:16,
        alignItems:'center'
    }, 
    usageButtonContainer:{
        width:32,
        height:32
    },
    usageButton:{
        flex:1,
        backgroundColor:'green'
    },
    usageTextContainer:{
        justifyContent:'center',
        paddingLeft:8,
        paddingRight:8
    },
    usageText:{

    },
    usageLinkContainer:{
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:2,
        justifyContent:'center'
    },
    usageLinkText:{
        color:GRAY_FONT_COLOR
    },
    noticeText:{
        paddingLeft:16,
        paddingRight:16,
        fontSize:12,
        color:GRAY_FONT_COLOR
    },

    confirmButtonContainer:{
        padding:16,
        height:72
    },
    confirmButton:{
        flex:1,
        borderRadius:15,
        backgroundColor:'#C4C4C4',
        justifyContent:'center'
    },
    confirmButtonText:{
        textAlign:'center'
    }

})