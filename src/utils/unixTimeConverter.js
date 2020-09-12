const __UnixTimeConverter = (timestamp) => {
    const dateObject = new Date(parseInt(timestamp))
    const readableDateFormat = dateObject.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' })
    return readableDateFormat
}

export default __UnixTimeConverter