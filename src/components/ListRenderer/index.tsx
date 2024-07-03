import React from 'react';

interface ListRendererProps {
  dataLength: number;
  renderItem: (index: number) => React.ReactNode;
}

const ListRenderer: React.FC<ListRendererProps> = ({dataLength, renderItem}) => {
  return (
    <React.Fragment>
      {Array.from({length: dataLength}, (_, index) => (
        <div key={index}>{renderItem(index)}</div>
      ))}
    </React.Fragment>
  );
};

export default ListRenderer;
