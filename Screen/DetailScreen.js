import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker';

let db;

const DetailScreen = ({ route, navigation }) => {
  const [species, setSpecies] = useState([]);

  if (!route || !route.params || !route.params.item) {
    return <Text>No item found.</Text>;
  }
  useEffect(() => {
    db = SQLite.openDatabase({ name: 'BREEDSNAP.db', createFromLocation: '~BREEDSNAP.db' });
  }, []);
  useEffect(() => {
    // Fetch SPECIES from db
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM SPECIES', [], (tx, results) => {
        let data = [];
        for (let i = 0; i < results.rows.length; ++i) {
          data.push(results.rows.item(i).SNAME);
        }
        setSpecies(data);
      });
    });
  }, []);

  const { item } = route.params;

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedBreed, setEditedBreed] = useState(item.breed);
  const [editedAge, setEditedAge] = useState(item.age);
  const [editedGender, setEditedGender] = useState(item.gender);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE UPET SET PNAME = ?, SNAME = ?, AGE = ?, GENDER = ? WHERE id = ?',
        [editedName, editedBreed, editedAge, editedGender, item.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('저장되었습니다.');
            setEditMode(false);
            console.log('Save button pressed!');
            console.log('Name:', editedName);
            console.log('Breed:', editedBreed);
            console.log('Age:', editedAge);
            console.log('Gender:', editedGender);
          } else {
            Alert.alert('Save failed');
          }
        }
      );
    });
  };
  const handleGoToList = () => {
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이름:</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
          />
        ) : (
          <Text style={styles.value}>{item.name}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>품종:</Text>
        {editMode ? (<Picker
            selectedValue={editedBreed}
            style={styles.input}
            onValueChange={(itemValue) => setEditedBreed(itemValue)}
          >
            {species.map((sname, index) => (
              <Picker.Item key={index} label={sname} value={sname} />
            ))}
          </Picker>
        ) : (
          <Text style={styles.value}>{item.breed}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>나이:</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={editedAge}
            onChangeText={setEditedAge}
          />
        ) : (
          <Text style={styles.value}>{item.age}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>성별:</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={editedGender}
            onChangeText={setEditedGender}
          />
        ) : (
          <Text style={styles.value}>{item.gender}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="목록"
          containerStyle={styles.button}
          onPress={handleGoToList}
        />
        {editMode ? (
          <Button
            title="저장"
            containerStyle={styles.button}
            onPress={handleSave}
          />
        ) : (
          <Button
            title="수정"
            containerStyle={styles.button}
            onPress={handleEdit}
          />
        )}
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  listButton: {
    backgroundColor: 'green', // 목록 버튼의 배경색을 녹색으로 설정
  },
});

export default DetailScreen;