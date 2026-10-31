export function publicInvestigation(investigation) {
  return { investigationId: investigation._id, caseNumber: investigation.caseNumber, title: investigation.title, category: investigation.category, difficulty: investigation.difficulty, caseDescription: investigation.caseDescription, incidentLocation: investigation.incidentLocation, incidentDate: investigation.incidentDate, timeline: investigation.timeline, status: investigation.status, createdAt: investigation.createdAt };
}

export function publicSuspect(suspect) { return { suspectId: suspect.suspectId, name: suspect.name, age: suspect.age, occupation: suspect.occupation, imageUrl: suspect.imageUrl, background: suspect.background, relationshipToIncident: suspect.relationshipToIncident, motive: suspect.motive, alibi: suspect.alibi, statement: suspect.statement }; }

export function resultPayload(investigation) {
  const solution = investigation.solution; const culprit = investigation.suspects.find((person) => person.suspectId === solution.culpritId);
  return { isCorrect: investigation.verdict.selectedSuspectId === solution.culpritId, selectedSuspect: publicSuspect(investigation.suspects.find((person) => person.suspectId === investigation.verdict.selectedSuspectId)), actualCulprit: publicSuspect(culprit), motive: solution.motive, explanation: solution.explanation, decisiveEvidence: solution.decisiveEvidenceIds.map((evidenceId) => { const item = investigation.evidence.find((entry) => entry.evidenceId === evidenceId); return { evidenceId, title: item.title, connection: item.clueSignificance }; }), result: investigation.verdict.selectedSuspectId === solution.culpritId ? 'CORRECT' : 'INCORRECT' };
}
