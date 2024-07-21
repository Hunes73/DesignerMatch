import React, { useState } from 'react';

function ListEducation() {
  const [educationList, setEducationList] = useState([]);

  const handleDeleteEducationElement = (id) => {
    setEducationList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleAddEducationElement = (
    newId,
    faculty,
    schoolName,
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
        faculty,
        school_name: schoolName,
        field_of_study: fieldOfStudy,
        degree,
        start_date: startDate,
        end_date: endDate,
        description,
      },
    ]);
  };

  const list = educationList.map((item) => {
    return (
      <div className="ListElement" style={{ marginBottom: 10 }} key={item.id}>
        <div style={{ marginBottom: 10 }}>
          <span>Kierunek: </span>
          <input
            maxLength={50}
            type="text"
            style={{ flexWrap: 'wrap', width: '82%' }}
            defaultValue={item.faculty}
            onChange={(e) => {
              item.faculty = e.target.value;
            }}
            placeholder="Wpisz kierunek"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <span>Uczelnia: </span>
          <input
            maxLength={100}
            type="text"
            style={{ flexWrap: 'wrap', width: '83%' }}
            defaultValue={item.school_name}
            onChange={(e) => {
              item.school_name = e.target.value;
            }}
            placeholder="Wpisz nazwę uczelni"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <span>Dziedzina nauk: </span>
          <input
            maxLength={50}
            type="text"
            style={{ flexWrap: 'wrap', width: '71%' }}
            defaultValue={item.field_of_study}
            onChange={(e) => {
              item.field_of_study = e.target.value;
            }}
            placeholder="Wpisz dziedzinę nauk"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <span>Stopień: </span>
          <input
            maxLength={30}
            type="text"
            style={{ flexWrap: 'wrap', width: '30%' }}
            defaultValue={item.degree}
            onChange={(e) => {
              item.degree = e.target.value;
            }}
            placeholder="Wpisz stopień"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <span>Od: </span>
          <input
            maxLength={7}
            type="text"
            style={{ flexWrap: 'wrap', width: '20%' }}
            defaultValue={item.start_date}
            onChange={(e) => {
              item.start_date = e.target.value;
            }}
            placeholder="Wpisz datę rozpoczęcia w formacie MM/YYYY"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <span>Opis: </span>
          <input
            maxLength={255}
            type="text"
            style={{ flexWrap: 'wrap', width: '90%' }}
            defaultValue={item.description}
            onChange={(e) => {
              item.description = e.target.value;
            }}
            placeholder="Wpisz opis"
          />
        </div>
        <div style={{ alignItems: 'center' }}>
          <button
            onClick={() => handleDeleteEducationElement(item.id)}
            style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
          >
            Usuń
          </button>
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
    return 0;
  };

  return (
    <>
      {list}
      <div style={{ alignItems: 'center' }}>
        <button onClick={handleAddEducationClick} style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}>
          Dodaj
        </button>
      </div>
    </>
  );
}
