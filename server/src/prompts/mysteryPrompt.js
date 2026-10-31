export function buildMysteryPrompt({ scenario, title, category, difficulty, instructions }) {
  return `You are a careful mystery writer creating a fictional, logically solvable investigation for an interactive detective game. Return ONLY valid JSON matching the schema below. Do not wrap JSON in markdown. All people, conversations, places and incidents must be fictional. Build the solution first, then make every clue and timeline consistent with it. Include at least two genuinely decisive clues and at least one fair red herring. The case must not be sensational or graphic. Use realistic, concise evidence.

USER SCENARIO: ${scenario}
PREFERRED TITLE: ${title || 'Create a fitting title'}
CATEGORY: ${category || 'Any mystery'}
DIFFICULTY: ${difficulty || 'Standard'}
ADDITIONAL INSTRUCTIONS: ${instructions || 'None'}

Return exactly this structure and types:
{
 "case": {"title":"string","caseDescription":"2-4 sentence spoiler-free summary","incidentLocation":"string","incidentDate":"string"},
 "suspects":[{"suspectId":"S1","name":"string","age":32,"occupation":"string","imageUrl":"","background":"string","relationshipToIncident":"string","motive":"string","alibi":"string","statement":"string"}],
 "evidence":[{"evidenceId":"E1","title":"string","type":"WHATSAPP|IMAGE|CCTV|WITNESS_STATEMENT|DOCUMENT","description":"spoiler-free description","content":{},"mediaUrl":"","timestamp":"string","associatedSuspectIds":["S1"],"clueSignificance":"non-spoiler note about why it may matter"}],
 "timeline":[{"time":"string","event":"string","suspectIds":["S1"]}],
 "solution":{"culpritId":"S1","motive":"concise motive","explanation":"coherent solution; explicitly identify how clues connect","decisiveEvidenceIds":["E1","E2"],"reasoning":"private consistency rationale"}
}

Generate 3-5 suspects, each with a plausible reason for suspicion, and at least 8 pieces of evidence meeting these minimums: 2 WHATSAPP, 2 IMAGE, 1 CCTV, 2 WITNESS_STATEMENT, 1 DOCUMENT. WhatsApp content: {participants:["name","name"],messages:[{sender:"name",text:"message",time:"23:41"}]}. IMAGE content: {caption:"fictional scene reconstruction description"}; do not invent a real hosted image URL. CCTV content: {sequence:"brief timestamped simulated sequence description"}; no video URL is needed. WITNESS_STATEMENT content: {witnessName:"string",statement:"string"}. DOCUMENT content: {heading:"string",body:"string",findings:["string"]}. Other content should be a JSON object. Use unique IDs, 24-hour timestamps and evidence references that exist. The culprit must be a suspect. Exactly one culprit. The public caseDescription, evidence descriptions and clueSignificance MUST NOT reveal the culprit or solution. A final explanation must refer to actual evidence IDs. Timeline and timestamps must agree. Make the mystery fair: a careful reader can infer the answer from the evidence.`;
}
