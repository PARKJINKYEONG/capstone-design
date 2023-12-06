import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const DATA = [
  { id: '1', name: '사진 1', image: 'https://example.com/image2.jpg', category: '개' },
  { id: '2', name: '사진 2', image: 'https://example.com/image2.jpg', category: '고양이' },
  { id: '3', name: '사진 3', image: 'https://example.com/image3.jpg', category: '개' },
  { id: '4', name: '사진 4', image: 'https://example.com/image4.jpg', category: '고양이' },
  { id: '5', name: '사진 5', image: 'https://example.com/image5.jpg', category: '개' },
  { id: '6', name: '사진 6', image: 'https://example.com/image6.jpg', category: '고양이' },
  { id: '7', name: '사진 7', image: 'https://example.com/image6.jpg', category: '고양이' },
  { id: '8', name: '사진 8', image: 'https://example.com/image6.jpg', category: '고양이' },
  { id: '9', name: '사진 9', image: 'https://example.com/image6.jpg', category: '고양이' },
  { id: '10', name: '사진 10', image: 'https://example.com/image6.jpg', category: '고양이' },
];

const ListScreen = ({ route, navigation}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // 초기 데이터 설정
    setData(DATA);
    setFilteredData(DATA);
  }, []);

  useEffect(() => {
    // Add the new item to the existing data
    if (route.params?.newItem) {
      setData(prevData => [route.params.newItem,...prevData ]);
    }
  }, [route.params?.newItem]);

  useEffect(() => {
    // Filter the data based on search text
    const filtered = data.filter(item => {
      const itemName = item.name ? item.name.toLowerCase() : '';
      const itemBreed = item.breed ? item.breed.toLowerCase() : '';
      return itemName.includes(searchText.toLowerCase()) || itemBreed.includes(searchText.toLowerCase());
    });
    setFilteredData(filtered);
  }, [data, searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = DATA.filter((item) => {
      const itemName = item.name ? item.name.toLowerCase() : '';
      const itemCategory = item.category ? item.category.toLowerCase() : '';
      return itemName.includes(text.toLowerCase()) || itemCategory.includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const handleItemPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListScreen;