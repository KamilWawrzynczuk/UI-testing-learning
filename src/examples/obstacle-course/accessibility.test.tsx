import { render, screen } from 'test/utilities';
import { axe, toHaveNoViolations } from 'jest-axe';
import ObstacleCourse from '.';

expect.extend(toHaveNoViolations);

// it('should demonstrate this matcher`s usage', async () => {
//   const { container } = render(<ObstacleCourse />);
//   const results = await axe(container);

//   expect(results).toHaveNoViolations();
// });

expect.extend(toHaveNoViolations);

it('should be accessible', async ()=>{
  const { container } = render(<ObstacleCourse />);
  const result = await axe(container, {
    rules: {
      'label': {enabled: true}
    }
  });

  expect(result).toHaveNoViolations();
});


// it('should ensure every input has a corresponding label', () => {
//   render(<ObstacleCourse />);

//   const inputs = screen.getAllByRole('textbox'); // Adjust the role as needed (e.g., 'textbox' for input fields)

//   inputs.forEach(input => {
//     const id = input.getAttribute('id');
//     const label = screen.getByLabelText(new RegExp(`${id}`, 'i'));
//     expect(label).toBeInTheDocument();
//   });
// });
