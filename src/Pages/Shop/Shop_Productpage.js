import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Animated, Image} from 'react-native'
import Product, {Rating} from './ProductComponent'
import {Clayful} from '../../Network'
const WIDTH = Dimensions.get('window').width
const HEADER_SIZE = 52
const LIGHT_GRAY_COLOR = '#E8E8E8'
const GRAY_COLOR = '#C4C4C4'
const IMAGE = require('../../../assets/product.jpg')
export default class ShopCategorypage extends Component{
    constructor(props){
        super()
        this.state={
            product:{},
            catalogSizes:[],
            isLoaded:false,
            page:0
        }
    }
    componentDidMount(){
        this._loadProductInfo()
    }
    positions = [0,0,0,0]
    handleChange = (field, text) => this.setState({ [field]:text} )
    _loadProductInfo = async ()=>{
        const productInfo = await Clayful.getProductByID(this.props.config.id)
        this.handleChange('product', productInfo)
        const sizePromise = productInfo.catalogs.map(catalog=> catalog.image&&catalog.image.url ?this._calculateCatalogSize(catalog.image.url) : {width:0, height:0})
        const result = await Promise.all(sizePromise)
        this.handleChange('catalogSizes', result)
    }
    _calculateCatalogSize = (url) => new Promise((resolve, reject)=>
        Image.getSize(url,
            (width, height)=>resolve({width, height},
            (error)=>resolve({width:0, height:0}))
        ))
    _animatedValue = new Animated.Value(0)
    _onScroll = (event) => {
        const { page } = this.state
        const {y} = event.nativeEvent.contentOffset
        if(y < this.positions[0])
            return page===0 ? null : this._handlePage(0)
        else if(y < this.positions[1])
            return page===1 ? null : this._handlePage(1)
        else if(y < this.positions[2])
            return page===2 ? null : this._handlePage(2)
        else if(y < this.positions[3])
            return page===3 ? null : this._handlePage(3)
        return page===4 ? null : this._handlePage(4)
    }
    _handlePage = (page)=>{
        this.handleChange('page', page)
        Animated.timing(this._animatedValue, {
            toValue: (page-1) * WIDTH/4,
            duration: 150,
            useNativeDriver:true
        }).start()
    }
    getInfoStyle=(index)=>{
        const {catalogSizes} = this.state
        const size = catalogSizes[index]
        if(!size || !size.width || !size.height)
            return {width:0, height:0}
        const scale = WIDTH / size.width
        return {width: WIDTH, height:size.height * scale}
    }
    render(){
        const {product} = this.state
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeftBoxContainer}>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>this.props.navigator.pop('ShopProductPage')}>
                            <Text style={{fontSize:20}}>{`<`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerMiddleBoxContainer}>
                        <Text style={{fontSize:20}}>상품정보</Text>
                    </View>
                    <TouchableOpacity style={styles.headerRightBoxContainer}>
                        <View style={styles.cartImage}><Text>장</Text></View>
                    </TouchableOpacity>
                </View>


                {/* Main Content */}
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ScrollView style={{width:'100%', height:'100%'}}
                        ref={ ref => this.myScroll = ref }
                        onScroll={this._onScroll}
                        stickyHeaderIndices={[1]} >
                        
                        {product.name ? 
                        (<Product fullsize={true}
                            brand={product.brand}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            thumbnail={product.thumbnail}
                            rating={product.rating}
                            //shipping
                        />) : null}
                        

                        <View style={styles.stickyHeaderContainer}>
                            <View style={{ flex:1, flexDirection:'row'}}>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.positions[0]})}>
                                    <Text>상품설명</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.positions[1]})}>
                                    <Text>상품후기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.positions[2]})}>
                                    <Text>상품문의</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.positions[3]})}>
                                    <Text>배송/환불</Text>
                                </TouchableOpacity>
                            </View>
                            <Animated.View style={[styles.stickyHeaderAnimeContainer, {transform:[{translateX: this._animatedValue}]}]}>
                                <View style={styles.stickyHeaderAnimeItem}/>
                            </Animated.View>
                        </View>

                        <View style={{height:0}} onLayout={({nativeEvent})=>{this.positions[0] = nativeEvent.layout.y - 40}}/>
                        <View style={styles.infoContainer}>
                            {!product.catalogs || !product.catalogs.length ? null :
                                product.catalogs.map((catalog, index)=>{
                                return catalog && catalog.image && catalog.image.url ? (
                                    <Image key={index}
                                        style={[styles.infoImage, this.getInfoStyle(index)]}
                                        source={{uri: catalog.image.url}}
                                />) : null}
                            )}
                        </View>
                        <View style={{height:0}} onLayout={({nativeEvent})=>{this.positions[1] = nativeEvent.layout.y - 40}}/>
                        <ProductReview navigator={this.props.navigator} rating={product.rating} productID={product._id}/>
                        <View style={{height:0}} onLayout={({nativeEvent})=>{this.positions[2] = nativeEvent.layout.y - 40}}/>
                        <ProductAsk navigator={this.props.navigator}/>
                        <View style={{height:1500, width:'100%', backgroundColor:'red'}} onLayout={({nativeEvent})=>{this.positions[3] = nativeEvent.layout.y - 40}}/>

                    </ScrollView>
                </View>

                {/* 하단 Sticky Bar */}
                <View style={styles.stickyBottomContainer}>
                    <TouchableOpacity style={styles.likeContainer}>
                        <View style={styles.likeImage}>
                            <Text style={{textAlign:'center'}}>하트</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.quickPurchaseContainer}>
                        <TouchableOpacity style={styles.quickPurchaseButton} onPress={()=>this.props.navigator.push('PaymentPage')}>
                            <Text style={{fontSize:20, textAlign:'center'}}>구매하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height:24}} />
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
    },

    stickyHeaderContainer:{
        height:40,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'gray',
        backgroundColor:'white'
    },
    stickyHeaderItem:{
        flex:1,
        height:'100%',
        paddingTop:3,
        justifyContent:'center',
        alignItems:'center',
    },
    stickyHeaderAnimeContainer:{
        width:WIDTH/4,
        height:3,
        paddingLeft:3,
        paddingRight:3
    },
    stickyHeaderAnimeItem:{
        height:'100%',
        width:'100%',
        backgroundColor:'black',
    },
    stickyBottomContainer:{
        width:'100%',
        height:64,
        borderWidth:1,
        borderColor:'black',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16
    },
    likeContainer:{
        width:40,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    likeImage:{
        height:32,
        width:32,
        borderWidth:1,
        borderColor:'black',
        justifyContent:'center'
    },
    quickPurchaseContainer:{
        flex:1,
        paddingLeft:15,
        paddingRight:15
    },
    quickPurchaseButton:{
        width:'100%',
        height:40,
        borderRadius:15,
        backgroundColor:GRAY_COLOR,
        justifyContent:'center'
    },
    infoContainer:{
        width:'100%',
        paddingTop:20,
        paddingBottom:20
    },
    infoImage:{
        resizeMode:'contain',
    }
})


class ProductReview extends Component{
    constructor(props){
        super()
        this.state={
            navigator:'left',
            product:{},
            isLoaded:true
        }
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    render(){
        const rating = this.props.rating ? this.props.rating :
            { count:{raw:0}, sum:{raw:0}, average:{raw:0} }
        const {navigator} = this.state
        const styles = reviewStyles
        return (
            <View style={styles.container}>
                <View style={styles.informContainer}>
                    <Text style={styles.informText}>{`텍스트 후기 ${'00'}지구자원 / 사진후기 ${'00'}지구자원 지급`}</Text>
                </View>
                <View style={styles.writeButtonContainer}>
                    <TouchableOpacity style={styles.writeButton}
                        onPress={()=>this.props.navigator.push('SendReviewPage', {productID:this.props.productID})}>
                        <Text style={styles.writeButtonText}>후기 작성하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linePadding} />
                <View style={styles.starsContainer}>
                    <View style={styles.starsInfoContainer}>
                        <View style={styles.starsTextContainer}>
                            <Text>
                                {`${rating.count.raw} 건의 후기`}
                            </Text>
                        </View>
                        <View style={styles.starsScoreContainer}>
                            <Text style={styles.starsScoreText}>{`${Number.parseFloat(rating.average.raw).toFixed(1)}`}</Text>
                        </View>
                        <View style={styles.starsRankContainer}>
                            <Rating average={rating.average.raw} size={30}/>
                        </View>

                    </View>
                </View>
                <View style={styles.reviewNavigatorContainer}>
                    <TouchableOpacity style={[styles.reviewNavigatorButton, {backgroundColor:navigator==='left' ? GRAY_COLOR : LIGHT_GRAY_COLOR}]}
                        onPress={()=>this.handleChange('navigator', 'left')}>
                        <Text style={styles.reviewNavigatorText}>전체 00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reviewNavigatorButton, {backgroundColor:navigator==='right' ? GRAY_COLOR : LIGHT_GRAY_COLOR}]}
                        onPress={()=>this.handleChange('navigator', 'right')}>
                        <Text style={styles.reviewNavigatorText}>사진후기 00</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reviewListContainer}>
                    <ReviewComponent type={true}/>
                    <ReviewComponent type={false}/>
                    <ReviewComponent type={true}/>
                    <ReviewComponent type={true}/>
                    <ReviewComponent type={false}/>
                </View>
            </View>
        )
    }
}

class ReviewComponent extends Component {
    render(){
        const {type} = this.props
        const styles = tempStyle
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}/>
                    </View>
                    <View style={{flex:1, paddingLeft:16}}>
                        <View style={styles.nameContainer}>
                            <Text>김기섭</Text>
                        </View>
                        <View style={styles.rankContainer}>
                            <View style={styles.starsContainer}>
                                <View style={styles.starsImage} />
                                <View style={styles.starsImage} />
                                <View style={styles.starsImage} />
                                <View style={styles.starsImage} />
                                <View style={styles.starsImage} />
                            </View>
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateText}>2020.00.00</Text>
                            </View>
                        </View>
                    </View>
                </View>
                { type ? (
                    <View style={{width:'100%', height:300}}>
                        <ScrollView horizontal={true} pagingEnabled={true} style={{width:'100%', height:'100%'}}>
                            <View style={{backgroundColor:'red', width:WIDTH-32}}>
                               
                            </View>
                            <View style={{backgroundColor:'blue', width:WIDTH-32}}>

                            </View>
                            <View style={{backgroundColor:'green', width:WIDTH-32}}>

                            </View>
                        </ScrollView>
                    </View>
                ) : null}
                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>옵션: 블랙</Text>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.mainText} numberOfLines={3}>
                        상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 상품후기 
                    </Text>
                </View>
            </View>
        )
    }
}
const tempStyle = StyleSheet.create({
    container:{
        paddingTop:10,
        width:'100%',
        paddingBottom:10,
        borderBottomColor:GRAY_COLOR,
        borderBottomWidth:1
    },
    headerContainer:{
        height:45,
        width:'100%',
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        alignItems:'center'
    },
    profileImageContainer:{
        width:35,
        height:35,
    },
    profileImage:{
        width:'100%',
        height:'100%',
        borderRadius:40,
        backgroundColor:LIGHT_GRAY_COLOR
    },
    nameContainer:{
        flex:1
    },
    rankContainer:{
        flex:1,
        flexDirection:'row'
    },
    starsContainer:{
        height:'100%',
        width:80,
        alignItems:'center',
        flexDirection:'row'
    },
    starsImage:{
        width:16,
        height:16,
        borderWidth:1
    },
    dateContainer:{
        flex:1,
        paddingLeft:20,
        justifyContent:'center'
    },
    dateImage:{
        fontSize:9
    },
    optionContainer:{
        paddingTop:5,
        paddingBottom:5
    },
    optionText:{
        fontSize:12
    },
    mainContainer:{
        flex:1
    },
    mainText:{
        fontSize:14
    }

})

const reviewStyles = StyleSheet.create({
    container:{
        width:'100%',
        paddingLeft:16,
        paddingRight:16
    },
    informContainer:{
        height:40,
        backgroundColor:LIGHT_GRAY_COLOR,
        justifyContent:'center'
    },
    informText:{
        textAlign:'center'
    },
    writeButtonContainer:{
        height:65,
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
    },
    writeButton:{
        width:'100%',
        height:'100%',
        borderRadius:10,
        backgroundColor:GRAY_COLOR,
        justifyContent:'center'
    },
    writeButtonText:{
        textAlign:'center'
    },
    linePadding:{
        flex:1,
        height:0,
        borderBottomColor:LIGHT_GRAY_COLOR,
        borderBottomWidth:2
    },
    starsContainer:{
        width:'100%',
        height:160,
        paddingTop:16,
        paddingBottom:16
    },
    starsInfoContainer:{
        width:'100%',
        height:'100%',
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:LIGHT_GRAY_COLOR
    },
    starsTextContainer:{
        paddingTop:10,
        height:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    starsText:{
        fontSize:16
    },
    starsScoreContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    starsScoreText:{
        fontSize:30,
        fontWeight:'bold'
    },
    starsRankContainer:{
        height:30,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingBottom:10
    },
    starsRankImage:{
        width:16,
        height:16,
        borderWidth:1,
        borderColor:'black',
        marginLeft:4,
        marginRight:4
    },
    reviewNavigatorContainer:{
        flexDirection:'row',
        height:35,
        width:'100%',
    },
    reviewNavigatorButton:{
        flex:1,
        backgroundColor:LIGHT_GRAY_COLOR,
        justifyContent:'center'
    },
    reviewNavigatorText:{
        textAlign:'center'
    },
    reviewListContainer:{
        paddingBottom:20
    }
})

class ProductAsk extends Component {
    render(){
        const styles = askStyles
        return (
            <View style={styles.container}>
                <View style={[styles.buttonContainer, styles.borderBottom]}>
                    <TouchableOpacity style={styles.buttonComponent} onPress={()=>this.props.navigator.push('SendAskPage')}>
                        <Text style={{textAlign:'center'}}>상품 문의하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linePadding} />
                <View style={{paddingLeft:16, paddingRight:16}}>
                    <ProductAskComponent type={true} text="질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용"/>
                    <ProductAskComponent type={false}/>

                    <ProductAskComponent type={true} text="질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용질문내용"/>
                </View>
            </View>
        )
    }
}
class ProductAskComponent extends Component {
    render(){
        const styles = askStyles
        const text = this.props.text ? this.props.text : '내용내용 내용'
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', width:'100%'}}>
                    <View style={styles.askHeadContainer}>
                        <Text style={{fontSize:30}}>Q</Text>
                    </View>
                    <View style={styles.askMainContainer}>
                        <View style={styles.askInfoContainer}>
                            <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                                <View style={styles.askInfoNameContainer}>
                                    <Text style={styles.askInfoNameText} numberOfLines={1}>닉네임닉네임닉네임닉</Text>
                                </View>
                                <View style={styles.askInfoDateContainer}>
                                    <Text style={styles.askInfoDateText} numberOfLines={1}>2020.00.00</Text>
                                </View>
                                <View style={styles.askInfoStatusContainer}>
                                    <View style={styles.askInfoStatusImage}>
                                        <Text style={{textAlign:'center'}} >완료</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.askInfoButtonContainer}>
                                <TouchableOpacity style={styles.askInfoButton}>
                                    <Text style={styles.askInfoButtonText}>수정</Text>
                                </TouchableOpacity>
                                <View>
                                    <Text>|</Text>
                                </View>
                                <TouchableOpacity style={styles.askInfoButton}>
                                    <Text style={styles.askInfoButtonText}>삭제</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.askOptionContainer}>
                            <Text style={styles.askOptionText}>옵션: 블랙</Text>
                        </View>
                        <View style={styles.askContentContainer}>
                            <Text style={styles.askContentText}>{text}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', width:'100%'}}>

                    <View style={styles.askHeadContainer}>
                        <Text style={{fontSize:30}}>ㄴ</Text>
                    </View>
                    <View style={styles.askHeadContainer}>
                        <Text style={{fontSize:30}}>A</Text>
                    </View>
                    <View style={styles.askMainContainer}>
                        <View style={[styles.askContentContainer, {paddingLeft:5, paddingRight:5, backgroundColor:LIGHT_GRAY_COLOR}]}>
                            <Text style={styles.askContentText}>답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용답변내용</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.linePadding} />
            </View>
        )
    }
}

const askStyles = StyleSheet.create({
    container:{
        width:'100%',
        paddingTop:20
    },
    buttonContainer:{
        width:'100%',
        height:45,
        justifyContent:'center',
        paddingLeft:16,
        paddingRight:16,
        paddingTop:5,
        paddingBottom:5
    },
    buttonComponent:{
        borderRadius:10,
        width:'100%',
        height:'100%',
        justifyContent:'center',
        backgroundColor:GRAY_COLOR
    },
    borderBotom:{
        borderBottomWidth:1,
        borderBottomColor:GRAY_COLOR
    },
    askContainer:{
        paddingLeft:16,
        paddingRight:16
    },
    askHeadContainer:{
        width:35,
        alignItems:'center',
        paddingRight:5
    },
    askMainContainer:{
        flex:1
    },
    askInfoContainer:{
        height:30,
        flexDirection:'row'
    },
    askInfoNameContainer:{
        flex:1
    },
    askInfoNameText:{
        width:'100%',
        fontSize:10
    },
    askInfoDateContainer:{
        flex:1,
        paddingLeft:5,
        paddingRight:5
    },
    askInfoDateText:{
        width:'100%',
        fontSize:8
    },
    askInfoStatusContainer:{
        width:65,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        paddingBottom:5,
        justifyContent:'center'
    },
    askInfoStatusImage:{
        width:'100%',
        height:'100%',
        backgroundColor:LIGHT_GRAY_COLOR
    },
    askInfoButtonContainer:{
        width:80,
        flexDirection:'row',
        alignItems:'center'
    },
    askInfoButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    askInfoButtonText:{
        fontSize:10,
        textAlign:'center'
    },
    askOptionContainer:{
        paddingTop:4,
        paddingBottom:4
    },
    askOptionText:{
        fontSize:12
    },
    askContentContainer:{
        paddingTop:5,
        paddingBottom:5
    },
    askContentText:{
        fontSize:14
    },

    linePadding:{
        width:'100%',
        height:20,
        borderBottomColor:LIGHT_GRAY_COLOR,
        borderBottomWidth:1
    },
})