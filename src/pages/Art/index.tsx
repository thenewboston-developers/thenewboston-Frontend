import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';
import ArtworkDetails from './ArtworkDetails';
import Create from './Create';
import Layout from './Layout';
import Marketplace from './Marketplace';
import * as S from './Styles';

const Art: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
          <Route path="/artworks/:id" element={<ArtworkDetails />} />
          <Route path="/create" element={<Create />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Art;
