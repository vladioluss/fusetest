export function useformatDate(date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    }
    const d = new Date(date)
    return d.toLocaleDateString('ru', options)
}