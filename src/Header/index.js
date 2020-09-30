import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
const HEADER_SIZE = 55
exports.MainHeader = class MainHeader extends Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.leftBoxContainer}>
                    <TouchableOpacity>
                        
                    </TouchableOpacity>
                </View>
                <View style={styles.middleBoxContainer}>
                    <Text style={{fontSize:20}}>
                        지구공
                    </Text>
                </View>
                <View style={styles.rightBoxContainer}>
                    <TouchableOpacity style={{flex:1}} onPress={this.props.openMenu}>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
exports.SimpleHeader = class SimpleHeader extends Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.leftBoxContainer}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                        onPress={this.props.handlePop}>
                        <Text style={{fontSize:20}}>{`<`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middleBoxContainer}>
                    <Text style={{fontSize:20}}>
                        {this.props.title ? this.props.title : ''}
                    </Text>
                </View>
                <View style={styles.rightBoxContainer}>
                    
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height: HEADER_SIZE,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    leftBoxContainer:{
        width:55,
    },
    middleBoxContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    rightBoxContainer:{
        width:55
    }
})
