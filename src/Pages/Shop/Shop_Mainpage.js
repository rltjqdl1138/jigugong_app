import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Keyboard, ImagePropTypes} from 'react-native'
import Product from './ProductComponent'
import {Clayful} from '../../Network'
const LIGHT_GRAY_COLOR = '#E8E8E8'
const GRAY_COLOR = '#C4C4C4'
const BACKGROUND_GRAY_COLOR = '#F6F6F6'
const TEMP_ITEM_COLOR = '#C4C4C4'
const DARK_GRAY_COLOR = '#828282'

export default class ShopMainpage extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenSearch: false,
            displayedProducts : []
        }
    }
    componentDidMount(){
        this._loadProducts()
    }
    _loadProducts = async()=>{
        const list = await Clayful.getDisplayItems()
        this.handleChange('displayedProducts', list)
    }
    closeSearch = ()=>{
        Keyboard.dismiss()
        this.handleChange('isOpenSearch',false)
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    render(){
        const {navigation} =this.props.handler
        const {isOpenSearch} = this.state
        const categories = this.state.displayedProducts.map( (category, index) =>
            (<Category index={index} size={132} key={index}
                id={category.collectionID}
                title={category.collectionName}
                products={category.products}
                navigator={navigation}
                onClick={(config)=>navigation.push('ShopProductPage', config)}
            />))
        return (
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <View style={styles.searchImageContainer}>
                                <View style={[styles.tempImage, {width:24, height:24}]}>
                                    <Text style={{textAlign:'center'}}>돋</Text>
                                </View>
                            </View>
                            <View style={styles.searchInputContainer}>
                                <TextInput
                                    placeholder="검색"
                                    onFocus={()=>this.handleChange('isOpenSearch', true)}
                                />
                            </View>
                        </View>
                    </View>
                    {isOpenSearch ?
                        (<TouchableOpacity style={styles.cartContainer} onPress={()=>this.closeSearch()}>
                            <Text style={{color:DARK_GRAY_COLOR, fontSize:15}}>취소</Text>
                        </TouchableOpacity>) :
                        (<TouchableOpacity style={styles.cartContainer}>
                            <View style={[styles.tempImage, {width:24, height:24}]}>
                                <Text style={{textAlign:'center'}}>장</Text>
                            </View>
                        </TouchableOpacity>)
                    }
                </View>
                <View style={{flex:1}}>
                    <ScrollView style={styles.mainContainer}>
                        <View style={styles.categoryListContainer}>
                            <View style={styles.categoryListRow}>
                                <TouchableOpacity style={styles.categoryListItem} onPress={()=>navigation.push('ShopCategoryPage',{title:'전체'})}>
                                    <View style={styles.categoryListItemImageContainer}>
                                        <View style={[styles.tempImage, {width:72, height:72, borderRadius:50, backgroundColor:TEMP_ITEM_COLOR}]} />
                                    </View>
                                    <View style={styles.categoryListItemTextContainer}>
                                        <Text style={styles.categoryListItemText}>전체</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryListItem} onPress={()=>navigation.push('ShopCategoryPage',{title:'주방용품'})}>
                                    <View style={styles.categoryListItemImageContainer}>
                                        <View style={[styles.tempImage, {width:72, height:72, borderRadius:50, backgroundColor:TEMP_ITEM_COLOR}]} />
                                    </View>
                                    <View style={styles.categoryListItemTextContainer}>
                                        <Text style={styles.categoryListItemText}>주방용품</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.categoryListItem} onPress={()=>navigation.push('ShopCategoryPage',{title:'욕실용품'})}>
                                    <View style={styles.categoryListItemImageContainer}>
                                        <View style={[styles.tempImage, {width:72, height:72, borderRadius:50, backgroundColor:TEMP_ITEM_COLOR}]} />
                                    </View>
                                    <View style={styles.categoryListItemTextContainer}>
                                        <Text style={styles.categoryListItemText}>욕실용품</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.categoryListRow}>
                                <TouchableOpacity style={styles.categoryListItem} onPress={()=>navigation.push('ShopCategoryPage',{title:'사무용품'})}>
                                    <View style={styles.categoryListItemImageContainer}>
                                        <View style={[styles.tempImage, {width:72, height:72, borderRadius:50, backgroundColor:TEMP_ITEM_COLOR}]} />
                                    </View>
                                    <View style={styles.categoryListItemTextContainer}>
                                        <Text style={styles.categoryListItemText}>사무용품</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryListItem} onPress={()=>navigation.push('ShopCategoryPage',{title:'리빙용품'})}>
                                    <View style={styles.categoryListItemImageContainer}>
                                        <View style={[styles.tempImage, {width:72, height:72, borderRadius:50, backgroundColor:TEMP_ITEM_COLOR}]} />
                                    </View>
                                    <View style={styles.categoryListItemTextContainer}>
                                        <Text style={styles.categoryListItemText}>리빙용품</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.categoryListItem} onPress={()=>navigation.push('ShopCategoryPage',{title:'유아용품'})}>
                                    <View style={styles.categoryListItemImageContainer}>
                                        <View style={[styles.tempImage, {width:72, height:72, borderRadius:50, backgroundColor:TEMP_ITEM_COLOR}]} />
                                    </View>
                                    <View style={styles.categoryListItemTextContainer}>
                                        <Text style={styles.categoryListItemText}>유아용품</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.eventBanner}>
                            <View style={styles.eventBannerImageContainer}>

                            </View>
                            <View style={styles.eventBannerTextContainer}>
                                <Text style={styles.eventBannerText}>이벤트 명</Text>
                            </View>
                        </View>
                        {categories}
                        <View style={{height:84}} />
                    </ScrollView>
                    {!isOpenSearch ? null :
                        (<View style={{width:'100%', height:'100%', position:'absolute', backgroundColor:'#fff'}}>
                            <View style={{padding:10}}>
                                <Text style={{fontSize:16}}>최근 검색어</Text>
                            </View>
                            <View style={{width:'100%', height:40, flexDirection:'row', paddingTop:5, paddingBottom:5}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{width:10}}/>
                                    <View style={styles.keywordItem}>
                                        <Text>검색어</Text>
                                        <View style={{borderRadius:5, paddingLeft:5, paddingRight:5}}>
                                            <Text>X</Text>
                                        </View>
                                    </View>
                                    <View style={styles.keywordItem}>
                                        <Text>검색어2222</Text>
                                        <View style={{borderRadius:5, paddingLeft:5, paddingRight:5}}>
                                            <Text>X</Text>
                                        </View>
                                    </View>
                                    <View style={styles.keywordItem}>
                                        <Text>검색어33</Text>
                                        <View style={{borderRadius:5, paddingLeft:5, paddingRight:5}}>
                                            <Text>X</Text>
                                        </View>
                                    </View>
                                    <View style={styles.keywordItem}>
                                        <Text>검색어444</Text>
                                        <View style={{borderRadius:5, paddingLeft:5, paddingRight:5}}>
                                            <Text>X</Text>
                                        </View>
                                    </View>

                                    <View style={styles.keywordItem}>
                                        <Text>검색어55</Text>
                                        <View style={{borderRadius:5, paddingLeft:5}}>
                                            <Text>X</Text>
                                        </View>
                                    </View>
                                    <View style={styles.keywordItem}>
                                        <Text>검색어6666</Text>
                                        <View style={{borderRadius:5, paddingLeft:5}}>
                                            <Text>X</Text>
                                        </View>
                                    </View>
                                    <View style={{width:10}}/>
                                </ScrollView>
                            </View>
                        </View>)}
                </View>
            </View>
        )
    }
}
const Category = (props)=>(
    <View style={[styles.groupContainer, { height: props.size ? props.size + 145 : null, backgroundColor: props.index%2 === 0 ? BACKGROUND_GRAY_COLOR : '#fff'}]}>
        <View style={styles.groupHeader}>
            <View style={styles.groupHeaderTitleContainer}>
                <Text style={styles.groupHeaderTitle}>
                    {props && props.title ? props.title : '카테고리' }
                </Text>
            </View>

            <TouchableOpacity style={styles.groupHeaderOptionContainer}
                onPress={()=>props.navigator.push('ShopCategoryPage', {id:props.id, title:props.title})}>
                <Text style={styles.groupHeaderOption}>
                    전체보기
                </Text>
            </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:16}}/>
            {props.products.map(product=>(
                <Product size={props.size} onClick={props.onClick}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    thumbnail={product.thumbnail}
                    rating={product.rating}
                    //shipping
                />
            ))}
            <View style={{width:8}}/>
        </ScrollView>
    </View>
)
const styles = StyleSheet.create({
    tempImage:{
        backgroundColor:'white', justifyContent:'center', alignItems:'center'
    },
    container:{
        width:'100%',
        height:'100%'
    },
    headerContainer:{
        height:52,
        width:'100%',
        flexDirection:'row',
        backgroundColor:LIGHT_GRAY_COLOR
    },
    searchContainer:{
        flex:1,
        padding:10,
        paddingLeft:16,
    },
    searchBox:{
        flex:1,
        borderRadius:5,
        backgroundColor: GRAY_COLOR,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10
    },
    searchImageContainer:{
        height:32,
        width:32,
        justifyContent:'center',
        alignItems:'center'
    },
    searchInputContainer:{
        flex:1,
        paddingLeft:10,
        paddingRight:10
    },
    cartContainer:{
        height:'100%',
        width:50,
        paddingRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
    mainContainer:{
        flex:1
    },
    categoryListContainer:{
        height:250,
        width:'100%',
        paddingLeft:20,
        paddingRight:20
    },
    categoryListRow:{
        flex:1,
        flexDirection:'row',
    },
    categoryListItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    categoryListItemImageContainer:{
        height:72,
        width:72
    },
    categoryListItemTextContainer:{
        height:30,
        width:'100%',
        justifyContent:'center'
    },
    categoryListItemText:{
        textAlign:'center'
    },
    groupContainer:{
        width:'100%',
        height:275,
    },
    groupHeader:{
        height:50,
        width:'100%',
        flexDirection:'row',
        alignItems:'center'
    },
    groupHeaderTitleContainer:{
        flex:1,
        paddingLeft:16
    },
    groupHeaderTitle:{
        fontSize:18
    },
    groupHeaderOptionContainer:{
        width:100
    },
    groupHeaderOption:{

    },
    eventBanner:{
        width:'100%',
        height:240
    },
    eventBannerImageContainer:{
        width:'100%',
        height:168,
        backgroundColor:'green'
    },
    eventBannerTextContainer:{
        flex:1,
        paddingTop:10,
        paddingLeft:16
    },
    eventBannerText:{
        fontSize:18
    },
    keywordItem:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:15,
        flexDirection:'row',
        padding:5,
        paddingLeft:16,
        paddingRight:16,
        marginLeft:5,
        marginRight:5,
        flexWrap: 'wrap'
    }
})