import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TextInput, Keyboard} from 'react-native'
import {SimpleHeader} from '../../Header'
import {Clayful} from '../../Network'
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SendReviewPage extends Component{
    constructor(props){
        super()
        this.state = {
            imageList:[],
            reviewText:'',
            keyboardSpaceHeight:0,
            isLoaded:true,
            product:{}
        }
    }
    componentDidMount() {
		this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
        this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
        
        if(!this.props.config.productID || this.props.config.productID === this.state.product._id || !this.state.isLoaded)
            return;
        this.handleChange('isLoaded', false)
        this._loadProductInfo(this.props.config.productID)
	}
	componentWillUnmount() {
		this._keyboardWillShowSubscription.remove();
		this._keyboardWillHideSubscription.remove();
    }
    _loadProductInfo = async (id)=>{
        const productInfo = await Clayful.getProductByID(id)
        this.handleChange('product', productInfo)
        this.handleChange('isLoaded', true)
    }
	_keyboardWillShow = (e)=> this.handleChange('keyboardSpaceHeight', e.endCoordinates.height)
	_keyboardWillHide = (e)=> this.handleChange('keyboardSpaceHeight', 0)
    handleChange = (field, text) => this.setState({ [field]:text} )
    pickImage = async () => {
        const {imageList} = this.state
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1
        });
        result.cancelled ? null :
            this.handleChange('imageList', [...imageList, { width: result.width, height: result.height, uri: result.uri }])
    };
    removeImage = (index)=>{
        const {imageList} = this.state
        if(!index || !imageList.length || !imageList.length <= index)
        this.handleChange('imageList', [...imageList.slice(0,index), ...imageList.slice(index+1, imageList.length)])
    }
    Images=()=>{
        const { imageList } = this.state
        const ImageComponentList = imageList.map((item, index)=>
            ( <View key={item.uri} style={styles.smallImageContainer}>
                <Image source={{uri:item.uri}} style={styles.smallImage} />
                <TouchableOpacity style={styles.deleteButtonContainer} onPress={()=>this.removeImage(index)}>
                    <Text style={{fontSize:8, textAlign:'center', color:'#666'}}>X</Text>
                </TouchableOpacity>
            </View>))
        return (<ScrollView style={{flexDirection:'row'}} horizontal={true}>
                { ImageComponentList }
                { imageList.length < 5 ? (
                <TouchableOpacity style={[styles.smallImageContainer, styles.imageAddButton]} onPress={()=>this.pickImage()}>
                    <View style={{width:30, height:30, backgroundColor:'#C4C4C4', justifyContent:'center', borderRadius:15}}>
                        <Text style={{textAlign:'center', fontSize:20}}>+</Text>
                    </View>
                </TouchableOpacity>) : null}
            </ScrollView>)
    }
    render(){
        return(
            <View style={styles.container}>
                <SimpleHeader title="후기 작성하기" handlePop={()=>this.props.navigator.pop('SendReviewPage')} />
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
                                <Text>{this.state.product.name}</Text>
                            </View>
                            <View style={styles.itemTextContainer}>
                                
                            </View>
                            <View style={styles.itemTextContainer}>
                                <Text>옵션: 블랙</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.rankContainer}>
                        <View style={styles.rankTextContainer}>
                            <Text style={styles.rankText}>별점을 매겨주세요!</Text>
                        </View>
                        <View style={styles.starsContainer}>
                            <View style={styles.starImage} />
                            <View style={styles.starImage} />
                            <View style={styles.starImage} />
                            <View style={styles.starImage} />
                            <View style={styles.starImage} />
                        </View>
                    </View>

                    <View style={styles.photoContainer}>
                        <View style={styles.photoHeadContainer}>
                            <Text>사진첨부</Text>
                            <Text>{`${this.state.imageList.length} / 5`}</Text>
                        </View>
                        <Text>사진 첨부시 00 지구자원 추가 획득!</Text>
                        <View style={styles.photoMainContainer}>
                            {this.Images()}
                        </View>
                    </View>

                    <View style={styles.textInputContainer}>
                        <Text>후기 작성</Text>
                        <View style={styles.textInputComponent}>
                            <TextInput style={styles.textInput} value={this.state.reviewText}
                                onChangeText={text=>this.handleChange('reviewText', text)}
                                multiline={true}
                            />
                            <View style={styles.textLengthContainer}>
                                <Text style={styles.textLengthText}>
                                    <Text style={{color:this.state.reviewText.length < 10 ? 'red':'black'}}>
                                        {this.state.reviewText.length}
                                    </Text>
                                    <Text>
                                        / 1,000
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.noticeContainer}>
                        <TouchableOpacity style={styles.noticeLinkContainer}>
                            <Text>후기 작성시 유의사항</Text>
                        </TouchableOpacity>
                        <Text>을 확인했습니다.</Text>
                    </View>
                    <View style={styles.confirmButtonContainer}>
                        <TouchableOpacity style={[styles.confirmButton, {backgroundColor:'#C4C4C4'}]}>
                            <Text style={{textAlign:'center'}}>확인</Text>
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
    rankContainer:{
        width:'100%',
        height:72,
        backgroundColor:'#F6F6F6'
    },
    rankTextContainer:{
        flex:1,
        justifyContent:'center'
    },
    rankText:{
        textAlign:'center',
        fontSize:20
    },
    starsContainer:{
        flex:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    starImage:{
        width:32,
        height:32,
        marginLeft:2,
        marginRight:2,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'yellow'
    },
    photoContainer:{
        paddingLeft:16,
        paddingRight:16,
        paddingTop:20,
        paddingBottom:20,
        width:'100%',
        height:200
    },
    photoHeadContainer:{
        flexDirection:'row',
        paddingBottom:5
    },
    photoMainContainer:{
        height:102,
        width:'100%',
        paddingTop:10,
        paddingBottom:10
    },
    smallImageContainer:{
        width:82,
        height:82,
        marginLeft:5,
        marginRight:5
    },
    smallImage:{
        position:'absolute',
        top:5,
        left:5,
        width:72,
        height:72,
        resizeMode:'contain'
    },
    deleteButtonContainer:{
        marginLeft:60,
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#F6F6F6',
        justifyContent:'center'
    },
    imageAddButton:{
        borderWidth:1,
        borderColor:'#C4C4C4',
        justifyContent:'center',
        alignItems:'center'
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
    textLengthContainer:{
        paddingRight:10,
        paddingLeft:10
    },
    textLengthText:{
        fontSize:10,
        textAlign:'right'
    },
    noticeContainer:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:16,
        paddingRight:16,
        flexDirection:'row'
    },
    noticeLinkContainer:{
        borderBottomColor:'black',
        borderBottomWidth:1
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