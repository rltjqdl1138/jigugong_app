import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, Image} from 'react-native'
import * as Linking from 'expo-linking'
import * as Sharing from 'expo-sharing'

const DEFAULT_IMG_SIZE = 132
const WIDTH = Dimensions.get('window').width
const DISCOUNT_RED = '#F13434'

class Product extends Component {
    createUrlLink=(ID)=>{
        const link = Linking.makeUrl('product',{id:ID})
        Sharing.shareAsync(link)
        console.warn(link)
    }
    render(){
        const {size, fullsize, onClick, name, price, thumbnail, rating, id} = this.props
        const percentage = Math.floor(100 * price.sale.raw / price.original.raw)
        const imgSize = size ? size : DEFAULT_IMG_SIZE
        return (
            <TouchableOpacity style={[styles.groupItem, {width: fullsize ? WIDTH : imgSize+10}]}
                disabled={typeof onClick !== 'function'}
                onPress={typeof onClick === 'function' ? ()=>onClick({id}) : ()=>{}} >
                    <View style={[styles.groupItemImageContainer, {height: fullsize ?  WIDTH: imgSize+10 }]}>
                        {thumbnail && thumbnail.url ?(<Image style={styles.groupItemImage} source={{uri: thumbnail.url}}/>) : null}
                    </View>
                    <View style={{padding : fullsize ? 16 : 0}}>
                        <View style={styles.groupItemSubtitleContainer}>
                            <Text style={styles.groupItemSubtitleText}>브랜드명</Text>
                        </View>
                        <View style={styles.groupItemTitleContainer}>
                            <Text style={[styles.groupItemTitleText,{fontSize: 18}]}>{name}</Text>
                        </View>
                        <View style={styles.groupItemCostContainer}>
                            <View style={styles.groupItemCostDiscount}>
                                <Text style={[styles.groupItemCostDiscountText, fullsize ? {fontSize: 18} : null]}>
                                    {`${100 - percentage}%`}
                                </Text>
                            </View>
                            <View style={styles.groupItemCostCurrent}>
                                <Text style={[styles.groupItemCostCurrentText, fullsize ? {fontSize: 18} : null]}>
                                    {price.sale.converted}
                                </Text>
                            </View>
                            <View style={styles.groupItemCostOriginal}>
                                <Text style={[styles.groupItemCostOriginalText, fullsize ? {fontSize: 14} : null]}>
                                    {price.original.converted}
                                </Text>
                            </View>
                        </View>
                        <Rating average={rating.average.raw} count={rating.count.raw}/>
                        {!fullsize ? null :
                            (<TouchableOpacity style={{position:'absolute', width:24, height:24, right:20, top:30,backgroundColor:'#fff', borderWidth:1, borderColor:'black', justifyContent:'center'}}
                                onPress={()=>this.createUrlLink(this.props.id)}>
                                <Text style={{textAlign:'center'}}>공</Text>
                            </TouchableOpacity>)}
                    </View>
            </TouchableOpacity>)
        
    }
}
class Rating extends Component{
    renderFillStars = (num)=>{
        let starList = []
        for(let i=0; i<num; i++)
            starList = [...starList, (<View key={i} style={styles.groupItemStarFillImage}/>)]
        return starList
    }
    renderEmptyStars = (num)=>{
        let starList = []
        for(let i=0; i<num; i++)
            starList = [...starList, (<View key={i} style={styles.groupItemStarEmptyImage}/>)]
        return starList
    }
    renderMiddleStar = (num) =>{
        if(num === 0) return null;
        return (
            <View style={[styles.groupItemStarEmptyImage, {flexDirection:'row'}]}>
                <View style={{backgroundColor:'yellow', flex:num}} />
                <View style={{backgroundColor:'gray', flex:10-num}} />
            </View>
        )
    }
    render(){
        const {average, count} = this.props
        const FillStars = Math.floor(average)
        const EmptyStars = Math.floor(5-average)
        const middleStar = Math.round((average-FillStars)*10)
        return (
            <View style={styles.groupItemStarContainer}>
                {this.renderFillStars(FillStars)}
                {this.renderMiddleStar(middleStar) }
                {this.renderEmptyStars(EmptyStars)}
                <View style={styles.groupItemStarCountContainer}>
                    <Text style={styles.groupItemStarCountText}>{`(${count})`}</Text>
                </View>
            </View>
        )
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
    groupItemImage:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
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
    groupItemStarFillImage:{
        width:12,
        height:12,
        backgroundColor:'yellow',
        borderWidth:1,
        borderColor:'gray',
        marginRight:2
    },
    groupItemStarEmptyImage:{
        width:12,
        height:12,
        backgroundColor:'gray',
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

