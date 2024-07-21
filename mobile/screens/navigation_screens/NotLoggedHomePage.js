import * as React from 'react'
import { View, Dimensions, StyleSheet, ScrollView, SafeAreaView, Modal, TouchableOpacity } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicos from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  HomeLabel,
  HomeIconButton,
  ChatImage,
  Colors,
  HomeTextInput,
  ChatLabel,
  AppText,
  HeaderText,
  LineForm,
  DropDownInfoText,
  DropDownSubcategoryText
} from '../../components/styles'
import { HomeSearchFilter, CommissionsSearchFilter } from '../../components/SearchFilter'
import { useMemo } from 'react'
import { useEffect } from 'react'
import BASE_URL from '../../components/AxiosAuth'
import axios from 'axios'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const { primary, darkLight, white, black } = Colors

export default function HomePage({ navigation }) {
  const [cities, setCities] = useState([])
  const [tags, setTags] = useState([])
  const [languages, setLanguages] = useState([])
  const [categories, setCategories] = useState([])
  const [levels, setLevels] = useState([])
  const [levelsFiltr, setLevelsFiltr] = useState([])
  const [citiesFiltr, setCitiesFiltr] = useState([])
  const [tagsFiltr, setTagsFiltr] = useState([])
  const [languagesFiltr, setLanguagesFiltr] = useState([])
  const [categoriesFiltr, setCategoriesFiltr] = useState([])
  const [filtered, setFiltered] = useState([])
  const [commissions, setCommissions] = useState([])
  const [input, setInput] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showLevels, setShowLevels] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showTags, setShowTags] = useState(false)
  const [showLocations, setShowLocations] = useState(false)
  const [showArtistPage, setShowArtistPage] = useState(true)

  const sort = ['ocena: najwyższa', 'ocena: najniższa', 'ostatnia aktywność']

  // function handleAddCategories(skill) {
  //   setCategories((categories) => [...categories, skill]);
  // }

  function handleAddTagsFiltr(filtr) {
    setTagsFiltr((tagsFiltr) => [...tagsFiltr, filtr])
  }

  function handleAddLanguagesFiltr(filtr) {
    setLanguagesFiltr((languagesFiltr) => [...languagesFiltr, filtr])
  }

  function handleAddCategoriesFiltr(filtr) {
    setCategoriesFiltr((categoriesFiltr) => [...categoriesFiltr, filtr])
  }

  function handleAddCitiesFiltr(filtr) {
    setCitiesFiltr((citiesFiltr) => [...citiesFiltr, filtr])
  }

  function handleAddLevelsFiltr(filtr) {
    setLevelsFiltr((levelsFiltr) => [...levelsFiltr, filtr])
  }

  function handleDeleteTagsFiltr(item) {
    setTagsFiltr(tagsFiltr.filter((i) => i !== item))
  }

  function handleDeleteLanguagesFiltr(item) {
    setLanguagesFiltr(languagesFiltr.filter((i) => i !== item))
  }

  function handleDeleteLevelsFiltr(item) {
    setLevelsFiltr(levelsFiltr.filter((i) => i !== item))
  }

  function handleDeleteCitiesFiltr(item) {
    setCitiesFiltr(citiesFiltr.filter((i) => i !== item))
  }

  function handleDeleteCategoriesFiltr(item) {
    setCategoriesFiltr(categoriesFiltr.filter((i) => i !== item))
  }

  function clearFilters() {
    setLevelsFiltr([])
    setLanguagesFiltr([])
    setCitiesFiltr([])
    setCategoriesFiltr([])
    setTagsFiltr([])
  }

  const citiesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/public/api/filter/getAvailableCities',
      headers: {}
    }),
    []
  )

  const tagsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/public/api/filter/getAvailableTags',
      headers: {}
    }),
    []
  )

  const languagesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/public/api/filter/getAvailableLanguages',
      headers: {}
    }),
    []
  )

  const levelsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/public/api/filter/getAvailableLevels',
      headers: {}
    }),
    []
  )

  const categoriesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/public/api/filter/getAvailableCategories',
      headers: {}
    }),
    []
  )

  useEffect(() => {
    const filter = async () => {
      if (showArtistPage) {
        try {
          const response = await axios
            .post(
              BASE_URL + '/public/api/artist/filter',
              {
                levels: levelsFiltr,
                locations: citiesFiltr,
                skills: categoriesFiltr,
                languages: languagesFiltr,
                tags: tagsFiltr
              },
              {
                params: { page: 0, size: 250 },
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
              }
            )
            .catch((error) => {
              console.log(error)
            })
          if ((response.status = 200)) {
            setFiltered(response.data)
            console.log(response.status)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const response = await axios
            .post(
              BASE_URL + '/public/api/commission/filter',
              {
                levels: levelsFiltr,
                locations: citiesFiltr,
                skills: categoriesFiltr,
                languages: languagesFiltr,
                tags: tagsFiltr
              },
              {
                params: { page: 0, size: 250 },
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
              }
            )
            .catch((error) => {
              console.log(error)
            })
          if ((response.status = 200)) {
            setCommissions(response.data)
            console.log(response.status)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    filter()
  }, [levelsFiltr, categoriesFiltr, languagesFiltr, citiesFiltr, tagsFiltr])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData)
          ]
        )
        setCities(citiesResponse.data)
        setTags(tagsResponse.data)
        setLevels(levelsResponse.data)
        setLanguages(languagesResponse.data)
        setCategories(categoriesResponse.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [citiesData, tagsData, categoriesData, languagesData, levelsData])

  const categoriesList = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null
    }

    const list = categories.categories.map((category, indexC) => (
      <View key={indexC}>
        <DropDownSubcategoryText>{category.name}</DropDownSubcategoryText>
        {category.skills.map((subcategory, indexS) => (
          <View style={{ padding: 5 }} key={indexS}>
            <BouncyCheckbox
              size={25}
              fillColor={darkLight}
              unfillColor={primary}
              isChecked={categoriesFiltr.includes(subcategory)}
              text={subcategory}
              iconStyle={{ borderColor: darkLight }}
              innerIconStyle={{ borderWidth: 1 }}
              textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
              onPress={(isChecked) => {
                isChecked ? handleAddCategoriesFiltr(subcategory) : handleDeleteCategoriesFiltr(subcategory)
              }}
            ></BouncyCheckbox>
          </View>
        ))}
      </View>
    ))

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>
  })

  const levelsList = useMemo(() => {
    if (!levels) {
      return null
    }

    const list = levels.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          isChecked={levelsFiltr.includes(item)}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {
            isChecked ? handleAddLevelsFiltr(item) : handleDeleteLevelsFiltr(item)
          }}
        ></BouncyCheckbox>
      </View>
    ))

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>
  })

  const locationsList = useMemo(() => {
    if (!cities) {
      return null
    }

    const list = cities.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          isChecked={citiesFiltr.includes(item)}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {
            isChecked ? handleAddCitiesFiltr(item) : handleDeleteCitiesFiltr(item)
          }}
        ></BouncyCheckbox>
      </View>
    ))

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>
  })

  const languagesList = useMemo(() => {
    if (!languages) {
      return null
    }

    const list = languages.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          isChecked={languagesFiltr.includes(item)}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {
            isChecked ? handleAddLanguagesFiltr(item) : handleDeleteLanguagesFiltr(item)
          }}
        ></BouncyCheckbox>
      </View>
    ))

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>
  })

  const tagsList = useMemo(() => {
    if (!tags) {
      return null
    }

    const list = tags.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          isChecked={tagsFiltr.includes(item)}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {
            isChecked ? handleAddTagsFiltr(item) : handleDeleteTagsFiltr(item)
          }}
        ></BouncyCheckbox>
      </View>
    ))

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>
  })

  const filteredCards = useMemo(() => {
    if (!Array.isArray(filtered.content)) {
      return null
    }

    return <HomeSearchFilter data={filtered.content} input={input} setInput={setInput} navigation={navigation} />
  })

  const filteredCommissions = useMemo(() => {
    if (!Array.isArray(commissions.content)) {
      return null
    }

    console.log(commissions.content)

    return (
      <CommissionsSearchFilter data={commissions.content} input={input} setInput={setInput} navigation={navigation} />
    )
  })

  return (
    <>
      {showArtistPage ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
          <ChatLabel
            style={{
              height: '8%',
              justifyContent: 'flex-end'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.replace('Login')
              }}
            >
              <Ionicos name='close-outline' color={primary} size={39} style={{ marginRight: 15, marginTop: 5 }} />
            </TouchableOpacity>
            <HeaderText>Przeglądaj designer'ów</HeaderText>
            <TouchableOpacity
              onPress={() => {
                setShowArtistPage(!showArtistPage)
                clearFilters()
              }}
            >
              <FontAwesome
                name={'chevron-right'}
                color={primary}
                size={25}
                style={{ marginLeft: 33, marginRight: 5, marginTop: 5 }}
              />
            </TouchableOpacity>
          </ChatLabel>
          <HomeLabel>
            <HomeIconButton onPress={() => setShowModal(true)} activeOpacity={0.5} style={{ alignItems: 'center' }}>
              <ChatImage
                style={{ tintColor: '#A9A9A9', width: '30%', marginLeft: 10 }}
                resizeMode='cover'
                source={require('./../../assets/img/filter.png')}
              />
            </HomeIconButton>
            <Modal
              visible={showModal}
              transparent={true}
              animationType='slide'
              onRequestClose={() => setShowModal(false)}
            >
              <View style={styles.ModalStyle}>
                <View style={styles.ModalViewStyle}>
                  <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Icon name='angle-down' size={35} color={darkLight} />
                    </View>
                  </TouchableOpacity>
                  <LineForm />
                  <TouchableOpacity
                    onPress={() => {
                      clearFilters()
                    }}
                  >
                    <View style={styles.ModalButton}>
                      <AppText style={{ color: white }}>Wyczyść filtry</AppText>
                    </View>
                  </TouchableOpacity>
                  <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowLevels(!showLevels)
                          }}
                        >
                          <FontAwesome
                            name={showLevels ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Poziomy:</DropDownInfoText>
                      </View>

                      {showLevels ? levelsList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowLocations(!showLocations)
                          }}
                        >
                          <FontAwesome
                            name={showLocations ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Skąd:</DropDownInfoText>
                      </View>
                      {showLocations ? locationsList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowLanguages(!showLanguages)
                          }}
                        >
                          <FontAwesome
                            name={showLanguages ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Języki:</DropDownInfoText>
                      </View>
                      {showLanguages ? languagesList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowTags(!showTags)
                          }}
                        >
                          <FontAwesome name={showTags ? 'chevron-down' : 'chevron-right'} color={'#A9A9A9'} size={18} />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Tagi:</DropDownInfoText>
                      </View>
                      {showTags ? tagsList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowCategories(!showCategories)
                          }}
                        >
                          <FontAwesome
                            name={showCategories ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Umiejętności:</DropDownInfoText>
                      </View>
                      {showCategories ? categoriesList : <></>}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {/* <SelectDropdown
              data={sort}
              defaultValueByIndex={0}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.DropdownButtonStyle}
              buttonTextStyle={styles.DropdownButtonTextStyle}
              renderDropdownIcon={(isOpened) => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.DropDownStyle1}
              rowStyle={styles.DropdownRowStyle}
              rowTextStyle={styles.DropdownRowTextStyle}
            /> */}
            <HomeTextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              backgroundColor={'#FFFFFF'}
              placeholderTextColor={'#D6D6D6'}
              placeholder='szukaj'
            />
          </HomeLabel>
          <View style={{ height: '86.5%' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 5 }}>{filteredCards}</ScrollView>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
          <ChatLabel
            style={{
              height: '8%',
              justifyContent: 'flex-start'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowArtistPage(!showArtistPage)
                clearFilters()
              }}
            >
              <FontAwesome
                name={'chevron-left'}
                color={primary}
                size={25}
                style={{ marginLeft: 5, marginRight: 60, marginTop: 5 }}
              />
            </TouchableOpacity>
            <HeaderText>Przeglądaj zlecenia</HeaderText>
          </ChatLabel>
          <HomeLabel>
            <HomeIconButton onPress={() => setShowModal(true)} activeOpacity={0.5} style={{ alignItems: 'center' }}>
              <ChatImage
                style={{ tintColor: '#A9A9A9', width: '30%', marginLeft: 10 }}
                resizeMode='cover'
                source={require('./../../assets/img/filter.png')}
              />
            </HomeIconButton>
            <Modal
              visible={showModal}
              transparent={true}
              animationType='slide'
              onRequestClose={() => setShowModal(false)}
            >
              <View style={styles.ModalStyle}>
                <View style={styles.ModalViewStyle}>
                  <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Icon name='angle-down' size={35} color={darkLight} />
                    </View>
                  </TouchableOpacity>
                  <LineForm />
                  <TouchableOpacity
                    onPress={() => {
                      clearFilters()
                    }}
                  >
                    <View style={styles.ModalButton}>
                      <AppText style={{ color: white }}>Wyczyść filtry</AppText>
                    </View>
                  </TouchableOpacity>
                  <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowLevels(!showLevels)
                          }}
                        >
                          <FontAwesome
                            name={showLevels ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Poziomy:</DropDownInfoText>
                      </View>

                      {showLevels ? levelsList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowLocations(!showLocations)
                          }}
                        >
                          <FontAwesome
                            name={showLocations ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Skąd:</DropDownInfoText>
                      </View>
                      {showLocations ? locationsList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowLanguages(!showLanguages)
                          }}
                        >
                          <FontAwesome
                            name={showLanguages ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Języki:</DropDownInfoText>
                      </View>
                      {showLanguages ? languagesList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowTags(!showTags)
                          }}
                        >
                          <FontAwesome name={showTags ? 'chevron-down' : 'chevron-right'} color={'#A9A9A9'} size={18} />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Tagi:</DropDownInfoText>
                      </View>
                      {showTags ? tagsList : <></>}
                    </View>
                    <View style={styles.ModalFilterViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowCategories(!showCategories)
                          }}
                        >
                          <FontAwesome
                            name={showCategories ? 'chevron-down' : 'chevron-right'}
                            color={'#A9A9A9'}
                            size={18}
                          />
                        </TouchableOpacity>
                        <DropDownInfoText style={{ marginLeft: 15 }}>Umiejętności:</DropDownInfoText>
                      </View>
                      {showCategories ? categoriesList : <></>}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {/* <SelectDropdown
              data={sort}
              defaultValueByIndex={0}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.DropdownButtonStyle}
              buttonTextStyle={styles.DropdownButtonTextStyle}
              renderDropdownIcon={(isOpened) => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.DropDownStyle1}
              rowStyle={styles.DropdownRowStyle}
              rowTextStyle={styles.DropdownRowTextStyle}
            /> */}
            <HomeTextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              backgroundColor={'#FFFFFF'}
              placeholderTextColor={'#D6D6D6'}
              placeholder='szukaj'
            />
          </HomeLabel>
          <View style={{ height: '86.5%' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 5 }}>{filteredCommissions}</ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  DropdownButtonStyle: {
    flex: 1,
    height: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30
  },
  DropdownButtonTextStyle: {
    fontSize: 14,
    color: '#D6D6D6',
    textAlign: 'left'
  },
  DropdownRowStyle: {
    backfroundColor: '#D6D6D6'
  },
  DropdownRowTextStyle: {
    fontSize: 14,
    color: darkLight,
    textAlign: 'left'
  },
  DropDownStyle1: {
    backgroundColor: primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  ModalStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  ModalViewStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '85%',
    backgroundColor: white,
    overflow: 'hidden',
    padding: 10
  },
  ModalDropdownButtonStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 40
  },
  ModalDropdownButtonTextStyle: {
    fontSize: 16,
    color: black,
    fontFamily: 'LexendDeca-VariableFont_wght',
    textAlign: 'left'
  },
  ModalDropdownRowStyle: {
    backfroundColor: '#D6D6D6'
  },
  ModalDropdownRowTextStyle: {
    fontSize: 16,
    fontFamily: 'LexendDeca-VariableFont_wght',
    color: black,
    textAlign: 'left'
  },
  ModalDropDownStyle1: {
    backgroundColor: primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  ModalFilterViewStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20
  },
  ModalButton: {
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
    backgroundColor: darkLight,
    padding: 10
  }
})
