import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = { contacts: [] ,contactList:[],count:0};
  }
  getPhoneNumber = async () => {
     const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
      

        
        for(var i=0;i<data.length;i++){
           var name=data[i].name
           var numbers=data[i].phoneNumbers
           var object=[name,numbers]
           if(name&&numbers){
             this.setState({contacts:[...this.state.contacts,object]})
           }
          
        }
      }
  }
  //For selecting 5 contacts
  saveContacts=(item)=>{
    if(this.state.count<5){
    
    this.setState({
      contactList:[...this.state.contactList,item]
    })
    this.setState({count:this.state.count+1})
    }
    
   
    
  }
  componentDidMount(){
    this.getPhoneNumber()
  }





  render() {
    console.log(this.state.contactList)
    
    return (
      <View style={styles.container}>
       <FlatList
       style={{flex:1}}
       data={this.state.contacts}
       renderItem={({item})=>(
         
         <TouchableOpacity onPress={()=>{this.saveContacts({item})}}
         style={{marginTop:40,alignSelf:'center',borderBottomWidth:2,width:200}}>
         
          <Text style={{alignSelf:'center'}}>{item[0]}</Text>

         {item[1].map((data,index)=>{
            return(
              <Text>{data.number}</Text>
            )
         })}
         </TouchableOpacity>
       )}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
