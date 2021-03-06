import React,{useState, useEffect} from 'react'
import {  View, Text, StyleSheet, FlatList, TouchableOpacity,ScrollView,
   TextInput, Dimensions, Image, SafeAreaView, Modal, Alert} from 'react-native'
import colors from '../assets/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import {Logout} from '../store/actions'
import Header from '../components/Header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/Api';
import ChangePass from './ChangPass'

export default function MyAccountScreen({navigation,route}) {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([])
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const[errorPassword, setErrorPassword] = useState('')
  const dispatch = useDispatch();
  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  };
  const onShowModal = () => {
    setModalShow(!modalShow);
  };
  const getData = async () => {
    const id = await AsyncStorage.getItem('idAccount');
    getEmailPassWordAccount(id)
    console.log(data);
    // console.log(id);
    
  };
  const getAccount = async () => {
    AsyncStorage.setItem('idAccount', JSON.stringify({}));
  };
  const getData1 = async () => {
    AsyncStorage.setItem('listCart', JSON.stringify({}));
  };
  useEffect(() => { 
    getData()
    }, [])
  function getEmailPassWordAccount(id) {
    Api.get(`get/account/${id}`)
        .then(async function (response) {
          // console.log(response.data, '=============123456================')
          setData(response.data);
        })
        .catch(function (error) {
            console.log(error)
        })
  }
  function UpdateAccount(requestPayload) {
    Api.put(`put/accountpass/${data[0].ID_Account}`,requestPayload)
        .then(async function (response) {
          console.log(response.data, '=============================')
          setData(response.data);
        })
        .catch(function (error) {
            console.log(error)
        })
  }

  
  const onChangePass = (password) => {
    setPassword(password)
    if(password === data[0].Password){
      setErrorPassword('')
    }else{
      setErrorPassword('M????t kh????u kh??ng ??u??ng')
    }
  }
  const onChangePass1 = (password1) => {
    setPassword1(password1)
  }
  const onChangePass2 = (password2) => {
    setPassword2(password2)
  }
 
  

  const handleSubmit = () => {   
    
    if(password1===password2){
      const newPass = {
        Password : password1
      }
      UpdateAccount(newPass) 
      setModalShow(!modalShow);
    }else{
      Alert.alert('L????i','sai')
    }
    
  }

  let renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={{flex: 1}}>
            <View style={{
              flexDirection:'column'
            }}>
              <Text style={{fontSize:24,fontWeight:'bold', textAlign:'center', color:'black'}}>Qua??n ly?? ta??i khoa??n</Text>
              <TouchableOpacity style={{
                flexDirection:'row',
                justifyContent:'space-between',
                marginVertical:30,
                marginHorizontal:10
              }}
              onPress={()=>{
                // navigation.navigate('LoginWelcome')
                dispatch(Logout())
                getAccount()
                getData1()
              }}
              >
                <Ionicons name='log-out-outline' size={30} style={{color:'black'}}/>
                <View style={{
                  marginHorizontal:10,
                 
                }}>
                  <Text style={{fontWeight:'bold', fontSize:18, color:'black'}}>????ng xu????t</Text>
                  <Text style={{color:'black'}} >You will not be able to user VNKfood services</Text>
                  <Text style={{color:'black'}}>unless you login again</Text>
                </View>
                <Ionicons name='chevron-forward' size={30} style={{marginTop:20}}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onShowHideModal}
                style={{
                  borderWidth:1,
                  borderRadius:10,
                  alignSelf:'center'
                }}>
                <Text style={{fontSize:18, fontWeight:'bold',color:colors.buttons,padding:5}}>{'CLOSE'}</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </Modal>
    );
  };
  // let renderDMK = () => {
  //   return (
  //     <Modal animationType="slide" transparent={false} visible={modalShow}>
  //       <SafeAreaView style={{flex: 1}}>
  //           <View style={{
  //             flexDirection:'column'
  //           }}>
  //             <Text style={{fontSize:24,fontWeight:'bold', textAlign:'center', color:'black'}}>??????i m????t kh????u</Text>
  //             <View>
  //               <View style={{marginHorizontal:10,marginTop:10}}>
  //                 <Text style={{color:'black'}}>M????t kh????u hi????n ta??i:</Text>
  //                 <TextInput
  //                   placeholder="Nh????p m????t kh????u hi????n ta??i"
  //                   style={{
  //                     flexDirection: 'row',
  //                     borderBottomWidth: 2,
  //                     borderBottomColor:'skyblue',
  //                     borderColor: colors.grey4,
  //                     height: 48,
  //                   }}
  //                   autoFocus={true}
  //                   onChangeText={onChangePass}
  //                   value={password}
  //                 />
  //                 <Text style={{fontSize:12,color:'red'}}>
  //                   {errorPassword}
  //                   </Text>
  //               </View>
  //               <View style={{margin:10}}>
  //                 <Text style={{color:'black'}}>M????t kh????u m????i:</Text>
  //                 <TextInput
  //                   placeholder="Nh????p m????t kh????u m????i"
  //                   style={{
  //                     flexDirection: 'row',
  //                     borderBottomWidth: 2,
  //                     borderBottomColor:'skyblue',
  //                     borderColor: colors.grey4,
  //                     height: 48,
  //                   }}
  //                   autoFocus={false}
  //                   onChangeText={onChangePass1}
  //                   value={password1}
  //                 />
  //                 <TextInput
  //                   placeholder="Nh????p la??i m????t kh????u m????i"
  //                   style={{
  //                     flexDirection: 'row',
  //                     borderBottomWidth: 2,
  //                     borderBottomColor:'skyblue',
  //                     borderColor: colors.grey4,
  //                     height: 48,
  //                   }}
  //                   autoFocus={false}
  //                   onChangeText={onChangePass2}
  //                   value={password2}
  //                 />
  //               </View>
  //             </View>
  //             <TouchableOpacity
  //               onPress={handleSubmit}
  //               style={{
  //                 borderWidth:1,
  //                 borderRadius:10,
  //                 alignSelf:'center'
  //               }}>
  //               <Text style={{fontSize:18, fontWeight:'bold',color:colors.buttons,padding:5}}>{'C????p Nh????t'}</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               onPress={onShowModal}
  //               style={{
  //                 borderWidth:1,
  //                 borderRadius:10,
  //                 alignSelf:'center'
  //               }}>
  //               <Text style={{fontSize:18, fontWeight:'bold',color:colors.buttons,padding:5}}>{'CLOSE'}</Text>
  //             </TouchableOpacity>
  //           </View>
  //       </SafeAreaView>
  //     </Modal>
  //   );
  // };

  return (
    <View style={style.container}>
      <Header title={'Ta??i khoa??n'} navigation={navigation} />
      <ScrollView>
        <View style={style.view1}> 
          <Image
              style={style.image}
              source={{uri: 'https://media.istockphoto.com/vectors/user-icon-flat-style-isolated-on-white-background-vector-id1084418050?s=612x612'}}
          />
          <View style={style.view2}>
            <Text style={style.text1}>Vu?? Ngo??c Khi??m</Text>
            <Text style={{color:'black'}}>+84363288017</Text>
            <Text style={{color:'black'}}>vukhiemw24@gmail.com</Text>
          </View>
          <TouchableOpacity
            onPress={()=>{navigation.navigate('MyProfile')}}
            
          >
            <MaterialIcons
              name='create'
              size={30}
              style={{color:'black'}}
            />
          </TouchableOpacity>
        </View>
        <View style={style.view3}>
          <Text style={style.text5} >Ta??i khoa??n</Text>
          <TouchableOpacity style={style.row} onPress={()=>{navigation.navigate('MyOrderScreen')}}>
            <Ionicons name='reader-outline' size={25} style={{color:'black'}}/>
            <Text style={style.text4}>????n ha??ng</Text>
            <Ionicons
              name='chevron-forward' size={25}
              style={{color:'black'}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.row}>
            <Ionicons name='pricetags-outline' size={25} style={{color:'black'}}/>
            <Text style={style.text4}>Khuy????n ma??i</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.row} onPress={()=>{navigation.navigate('MyPaymentScreen')}}>
            <Ionicons
              name='card-outline' size={25} style={{color:'black'}}
            />
            <Text style={style.text4}>Ph????ng th????c thanh toa??n</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.row}>
            <Ionicons name='help-circle' size={25} style={{color:'black'}}/>
            <Text style={style.text4} >Tr???? giu??p & y??u c????u h???? tr????</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.row} onPress={onShowHideModal}>
            <Ionicons name='people' size={25} style={{color:'black'}}/>
            <Text style={style.text4} >Qua??n ly?? ta??i khoa??n</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          {renderModal()}
          <TouchableOpacity style={style.row} 
          onPress={()=>{navigation.navigate('ChangePass')}}
          >
            <Ionicons name='people' size={25} style={{color:'black'}}/>
            <Text style={style.text4} >??????i m????t kh????u</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          {/* {renderDMK()} */}
        </View>
        <View style={style.view3}>
          <Text style={style.text5} >Th??ng tin chung</Text>
          <TouchableOpacity style={style.row}>
            <Ionicons name='shield-checkmark' size={25} style={{color:'black'}}/>
            <Text style={style.text4} >Chi??nh sa??ch ba??o m????t</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.row}      
          >
            <Ionicons name='document-text-outline' size={25} style={{color:'black'}}/>
            <Text style={style.text4} >??i????u khoa??n Di??ch vu??</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.row}>
            <Ionicons name='star' size={25} style={{color:'black'}}/>
            <Text style={style.text4} >??a??nh gia?? ????ng du??ng</Text>
            <Ionicons name='chevron-forward' size={25} style={{color:'black'}}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{backgroundColor:colors.cardbackground, paddingBottom:5, flexDirection:'row', alignItems:'center',justifyContent:'space-between',paddingHorizontal:10}}>
          <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Ionicons name='home' size={26}  color={colors.grey2} />
              <Text style={{color:'black'}}>Trang chu??</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Ionicons name='search' size={26}  color={colors.grey2} />
              <Text style={{color:'black'}}>Ti??m ki????m</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('MyOrderScreen')}>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Ionicons name='list' size={26}  color={colors.grey2} />
              <Text style={{color:'black'}}>????n ha??ng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('MyAccountScreen')}>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Ionicons name='person' size={26}  color={colors.buttons} />
              <Text style={{color:'black',fontWeight:'bold'}}>Ta??i khoa??n</Text>
            </View>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const style=StyleSheet.create({
  container:{
      flex:1,
      marginTop:20,
      backgroundColor:colors.grey5
  },
  image:{
      borderWidth:1,
      borderColor: colors.grey3,
      width:75,
      height:75,
      borderRadius:50,

  },
  view1:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:10,
    marginVertical:10
  },
  view2:{
    flex:1,
    alignItems:'flex-start',
    marginLeft:10
  },
  text1:{
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  text2:{
    fontWeight:'bold',
    fontSize:12,
    color:'black'
  },
  text3:{
    fontSize:15,
    fontWeight:'bold',
    color:'black'
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:10
  },
  view3:{
    marginHorizontal:15,
    marginVertical:15,
    flexDirection:'column',
    
  },
  text4:{
    fontSize:18,
    fontWeight:'bold',
    flex:1,
    marginLeft:20,
    color:'black'
  },
  text5:{
    fontSize:16,
    color:'black'
  },
  
  
})