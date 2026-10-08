export function formatDate(date: string): string {
    const [year, month, day] = date.split("-");
    const formattedDate = new Date(
        Number(year), 
        Number(month) - 1, 
        Number(day)
    )
    return formattedDate.toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric', 
        year: 'numeric'
    })
}
