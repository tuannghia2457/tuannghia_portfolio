// Ongoing research projects, supplied by the owner on 24 October 2026. Kept separate from IVS company work.
export const research = [
  {
    slug: 'vietnamese-legal-rag',
    title: 'Vietnamese Legal RAG',
    lab: 'URA Research Lab',
    fields: ['NLP', 'LLMs', 'RAG'],
    summary: 'Retrieval-augmented question answering for Vietnamese administrative law, grounding every answer in verifiable legal sources.',
    focus: [
      'A legal-document pipeline: parsing, semantic chunking, and metadata extraction.',
      'Hybrid retrieval that combines BM25 with semantic embeddings such as SimCSE.',
      'Reciprocal Rank Fusion, re-ranking and authority scoring to put the most relevant law first.',
      'Evaluation of answer accuracy, coverage, and legal-evidence retrieval.',
    ],
    goal: 'Answers that cite law a reader can check, with retrieval precise enough that the model hallucinates less.',
    stage: 'In design',
    status: 'Researching, designing, and building the RAG pipeline.',
  },
  {
    slug: 'gnss-denied-uav-localization',
    title: 'GNSS-Denied UAV Localization',
    lab: 'IMACS',
    fields: ['Computer vision', 'Robotics', 'Visual localization', 'Geometric algorithms'],
    summary: 'Locating a drone without GPS, under dense forest canopy or unreliable satellite signal, by matching aerial imagery to reference maps through visual and geometric features.',
    focus: [
      'Segmentation of terrain features such as forest canopy and rivers.',
      'Geometric descriptions of segmented regions with Voronoi diagrams and computational geometry.',
      'Shape-based matching, including SABD, between UAV views and reference maps.',
      'A query-image pipeline that measures localization error and accuracy.',
    ],
    goal: 'Let UAVs keep flying on their own where GNSS is unavailable, using vision and geometry to find their position.',
    stage: 'In development',
    status: 'Segmentation, Voronoi processing, SABD, and the query-image pipeline are built; matching and accuracy evaluation are being refined.',
  },
]
