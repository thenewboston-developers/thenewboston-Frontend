import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft, RefreshCw} from 'lucide-react';

import {getTribesCatalog} from 'api/tribes';
import {TribesState} from 'types/tribes';
import {analyticsArea} from 'utils/analyticsAttributes';

import * as S from './DiscoveryStyles';
import Guide from './Guide';

const PublicGuide = () => {
  const [attempt, setAttempt] = useState(0);
  const [catalog, setCatalog] = useState<TribesState['catalog']>();
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);
    setLoading(true);
    getTribesCatalog(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setCatalog(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  return (
    <S.Container {...analyticsArea('tribes')}>
      <S.Content>
        <S.GuideHeader>
          <div>
            <S.Eyebrow>Tribes field guide</S.Eyebrow>
            <h1>How to play</h1>
          </div>
          <S.Button $secondary as={Link} to="/tribes">
            <ArrowLeft size={16} /> All tournaments
          </S.Button>
        </S.GuideHeader>
        <S.Muted>Learn the rules, explore resources and recipes, and plan your first tournament.</S.Muted>
        <Guide catalog={catalog} />
        {loading && <S.Hint role="status">Loading the resource and recipe catalog…</S.Hint>}
        {failed && (
          <S.Banner $tone="gold" role="status">
            <div>The rules are ready to read. The resource and recipe catalog could not be loaded.</div>
            <S.Button $size="small" onClick={() => setAttempt((value) => value + 1)}>
              <RefreshCw size={14} /> Retry catalog
            </S.Button>
          </S.Banner>
        )}
      </S.Content>
    </S.Container>
  );
};

export default PublicGuide;
