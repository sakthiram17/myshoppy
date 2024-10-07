import { StyleSheet, Text, View ,Image, Button} from 'react-native'
import React from 'react'
interface BookCardProps{
    name:string,
    price:string,
    image:string,
    isbn13:string,
    onRemove:(isbn13:string)=>void
  }
const BookCard = ({image,name,price,isbn13,onRemove}:BookCardProps) => {
  return (
    <View style={styles.bookCard}>
        <View style={styles.imageContainer}>
        <Image source={{uri:image}} style={styles.image}>
        </Image>
        </View>
      <View style={styles.textContainer}>
        <View style={styles.bookNameContainer}>
        <Text style={styles.bookName}>{name}</Text>
        </View>
        <Text style={styles.Price}>{price}</Text>
        <View style={{margin:8}}>
        <Button title='Remove' color="orangered" onPress={()=>{
            onRemove(isbn13)
        }}></Button>
        </View>
          <Text>Hello World</Text>
        </View>
    
    </View>
  )
}

export default BookCard

const styles = StyleSheet.create({
    imageContainer:{
        flex:1
    },
    image:{
        height:140,
        width:'auto'
    },
    bookCard:{
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"#ccc",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginVertical:24,
        marginHorizontal:1,
        borderRadius:12,
        
        width:'98%',
        height:'auto',
       
        
    },
    bookName:{
        fontWeight:'bold',
        fontSize:24,
        flexWrap:'wrap',
        flexDirection:'row',
        margin:4
    },
    Price:{
        color:'grey',
        fontSize:16,
        margin:4
    },
    textContainer:{
       justifyContent:'space-between',
       flexWrap:'wrap',
       maxWidth:'60%'
        
    },
    bookNameContainer:{
        flexDirection:'row',
        flexWrap:'wrap',

    }
})
