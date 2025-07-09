export const calculateMatchScore = (resumeText, jobDescription) => {
  if (!resumeText || !jobDescription) return 0;

  const resumeWords = resumeText.toLowerCase().split(/\W+/);
  const jdWords = jobDescription.toLowerCase().split(/\W+/);
  const jdSet = new Set(jdWords);
  let matchCount = 0;

  for (let word of resumeWords) {
    if (jdSet.has(word)) matchCount++;
  }

  const score = (matchCount / jdWords.length) * 100;

  return parseFloat(score.toFixed(2));
};
