// Approved first-person web-version briefs for /results (Joe approved Nov 20).
// Copy is verbatim from the Notion card "Create the Results page and the
// home-page results teaser". Do not edit wording here without an approved card.

export type Block =
  | { type: "kicker"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "note"; text: string }
  | { type: "ul"; items: string[] };

export type Brief = { title: string; blocks: Block[] };

export const RESULTS_INTRO =
  "These are stories from my own years leading teams. Each one started with people, not a process. Ask me for the full versions.";

export const BRIEFS: Brief[] = [
  {
    title: "Building Quality & Reliability at a Growing Technology Company",
    blocks: [
      { type: "kicker", text: "Executive OD Case Study  |  Organizational Capability Building" },
      { type: "h3", text: "Business challenge" },
      {
        type: "p",
        text: "A young technology company was commercializing an emerging solid-state storage technology and pursuing major technology customers. Prospective enterprise buyers needed evidence that an unfamiliar technology was dependable—and that a growing company had the organizational maturity to sustain its quality and reliability commitments.",
      },
      { type: "h3", text: "Leadership mandate" },
      {
        type: "p",
        text: "A Director with deep reliability expertise recruited me, a former colleague from another company, to establish the company’s Quality and Reliability capability while the Director concentrated on technology development. I developed the overarching strategy, built relationships with functional leaders, and created a specialized team.",
      },
      { type: "h3", text: "Organizational intervention" },
      {
        type: "p",
        text: "My approach began with customer-facing reliability evidence and worked upstream through field returns, manufacturing test, new-product development testing, assembly and manufacturing, and supplier quality. The growing function encompassed product quality engineering, accelerated reliability testing, field-performance tracking, manufacturing-test improvement, and corrective action. I retained direct responsibility for the customer-facing corrective-action process and served as primary interface to the contract manufacturer.",
      },
      { type: "h3", text: "Cross-functional governance" },
      {
        type: "p",
        text: "I assumed responsibility for weekly Quality Reviews originally established by the Director. These sessions brought important concerns before executives and other decision-makers to support timely cross-functional decisions. Engagement with leaders across the company was central to building buy-in and coordinating improvements.",
      },
      { type: "h3", text: "Measured reliability improvement and customer contribution" },
      {
        type: "p",
        text: "In the first year, field return rates declined from 4.8% to 0.81%, an 83.1% relative reduction, through improvements made with Engineering and Manufacturing. This measurable progress, alongside accelerated reliability test data and a maturing Quality System, helped address prospective customers’ concerns. Sales invited me to present the system and results to major prospects, later reporting on several occasions that the presentations helped secure signatures. Several large customers also requested quarterly Quality Reviews, which I conducted alone or with team members.",
      },
      { type: "h3", text: "OD significance" },
      {
        type: "p",
        text: "The initiative illustrates organizational capability building aligned to customer requirements and achieved through cross-functional collaboration. The return-rate improvement is the key quantified result; reported Sales feedback supports a commercial contribution without establishing independent revenue attribution.",
      },
    ],
  },
  {
    title: "Get to Yes | Turning Functional Friction into Customer Solutions",
    blocks: [
      { type: "kicker", text: "EXECUTIVE CASE STUDY  •  CROSS-FUNCTIONAL ALIGNMENT  •  CUSTOMER-CENTERED PROCESS DESIGN" },
      {
        type: "p",
        text: "At a major technology company, expanding storage-area-network configurations created a customer-compatibility challenge. Sales teams sometimes committed to combinations of products and network components that had never been qualified together. Failures at customer sites strained relationships, generated costly support escalations, and created friction between Sales and Customer Support.",
      },
      { type: "h3", text: "The business challenge" },
      {
        type: "p",
        text: "The organization needed stronger pre-sale controls without losing the ability to respond to legitimate customer requirements. A simple prohibition on untested configurations risked frustrating Sales and customers; continued sales without validation risked further service failures.",
      },
      { type: "h3", text: "The collaborative approach" },
      {
        type: "p",
        text: "I developed a pre-qualification process requiring Sales to check an interoperability database before committing to a configuration. Working with a supportive Customer Support Director and other business leaders, I built backing for the new process. During a group discussion, a Sales leader asked, “Then how do we get to yes?” That question helped shape a solution that enabled business rather than merely restricting it.",
      },
      {
        type: "p",
        text: "I proposed and established a specialized testing team to respond to qualification requests. If a configuration was not in the database, Sales could request testing and help secure or borrow required equipment; Testing assessed the work, committed to a turnaround time, and added successfully qualified configurations to the database. Requests were prioritized as capacity allowed.",
      },
      { type: "h3", text: "Extending the capability" },
      {
        type: "p",
        text: "I also assigned a team member to coordinate with technology partners that tested compatible components in their own laboratories. Partners contributed relevant results involving the company’s products, allowing the database to grow without equivalent increases in internal test staffing.",
      },
      { type: "h3", text: "Organizational and business results" },
      {
        type: "p",
        text: "1M+ Configurations in the database by the time I left. Cross-functional Sales, Testing, Support and partners working together.",
      },
      {
        type: "p",
        text: "Sales and Support relationships shifted toward partnership; interoperability issues declined, customer confidence improved, and the process helped Sales pursue viable customer configurations. The original accomplishment narrative reports improved sales but does not quantify attributable revenue gains. I later contributed to a project white paper with my Director and Vice President.",
      },
      { type: "h3", text: "Leadership lesson" },
      {
        type: "p",
        text: "The lasting improvement came from aligning competing functions around a shared customer objective. I helped turn a compliance requirement into a responsive, reusable organizational capability—an approach that continues to inform my organizational consulting and leadership coaching.",
      },
      {
        type: "note",
        text: "Evidence: Original “Diele Story #3 – Building Pre-Qualification Process,” supplemented by my recollections. The database count reflects configurations, not customers or separate transactions; no specific financial return is claimed.",
      },
    ],
  },
  {
    title: "Case Study | Restoring Customer Trust Through Organizational Redesign",
    blocks: [
      { type: "kicker", text: "ORGANIZATIONAL EFFECTIVENESS  •  CHANGE LEADERSHIP  •  CAPABILITY DEVELOPMENT" },
      {
        type: "p",
        text: "A major technology company recovering from repeated layoffs faced an urgent customer-quality crisis. Development teams had been rebuilt more quickly than testing capacity, leaving individual test engineers stretched across one or more product groups. Incomplete testing allowed defects into customer environments, threatening key accounts and consuming costly engineering, support, and executive resources.",
      },
      { type: "h3", text: "The business challenge" },
      {
        type: "p",
        text: "The company created a Severity 0 classification for customer incidents so serious that accounts were at risk of terminating the relationship. In the prior 12 months, 77 such issues had occurred. With limited budget for new resources, the challenge was to recover testing effectiveness through a different way of organizing work and not simply by asking overstretched engineers to work harder.",
      },
      { type: "h3", text: "The approach" },
      {
        type: "p",
        text: "I began by listening to test engineers and assessing responsibilities, coverage gaps, processes, and constraints. The diagnosis pointed to a system problem rather than a talent problem: skilled people were dispersed across product-focused groups, expected to cover too many kinds of testing, and often lacked a clear professional development path.",
      },
      {
        type: "p",
        text: "With a cross-functional team of senior testers, I designed a centralized organization built around specialized testing capabilities serving all product lines. Representatives of each specialty defined their responsibilities, best practices, and upstream/downstream handoffs. Their collaborative work became a formal testing process guide.",
      },
      { type: "h3", text: "The organizational transformation" },
      {
        type: "ul",
        items: [
          "Shifted from isolated, product-based testing assignments to a coordinated, specialty-based function.",
          "Strengthened engineers’ professional identity, recognition, and career development opportunities.",
          "Staged testing activities and established objective metrics, including defect discovery and resolution trends, to govern progression through the release process.",
          "Introduced common operating methods, training, executive reporting, and a formal defect-escape feedback process.",
        ],
      },
      { type: "h3", text: "Measured results" },
      {
        type: "p",
        text: "77 → 0 Severity 0 incidents. ≈ $2.5M estimated annual avoided resolution costs. 7 months: new process embedded in releases.",
      },
      {
        type: "note",
        text: "Note: Savings estimate uses 77 prior-year Severity 0 events × $31,536 average resolution cost; retained revenue and other benefits are not included.",
      },
      {
        type: "p",
        text: "Other customer-issue severity categories also declined, while product quality, test coverage, and customer confidence improved. The new operating model was integrated into standard release practices, not left as a one-time corrective initiative.",
      },
      { type: "h3", text: "The leadership lesson" },
      {
        type: "p",
        text: "The breakthrough came from combining systems-level diagnosis with employee participation. Specialized engineers helped design how the new organization would work, then developed ownership of its success. The same principle informs my coaching and consulting today: effective leaders build the conditions in which people can discover, implement, and sustain better solutions.",
      },
      {
        type: "note",
        text: "Evidence: Based on my original accomplishment narrative and my recollections. Approximate $2.5 million benefit reflects avoided Severity 0 incident-resolution costs (77 × $31,536), excluding unquantified customer and revenue effects.",
      },
    ],
  },
  {
    title: "Case Study | From Fragmented Teams to Integrated Customer Solutions",
    blocks: [
      { type: "kicker", text: "ORGANIZATIONAL DEVELOPMENT  •  LEADERSHIP ALIGNMENT  •  STRATEGIC REALIGNMENT" },
      {
        type: "p",
        text: "A newly formed technology division needed to rebuild a testing organization whose four groups operated across California and Colorado with different strengths, histories, and leadership needs. Product quality issues were undermining customer acceptance, while the testing function lacked credibility with parts of Engineering.",
      },
      { type: "h3", text: "The challenge" },
      {
        type: "p",
        text: "The organization combined experienced managers with teams needing new testing capabilities, a recently appointed manager who needed coaching, and an acquired team wary of outsiders. The assignment required improving performance while creating trust, consistent practices, and a common direction across locations.",
      },
      { type: "h3", text: "The approach" },
      {
        type: "p",
        text: "I spent the first four to six weeks meeting the managers and their teams, then facilitated an all-day offsite with managers and key employees. We addressed perceptions of the organization, established operating expectations, and developed a shared strategic improvement plan. I tailored coaching to each manager, helped engineers build relevant testing capabilities, and leveraged proven testing methods as a foundation for stronger release practices.",
      },
      {
        type: "p",
        text: "When proposed changes met resistance, I took responsibility for addressing concerns at leadership level so the teams could stay focused on improvement. Around six months into the effort, I consolidated the broader organizational issues into an assessment that reached an Executive Vice President. After discussing the findings, my Vice President and I were invited to present our strategy to the company’s technical architects.",
      },
      { type: "h3", text: "The organizational transformation" },
      {
        type: "ul",
        items: [
          "Brought four geographically distributed groups into closer alignment around shared objectives and more consistent testing practices.",
          "Strengthened management effectiveness through individualized coaching and built trust across different team histories and cultures.",
          "Gained greater executive and technical-community visibility, leading to collaboration on broader opportunities.",
          "Contributed to an executive decision to recharter the organization from individual-product testing toward validating bundled customer solutions.",
        ],
      },
      { type: "h3", text: "The outcome" },
      {
        type: "p",
        text: "Within twelve months, the testing organization had moved from limited credibility to being recognized as an important contributor. Product quality and customer acceptance reportedly improved. The later strategic shift brought Testing into closer partnership with Marketing and Sales to validate product combinations addressing customer needs. Marketing and Sales separately used estimated ROI to prioritize which solutions to pursue; I did not develop those estimates, and no financial ROI outcome is claimed here.",
      },
      { type: "h3", text: "The leadership lesson" },
      {
        type: "p",
        text: "Successful organizational change required more than technical expertise. By listening, tailoring support to people’s needs, building shared ownership, and presenting organizational issues clearly, I helped a fragmented function become a coordinated team capable of contributing to a broader business mission. Those principles continue to shape my leadership coaching and consulting work today.",
      },
      {
        type: "note",
        text: "Evidence: Based on my original accomplishment narrative and my firsthand recollections. Outcomes are qualitative unless otherwise stated.",
      },
    ],
  },
  {
    title: "Case Study | Rebuilding a Team’s Capability to Adapt",
    blocks: [
      { type: "kicker", text: "ORGANIZATIONAL DEVELOPMENT  •  PARTICIPATIVE CHANGE  •  SYSTEMS THINKING" },
      {
        type: "p",
        text: "An established engineering reliability group needed to modernize as its company entered new technology markets. Its experienced employees knew their work, but longstanding assignments and methods were no longer aligned with emerging organizational needs.",
      },
      { type: "h3", text: "The challenge" },
      {
        type: "p",
        text: "The group needed a clearer mission, stronger internal customer relationships, and the ability to continuously improve. Simply issuing a new mandate would not create the ownership required for lasting change.",
      },
      { type: "h3", text: "The approach" },
      {
        type: "p",
        text: "Serving as the group’s manager and internal OD consultant, I applied a formal seven-step Action Research methodology and added direct input from internal customers. We interviewed stakeholders, prioritized needs, assessed existing skills and resources, and involved team members in shaping the solution.",
      },
      {
        type: "p",
        text: "The process revealed an unmet need for system-integration testing, but also legitimate disagreement about organizational ownership. Rather than impose a sweeping reorganization, we launched a focused pilot, evaluated results, and used the evidence to guide the next phase.",
      },
      { type: "h3", text: "The transformation" },
      {
        type: "ul",
        items: [
          "Introduced system-integration testing to address a gap between existing engineering validation and customer-acceptance activities.",
          "Reorganized from product-specific assignments into three process-focused testing teams.",
          "Included employees in defining the new structure and choosing preferred team assignments.",
          "Established a transition plan and continued attention to process improvement and organizational learning.",
        ],
      },
      { type: "h3", text: "Results" },
      {
        type: "p",
        text: "81 vs. 46: The integration pilot identified 81 problems, compared with 46 in the previous product-testing effort; the test efforts may not have been directly equivalent.",
      },
      {
        type: "p",
        text: "Customer confidence: Internal customers strongly supported the pilot and subsequently increased requests for the group’s services.",
      },
      {
        type: "p",
        text: "Stronger capability: A more specialized, process-driven operating model supported knowledge reuse, refinement of testing methods, and clearer ownership.",
      },
      { type: "h3", text: "The leadership lesson" },
      {
        type: "p",
        text: "The decisive change was not only technical. The group became more capable of improving its own work because employees and customers participated in defining the future. I learned that sustainable transformation comes from combining evidence, business needs, employee ownership, and a willingness to adapt the plan when stakeholders raise legitimate concerns.",
      },
      {
        type: "note",
        text: "Background: Based on an applied Action Research graduate project at Regis University and a real organizational transformation at a large technology company in the early 1990s. Names and project details can be tailored for public release. The lessons from this transformation continue to shape my leadership coaching and consulting today. Whether developing individual leaders or improving organizational effectiveness, my approach emphasizes employee engagement, shared ownership, accountability, and sustainable improvement.",
      },
    ],
  },
];

export const RESULTS_TEASER =
  "What changed when the people changed. At a major technology company, Severity 0 customer incidents went from 77 to zero, avoiding about $2.5M a year. At another technology company, field returns went from 4.8% to 0.81%.";
