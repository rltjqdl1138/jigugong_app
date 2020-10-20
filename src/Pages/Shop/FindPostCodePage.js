import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native'
import { WebView } from 'react-native-webview';
import { Shop } from '../../Network'

const FIND_POST_CODE_URL = '/html'

export default class FindPostCodePage extends Component {
    componentDidMount(){
        if(!this.props.config || !this.props.config.handler)
            this.props.navigator.pop('FindPostCodePage')
    }
    render() {
        return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <TouchableOpacity style={{width:'100%', height:40, backgroundColor:'red'}} onPress={()=>this.props.navigator.pop('FindPostCodePage')} />
            <View style={{flex:1}}>
                    <WebView source={{ uri: `${Shop.domain}${FIND_POST_CODE_URL}` }} style={{ marginTop: 20 }}
                        onMessage={(event) => {
                            const data = JSON.parse(event.nativeEvent.data)
                            this.props.config.handler({...data, editable:false})
                            this.props.navigator.pop('FindPostCodePage')
                        }}/>
            </View>
        </View>)
    }
  }