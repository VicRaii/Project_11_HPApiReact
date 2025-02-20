import './VideoBG.css'

const VideoBG = () => {
  return (
    <div className='video_BG'>
      <video muted autoPlay loop>
        <source src='/assets/HogwartsBg.mp4' type='video/webm' />
      </video>
      <div className='capa'></div>
    </div>
  )
}

export default VideoBG
