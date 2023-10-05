import { Button } from '@mui/material';
import React from 'react';

interface IProps {
  _id: string;
  name: string;
  title?: string;
  isPublished: boolean;
  onToggle: (id: string) => void;
  onDel: (id: string) => void;
  loadingDel: boolean;
  loadingPatch: boolean;
}

const AdminItem: React.FC<IProps> = ({
  _id,
  loadingDel,
  name,
  title,
  isPublished,
  onToggle,
  onDel,
  loadingPatch,
}) => {
  const onUpdateDel = () => {
    onDel(_id);
  };

  const onUpdate = () => {
    onToggle(_id);
  };

  return (
    <div>
      <div className="tracksList" style={{ alignItems: 'center' }}>
        <p className="tracksList-track">{name}</p>
        <p className="tracksList-artist">{title}</p>
        <Button
          disabled={loadingPatch}
          sx={{ marginRight: '10px', border: '1px solid #00E20B', color: '#00E20B' }}
          onClick={() => onUpdate()}
          variant="outlined"
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </Button>
        <Button
          sx={{ color: '#00E20B', border: '1px solid #00E20B' }}
          disabled={loadingDel}
          onClick={() => onUpdateDel()}
          variant="outlined"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AdminItem;
