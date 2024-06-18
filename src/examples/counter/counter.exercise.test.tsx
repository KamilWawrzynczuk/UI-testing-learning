// @vitest-environment jsdom

import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
    render(<Counter initialCount={4000} />);
    const currentCount = screen.getByTestId('current-count');

    expect(currentCount).toHaveTextContent('400');

});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
     const { user } = render(<Counter initialCount={4000} />);
     const resetButton = screen.getByRole('button', {name: /reset/i });
     const currentCount = screen.getByTestId('current-count');
     screen.debug(currentCount)
     await user.click(resetButton);
     screen.debug(currentCount)
     expect(currentCount).toHaveTextContent('0');
  },
);
