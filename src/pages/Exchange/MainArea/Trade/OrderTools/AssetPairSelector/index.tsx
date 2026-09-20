import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import AssetPairSelectModal from 'modals/AssetPairSelectModal';
import {AssetPair, SFC} from 'types';

import * as S from './Styles';

interface AssetPairSelectorProps {
  activeAssetPair: AssetPair | null;
}

const AssetPairSelector: SFC<AssetPairSelectorProps> = ({activeAssetPair, className}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (newAssetPairId: string) => {
    setIsMenuOpen(false);
    navigate(`/exchange/trade/${newAssetPairId}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <S.Container className={className}>
      <S.Content
        aria-haspopup="dialog"
        aria-label={
          activeAssetPair ? `Change asset pair (${activeAssetPair.primary_currency.ticker})` : 'Select asset pair'
        }
        onClick={toggleMenu}
        type="button"
      >
        <S.ImageContainer>
          <S.Image alt="" src={activeAssetPair?.primary_currency.logo} />
        </S.ImageContainer>
        <S.Ticker>{activeAssetPair?.primary_currency.ticker}</S.Ticker>
      </S.Content>
      {isMenuOpen ? (
        <AssetPairSelectModal activeAssetPair={activeAssetPair} close={toggleMenu} handleChange={handleChange} />
      ) : null}
    </S.Container>
  );
};

export default AssetPairSelector;
