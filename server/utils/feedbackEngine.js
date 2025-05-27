// server/utils/feedbackEngine.js
import natural from 'natural';
import sw from 'stopword';

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Preprocess text: tokenize, lowercase, remove stopwords, stem words
function preprocess(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const filtered = sw.removeStopwords(tokens);
  return filtered.map(word => stemmer.stem(word));
}

// Count frequency of each word
function frequencyMap(words) {
  return words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
}

// Extract top N keywords from job description based on frequency
function extractKeywords(jobDescription, topN = 20) {
  const words = preprocess(jobDescription);
  const freq = frequencyMap(words);

  const sortedWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  return sortedWords.slice(0, topN);
}

// Generate detailed feedback comparing resume content with job description keywords
export function generateDynamicFeedback(resumeText, jobDescription) {
  const resumeWords = new Set(preprocess(resumeText));
  const jdKeywords = extractKeywords(jobDescription);

  const missing = jdKeywords.filter(k => !resumeWords.has(k));
  const matched = jdKeywords.filter(k => resumeWords.has(k));

  const feedback = [];

  if (matched.length > 5) {
    feedback.push(
      `Your resume already includes important keywords such as: ${matched.slice(0, 5).join(', ')}...`
    );
  } else if (matched.length > 0) {
    feedback.push(
      `Your resume contains some relevant keywords: ${matched.join(', ')}.`
    );
  } else {
    feedback.push(
      "Your resume currently lacks key terms from the job description."
    );
  }

  if (missing.length > 0) {
    feedback.push(
      `Consider adding or emphasizing keywords like: ${missing.slice(0, 10).join(', ')} to better match the job description.`
    );
  } else {
    feedback.push("Excellent! Your resume covers most important terms from the job description.");
  }

  return {
    missingKeywords: missing.slice(0, 10),
    feedback
  };
}
