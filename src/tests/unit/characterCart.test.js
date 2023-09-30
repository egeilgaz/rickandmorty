import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from '../../components/characterCart/index';
import '@testing-library/jest-dom/extend-expect'

const characterData = {
  id: "1",
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: {
    name: 'Citadel of Ricks'
  }
};

test('CharacterCard doğru şekilde render ediliyor', () => {

  render(<CharacterCard character={characterData} />);


  const characterImage = screen.getByAltText(characterData.name);
  const characterId = screen.getByText(characterData.id);
  const characterName = screen.getByText(characterData.name);
  const characterLocation = screen.getByText(characterData.location.name);


  expect(characterImage).toBeInTheDocument();
  expect(characterId).toBeInTheDocument();
  expect(characterName).toBeInTheDocument();
  expect(characterLocation).toBeInTheDocument();
});

