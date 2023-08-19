import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import KanbanBoard from './components/KanbanBoard';
import React, { useState, useEffect } from 'react';


import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretDown);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {



  
  const [cardData, setCardData] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem('groupingOption') || 'status'
  );
  const [sortingOption, setSortingOption] = useState(
    localStorage.getItem('sortingOption') || 'priority'
  );

  const handleGroupingChange = event => {
    const newGroupingOption = event.target.value;
    setGroupingOption(newGroupingOption);
    localStorage.setItem('groupingOption', newGroupingOption);
  };

  const handleSortingChange = event => {
    const newSortingOption = event.target.value;
    setSortingOption(newSortingOption);
    localStorage.setItem('sortingOption', newSortingOption);
  };

  useEffect(() => {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortingOption = localStorage.getItem('sortingOption');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }

    if (savedSortingOption) {
      setSortingOption(savedSortingOption);
    }
  }, []);

  useEffect(() => {



    
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setCardData(data.tickets);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="app">
      <div className="controls">
        <label>Group by:</label>
        <select
          value={groupingOption}
          onChange={event => {
            setGroupingOption(event.target.value);
            localStorage.setItem('groupingOption', event.target.value);
          }}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
  
        <label>Sort by:</label>
        <select
          value={sortingOption}
          onChange={event => {
            setSortingOption(event.target.value);
            localStorage.setItem('sortingOption', event.target.value);
          }}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      <KanbanBoard
        data={cardData}
        groupingOption={groupingOption}
        sortingOption={sortingOption}
      />
    </div>
  );
  
}
export default App;

