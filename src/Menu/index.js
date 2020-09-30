import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, TouchableHighlight, Animated, Dimensions, Text} from 'react-native'
const {width} = Dimensions.get('window')

export default class Menu extends Component{
    constructor(props){
        super(props)
        this.state={ isOpen:false }
    }
    componentDidMount(){
        !this.props.registerHandler ? null :
            this.props.registerHandler({
                open: this.handleOpen,
                close: this.handleClose
            })
    }
    _animatedValue = new Animated.Value(-width)

    // Public Values
    handleOpen=()=>{
        this._animatedValue.setValue(0)
        this.setState({isOpen:true},
            ()=>Animated.timing(this._animatedValue, {
                duration:300,
                toValue:-width,
                useNativeDriver:true
            }).start()
        )
    }
    handleClose = (callback)=> Animated.timing(this._animatedValue, {
        duration:200,
        toValue:0,
        useNativeDriver:true
    }).start( ()=>this.setState({isOpen:false }, ()=>typeof callback === 'function' ? callback():null ) )

    render(){
        return !this.state.isOpen ? null : (
            <Animated.View style={[styles.container, {transform: [{translateX: this._animatedValue}]}]}>
                <TouchableHighlight style={styles.blankBox} activeOpacity={1} onPress={this.handleClose} >
                    <View />
                </TouchableHighlight>
                <View style={styles.contentBox}>
                    <View style={styles.statusBox}/>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.handler.navigation.push('LoginPage')
                            this.handleClose(()=>{})
                        }}>
                            <Text style={{fontSize:30, padding:10}}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomBox}/>
                </View>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        width:'200%',
        height:'100%',
        flexDirection:'row',
    },
    blankBox:{
        flex:2,
        backgroundColor:'#000',
        opacity:0.6
    },
    contentBox:{
        flex:1,
        backgroundColor:'#fff'
    },

    statusBox:{
        height:44,
        width:'100%',
        //backgroundColor:'#777'
    },
    bottomBox:{
        height:34,
        width:'100%',
        //backgroundColor:'#ccc'
    }
})