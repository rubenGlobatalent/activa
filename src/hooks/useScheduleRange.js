import { useCallback, useMemo, useState } from "react"

const SCHEDULE_RANGE_SEPARATOR = "-"

const joinScheduleRange = (start = "", end = "", separator = SCHEDULE_RANGE_SEPARATOR) => {
    return `${start}${start && end ? separator : ""}${end}`
}

const splitScheduleRange = (timeRange = "", separator = SCHEDULE_RANGE_SEPARATOR) => {
    if (!timeRange) return ["", ""]
    const [start = "", end = ""] = timeRange.split(separator)
    return [start, end]
}

const useScheduleRange = (initialSchedule = "") => {
    const [initialStart, initialEnd] = useMemo(() => splitScheduleRange(initialSchedule), [initialSchedule])
    const [scheduleStart, setScheduleStart] = useState(initialStart)
    const [scheduleEnd, setScheduleEnd] = useState(initialEnd)

    const setSchedule = useCallback((schedule = "") => {
        const [start, end] = splitScheduleRange(schedule)
        setScheduleStart(start)
        setScheduleEnd(end)
    }, [])

    return useMemo(
        () => ({
            schedule: joinScheduleRange(scheduleStart, scheduleEnd),
            setSchedule,
            scheduleStart,
            setScheduleStart,
            scheduleEnd,
            setScheduleEnd,
        }),
        [scheduleEnd, scheduleStart, setSchedule]
    )
}

export default useScheduleRange
