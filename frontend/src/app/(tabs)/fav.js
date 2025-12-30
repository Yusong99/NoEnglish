import { Text, ScrollView, StyleSheet, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@rneui/themed'
import { useStore } from '../../store/spellStore'
import { useState } from 'react'
import api from '../../utils/api'

export default function FavScreen() {
  const { wordsList, freshWordsList } = useStore()
  const getWords = async () => {
    await api
      .get('/api/vocab/random', {
        params: {
          level: 'N2',
        },
      })
      .then((response) => {
        freshWordsList(response.data.data)
      })
  }
  const { test, setTest } = useState(['a', 'b', 'c'])
  const renderItem = () => {
    return <Text>1</Text>
  }
  return (
    <SafeAreaView>
      <Input
        placeholder=""
        containerStyle={{ width: 50 }}
        inputStyle={{ fontSize: 30, fontWeight: 'bold' }}
      ></Input>
      <Input placeholder="BASIC INPUT"></Input>
      <FlatList data={test} renderItem={renderItem} />
      <Text>{JSON.stringify(wordsList)}</Text>
      <Button title={'点击'} onPress={getWords}></Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 200,
  },
})
