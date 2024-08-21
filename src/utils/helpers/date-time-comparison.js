function dateTimeCompare(dateTime1, dateTime2) {
    const date1 = new Date(dateTime1)
    console.log(date1.getTime());
    const date2 = new Date(dateTime2)
    console.log(date2.getTime());

    return (date1.getTime() > date2.getTime())
}

module.exports = dateTimeCompare;

