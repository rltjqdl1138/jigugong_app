import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import {SimpleHeader} from '../Header'
import {Account} from '../Network'


const GRAY_WHITE_COLOR = '#E5E5E5'
const LIGHT_GRAY_COLOR = '#C4C4C4'
const GRAY_COLOR = '#5A5A5A'
const BLACK_COLOR = '#000'
const RED_COLOR = '#f00'
const LIGHT_GREEN_COLOR = '#D4FF92'
const GREEN_COLOR = '#15AA2D'

const STATUS_NORMAL = 0
const STATUS_ERROR = 1
const STATUS_OK = 2
const STATUS_TEXT_COLOR_LIST = [GRAY_COLOR, RED_COLOR, GREEN_COLOR]
const STATUS_BORDER_COLOR_LIST = [GRAY_COLOR, RED_COLOR, GRAY_COLOR]

exports.SignupPageFirst = class SignupPageFirst extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            passwordCheck:'',

            emailNotice:{text:'이메일주소', status: STATUS_NORMAL },
            passwordNotice:{text:'비밀번호', status: STATUS_NORMAL },
            passwordCheckNotice:{text:'비밀번호확인', status: STATUS_NORMAL }
        }
    }
    handleChange = (field, text, cb) => this.setState({ [field]:text}, typeof cb==='function'?cb:()=>{})
    reloadNotice = async (key) =>{
        const {email, password, passwordCheck} = this.state
        switch(key){
            case 'email':
                const _email = email.split('@')
                switch(true){
                    case _email.length !== 2:
                    case !_email[0].length:
                    case !_email[1].length:
                    case !_email[1].split('.')[1]:
                    case !_email[1].split('.')[1].length:
                        return this.handleChange('emailNotice', {text: '이메일 형식이 올바르지 않습니다.', status: STATUS_ERROR})
                }
                const response = true // From server
                return this.checkDuplicated('account', {id:email, platform:'original'})
            case 'password':
                const number = password.replace(/[^0-9]/gi, "")
                const lower = password.replace(/[^a-z]/gi, "")
                const upper = password.replace(/[^A-Z]/gi, "")
                switch(true){
                    case !password.length:
                        return this.handleChange('passwordNotice', {text:'', status: STATUS_NORMAL})
                    case password.length < 8:
                    case !number.length:
                    case !lower.length:
                    case !upper.length:
                        return this.handleChange('passwordNotice', {text:'영문, 숫자 포함 8자리 이상 입력해주세요.', status: STATUS_ERROR})
                }
                return this.handleChange('passwordNotice', {text:'', status: STATUS_OK})
            
            case 'passwordCheck':

                if(passwordCheck.length < 4)
                    return this.handleChange('passwordCheckNotice', {text:'', status: STATUS_NORMAL})
                else if(passwordCheck !== password)
                    return this.handleChange('passwordCheckNotice', {text:'비밀번호가 일치하지 않습니다.', status: STATUS_ERROR})

                return this.handleChange('passwordCheckNotice', {text:'', status: STATUS_OK})
        }
    }
    checkDuplicated = async(key, value)=>{
        const response = await Account.CheckDuplicated(key, value)
        return response && response.success ?
            this.handleChange('emailNotice', {text: '사용가능한 이메일입니다.', status: STATUS_OK}) : 
            this.handleChange('emailNotice', {text: '이미 사용중인 이메일입니다.', status: STATUS_ERROR})
    }
    render(){
        const {email, password, passwordCheck, emailNotice, passwordNotice, passwordCheckNotice} = this.state
        const {handleChange, reloadNotice} = this
        const availableNext = emailNotice.status === 2 && passwordNotice.status === 2 && passwordCheckNotice.status === 2
        return (
            <View style={styles.container}>
                <SimpleHeader title="회원가입"
                    handlePop={()=>this.props.handler.navigation.pop()} />
                <View style={{flex:1, paddingLeft:25, paddingRight:25, justifyContent:'center'}}>
                    {/* Email Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[emailNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={email}
                            onChangeText={e=>handleChange('email',e, ()=>reloadNotice('email'))}
                            placeholderTextColor={GRAY_COLOR}
                            placeholder="이메일 주소" />
                        <View style={emailNotice.status===1?styles.alertImage :{}}>

                        </View>
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[emailNotice.status]}]}>
                            {emailNotice.text}
                        </Text>
                    </View>

                    {/* Password Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[passwordNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={password}
                            onChangeText={e=>handleChange('password',e,()=>reloadNotice('password'))}
                            placeholderTextColor={GRAY_COLOR}
                            clearTextOnFocus={true}
                            secureTextEntry={true}
                            placeholder="비밀번호 (영문, 숫자 포함 8자 이상)" />

                        <View style={passwordNotice.status===1?styles.alertImage :{}}>

                        </View>
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[passwordNotice.status]}]}>
                            {passwordNotice.text}
                        </Text>

                    </View>

                    {/* Password Check Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[passwordCheckNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={passwordCheck}
                            onChangeText={e=>handleChange('passwordCheck',e,()=>reloadNotice('passwordCheck'))}
                            placeholderTextColor={GRAY_COLOR}
                            clearTextOnFocus={true}
                            secureTextEntry={true}
                            placeholder="비밀번호 확인" />

                        <View style={passwordCheckNotice.status===1?styles.alertImage :{}}>

                        </View>
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[passwordCheckNotice.status]}]}>
                            {passwordCheckNotice.text}
                        </Text>

                    </View>
                </View>
                {/* Buttons */}
                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.buttonContainer} disabled={!availableNext} onPress={()=>this.props.navigator.push('SignupPage2', { account:{id:email, password, platform:'original'}})}>
                        <View style={[styles.buttonImage, {backgroundColor: availableNext ? LIGHT_GREEN_COLOR : LIGHT_GRAY_COLOR} ]}>
                            <Text style={{color:availableNext?BLACK_COLOR:GRAY_COLOR}}>다음</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{height:40}}/>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <View style={styles.buttonImage}>
                            <Text>네이버로 시작하기</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <View style={styles.buttonImage}>
                            <Text>페이스북으로 시작하기</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <View style={styles.buttonImage}>
                            <Text>구글로 시작하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

exports.SignupPageSecond = class SignupPageSecond extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            mobile: '',
            mobileCheck: '',
            nickname: '',
            code: '',

            nameNotice:{text:'', status:STATUS_NORMAL},
            mobileNotice:{text:'', status:STATUS_NORMAL},
            mobileCheckNotice:{text:'', status:STATUS_NORMAL},
            nicknameNotice:{text:'', status:STATUS_NORMAL},
            codeNotice:{text:'추천인 코드를 입력하면 친구와 함께 각각 500 지구자원 획득!', status:STATUS_NORMAL},

            limitTime:0,
            agreementCheck:[false, false, false, false]
        }
    }
    mobileToken = ''
    componentDidMount(){
        switch(true){
            case !this.props.config:
            case !this.props.config.account:
            case !this.props.config.account.id:
            case !this.props.config.account.platform:
                break;
            case this.props.config.account.platform === 'original':
                if(!this.props.config.account.password) break;
            default:
                return;
        }
        this.props.navigator.pop('SignupPage2')
    }
    handleChange = (field, text, cb) => this.setState({ [field]:text}, typeof cb==='function'?cb:()=>{})
    reloadNotice = async (key) =>{
        const {name, nickname} = this.state
        switch(key){
            case 'name':
                if(name.length === 0)
                    return this.handleChange('nameNotice', {text: '', status: STATUS_NORMAL})
                else if(name.length < 2)
                    return this.handleChange('nameNotice', {text: '2자 이상 입력해주세요', status: STATUS_ERROR})
                else
                    return this.handleChange('nameNotice', {text: '', status: STATUS_OK})

            case 'mobile':
                return this.handleChange('mobileNotice', {text: '', status: STATUS_NORMAL})

            case 'mobileCheck':
                return this.handleChange('mobileCheckNotice', {text: '', status: STATUS_NORMAL})
            
            case 'nickname':
                const number = nickname.replace(/[^0-9]/gi, "")
                if(nickname.length === 0)
                    return this.handleChange('nicknameNotice', {text: '', status: STATUS_NORMAL})
                else if(nickname.length < 2 || nickname.length > 9)
                    return this.handleChange('nicknameNotice', {text: '숫자 제외 2~10자 내로 입력해주세요', status: STATUS_ERROR})
                else if(number.length)
                    return this.handleChange('nicknameNotice', {text: '숫자 제외 2~10자 내로 입력해주세요', status: STATUS_ERROR})

                //Check to server
                return this.checkDuplicated('nickname', nickname)

            case 'code':
        }
    }

    checkDuplicated = async(key, value)=>{
        switch(key){
            case 'nickname':
                const response = await Account.CheckDuplicated(key, value)
                return response && response.success ?
                    this.handleChange('nicknameNotice', {text: '사용가능한 닉네임입니다..', status: STATUS_OK}) : 
                    this.handleChange('nicknameNotice', {text: '이미 사용중인 닉네임입니다.', status: STATUS_ERROR})

        }
    }

    requestMessage = async()=>{
        const {mobile} = this.state
        if(mobile.length < 10 || mobile.length > 11)
            return this.handleChange('mobileNotice', {text:'올바른 번호를 입력해주세요.', status: STATUS_ERROR})
        const response = await Account.RequestMobileAuth(mobile)
        this.handleChange('mobileNotice', response ?
            {text:'인증번호가 발송되었습니다.', status: STATUS_NORMAL} :
            {text:'잠시후 시도해주세요.', status: STATUS_ERROR} )
    }
    verifyMessage = async()=>{
        const {mobile, mobileCheck, limitTime} = this.state
        //if(!mobile || !mobile.length || !limitTime)
        //    return this.handleChange('mobileCheckNotice', {text:'인증번호를 먼저 요청해주세요', status:STATUS_ERROR})
        //else if(mobileCheck.length < 6)
        //    return this.handleChange('mobileCheckNotice', {text:'인증번호를 확인해주세요', status:STATUS_ERROR})

        const response = await Account.VerifyMobileAuth(mobile, mobileCheck)
        if(!response || !response.success || !response.token)
            return this.handleChange('mobileCheckNotice', {text:'인증번호를 확인해주세요', status:STATUS_ERROR})
        this.mobileToken = response.token
        return this.handleChange('mobileCheckNotice', {text:'인증이 완료되었습니다.', status:STATUS_OK})

    }
    CheckBox = (props) => this.state.agreementCheck[props.val] ? (
        <TouchableOpacity style={[styles.agreementCheckboxImage, {backgroundColor:GREEN_COLOR}]} onPress={()=>this.handleChangeAgreement(props.val)}>
            <Text style={{color:'#fff', textAlign:'center'}}>V</Text>
        </TouchableOpacity>) : (
        <TouchableOpacity style={styles.agreementCheckboxImage} onPress={()=>this.handleChangeAgreement(props.val)}>
            <Text style={{color:'#fff', textAlign:'center'}}>V</Text>
        </TouchableOpacity>
    )
    handleChangeAgreement = (key)=>{
        const list = this.state.agreementCheck
        const newValue = !list[key]
        switch(key){
            case 0:
                return this.handleChange('agreementCheck', [newValue, newValue, newValue, newValue])
            case 1:
                list[0] = newValue && list[2] && list[3]
                list[1] = newValue
                return this.handleChange('agreementCheck', list)
            case 2:
                list[0] = newValue && list[1] && list[3]
                list[2] = newValue
                return this.handleChange('agreementCheck', list)
            case 3:
                list[0] = newValue && list[1] && list[2]
                list[3] = newValue
                return this.handleChange('agreementCheck', list)
        }
    }
    handleConfirm = async()=>{
        const {account} = this.props.config
        const {name, mobile, nickname, code} = this.state
        console.warn(this.mobileToken)
        const response = await Account.Signup({account, name, mobile, nickname, code}, this.mobileToken)
        console.warn(response.token)
        if(response && response.success && response.token){
            // Handling Success
            // * Login
            //response.token
            // * 
            this.props.navigator.pop()
        }
        // Handling Fail
        
    }
    render(){
        const {name, mobile, mobileCheck, nickname, code, nameNotice, mobileNotice, mobileCheckNotice, nicknameNotice, codeNotice, agreementCheck} = this.state
        const {handleChange, reloadNotice, CheckBox} = this
        const isDisabled = nameNotice.status !== STATUS_OK || nicknameNotice.status !== STATUS_OK || mobileCheckNotice.status !== STATUS_OK || !agreementCheck[1] ||!agreementCheck[2] ||!agreementCheck[3]
        return (
            <ScrollView style={styles.container}>
                <SimpleHeader title="회원가입"
                    handlePop={()=>this.props.handler.navigation.pop('SignupPage2')} />
                <View style={{width:'100%', paddingLeft:25, paddingRight:25, justifyContent:'center'}}>
                    {/* Name Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[nameNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={name}
                            autoFocus={true}
                            onChangeText={e=>handleChange('name',e, ()=>reloadNotice('name'))}
                            placeholderTextColor={GRAY_COLOR}
                            placeholder="이름" />
                        <View style={nameNotice.status===1?styles.alertImage :{}} />
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[nameNotice.status]}]}>
                            {nameNotice.text}
                        </Text>
                    </View>

                    {/* mobile Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[mobileNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={mobile}
                            onChangeText={e=>handleChange('mobile',e, ()=>reloadNotice('mobile'))}
                            placeholderTextColor={GRAY_COLOR}
                            keyboardType="number-pad"
                            placeholder="핸드폰 번호 (-제외)" />
                        <TouchableOpacity style={{width:70, height:'100%', justifyContent:'flex-end'}} onPress={this.requestMessage}>
                            <Text style={{fontSize:14}}>인증요청</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[mobileNotice.status]}]}>
                            {mobileNotice.text}
                        </Text>
                    </View>


                    {/* mobile Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[mobileCheckNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={mobileCheck}
                            onChangeText={e=>handleChange('mobileCheck',e, ()=>reloadNotice('mobileCheck'))}
                            placeholderTextColor={GRAY_COLOR}
                            keyboardType="number-pad"
                            maxLength={6}
                            placeholder="인증번호"/>
                        {mobileCheckNotice.status === STATUS_OK ? null :
                            (<TouchableOpacity style={{width:70, height:'100%', justifyContent:'flex-end'}} onPress={this.verifyMessage}>
                                <Text style={{fontSize:14}}>인증확인</Text>
                            </TouchableOpacity>)}
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[mobileCheckNotice.status]}]}>
                            {mobileCheckNotice.text}
                        </Text>
                    </View>

                    {/* Nickname Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[nicknameNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={nickname}
                            onChangeText={e=>handleChange('nickname',e, ()=>reloadNotice('nickname'))}
                            placeholderTextColor={GRAY_COLOR}
                            placeholder="닉네임" />
                        <View style={nicknameNotice.status===1?styles.alertImage :{}} />
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[nicknameNotice.status]}]}>
                            {nicknameNotice.text}
                        </Text>
                    </View>


                    {/* Code Input */}
                    <View style={[styles.inputContainer, {borderBottomColor:STATUS_BORDER_COLOR_LIST[codeNotice.status]}]}>
                        <TextInput style={styles.simpleTextInput}
                            value={code}
                            onChangeText={e=>handleChange('code',e, ()=>reloadNotice('code'))}
                            placeholderTextColor={GRAY_COLOR}
                            placeholder="추천인 코드 (선택)" />
                        <View style={codeNotice.status===1?styles.alertImage :{}} />
                    </View>
                    <View style={styles.noticeContainer}>
                        <Text style={[styles.noticeText, {color:STATUS_TEXT_COLOR_LIST[codeNotice.status]}]}>
                            {codeNotice.text}
                        </Text>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', paddingTop:30}}>
                    <View style={styles.agreementContainer}>
                        <View style={styles.agreementItem}>
                            <CheckBox val={0} />
                            <Text style={styles.agreementText}>모두 동의</Text>
                        </View>

                        <View style={{height:0,width:'90%', borderBottomWidth:2, borderBottomColor: LIGHT_GRAY_COLOR, marginTop:5, marginBottom:5}} />
                        
                        <View style={styles.agreementItem}>
                            <CheckBox val={1} />
                            <Text style={styles.agreementText}>(필수) 본인은 14세 이상입니다.</Text>
                        </View>

                        <View style={styles.agreementItem}>
                            <CheckBox val={2} />
                            <Text style={styles.agreementText}>(필수) 이용약관 동의 </Text>
                            <TouchableOpacity style={{borderBottomColor:GRAY_COLOR, borderBottomWidth:1}}>
                                <Text>보기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.agreementItem}>
                            <CheckBox val={3} />
                            <Text style={styles.agreementText}>(필수) 개인정보 수집 및 이용 동의</Text>
                            <TouchableOpacity style={{borderBottomColor:GRAY_COLOR, borderBottomWidth:1}}>
                                <Text>보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} disabled={isDisabled} onPress={this.handleConfirm}>
                        <View style={[styles.buttonImage, {backgroundColor: !isDisabled ? LIGHT_GREEN_COLOR : LIGHT_GRAY_COLOR} ]}>
                            <Text style={{color:isDisabled?GRAY_COLOR:BLACK_COLOR}}>다음</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    inputContainer:{
        height:60,
        width:'100%',
        borderBottomWidth:1,
        flexDirection:'row',
        borderBottomColor:GRAY_COLOR,
        alignItems:'flex-end',
        paddingBottom:10
    },
    simpleTextInput:{
        paddingLeft:10,
        flex:1,
        fontSize:16
    },
    alertImage:{
        width:24,
        height:24,
        backgroundColor:'red',
        borderRadius:20
    },
    noticeContainer:{
        minHeight:20,
        paddingLeft:10,
        width:'100%',
        justifyContent:'center'
    },
    noticeText:{
        fontSize:12
    },
    buttonContainer:{
        paddingLeft:25,
        paddingRight:25,
        height:60,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonImage:{
        height:39,
        width:'100%',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: LIGHT_GRAY_COLOR
    },

    agreementContainer:{
        height:180,
        width: 328,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:  GRAY_WHITE_COLOR,
        marginBottom:20,
        paddingTop:20,
        paddingBottom:20
    },
    agreementItem:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingLeft:30,
        paddingRight:30
    },
    agreementCheckboxImage:{
        width:20,
        height:20,
        backgroundColor:LIGHT_GRAY_COLOR
    },
    agreementText:{
        paddingLeft:10
    }
})