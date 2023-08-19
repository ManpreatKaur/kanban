import React from 'react';

const Column = ({ status, cards }) => {
  return (
    <div className="column">
      <h2>{status}</h2>
      <div className="cards">
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div className="card">
      <h3>ID: {card.id}</h3>
      <h4>{card.title}</h4>
      <div className="tags">
        {card.tag.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p>Assigned To: {card.userId}</p>
      <p>Priority: {card.priority}</p>
    </div>
  );
};

const KanbanBoard = ({ data, groupingOption, sortingOption }) => {
  const groupedCards = data.reduce((groups, card) => {
    const key = groupingOption === 'user' ? card.userId : card[groupingOption];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(card);
    return groups;
  }, {});

  for (const key in groupedCards) {
    const group = groupedCards[key];
    group.sort((a, b) => {
      if (sortingOption === 'priority') {
        return b.priority - a.priority;
      } else if (sortingOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }

  return (
    <div className="kanban-board">
      {Object.keys(groupedCards).map(groupKey => (
        <Column key={groupKey} status={groupKey} cards={groupedCards[groupKey]} />
      ))}
    </div>
  );
};

export default KanbanBoard;
