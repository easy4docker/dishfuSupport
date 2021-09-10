import React from 'react';

const StarRating = ({ value, readOnly }) => {
  const [rating, setRating] = React.useState(parseInt(value, 10) || 0);
  const [selection, setSelection] = React.useState(0);

  const Star = ({ marked, starId }) => { //'\u2606'
    return (
      <span data-star-id={starId} className="star" role="button">
        {marked ? '\u2605' : '\u2606'}
      </span>
    );
  };

  const hoverOver = event => {
  let val = 0;
    if (event && event.target && event.target.getAttribute('data-star-id'))
    val = event.target.getAttribute('data-star-id');
    setSelection(val);
  };
  return (!readOnly) ? (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={e => setRating(e.target.getAttribute('data-star-id') || rating)}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  ) : (
    <div>
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};
export default StarRating;
