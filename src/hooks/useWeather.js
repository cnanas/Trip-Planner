import { useState, useEffect } from 'react'

const WMO = {
  0:  { label: 'Clear',         icon: 'sun'      },
  1:  { label: 'Mainly Clear',  icon: 'sun'      },
  2:  { label: 'Partly Cloudy', icon: 'cloud-sun' },
  3:  { label: 'Overcast',      icon: 'cloud'    },
  45: { label: 'Foggy',         icon: 'fog'      },
  48: { label: 'Foggy',         icon: 'fog'      },
  51: { label: 'Drizzle',       icon: 'drizzle'  },
  53: { label: 'Drizzle',       icon: 'drizzle'  },
  55: { label: 'Drizzle',       icon: 'drizzle'  },
  61: { label: 'Rain',          icon: 'rain'     },
  63: { label: 'Rain',          icon: 'rain'     },
  65: { label: 'Heavy Rain',    icon: 'rain'     },
  71: { label: 'Snow',          icon: 'snow'     },
  73: { label: 'Snow',          icon: 'snow'     },
  75: { label: 'Heavy Snow',    icon: 'snow'     },
  77: { label: 'Snow',          icon: 'snow'     },
  80: { label: 'Showers',       icon: 'rain'     },
  81: { label: 'Showers',       icon: 'rain'     },
  82: { label: 'Showers',       icon: 'rain'     },
  85: { label: 'Snow Showers',  icon: 'snow'     },
  86: { label: 'Snow Showers',  icon: 'snow'     },
  95: { label: 'Thunderstorm',  icon: 'thunder'  },
  96: { label: 'Thunderstorm',  icon: 'thunder'  },
  99: { label: 'Thunderstorm',  icon: 'thunder'  },
}

export function getCondition(code) {
  return WMO[code] ?? { label: 'Unknown', icon: 'cloud' }
}

export function useWeather(lat, lng, date) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!lat || !lng || !date) return
    let cancelled = false
    setLoading(true)

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
      `&temperature_unit=fahrenheit&timezone=auto&start_date=${date}&end_date=${date}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        const d = data.daily
        if (d?.temperature_2m_max?.[0] != null) {
          setWeather({
            high: Math.round(d.temperature_2m_max[0]),
            low: Math.round(d.temperature_2m_min[0]),
            code: d.weathercode[0],
          })
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [lat, lng, date])

  return { weather, loading }
}
