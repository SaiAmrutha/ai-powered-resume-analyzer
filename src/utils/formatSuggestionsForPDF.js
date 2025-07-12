export const formatSuggestionsForPDF = (suggestions) => {
  const lines = suggestions.split("\n").filter((line) => line.trim() != "");

  return lines.map((line, index) => {
    const isHeading = /^\*{1,2}(.+?)\*{1,2}:?$/.test(line.trim());
    const isBullet = /^[-*>•]/.test(line.trim());

    return {
      id: index,
      text: line.replace(/[*_]/g, "").trim(),
      type: isHeading ? "heading" : isBullet ? "bullet" : "text",
    };
  });
};
