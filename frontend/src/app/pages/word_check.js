import { Input } from '@rneui/themed'
import { useStore } from '../../store/spellStore'
import { Button } from 'react-native'
//TODO：背单词的单个单词界面
export default function word_check() {
  const { count, inc } = useStore()
  return (
    <>
      <Input placeholder="BASIC INPUT"></Input>
      {count}
      <Button title={'add'} onPress={inc}></Button>
    </>
  )
}
