import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, Alert } from 'react-native'
import {
  HeaderText,
  HeaderTextInput,
  RegularTextInput,
  Colors,
  AppText,
  MsgBox,
  RegularText,
  Bubble,
  Line,
  ModalBubble
} from '../../components/styles'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { default as baseURL } from '../../components/AxiosAuth'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CommissionElement } from '../../components/CommissionElement'
import * as SecureStore from 'expo-secure-store'

const { black, primary, grey, darkLight, white } = Colors

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

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

const CompanyCommissionsEditing = ({ route, navigation }) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33')

  const availableLevels = ['Junior', 'Mid', 'Senior', 'Junior+', 'Mid+']

  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isModalVisible, setisModalVisible] = useState(false)
  const [showCommission, setShowCommission] = useState(false)
  const [tagsModalVisible, setTagsModalVisible] = useState(false)
  const [skillsModalVisible, setSkillsModalVisible] = useState(false)
  const [languagesModalVisible, setLanguagesModalVisible] = useState(false)
  const [locationsModalVisible, setLocationsModalVisible] = useState(false)
  const [commissions, setCommissions] = useState([])
  const [isNewElement, setIsNewElement] = useState(false)
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()
  const [refresh, setRefresh] = useState(false)
  const [modalCommission, setModalCommission] = useState('')

  //available data from server
  const [availableLocations, setAvailableLocations] = useState([])
  const [availableTags, setAvailableTags] = useState('')
  const [availableCategories, setAvailableCategories] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])
  const [availableLanguages, setAvailableLanguages] = useState('')

  //temporatry const
  const [tagsToAdd, setTagsToAdd] = useState([])
  const [skillsToAdd, setSkillsToAdd] = useState([])
  const [languagesToAdd, setLanguagesToAdd] = useState([])
  const [locationsToAdd, setLocationsToAdd] = useState([])

  //objects added to sended JSON
  const [id, setId] = useState(0)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [rate, setRate] = useState(0)
  const [deadline, setDeadline] = useState('01/01/1990')
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([])
  const [languages, setLanguages] = useState([])
  const [levels, setLevels] = useState([])
  const [locations, setLocations] = useState([])

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  const toggleRefresh = () => {
    setRefresh(!refresh)
  }

  //handling hooks

  function handleAddCommissionsElement(
    id,
    title,
    description,
    deadline,
    level,
    location,
    skills,
    tags,
    languages,
    rate
  ) {
    setCommissions((commissions) => [
      ...commissions,
      {
        id: id,
        title: title,
        description: description,
        deadline: deadline,
        level: level,
        location: location,
        skills: skills,
        tags: tags,
        languages: languages,
        rate: rate
      }
    ])
  }

  function handleChangeCommissionsElement(
    id,
    title,
    description,
    deadline,
    level,
    location,
    skills,
    tags,
    languages,
    rate
  ) {
    setCommissions(
      commissions.map((c) => {
        if (c.id === id) {
          c.title = title
          c.description = description
          c.deadline = deadline
          c.level = level
          c.location = location
          c.skills = skills
          c.tags = tags
          c.languages = languages
          c.rate = rate
        }
        return c
      })
    )
  }

  function handleDeleteCommissionsElement(id) {
    setCommissions(commissions.filter((e) => e.id !== id))
  }

  function handleAddAvailableSkills(skill) {
    setAvailableSkills((availableSkills) => [...availableSkills, skill])
  }

  function handleDeleteAvailableSkills(skill) {
    setAvailableSkills(availableSkills.filter((s) => s !== skill))
  }

  function handleAddSkill(skill) {
    setSkills((skills) => [...skills, skill])
  }

  function handleDeleteSkill(skill) {
    setSkills(skills.filter((s) => s !== skill))
  }

  function handleAddLocation(location) {
    setLocations((locations) => [...locations, location])
  }

  function handleDeleteLocation(location) {
    setLocations(locations.filter((s) => s !== location))
  }

  function handleAddLevel(level) {
    setLevels((levels) => [...levels, level])
  }

  function handleDeleteLevel(level) {
    setLevels(levels.filter((s) => s !== level))
  }

  function handleAddTag(tag) {
    setTags((tags) => [...tags, tag])
  }

  function handleDeleteTag(tag) {
    setTags(tags.filter((t) => t !== tag))
  }

  function handleAddLanguage(language) {
    setLanguages((languages) => [...languages, language])
  }

  function handleDeleteLanguage(language) {
    setLanguages(languages.filter((l) => l !== language))
  }

  function handleAddTagsToAdd(tag) {
    setTagsToAdd((tagsToAdd) => [...tagsToAdd, tag])
  }

  function handleDeleteTagsToAdd(tag) {
    setTagsToAdd(tagsToAdd.filter((t) => t !== tag))
  }

  function handleAddLanguagesToAdd(language) {
    setLanguagesToAdd((languagesToAdd) => [...languagesToAdd, language])
  }

  function handleDeleteLanguagesToAdd(language) {
    setLanguagesToAdd(languagesToAdd.filter((l) => l !== language))
  }

  function handleAddSkillsToAdd(skill) {
    setSkillsToAdd((skillsToAdd) => [...skillsToAdd, skill])
  }

  function handleDeleteSkillsToAdd(skill) {
    setSkillsToAdd(skillsToAdd.filter((s) => s !== skill))
  }

  function handleAddLocationsToAdd(location) {
    setLocationsToAdd((locationsToAdd) => [...locationsToAdd, location])
  }

  function handleDeleteLocationsToAdd(location) {
    setLocationsToAdd(locationsToAdd.filter((s) => s !== location))
  }

  function handleClearAvailableSkills() {
    setAvailableSkills([])
  }

  function handleClearTagsToAdd() {
    setTagsToAdd([])
  }

  function handleClearLanguagesToAdd() {
    setLanguagesToAdd([])
  }

  function handleClearSkillsToAdd() {
    setSkillsToAdd([])
  }

  function handleClearLocationsToAdd() {
    setLocationsToAdd([])
  }

  function clear() {
    handleClearLanguagesToAdd()
    handleClearLocationsToAdd()
    handleClearSkillsToAdd()
    handleClearTagsToAdd()
    setId(-1)
    setTitle('')
    setDeadline('01/01/1990')
    setDescription('')
    setLevels([])
    setLocations([])
    setLanguages([])
    setSkills([])
    setTags([])
    setRate(0)
    setMessage('')
  }

  // Adding temp values to objects creating commission
  function addTags() {
    for (let i = 0; i < tagsToAdd.length; ++i) {
      handleAddTag(tagsToAdd[i])
    }
    handleClearTagsToAdd()
  }

  function addSkills() {
    for (let i = 0; i < skillsToAdd.length; ++i) {
      handleAddSkill(skillsToAdd[i])
    }
    handleClearSkillsToAdd()
  }

  function addLanguages() {
    for (let i = 0; i < languagesToAdd.length; ++i) {
      handleAddLanguage(languagesToAdd[i])
    }
    handleClearLanguagesToAdd()
  }

  function addLocationss() {
    for (let i = 0; i < locationsToAdd.length; ++i) {
      handleAddLocation(locationsToAdd[i])
    }
    handleClearLocationsToAdd()
  }

  function createCommissionToUpdate() {
    console.log(commissionToUpdate)
    commissionToUpdate.id = id
    commissionToUpdate.title = title
    commissionToUpdate.deadline = deadline
    commissionToUpdate.description = description
    commissionToUpdate.level = levels
    commissionToUpdate.location = locations
    commissionToUpdate.languages = languages
    commissionToUpdate.skills = skills
    commissionToUpdate.tags = tags
    commissionToUpdate.rate = rate
    console.log(commissionToUpdate)
  }

  function setModalCommission(id, title, description, deadline, level, location, languages, skills, tags, rate) {
    console.log({
      'id:': id,
      'title:': title,
      'description:': description,
      'deadline:': deadline,
      'level:': level,
      'location:': location,
      'languages:': languages,
      'skills:': skills,
      'tags:': tags,
      'rate:': rate
    })
    setId(id)
    setTitle(title)
    setDescription(description)
    setDeadline(deadline)
    setLevels(level)
    setLocations(location)
    setLanguages(languages)
    setSkills(skills)
    setTags(tags)
    setRate(rate)
  }

  function saveCommission() {
    if (!isNewElement) {
      handleChangeCommissionsElement(id, title, description, deadline, levels, locations, skills, tags, languages, rate)
    } else {
      handleAddCommissionsElement(id, title, description, deadline, levels, locations, skills, tags, languages, rate)
    }
    clear()
    setisModalVisible(false)
  }

  function getIdOfLastCommissionsElement() {
    let l = commissions.length
    if (l > 0) {
      return commissions[l - 1].id
    } else return -1
  }

  function setSelectedLevels(level) {
    switch (level) {
      case 'Junior':
        setLevels(['Junior'])
        break
      case 'Junior+':
        setLevels(['Junior', 'Mid', 'Senior'])
        break
      case 'Mid':
        setLevels(['Mid'])
        break
      case 'Mid+':
        setLevels(['Mid', 'Senior'])
        break
      case 'Senior':
        setLevels(['Senior'])
        break
    }
  }

  function getSelectedLevel(levels) {
    if (levels) {
      if (levels.length === 3) {
        return 'Junior+'
      } else if (levels.length === 2) {
        return 'Mid+'
      } else if (levels.length === 1) {
        return levels[0]
      } else {
        return 'Junior'
      }
    }
  }

  async function getAccessToken() {
    const t = await getValueFor('accessToken')
    setToken(t)
    console.log(t)
  }

  async function getUserInfo() {
    const u = await getValueFor('user')
    setUserInfo(JSON.parse(u))
    console.log(u)
  }

  useEffect(() => {
    getAccessToken()
    getUserInfo()
  }, [])

  //API handling

  useEffect(() => {
    let configTag = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/public/api/filter/getAvailableTags',
      headers: {}
    }

    let configCities = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/public/api/filter/getAvailableCities',
      headers: {}
    }

    let configLanguages = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/public/api/filter/getAvailableLanguages',
      headers: {}
    }

    let configCategories = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/public/api/filter/getAvailableCategories',
      headers: {}
    }
    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse] = await Promise.all([
          axios.request(configCities),
          axios.request(configTag),
          axios.request(configCategories),
          axios.request(configLanguages)
        ])
        setAvailableTags(tagsResponse.data)
        setAvailableLanguages(languagesResponse.data)
        setAvailableLocations(citiesResponse.data)
        handleClearAvailableSkills()
        setAvailableCategories(categoriesResponse.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (availableCategories) {
      for (let i = 0; i < availableCategories.categories.length; ++i) {
        for (let j = 0; j < availableCategories.categories[i].skills.length; ++j) {
          handleAddAvailableSkills(availableCategories.categories[i].skills[j])
        }
      }
    }
  }, [availableCategories])

  useEffect(() => {
    if (userInfo) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/commission/getAllCommissionFirmByUsername/' + userInfo.username,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      const fetchData = async () => {
        try {
          const result = await axios.request(config)
          console.log(result.data)
          setCommissions(result.data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }
  }, [userInfo, refresh])

  async function deleteCommission(id) {
    const response = await axios
      .delete(baseURL + '/api/deleteCommission/' + id.toString(), {
        params: { id: id },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      .catch((error) => {
        Alert('Nie udało się usunąć zlecenia')
        console.log(error)
      })
  }

  async function apiCommissionUpdate() {
    const response = await axios
      .put(
        baseURL + '/api/commission/updateById/' + commissionToUpdate.id.toString(),
        {
          client_username: userInfo.username,
          contractor_username: contractorUsername,
          title: commissionToUpdate.title,
          description: commissionToUpdate.description,
          deadline: commissionToUpdate.deadline,
          level: commissionToUpdate.levels,
          location: commissionToUpdate.locations,
          skills: commissionToUpdate.skills,
          tags: commissionToUpdate.tags,
          languages: commissionToUpdate.languages,
          rate: commissionToUpdate.rate
        },
        {
          params: { id: commissionToUpdate.id },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .catch((error) => {
        handleMessage('Wystąpił błąd', 'FAILED')
        console.log(error)
      })
    if ((response.status = 200)) {
      handleMessage('Zapisano zmiany!', 'SUCCESS')
      clear()
      setisModalVisible(false)
    }
  }

  async function apiCommissionCreate() {
    const response = await axios
      .post(
        baseURL + '/api/commission/create',
        {
          client_username: userInfo.username,
          title: title,
          description: description,
          deadline: deadline,
          level: levels,
          location: locations,
          skills: skills,
          tags: tags,
          languages: languages,
          rate: rate
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .catch((error) => {
        handleMessage('Wystąpił błąd', 'FAILED')
        console.log(error)
      })
    if ((response.status = 200)) {
      handleMessage('Zapisano zmiany!', 'SUCCESS')
      clear()
      setisModalVisible(false)
      toggleRefresh()
    }
  }

  //listing bubbles

  function ListLocations() {
    if (locations) {
      const list = locations.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteLocation(item)}>
            <Ionicons size={16} name={'close'} color='#A9A9A9' style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ))
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setLocationsModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color='#A9A9A9' style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      )
    } else {
      return <View></View>
    }
  }

  function ListAvailableLocations() {
    if (availableLocations) {
      const available = availableLocations.filter((item) => {
        if (!locations.includes(item)) return item
      })
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (locationsToAdd.includes(item)) {
              handleDeleteLocationsToAdd(item)
            } else {
              handleAddLocationsToAdd(item)
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={locationsToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListLanguages() {
    if (languages) {
      const list = languages.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteLanguage(item)}>
            <Ionicons size={16} name={'close'} color='#A9A9A9' style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ))
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setLanguagesModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color='#A9A9A9' style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      )
    } else {
      return <View></View>
    }
  }

  function ListAvailableLanguages() {
    if (availableLanguages) {
      const available = availableLanguages.filter((item) => {
        if (!languages.includes(item)) return item
      })
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (languagesToAdd.includes(item)) {
              handleDeleteLanguagesToAdd(item)
            } else {
              handleAddLanguagesToAdd(item)
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={languagesToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListSkills() {
    if (skills) {
      const list = skills.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteSkill(item)}>
            <Ionicons size={16} name={'close'} color='#A9A9A9' style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ))
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setSkillsModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color='#A9A9A9' style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      )
    } else {
      return <View></View>
    }
  }

  function ListAvailableSkills() {
    if (availableSkills) {
      const available = availableSkills.filter((item) => {
        if (!skills.includes(item)) return item
      })
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (skillsToAdd.includes(item)) {
              handleDeleteSkillsToAdd(item)
            } else {
              handleAddSkillsToAdd(item)
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={skillsToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListTags() {
    if (tags) {
      const list = tags.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText style={{ marginRight: 2 }}>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteTag(item)}>
            <Ionicons size={16} name={'close'} color='#A9A9A9' style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ))
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setTagsModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color='#A9A9A9' style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      )
    } else {
      return <View></View>
    }
  }

  function ListAvailableTags() {
    if (availableTags) {
      const available = availableTags.filter((item) => {
        if (!tags.includes(item)) return item
      })
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (tagsToAdd.includes(item)) {
              handleDeleteTagsToAdd(item)
            } else {
              handleAddTagsToAdd(item)
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={tagsToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: primary, justifyContent: 'center', height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {modalCommission && (
            <Modal
              isVisible={showCommission}
              onBackdropPress={() => setShowCommission(false)}
              onSwipeComplete={() => setShowCommission(false)}
              swipeDirection='right'
              animationIn='fadeInUp'
              animationOut='fadeOutUp'
              animationInTiming={500}
              animationOutTiming={500}
              hideModalContentWhileAnimating={true}
            >
              <ScrollView style={{ maxHeight: '90%' }}>
                <View style={[styles.centeredView1]}>
                  <View style={styles.modalView1}>
                    <HeaderText style={{ color: darkLight }}>{modalCommission.title}</HeaderText>
                    <Line style={{ width: '90%', height: 2 }} />
                    <View style={styles.ModalDescription1}>
                      <RegularText style={{ color: '#6e6968' }}>{modalCommission.description}</RegularText>
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalCommissionDetails1}>
                      <View style={styles.ModalDetail1}>
                        <RegularText style={{ width: '60%' }}>Stawka:</RegularText>
                        <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                          {modalCommission.rate + ' PLN'}
                        </RegularText>
                      </View>
                      <View style={styles.ModalDetail1}>
                        <RegularText style={{ width: '60%' }}>Czas wykonania:</RegularText>
                        <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                          {modalCommission.deadline}
                        </RegularText>
                      </View>
                      <View style={styles.ModalDetail1}>
                        <RegularText style={{ width: '60%' }}>Poziom zaawansowania:</RegularText>
                        <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                          {getSelectedLevel(modalCommission.level)}
                        </RegularText>
                      </View>
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        marginLeft: 15
                      }}
                    >
                      <RegularText style={{ width: '40%' }}>Zleceniodawca:</RegularText>
                      <RegularText style={{ color: '#6e6968', width: '55%', textAlign: 'right' }}>
                        {modalCommission.company_name}
                      </RegularText>
                    </View>
                    {modalCommission.contractor_username && <Line style={{ width: '90%', height: 1 }} />}
                    {modalCommission.contractor_username && (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignSelf: 'flex-start',
                          alignItems: 'center',
                          marginLeft: 15
                        }}
                      >
                        <RegularText style={{ width: '40%' }}>Zleceniobiorca:</RegularText>
                        <RegularText
                          onPress={() => {
                            navigation.navigate('ArtistScreen', { username: modalCommission.contractor_username })
                            setShowCommission(false)
                          }}
                          style={{ color: '#6e6968', width: '55%', textAlign: 'right' }}
                        >
                          {modalCommission.contractor_username}
                        </RegularText>
                      </View>
                    )}
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalMapping1}>
                      <RegularText style={{ marginRight: 5 }}>Lokalizacja:</RegularText>
                      {modalCommission.location.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble1, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalMapping1}>
                      <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
                      {modalCommission.tags.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble1, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalMapping1}>
                      <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
                      {modalCommission.skills.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble1, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={[styles.ModalMapping1, { marginBottom: 10 }]}>
                      <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
                      {modalCommission.languages.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble1, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          )}
          {isModalVisible ? (
            <View style={{ height: '100%' }}>
              <View style={[styles.centeredView]}>
                <View style={styles.modalView}>
                  <HeaderTextInput
                    maxLength={255}
                    multiline={true}
                    style={{ color: darkLight, maxWidth: '95%', width: '90%', textAlign: 'left' }}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Wpisz tytuł'
                  ></HeaderTextInput>
                  <Line style={{ width: '90%', height: 2 }} />
                  <RegularTextInput
                    maxLength={255}
                    multiline={true}
                    style={{ color: '#6e6968', maxWidth: '100%', width: '90%', textAlign: 'left' }}
                    value={description}
                    onChangeText={setDescription}
                    placeholder='Wpisz opis'
                  ></RegularTextInput>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalCommissionDetails}>
                    <View style={styles.ModalDetail}>
                      <RegularText style={{ width: '50%' }}>Stawka:</RegularText>
                      <RegularTextInput
                        maxLength={15}
                        textAlign='right'
                        keyboardType='number-pad'
                        style={{ color: darkLight, width: '30%' }}
                        value={rate.toString()}
                        onChangeText={(newText) => {
                          if (newText === '' || newText === 'NaN') {
                            setRate(0)
                          }
                          setRate(parseInt(newText))
                        }}
                        placeholder='Wpisz stawke'
                      ></RegularTextInput>
                      <RegularText> PLN</RegularText>
                    </View>
                    <View style={styles.ModalDetail}>
                      <RegularText style={{ width: '66%' }}>Czas wykonania:</RegularText>
                      <TouchableOpacity
                        onPress={() => {
                          setShowDatePicker(true)
                        }}
                      >
                        <RegularText
                          style={{
                            fontSize: 16,
                            marginLeft: 5,
                            textAlign: 'right'
                          }}
                        >
                          {deadline}
                        </RegularText>
                      </TouchableOpacity>

                      {showDatePicker && (
                        <DateTimePicker
                          testID='startDateTimePicker'
                          value={new Date(moment(deadline, 'DD-MM-YYYY'))}
                          mode='date'
                          onChange={(event, newdate) => {
                            setDeadline(moment(newdate).format('DD/MM/YYYY'))
                            setShowDatePicker(false)
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.ModalDetail}>
                      <RegularText style={{ width: '65%' }}>Poziom zaawansowania:</RegularText>
                      <SelectDropdown
                        data={availableLevels}
                        onSelect={(selectedItem, index) => {
                          setSelectedLevels(selectedItem)
                        }}
                        defaultButtonText={getSelectedLevel(levels)}
                        buttonStyle={{
                          width: 100,
                          height: 30,
                          borderWidth: 2,
                          borderColor: grey,
                          borderRadius: 12,
                          backgroundColor: primary
                        }}
                        buttonTextStyle={{ fontSize: 14 }}
                        renderDropdownIcon={(isOpened) => {
                          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={black} size={12} />
                        }}
                        dropdownIconPosition={'right'}
                      />
                    </View>
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Lokalizacje:</RegularText>
                    <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListLocations()}</View>
                    <Modal
                      isVisible={locationsModalVisible}
                      onBackdropPress={() => setLocationsModalVisible(false)}
                      onSwipeComplete={() => setLocationsModalVisible(false)}
                      swipeDirection='right'
                      animationInTiming={500}
                      animationOutTiming={500}
                      hideModalContentWhileAnimating={true}
                    >
                      <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                        <View style={[styles.centeredView]}>
                          <View style={styles.modalView}>
                            {ListAvailableLocations()}
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                              <Pressable
                                onPress={() => {
                                  addLocationss()
                                  setLocationsModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Zapisz</AppText>
                              </Pressable>
                              <Pressable
                                onPress={() => {
                                  handleClearLocationsToAdd()
                                  setLocationsModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </Modal>
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
                    <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListTags()}</View>
                    <Modal
                      isVisible={tagsModalVisible}
                      onBackdropPress={() => setTagsModalVisible(false)}
                      onSwipeComplete={() => setTagsModalVisible(false)}
                      swipeDirection='right'
                      animationInTiming={500}
                      animationOutTiming={500}
                      hideModalContentWhileAnimating={true}
                    >
                      <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                        <View style={[styles.centeredView]}>
                          <View style={styles.modalView}>
                            {ListAvailableTags()}
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                              <Pressable
                                onPress={() => {
                                  addTags()
                                  setTagsModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Zapisz</AppText>
                              </Pressable>
                              <Pressable
                                onPress={() => {
                                  handleClearTagsToAdd()
                                  setTagsModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </Modal>
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
                    <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListSkills()}</View>
                    <Modal
                      isVisible={skillsModalVisible}
                      onBackdropPress={() => setSkillsModalVisible(false)}
                      onSwipeComplete={() => setSkillsModalVisible(false)}
                      swipeDirection='right'
                      animationInTiming={500}
                      animationOutTiming={500}
                      hideModalContentWhileAnimating={true}
                    >
                      <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                        <View style={[styles.centeredView]}>
                          <View style={styles.modalView}>
                            {ListAvailableSkills()}
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                              <Pressable
                                onPress={() => {
                                  addSkills()
                                  setSkillsModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Zapisz</AppText>
                              </Pressable>
                              <Pressable
                                onPress={() => {
                                  handleClearSkillsToAdd()
                                  setSkillsModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </Modal>
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
                    <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListLanguages()}</View>
                    <Modal
                      isVisible={languagesModalVisible}
                      onBackdropPress={() => setLanguagesModalVisible(false)}
                      onSwipeComplete={() => setLanguagesModalVisible(false)}
                      swipeDirection='right'
                      animationInTiming={500}
                      animationOutTiming={500}
                      hideModalContentWhileAnimating={true}
                    >
                      <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                        <View style={[styles.centeredView]}>
                          <View style={styles.modalView}>
                            {ListAvailableLanguages()}
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                              <Pressable
                                onPress={() => {
                                  addLanguages()
                                  setLanguagesModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Zapisz</AppText>
                              </Pressable>
                              <Pressable
                                onPress={() => {
                                  handleClearLanguagesToAdd()
                                  setLanguagesModalVisible(false)
                                }}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed ? 'lightgrey' : darkLight
                                  },
                                  styles.ModalButton
                                ]}
                              >
                                <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </Modal>
                  </View>
                  <MsgBox type={messageType}>{message}</MsgBox>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Pressable
                      onPress={() => {
                        if (isNewElement) {
                          apiCommissionCreate()
                        } else {
                          apiCommissionUpdate()
                        }
                        setIsNewElement(false)
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'lightgrey' : darkLight
                        },
                        styles.ModalButton
                      ]}
                    >
                      <AppText style={{ color: 'white' }}>Zapisz</AppText>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setisModalVisible(false)
                        setIsNewElement(false)
                        clear()
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'lightgrey' : darkLight
                        },
                        styles.ModalButton
                      ]}
                    >
                      <AppText style={{ color: 'white' }}>Anuluj</AppText>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={{ alignItems: 'center', width: '100%' }}>
                <HeaderText numberOfLines={1} style={{ color: black }}>
                  Zlecenia
                </HeaderText>
              </View>
              <View style={{ backgroundColor: primary }}>
                {commissions.map((cms, indexC) => (
                  <View key={indexC} style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalCommission(cms)
                        setShowCommission(true)
                      }}
                      key={indexC}
                    >
                      <CommissionElement
                        name={cms.company_name}
                        key={indexC}
                        title={cms.title}
                        description={cms.description}
                        rate={cms.rate}
                        deadline={cms.deadline}
                        level={getSelectedLevel(cms.level)}
                        location={cms.location}
                        tags={cms.tags}
                      />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', width: '90%' }}>
                      {}
                      <Pressable
                        onPress={() => {
                          handleDeleteCommissionsElement(cms.id)
                          deleteCommission(cms.id)
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                            padding: 5,
                            paddingHorizontal: 7,
                            borderRadius: 15,
                            fontSize: 16,
                            marginBottom: 10,
                            alignItems: 'center',
                            flexDirection: 'row'
                          }
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Usuń</AppText>
                      </Pressable>
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                  </View>
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  alignContent: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handleAddCommissionsElement(
                    //   getIdOfLastCommissionsElement() + 1,
                    //   '',
                    //   '',
                    //   '01/01/1990',
                    //   [],
                    //   [],
                    //   [],
                    //   [],
                    //   [],
                    //   0,
                    // );
                    setIsNewElement(true)
                    setModalCommission(getIdOfLastCommissionsElement() + 1, '', '', '01/01/1990', [], [], [], [], [], 0)
                    setisModalVisible(true)
                  }}
                >
                  <Bubble style={[{ alignContent: 'center', marginBottom: 3, marginTop: 3 }, styles.boxShadow]}>
                    <AppText>Dodaj</AppText>
                  </Bubble>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginBottom: 15
                }}
              ></View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CompanyCommissionsEditing

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  modalView: {
    width: '100%',
    backgroundColor: primary,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  ModalButton: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row'
  },
  ModalDescription: {
    paddingTop: 5,
    padding: 15
  },
  ModalCommissionDetails: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  ModalDetail: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3
  },
  ModalMapping: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 17,
    paddingRight: 17
  },
  ModalTagBubble: {
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 2,
    borderColor: '#0F0F0F33',
    borderWidth: 1.6
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%'
  },
  modalView1: {
    width: '100%',
    margin: 10,
    backgroundColor: primary,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  ModalButton1: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row'
  },
  ModalDescription1: {
    paddingTop: 5,
    padding: 15
  },
  ModalCommissionDetails1: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  ModalDetail1: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ModalMapping1: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 17,
    paddingRight: 12
  },
  ModalTagBubble1: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 2,
    backgroundColor: white
    //borderColor: darkLight,
    //borderWidth: 1,
  }
})
