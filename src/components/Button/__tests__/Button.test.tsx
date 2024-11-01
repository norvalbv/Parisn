import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Button, { ButtonProps } from '..';

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
            theme="dark"
            text="Test Text"
            hoveredText="Hovered Text"
            size="md"
            width="25rem"
            hoverColorRequired
            disabled
            loading={false}
            icon={<div>Icon</div>}
            iconPosition="left"
            onClick={jest.fn()}
            onMouseLeave={jest.fn()}
            id="Test Id"
            testId="Data Attribute"
            className="underline"
            type="button"
            navigateTo="/"
            borderRequired="all"
            hoveredAnimation
            navigationState={{ test: 'Test 1' }}
            roundedBorders="xs"
            fontWeight="bold"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
