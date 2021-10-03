import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { makeAPICall } from '../middleware/api';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemStyle: {
    height: 120,
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});
interface Book {
  id: number;
  // eslint-disable-next-line camelcase
  slug_id: string;
  type: number;
  title: string;
}

const BookList: React.FC = () => {
  const user = useSelector((state) => (state as any).auth.user);

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);

  const getData = () => {
    if (!user || currPage === prevPage) {
      return;
    }

    setLoading(true);
    makeAPICall(`books?page=${currPage}`, {}, 'GET', {
      Authorization: user?.access,
    })
      .then((response) => {
        setPrevPage(currPage);
        setDataSource([...dataSource, ...response.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to get books', error);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getData, [user, currPage]);

  const loadMoreBooks = () => {
    setCurrPage(currPage + 1);
  };

  const displayItem = (item: any) => {
    console.log('Clicked', item);
  };

  const ItemView = ({ item }: { item: Book }) => (
    // Flat List Item
    <Text style={styles.itemStyle} onPress={() => displayItem(item)}>
      {item.id}.{item.title}
    </Text>
  );

  const ItemSeparatorView = () => <View style={styles.seperator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreBooks}
      />
    </View>
  );
};

export default BookList;
