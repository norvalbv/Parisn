import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Button, { ButtonProps } from '../';

const ButtonWithRequiredProps: FC<Required<ButtonProps>> = Button;

describe('<Button />', () => {
  test('Button props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Button text="Test Text" />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Button props with all props as required', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ButtonWithRequiredProps
            text="Test Text"
            hoveredText="Hovered Text"
            size="base"
            rounded="none"
            width="25rem"
            color="text-red-500"
            backgroundColor="bg-red-200"
            hoverColorRequired
            disabled
            loading={false}
            icon={<div>Icon</div>}
            iconPosition="left"
            onClick={jest.fn()}
            onMouseLeave={jest.fn()}
            id="Test Id"
            dataAtt="Data Attribute"
            upperCase
            classes="underline"
            fontWeight="semibold"
            type="button"
            navigateTo="/"
            borderRequired="all"
            positioning="relative"
            textOrientation=""
            hoveredAnimation
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
