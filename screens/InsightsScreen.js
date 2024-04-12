import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import { SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Image,
    Button,
    TextInput,
    StatusBar,
    ImageBackground,
    Alert,} from 'react-native';

    // this file contains only constants you can create your own file easily 
    // import * as AppConstants from '../CommanUtils/AppConstants';

class PersonalDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            fullNameString:'',
            imageString:'',
            nickNameString:'',
            dateOfBirthString:'',
        }
    }
    handleBackButtonClick=()=>{
        this.props.navigation.goBack();
    }
    handleCreateAccountClick=()=>{

    }

    pickImageButtonClick=()=>{
        Alert.alert('Hello');
    }
    
    render(){
        return(
            
            <SafeAreaView>
            <ScrollView contentContainerStyle={{backgroundColor:'white',width:'100%',height:'100%',flexDirection:'column'}}>
                <View style={{flex: 1,width:'100%',height:'100%', flexDirection: 'column',padding:16,justifyContent:'center', alignItems:'center'}}>
                        {/* Top info container */}
                        <View  style={{flexDirection:'column',alignSelf:'center' }}>
                                <Text style={{fontSize:20}}>
                                    PERSONAL DETAILS
                                </Text>
                        </View>

                        {/* Input fields container */}
                        <View style={{marginTop:10,width:'100%',  flexDirection:'column'}} >

                               {/* profile image container */}
                                <View style={{alignSelf:'center',position:'relative',padding:10}}>
                                            
                                                    <Avatar 
                                                    activeOpacity={0.7}
                                                    rounded title="GA"
                                                    size='xlarge' />

                                                    <View  style={{right:0,bottom:0,position:'absolute'}}>
                                                            <Avatar 
                                                            onPress={()=>this.pickImageButtonClick()}
                                                            activeOpacity={0.7}
                                                            rounded 
                                                            size='medium' />
                                                    </View>    
                                                        
                                </View>

                               <View style={{flexDirection:'column', marginLeft:20,marginRight:20}}>
                                   {/* Firstname fields*/} 
                                        <View style={{marginTop:15}}>
                                            <TextInput
                                                // style={{paddingLeft:16,borderRadius:AppConstants.INPUT_FIELD_CORNER, height:AppConstants.INPUT_FIELD_HEIGHT}}
                                                placeholder="First name"
                                                >
                                            </TextInput>
                                        
                                        </View>


                                        {/* Lastname field */}
                                        <View style={{marginTop:10}}>
                                            <TextInput
                                                // style={{paddingLeft:16,borderRadius:AppConstants.INPUT_FIELD_CORNER, height:AppConstants.INPUT_FIELD_HEIGHT}}
                                                placeholder="Last name">

                                            </TextInput>
                                        </View>

                                        {/* Email field */}
                                        <View style={{marginTop:10}}>
                                            <TextInput
                                                // style={{paddingLeft:16,borderRadius:AppConstants.INPUT_FIELD_CORNER, height:AppConstants.INPUT_FIELD_HEIGHT}}
                                                placeholder="Email">

                                            </TextInput>
                                        </View>

                                        {/* Password field */}
                                        <View style={{marginTop:10}}>
                                            <TextInput
                                                // style={{paddingLeft:16,borderRadius:AppConstants.INPUT_FIELD_CORNER, height:AppConstants.INPUT_FIELD_HEIGHT}}
                                                placeholder="Password">

                                            </TextInput>
                                        </View>

                                        {/* Phone number field */}
                                        <View style={{marginTop:10}}>
                                            <TextInput
                                                keyboardType='phone-pad'
                                                // style={{paddingLeft:16,borderRadius:AppConstants.INPUT_FIELD_CORNER, height:AppConstants.INPUT_FIELD_HEIGHT}}
                                                placeholder="Phone number">

                                            </TextInput>
                                        </View>

                                        {/* Save button */}
                                        {/* <TouchableOpacity 
                                                style={{
                                                marginTop:26,
                                                backgroundColor:'#1565c0',
                                                borderRadius:AppConstants.INPUT_FIELD_CORNER,
                                                alignItems:'center',
                                                justifyContent:'center',height: AppConstants.INPUT_FIELD_HEIGHT}}
                                                >
                                                <Text style={{color:'white'}}>SAVE</Text>
                                        </TouchableOpacity>   */}

                                        {/* Cancel button */}
                                        {/* <TouchableOpacity 
                                                 style={{
                                                    marginTop:8,
                                                    borderWidth:1,
                                                    borderColor:'#1565c0',
                                                    borderRadius:AppConstants.INPUT_FIELD_CORNER,
                                                    alignItems:'center',
                                                    justifyContent:'center',height: AppConstants.INPUT_FIELD_HEIGHT}}
                                                    >
                                                 <Text >CANCEL</Text>
                                        </TouchableOpacity>   */}
                               </View>
                        </View>

                        
                        

                </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}
export default PersonalDetails;