import React, { useReducer, useState } from 'react';

const sutdentList = [
  { id: 101, name: 'jahid', subject: 'One' },
  { id: 102, name: 'Sharif', subject: 'Two' },
  { id: 103, name: 'Anamul', subject: 'Nine' },
  { id: 104, name: 'Hanif', subject: 'Three' },
];

const UseReducer = () => {
  const [students, setStudents] = useState('');
  const [subject, setSubject] = useState('');
  const reducer = (state, action) => {
    if (action.type === 'ADD') {
      const studentAll = [...state.name, action.payload];
      return {
        ...state,
        name: studentAll,
        isModalOpen: true,
        modalText: 'Book is added',
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
        modalText: 'Book is Removed',
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
    };
    dispatch({ type: 'ADD', payload: studentNew });
    setStudents('');
    setSubject('');
  };

  const Modal = ({ modalText }) => {
    return <p>{modalText}</p>;
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };
  return (
    <div>
      <h2>My Student App (first time)</h2>
      <form onSubmit={handleAddStudent}>
        <div className="mb-3">
          <label htmlFor="name">
            Name:
            <input
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
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
      {studentListState.name.map((student) => {
        const { id, name, subject } = student;
        return (
          <div key={id} className="border m-2 bg-secondary text-light ">
            <li className="border">ID: {id}</li>
            <li className="border">Name: {name}</li>
            <li className="border">Class: {subject}</li>
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
