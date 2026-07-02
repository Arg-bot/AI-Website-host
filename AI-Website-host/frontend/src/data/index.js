// ─── Services ─────────────────────────────────────────────────────────────────

export const services = [
  {
    id: 'virtual-assistant',
    title: 'AI Virtual Assistant',
    shortDesc: 'Intelligent 24/7 conversational support that integrates with your existing systems.',
    description:
      'Our AI Virtual Assistant provides round-the-clock intelligent conversational support for your customers and employees. Built on advanced large language models and trained on your company-specific data, it handles complex multi-turn queries, integrates seamlessly with CRM, ERP, and helpdesk systems, and continuously learns from interactions to improve response quality over time.',
    features: [
      'Natural language understanding across 30+ languages',
      'CRM, ERP, and helpdesk integration',
      'Custom training on your brand voice and knowledge base',
      'Multi-channel deployment (web, mobile, Slack, Teams)',
      'Analytics dashboard with conversation insights',
      'Escalation to human agents when needed',
    ],
    useCase: {
      industry: 'Healthcare provider handling 10,000+ patient queries monthly',
      outcome: '75% reduction in call centre costs, 24/7 patient support coverage',
    },
    price: 'From £499/month',
    timeline: '2–4 weeks deployment',
    color: '#185FA5',
  },
  {
    id: 'rapid-prototyping',
    title: 'Rapid Prototyping',
    shortDesc: 'From concept to working AI prototype in just 5–10 days.',
    description:
      'Our Rapid Prototyping service accelerates your AI journey from idea to proof-of-concept. Working directly with your team, our engineers develop a working AI prototype for your specific business problem.',
    features: [
      'Architecture review and technical assessment',
      '5–10 day delivery sprint with daily standups',
      'Demo-ready build by end of engagement',
      'Full source code and documentation',
      'Knowledge transfer session included',
      'Option to extend into full production build',
    ],
    useCase: {
      industry: 'Logistics company validating demand forecasting for board presentation',
      outcome: 'Prototype delivered in 7 days, secured £2M funding for full implementation',
    },
    price: 'From £4,999/project',
    timeline: '5–10 days',
    color: '#1D9E75',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    shortDesc: 'Real-time dashboards, predictive modelling, and actionable business intelligence.',
    description:
      'Transform your raw data into strategic assets with our comprehensive Data Analytics solutions. We build real-time dashboards, implement predictive models, and create automated reporting infrastructure.',
    features: [
      'Real-time data dashboards with drill-down capabilities',
      'Predictive modelling for demand, churn, and risk',
      'Anomaly detection for operational monitoring',
      'Integration with existing data warehouses',
      'Power BI and Tableau compatible outputs',
      'Self-service analytics training for your team',
    ],
    useCase: {
      industry: 'Retail chain with 200+ stores analysing customer purchase patterns',
      outcome: '34% reduction in inventory costs, 22% improvement in forecast accuracy',
    },
    price: 'From £1,299/month',
    timeline: '3–6 weeks initial setup',
    color: '#639922',
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture',
    shortDesc: 'Multi-cloud AI deployments on AWS, Azure, and GCP with cost optimisation.',
    description:
      'Our Cloud Architecture service designs and implements enterprise-grade AI infrastructure across major cloud platforms.',
    features: [
      'AWS, Azure, and GCP multi-cloud strategies',
      'Containerised ML inference with Kubernetes',
      'Infrastructure-as-code (Terraform, Pulumi)',
      'Cost optimisation and governance frameworks',
      'Auto-scaling for production workloads',
      'Disaster recovery and business continuity planning',
    ],
    useCase: {
      industry: 'Financial services firm requiring HIPAA-compliant cloud infrastructure',
      outcome: '40% reduction in cloud costs, 99.99% uptime achieved',
    },
    price: 'From £2,999/month',
    timeline: '4–8 weeks design and migration',
    color: '#042C53',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity AI',
    shortDesc: 'ML-powered threat detection 40× faster than traditional rule-based systems.',
    description:
      'Strengthen your security posture with our AI-powered Cybersecurity solutions using advanced machine learning models.',
    features: [
      'Real-time network threat detection and blocking',
      'Behavioural anomaly identification',
      'Automated incident triage and prioritisation',
      'SIEM integration (Splunk, QRadar, Microsoft Sentinel)',
      '40× faster detection than rule-based systems',
      'Continuous model training and improvement',
    ],
    useCase: {
      industry: 'Critical infrastructure operator monitoring industrial control systems',
      outcome: 'Prevented 3 major security incidents in first year, 89% reduction in false positives',
    },
    price: 'From £3,499/month',
    timeline: '6–10 weeks deployment',
    color: '#dc2626',
  },
  {
    id: 'automation',
    title: 'Intelligent Automation',
    shortDesc: 'End-to-end workflow automation combining RPA with AI decision-making.',
    description:
      'Revolutionise your operational efficiency with Intelligent Automation that combines robotic process automation with AI-powered decision-making.',
    features: [
      'End-to-end workflow design and implementation',
      'RPA combined with AI decision nodes',
      'SAP, Salesforce, Microsoft 365 integration',
      'Process mining and optimisation',
      'Human-in-the-loop for exception handling',
      'Comprehensive audit trails and compliance reporting',
    ],
    useCase: {
      industry: 'Insurance company automating claims processing across multiple systems',
      outcome: '65% reduction in processing time, 50% decrease in manual errors',
    },
    price: 'From £1,999/month',
    timeline: '4–8 weeks per process',
    color: '#7c3aed',
  },
  {
    id: 'nlp',
    title: 'NLP Solutions',
    shortDesc: 'Intent classification, document intelligence, and multilingual support.',
    description:
      'Unlock the power of human language with our Natural Language Processing solutions covering intent classification, document intelligence, and RAG architectures.',
    features: [
      'Intent classification for chatbots and virtual assistants',
      'Named entity recognition and extraction',
      'Document intelligence and text summarisation',
      'RAG (Retrieval-Augmented Generation) architectures',
      'Multilingual support for 30+ languages',
      'Sentiment analysis and opinion mining',
    ],
    useCase: {
      industry: 'Legal firm processing thousands of contracts and case documents',
      outcome: '80% reduction in document review time, improved accuracy in case preparation',
    },
    price: 'From £1,799/month',
    timeline: '3–6 weeks',
    color: '#0891b2',
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    shortDesc: 'Demand forecasting, churn prediction, and financial modelling with explainable AI.',
    description:
      'Anticipate future trends and make data-driven decisions with sophisticated forecasting models for demand planning, customer churn prediction, and financial modelling.',
    features: [
      'Demand forecasting for inventory and resource planning',
      'Customer churn prediction and prevention',
      'Financial modelling and scenario analysis',
      'Time-series analysis for seasonal patterns',
      'Explainable AI outputs for stakeholder trust',
      'Integration with existing BI and planning systems',
    ],
    useCase: {
      industry: 'Manufacturing company predicting equipment maintenance needs',
      outcome: '23% reduction in unplanned downtime, extended equipment lifespan by 2 years',
    },
    price: 'From £1,999/month',
    timeline: '4–8 weeks',
    color: '#ea580c',
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    shortDesc: 'Full organisational AI adoption programmes with change management.',
    description:
      'Comprehensive AI transformation programmes that guide organisations through every stage of AI adoption, from strategy through to staff training.',
    features: [
      'AI strategy and roadmap development',
      'Use case prioritisation and business case building',
      'Phased delivery over 3–18 months',
      'Staff training and change management',
      'Governance frameworks and ethical guidelines',
      'Executive alignment and board reporting',
    ],
    useCase: {
      industry: 'Public sector organisation implementing council-wide AI adoption',
      outcome: '40% improvement in service delivery times, £2.5M annual savings identified',
    },
    price: 'From £9,999/month',
    timeline: '3–18 months programme',
    color: '#4f46e5',
  },
]

// ─── Events ───────────────────────────────────────────────────────────────────

export const events = [
  { id: 1,  title: 'AI Innovation Summit 2025',         date: '2025-03-15', day: '15', month: 'Mar', location: 'ExCeL London',                           type: 'Conference',        registrations: 387, description: 'Join 500+ AI leaders for a full-day summit exploring the future of enterprise artificial intelligence.' },
  { id: 2,  title: 'Rapid Prototyping Bootcamp',        date: '2025-04-02', day: '02', month: 'Apr', location: 'Sunderland HQ',                           type: 'Workshop',          registrations: 9,   description: 'A hands-on two-day bootcamp where your technical team works with AI-Solutions engineers to build a working AI prototype.' },
  { id: 3,  title: 'Data Analytics Masterclass',        date: '2025-04-28', day: '28', month: 'Apr', location: 'Leeds City Conference Centre',             type: 'Masterclass',       registrations: 64,  description: 'An intensive full-day session covering predictive modelling, real-time reporting infrastructure, and dashboard design best practices.' },
  { id: 4,  title: 'Cybersecurity AI Forum',            date: '2025-05-14', day: '14', month: 'May', location: 'The Sage Gateshead',                       type: 'Forum',             registrations: 112, description: 'A specialist half-day forum on AI-powered threat detection, anomaly detection models, and secure ML pipeline design.' },
  { id: 5,  title: 'NLP and Conversational AI Workshop',date: '2025-06-05', day: '05', month: 'Jun', location: 'Edinburgh International Conference Centre',type: 'Workshop',          registrations: 45,  description: 'A technical deep-dive into natural language processing for enterprise applications.' },
  { id: 6,  title: 'Digital Transformation Summit',     date: '2025-06-19', day: '19', month: 'Jun', location: 'Manchester Central',                       type: 'Conference',        registrations: 198, description: 'A flagship full-day conference for C-suite and VP-level leaders planning large-scale digital transformation.' },
  { id: 7,  title: 'Cloud Architecture Deep Dive',      date: '2025-07-10', day: '10', month: 'Jul', location: 'Newcastle Civic Centre',                   type: 'Technical Session', registrations: 52,  description: 'A full-day technical programme for architects and engineers covering multi-cloud AI deployments.' },
  { id: 8,  title: 'Women in AI Leadership Forum',      date: '2025-08-06', day: '06', month: 'Aug', location: 'The Barbican London',                       type: 'Forum',             registrations: 289, description: 'A networking and panel event celebrating women leading AI innovation across the UK.' },
  { id: 9,  title: 'AI-Solutions Client Open Day',      date: '2025-09-18', day: '18', month: 'Sep', location: 'Sunderland HQ',                            type: 'Open Day',          registrations: 67,  description: 'An exclusive event for existing and prospective clients to tour the AI-Solutions innovation lab.' },
]

// ─── Gallery ──────────────────────────────────────────────────────────────────

export const gallery = [
  { id: 1,  title: 'AI Innovation Summit 2024',        date: '14 March 2024',   location: 'London',      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',  tags: ['AI', 'Keynote', 'Networking'],        description: 'AI-Solutions hosted 400+ delegates at the AI Innovation Summit in London.' },
  { id: 2,  title: 'Digital Transformation Conference',date: '22 May 2024',     location: 'Manchester',  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',  tags: ['Transformation', 'Enterprise', 'Demo'],description: 'Over 600 business leaders gathered to explore digital transformation strategy.' },
  { id: 3,  title: 'Product Demo Day',                 date: '10 June 2024',    location: 'Sunderland',  image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop',  tags: ['Demo', 'Product', 'Hands-on'],        description: 'Clients and prospects visited AI-Solutions HQ for a hands-on AI Virtual Assistant demo day.' },
  { id: 4,  title: 'NLP and Language AI Workshop',     date: '3 July 2024',     location: 'Edinburgh',   image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop',  tags: ['NLP', 'Workshop', 'Technical'],       description: 'A technical workshop for data scientists covering sentiment analysis and document intelligence.' },
  { id: 5,  title: 'Client Strategy Roundtable',       date: '19 August 2024',  location: 'Birmingham',  image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop',  tags: ['Strategy', 'Executive', 'Governance'],description: 'Senior executives from 20 client organisations joined AI-Solutions for a quarterly strategy session.' },
  { id: 6,  title: 'Cybersecurity and AI Forum',       date: '5 September 2024',location: 'London',      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',  tags: ['Cybersecurity', 'AI', 'Forum'],       description: 'AI-Solutions partnered with the UK Cyber Security Council to demonstrate ML threat detection.' },
  { id: 7,  title: 'Team Culture Day',                 date: '12 October 2024', location: 'Sunderland',  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop',  tags: ['Culture', 'Team', 'Inclusion'],       description: 'The full 80-person AI-Solutions team gathered for values workshops and achievement celebrations.' },
  { id: 8,  title: 'Data Analytics Masterclass',       date: '28 October 2024', location: 'Leeds',       image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',  tags: ['Analytics', 'Masterclass', 'Data'],   description: '80 participants worked through hands-on exercises in predictive modelling and dashboard design.' },
  { id: 9,  title: 'Cloud Architecture Deep Dive',     date: '14 November 2024',location: 'Newcastle',   image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop',  tags: ['Cloud', 'Architecture', 'Infrastructure'],description: 'Technical architects explored multi-cloud AI deployment strategies.' },
  { id: 10, title: 'Women in AI Panel',                date: '27 November 2024',location: 'London',      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop',  tags: ['Diversity', 'AI', 'Panel'],           description: 'Six senior AI leaders discussed bias in AI systems and career journeys.' },
  { id: 11, title: 'Enterprise Sales Briefing',        date: '9 December 2024', location: 'Bristol',     image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop',  tags: ['Sales', 'Enterprise', 'ROI'],         description: 'C-suite decision makers received AI ROI financial modelling across three industries.' },
  { id: 12, title: 'Annual Gala 2024',                 date: '20 December 2024',location: 'London',      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',  tags: ['Gala', 'Awards', 'Annual'],           description: '500 clients, partners, and team members celebrated AI-Solutions most successful year.' },
]
