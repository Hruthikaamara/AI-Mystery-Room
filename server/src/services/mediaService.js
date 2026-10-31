// Media-provider boundary. Gemini text generation does not produce video; evidence viewers
// render clearly labelled simulated CCTV and scene reconstructions when no media adapter exists.
export function prepareEvidence(evidence) {
  return evidence.map((item) => ({ ...item, mediaUrl: item.mediaUrl || '', metadata: { ...(item.metadata || {}), simulated: true } }));
}
