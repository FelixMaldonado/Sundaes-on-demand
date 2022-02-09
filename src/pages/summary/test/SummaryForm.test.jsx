/* eslint-disable no-restricted-globals */
import SummaryForm from '../SummaryForm.jsx'
import { render, screen, /*fireEvent*/ waitForElementToBeRemoved } from '@testing-library/react';  // fireEvent is commented out cause we replaced with userEvent
                                                                         // userEvent is a better choice to use over fireEvent   \
                                                                       
import userEvent from '@testing-library/user-event';

test('Initial Conditions', () => {
    render(<SummaryForm />);

    const button = screen.getByRole('button', {name: /confirm order/i});
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});

    expect (checkbox).not.toBeChecked();
    expect (button).toBeDisabled();
});

test('Checkbox disables button on first click and enables on second click', () => {
    render(<SummaryForm />);

    const button = screen.getByRole('button', {name: /confirm order/i});
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});

    userEvent.click(checkbox);
    expect (checkbox).toBeChecked();
    expect (button).toBeEnabled();

    userEvent.click(checkbox);
    expect (checkbox).not.toBeChecked();
    expect (button).toBeDisabled();
});

test('popover responds to hover', async () => {
    render(<SummaryForm />);
    
    //popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect (nullPopover).not.toBeInTheDocument();

    //popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    //popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actualy be delivered/i));

});