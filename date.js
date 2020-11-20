//  2020 - 1984 = 36
//  11 - 12 = -1
// 11 - 10 = 1
// 13 - 12 = 1

module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()

        const month = today.getUTCMonth() - birthDate.getUTCMonth()

        if (month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate() ) {
            age = age - 1
        } 
        
        return age
    },

    date: function date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${day}-${month}-${year}`,
            birthDay: `${day}/${month}`
        }
    }
}
    