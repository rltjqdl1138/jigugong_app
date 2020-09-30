import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import {Route, ParallelNavigator} from '../Navigation'

const DOT_SIZE = 12
const DOT_ON = '#999'
const DOT_OFF = '#ddd'

const Navigator = ParallelNavigator(true)
export default class OnBoardPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            index: 0
        }
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    registerNavigator = (handlers) => this.handleChange('navigatorHandler', handlers)
    indexHandler = (index) => this.handleChange('index', index)
    getDotStyle = (index) => index === this.state.index ? [styles.navidot,{backgroundColor:DOT_ON}] : styles.navidot
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.container}>
                    <Navigator handler={this.registerNavigator} indexHandler={this.indexHandler}>
                        <Route key="screen1" component={Screen1}/>
                        <Route key="screen2" component={Screen2}/>
                        <Route key="screen3" component={Screen3}/>
                    </Navigator>
                    <View style={styles.navidotContainer}>
                        <View style={this.getDotStyle(0)} />
                        <View style={this.getDotStyle(1)} />
                        <View style={this.getDotStyle(2)} />
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.signupContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={()=>this.props.navigator.push('SignupPage')}>
                            <Text style={styles.buttonText}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={()=>this.props.navigator.push('LoginPage')}>
                            <Text style={styles.buttonText}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:44}}/>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    navidotContainer:{
        position:'absolute',
        bottom:20,
        height:20,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    navidot:{
        height:DOT_SIZE,
        width:DOT_SIZE,
        backgroundColor:DOT_OFF,
        borderRadius:10,
        marginRight:5,
        marginLeft:5
    },
    lowerContainer:{
        height:200,
        width:'100%',
        backgroundColor:'#ddd'
    },
    signupContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingBottom:10
    },
    loginContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:10,
        paddingBottom:10
    },
    button:{
        height:'100%',
        width:200,
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:15
    }
})

class Screen1 extends Component{
    render(){
        return (
            <View style={screenStyle.container}>
                <View style={screenStyle.textContainer}>
                    <Text style={screenStyle.text}>
                        <Text>친환경 활동을 하면</Text>
                        <Text style={screenStyle.boldText}> 지구자원</Text>
                        <Text>을 받아요!</Text>
                    </Text>
                </View>
                <View style={screenStyle.imageContainer}>
                    <Text style={{fontSize:22}}>( 대충 이미지 들어갈 자리 )</Text>
                </View>
            </View>
        )
    }
}
class Screen2 extends Component{
    render(){
        return (
            <View style={screenStyle.container}>
                <View style={screenStyle.textContainer}>
                    <Text style={screenStyle.text}>
                        <Text>지구자원으로</Text>
                        <Text style={screenStyle.boldText}> 할인</Text>
                        <Text>받아</Text>
                    </Text>
                    <Text style={screenStyle.text}>친환경 제품을 구입할 수 있어요!</Text>
                </View>

                <View style={screenStyle.imageContainer}>
                    <Text style={{fontSize:22}}>( 대충 이미지 들어갈 자리 )</Text>
                </View>
            </View>
        )
    }
}
class Screen3 extends Component{
    render(){
        return (
            <View style={screenStyle.container}>
                <View style={screenStyle.textContainer}>
                    <Text style={screenStyle.text}>내가 환경에 기여한 정도를</Text>
                    <Text style={screenStyle.text}>
                        <Text style={screenStyle.boldText}>지구력</Text>
                        <Text>으로 확인할 수 있어요!</Text>
                    </Text>
                </View>
                <View style={screenStyle.imageContainer}>
                    <Text style={{fontSize:22}}>( 대충 이미지 들어갈 자리 )</Text>
                </View>
            </View>
        )
    }
}

const screenStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    textContainer:{
        height:150,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:18
    },
    boldText:{ fontWeight:'bold' },
    imageContainer:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})