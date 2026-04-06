const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/downloads');
const GREEN = '#22c55e';
const DARK = '#0a0a0a';
const GRAY = '#888888';
const WHITE = '#ffffff';

function newDoc() {
  return new PDFDocument({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, size: 'LETTER' });
}

function header(doc, title, subtitle) {
  doc.rect(0, 0, doc.page.width, 120).fill(DARK);
  doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text('GRADEUP', 60, 30, { align: 'left' });
  doc.fillColor(WHITE).fontSize(22).font('Helvetica-Bold').text(title, 60, 50, { width: doc.page.width - 120 });
  if (subtitle) doc.fillColor(GRAY).fontSize(11).font('Helvetica').text(subtitle, 60, 85, { width: doc.page.width - 120 });
  doc.fillColor(WHITE).moveDown(4);
}

function sectionTitle(doc, text) {
  doc.moveDown(0.5);
  doc.fillColor(GREEN).fontSize(13).font('Helvetica-Bold').text(text.toUpperCase(), { continued: false });
  doc.moveTo(60, doc.y).lineTo(doc.page.width - 60, doc.y).strokeColor(GREEN).lineWidth(1).stroke();
  doc.moveDown(0.5);
}

function body(doc, text) {
  doc.fillColor(WHITE).fontSize(10).font('Helvetica').text(text, { lineGap: 4 });
  doc.moveDown(0.3);
}

function bullet(doc, items) {
  items.forEach(item => {
    doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text('→  ', { continued: true });
    doc.fillColor(WHITE).font('Helvetica').text(item, { lineGap: 3 });
  });
  doc.moveDown(0.5);
}

function numbered(doc, items) {
  items.forEach((item, i) => {
    doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text(`${i + 1}.  `, { continued: true });
    doc.fillColor(WHITE).font('Helvetica').text(item, { lineGap: 3 });
  });
  doc.moveDown(0.5);
}

function divider(doc) {
  doc.moveDown(0.5);
  doc.moveTo(60, doc.y).lineTo(doc.page.width - 60, doc.y).strokeColor('#333').lineWidth(0.5).stroke();
  doc.moveDown(0.5);
}

function footer(doc) {
  const pageCount = doc.bufferedPageRange ? doc.bufferedPageRange().count : 1;
  doc.fillColor(GRAY).fontSize(8).text('gradeup.com  |  support@gradeup.com  |  30-Day Money Back Guarantee', 60, doc.page.height - 40, { align: 'center', width: doc.page.width - 120 });
}

// ─── 1. AI PROMPT PACK ──────────────────────────────────────────────────────
function buildAIPromptPack() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'ai-prompt-pack.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, '150+ College AI Prompt Pack', 'Copy-paste prompts that actually work for college students');

  sectionTitle(doc, 'How to Use This Pack');
  body(doc, 'Copy any prompt, paste it into ChatGPT, Claude, or Gemini, and replace the [brackets] with your specific details. These prompts are engineered for college contexts — not generic business use.');

  sectionTitle(doc, 'Essay & Writing (50 Prompts)');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('ARGUMENTATIVE ESSAYS');
  doc.moveDown(0.3);
  bullet(doc, [
    'Write a 1000-word argumentative essay on [topic] for my [class] class. My thesis is [thesis]. Use an introduction, 3 body paragraphs with evidence, and a conclusion. Tone: formal academic.',
    'I need to argue [position] in my essay. Give me 5 strong supporting arguments with real-world examples I can cite.',
    'My professor assigned an essay on [topic]. Play devil\'s advocate and give me the strongest counterarguments to my position so I can address them.',
    'Turn this rough outline into a polished 800-word essay: [paste your outline]',
    'My essay intro is weak. Rewrite it to hook the reader immediately: [paste your intro]',
    'Write a thesis statement for an essay arguing [your position] on [topic].',
    'I wrote this conclusion but it feels flat. Make it memorable and tie everything together: [paste your conclusion]',
    'Review this paragraph for logical fallacies and suggest improvements: [paste paragraph]',
    'Give me 3 different thesis options for an essay about [topic], ranging from safe to bold.',
    'My essay is 200 words over the limit. Cut it to [word count] without losing meaning: [paste essay]',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('RESEARCH & ANALYSIS');
  doc.moveDown(0.3);
  bullet(doc, [
    'Summarize the key arguments in the academic debate about [topic]. What do scholars agree and disagree on?',
    'Explain [complex concept from class] like I\'m a smart 18-year-old who just heard it for the first time.',
    'I\'m writing a research paper on [topic]. What are the 5 most important subtopics I should cover?',
    'Find weaknesses in this argument: [paste argument]. How would a critic respond?',
    'Compare and contrast [Theory A] and [Theory B]. What are the key similarities and differences?',
    'I need to cite sources for [claim]. What types of sources (journals, books, data) should I look for?',
    'Turn these scattered notes into a coherent analysis: [paste notes]',
    'My professor wants a literature review on [topic]. What structure should I follow?',
    'Explain the significance of [historical event/study/paper] and why it matters today.',
    'I have to analyze a primary source. Walk me through how to do a close reading of: [paste text]',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('EDITING & PROOFREADING');
  doc.moveDown(0.3);
  bullet(doc, [
    'Edit this essay for clarity, flow, and academic tone. Keep my voice but make it sound more polished: [paste essay]',
    'Check this paragraph for grammar and style issues: [paste paragraph]',
    'My writing is too casual for a college paper. Rewrite this section in formal academic language: [paste text]',
    'I have passive voice throughout my essay. Rewrite these sentences in active voice: [paste sentences]',
    'This transition between paragraphs is awkward. Write a better transition: [paste the two paragraphs]',
    'Check my MLA/APA citations for formatting errors: [paste citations]',
    'My sentences are too long and complex. Simplify them: [paste paragraph]',
    'Does this essay have a clear argument? What is my thesis as you understand it?: [paste essay]',
    'Suggest a stronger title for this essay about [topic]: [paste current title]',
    'Make this introduction more engaging without changing the core argument: [paste intro]',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('CREATIVE WRITING');
  doc.moveDown(0.3);
  bullet(doc, [
    'Write the opening paragraph of a personal narrative about [your experience] that shows rather than tells.',
    'I need to write a college creative writing piece. Give me 10 unique story ideas related to [theme].',
    'Help me develop a character who [character description] for my fiction class.',
    'My creative writing professor wants subtext. Rewrite this scene so the real emotion is implied: [paste scene]',
    'Write a poem in [form: sonnet/haiku/free verse] about [topic].',
    'Give me 5 different opening lines for a personal essay about [topic].',
    'My story needs more sensory detail. Rewrite this passage with vivid senses: [paste passage]',
    'What point of view (first, second, third) would work best for a story about [plot]? Why?',
    'I have writer\'s block on [assignment]. Give me 5 prompts to get me started.',
    'Review my character\'s dialogue. Does it sound natural and distinct? [paste dialogue]',
  ]);

  sectionTitle(doc, 'Studying & Flashcards (30 Prompts)');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('UNDERSTANDING CONCEPTS');
  doc.moveDown(0.3);
  bullet(doc, [
    'I\'m confused about [concept] from [class]. Explain it step by step using a real-world analogy.',
    'What are the 5 most important things I need to know about [topic] for my exam?',
    'Explain the difference between [concept A] and [concept B]. When would you use each?',
    'Give me a mnemonic to remember [list of things I need to memorize].',
    'Walk me through this problem step by step: [paste problem]',
    'I understand [concept] but not how it connects to [other concept]. Explain the link.',
    'My professor explained [concept] and I\'m still lost. Explain it 3 different ways.',
    'What are common mistakes students make when learning [topic]?',
    'Create a concept map showing how [topic] connects to [related topic A] and [related topic B].',
    'Summarize this entire chapter in bullet points I can study from: [paste chapter text]',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('FLASHCARDS & QUIZZING');
  doc.moveDown(0.3);
  bullet(doc, [
    'Create 20 flashcard questions and answers for [topic]. Format: Q: ... A: ...',
    'Quiz me on [topic]. Ask me 10 questions one at a time and tell me if I\'m right.',
    'Give me 10 multiple choice questions about [chapter/topic] with the correct answers.',
    'Create a practice exam for [class] covering [topics]. Include 15 questions.',
    'I got this question wrong on my quiz: [paste question]. Explain the correct answer.',
    'Make fill-in-the-blank practice sentences for [vocabulary list].',
    'Create 5 short-answer questions a professor might ask about [topic].',
    'I need to memorize [formulas/dates/terms]. Create a drill exercise.',
    'Test my understanding: ask me to explain [concept] and then give me feedback on my answer.',
    'Create Anki-style cards for [topic] with the 20 most testable facts.',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('STUDY PLANNING');
  doc.moveDown(0.3);
  bullet(doc, [
    'I have [X days] to study for my [subject] exam. Create a study schedule with topics for each day.',
    'My exam covers chapters [X-Y]. What topics should I prioritize studying first?',
    'I only have 2 hours to study [topic]. What should I focus on?',
    'I keep procrastinating on studying [subject]. Help me build a habit.',
    'Create a Pomodoro study plan for studying [topic] for 3 hours.',
    'I have 3 exams in the same week. Help me create a study plan for all three.',
    'What active learning strategies work best for [type of class: math/history/science/writing]?',
    'I learn better [visually/by reading/by doing]. Suggest study strategies for [topic].',
    'Help me create a study group agenda for [topic] with 4 people and 2 hours.',
    'What should I do the night before an exam vs. the morning of?',
  ]);

  sectionTitle(doc, 'Career & Resume (20 Prompts)');
  bullet(doc, [
    'Write a resume bullet point for this experience: [describe what you did]. Make it achievement-focused with a number.',
    'I\'m applying for a [role] internship. What 5 skills should I highlight on my resume?',
    'Review my resume summary and make it more compelling: [paste summary]',
    'I have no work experience. What can I put on my resume? I\'ve done [list activities].',
    'Write a cover letter for a [role] internship at [company]. My relevant experience: [paste experience].',
    'I have a 30-second elevator pitch for networking. Improve it: [paste your pitch]',
    'What questions should I prepare for a [role] internship interview?',
    'Write a thank-you email after an interview for [role] at [company].',
    'How do I explain a gap in my experience or a bad grade?',
    'Tailor my resume to this job description: [paste job description]. My resume: [paste resume].',
    'I want to switch from [major] to a career in [field]. How do I position my experience?',
    'Write 3 STAR method answers for the question "Tell me about a challenge you overcame."',
    'How do I cold email a recruiter at [company] asking about internship opportunities?',
    'Create a 60-day LinkedIn optimization plan for a college student.',
    'Review my LinkedIn headline and make it more discoverable: [paste current headline]',
    'What professional skills should a [major] student develop to be competitive?',
    'I have an informational interview with [role] at [company]. What should I ask?',
    'Write a networking message to connect with a [role] professional on LinkedIn.',
    'How do I negotiate an internship offer if the pay is lower than I expected?',
    'Give me 5 questions that will impress an interviewer at [company].',
  ]);

  sectionTitle(doc, 'Email Templates (15 Prompts)');
  bullet(doc, [
    'Write a professional email to my professor asking for an extension on [assignment]. Reason: [your reason].',
    'I missed class on [date]. Write an email to my professor explaining and asking what I missed.',
    'Write an email requesting a meeting with my professor during office hours to discuss [topic].',
    'I got a lower grade than expected. Write a respectful email asking my professor to clarify the grading.',
    'Write an email to [department] asking about [scholarship/opportunity/program].',
    'I need a recommendation letter. Write an email asking [professor/employer] for one.',
    'Write a follow-up email to a recruiter who hasn\'t responded in 2 weeks.',
    'I need to cancel an interview. Write a professional email that keeps the door open.',
    'Write an email to a professor introducing myself at the start of the semester.',
    'I want to ask a professor to be my research mentor. Write an outreach email.',
    'Write a cold email to a startup asking about unpaid internship or shadowing opportunities.',
    'Draft an email accepting an internship offer professionally.',
    'Write a polite email declining a job offer.',
    'I need to dispute a parking ticket/library fine/admin error. Write a formal appeal letter.',
    'Write an email to my advisor asking about requirements for [major/minor/program].',
  ]);

  sectionTitle(doc, 'Problem Solving & Research (15 Prompts)');
  bullet(doc, [
    'I have a group project and one member isn\'t contributing. How should I handle this?',
    'I\'m overwhelmed with [number] assignments this week. Help me prioritize and make a plan.',
    'I bombed my midterm. How do I calculate what I need on the final to pass?',
    'Explain both sides of the debate around [controversial topic in my class].',
    'I need to find credible sources for [topic]. What keywords should I search on Google Scholar?',
    'Fact-check this claim I found online: [paste claim]',
    'I need to do a SWOT analysis on [company/organization]. Help me structure it.',
    'What are the ethical considerations around [topic for my ethics class]?',
    'Help me design a survey for my research methods class on [topic].',
    'Explain this statistical concept I\'m confused about: [concept].',
    'I have to give a 10-minute presentation on [topic]. Create an outline with talking points.',
    'Make this dense academic paragraph easier to understand: [paste paragraph]',
    'I need to find 5 real statistics to support my argument about [topic].',
    'Break down this complex reading assignment into the key points I need to know: [paste text]',
    'Help me outline a group project on [topic] and divide the work among 4 people fairly.',
  ]);

  sectionTitle(doc, 'Creative & Fun (15 Prompts)');
  bullet(doc, [
    'Write a funny but professional bio for my LinkedIn profile. I\'m a [major] student who [interests].',
    'Help me write a speech for [event: graduation party/club election/toast] that\'s funny and heartfelt.',
    'I need to name my study group/club/podcast. Give me 10 creative name ideas around [theme].',
    'Create a funny class syllabus for a course called "[joke subject]".',
    'Write a parody of [famous speech/song] about college life.',
    'Help me write a funny but sincere birthday message for my [friend/roommate/professor].',
    'Create a "College Survival Guide" entry for [specific college experience].',
    'I\'m making a TikTok about college life. Give me 10 creative video ideas.',
    'Write captions for my college photos that are clever and caption-worthy.',
    'Generate 5 conversation starters for networking events that aren\'t boring.',
    'Create a satirical article about [something annoying about college].',
    'Write a motivational speech for myself for when I want to quit.',
    'Help me come up with a creative dorm room theme/aesthetic.',
    'I need a good "about me" for a club application. Make it stand out: [paste boring version]',
    'Write a college playlist intro blurb for [mood: finals season/summer/heartbreak].',
  ]);

  sectionTitle(doc, 'Exam Prep (10 Prompts)');
  bullet(doc, [
    'I have a [subject] exam in [days]. Create a complete study plan covering all major topics.',
    'What are the most commonly tested concepts in [intro course]? Rank them by importance.',
    'Predict 5 essay questions my professor might ask based on: [paste syllabus or lecture notes].',
    'I have a 15-minute oral exam on [topic]. What questions should I prepare?',
    'Explain how to approach open-book exams vs. closed-book exams differently.',
    'Create a last-minute cramming guide for [subject]. Just the essentials.',
    'I\'m blanking on [concept] in the exam. Walk me through it from scratch.',
    'What are test-taking strategies for [type: multiple choice/essay/problem sets]?',
    'I have exam anxiety. Give me a pre-exam routine to calm down and focus.',
    'Debrief this exam with me: I got [score]. Here\'s what I studied: [list]. What should I do differently?',
  ]);

  footer(doc);
  doc.end();
  console.log('✓ ai-prompt-pack.pdf');
}

// ─── 2. FRESHMAN SURVIVAL BUNDLE ────────────────────────────────────────────
function buildFreshmanBundle() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'freshman-survival-bundle.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'The Freshman Survival Cheat Sheet Bundle', 'Everything you wish someone told you before Day 1');

  sectionTitle(doc, 'Biology 101 — Core Concepts Cheat Sheet');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('THE CELL');
  doc.moveDown(0.2);
  body(doc, 'Prokaryotes: No nucleus (bacteria, archaea) | Eukaryotes: Have nucleus (plants, animals, fungi)');
  bullet(doc, [
    'Nucleus → stores DNA, controls cell activity',
    'Mitochondria → ATP production ("powerhouse"), has own DNA',
    'Ribosomes → protein synthesis (found on rough ER or free in cytoplasm)',
    'Endoplasmic Reticulum (ER) → Rough ER: proteins | Smooth ER: lipids & detox',
    'Golgi Apparatus → packages/ships proteins (like FedEx for the cell)',
    'Lysosomes → digest waste (only in animal cells)',
    'Cell Wall → rigid outer layer (plants, fungi, bacteria — NOT animal cells)',
    'Chloroplasts → photosynthesis (plants only), has own DNA',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('DNA & GENETICS (HIGH PRIORITY — always on exams)');
  doc.moveDown(0.2);
  bullet(doc, [
    'DNA → RNA → Protein  (Central Dogma — memorize this direction)',
    'Transcription: DNA → mRNA  (happens in nucleus)',
    'Translation: mRNA → protein  (happens at ribosome)',
    'Codons: 3-base sequences on mRNA that code for amino acids',
    'Anticodon: complementary sequence on tRNA',
    'Mutation types: Substitution (one base changes) | Insertion/Deletion (frameshift — much worse)',
    'Dominant allele (A) masks recessive (a) | Homozygous (AA or aa) | Heterozygous (Aa)',
    'Punnett Square: tool for predicting offspring genotype ratios',
    'Mitosis: cell division for GROWTH (2 identical daughter cells)',
    'Meiosis: cell division for SEX CELLS (4 cells, half the chromosomes)',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('EVOLUTION & ECOLOGY');
  doc.moveDown(0.2);
  bullet(doc, [
    'Natural Selection: variation → selection pressure → differential reproduction → evolution',
    'Darwin\'s 4 postulates: variation exists, variation is heritable, more offspring than survive, variation affects survival',
    'Hardy-Weinberg: p² + 2pq + q² = 1  (p + q = 1)  — used for population genetics problems',
    'Food chains: Producer → Primary Consumer → Secondary Consumer → Tertiary Consumer',
    'Energy transfer: ~10% of energy moves up each trophic level',
    'Symbiosis types: Mutualism (+/+) | Commensalism (+/0) | Parasitism (+/-)',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  sectionTitle(doc, 'Calculus I — Formula Sheet');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('LIMITS');
  doc.moveDown(0.2);
  bullet(doc, [
    'lim(x→c) f(x) = L  means f(x) approaches L as x approaches c',
    'Direct substitution: plug in the value first — if you get 0/0, try factoring',
    'L\'Hôpital\'s Rule: if 0/0 or ∞/∞, take derivative of top and bottom separately',
    'Continuity: f is continuous at c if lim(x→c) f(x) = f(c)',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('DERIVATIVES — RULES TO MEMORIZE');
  doc.moveDown(0.2);
  bullet(doc, [
    'Power Rule:  d/dx [xⁿ] = nxⁿ⁻¹',
    'Constant Rule:  d/dx [c] = 0',
    'Product Rule:  d/dx [fg] = f\'g + fg\'',
    'Quotient Rule:  d/dx [f/g] = (f\'g - fg\') / g²',
    'Chain Rule:  d/dx [f(g(x))] = f\'(g(x)) · g\'(x)',
    'd/dx [sin x] = cos x  |  d/dx [cos x] = -sin x',
    'd/dx [tan x] = sec²x  |  d/dx [eˣ] = eˣ',
    'd/dx [ln x] = 1/x  |  d/dx [aˣ] = aˣ · ln(a)',
    'Implicit differentiation: differentiate both sides, treat y as a function of x',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('APPLICATIONS OF DERIVATIVES');
  doc.moveDown(0.2);
  bullet(doc, [
    'Critical points: set f\'(x) = 0, solve for x',
    'First Derivative Test: f\' changes + to - → local max | - to + → local min',
    'Second Derivative Test: f\'\'(c) < 0 → local max | f\'\'(c) > 0 → local min',
    'Inflection point: where f\'\' changes sign',
    'Related rates: differentiate both sides with respect to time (t)',
    'Optimization: find critical points, check endpoints on closed interval',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('INTEGRALS');
  doc.moveDown(0.2);
  bullet(doc, [
    '∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ -1)',
    '∫1/x dx = ln|x| + C',
    '∫eˣ dx = eˣ + C  |  ∫sin x dx = -cos x + C  |  ∫cos x dx = sin x + C',
    'Fundamental Theorem Part 1:  d/dx [∫ₐˣ f(t)dt] = f(x)',
    'Fundamental Theorem Part 2:  ∫ₐᵇ f(x)dx = F(b) - F(a)',
    'U-substitution: let u = inner function, du = derivative · dx',
    'Area between curves: ∫ₐᵇ [top - bottom] dx',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  sectionTitle(doc, 'Intro Psychology — Key Theories & Researchers');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('MAJOR PERSPECTIVES (know all 7)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Biological: behavior explained by brain, genes, neurotransmitters',
    'Psychodynamic (Freud): unconscious mind, childhood experiences, id/ego/superego',
    'Behavioral (Watson, Skinner): behavior shaped by environment and conditioning',
    'Cognitive: mental processes — memory, perception, problem-solving, decision-making',
    'Humanistic (Maslow, Rogers): free will, self-actualization, human potential',
    'Sociocultural: influence of society, culture, and relationships on behavior',
    'Evolutionary: behavior evolved because it helped ancestors survive/reproduce',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('HIGH-PRIORITY RESEARCHERS & STUDIES');
  doc.moveDown(0.2);
  bullet(doc, [
    'Pavlov → Classical conditioning (dogs + bell + food)',
    'Skinner → Operant conditioning (reinforcement schedules, Skinner box)',
    'Milgram → Obedience study (65% shocked to max voltage)',
    'Zimbardo → Stanford Prison Experiment (roles affect behavior)',
    'Bandura → Bobo doll (observational learning/social learning theory)',
    'Maslow → Hierarchy of Needs (physiological → safety → love → esteem → self-actualization)',
    'Kohlberg → Moral development (preconventional → conventional → postconventional)',
    'Piaget → Cognitive development (sensorimotor → preoperational → concrete → formal)',
    'Erikson → Psychosocial stages (8 stages across the lifespan)',
    'Broca → Language production area in left frontal lobe',
    'Wernicke → Language comprehension area in left temporal lobe',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('MEMORY & LEARNING (almost always on exams)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Encoding → Storage → Retrieval  (three stages of memory)',
    'Sensory Memory → Short-Term (7±2 items) → Long-Term',
    'Working memory: active processing (like mental RAM)',
    'Explicit memory: conscious recall (episodic + semantic)',
    'Implicit memory: unconscious (procedural skills, priming)',
    'Proactive interference: old info disrupts new | Retroactive: new disrupts old',
    'Spacing effect: distributed practice beats cramming (use this!)',
    'Classical conditioning: neutral stimulus + unconditioned stimulus → conditioned response',
    'Operant conditioning: behavior followed by consequence (reinforcement or punishment)',
    'Continuous reinforcement: faster to learn | Variable ratio: hardest to extinguish',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  sectionTitle(doc, 'Macroeconomics — Core Concepts');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('KEY MEASUREMENTS');
  doc.moveDown(0.2);
  bullet(doc, [
    'GDP = C + I + G + (X - M)  [Consumption + Investment + Government + Net Exports]',
    'Real GDP: adjusted for inflation | Nominal GDP: current prices',
    'GDP per capita = GDP ÷ Population (measures standard of living)',
    'CPI (Consumer Price Index): measures inflation using a basket of goods',
    'Inflation rate = (CPI₂ - CPI₁) / CPI₁ × 100',
    'Unemployment rate = (Unemployed / Labor Force) × 100',
    'Types: Frictional (between jobs), Structural (skills mismatch), Cyclical (recession-caused)',
    'Natural rate of unemployment: frictional + structural (never zero)',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('SUPPLY & DEMAND');
  doc.moveDown(0.2);
  bullet(doc, [
    'Law of Demand: price up → quantity demanded down (inverse)',
    'Law of Supply: price up → quantity supplied up (direct)',
    'Equilibrium: where supply curve meets demand curve',
    'Demand shifters: income, prices of related goods, tastes, expectations, number of buyers',
    'Supply shifters: input costs, technology, expectations, number of sellers',
    'Price ceiling (below equilibrium) → shortage | Price floor (above equilibrium) → surplus',
    'Elasticity: how sensitive quantity is to price change',
    'Elastic demand (>1): luxury goods | Inelastic demand (<1): necessities',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('MONETARY & FISCAL POLICY');
  doc.moveDown(0.2);
  bullet(doc, [
    'Fiscal Policy (government): spending + taxes | Expansionary = spend more/tax less',
    'Monetary Policy (Federal Reserve): controls money supply and interest rates',
    'Contractionary policy: raise rates, reduce money supply → fight inflation',
    'Expansionary policy: lower rates, increase money supply → fight recession',
    'Federal Funds Rate: interest rate banks charge each other overnight',
    'Multiplier effect: initial spending → more spending throughout economy',
    'Quantity Theory of Money: MV = PQ  (Money × Velocity = Price Level × Output)',
    'Phillips Curve: inverse relationship between inflation and unemployment (short run)',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  sectionTitle(doc, 'English Composition — Essay Framework');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('THE FIVE-PARAGRAPH STRUCTURE (foundation)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Paragraph 1 — Introduction: Hook → Background → Thesis',
    'Paragraphs 2-4 — Body: Topic sentence → Evidence → Analysis → Transition',
    'Paragraph 5 — Conclusion: Restate thesis (differently) → Synthesize points → So what?',
  ]);
  body(doc, 'Strong thesis formula: [Specific claim] because [reason 1], [reason 2], and [reason 3].');
  body(doc, 'Weak: "Social media has effects on students." → Strong: "Social media use above 3 hours daily decreases college student GPA by damaging sleep quality, reducing focus, and creating social anxiety."');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('THE PARAGRAPH STRUCTURE (PEEL or TIQA)');
  doc.moveDown(0.2);
  bullet(doc, [
    'T — Topic sentence: state the point of this paragraph',
    'I — Introduce evidence: signal phrase + quote or paraphrase',
    'Q — Quote/evidence: "According to [Author], ..."',
    'A — Analysis: explain what the evidence proves (this is where most students lose points)',
  ]);
  body(doc, 'Analysis sentence starters: "This demonstrates...", "This suggests...", "This is significant because...", "In other words...", "This evidence supports the claim that..."');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('COMMON MISTAKES THAT COST YOU GRADES');
  doc.moveDown(0.2);
  bullet(doc, [
    'Thesis too vague — must take a specific, arguable position',
    'Quoting without analyzing — evidence alone earns no points; explain what it proves',
    'Starting a paragraph with a quote — always introduce it first',
    'Using "I believe" or "In my opinion" in academic essays — just state the claim',
    'Weak conclusions that just summarize — connect to broader significance',
    'Not citing within the paper — every claim needs a source in-text',
  ]);

  sectionTitle(doc, 'College Life Tips Nobody Tells You');
  bullet(doc, [
    'Go to office hours in week 1, before you need them. Professors remember faces.',
    'Email professors with your name + section. They grade names they recognize higher.',
    'Get the syllabus on day 1 and enter all due dates into your phone immediately.',
    'Sleep is your #1 study tool. 7 hours > 5 hours of studying on 4 hours of sleep.',
    'Sit in the first three rows of every class. You will learn 30% more.',
    'Use Rate My Professor before registration, but take it with a grain of salt.',
    'Free stuff: student discounts, campus events, health center, tutoring center — use all of them.',
    'Drink water and eat breakfast before exams. It actually affects performance measurably.',
    'Your campus career center is criminally underused. Go in freshman year, not senior year.',
    'Join one club the first week. You will procrastinate if you wait until you "settle in."',
    'Your RA is a resource, not just a rule enforcer. They know things.',
    'The library has private study rooms — reserve them. Free and productive.',
    'Set a hard deadline to start papers 3 days before they\'re due, not the night before.',
    'Learn your professor\'s grading rubric. It tells you exactly what to write.',
    'Network with upperclassmen in your major. They have the notes, tips, and connections.',
  ]);

  footer(doc);
  doc.end();
  console.log('✓ freshman-survival-bundle.pdf');
}

// ─── 3. BUDGET BOSS ──────────────────────────────────────────────────────────
function buildBudgetTracker() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'budget-tracker.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'Budget Boss™ — College Budget System', 'Stop wondering where your money went. Start here.');

  sectionTitle(doc, 'Your Monthly Budget Blueprint');
  body(doc, 'The 50/30/20 rule doesn\'t work for college. Use the College 60/20/20 rule:');
  bullet(doc, [
    '60% → Needs (rent, groceries, transportation, phone)',
    '20% → Wants (dining out, entertainment, clothes, subscriptions)',
    '20% → Savings/Emergency Fund (even $50/month builds the habit)',
  ]);
  body(doc, 'On a $1,000/month income (part-time job): $600 needs, $200 wants, $200 savings. Most college students have it backwards — $800 wants, $200 needs, $0 savings.');

  sectionTitle(doc, 'Track Every Dollar (3-Category System)');
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('FIXED EXPENSES (same every month)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Rent/housing, Phone bill, Subscriptions (Spotify, Netflix, etc.)',
    'Gym membership, Insurance, Loan payments',
    'Action: List all fixed expenses. Add them up. This is your baseline.',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('VARIABLE EXPENSES (changes month to month)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Groceries, Dining out, Clothes, Uber/transportation',
    'Entertainment, Personal care, Amazon impulse buys',
    'Action: Review last month\'s bank statements. Categorize everything. You\'ll be shocked.',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('IRREGULAR EXPENSES (less frequent)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Textbooks, Car repairs, Travel, Medical co-pays, Gifts',
    'Action: Estimate annual cost, divide by 12. Set this aside monthly.',
    'Example: $400/semester on textbooks = $67/month to set aside',
  ]);

  sectionTitle(doc, 'Dining Plan Optimization');
  body(doc, 'Most students waste $300-600/year in unused dining dollars. Here\'s how to actually use your plan:');
  numbered(doc, [
    'Log into your meal plan portal on day 1. Know your balance and reset date.',
    'Track weekly spending: (Total Balance) ÷ (Weeks Left) = Weekly Budget',
    'If you\'re running high mid-semester, start using dining halls more.',
    'If you\'re running low late-semester, stock up on snacks and packaged foods.',
    'Use Dining Dollars at convenience stores on campus for groceries near semester end.',
    'Never let a balance expire — convert to snacks/drinks in finals week.',
  ]);

  sectionTitle(doc, 'Subscription Audit (Do This Now)');
  body(doc, 'Open your bank app. Search "subscription" or look for recurring charges. Common college money leaks:');
  bullet(doc, [
    'Streaming: Are you paying for 3 streaming services? Pick 1, share others.',
    'Free trials that auto-renewed (Amazon Prime, Adobe, gaming)',
    'Apps you downloaded once ($10-20/year you forgot about)',
    'Gym memberships you don\'t use — cancel and use campus rec instead (FREE)',
    'Cloud storage — Google Drive gives 15GB free. Do you actually need more?',
  ]);
  body(doc, 'Average college student saves $40-80/month from a subscription audit alone.');

  sectionTitle(doc, 'Savings Goals Framework');
  body(doc, 'You need 3 accounts, not 1:');
  bullet(doc, [
    'Checking: Money for this month\'s expenses',
    'Emergency Fund: $500-1,000 minimum. Touch ONLY for real emergencies.',
    'Goals Account: Specific thing you\'re saving for (car, spring break, etc.)',
  ]);
  body(doc, 'Even saving $25/week = $1,300/year. Start in week 1 of freshman year = $5,200 by graduation.');

  sectionTitle(doc, 'The Weekly 10-Minute Finance Check');
  numbered(doc, [
    'Open your bank app on Sunday night.',
    'Review what you spent last week by category.',
    'Is it on track with your weekly budget? If over, where did it go?',
    'Set an intention for the upcoming week.',
    'Transfer to savings account if you have surplus.',
  ]);
  body(doc, 'This habit alone will make you richer than 80% of your classmates by age 25.');

  sectionTitle(doc, 'Venmo & Payment Apps Tips');
  bullet(doc, [
    'Never leave money sitting in Venmo — transfer to bank weekly',
    'Use the Venmo note feature to track shared expenses ("Grocery run 3/15")',
    'For group expenses: designate one person to collect and split fairly upfront',
    'Cash App, Zelle, Venmo all work — pick one and stick to it with your friend group',
    'Be cautious: never Venmo or CashApp people you don\'t know in person',
  ]);

  footer(doc);
  doc.end();
  console.log('✓ budget-tracker.pdf');
}

// ─── 4. MEAL PREP GUIDE ──────────────────────────────────────────────────────
function buildMealPrepGuide() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'meal-prep-guide.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'The Broke But Fed Playbook', 'Eat well on $50/week. No chef skills required.');

  sectionTitle(doc, 'The $50 Weekly Grocery List');
  body(doc, 'Hit these staples and you can make 90% of the recipes in this guide. Shop at Walmart, Aldi, or Trader Joe\'s for best prices.');
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('PROTEINS ($15)');
  bullet(doc, ['Eggs (12-pack) — $2-3', 'Rotisserie chicken — $7', 'Canned tuna/salmon (4 cans) — $5', 'Ground beef or chicken thighs (1 lb) — $4-6']);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('CARBS ($10)');
  bullet(doc, ['Rice (2 lb bag) — $2', 'Pasta (2 boxes) — $3', 'Bread (1 loaf) — $2-3', 'Oats (container) — $3']);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('PRODUCE ($12)');
  bullet(doc, ['Bananas — $1', 'Apples (bag) — $3', 'Spinach/mixed greens (bag) — $3', 'Broccoli (bag) — $2', 'Sweet potatoes (3) — $3']);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('PANTRY ($10)');
  bullet(doc, ['Olive oil, salt, pepper, garlic powder, hot sauce', 'Soy sauce, peanut butter, honey', 'Black beans/chickpeas (2 cans) — $3', 'Pasta sauce (jar) — $2-3']);
  body(doc, 'Total: ~$47-50. This feeds one person for a full week with variety.');

  sectionTitle(doc, '4-Week Meal Plan Overview');
  body(doc, 'WEEK 1: Foundation Week — Master the basics');
  bullet(doc, [
    'Breakfast: Oatmeal with banana (daily) OR eggs + toast',
    'Lunch: Rotisserie chicken + rice + frozen veggies',
    'Dinner: Pasta with marinara + ground beef',
    'Snacks: Apples + peanut butter, trail mix',
  ]);
  body(doc, 'WEEK 2: Variety Week — Same ingredients, different flavors');
  bullet(doc, [
    'Breakfast: Scrambled eggs 3 days, overnight oats 4 days',
    'Lunch: Tuna salad wraps + apple',
    'Dinner: Fried rice with egg and veggies (use leftover rice)',
    'Snacks: Banana smoothie, cheese and crackers',
  ]);
  body(doc, 'WEEK 3: Batch Cook Week — Prep Sunday, eat all week');
  bullet(doc, [
    'Sunday prep: Cook big pot of rice, roast whole sheet pan of veggies',
    'Breakfast: Egg muffins (make 12 in muffin tin, grab 2 each morning)',
    'Lunch/Dinner: Mix and match rice bowls with different proteins',
    'Snacks: Hard-boiled eggs (make 6 on Sunday)',
  ]);
  body(doc, 'WEEK 4: Upgrade Week — Spend the same, eat better');
  bullet(doc, [
    'Try one new recipe (suggestions below)',
    'Use fresh herbs (cilantro, basil) — $1-2 transforms basic dishes',
    'Sheet pan dinners: protein + veggies + olive oil on one pan, 400°F, 25 mins',
  ]);

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  sectionTitle(doc, '30 Easy Recipes Under $3 Per Serving');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('BREAKFAST (5 recipes)');
  doc.moveDown(0.2);
  bullet(doc, [
    'OVERNIGHT OATS: 1/2 cup oats + 1 cup milk + banana, refrigerate overnight. No cooking.',
    'EGG FRIED RICE: scrambled eggs in pan, add leftover rice, soy sauce, hot sauce. 5 minutes.',
    'PEANUT BUTTER BANANA TOAST: toast + PB + banana slices + honey drizzle. Zero cooking.',
    'VEGGIE OMELETTE: 3 eggs + spinach + whatever veggies you have, fold in pan. 8 minutes.',
    'SMOOTHIE: frozen banana + milk + PB + oats in a blender. 2 minutes.',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('LUNCH (10 recipes)');
  doc.moveDown(0.2);
  bullet(doc, [
    'TUNA MELT: tuna + mayo + bread + cheese, microwave or pan. 5 minutes.',
    'CHICKEN RICE BOWL: rotisserie chicken + rice + any sauce + hot sauce. 3 minutes.',
    'PASTA SALAD: cold pasta + tuna/chicken + olive oil + veggies. Make on Sunday, eat all week.',
    'QUESADILLA: tortilla + cheese + beans + whatever protein, pan on medium. 4 minutes.',
    'VEGGIE WRAP: tortilla + hummus + spinach + any veggies. No cooking.',
    'RAMEN UPGRADE: ramen + egg + spinach + soy sauce + sesame oil. 5 minutes.',
    'RICE AND BEANS: rice + black beans + hot sauce + lime. Dirt cheap, insanely filling.',
    'CHICKEN SALAD: rotisserie chicken + mayo + celery on bread. 5 minutes.',
    'FRIED EGG SANDWICH: fried egg + cheese + hot sauce on toast. 5 minutes.',
    'LENTIL SOUP: lentils + broth + garlic + cumin in a pot, 20 min. Feeds you 3 days.',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('DINNER (10 recipes)');
  doc.moveDown(0.2);
  bullet(doc, [
    'ONE-PAN CHICKEN: chicken thighs + diced sweet potato + broccoli + olive oil, 400°F, 30 min.',
    'PASTA ARRABIATA: pasta + marinara + red pepper flakes + garlic. 15 minutes.',
    'STIR FRY: protein + any veggies + soy sauce + rice. 10 minutes.',
    'TACOS: ground beef/chicken + taco seasoning (50¢ packet) + tortillas. 15 minutes.',
    'SWEET POTATO CHILI: sweet potato + beans + canned tomatoes + chili powder. 25 minutes.',
    'EGG FRIED RICE (dinner version): add more protein, more veggies. Still 10 minutes.',
    'SHEET PAN SAUSAGE: sausage + peppers + onions + potatoes, roast at 425°F.',
    'PASTA AGLIO E OLIO: pasta + garlic + olive oil + red pepper. Simple and amazing.',
    'CHICKEN SOUP: rotisserie chicken + broth + rice + carrots. 20 minutes.',
    'BEAN BURRITO BOWL: beans + rice + corn + salsa + cheese. No cooking required.',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('SNACKS ($1 or less each)');
  doc.moveDown(0.2);
  bullet(doc, [
    'Apple + peanut butter ($0.50)', 'Hard-boiled egg ($0.25)', 'Banana + peanut butter ($0.40)',
    'Carrots + hummus ($0.60)', 'Rice cake + PB ($0.40)', 'Trail mix (buy in bulk) ($0.50)',
    'Popcorn (microwave bag) ($0.40)', 'Greek yogurt ($0.80)', 'Cottage cheese + fruit ($0.75)',
    'Edamame (frozen, microwave) ($0.60)',
  ]);

  sectionTitle(doc, 'Dining Hall Hacks');
  bullet(doc, [
    'Build a bowl: get a base (rice/pasta), pile protein + veggies. Better than random plate.',
    'Take fruit for later — it\'s usually unlimited and makes free snacks for 2-3 hours.',
    'Salad bar = free extras on everything. Chickpeas and avocado are always there.',
    'Cereal + milk + banana = legitimately good and underrated breakfast.',
    'Check if dining hall sells leftover food at end of service — often at a discount.',
    'Late-night dining (if available) often has pizza and simple carbs. Use strategically.',
    'Don\'t go hungry — you make worse food choices and eat more when you arrive starving.',
    'Protein focus: always include eggs, beans, meat, or dairy to stay full longer.',
  ]);

  sectionTitle(doc, 'Meal Prep Sunday System (2 Hours = Whole Week)');
  numbered(doc, [
    'Cook a large pot of rice (takes 20 min, feeds you all week)',
    'Roast a sheet pan of mixed veggies (cut, olive oil, salt, 400°F, 25 min)',
    'Hard-boil 6 eggs (12 min)',
    'Shred rotisserie chicken into portions',
    'Cook a batch of ground beef or beans',
    'Portion everything into containers in the fridge',
    'Make overnight oats for 3 days in advance',
  ]);
  body(doc, 'You now have 2-3 breakfast options and 10+ meal combos for the week. Mix and match. Done.');

  footer(doc);
  doc.end();
  console.log('✓ meal-prep-guide.pdf');
}

// ─── 5. RESUME & LINKEDIN KIT ────────────────────────────────────────────────
function buildResumeKit() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'resume-linkedin-kit.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'The Glow-Up Kit — Resume & LinkedIn', '6 ATS-friendly templates + the full optimization playbook');

  sectionTitle(doc, 'The Freshman/Sophomore Resume (No Experience)');
  body(doc, 'The #1 mistake: waiting until you have "real experience." Here\'s how to build a strong resume from day one.');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('SECTIONS TO INCLUDE (no experience version)');
  bullet(doc, [
    'Education (put this FIRST — it\'s your main credential right now)',
    'Relevant Coursework (yes, this is valid if it\'s actually relevant)',
    'Projects (class projects count — describe them like work experience)',
    'Leadership & Activities (clubs, sports, student government, volunteering)',
    'Skills (software, languages, tools you actually know)',
    'Work Experience (any job counts — tutoring, retail, babysitting, landscaping)',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('EDUCATION SECTION FORMAT');
  doc.moveDown(0.2);
  body(doc, 'University Name, City, State\nDegree Program — Expected Graduation: May 20XX\nGPA: 3.X/4.0 (only include if 3.0 or above)\nRelevant Coursework: [list 4-6 courses related to job]\nHonors: Dean\'s List, Honors Program, Scholarships (if applicable)');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('BULLET POINT FORMULA (use this for everything)');
  doc.moveDown(0.2);
  body(doc, 'Action verb + What you did + How/With what + Result/Impact');
  body(doc, 'WEAK: "Helped with social media"\nSTRONG: "Managed Instagram account for 200-person student organization, growing followers by 45% in one semester through daily content strategy"');
  body(doc, 'WEAK: "Worked at restaurant"\nSTRONG: "Served 50+ customers per shift at high-volume restaurant, consistently ranked top performer in speed and accuracy by floor manager"');

  sectionTitle(doc, 'Power Verbs By Category');
  doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text('LEADERSHIP: ');
  doc.fillColor(WHITE).font('Helvetica').text('Led, Managed, Directed, Supervised, Coordinated, Oversaw, Spearheaded, Championed, Mentored, Delegated', { continued: false });
  doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text('TECHNICAL: ');
  doc.fillColor(WHITE).font('Helvetica').text('Developed, Engineered, Programmed, Designed, Implemented, Built, Automated, Optimized, Analyzed, Configured', { continued: false });
  doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text('COMMUNICATION: ');
  doc.fillColor(WHITE).font('Helvetica').text('Presented, Wrote, Edited, Published, Pitched, Persuaded, Facilitated, Negotiated, Communicated, Authored', { continued: false });
  doc.fillColor(GREEN).fontSize(10).font('Helvetica-Bold').text('RESULTS: ');
  doc.fillColor(WHITE).font('Helvetica').text('Increased, Reduced, Improved, Saved, Generated, Grew, Achieved, Exceeded, Delivered, Accelerated', { continued: false });
  doc.moveDown(0.3);

  sectionTitle(doc, 'ATS (Applicant Tracking System) Guide');
  body(doc, '75% of resumes are rejected by ATS software before a human sees them. Here\'s how to beat it:');
  bullet(doc, [
    'Use standard section headers: "Work Experience," "Education," "Skills" (not creative names)',
    'No tables, graphics, columns, or text boxes — ATS can\'t read them',
    'Save as .docx or .pdf (check the job posting — some specify)',
    'Mirror exact keywords from the job description in your resume',
    'Spell out acronyms at least once (e.g., "Machine Learning (ML)")',
    'Use common fonts: Arial, Calibri, Garamond — no fancy fonts',
    'Margins: 0.5" to 1" — don\'t go below 0.5"',
    'One page for students/recent grads unless you have 5+ years experience',
  ]);
  body(doc, 'Keyword matching trick: Copy the job description, paste into wordclouds.com, use the big words prominently in your resume.');

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  sectionTitle(doc, 'LinkedIn Profile Optimization Checklist');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('PROFILE PHOTO (gets 14x more views)');
  bullet(doc, [
    '✓ Professional but not stuffy (business casual is fine)',
    '✓ Your face fills 60% of the frame',
    '✓ Solid or blurred background',
    '✓ Good lighting — face the light source',
    '✓ Smile — you seem more approachable',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('HEADLINE (most important line — always visible in search)');
  bullet(doc, [
    'Bad: "Student at University of Texas"',
    'Better: "Computer Science Student | Aspiring Software Engineer | Python & Java"',
    'Formula: [Role/Student] | [Target Career] | [2-3 Key Skills]',
    'Include keywords recruiters search for in your target field',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('ABOUT SECTION (your pitch in 3 paragraphs)');
  bullet(doc, [
    'Paragraph 1: Who you are + what you study + what drives you',
    'Paragraph 2: Your relevant experience, skills, and what makes you different',
    'Paragraph 3: What you\'re looking for (internships, full-time, collaborations)',
    'End with: "Feel free to reach out at [email]"',
    'Include keywords naturally throughout — this is searchable',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('EXPERIENCE SECTION');
  bullet(doc, [
    'Use the same bullet formula as your resume',
    'Include ALL experience — nothing is too small',
    'Add media: screenshots, PDFs of projects, certificates',
    'Keep dates accurate — recruiters check these',
  ]);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('SKILLS & CONNECTIONS');
  bullet(doc, [
    'Add 5-10 relevant skills (they appear in recruiter searches)',
    'Get endorsements from classmates, professors, supervisors',
    'Connect with everyone you meet: classmates, professors, speakers at events',
    'Send personalized connection requests: "Hi [name], I\'m a [year] at [school] studying [major]. I\'d love to connect — your work in [field] is inspiring."',
    '500+ connections makes your profile look established',
  ]);

  sectionTitle(doc, 'Cover Letter Framework');
  body(doc, 'Paragraph 1 (Opening Hook): Why this company specifically? Show you\'ve researched them. Not "I am applying for..."');
  body(doc, 'Paragraph 2 (Experience): Your most relevant experience. Use 1-2 specific examples with results.');
  body(doc, 'Paragraph 3 (Connection): Why you + this company = perfect fit. What problem do you solve for them?');
  body(doc, 'Paragraph 4 (Close): Confident ask for interview. "I would love the opportunity to discuss how I can contribute to [team/project]."');
  body(doc, 'Keep it under 350 words. Use the exact job title. Customize the first and last paragraphs for each application.');

  footer(doc);
  doc.end();
  console.log('✓ resume-linkedin-kit.pdf');
}

// ─── 6. STUDY PLANNER ────────────────────────────────────────────────────────
function buildStudyPlanner() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'study-planner.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'The Dean\'s List Daily™ Study System', 'The study schedule that actually works — built for college exam structures');

  sectionTitle(doc, 'The Science Behind This System');
  body(doc, 'Most students study wrong. They re-read notes, highlight, and cram the night before. This feels productive but research shows it doesn\'t work. This system uses three evidence-backed techniques:');
  bullet(doc, [
    'SPACED REPETITION: Review material at increasing intervals (1 day, 3 days, 7 days, 14 days). Dramatically improves long-term retention.',
    'ACTIVE RECALL: Instead of re-reading, test yourself. Close the notes and try to recall. Every retrieval strengthens the memory.',
    'INTERLEAVING: Mix different subjects and topics. Don\'t study one topic for 4 hours. Alternate between subjects.',
  ]);

  sectionTitle(doc, 'The Daily Schedule Template');
  body(doc, 'This is the framework. Customize times to your class schedule.');
  bullet(doc, [
    '7:00-8:00 AM — Morning review: Spend 30-60 min reviewing yesterday\'s notes (active recall, not re-reading)',
    '8:00-12:00 PM — Classes',
    '12:30-1:00 PM — Lunch + immediate review: Within 30 min of class, review your notes while fresh',
    '1:00-5:00 PM — Deep Work Block: 2-4 hours of focused studying (see Pomodoro system below)',
    '5:00-7:00 PM — Break, exercise, social',
    '7:00-8:00 PM — Evening review: Light review of what you studied today',
    '8:00-9:00 PM — Prep tomorrow: Review syllabus, know what\'s coming',
    'No studying after 10 PM: you retain nothing when exhausted — sleep is the study session',
  ]);

  sectionTitle(doc, 'The Pomodoro System (for Deep Work Blocks)');
  body(doc, 'The standard Pomodoro is 25 min work / 5 min break. For college studying, use the Extended Pomodoro:');
  numbered(doc, [
    '50 minutes of focused work (phone in another room, one tab open)',
    '10 minute break (walk, stretch, water — NOT social media)',
    'Repeat 3-4 times = 1 session',
    'After 4 Pomodoros: take a 30-minute real break',
  ]);
  body(doc, 'Track your Pomodoros. Most students think they study for 4 hours but actually study for 1.5 hours with lots of distraction. Counting forces honesty.');
  bullet(doc, [
    'Phone in another room — not face down on the desk. Another room.',
    'One browser tab maximum. Use Forest app or website blockers if needed.',
    'If a thought distracts you: write it on a "capture list," don\'t stop studying to deal with it.',
    'Tell people around you when your focus block ends so they stop interrupting.',
  ]);

  sectionTitle(doc, 'The Exam Countdown System');
  body(doc, 'Work backwards from your exam. Assign material to specific days, not just "study for exam."');
  body(doc, 'For a 4-week countdown:');
  bullet(doc, [
    'Week 4 (exam is in 4 weeks): Finish all reading, attend all classes, no cramming needed yet',
    'Week 3: First pass through all material — identify what you don\'t understand',
    'Week 2: Target your weak spots. Get help (office hours, tutor) now, not the night before',
    'Week 1: Review and practice problems. Focus on high-probability exam topics.',
    'Day Before: Light review only. Prepare your space. Sleep 8 hours. Set two alarms.',
    'Day Of: Review your one-page summary. Eat breakfast. Arrive 10 minutes early.',
  ]);
  body(doc, 'For a 2-week countdown (more common):');
  bullet(doc, [
    'Days 14-10: Content review — go through all material once',
    'Days 9-5: Active recall — test yourself on everything, make a list of weak spots',
    'Days 4-2: Weak spot focus + practice problems/past exams',
    'Day 1: Only review your summary sheet. Do NOT try to learn new material.',
  ]);

  sectionTitle(doc, 'Midterm & Finals Mode');
  body(doc, 'When you have multiple exams in the same week:');
  numbered(doc, [
    'Map all exam dates onto one calendar view first',
    'Order by urgency + difficulty (earliest + hardest = study first)',
    'Block off 2-3 hour dedicated blocks for each exam each day',
    'Do NOT let one exam consume all your time — set a timer for each subject',
    'Use your most alert hours for your hardest subject',
    'Build in one "float" hour per day for unexpected difficulty',
    'Sleep minimum 7 hours even during finals — this is non-negotiable',
  ]);
  body(doc, 'All-nighters cost more than they gain. After 17 hours awake, your cognitive function equals being legally drunk.');

  sectionTitle(doc, 'Semester Planning (Do This Week 1)');
  numbered(doc, [
    'Download/print ALL syllabi on day 1',
    'Enter every exam, quiz, paper, and due date into your phone calendar NOW',
    'Set reminders 1 week and 3 days before each major deadline',
    'Identify your 3 hardest classes and block extra study time for those immediately',
    'Find office hours for every professor and add to calendar (you\'ll actually go)',
    'Locate the tutoring center — you won\'t use it if you have to search for it in a crisis',
  ]);
  body(doc, 'Spending 2 hours on this in week 1 prevents countless crises throughout the semester. Do it over lunch on day 1.');

  footer(doc);
  doc.end();
  console.log('✓ study-planner.pdf');
}

// ─── 7. INTERNSHIP TRACKER ───────────────────────────────────────────────────
function buildInternshipTracker() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'internship-tracker.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'InternReady™ — Internship Application System', 'Track every application + email templates that actually get responses');

  sectionTitle(doc, 'The Application Tracker System');
  body(doc, 'Most students apply haphazardly and lose track. Use this system to manage 30-50 applications at once and never miss a follow-up.');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TRACK THESE 10 COLUMNS FOR EVERY APPLICATION');
  numbered(doc, [
    'Company Name',
    'Role/Position',
    'Date Applied',
    'Application Method (LinkedIn/company site/referral)',
    'Status (Applied / Phone Screen / Interview / Offer / Rejected / Ghosted)',
    'Recruiter Name & Email',
    'Follow-up Due Date (7 days after applying)',
    'Notes (what you said, what they said)',
    'Salary/Pay Rate',
    'Excitement Level (1-5) — prioritize follow-ups on 4-5s',
  ]);
  body(doc, 'Use Google Sheets to track this. Free, always accessible, shareable with career counselor.');

  sectionTitle(doc, 'The 30-50 Application Strategy');
  body(doc, 'Most students apply to 5 companies and wait anxiously. The math favors volume:');
  bullet(doc, [
    '50 applications → ~15 phone screens → ~5 first-round interviews → ~2 final rounds → 1 offer',
    'Start applying in September for summer internships (most deadlines are October-December)',
    'Apply to "reach," "match," and "safety" companies — 33% each',
    'Don\'t self-select out — apply even if you don\'t meet 100% of requirements',
    'Tailor each resume/cover letter — even 10 minutes of tailoring doubles your rate',
    'Set a daily target: 3-5 applications per day for 2 weeks beats 20 in one panic session',
  ]);

  sectionTitle(doc, '10 Cold Email Templates');

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TEMPLATE 1: Cold Outreach to Recruiter');
  doc.moveDown(0.2);
  body(doc, 'Subject: [Role] Internship — [Your Name] / [University]\n\nHi [First Name],\n\nI\'m [Your Name], a [year] studying [major] at [University]. I came across [Company] while researching leaders in [industry], and your work on [specific thing — product, recent news, initiative] really stood out to me.\n\nI\'m actively seeking a [role] internship for [summer/fall/spring] and would love to be considered for any openings on your team. I\'ve attached my resume and have experience in [2-3 relevant skills].\n\nWould you be open to a 15-minute call to discuss how I might contribute to your team?\n\nBest,\n[Your Name] | [University] | [LinkedIn] | [Email]');

  divider(doc);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TEMPLATE 2: Referral Request to Alum');
  doc.moveDown(0.2);
  body(doc, 'Subject: [University] Alum → Advice on [Company] Internships?\n\nHi [Name],\n\nI found your profile through [LinkedIn/alumni network/class] — I\'m a [year] [major] at [University] and noticed you work at [Company].\n\nI\'m applying for [role] internships this [semester] and would love 15 minutes of your time to hear about your experience and any advice you\'d share. No pressure if you\'re busy — I just figured reaching out to alums was smarter than applying cold.\n\nWould a quick call or even a few questions over email work for you?\n\nThanks so much,\n[Your Name]');

  divider(doc);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TEMPLATE 3: Follow-Up After Applying (7 days)');
  doc.moveDown(0.2);
  body(doc, 'Subject: Following Up — [Role] Application / [Your Name]\n\nHi [Name],\n\nI submitted my application for the [Role] internship on [date] and wanted to follow up to reiterate my strong interest in the position.\n\nI\'m particularly excited about [specific thing about company/role] and believe my background in [relevant skill] would allow me to contribute quickly.\n\nPlease let me know if you need any additional materials. I look forward to the opportunity to discuss further.\n\nBest,\n[Your Name]');

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TEMPLATE 4: Thank You After Phone Screen');
  doc.moveDown(0.2);
  body(doc, 'Subject: Thank You — [Role] Conversation / [Your Name]\n\nHi [Name],\n\nThank you so much for taking the time to speak with me today about the [Role] internship at [Company]. I really enjoyed learning about [specific thing they mentioned — team/project/culture].\n\nOur conversation reinforced my excitement about this opportunity — especially [specific point from call]. I\'m confident my experience in [skill] would help me hit the ground running.\n\nI look forward to next steps. Please don\'t hesitate to reach out if you need anything else from me.\n\nBest,\n[Your Name]');

  divider(doc);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TEMPLATE 5: Following Up After Interview (No Response in 1 Week)');
  doc.moveDown(0.2);
  body(doc, 'Subject: Re: [Role] Interview — [Your Name]\n\nHi [Name],\n\nI wanted to follow up on my interview for the [Role] position on [date]. I remain very excited about the opportunity to join [Company] and contribute to [team/initiative].\n\nPlease let me know if there\'s any additional information I can provide or if there\'s an update on the timeline. Thank you again for your consideration.\n\nBest,\n[Your Name]');

  divider(doc);

  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TEMPLATES 6-10: Quick Reference');
  bullet(doc, [
    'Template 6 — Offer Acceptance: "I am thrilled to accept the [Role] internship offer at [Company]. I confirm my start date of [date] and look forward to joining the team."',
    'Template 7 — Offer Decline (keep door open): "After careful consideration, I have decided to accept another opportunity. I have great respect for [Company] and hope to stay in touch for future possibilities."',
    'Template 8 — Informational Interview Request: "I\'m a student interested in [field] and would value 20 minutes to hear about your career path. Would you be open to a quick call?"',
    'Template 9 — Check-In with Mentor/Contact: "Hope you\'re doing well. I wanted to share a quick update — [what you\'ve been working on]. I\'d love to reconnect soon."',
    'Template 10 — Asking for LinkedIn Recommendation: "I\'m building my LinkedIn profile and would be incredibly grateful if you\'d be willing to write a recommendation for [specific skill/project we worked on]."',
  ]);

  sectionTitle(doc, 'Interview Prep Checklist');
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('48 HOURS BEFORE');
  bullet(doc, [
    '✓ Research company: products, recent news, mission, competitors, culture',
    '✓ Research your interviewer on LinkedIn',
    '✓ Practice answers to top 10 common questions (out loud, not in your head)',
    '✓ Prepare 3 STAR stories (Situation, Task, Action, Result)',
    '✓ Prepare 5 thoughtful questions to ask them',
    '✓ Confirm date, time, location (or video link)',
    '✓ Choose/iron your outfit',
  ]);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('DAY OF');
  bullet(doc, [
    '✓ Review your resume — know every line of it',
    '✓ Review company one more time',
    '✓ Arrive 10-15 min early (virtual: test tech 30 min before)',
    '✓ Bring printed copies of resume',
    '✓ Phone on silent/airplane mode',
  ]);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('TOP 10 INTERVIEW QUESTIONS TO PREP');
  bullet(doc, [
    '"Tell me about yourself" — This is your 90-second pitch. Practice it 10 times.',
    '"Why this company?" — Show you\'ve researched them. Be specific.',
    '"Why this role?" — Connect your interests/skills to the job description.',
    '"Tell me about a challenge you overcame" — STAR method, real story.',
    '"Tell me about a time you worked in a team" — STAR method.',
    '"What are your strengths?" — Name one, give an example.',
    '"What\'s a weakness?" — Be honest, show self-awareness and growth.',
    '"Where do you see yourself in 5 years?" — Ambitious but realistic.',
    '"What questions do you have for us?" — ALWAYS have 3-5 questions ready.',
    '"Walk me through your resume" — Know your story cold.',
  ]);

  sectionTitle(doc, 'Networking Contact Manager');
  body(doc, 'Track these people + set reminders to stay in touch every 60-90 days:');
  bullet(doc, [
    'Professors who know you well (future recommendation letters)',
    'Alumni you\'ve done informational interviews with',
    'Recruiters who reached out or you met at events',
    'Professionals from networking events, club speakers, career fairs',
    'Previous employers, supervisors, coworkers',
    'Mentors, advisors, TAs who know your work',
  ]);
  body(doc, 'The goal: 20-30 people in your network who actually know your name by graduation. Quality > quantity. Maintain these relationships before you need them.');

  footer(doc);
  doc.end();
  console.log('✓ internship-tracker.pdf');
}

// ─── 8. NOTION DASHBOARD ────────────────────────────────────────────────────
function buildNotionDashboard() {
  const doc = newDoc();
  doc.pipe(fs.createWriteStream(path.join(OUT, 'notion-dashboard.pdf')));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  header(doc, 'The College Command Center™', 'Complete Notion Setup Guide — Your entire college life in one workspace');

  sectionTitle(doc, 'Getting Started: Your Workspace Structure');
  body(doc, 'Your College Command Center is organized into 5 core sections. Set these up in order — each one builds on the last.');
  bullet(doc, [
    '📚 ACADEMICS — All classes, assignments, and grade tracking',
    '💰 FINANCES — Budget, expenses, and savings goals',
    '📅 SCHEDULE — Weekly planning and time blocking',
    '🎯 GOALS — Semester goals, habits, and personal growth',
    '🤝 SOCIAL — Events, contacts, and networking',
  ]);

  sectionTitle(doc, 'Section 1: Academics Database');
  body(doc, 'Create a new Notion page called "Academics" and add a Database (table view) with these properties:');
  bullet(doc, [
    'Assignment Name (Title)',
    'Class (Select: add each of your classes as options)',
    'Due Date (Date)',
    'Status (Select: Not Started / In Progress / Done / Submitted)',
    'Priority (Select: High / Medium / Low)',
    'Grade Received (Number)',
    'Notes (Text)',
  ]);
  body(doc, 'GPA Calculator formula (add as a Formula property): ((Class1_Credits × Class1_GPA) + ...) ÷ TotalCredits');
  body(doc, 'Create 3 views: (1) All Tasks — full table view. (2) This Week — filter by Due Date = this week. (3) By Class — group by Class property.');
  body(doc, 'Habit that separates Dean\'s List students: Open this database every Sunday night, review the week ahead, and set priorities before Monday.');

  sectionTitle(doc, 'Section 2: Finance Tracker');
  body(doc, 'Create a new Notion page called "Finances" with:');
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('MONTHLY BUDGET PAGE');
  bullet(doc, [
    'Add your monthly income at the top (job, allowance, financial aid stipend)',
    'Create sections: Fixed Expenses, Variable Expenses, Savings',
    'List every fixed expense with amount and due date',
    'Set a "Remaining Budget" formula: Income - Fixed - Variable Budget',
    'Update Variable spending weekly (takes 5 minutes)',
  ]);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('EXPENSE LOG DATABASE');
  bullet(doc, [
    'Date (Date), Description (Title), Amount (Number), Category (Select), Payment Method (Select)',
    'Categories: Food / Transport / Entertainment / Shopping / School / Health / Other',
    'Review every Sunday: which category went over? Why?',
  ]);

  sectionTitle(doc, 'Section 3: Weekly Schedule');
  body(doc, 'Create a Notion Calendar database for your weekly schedule:');
  bullet(doc, [
    'Add all recurring class times as recurring events',
    'Add office hours, club meetings, work schedule',
    'Every Sunday evening: plan the week ahead — when will you study what?',
    'Block 2-hour "Focus Blocks" for your deepest work',
    'Color-code by type: Classes (blue), Study (green), Social (purple), Work (orange)',
    'Use the "This Week" filter to see only current week',
  ]);
  body(doc, 'Time blocking rule: If it\'s not on the calendar, it won\'t happen. Treat study blocks like class — non-negotiable.');

  sectionTitle(doc, 'Section 4: Goals & Habits System');
  body(doc, 'Create a "Goals" page with three sections:');
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('SEMESTER GOALS (Big Picture)');
  bullet(doc, [
    'Write 3-5 goals for this semester. Be specific: "Get a 3.5 GPA" not "Do better in school."',
    'For each goal: Why does it matter? What are the weekly actions that lead there?',
    'Review monthly — are you on track? What needs to change?',
  ]);
  doc.fillColor(GREEN).fontSize(11).font('Helvetica-Bold').text('WEEKLY HABITS TRACKER');
  bullet(doc, [
    'Create a table: Habits as rows, Days of week as columns, Checkbox as value',
    'Start with 3-5 habits MAX (too many = none stick)',
    'Suggested college habits: Sleep 7+ hours, Exercise, Review notes same day, 20 min reading',
    'Each Sunday: review last week\'s completion. Adjust if under 70% consistency.',
  ]);

  sectionTitle(doc, 'Section 5: Quick Reference Pages');
  body(doc, 'These pages save you time every week:');
  bullet(doc, [
    'PROFESSOR CONTACTS: Name, email, office hours, office location for all professors',
    'IMPORTANT LINKS: Registrar portal, LMS, financial aid, library login',
    'PASSWORDS (hint only!): Which email each account is linked to',
    'CAMPUS RESOURCES: Tutoring, counseling, career center hours + locations',
    'SEMESTER CALENDAR: First/last day of class, add/drop, exam schedule',
    'EMERGENCY CONTACTS: Campus safety, student health, RA, parents',
  ]);

  sectionTitle(doc, 'Power Tips for Notion Success');
  bullet(doc, [
    'Use the Notion mobile app — the system only works if you use it on the go',
    'Start every day opening your "This Week" task view — takes 60 seconds',
    'Weekly Review (Sunday, 20 minutes): review last week, plan next week, update goals',
    'Don\'t over-build the system before using it — start with Academics only, add sections as needed',
    'Link pages together: mention @Assignment in your class notes to connect everything',
    'Use keyboard shortcut "/" to add any block type quickly',
    'Download the Notion desktop app — faster than the browser version',
    'Invite a study partner and share the Academics database for accountability',
  ]);

  footer(doc);
  doc.end();
  console.log('✓ notion-dashboard.pdf');
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Generating PDFs...\n');
  buildAIPromptPack();
  buildFreshmanBundle();
  buildBudgetTracker();
  buildMealPrepGuide();
  buildResumeKit();
  buildStudyPlanner();
  buildInternshipTracker();
  buildNotionDashboard();
  console.log('\nAll PDFs generated in public/downloads/');
}

main();
