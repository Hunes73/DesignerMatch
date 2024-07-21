import styled from 'styled-components'
import { LinearGradient } from 'expo-linear-gradient'

//const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
  primary: '#F0EDEB',
  secondary: '#BEB5BC',
  secondary1: '#dfdfe5',
  darkLight: '#4A4E69',
  darkLight2: '#888cab',
  notificationsRed: '#DA7676',
  tertiary: '#000000AA',
  brand: '#000FFF',
  red: '#F00',
  black: '#1D1D1F',
  green: '#47D531',
  green2: '#2fb31b',
  white: '#F5F5F5',
  grey: '#00000022',
  gray1: '#777',
  link: '#4159a3',
  checked: '#CCCCFF',
  facebook1: '#426782',
  facebook2: '#5074be'
}

const {
  primary,
  secondary,
  secondary1,
  tertiary,
  darkLight,
  darkLight2,
  white,
  brand,
  red,
  green,
  grey,
  gray1,
  checked,
  black
} = Colors

//text with custom font
export const AppText = styled.Text`
  fontfamily: 'LexendDeca-VariableFont_wght';
`

export const AppTextInput = styled.TextInput`
    fontFamily: 'LexendDeca-VariableFont_wght';
    borderWidth: 1px;
    borderColor: ${grey}
    borderRadius: 12px;
    padding: 7px 8px 7px 8px;
`

export const LinkTextInput = styled.TextInput`
    fontFamily: 'LexendDeca-VariableFont_wght';
    borderWidth: 1px;
    borderColor: ${(props) => (props.checkRegex ? grey : red)}
    borderRadius: 12px;
    padding: 7px 8px 7px 8px;
`

export const HeaderText = styled(AppText)`
  color: ${primary};
  fontsize: 26px;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
  ${(props) =>
    props.isLong === true &&
    `
        fontSize: 18px;
    `}
`

export const HeaderTextInput = styled(AppTextInput)`
  color: ${primary};
  fontsize: 26px;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const RegularText = styled(AppText)`
  color: ${darkLight};
  fontsize: 16px;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const RegularTextInput = styled(AppTextInput)`
  color: ${darkLight};
  fontsize: 16px;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const StatsText = styled(AppText)`
  color: ${darkLight};
  fontsize: 18px;
  text-align: center;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const StatsTextInput = styled(AppTextInput)`
  color: ${darkLight};
  fontsize: 18px;
  text-align: center;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const SmallText = styled(AppText)`
  color: ${darkLight};
  fontsize: 11px;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const SmallTextInput = styled(AppTextInput)`
  color: ${darkLight};
  fontsize: 11px;

  ${(props) =>
    props.bold === true &&
    `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 80px;
  background-color: ${primary};
`

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${primary};
`

export const WelcomeConteiner = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${darkLight};

  ${(props) =>
    props.so !== null &&
    `
        ;
    `}
`

export const MediumAvatar = styled.Image`
  width: 40px;
  height: 40px;
  margin: auto;
  border-radius: 50px;
`

export const SmallAvatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${darkLight};
`

export const WelcomeImage = styled.Image`
    height = 50%;
    min-width = 100%;
`

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`

export const StyledFormArea = styled.View`
    width = 90%;
`

export const StyledTextInput = styled.TextInput`
  background-color: #fff;
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${black};

  ${(props) =>
    props.checkRegex === false &&
    `
        borderColor: ${red}
        borderWidth: 1px;
    `}
`

export const StyledInputLabel = styled.Text`
  color: #000000;
  font-size: 13px;
  text-align: left;
`

export const LeftIcon = styled.View`
  left: 15px;
  top: 37px;
  position: absolute;
  z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 35px;
  position: absolute;
  z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.google === true &&
    `
        flex-direction: row;
        justify-content: space-evenly;
    `}

  ${(props) =>
    props.facebook === true &&
    `
        flex-direction: row;
        justify-content: space-evenly;
    `}
`

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) =>
    props.google === true &&
    `
    padding-left: 20px;

    ${(props) =>
      props.facebook === true &&
      `
    padding-left: 20px;
    `}
`}
`

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type === 'SUCCESS' ? green : red)};
`

export const Line = styled.View`
    height: 1px;
    width = 100%;
    background-color: ${secondary};
    margin-vertical: 10px;
`

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const TextLinkContent = styled.Text`
  color: ${darkLight};
  font-size: 15px;
`

export const ChatLabel = styled.View`
  background-color: ${darkLight};
  width: 100%;
  height: 50px;
  flexdirection: row;
  alignitems: center;
`

export const ChatImage = styled.Image`
  flex: 1;
  resizemode: contain;
  tintcolor: ${primary};
`

export const ChatText = styled.Text`
  color: ${primary};
  fontsize: 25px;
  flex: 1;
`

export const ChatIconButton = styled.TouchableOpacity`
  height: 50%;
  flex: 1;
`

export const ChatMessages = styled.FlatList`
  background-color: ${secondary};
`

export const HomeLabel = styled.View`
  background-color: ${primary};
  width: 100%;
  height: 45px;
  flexdirection: row;
  alignitems: center;
  padding: 1px;
`

export const HomeIconButton = styled.TouchableOpacity`
  flex: 0.3;
  width: 20%;
`

export const HomeTextInput = styled.TextInput`
  flex: 1;
  height: 50%;
  borderradius: 30px;
  paddingleft: 10px;
  fontsize: 14px;
  marginright: 10px;
  marginleft: 5px;
`

export const LinearGradientStyle = styled(LinearGradient)`
  marginvertical: 5px;
  borderradius: 5px;
  paddingvertical: 15px;
`

export const Bubble = styled.View`
  padding: 7px 10px 7px 10px;
  border-radius: 15px;
  fontsize: 16px;
  marginbottom: 10px;
  margintop: 10px;
  align-items: center;
`

export const ModalBubble = styled.View`
  padding: 7px 10px 7px 10px;
  border-radius: 15px;
  fontsize: 16px;
  marginbottom: 10px;
  margintop: 10px;
  align-items: center;

  ${(props) =>
    props.checked === true &&
    `
        fontSize: 18px;
        background-color: ${checked}
    `}
`

export const LineForm = styled.View`
  width: 100%;
  height: 1px;
  marginvertical: 5px;
  backgroundcolor: ${grey};
`

export const DropDownInfoText = styled(AppText)`
  font-size: 23px;
  color: ${darkLight};
`

export const DropDownSubcategoryText = styled(AppText)`
  font-size: 20px;
  color: ${darkLight};
`
