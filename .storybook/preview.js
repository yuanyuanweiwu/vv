
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/styles/index.scss'
addDecorator(withInfo); 