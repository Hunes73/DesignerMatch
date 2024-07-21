import React, { useState } from 'react'
import { ScrollView, TextInput, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  MediumAvatar,
  Colors,
  ChatLabel,
  ChatImage,
  ChatText,
  ChatIconButton,
  ChatMessages,
  RegularTextInput,
  Line,
  HeaderText,
  AppText,
  AppTextInput
} from '../components/styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { secondary, darkLight, primary, white, black } = Colors

const conversation = [
  {
    who: 'receiver',
    message:
      'Dzień dobry! Widziałem, że poszukujecie artysty do projektu. Czy nadal jesteście zainteresowani współpracą?'
  },
  { who: 'sender', message: 'Tak, nadal szukamy odpowiedniej osoby. Czy możesz przedstawić nam swoje portfolio?' },
  { who: 'receiver', message: 'Oczywiście, przesyłam link do mojego portfolio: www.artysta.com/portfolio' },
  {
    who: 'sender',
    message:
      'Dziękujemy, wygląda świetnie. Czy mógłbyś przygotować wstępną koncepcję projektu i przesłać nam ją na maila?'
  },
  { who: 'receiver', message: 'Jasne, już się za to zabieram. Kiedy potrzebujecie gotowej koncepcji?' },
  { who: 'sender', message: 'Na przyszły tydzień. Czy jesteś w stanie dotrzymać tego terminu?' },
  { who: 'receiver', message: 'Tak, bez problemu. O której dokładnie chcielibyście otrzymać koncepcję?' },
  { who: 'sender', message: 'Najlepiej do końca dnia we wtorek.' },
  { who: 'receiver', message: 'Dobra, zrobię wszystko, żeby zdążyć.' },
  { who: 'receiver', message: 'Hej, przesyłam wstępną koncepcję projektu. Co o niej sądzicie?' },
  { who: 'sender', message: 'Wygląda świetnie! Czy mógłbyś dodać jeszcze kilka szczegółów w opisie projektu?' },
  { who: 'receiver', message: 'Jasne, poprawię to w ciągu kilku godzin.' },
  { who: 'sender', message: 'Dzięki, będziemy czekać na aktualizację.' },
  {
    who: 'receiver',
    message: 'Hej, już dodałem brakujące informacje. Czy możecie to potwierdzić i przesłać mi umowę na maila?'
  },
  {
    who: 'sender',
    message: 'Tak, wszystko wygląda dobrze. Przesyłam umowę. Czy możesz ją podpisać i odesłać do nas w ciągu dwóch dni?'
  },
  { who: 'receiver', message: 'Oczywiście, zajmę się tym jak najszybciej.' },
  { who: 'receiver', message: 'Wysłałem podpisaną umowę. Czy jakiś zaliczkę mam przesłać przed rozpoczęciem pracy?' },
  { who: 'sender', message: 'Tak, prosimy o zaliczkę w wysokości 30% wartości projektu.' },
  { who: 'receiver', message: 'Rozumiem, prześlę ją w ciągu kilku dni.' }
]

const reversedConversation = conversation.reverse()

const Message = (props) => {
  if (props.who === 'sender') {
    return (
      <View style={{ alignSelf: 'flex-end', padding: 5 }}>
        <AppText style={[styles.Message, styles.SenderMessage]}>{props.message}</AppText>
      </View>
    )
  } else if (props.who === 'receiver') {
    return (
      <View style={{ alignSelf: 'flex-start', padding: 5 }}>
        <AppText style={[styles.Message, styles.ReceiverMessage]}>{props.message}</AppText>
      </View>
    )
  }
}

const Chat = ({ route, navigation }) => {
  const [toSend, setToSend] = useState('')

  return (
    <SafeAreaView style={styles.MainView}>
      <ChatLabel
        style={{
          height: '8%'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='arrow-back' size={30} style={{ color: primary, marginLeft: 5 }} />
        </TouchableOpacity>
      </ChatLabel>
      <View style={styles.HeaderView}>
        <MediumAvatar resizeMode='contain' source={require('../assets/img/avatar1.png')}></MediumAvatar>
        <HeaderText style={{ color: darkLight, fontSize: 25, marginLeft: 10 }}>{'Imie Nazwisko'}</HeaderText>
      </View>
      <Line style={{ width: '100%', marginVertical: 0 }} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.MessageView}>
        {reversedConversation.reverse().map((msg, index) => (
          <Message key={index} who={msg.who} message={msg.message} />
        ))}
      </ScrollView>
      <Line style={{ width: '100%', marginVertical: 0 }} />
      <View style={styles.InputView}>
        <AppTextInput
          style={{ backgroundColor: white, width: '90%', marginRight: 6 }}
          multiline={true}
          maxLength={255}
          textAlign='right'
          placeholder='Aa'
          value={toSend}
          onChangeText={(newText) => {
            setToSend(newText)
          }}
        />
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name={'send'} color={darkLight} size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  MainView: { backgroundColor: primary, height: '100%', alignItems: 'center', justifyContent: 'flex-start' },
  HeaderView: {
    flex: 0,
    padding: 3,
    paddingLeft: 10,
    maxHeight: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  MessageView: {
    flex: 1,
    width: '100%',
    maxHeight: '80%',
    marginVertical: 0
  },
  Message: {
    borderRadius: 15,
    padding: 5,
    maxWidth: '55%'
  },
  InputView: {
    width: '100%',
    height: 50,
    minHeight: 50,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5
  },
  SenderMessage: {
    backgroundColor: darkLight,
    color: white
  },
  ReceiverMessage: {
    backgroundColor: white,
    color: darkLight
  }
})
