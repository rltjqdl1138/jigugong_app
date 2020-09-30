import React, {Component} from 'react'
import {StyleSheet, View, Dimensions, Animated} from 'react-native'
const {width} = Dimensions.get('window')

const buildSceneConfig = (children = [])=>{
    const config = {}
    children.forEach( child => config[child.props.name] = {
        key: child.props.name,
        component: child.props.component,
        config: {}
    })
    return config
}

export default class Navigator extends Component {
    constructor(props){
        super(props)
        const sceneConfig = buildSceneConfig(props.children)
        const initialSceneName = props.children[0].props.name
        this.state = {
            sceneConfig,
            stack: [sceneConfig[initialSceneName]],
        }
    }
    componentDidMount(){
        this.props.registerHandler ? this.props.registerHandler({
            push: this.handlePush,
            pop: this.handlePop
        }) : null
    }

    // Hidden Values
    _animatedValue = new Animated.Value(0)
    _findScene = (sceneName)=>this.state.stack.findIndex( (element) => element['key'] === sceneName ) 
    _handleChange = (field, text) => this.setState({ [field]:text} )

    // Public Values
    handlePush = (sceneName, config) =>{
        const { stack, sceneConfig } = this.state
        if(!sceneConfig[sceneName])
            return false;

        const index = this._findScene(sceneName)
        const newConfig = sceneConfig;
        newConfig[sceneName].config = config ? config : {}

        switch(index){
            // New Scene
            // Add Scnen
            case -1:
                return this.setState(state => ({
                    sceneConfig: newConfig,
                    stack: [...stack, state.sceneConfig[sceneName]]
                }),()=>{
                    this._animatedValue.setValue(width)
                    Animated.timing(this._animatedValue,{
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    }).start()
                })

            // Top Scene
            // Change config
            case stack.length-1:
                return this.setState(state => ({
                    ...state,
                    sceneConfig: newConfig
                }))

            // Middle Scene
            // Pop up and change config
            default:
                return this.setState(state => ({
                    sceneConfig: newConfig,
                    stack: [ ...state.stack.slice(0,index), ...state.stack.slice(index+1, state.stack.length), newConfig[sceneName] ]
                }),()=>{
                    this._animatedValue.setValue(width)
                    Animated.timing(this._animatedValue,{
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    }).start()
                })
        }
    }
    handlePop = (sceneName, newSceneName) =>{
        const { stack, sceneConfig } = this.state
        if( stack.length === 1)
            return false;
        else if(typeof sceneName === 'string' && !sceneConfig[sceneName])
            return false

        const lastItem = stack[stack.length-1]
        const ind = sceneName ? this._findScene(sceneName) : -1
        let middleStack = []

        switch(ind){
            case stack.length-1:
                middleStack = [...stack]
                break;
            case -1:
            case 0:
                middleStack = [stack[0], lastItem]
                this.setState(state=>({ ...state, stack: middleStack }))
                break;
            default:
                middleStack = [...stack.slice(0,ind), lastItem]
                this.setState(state=>({ ...state, stack: middleStack }))
        }

        Animated.timing(this._animatedValue,{
            toValue: width,
            duration: 200,
            useNativeDriver: true
        }).start(()=>{
            this._animatedValue.setValue(0)
            this.setState(state =>({
                ...state,
                stack: middleStack.slice(0, middleStack.length-1)
            }), () => newSceneName ? this.handlePush(newSceneName) : null)
        })
    }

    render(){
        return (
            <View style={styles.container}>
                {this.state.stack && this.state.stack.length > 0 ?
                    this.state.stack.map((scene, index)=>{
                        const CurrentScene = scene.component
                        const sceneStyles = [styles.scene]

                        if(index === this.state.stack.length -1 && index > 0)
                            sceneStyles.push({ transform:[ {translateX: this._animatedValue} ] })

                        return (
                            <Animated.View key={scene.key} style={[sceneStyles]}>
                                <CurrentScene
                                    navigator={{push:this.handlePush, pop:this.handlePop}}
                                    config={scene.config}
                                    auth={this.props.auth}
                                    handler={this.props.handler}
                                />
                            </Animated.View>
                        )
                    }): null}
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
    }
})