
import { render as _render, screen, waitFor } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store'
import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react';

const render: typeof _render = (Component, options) => {
  const store = createStore();

  const Wrapper = ({children}: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>
  }
  return _render(Component,  { ...options, wrapper: Wrapper} )

};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
   render(<PackingList />);
   screen.getByLabelText(/new item name/i);
});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
    render(<PackingList />);
    const addButton = screen.getByRole('button', { name: /add new item/i } )
    const newItemInput =    screen.getByLabelText(/new item name/i);
    expect(newItemInput).toHaveValue('');
    expect(addButton).toBeDisabled();
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const { user } = render(<PackingList />);
    const newItemInput = screen.getByRole('button', { name: /add new item/i } )
    const searchField = screen.getByRole('searchbox', { name: /new item name/i } )
    expect(newItemInput).toHaveValue('');
    expect(newItemInput).toBeDisabled();

    await user.type(searchField, 'MacBook Pro');
    expect(newItemInput).toBeEnabled();

  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const { user } = render(<PackingList />);
    const addNewItemInput = screen.getByRole('button', { name: /add new item/i } )
    const searchField = screen.getByRole('searchbox', { name: /new item name/i } )
    await user.type(searchField, 'MacBook Pro');
    await user.click(addNewItemInput)

    expect(screen.getByLabelText('MacBook Pro')).not.toBeChecked();

  },
);

it(
  'remove an item',
  async () => {
    const { user } = render(<PackingList />);
    const addNewItemInput = screen.getByRole('button', { name: /add new item/i } )
    const searchField = screen.getByRole('searchbox', { name: /new item name/i } )
    await user.type(searchField, 'MacBook Pro');
    await user.click(addNewItemInput)

    const removeItem = screen.getByLabelText(/remove/i)

    await user.click(removeItem);

    await waitFor(()=> expect(removeItem).not.toBeInTheDocument());
  },
);
