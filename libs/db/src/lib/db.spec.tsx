import { render } from '@testing-library/react';

import Db from './db';

describe('Db', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Db />);
    expect(baseElement).toBeTruthy();
  });
});
