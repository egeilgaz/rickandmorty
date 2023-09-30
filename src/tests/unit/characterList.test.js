import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CharacterList from '../../components/characterList/index'
import { useDispatch } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))
jest.mock('../../services/getCharacters', () => ({
  useCharacters: jest.fn(),
  fetchCharactersData: jest.fn(),
  resetCharactersData: jest.fn(),
}))

describe('CharacterList', () => {
  it('hata olmadan render edilmeli', () => {
    const mockUseCharacters = {
      characters: [],
      loading: false,
      error: null,
    }
    const mockDispatch = jest.fn()
    useDispatch.mockReturnValue(mockDispatch)

    jest
      .spyOn(
        require('../../services/getCharacters'),
        'useCharacters',
      )
      .mockReturnValue(mockUseCharacters)

    const { getByText } = render(<CharacterList />)
    const titleElement = getByText('Rick And Morty')
    expect(titleElement).toBeInTheDocument()
  })

  it('modal açılıp kapatılabilir olmalı', () => {
    const mockUseCharacters = {
      characters: [],
      loading: false,
      error: null,
    }
    jest
      .spyOn(
        require('../../services/getCharacters'),
        'useCharacters',
      )
      .mockReturnValue(mockUseCharacters)

    const { getByTestId, getByText } = render(
      <CharacterList />,
    )
    const openModalButton = getByTestId('open-modal-button')
    fireEvent.click(openModalButton)

    const modal = getByText('Filter')
    expect(modal).toBeInTheDocument()

    const closeModalButton = getByTestId(
      'close-modal-button',
    )
    fireEvent.click(closeModalButton)

    expect(modal).not.toBeInTheDocument()
  })

  it('Hata mesajı gelirse ekrana veriliyor', () => {
    const mockUseCharacters = {
      characters: [],
      loading: false,
      error: 'An error occurred',
    }
    jest
      .spyOn(
        require('../../services/getCharacters'),
        'useCharacters',
      )
      .mockReturnValue(mockUseCharacters)

    const { getByText } = render(<CharacterList />)
    const errorElement = getByText(
      'Error: An error occurred',
    )
    expect(errorElement).toBeInTheDocument()
  })

  it('modal açıldığında ve rick seçeneği seçildiğinde verileri filtrelemelidir', () => {
    const mockUseCharacters = {
      characters: [],
      loading: false,
      error: null,
    }
    jest
      .spyOn(
        require('../../services/getCharacters'),
        'useCharacters',
      )
      .mockReturnValue(mockUseCharacters)

    const { getByTestId, getByText } = render(
      <CharacterList />,
    )
    const openModalButton = getByTestId('open-modal-button')
    fireEvent.click(openModalButton)

    const radioOption = getByTestId('radio-option')
    fireEvent.click(radioOption)

    const title = getByText('Rick')

    expect(title).toBeInTheDocument()
    expect(radioOption).toBeChecked()
    expect(
      require('../../services/getCharacters')
        .resetCharactersData,
    ).toHaveBeenCalled()
  })

  it('hata olmadan veriler render edilmeli', () => {
    const mockUseCharacters = {
      characters: [
        {
          name: 'Rick Sanchez',
          id: '1',
          location: {
            name: 'Citadel of Ricks',
            __typename: 'Location',
          },
          image:
            'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          __typename: 'Character',
        },
        {
          name: 'Morty Smith',
          id: '2',
          location: {
            name: 'Citadel of Ricks',
            __typename: 'Location',
          },
          image:
            'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          __typename: 'Character',
        },
      ],
      loading: false,
      error: null,
    }
    jest
      .spyOn(
        require('../../services/getCharacters'),
        'useCharacters',
      )
      .mockReturnValue(mockUseCharacters)

    const { getByText, getByAltText } = render(
      <CharacterList />,
    )

    const rickName = getByText('Rick Sanchez')
    const mortyName = getByText('Morty Smith')
    const rickImage = getByAltText('Rick Sanchez')
    const mortyImage = getByAltText('Morty Smith')

    expect(rickName).toBeInTheDocument()
    expect(mortyName).toBeInTheDocument()
    expect(rickImage).toBeInTheDocument()
    expect(mortyImage).toBeInTheDocument()
  })
})
