import React, { useEffect, useReducer, useState } from 'react';

const sutdentList = [
  { id: 101, name: 'jahid', subject: 'One', roll: '01' },
  { id: 102, name: 'Sharif', subject: 'Two', roll: '02' },
  { id: 103, name: 'Anamul', subject: 'Nine', roll: '03' },
  { id: 104, name: 'Hanif', subject: 'Three', roll: '04' },
];

const UseReducer = () => {
  const [students, setStudents] = useState('');
  const [subject, setSubject] = useState('');
  const [roll, setRoll] = useState('');
  const [search, setSearch] = useState('');
  const reducer = (state, action) => {
    if (action.type === 'ADD') {
      const studentAll = [...state.name, action.payload];
      return {
        ...state,
        name: studentAll,
        isModalOpen: true,
        modalText: 'Student is added',
      };
    }
    if (action.type === 'REMOVE') {
      const filtered = [...state.name].filter(
        (name) => name.id !== action.payload
      );
      return {
        ...state,
        name: filtered,
        isModalOpen: true,
        modalText: 'Student is Removed',
      };
    }
    if (action.type === 'SEARCH') {
      const searched = [...state.name].filter((searchValue) => {
        const value = searchValue.name.toLowerCase();
        return value.startsWith(action.payload.toLowerCase());
      });
      return {
        ...state,
        name: searched,
      };
    }
    return state;
  };

  const initialState = {
    name: sutdentList,
    isModalOpen: false,
    modalText: '',
  };

  const [studentListState, dispatch] = useReducer(reducer, initialState);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const studentNew = {
      id: new Date().getTime().toString(),
      name: students,
      subject: subject,
      roll: roll,
    };
    dispatch({ type: 'ADD', payload: studentNew });
    setStudents('');
    setSubject('');
    setRoll('');
  };

  const Modal = ({ modalText }) => {
    return <p>{modalText}</p>;
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: 'SEARCH', payload: search });
  }, [search]);
  return (
    <div>
      <h2>My Student App (first time)</h2>
      <form className="border" onSubmit={handleAddStudent}>
        <div className="mb-3">
          <label htmlFor="name">
            Name:
            <input
              placeholder="Enter Your Name"
              type="text"
              value={students}
              onChange={(e) => setStudents(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="subject">
            Class:
            <input
              placeholder="Enter Your Class"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="roll">
            Roll No:
            <input
              placeholder="Enter Your Roll"
              type="text"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="bg-info" type="submit">
          Add Student
        </button>
      </form>

      {studentListState.isModalOpen && (
        <Modal modalText={studentListState.modalText} />
      )}

      <input
        className="mt-3"
        placeholder="Search Student"
        value={search}
        onChange={handleSearch}
      />

      {studentListState.name.map((student) => {
        const { id, name, subject, roll } = student;
        return (
          <div key={id} className="border m-2 bg-secondary text-light ">
            <li className="border ">ID: {id}</li>
            <li className="border">Name: {name}</li>
            <li className="border">Class: {subject}</li>
            <li className="border">Roll No: {roll}</li>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleRemove(id);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UseReducer;
