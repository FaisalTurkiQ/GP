function estimateTokenCount(text) {
    // Split the text into "words" based on spaces and punctuation
    const words = text.match(/\S+|\n/g) || [];
  
    let tokenCount = 0;
  
    words.forEach(word => {
      // Simple heuristic to account for common punctuation as separate tokens
      const punctuationAdjusted = word.replace(/[\.,!?;:]/g, '');
      tokenCount += punctuationAdjusted.length > 0 ? 1 : 0;
      tokenCount += word.length - punctuationAdjusted.length;
    });
  
    return tokenCount;
}

module.exports = estimateTokenCount