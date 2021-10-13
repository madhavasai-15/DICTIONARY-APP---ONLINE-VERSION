import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: '',
            lexicalCategory: '',
            examples: [],
            definition: '',
        }
    }

    getWord = async (word) => {
        return fetch(`https://rupinwhitehatjr.github.io/dictionary/${word.toLowerCase()}.json`)
        .then(data => {
            if(data.status === 200){
                return data.json();
            }else {
                return null;
            }
        })
        .then(response => {
            if(response){
                this.setState({
                    word: this.state.text,
                    definition: response.definitions[0].description,
                    lexicalCategory: response.definitions[0].wordtype,
                });
            }else {
                this.setState({
                    word: this.state.text,
                    definition: 'NOT FOUND',
                });
            }
        })
    }

    render(){
        return (
            <View style={styles.body}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                            word: '',
                            lexicalCategory: '',
                            examples: [],
                            definition: '',
                        });
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity 
                    style={styles.searchButton}
                    onPress={() => {
                        this.setState({
                            isSearchPressed: true
                        });
                        this.getWord(this.state.text)
                    }}
                >
                    <Text style={styles.searchText}> Search </Text>
                </TouchableOpacity>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}> Word: {''} </Text>
                    <Text style={{fontSize: 18}}> {this.state.word} </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}> Type: {''} </Text>
                    <Text style={{fontSize: 18}}> {this.state.lexicalCategory} </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}> Definition: {''} </Text>
                    <Text style={{fontSize: 18}}> {this.state.definition} </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex:0.3,
        alignItems:'center',
        justifyContent:'center'
    },  
    inputBox: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
    },
    searchButton: {
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    searchText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    detailsContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsTitle:{
        color: 'orange',
        fontSize: 20,
        fontWeight: 'bold'
    }
})