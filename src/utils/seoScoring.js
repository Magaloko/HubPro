export function calculateSEOScore({ title = '', content = '', keyword = '', metaTitle = '', metaDescription = '', wordCount = 0 }) {
  const breakdown = []
  const kw = keyword.toLowerCase()

  // 1. Keyword in title/H1 (20 points)
  const titleHasKw = kw && title.toLowerCase().includes(kw)
  breakdown.push({ label: 'Keyword im Titel (H1)', points: titleHasKw ? 20 : 0, maxPoints: 20, passed: titleHasKw })

  // 2. Keyword in first 10% of content (15 points)
  const textContent = content.replace(/<[^>]*>/g, '')
  const first10 = textContent.substring(0, Math.ceil(textContent.length * 0.1)).toLowerCase()
  const earlyKw = kw && first10.includes(kw)
  breakdown.push({ label: 'Keyword in den ersten 10%', points: earlyKw ? 15 : 0, maxPoints: 15, passed: earlyKw })

  // 3. Optimal length (20 points)
  let lengthPoints = 5
  if (wordCount >= 1500 && wordCount <= 2500) lengthPoints = 20
  else if ((wordCount >= 800 && wordCount < 1500) || (wordCount > 2500 && wordCount <= 3500)) lengthPoints = 10
  breakdown.push({ label: `Textlänge (${wordCount} Wörter)`, points: lengthPoints, maxPoints: 20, passed: lengthPoints >= 15 })

  // 4. Meta title (15 points)
  const metaTitleOk = metaTitle.length > 0 && metaTitle.length <= 60 && (!kw || metaTitle.toLowerCase().includes(kw))
  breakdown.push({ label: 'Meta-Titel optimiert', points: metaTitleOk ? 15 : metaTitle.length > 0 ? 7 : 0, maxPoints: 15, passed: metaTitleOk })

  // 5. Meta description (15 points)
  const metaDescLen = metaDescription.length
  const metaDescOk = metaDescLen >= 120 && metaDescLen <= 160 && (!kw || metaDescription.toLowerCase().includes(kw))
  const metaDescPartial = metaDescLen > 0
  breakdown.push({ label: 'Meta-Description (120-160 Zeichen)', points: metaDescOk ? 15 : metaDescPartial ? 7 : 0, maxPoints: 15, passed: metaDescOk })

  // 6. Links present (15 points)
  const hasLinks = content.includes('http') || content.includes('<a ')
  breakdown.push({ label: 'Interne/Externe Links vorhanden', points: hasLinks ? 15 : 0, maxPoints: 15, passed: hasLinks })

  const score = Math.min(100, breakdown.reduce((sum, item) => sum + item.points, 0))
  return { score, breakdown }
}

export function getScoreColor(score) {
  if (score >= 80) return 'text-green-600 dark:text-green-400'
  if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
  if (score >= 40) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

export function getScoreBgColor(score) {
  if (score >= 80) return 'bg-green-100 dark:bg-green-900/30'
  if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30'
  if (score >= 40) return 'bg-orange-100 dark:bg-orange-900/30'
  return 'bg-red-100 dark:bg-red-900/30'
}

export function getScoreLabel(score) {
  if (score >= 80) return 'Exzellent'
  if (score >= 60) return 'Gut'
  if (score >= 40) return 'Ausbaufähig'
  return 'Kritisch'
}

export function getScoreRingColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#eab308'
  if (score >= 40) return '#f97316'
  return '#ef4444'
}
