// server/utils/atsScoringEngine.js
import natural from 'natural';
import sw from 'stopword';

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

function preprocess(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const noStopwords = sw.removeStopwords(tokens);
  const stemmed = noStopwords.map(word => stemmer.stem(word));
  return new Set(stemmed);
}

function jaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

/**
 * Enhanced feedback generator for ATS improvement
 * @param {string} resumeText - The full text of the resume
 * @param {string} jobDescription - The full text of the job description
 * @param {Array<{title: string, content: string}>} resumeSections - Sections of the resume to customize suggestions
 */
export function calculateATSScore(resumeText, jobDescription, resumeSections = []) {
  const resumeSet = preprocess(resumeText);
  const jdSet = preprocess(jobDescription);

  const similarity = jaccardSimilarity(resumeSet, jdSet);
  const score = +(similarity * 100).toFixed(2);

  // Find missing keywords
  const missingKeywords = [...jdSet].filter(word => !resumeSet.has(word));

  // Limit to 10 keywords for feedback clarity
  const topMissing = missingKeywords.slice(0, 10);

  // Build detailed suggestions
  const suggestions = [];

  if (score >= 85) {
    suggestions.push("Great! Your resume contains most relevant keywords and is well aligned with the job description.");
  } else {
    suggestions.push(`Your ATS score is ${score}%. To improve, consider the following:`);

    if (topMissing.length > 0) {
      suggestions.push(`- Include important keywords such as: ${topMissing.join(', ')}.`);
    }

    // Section-specific feedback
    if (resumeSections.length) {
      // Map section titles to missing keyword count heuristic (example)
      resumeSections.forEach(section => {
        // Count how many missing keywords appear in this section roughly (using simple substring match)
        const sectionText = section.content.toLowerCase();
        const missingInSection = topMissing.filter(kw => sectionText.includes(kw.toLowerCase()));

        if (missingInSection.length === 0) {
          // Section likely missing relevant keywords, suggest improving it
          suggestions.push(`- The "${section.title}" section could be enhanced with relevant skills or experiences matching the job description.`);
        } else {
          // Some missing keywords appear here, suggest expanding examples
          suggestions.push(`- Enhance the "${section.title}" section with more detailed examples of skills like: ${missingInSection.join(', ')}.`);
        }
      });
    }

    suggestions.push("- Tailor your resume to include specific skills, certifications, tools, and accomplishments listed in the job description.");
    suggestions.push("- Use similar terminology as in the job posting to pass automated ATS keyword scans.");
    suggestions.push("- Avoid generic phrases; be specific about your achievements and responsibilities.");
  }

  return {
    score,
    feedback: suggestions
  };
}
