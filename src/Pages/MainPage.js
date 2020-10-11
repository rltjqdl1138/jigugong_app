import React, {Component} from 'react'
import * as Linking from 'expo-linking'
import {View, TouchableOpacity, Text, Dimensions} from 'react-native'
import {ParallelNavigator, Route, CoveredNavigator} from '../Navigation'
import {MainHeader} from '../Header'
import ShopMainpage from './Shop/Shop_Mainpage'

const Navigator = ParallelNavigator(false)

export default class MainContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            navigatorHandler: {}
        }
    }
    componentDidMount(){
        Linking.addEventListener('url', this._handleURLListener)
        //this.props.navigator.push('OnBoard')
    }
    componentWillUnmount(){
        Linking.removeEventListener('url', this._handleURLListener)
    }
    _handleURLListener = ({url})=>{
        const {path, queryParams} = Linking.parse(url)
        switch(path){
            case 'product':
                const productID = queryParams.id
                this.props.navigator.push('ShopProductPage', {id:productID})
            default:
                return;
        }
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    registerNavigator = (handlers) => this.handleChange('navigatorHandler', handlers)
    render(){
        const {navigatorHandler} = this.state
        return (
            <View style={{flex:1}}>
                <Navigator registerHandler={this.registerNavigator} handler={this.props.handler}>
                    <Route key="Test1" component={Test1}/>
                    <Route key="ShopMainpage" component={ShopMainpage} /> 
                    <Route key="Test3" component={Test3}/>
                    <Route key="Test4" component={Test4}/>
                    <Route key="Test5" component={Test5}/>
                </Navigator>
                <View style={{position:'absolute', top:Dimensions.get('window').height-120, width:'100%', height:84, paddingBottom:20, backgroundColor:'#fff'}}>
                    {navigatorHandler.NavigationBox ? navigatorHandler.NavigationBox : null}
                </View>
            </View>
        )
    }
}



class Test1 extends Component{
    render(){
        return (
            <View style={{width:'100%', height:'100%', backgroundColor:'red'}}>
                <Text style={{textAlign:'center'}}>1페이지</Text>
            </View>
        )
    }
}

class Test2 extends Component{
    render(){
        return (
            <View style={{width:'100%', height:'100%', backgroundColor:'blue'}}>
                <Text style={{textAlign:'center'}}>2페이지</Text>
            </View>
        )
    }
}

class Test3 extends Component{
    render(){
        return (
            <View style={{width:'100%', height:'100%', backgroundColor:'green'}}>
                <Text style={{textAlign:'center'}}>3페이지</Text>
            </View>
        )
    }
}

class Test4 extends Component{
    render(){
        return (
            <View style={{width:'100%', height:'100%', backgroundColor:'gray'}}>
                <Text style={{textAlign:'center'}}>4페이지</Text>
            </View>
        )
    }
}

class Test5 extends Component{
    render(){
        return (
            <View style={{width:'100%', height:'100%', backgroundColor:'yellow'}}>
                <Text style={{textAlign:'center'}}>5페이지</Text>
            </View>
        )
    }
}