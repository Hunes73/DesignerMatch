import * as React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Colors, AppText, StatsText, RegularText, Bubble } from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { darkLight, white, primary, darkLight2, gray1 } = Colors

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: xOffset, height: yOffset }
    }
  } else if (Platform.OS === 'android') {
    styles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
  }
}

export const CommissionElement = (props) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33')

  return (
    <View style={[styles.Commission, styles.boxShadow]}>
      <View style={styles.TopContainer}>
        <View style={styles.TitleContainer}>
          <View style={styles.TitleText}>
            <StatsText style={{ textAlign: 'left' }}>{props.title}</StatsText>
          </View>
          <Bubble style={[styles.LevelBubble]}>
            <AppText style={{ fontSize: 10, color: '#FFF' }}>{props.level}</AppText>
          </Bubble>
        </View>
        <RegularText style={{ maxWidth: '20%', textAlign: 'right' }}>{props.rate + ' PLN'}</RegularText>
      </View>
      <View style={styles.MiddleContainer}>
        <Ionicons size={16} style={{ color: gray1, marginLeft: 5 }} name='briefcase-outline' />
        <RegularText style={[styles.MiddleText1, { maxWidth: '40%' }]} numberOfLines={1}>
          {props.name}
        </RegularText>
        <Ionicons size={16} style={{ color: gray1 }} name='location-outline' />
        {props.location.length > 1 ? (
          <RegularText style={styles.MiddleText1}>{props.location[0] + '+'}</RegularText>
        ) : (
          <RegularText style={styles.MiddleText1}>{props.location}</RegularText>
        )}
        <Ionicons size={16} style={{ color: gray1, marginRight: 5 }} name='time-outline' />
        <RegularText style={styles.MiddleText2}>{props.deadline}</RegularText>
      </View>
      <View style={styles.BottomContainer}>
        {props.tags.map((tag, indexT) => (
          <Bubble style={styles.TagBubble} key={indexT}>
            <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
          </Bubble>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ListContainer: {
    padding: 10,
    width: '95%'
  },
  Commission: {
    borderRadius: 15,
    borderColor: '#0F0F0F33',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    marginRight: 5,
    marginBottom: 10,
    width: '98%',
    minWidth: '98%',
    backgroundColor: primary
  },
  TopContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-between'
  },
  TitleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    width: '80%',
    marginLeft: 5
  },
  TitleText: {
    maxWidth: '92%'
  },
  LevelBubble: {
    maxHeight: 22,
    maxWidth: 50,
    paddingTop: 4,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 0,
    borderColor: '#a8a5a5',
    borderWidth: 0,
    backgroundColor: darkLight2
  },
  MiddleText1: {
    color: '#a8a5a5',
    fontSize: 12,
    marginHorizontal: 5,
    marginRight: 20
  },
  MiddleText2: {
    color: '#a8a5a5',
    fontSize: 12,
    marginRight: 20
  },
  MiddleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    justifyContent: 'flex-start'
  },
  BottomContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'flex-end',
    flexWrap: 'wrap-reverse'
  },
  TagBubble: {
    maxHeight: 22,
    paddingTop: 2,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 2,
    borderColor: darkLight,
    borderWidth: 1,
    backgroundColor: primary
  }
})
