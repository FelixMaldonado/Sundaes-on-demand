/* eslint-disable no-restricted-globals */
import SummaryForm from '../SummaryForm.jsx'
import { render, screen, fireEvent } from '@testing-library/react';

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

    fireEvent.click(checkbox);
    expect (checkbox).toBeChecked();
    expect (button).toBeEnabled();

    fireEvent.click(checkbox);
    expect (checkbox).not.toBeChecked();
    expect (button).toBeDisabled();
});