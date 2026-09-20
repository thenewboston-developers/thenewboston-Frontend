import styled from 'styled-components';

import {List as UList} from 'components/LearnMore';

// The guide is built from the shared Learn More typography, so it reads like the other Learn More pages
export * from 'components/LearnMore';

// A list nested inside of a list item
export const NestedList = styled(UList)`
  margin-bottom: 8px;
  margin-top: 8px;
`;
