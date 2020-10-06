import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TextInput, Keyboard, TouchableOpacity} from 'react-native'
import {SimpleHeader} from '../../Header'

export default class SendAskPage extends Component{
    constructor(props){
        super()
        this.state = {
            askText:'',
            isSecret:false,
            keyboardSpaceHeight:0
        }
    }
    componentDidMount() {
		this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
		this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
	}
	componentWillUnmount() {
		this._keyboardWillShowSubscription.remove();
		this._keyboardWillHideSubscription.remove();
	}
	_keyboardWillShow = (e)=> this.handleChange('keyboardSpaceHeight', e.endCoordinates.height)
	_keyboardWillHide = (e)=> this.handleChange('keyboardSpaceHeight', 0)
    handleChange = (field, text) => this.setState({ [field]:text} )
    render(){
        return(
            <View style={styles.container}>
                <SimpleHeader title="상품 문의하기" handlePop={()=>this.props.navigator.pop('SendAskPage')} />
                <ScrollView>
                    <View style={styles.itemInfoContainer}>
                        <View style={styles.itemImageContainer}>
                            <View style={styles.itemImageContainer}>

                            </View>
                        </View>
                        <View style={styles.itemMainContainer}>
                            <View style={styles.itemTextContainer}>
                                <Text>브랜드명</Text>
                            </View>
                            <View style={styles.itemTextContainer}>
                                <Text>상품명</Text>
                            </View>
                            <View style={styles.itemTextContainer}>
                                
                            </View>
                        </View>
                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputComponent}>
                            <TextInput style={styles.textInput} value={this.state.askText}
                                onChangeText={text=>this.handleChange('askText', text)}
                                multiline={true} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.noticeContainer} onPress={()=>this.handleChange('isSecret', !this.state.isSecret)}>
                        <View style={styles.checkboxContainer} >
                            <View style={{width:'100%', height:'100%', borderRadius:10, backgroundColor:this.state.isSecret ? 'green' : 'white'}} />
                        </View>
                        <Text>비밀글로 등록하기</Text>
                    </TouchableOpacity>
                    <View style={styles.confirmButtonContainer}>
                        <TouchableOpacity style={[styles.confirmButton, {backgroundColor:'#C4C4C4'}]}>
                            <Text style={{textAlign:'center'}}>등록</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:this.state.keyboardSpaceHeight}} />
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff'
    },
    itemInfoContainer:{
        width:'100%',
        height:120,
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:16,
        paddingRight:16,
        flexDirection:'row'
    },
    itemImageContainer:{
        width: 80,
        height: 80,
        backgroundColor:'#C4C4C4'
    },
    itemMainContainer:{
        flex:1,
        paddingLeft:20
    },
    itemTextContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    textInputContainer:{
        width:'100%',
        paddingLeft:16,
        paddingRight:16,
    },
    textInputComponent:{
        flex:1,
        borderColor:'#C4C4C4',
        borderWidth:1,
        padding:5
    },
    textInput:{
        flex:1,
        textAlignVertical:'top',
        height:200
    },
    noticeContainer:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:16,
        paddingRight:16,
        flexDirection:'row'
    },
    checkboxContainer:{
        width:16,
        height:16,
        borderWidth:1,
        borderColor:'black',
        marginRight:10
    },
    confirmButtonContainer:{
        paddingLeft:16,
        paddingRight:16 ,
        height:30,
        width:'100%'
    },
    confirmButton:{
        width:'100%',
        height:'100%',
        borderRadius:15,
        justifyContent:'center'
    }
})