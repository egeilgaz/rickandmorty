import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import PropTypes from 'prop-types'

Modal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  onRadioChange: PropTypes.func,
}

function Modal({ isOpen, closeModal, onRadioChange }) {
  const [value, setValue] = useState('')

  const handleRadioChange = (event) => {
    setValue(event.target.value)
    onRadioChange(event.target.value)
  }

  return (
    isOpen && (
      <div className='modal'>
        <div className='modal-content'>
          <div className='modal-title'>
            <h3 className='title'>Filter</h3>
            <span
              className='close'
              data-testid='close-modal-button'
              onClick={closeModal}
            >
              <AiOutlineClose />
            </span>
          </div>
          <label className='radio-input' htmlFor='rick'>
            Rick
            <input
              id='rick'
              type='radio'
              name='rickormorty'
              value='Rick'
              checked={value === 'Rick'}
              data-testid='radio-option'
              onChange={handleRadioChange}
            />
          </label>

          <label className='radio-input' htmlFor='morty'>
            Morty
            <input
              type='radio'
              name='rickormorty'
              id='morty'
              value='Morty'
              checked={value === 'Morty'}
              onChange={handleRadioChange}
            />
          </label>
        </div>
      </div>
    )
  )
}

export default Modal
