import { Text, ScrollView, StyleSheet, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@rneui/themed'
import { useStore } from '../../store/spellStore'

export default function FavScreen() {
  const { count, inc } = useStore()
  return (
    <SafeAreaView>
      <Input
        placeholder=""
        containerStyle={{ width: 50 }}
        inputStyle={{ fontSize: 30, fontWeight: 'bold' }}
      ></Input>
      <Input placeholder="BASIC INPUT"></Input>
      <Text>{count}</Text>
      <Button title={'add'} onPress={inc}></Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 200,
  },
})
