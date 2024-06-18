// @vitest-environment happy-dom

import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from "./test/utilities";

test('it should render the component', () => {
  render(<Counter />)
  // screen.debug(document.body)
});

test(
  'it should increment when the "Increment" button is pressed',
  async () => {
    const { user } = render(<Counter />);
    const currentCount = screen.getByTestId('current-count');
    expect(currentCount).toHaveTextContent('0');
    const incrementButton = screen.getByRole('button', {name: 'Increment'})
    fireEvent.click(incrementButton);
    expect(currentCount).toHaveTextContent('1');
    await user.click(incrementButton);
    expect(currentCount).toHaveTextContent('2');
    // screen.debug();
  },
);
