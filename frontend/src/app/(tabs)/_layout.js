import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function Layout() {
  return (
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#546e7a',
        tabBarInactiveTintColor: '#AAB1B7',
        tabBarStyle: {
          backgroundColor: '#F5F5F5',
          borderTopColor: '#D1D9E6',
          borderTopWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
        <Tabs.Screen name="index"
        options={{
          title: '首页',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}>
        </Tabs.Screen>
        <Tabs.Screen name="fav"
        options={{
          title: '收藏',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}>
        </Tabs.Screen>
        <Tabs.Screen name="recite"
        options={{
          title: '背词',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}>
        </Tabs.Screen>
        <Tabs.Screen name="profile"
        options={{
          title: '个人资料',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}>
        </Tabs.Screen>
      </Tabs>
  )
}
