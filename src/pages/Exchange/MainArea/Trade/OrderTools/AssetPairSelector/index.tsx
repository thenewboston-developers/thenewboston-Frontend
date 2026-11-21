import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mdiChevronDown} from '@mdi/js';
import Icon from '@mdi/react';

import AssetPairSelectModal from 'modals/AssetPairSelectModal';
import {AssetPair, SFC} from 'types';

import * as S from './Styles';

interface AssetPairSelectorProps {
  activeAssetPair: AssetPair | null;
}

const AssetPairSelector: SFC<AssetPairSelectorProps> = ({activeAssetPair, className}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        aria-expanded={isMenuOpen}
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
        <S.PairDetails>
          <S.Label>Trading pair</S.Label>
          <S.Ticker>
            {activeAssetPair
              ? `${activeAssetPair.primary_currency.ticker} / ${activeAssetPair.secondary_currency.ticker}`
              : 'Select a market'}
          </S.Ticker>
        </S.PairDetails>
        <S.Chevron>
          <Icon aria-hidden path={mdiChevronDown} size="20px" />
        </S.Chevron>
      </S.Content>
      {isMenuOpen ? (
        <AssetPairSelectModal activeAssetPair={activeAssetPair} close={toggleMenu} handleChange={handleChange} />
      ) : null}
    </S.Container>
  );
};

export default AssetPairSelector;
