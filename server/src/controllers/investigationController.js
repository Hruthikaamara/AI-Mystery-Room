import Investigation from '../models/Investigation.js';
import { generateMystery } from '../services/geminiService.js';
import { validateMystery } from '../services/mysteryService.js';
import { prepareEvidence } from '../services/mediaService.js';
import { publicInvestigation, publicSuspect, resultPayload } from '../services/verdictService.js';

export async function generate(req, res, next) {
  try {
    const scenario = typeof req.body.scenario === 'string' ? req.body.scenario.trim() : '';
    if (scenario.length < 20 || scenario.length > 4000) return res.status(400).json({ message: 'Describe the scenario in at least 20 characters (maximum 4,000).' });
    const input = { scenario, title: clean(req.body.title, 90), category: clean(req.body.category, 80), difficulty: clean(req.body.difficulty, 30), instructions: clean(req.body.instructions, 500) };
    const mystery = validateMystery(await generateMystery(input));
    const investigation = await Investigation.create({ title: input.title || mystery.case.title, originalScenario: scenario, category: input.category || 'Any mystery', difficulty: input.difficulty || 'Standard', caseNumber: String(Math.floor(1000 + Math.random() * 9000)), caseDescription: mystery.case.caseDescription, incidentLocation: mystery.case.incidentLocation, incidentDate: mystery.case.incidentDate, suspects: mystery.suspects, evidence: prepareEvidence(mystery.evidence), timeline: mystery.timeline, solution: mystery.solution });
    res.status(201).json({ success: true, investigationId: investigation.id, message: 'Your investigation is ready.', generationStatus: 'complete' });
  } catch (error) { next(error); }
}

function clean(value, maxLength) { return typeof value === 'string' ? value.replace(/[<>\u0000-\u001F]/g, '').trim().slice(0, maxLength) : ''; }
async function load(id) { if (!/^[a-f\d]{24}$/i.test(id)) return null; return Investigation.findById(id); }

export async function getOne(req,res,next) { try { const item=await load(req.params.id); if(!item)return res.status(404).json({message:'This case file could not be found.'}); res.json(publicInvestigation(item)); } catch(e){next(e);} }
export async function getEvidence(req,res,next) { try { const item=await load(req.params.id); if(!item)return res.status(404).json({message:'This case file could not be found.'}); res.json({evidence:item.evidence.map((entry)=>({evidenceId:entry.evidenceId,title:entry.title,type:entry.type,description:entry.description,content:entry.content,mediaUrl:entry.mediaUrl,timestamp:entry.timestamp,associatedSuspectIds:entry.associatedSuspectIds,clueSignificance:entry.clueSignificance,metadata:entry.metadata}))}); } catch(e){next(e);} }
export async function getSuspects(req,res,next) { try { const item=await load(req.params.id); if(!item)return res.status(404).json({message:'This case file could not be found.'}); res.json({suspects:item.suspects.map(publicSuspect)}); } catch(e){next(e);} }
export async function verdict(req,res,next) { try { const item=await load(req.params.id); if(!item)return res.status(404).json({message:'This case file could not be found.'}); if(item.verdict?.submittedAt)return res.status(409).json({message:'A final verdict has already been submitted for this case.'}); const selected=clean(req.body.selectedSuspectId,20); if(!item.suspects.some((person)=>person.suspectId===selected))return res.status(400).json({message:'Choose one of the listed persons of interest.'}); const submittedAt=new Date(); const saved=await Investigation.findOneAndUpdate({_id:item._id,'verdict.submittedAt':{$exists:false}},{$set:{verdict:{selectedSuspectId:selected,isCorrect:selected===item.solution.culpritId,submittedAt},status:'SOLVED'}},{new:true}); if(!saved)return res.status(409).json({message:'A final verdict has already been submitted for this case.'}); res.json(resultPayload(saved)); } catch(e){next(e);} }
export async function getResult(req,res,next) { try { const item=await load(req.params.id); if(!item)return res.status(404).json({message:'This case file could not be found.'}); if(!item.verdict?.submittedAt)return res.status(403).json({message:'The sealed solution is available after you submit a final verdict.'}); res.json(resultPayload(item)); } catch(e){next(e);} }
