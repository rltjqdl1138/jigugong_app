import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Animated} from 'react-native'
import Product from './ProductComponent'
const WIDTH = Dimensions.get('window').width
const HEADER_SIZE = 52
const LIGHT_GRAY_COLOR = '#E8E8E8'
const GRAY_COLOR = '#C4C4C4'
export default class ShopCategorypage extends Component{
    constructor(props){
        super()
        this.state={
            position0:0,
            position1:0,
            position2:0,
            position3:0,
            page:0
        }
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    _animatedValue = new Animated.Value(0)
    _onScroll = (event) => {
        const {position0, position1, position2, position3, page} = this.state
        const {y} = event.nativeEvent.contentOffset
        if(y < position0)
            return page===0 ? null : this._handlePage(0)
        else if(y < position1)
            return page===1 ? null : this._handlePage(1)
        else if(y < position2)
            return page===2 ? null : this._handlePage(2)
        else if(y < position3)
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
    render(){
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

                        <Product fullsize={true}/>

                        <View style={styles.stickyHeaderContainer}>
                            <View style={{ flex:1, flexDirection:'row'}}>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.state.position0})}>
                                    <Text>상품설명</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.state.position1})}>
                                    <Text>상품후기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.state.position2})}>
                                    <Text>상품문의</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.stickyHeaderItem} onPress={()=>this.myScroll.scrollTo({y:this.state.position3})}>
                                    <Text>배송/환불</Text>
                                </TouchableOpacity>
                            </View>
                            <Animated.View style={[styles.stickyHeaderAnimeContainer, {transform:[{translateX: this._animatedValue}]}]}>
                                <View style={styles.stickyHeaderAnimeItem}/>
                            </Animated.View>
                        </View>

                        <View style={{height:800, width:'100%', backgroundColor:'white'}} onLayout={({nativeEvent})=>{this.handleChange('position0',nativeEvent.layout.y - 40)}}/>
                        <View style={{height:0}} onLayout={({nativeEvent})=>{this.handleChange('position1',nativeEvent.layout.y - 40)}}/>

                        <ProductReview />

                        <View style={{height:800, width:'100%', backgroundColor:'green'}} onLayout={({nativeEvent})=>{this.handleChange('position2',nativeEvent.layout.y - 40)}}/>
                        <View style={{height:1500, width:'100%', backgroundColor:'red'}} onLayout={({nativeEvent})=>{this.handleChange('position3',nativeEvent.layout.y - 40)}}/>

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
                        <TouchableOpacity style={styles.quickPurchaseButton}>
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
    }
})


class ProductReview extends Component{
    constructor(props){
        super()
        this.state={
            navigator:'left'
        }
    }
    handleChange = (field, text) => this.setState({ [field]:text} )
    render(){
        const {navigator} = this.state
        const styles = reviewStyles
        return (
            <View style={styles.container}>
                <View style={styles.informContainer}>
                    <Text style={styles.informText}>{`텍스트 후기 ${'00'}지구자원 / 사진후기 ${'00'}지구자원 지급`}</Text>
                </View>
                <View style={styles.writeButtonContainer}>
                    <TouchableOpacity style={styles.writeButton}>
                        <Text style={styles.writeButtonText}>후기 작성하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linePadding} />
                <View style={styles.starsContainer}>
                    <View style={styles.starsInfoContainer}>

                        <View style={styles.starsTextContainer}>
                            <Text>
                                000건의 후기
                            </Text>
                        </View>
                        <View style={styles.starsScoreContainer}>
                            <Text style={styles.starsScoreText}>4.5</Text>
                        </View>
                        <View style={styles.starsRankContainer}>
                            <View style={styles.starsRankImage} />
                            <View style={styles.starsRankImage} />
                            <View style={styles.starsRankImage} />
                            <View style={styles.starsRankImage} />
                            <View style={styles.starsRankImage} />
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
                            <View style={{backgroundColor:'red', borderWidth:1, borderColor:'black', width:WIDTH-32}}>
                               
                            </View>
                            <View style={{backgroundColor:'blue', borderWidth:1, borderColor:'black', width:WIDTH-32}}>

                            </View>
                            <View style={{backgroundColor:'green', borderWidth:1, borderColor:'black', width:WIDTH-32}}>

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