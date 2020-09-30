import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {CoveredNavigator, Route} from './Navigation'
import MainPage from './Pages/MainPage'
import {SignupPageFirst, SignupPageSecond} from './Pages/SignupPage'

import ShopCategorypage from './Pages/Shop/Shop_Categorypage'
import ShopProductpage from './Pages/Shop/Shop_Productpage'
import LoginPage from './Pages/LoginPage'
import OnBoard from './Pages/OnBoard'
import Menu from './Menu'


export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            navigationHandler:{},
            menuHandler:{}
        }
    }
    handleChange = (field, text, cb) => this.setState({ [field]:text}, typeof cb === 'function' ? cb:()=>{})
    registerNavigator = (handlers) => this.handleChange('navigationHandler', handlers)
    registerMenu = (handlers) => this.handleChange('menuHandler', handlers)
    render(){
        const handler = {
            menu: this.state.menuHandler,
            navigation: this.state.navigationHandler }
        return (
            <View style={{width:'100%', height:'100%'}}>
                <View style={{height:44}}/>
                <CoveredNavigator registerHandler={this.registerNavigator} handler={handler}>
                    <Route name="MainPage" component={MainPage}/>
                    <Route name="OnBoard" component={OnBoard}/>
                    <Route name="SignupPage" component={SignupPageFirst}/>
                    <Route name="SignupPage2" component={SignupPageSecond}/>
                    <Route name="LoginPage" component={LoginPage}/>
                    <Route name="ShopCategoryPage" component={ShopCategorypage}/>
                    <Route name="ShopProductPage" component={ShopProductpage}/>
                </CoveredNavigator>
                <Menu registerHandler={this.registerMenu} handler={handler}/>
            </View>
        )
    }
}
