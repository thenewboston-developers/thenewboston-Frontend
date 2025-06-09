# React Component Organization Rules

## 1. Hook Organization
Order hooks at the top of components:

1. **Array destructuring hooks** - `const [variable, setter] = useXYZ()`
   - Sort alphabetically by first destructured variable name

2. **Other hooks and consts** - `const variable = useXYZ()`
   - Sort alphabetically by variable name

3. **useEffect hooks** - Place after all other hooks/consts

4. **Dependency exception** - Dependencies must come before dependents within each group

### Example:
```javascript
// BEFORE
const currencies = useSelector(getCurrencies);
const self = useSelector(getSelf);
const [postModalIsOpen, togglePostModal] = useToggle(false);
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();
const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);

// AFTER
const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
const [postModalIsOpen, togglePostModal] = useToggle(false);
const currencies = useSelector(getCurrencies);
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();
const self = useSelector(getSelf);
```

## 2. Function Organization
Order functions alphabetically, except:
- `render()` function always goes last

### Example:
```javascript
// Functions in alphabetical order
const handleClick = () => { /* ... */ };
const handleDelete = () => { /* ... */ };
const renderAvatar = () => { /* ... */ };  // render functions last
```

## 3. Props Alphabetization
Alphabetize all component props:

```javascript
// BEFORE
<Button
  text="Comment"
  color={ButtonColor.secondary}
  iconLeft={mdiComment}
  onClick={handleClick}
  $isOpen={isOpen}
/>

// AFTER
<Button
  $isOpen={isOpen}
  color={ButtonColor.secondary}
  iconLeft={mdiComment}
  onClick={handleClick}
  text="Comment"
/>
```

Use full names for functions. So instead of handleBtnClick it should be handleButtonClick for example.

## 4. Styled Components Rules

### Sort Order
1. Sort the consts alphabetically
2. Within each const, sort the CSS properties alphabetically

Only apply sorting when the order does not matter functionally.
Do NOT change the sort order when it would affect functionality.
For example:

```css
border: none;
border-bottom: 1px solid ${colors.black};
```

Otherwise the border-bottom styling would be overridden.

### Formatting Rules
- Replace `0px` with `0`
- Add blank lines above all nested blocks, such as media queries and pseudo-selectors:

```css
@media (min-width: ${breakpoints.tablet}) {
  display: block;
}

&:hover {
  background: ${colors.whiteHover};
}
```

### Color Palette Access
Use number literals instead of string literals for color palette access:

```javascript
// BEFORE
colors.palette.gray['100']

// AFTER
colors.palette.gray[100]
```

### Component Naming
- Use full names for styled components:

```javascript
// BEFORE
<S.BtnText>Unfollow</S.BtnText>

// AFTER
<S.ButtonText>Unfollow</S.ButtonText>
```

- Replace any styled component called `S.Div` with something more intuitive

### Styling Existing Components
When styling existing components, import them with a `U` prefix (for "Unstyled"):

```javascript
import styled from 'styled-components';

import {Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 360px;
`;

export const Textarea = styled(UTextarea)`
  max-height: 350px;
  overflow-y: auto;
  padding-right: 43px;
`;
```

## Notes
- Break these rules when they conflict with logic or best practices
- Use project conventions for uncertain cases

## Code Quality Checks
After making any changes, run the following commands to ensure code quality:

```bash
npm run lint:fix && npm run prettier
```

This will automatically fix linting issues and format the code according to project standards.