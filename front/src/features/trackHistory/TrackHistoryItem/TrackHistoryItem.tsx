import React from 'react';

interface IProps {
  title: string;
  datetime: string;
  artist: string;
}

const TrackHistoryItem: React.FC<IProps> = ({ title, artist, datetime }) => {
  return (
    <div>
      <div className="music">
        <p className="music-number">{artist}</p>
        <p className="music-title">{title}</p>
        <p className="music-duration">{datetime}</p>
      </div>
    </div>
  );
};

export default TrackHistoryItem;
