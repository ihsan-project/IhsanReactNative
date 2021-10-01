import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  itemStyle: {
    height: 44,
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

const BookList: React.FC = () => {
  const user = useSelector((state) => (state as any).auth.user);

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    if (!user) {
      return;
    }

    setLoading(true);
    makeAPICall(`books?page=${page}`, {}, 'GET', {
      Authorization: user?.access,
    })
      .then((response) => {
        setPage(page + 1);

        setDataSource([...dataSource, ...response.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to get books', error);
      });
  };

  useEffect(getData, [user]);

  const renderFooter = () => (
    // Footer View with Load More button
    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={getData}
        // On Click of button load more data
        style={styles.loadMoreBtn}>
        <Text style={styles.btnText}>Load More</Text>
        {loading ? (
          <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
        ) : null}
      </TouchableOpacity>
    </View>
  );

  const ItemView = ({ item }) => (
    // Flat List Item
    <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      {item.id}.{item.title.toUpperCase()}
    </Text>
  );

  const ItemSeparatorView = () => <View style={styles.seperator} />;

  const getItem = (item: any) => {
    console.log('Clicked', item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        enableEmptySections={true}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default BookList;
