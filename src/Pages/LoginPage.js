import React, {Component} from 'react'
import {StyleSheet, TextInput, View, TouchableOpacity, Text} from 'react-native'
import {SimpleHeader} from '../Header'

const GRAY_WHITE_COLOR = '#E5E5E5'
const LIGHT_GRAY_COLOR = '#C4C4C4'
const GRAY_COLOR = '#5A5A5A'

export default class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }
    handleChange = (field, text, cb) => this.setState({ [field]:text}, typeof cb==='function'?cb:()=>{})
    render(){
        const {email, password} = this.state
        const {handleChange} = this
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <SimpleHeader title="로그인" handlePop={this.props.handler.navigation.pop} />
                <View style={{flex:1, paddingLeft:25, paddingRight:25, alignItems:'center', justifyContent:'center'}}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.simpleTextInput}
                            value={email}
                            onChangeText={e=>handleChange('email',e)}
                            placeholderTextColor={GRAY_COLOR}
                            placeholder="이메일 주소" />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.simpleTextInput}
                            value={password}
                            onChangeText={e=>handleChange('password',e)}
                            placeholderTextColor={GRAY_COLOR}
                            clearTextOnFocus={true}
                            secureTextEntry={true}
                            placeholder="비밀번호" />
                    </View>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <View style={styles.buttonImage}><Text>로그인 </Text></View>
                    </TouchableOpacity>
                </View>
            </View>
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
    buttonContainer:{
        height:80,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonImage:{
        height:39,
        width: '100%',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: LIGHT_GRAY_COLOR
    },
})