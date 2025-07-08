import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component', () => {
  // Vérifie que le lien "learn react" est affiché
  test('affiche le lien "learn react"', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  // Vérifie que la page de connexion est affichée
  test('affiche la page de connexion', () => {
    render(<App />);
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });
});