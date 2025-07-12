export const formatSuggestionsToHTML = (text) => {
  if (!text) return "";

  // Convert **bold** to <strong> tags
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert numbered list like *1. Something:* to <strong>1. Something:</strong>
  formatted = formatted.replace(/\*([0-9]+\..*?)\*\*/g, "<strong>$1</strong>");

  // Convert > quote lines to blockquote
  formatted = formatted.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");

  // Convert bullet points starting with * to <li>
  formatted = formatted.replace(/^\* (.*$)/gm, "<li>$1</li>");

  // Wrap all <li> inside <ul>
  if (formatted.includes("<li>")) {
    formatted = `<ul>${formatted}</ul>`;
  }

  return formatted;
};
