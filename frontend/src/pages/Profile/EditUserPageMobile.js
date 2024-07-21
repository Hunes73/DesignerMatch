import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { default as axios } from '../../api/axios';
import { COLORS } from '../../components/Colors';
import Modal from '../../components/modalTags';
import ModalLinks from '../../components/ModalLinks';
import ModalSkills from '../../components/ModalSkills';
import ModalLanguages from '../../components/ModalLanguages';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Dropdown.css';
import { useNavigate } from 'react-router-dom';
import {
  RightColumn,
  InfoRow,
  LeftColumn,
  Left,
  InputInfoText,
  Image,
  EditLeftWrapper,
  LineForm,
  ProfileWrapper,
  EditRightWrapper,
  TopSection,
  LeftInfoRow,
  HeaderText,
  BubbleWrap,
  Bubble,
  SmallInput,
  BubbleLinks,
  StyledDropDown,
  AboutInput,
  Bracket,
  NameText,
  EditProfileImage,
  EditIcon,
  XButton,
  ButtonsContainer,
  BubbleEdit,
} from './ProfileElements';
import LoadingPage from '../LoadingPage';

const { secondary, darkLight, darkLight2, primary, gray1 } = COLORS;

const FirstScreen = 1954; //wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

const AboutMe = styled.textarea`
  margin: 0px 50px;
  height: ${(props) => props.hag};
  resize: none;
  overflow: auto;
  min-height: ${(props) => props.hag};
  max-height: 60px;
  z-index: 10;
`;

const ButtonSave = styled.button`
  padding: 0.6rem 3rem;
  font-size: 1.2rem;
  margin: 0 1rem;
  display: flex;
  color: ${primary};
  border-radius: 15px;
  border: none;
  background: ${darkLight};
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  }
`;

const ButtonEdit = styled.button`
  padding: 5px 20px;
  background: ${darkLight};
  color: ${primary};
  cursor: pointer;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.4);
  display: none;
  @media screen and (max-width: 960px) {
    display: flex;
  }
`;

//UserName/UserInfo/MessageButton
const EditUserPageMobile = () => {
  const [get, setGet] = useState([]); //przechwytuje dane i na ich podstawie loguje // juz nie
  const [height, setHeight] = useState('20px'); //do zmiejszającego się textarena
  const [username, setUsername] = useState('');

  //popUp - modal
  const [showModalTags, setShowModalTags] = useState(false);
  const [showModalSkills, setShowModalSkills] = useState(false);
  const [showModalLinks, setShowModalLinks] = useState(false);
  const [showModalLanguages, setShowModalLanguages] = useState(false);

  const openModalTags = () => {
    setShowModalTags((prev) => !prev);
  };

  const openModalSkills = () => {
    setShowModalSkills((prev) => !prev);
  };

  const openModalLinks = () => {
    setShowModalLinks((prev) => !prev);
  };

  const openModalLanguages = () => {
    setShowModalLanguages((prev) => !prev);
  };

  //Hooks for working logins
  const [artistProfile, setArtistProfile] = useState(null);
  const [artistShortProfile, setArtistShortProfile] = useState(null);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  //Hooks for temp values when editing
  const [bio, setBio] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [dribble, setDribble] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const navigate = useNavigate();

  //edycja profilu
  //const [bio, setBio] = useState("");
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [date, setDate] = useState('20.07.2001'); //nie siciaga z bazy
  const [selectedImage, setSelectedImage] = useState(null);
  const [button, setButton] = useState(true);

  //do textarea
  const limitHeight = 60;
  const maxChars = 300;
  let chars;
  if (bio) chars = bio.length;
  else chars = 0;

  const citiesData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableCities',
    headers: {},
  };

  const tagsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableTags',
    headers: {},
  };

  const categoriesData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableCategories',
    headers: {},
  };

  const languagesData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableLanguages',
    headers: {},
  };

  const levelsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableLevels',
    headers: {},
  };

  const handleDeleteEducationElement = (id) => {
    setEducationList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleAddEducationElement = (
    newId,
    schoolName,
    faculty,
    fieldOfStudy,
    degree,
    startDate,
    endDate,
    description,
  ) => {
    setEducationList((prevList) => [
      ...prevList,
      {
        id: newId,
        school_name: schoolName,
        faculty: faculty,
        field_of_study: fieldOfStudy,
        degree: degree,
        start_date: startDate,
        end_date: endDate,
        description: description,
      },
    ]);
  };

  function handleChangeEducationElement(
    id,
    school_name,
    faculty,
    field_of_study,
    degree,
    start_date,
    end_date,
    description,
  ) {
    setEducationList(
      educationList.map((e) => {
        if (e.id === id) {
          e.school_name = school_name;
          e.faculty = faculty;
          e.field_of_study = field_of_study;
          e.degree = degree;
          e.start_date = start_date;
          e.end_date = end_date;
          e.description = description;
        }
        return e;
      }),
    );
  }

  function handleAddExperienceElement(id, company, city, position, description, start_date, end_date) {
    setExperienceList((experienceList) => [
      ...experienceList,
      {
        id: id,
        company: company,
        city: city,
        position: position,
        description: description,
        start_date: start_date,
        end_date: end_date,
      },
    ]);
  }

  function handleChangeExperienceElement(id, company, city, position, description, start_date, end_date) {
    setExperienceList(
      experienceList.map((e) => {
        if (e.id === id) {
          e.company = company;
          e.city = city;
          e.position = position;
          e.start_date = start_date;
          e.end_date = end_date;
          e.description = description;
        }
        return e;
      }),
    );
  }

  function handleDeleteExperienceElement(id) {
    setExperienceList(experienceList.filter((e) => e.id !== id));
  }

  function handleAddSkill(skill) {
    setSkills((skills) => [...skills, skill]);
  }

  function handleDeleteSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleAddTag(tag) {
    setTags((tags) => [...tags, tag]);
  }

  function handleDeleteTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleAddLanguage(language) {
    setLanguages((languages) => [...languages, language]);
  }

  function handleDeleteLanguage(language) {
    setLanguages(languages.filter((l) => l !== language));
  }

  //funkcje czyszczace
  function handleClearEducationList() {
    setEducationList([]);
  }

  function handleClearExperienceList() {
    setExperienceList([]);
  }

  function handleClearSkills() {
    setSkills([]);
  }

  function handleClearTags() {
    setTags([]);
  }

  function handleClearLanguages() {
    setLanguages([]);
  }

  function handleClearSkillsToAdd() {
    setSkillsToAdd([]);
  }

  // function clear() {
  //   handleClearEducationList();
  //   handleClearExperienceList();
  //   handleClearLanguages();
  //   handleClearSkills();
  //   handleClearTags();
  //   handleClearSkillsToAdd();
  //   setBio('');
  //   setLevel('');
  //   setLocation('');
  //   setDribble('');
  //   setFacebook('');
  //   setInstagram('');
  //   setTwitter('');
  //   setPinterest('');
  //   setWebsite('');
  //   setLinkedin('');
  // }

  const updateAvatar = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage, selectedImage.name);

        await axios.post('/api/artist/updateProfileImage/' + username, formData, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
          },
        });
      }
    } catch (err) {
      console.error('Error while saving data:', err);
    }
  };

  const updateArtistProfile = async () => {
    let education = educationList;
    let experience = experienceList;

    education.forEach((item) => {
      delete item.id;
    });

    experience.forEach((item) => {
      delete item.id;
    });

    try {
      const response = await axios.put(
        '/api/artist/updateProfileByUsername/' + username,
        {
          bio: bio,
          level: level,
          location: location,
          skills: skills,
          tags: tags,
          languages: languages,
          education: education,
          experience: experience,
          website: website,
          facebook: facebook,
          linkedin: linkedin,
          instagram: instagram,
          dribble: dribble,
          pinterest: pinterest,
          twitter: twitter,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        },
      );

      await updateAvatar();
      navigate('/account');
      if (response.status === 200) {
        experience = null;
        education = null;
        //navigate('/account');
      }
    } catch (error) {
      console.log('updateArtist  ', error);
      navigate('/account');
    }
  };

  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //odebranie wszsytkich wyników
        const decodeResponse = await axios.request('/auth/decodeToken', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        });

        const artistResponse = await axios.request({
          url: '/public/api/artist/getArtistProfileByUsername/' + decodeResponse.data.username,
        });

        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );

        setUsername(decodeResponse.data.username);
        setGet(artistResponse.data);
        setArtistProfile(artistResponse.data);
        setAvailableLevels(levelsResponse.data);
        setAvailableLocations(citiesResponse.data);
        setAvailableTags(tagsResponse.data);
        setAvailableCategories(categoriesResponse.data);
        setAvailableLanguages(languagesResponse.data);
      } catch (error) {
        console.log('fetchData w useEffect ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (artistShortProfile) {
      setName(artistShortProfile.firstname);
      setSurname(artistShortProfile.lastname);
    }
  }, [artistShortProfile]);

  useEffect(() => {
    if (artistProfile) {
      // clear();
      setBio(artistProfile.bio);
      setLevel(artistProfile.level);
      setLocation(artistProfile.location);
      for (let i = 0; i < artistProfile.education.length; i++) {
        handleAddEducationElement(
          i,
          artistProfile.education[i].school_name,
          artistProfile.education[i].faculty,
          artistProfile.education[i].field_of_study,
          artistProfile.education[i].degree,
          artistProfile.education[i].start_date,
          artistProfile.education[i].end_date,
          artistProfile.education[i].description,
        );
      }
      for (let i = 0; i < artistProfile.experience.length; i++) {
        handleAddExperienceElement(
          i,
          artistProfile.experience[i].company,
          artistProfile.experience[i].city,
          artistProfile.experience[i].position,
          artistProfile.experience[i].start_date,
          artistProfile.experience[i].end_date,
          artistProfile.experience[i].description,
        );
      }
      for (let i = 0; i < artistProfile.skills.length; i++) {
        handleAddSkill(artistProfile.skills[i]);
      }
      for (let i = 0; i < artistProfile.tags.length; i++) {
        handleAddTag(artistProfile.tags[i]);
      }
      for (let i = 0; i < artistProfile.languages.length; i++) {
        handleAddLanguage(artistProfile.languages[i]);
      }
      setDribble(artistProfile.dribble);
      setFacebook(artistProfile.facebook);
      setInstagram(artistProfile.instagram);
      setLinkedin(artistProfile.linkedin);
      setPinterest(artistProfile.pinterest);
      setTwitter(artistProfile.twitter);
      setWebsite(artistProfile.website);
    }
  }, [artistProfile]);

  function ListTags() {
    if (tags) {
      const list = tags.map((item, id) => (
        <BubbleEdit key={id} onClick={() => handleDeleteTag(item)}>
          {item} x
        </BubbleEdit>
      ));
      return (
        <>
          {list}
          <BubbleEdit onClick={openModalTags}>Dodaj +</BubbleEdit>
        </>
      );
    } else {
      return <label>pusto</label>;
    }
  }

  function ListSkills() {
    if (skills) {
      const list = skills.map((item, id) => (
        <BubbleEdit key={id} onClick={() => handleDeleteSkill(item)}>
          {item} x
        </BubbleEdit>
      ));
      return (
        <>
          {list}
          <BubbleEdit onClick={openModalSkills}>Dodaj +</BubbleEdit>
        </>
      );
    } else {
      return <label>pusta lista</label>;
    }
  }

  function ListLanguages() {
    if (languages) {
      const list = languages.map((item, id) => (
        <BubbleEdit key={id} onClick={() => handleDeleteLanguage(item)}>
          {item} x
        </BubbleEdit>
      ));
      return (
        <>
          {list}
          <BubbleEdit onClick={openModalLanguages}>Dodaj +</BubbleEdit>
        </>
      );
    } else {
      return <label>pusto</label>;
    }
  }

  function ListEducation() {
    const list = educationList.map((item) => {
      return (
        <div key={item.id}>
          <InputInfoText>Uczelnia: </InputInfoText>
          <SmallInput
            maxLength={50}
            type="text"
            defaultValue={item.school_name}
            onChange={(e) => {
              item.school_name = e.target.value;
            }}
            placeholder="Wpisz nazwę uczelni"
          />
          <InputInfoText>Kierunek: </InputInfoText>
          <SmallInput
            maxLength={100}
            type="text"
            defaultValue={item.faculty}
            onChange={(e) => {
              item.faculty = e.target.value;
            }}
            placeholder="Wpisz kierunek"
          />
          <InputInfoText>Dziedzina nauk: </InputInfoText>
          <SmallInput
            maxLength={50}
            type="text"
            defaultValue={item.field_of_study}
            onChange={(e) => {
              item.field_of_study = e.target.value;
            }}
            placeholder="Wpisz dziedzinę nauk"
          />
          <InputInfoText>Stopień: </InputInfoText>
          <SmallInput
            maxLength={30}
            type="text"
            defaultValue={item.degree}
            onChange={(e) => {
              item.degree = e.target.value;
            }}
            placeholder="Wpisz stopień"
          />
          <InputInfoText>Od: </InputInfoText>
          <SmallInput
            maxLength={10}
            type="text"
            defaultValue={item.start_date}
            onChange={(e) => {
              item.start_date = e.target.value;
            }}
            placeholder="Data rozpoczęcia, DD/MM/YYYY"
          />
          <InputInfoText>Do: </InputInfoText>
          <SmallInput
            maxLength={10}
            type="text"
            defaultValue={item.end_date}
            onChange={(e) => {
              item.end_date = e.target.value;
            }}
            placeholder="Data rozpoczęcia, DD/MM/YYYY"
          />
          <InputInfoText>Opis: </InputInfoText>
          <SmallInput
            maxLength={255}
            type="text"
            defaultValue={item.description}
            onChange={(e) => {
              item.description = e.target.value;
            }}
            placeholder="Wpisz opis"
          />
          <div style={{ alignItems: 'center' }}>
            <XButton
              onClick={() => handleDeleteEducationElement(item.id)}
              style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
            >
              Usuń
            </XButton>
          </div>
        </div>
      );
    });

    const handleAddEducationClick = () => {
      const newId = getIdOfLastEducationElement() + 1;
      handleAddEducationElement(newId, '', '', '', '', '', '', '');
    };

    const getIdOfLastEducationElement = () => {
      if (educationList.length > 0) {
        return educationList[educationList.length - 1].id;
      }
      console.log('return in getIDOfLastEducationElement ');
      return 0;
    };

    return (
      <>
        {list}
        <div style={{ alignItems: 'center' }}>
          <XButton onClick={handleAddEducationClick} style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}>
            Dodaj
          </XButton>
        </div>
      </>
    );
  }

  function ListLinks() {
    return (
      <>
        <BubbleWrap>
          {facebook && <BubbleLinks href={facebook}>facebook</BubbleLinks>}
          {instagram && <BubbleLinks href={instagram}>instagram </BubbleLinks>}
          {linkedin && <BubbleLinks href={linkedin}>linkedin </BubbleLinks>}
          {pinterest && <BubbleLinks href={pinterest}>pinterest</BubbleLinks>}
          {twitter && <BubbleLinks href={twitter}>twitter</BubbleLinks>}
          {website && <BubbleLinks href={website}>własna strona</BubbleLinks>}
        </BubbleWrap>
      </>
    );
  }

  function ListExperience() {
    const list = experienceList.map((item) => {
      return (
        <div key={item.id}>
          <InputInfoText>Nazwa firmy: </InputInfoText>
          <SmallInput
            maxLength={50}
            type="text"
            defaultValue={item.company}
            onChange={(e) => {
              item.company = e.target.value;
            }}
            placeholder="Wpisz nazwę firmy"
          />
          <InputInfoText>Miasto: </InputInfoText>
          <SmallInput
            maxLength={100}
            type="text"
            defaultValue={item.city}
            onChange={(e) => {
              item.city = e.target.value;
            }}
            placeholder="Wpisz miasto"
          />
          <InputInfoText>Stanowisko: </InputInfoText>
          <SmallInput
            maxLength={50}
            type="text"
            defaultValue={item.position}
            onChange={(e) => {
              item.position = e.target.value;
            }}
            placeholder="Wpisz stanowisko"
          />
          <InputInfoText>Od: </InputInfoText>
          <SmallInput
            maxLength={10}
            type="text"
            defaultValue={item.start_date}
            onChange={(e) => {
              item.start_date = e.target.value;
            }}
            placeholder="Datę rozpoczęcia, DD/MM/YYYY"
          />
          <InputInfoText>Do: </InputInfoText>
          <SmallInput
            maxLength={10}
            type="text"
            defaultValue={item.end_date}
            onChange={(e) => {
              item.end_date = e.target.value;
            }}
            placeholder="Datę zakończenia, DD/MM/YYYY"
          />

          <div style={{ alignItems: 'center' }}>
            <XButton
              onClick={() => handleDeleteExperienceElement(item.id)}
              style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
            >
              Usuń
            </XButton>
          </div>
        </div>
      );
    });

    const handleAddExperienceClick = () => {
      const newId = getIdOfLastExperienceElement() + 1;
      handleAddExperienceElement(newId, '', '', '', '', '', '');
    };

    const getIdOfLastExperienceElement = () => {
      if (experienceList.length > 0) {
        return experienceList[experienceList.length - 1].id;
      }
      console.log('return in getIdOfLastExperienceElement ');
      return 0;
    };

    return (
      <>
        {list}
        <div style={{ alignItems: 'center' }}>
          <XButton onClick={handleAddExperienceClick} style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}>
            Dodaj
          </XButton>
        </div>
      </>
    );
  }

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const hanldeDate = (e) => {
    setDate(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let max = `${Math.min(e.target.scrollHeight + 20, limitHeight)}px`;
      setHeight(max);
    } else {
      e.target.style.height = 'inherit';
      e.target.style.height = `${Math.min(e.target.scrollHeight, limitHeight)}px`;
      setHeight(e.target.style.height);
    }
  };

  const handleImageChange = (e) => {
    console.log('handleImageChange');
    // Wybrano plik
    const file = e.target.files[0];
    if (file) {
      // Sprawdź rozszerzenie pliku
      const extension = file.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(extension)) {
        setSelectedImage(file);
      } else {
        // Nieprawidłowy format pliku
        alert('Wybierz plik w formacie JPG, JPEG lub PNG.');
      }
    }
  };

  const handleEditImageClick = () => {
    console.log('handleEditImageClick');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageChange;
    input.click();
  };

  const handleCancel = () => {
    navigate('/account');
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <Modal showModal={showModalTags} setShowModal={setShowModalTags} tags={tags} setTags={setTags} />
      <ModalSkills
        showModal={showModalSkills}
        setShowModal={setShowModalSkills}
        skills={skills}
        setSkills={setSkills}
      />
      <ModalLinks
        showModal={showModalLinks}
        setShowModal={setShowModalLinks}
        dribble={dribble}
        setDribble={setDribble}
        facebook={facebook}
        setFacebook={setFacebook}
        instagram={instagram}
        setInstagram={setInstagram}
        linkedin={linkedin}
        setLinkedin={setLinkedin}
        pinterest={pinterest}
        setPinterest={setPinterest}
        twitter={twitter}
        setTwitter={setTwitter}
        website={website}
        setWebsite={setWebsite}
      />
      <ModalLanguages
        showModal={showModalLanguages}
        setShowModal={setShowModalLanguages}
        languages={languages}
        setLanguages={setLanguages}
      />
      {artistProfile ? (
        <ProfileWrapper>
          <TopSection>
            <EditLeftWrapper>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <EditProfileImage onClick={handleEditImageClick}>
                  {selectedImage ? (
                    <Image src={URL.createObjectURL(selectedImage)} alt="Profile" />
                  ) : (
                    <Image
                      src={'/public/api/artist/getProfileImageByUsername/' + get.username}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/cards/defaultavatar.png';
                      }}
                      alt="Profile"
                    />
                  )}
                  <EditIcon size={40} />
                </EditProfileImage>
                {/* <ButtonEdit style={{ marginTop: "5px", marginBottom: "10px" }}>Zmień zdjęcie</ButtonEdit> */}
                <NameText style={{ marginTop: '1rem' }}>
                  {get.firstname} {get.lastname}
                </NameText>
              </div>
              {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
              <div style={{ width: '100%' }}>
                <InputInfoText>Poziom doświadczenia:</InputInfoText>
                {!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages && (
                  <StyledDropDown
                    className="dropdown-level"
                    options={availableLevels}
                    onChange={(e) => setLevel(e.value)}
                    value={level}
                    placeholder="Wybierz"
                  />
                )}
              </div>
            </EditLeftWrapper>
            <EditRightWrapper>
              <InputInfoText>O mnie: </InputInfoText>
              <AboutInput value={bio} onChange={(e) => setBio(e.target.value)} />
              <Bracket>
                ({chars}/{maxChars})
              </Bracket>
              <Left>
                <LineForm />
                <InfoRow>
                  <LeftColumn>
                    <InputInfoText>Miejscowość:</InputInfoText>
                    {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
                    {!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages && (
                      <StyledDropDown
                        options={availableLocations}
                        onChange={(e) => setLocation(e.value)}
                        value={location}
                        placeholder="Wybierz"
                      />
                    )}
                    <LineForm />
                    <HeaderText>Umiejętności:</HeaderText>
                    <BubbleWrap>
                      <ListSkills />
                    </BubbleWrap>
                    <LineForm />
                    <HeaderText>Języki:</HeaderText>
                    <BubbleWrap>
                      <ListLanguages />
                    </BubbleWrap>
                    <LineForm />
                    <HeaderText>Tagi:</HeaderText>
                    <BubbleWrap>
                      <ListTags />
                    </BubbleWrap>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Media społecznościowe:</HeaderText>
                      <XButton style={{ height: '2rem' }} onClick={openModalLinks}>
                        Edytuj
                      </XButton>
                    </LeftInfoRow>
                    <ListLinks />
                  </LeftColumn>
                  <RightColumn>
                    <HeaderText>Wykształcenie:</HeaderText>
                    <ListEducation />
                    <LineForm />
                    <HeaderText>Doświadczenie zawodowe:</HeaderText>
                    <ListExperience />
                  </RightColumn>
                </InfoRow>
              </Left>
            </EditRightWrapper>
          </TopSection>
          {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
          <ButtonsContainer>
            {!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages && (
              <ButtonSave style={{ background: secondary }} onClick={handleCancel}>
                Anuluj
              </ButtonSave>
            )}
            {!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages && (
              <ButtonSave onClick={updateArtistProfile}>Zapisz</ButtonSave>
            )}
          </ButtonsContainer>
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default EditUserPageMobile;
