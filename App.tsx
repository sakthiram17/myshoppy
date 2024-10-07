import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import BookCard from './Components/BookCard';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';

interface Books{
  title:string,
  price:string,
  image:string,
  isbn13:string
}
export default function App() {
  const [searchTerm,setSearchTerm] = useState<string>('')
  const [books,setBooks] = useState<Books []>([])
  const [spinner,setSpinner] = useState(false)

  const fetchResultsHandler = async ()=>{
    if(searchTerm==='')
    {
      Alert.alert('Please enter a Search Term')
      return
    }
    let response;
    setSpinner(true)
    try{
      response = await axios.get('https://api.itbook.store/1.0/search/'+searchTerm)
      setBooks(response.data["books"])
      setSpinner(false)
    
    }
    catch(err:any)
    {
      setSpinner(false)
      alert('Cannot Fetch data from server, please try again later')
    }
  }

  const removeBookHandler = (isbn13:string)=>{
    let prev =[...books]
    prev = (prev.filter((book)=>{
      return book.isbn13 !== isbn13
    }))
    setBooks(prev)
    

  }




  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter a word to search'
         style = {styles.textInput}
         value={searchTerm}
         onChangeText={(enteredText)=>{
          setSearchTerm(enteredText)
         }}
        ></TextInput>
        <View style={styles.buttonContainer}>
        <Button title="Search" onPress={fetchResultsHandler}></Button>
        </View>
      </View>
      {spinner?<ActivityIndicator size='large'></ActivityIndicator>:null}
      <View style={styles.cardsContainer}>
        <FlatList
        data={books}
        renderItem={({item})=>{
          return <BookCard name={item.title} image={item.image} price={item.price} isbn13={item.isbn13} onRemove={removeBookHandler}></BookCard>
        }}
        keyExtractor={(books)=>books.isbn13} 
        ></FlatList> 
      
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{
    width:"100%",
    flex:3,
    marginTop:48,
    justifyContent:'center',
    alignItems:'center'
  },
  cardsContainer:{
    flex:14,
    justifyContent:'center',
    alignItems:'center'
  },
  textInput:{
    padding:4,
    paddingHorizontal:12,
    borderColor:'grey',
    borderWidth:1,
    margin:12,
    width:"90%",
    marginVertical:24
  },
  buttonContainer:{
    width:'90%',
  
  }
});
