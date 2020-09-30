import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native'
import Product from './ProductComponent'

const WIDTH = (Dimensions.get('window').width-50) / 2
const HEADER_SIZE = 52
export default class ShopCategorypage extends Component{
    render(){
        const {navigator} = this.props
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeftBoxContainer}>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={this.props.navigator.pop}>
                            <Text style={{fontSize:20}}>{`<`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerMiddleBoxContainer}>
                        <Text style={{fontSize:20}}>
                            {this.props.config.title ? this.props.config.title : ''}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.headerRightBoxContainer}>
                        <View style={styles.cartImage}>
                            <Text>장</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', padding:16}}>
                    <Text>상품 00개</Text>
                    <View style={{flex:1}} />
                    <TouchableOpacity style={{flexDirection:'row', width:80, justifyContent:'center', alignItems:'center',paddingRight:10}}>
                        <Text style={{flex:1, textAlign:'center'}}>인기순</Text>
                        <View style={{width:15, height:15, backgroundColor:'black'}}></View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex:1}}>
                    <View style={{flexDirection:'row', justifyContent:'center', paddingBottom:40}}>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center', paddingBottom:40}}>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center', paddingBottom:40}}>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center', paddingBottom:40}}>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center', paddingBottom:40}}>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                        <Product size={WIDTH} onClick={()=>navigator.push('ShopProductPage')}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerContainer:{
        width:'100%',
        height: HEADER_SIZE,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    headerLeftBoxContainer:{
        width:55,
    },
    headerMiddleBoxContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    headerRightBoxContainer:{
        width:55,
        justifyContent:'center',
        alignItems:'center'        
    },
    cartImage:{
        width:24,
        height:24,
        borderWidth:1,
        borderColor:'black',
        justifyContent:'center',
        alignItems:'center'    
    }
})
