import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextareaEdit } from '@/components/DoctorCard/ReportError/InlineEdit';

const apples = 'apples';
const oranges = 'oranges';

const TestComponent = function TestComponent() {
  const [value, setValue] = useState(apples);
  return <TextareaEdit value={value} setValue={setValue} name="test-name" />;
};

describe('Inline Edit component', () => {
  test('should save input and lose focus when user presses enter', () => {
    render(<TestComponent />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, `{selectall}${oranges}{enter}`);
    // RTL doesn't properly trigger component's onBlur()
    fireEvent.blur(input);

    expect(input).not.toHaveFocus();
    expect(input).toHaveValue(oranges);
  });
});
