import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native'

const DEFAULT_IMG_SIZE = 132
const WIDTH = Dimensions.get('window').width
const DISCOUNT_RED = '#F13434'

class Product extends Component {
    render(){
        const {size, fullsize, onClick} = this.props
        const imgSize = size ? size : DEFAULT_IMG_SIZE
        return (
            <TouchableOpacity style={[styles.groupItem, {width: fullsize ? WIDTH : imgSize+10}]}
                disabled={typeof onClick !== 'function'}
                onPress={typeof onClick === 'function' ? onClick : ()=>{}} >
                    <View style={[styles.groupItemImageContainer, {height: fullsize ?  WIDTH: imgSize+10 }]}>
                        <View style={{backgroundColor:'#ffff71',width:'100%', height:'100%'}}/>
                    </View>
                    <View style={{padding : fullsize ? 16 : 0}}>
                        <View style={styles.groupItemSubtitleContainer}>
                            <Text style={styles.groupItemSubtitleText}>브랜드명</Text>
                        </View>
                        <View style={styles.groupItemTitleContainer}>
                            <Text style={[styles.groupItemTitleText,{fontSize: 18}]}>제품명</Text>
                        </View>
                        <View style={styles.groupItemCostContainer}>
                            <View style={styles.groupItemCostDiscount}>
                                <Text style={[styles.groupItemCostDiscountText, fullsize ? {fontSize: 18} : null]}>0%</Text>
                            </View>
                            <View style={styles.groupItemCostCurrent}>
                                <Text style={[styles.groupItemCostCurrentText, fullsize ? {fontSize: 18} : null]}>10,000원</Text>
                            </View>
                            <View style={styles.groupItemCostOriginal}>
                                <Text style={[styles.groupItemCostOriginalText, fullsize ? {fontSize: 14} : null]}>10,000원</Text>
                            </View>
                        </View>
                        <View style={styles.groupItemStarContainer}>
                            <View style={styles.groupItemStarImage} />
                            <View style={styles.groupItemStarImage} />
                            <View style={styles.groupItemStarImage} />
                            <View style={styles.groupItemStarImage} />
                            <View style={styles.groupItemStarImage} />
                            <View style={styles.groupItemStarCountContainer}>
                                <Text style={styles.groupItemStarCountText}>(00)</Text>
                            </View>
                        </View>
                        {!fullsize ? null :
                            (<View style={{position:'absolute', width:24, height:24, right:20, top:30,backgroundColor:'#fff', borderWidth:1, borderColor:'black', justifyContent:'center'}}>
                                <Text style={{textAlign:'center'}}>공</Text>
                            </View>)}
                    </View>
            </TouchableOpacity>)
        
    }


}
    
export default Product
const styles = StyleSheet.create({
    groupItem:{
        width:142,
        paddingRight:8
    },
    groupItemImageContainer:{
        width:'100%',
        height:132
    },
    groupItemSubtitleContainer:{
        height:24,
        justifyContent:'center'
    },
    groupItemSubtitleText:{
        fontSize:12
    },
    groupItemTitleContainer:{
        height:18,
        justifyContent:'center'
    },
    groupItemTitleText:{
        fontSize:16
    },
    groupItemCostContainer:{
        height:18,
        flexDirection:'row'
    },
    groupItemCostDiscount:{
        justifyContent:'center',
        paddingRight:5
    },
    groupItemCostDiscountText:{
        fontSize:12,
        color: DISCOUNT_RED
    },
    groupItemCostCurrent:{
        justifyContent:'center',
        paddingRight:5
    },
    groupItemCostCurrentText:{
        fontSize:12
    },
    groupItemCostOriginal:{
        justifyContent:'center'
    },
    groupItemCostOriginalText:{
        fontSize:10,
        textDecorationLine:'line-through'
    },
    groupItemStarContainer:{
        width:'100%',
        height:20,
        flexDirection:'row',
        alignItems:'center'
    },
    groupItemStarImage:{
        width:12,
        height:12,
        backgroundColor:'yellow',
        borderWidth:1,
        borderColor:'gray',
        marginRight:2
    },
    groupItemStarCountContainer:{
        height:'100%',
        justifyContent:'center',
        paddingLeft:3
    },
    groupItemStarCountText:{
        fontSize:11
    },
})

