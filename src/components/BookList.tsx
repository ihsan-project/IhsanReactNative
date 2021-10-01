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

  useEffect(getData, [user, currPage]);

  const renderFooter = () => (
    // Footer View with Load More button
    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setCurrPage(currPage + 1);
        }}
        // On Click of button load more data
        style={styles.loadMoreBtn}>
        <Text style={styles.btnText}>Load More</Text>
        {loading ? (
          <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
        ) : null}
      </TouchableOpacity>
    </View>
  );

  const displayItem = (item: any) => {
    console.log('Clicked', item);
  };

  const ItemView = ({ item }) => (
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
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default BookList;
