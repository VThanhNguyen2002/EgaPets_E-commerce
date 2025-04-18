// src/utils/faceUtils.js

/**
 * Tạo histogram 64 buckets từ buffer.
 * Mỗi bucket phủ 4 giá trị byte:
 *   Bucket0 = bytes [0..3]
 *   Bucket1 = bytes [4..7]
 *   ...
 *   Bucket63 = bytes [252..255]
 */
function createHistogram(buffer) {
    const buckets = new Array(64).fill(0);
  
    for (let i = 0; i < buffer.length; i++) {
      const val = buffer[i]; // byte 0..255
      const bucketIndex = Math.floor(val / 4); 
      buckets[bucketIndex]++;
    }
  
    // Normalize (đưa về [0..1])
    const total = buffer.length;
    for (let j = 0; j < 64; j++) {
      buckets[j] = buckets[j] / total;
    }
  
    return buckets;
  }
  
  /**
   * Tính dot product giữa 2 vector
   */
  function dotProduct(vecA, vecB) {
    let sum = 0;
    for (let i = 0; i < vecA.length; i++) {
      sum += vecA[i] * vecB[i];
    }
    return sum;
  }
  
  /**
   * Tính norm (độ dài vector) = sqrt(∑(x_i^2))
   */
  function vectorNorm(vec) {
    let sumSq = 0;
    for (let i = 0; i < vec.length; i++) {
      sumSq += vec[i] * vec[i];
    }
    return Math.sqrt(sumSq);
  }
  
  /**
   * Tính cosine similarity (giống nhau) giữa 2 vector
   * similarity = (A · B) / (||A|| * ||B||)
   */
  function cosineSimilarity(vecA, vecB) {
    const dot = dotProduct(vecA, vecB);
    const normA = vectorNorm(vecA);
    const normB = vectorNorm(vecB);
  
    if (normA === 0 || normB === 0) {
      // Trường hợp hiếm khi buffer trống, tránh chia 0
      return 0;
    }
  
    return dot / (normA * normB);
  }
  
  /**
   * Cuối cùng, cosine distance = 1 - cosine similarity
   * => Càng nhỏ thì 2 vector càng giống
   */
  function computeCosineDistance(bufA, bufB) {
    // 1) Tạo histogram 64 buckets
    const histA = createHistogram(bufA);
    const histB = createHistogram(bufB);
  
    // 2) Tính độ tương đồng
    const sim = cosineSimilarity(histA, histB);
  
    // 3) Khoảng cách = 1 - similarity
    return 1 - sim;
  }
  
  module.exports = {
    computeCosineDistance
  };
  