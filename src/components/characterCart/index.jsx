import PropTypes from 'prop-types'

CharacterCard.propTypes = {
  character: PropTypes.object,
}

function CharacterCard({ character }) {
  return (
    <div className='cart'>
      <img
        className='cart-image'
        src={character?.image}
        alt={character?.name}
      />
      <div className='cart-info'>
        <div className='info-up-side'>
          <div className='info-title id-title'>
            #id:
            <span className='info-value'>
              {character?.id}
            </span>
          </div>
        </div>
        <div className='info-down-side'>
          <div className='info-title'>
            Name:
            <span className='info-value'>
              {character?.name}
            </span>
          </div>
          <div className='info-title'>
            Location:
            <span className='info-value'>
              {character?.location?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
