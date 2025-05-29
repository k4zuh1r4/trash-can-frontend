export const formatDate = (dateString) => {
    try {
        return format(new Date(dateString), 'MMM dd, yyyy • h:mm a')
    } catch (e) {
        return dateString || 'N/A'
    }
}