const requiredText = (value, path) => { if (typeof value !== 'string' || !value.trim()) throw new Error(`Generated case is missing ${path}.`); };

export function validateMystery(mystery) {
  if (!mystery || !mystery.case || !Array.isArray(mystery.suspects) || !Array.isArray(mystery.evidence) || !Array.isArray(mystery.timeline) || !mystery.solution) throw new Error('Generated case did not match the investigation format. Please try again.');
  const { suspects, evidence, solution } = mystery;
  if (suspects.length < 3 || suspects.length > 5) throw new Error('Generated case must contain 3–5 suspects. Please try again.');
  const suspectIds = new Set(suspects.map((person) => person.suspectId));
  if (suspectIds.size !== suspects.length || !suspectIds.has(solution.culpritId)) throw new Error('Generated case has inconsistent suspect IDs. Please try again.');
  for (const person of suspects) for (const field of ['name','occupation','background','relationshipToIncident','motive','alibi','statement']) requiredText(person[field], `suspect ${person.suspectId} ${field}`);
  for (const field of ['title','caseDescription','incidentLocation','incidentDate']) requiredText(mystery.case[field], `case ${field}`);
  for (const field of ['motive','explanation','reasoning']) requiredText(solution[field], `solution ${field}`);
  const evidenceIds = new Set(evidence.map((item) => item.evidenceId));
  if (evidenceIds.size !== evidence.length) throw new Error('Generated case contains duplicate evidence IDs. Please try again.');
  const counts = { WHATSAPP: 0, IMAGE: 0, CCTV: 0, WITNESS_STATEMENT: 0, DOCUMENT: 0 };
  for (const item of evidence) { if (!(item.type in counts)) throw new Error('Generated case contains an unsupported evidence type. Please try again.'); counts[item.type]++; for (const suspectId of item.associatedSuspectIds || []) if (!suspectIds.has(suspectId)) throw new Error('Evidence refers to an unknown suspect. Please try again.'); }
  for (const [type, minimum] of Object.entries({ WHATSAPP: 2, IMAGE: 2, CCTV: 1, WITNESS_STATEMENT: 2, DOCUMENT: 1 })) if (counts[type] < minimum) throw new Error(`Generated case needs more ${type.toLowerCase().replace('_',' ')} evidence. Please try again.`);
  if (!solution.decisiveEvidenceIds?.length || solution.decisiveEvidenceIds.some((evidenceId) => !evidenceIds.has(evidenceId))) throw new Error('Generated solution refers to missing evidence. Please try again.');
  if (!mystery.timeline.length) throw new Error('Generated case is missing its timeline. Please try again.');
  return mystery;
}
