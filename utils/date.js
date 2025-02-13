function formatTimestampToDate(fecha) {

    const collator = new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    const fechFormateada = collator.format(fecha)

    return fechFormateada;

    // const dateObj = new Date(fecha)

    // const year = dateObj.getFullYear();
    // const month = dateObj.getMonth() + 1;

    // if(month < 10){
    //     month = "0" + month
    // }

    // const day = dateObj.getDate();

    // return `${day}/${month}/${year}`

}

function formatTimestampToInputDate (date){

    const collator = new Intl.DateTimeFormat("en-CA", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    return collator.format(date)

    // const fecha = new Date(date);

    // const year = fecha.getFullYear();

    // const month = fecha.getMonth();
}