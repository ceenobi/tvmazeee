import { useEffect, useState } from 'react'
import HTTP from '../config'

export default function useFetchData(url, option) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    const fetchTv = async () => {
      setLoading(true)
      await HTTP.get(url, option)
        .then((res) => {
          setData(res.data)
        })
        .catch((error) => {
          console.log(error)
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchTv()
  }, [url, option])

  return { data, error, loading }
}
