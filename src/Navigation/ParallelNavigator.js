import React, {Component} from 'react'
import {StyleSheet, View, Dimensions, Animated, PanResponder, TouchableOpacity, Text} from 'react-native'
const width = Dimensions.get('window').width

const buildParallelSceneConfig = (children = [])=>{
    const config = []
    children.map( (child, index) =>
        config[index] ={
            animatedValue: new Animated.Value(index * width),
            component: child.props.component,
            config:{} })
            
    return config
}

class ParallelNavigatorWidthSlide extends Component {
    // Component Methods
    constructor(props){
        super(props)
        const sceneConfig = buildParallelSceneConfig(props.children)
        this.state = {
            sceneConfig,
            index:0,
        }
    }
    componentDidMount() { !this.props.handler ? null :
        this.props.registerHandler ? this.props.registerHandler ({
            move:this.handleMove,
            NavigationBox : this.createNavigationBar()
        }) : null
    }
    // Hidden Values
    _panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
        onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
        onPanResponderGrant: () => true,
        onPanResponderMove: (e, gestureState) => this._handleSlide(gestureState.dx),
        onPanResponderRelease: (e, {dx}) => {
            const {index, sceneConfig} = this.state
            if( Math.abs(dx) < 50 )
                this.handleMove(index)
            else if(dx < 0 && index < sceneConfig.length-1)
                this.handleMove(index + 1)
            else if(dx > 0 && index > 0)
                this.handleMove(index - 1)
            else
                this.handleMove(index)
        },
        onPanResponderTerminate: (e, {dx})=>{
            const {index, sceneConfig} = this.state
            if(dx < 0 && index < sceneConfig.length-1)
                this.handleMove(index + 1)
            else if(dx > 0 && index > 0)
                this.handleMove(index - 1)
            else
                this.handleMove(index) 
        }
    })
    _handleSlide = (dx)=>{
        const {sceneConfig} = this.state
        const _index = this.state.index
        sceneConfig.map((item, index)=>Animated.timing(item.animatedValue,{
            toValue: (index-_index)*width + dx,
            duration:1,
            useNativeDriver:true
        }).start())
    }

    // Public Values
    // Need to register
    handleMove = (_index, config)=>{
        const {index, sceneConfig} = this.state
        if(!sceneConfig[index]) return false;
        sceneConfig.map((item, index) => Animated.timing(item.animatedValue,{
            toValue: (index - _index)*width,
            duration:300,
            useNativeDriver:true
        }).start( ()=>{
            this.setState(state=>({...state, index: _index}))
            this.props.indexHandler ? this.props.indexHandler(_index) : null
        }))
    }
    createNavigationBar = ()=>{
        const {sceneConfig, index} = this.state
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                {sceneConfig.map((item, index)=>(
                    <TouchableOpacity style={styles.buttonContainer} key={index} onPress={()=>this.handleMove(index)}>
                        <Text>{index}</Text>
                    </TouchableOpacity>
                ))}
            </View>)
    }
    render(){
        const {sceneConfig}=this.state
        const navigator = { move: this.handleMove }
        const list = sceneConfig.map((item, index)=>{
            const Scene = item.component ? item.component : View;
            return (
                <Animated.View key={index} style={[styles.scene, {transform:[{translateX: item.animatedValue}]}]}
                    {...this._panResponder.panHandlers}>
                    <Scene config={item.config} navigator={navigator} handler={this.props.handler}/>
                </Animated.View> )
        })
        return (
            <View style={styles.container}>
                {list}
            </View>

        )
    }
}


class ParallelNavigatorWidthoutSlide extends Component {
    constructor(props){
        super(props)
        const sceneConfig = buildParallelSceneConfig(props.children)
        this.state = {
            sceneConfig,
            index:0,
        }
    }
    componentDidMount() { !this.props.handler ? null :
        this.props.registerHandler ? this.props.registerHandler ({
            move:this.handleMove,
            NavigationBox : this.createNavigationBar()
        }) : null
    }
    handleMove = (_index, config)=>{
        const {index, sceneConfig} = this.state
        !sceneConfig[index] ? false : this.setState( state=>({...state, index: _index}) )
    }
    createNavigationBar = ()=>{
        const {sceneConfig, index} = this.state
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                {sceneConfig.map((item, index)=>(
                    <TouchableOpacity style={styles.buttonContainer} key={index} onPress={()=>this.handleMove(index)}>
                        <Text>{index}</Text>
                    </TouchableOpacity> ))}
            </View>)
    }
    render(){
        const {sceneConfig, index}=this.state
        const navigator = { move: this.handleMove }
        const Scene = sceneConfig[index].component ? sceneConfig[index].component : View
        return (
            <View style={styles.container}>
                <Scene config={sceneConfig[index].config} navigator={navigator} handler={this.props.handler}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
        height:'100%'
    },
    scene: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    buttonContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
//        borderRightWidth:1,
//        borderRightColor:'#ddd'
    }
})

export default ( useSlide=true ) => useSlide ? ParallelNavigatorWidthSlide : ParallelNavigatorWidthoutSlide
