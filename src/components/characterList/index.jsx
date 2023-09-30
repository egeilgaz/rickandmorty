import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useCharacters,
  fetchCharactersData,
  resetCharactersData,
} from '../../services/getCharacters'
import CharacterCard from '../characterCart'
import { MdFilterAlt } from 'react-icons/md'
import Modal from '../modal/index'

function CharacterList() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [selectedData, setSelectedData] = useState('')
  const { characters, loading, error } = useCharacters()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCharactersData(page, selectedData))
  }, [page, dispatch, selectedData])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    //sayfanın aşağısına gelince page'i bir artırıyoruz istek atmak için
    if (
      window.innerHeight +
        document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleRadioChange = (data) => {
    setSelectedData(data)
    setPage(1)
    dispatch(resetCharactersData())
    closeModal()
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <h2 className='list-title'>
        {selectedData ? selectedData : 'Rick And Morty'}

        <MdFilterAlt
          data-testid='open-modal-button'
          className='filter-icon'
          onClick={openModal}
        />
      </h2>
      <div className='list-container'>
        {characters.map((character) => (
          <CharacterCard
            key={character.id + character.name}
            character={character}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onRadioChange={handleRadioChange}
      />
      {loading && <div>yükleniyor</div>}
    </>
  )
}

export default CharacterList
