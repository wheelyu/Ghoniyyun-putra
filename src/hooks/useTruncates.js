export const truncateContent = (content, maxLength) => {
    // Hapus tag HTML
    const strippedContent = content.replace(/<[^>]+>/g, '');
    if (strippedContent.length <= maxLength) return strippedContent;
    return strippedContent.substring(0, maxLength) + '...';
};