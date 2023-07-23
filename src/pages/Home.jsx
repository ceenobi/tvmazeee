import { useState, useEffect } from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Tvcard } from '../components'
import Loader from '../utils/Loader'
import useFetchData from '../hooks/fetchData'

export default function Home() {
  const [current, setCurrent] = useState(0)
  const { data, error, loading } = useFetchData('/shows', 'TvShows')

  useEffect(() => {
    document.title = 'TvShows Homepage'
  }, [])

  const filterRating = data.filter((show) => show.rating.average >= 8.9)
  if (error) return <p className='mt-5 py-5'>{error.message}</p>

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='d-lg-flex'>
            <Container fluid className='py-4 homeBoxA'>
              {filterRating.slice(0, 3).map((item, i) => (
                <>
                  <div
                    key={item.id}
                    className={
                      i === current ? 'bgColor text-white p-1' : 'colorText'
                    }
                    type='button'
                  >
                    <h1
                      className='text-uppercase'
                      onClick={() => setCurrent(i)}
                    >
                      {item.name}
                    </h1>
                  </div>
                  <hr />
                </>
              ))}
            </Container>
            <Container fluid className='homeBoxA bgColorB text-white py-4'>
              {filterRating.map((item, i) => (
                <div key={item.id}>
                  {i === current && (
                    <>
                      <h1 className='fs-5 fw-bold'>{item.name}</h1>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.summary.slice(0, 200) + '...',
                        }}
                      />
                      <Link to={`/tvshow/${item.id}`}>See more</Link>
                    </>
                  )}
                </div>
              ))}
            </Container>
            <div className='homeBoxB'>
              {filterRating.map((item, i) => (
                <div key={item.id}>
                  {i === current && (
                    <div className='imgBox'>
                      <Image
                        src={item.image.original}
                        className='w-100 h-100'
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Container className='mt-5 py-5'>
            <Row className='gy-4'>
              {data.slice(0, 30).map((item) => (
                <Col xs={6} md={4} lg={3} key={item.id}>
                  <Tvcard {...item} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </div>
  )
}
