import DayCard from './DayCard'

export default function RouteTimeline({ days, hotels, stops = [], selectedDayNumber, onDaySelect }) {
  const hotelMap = Object.fromEntries(hotels.map(h => [h.day, h]))

  const stopsByDay = stops.reduce((acc, s) => {
    if (!acc[s.day]) acc[s.day] = []
    acc[s.day].push(s)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-3 p-4">
      {days.map(day => (
        <DayCard
          key={day.number}
          day={day}
          hotel={hotelMap[day.number] ?? null}
          warnings={day.warnings ?? []}
          stops={stopsByDay[day.number] ?? []}
          isSelected={day.number === selectedDayNumber}
          onClick={() => onDaySelect(day.number === selectedDayNumber ? null : day.number)}
        />
      ))}
    </div>
  )
}
