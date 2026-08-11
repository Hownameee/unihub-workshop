export type SeatStatus = "available" | "low" | "full"

export interface Workshop {
  id: string
  title: string
  speaker: string
  speakerBio: string
  speakerRole: string
  room: string
  floor: string
  day: number
  dateISO: string
  start: string
  end: string
  category: string
  price: number // 0 = free
  capacity: number
  registered: number
  description: string
  aiSummary: string
  status: "Published" | "Draft"
}

export interface Registration {
  id: string
  workshopId: string
  status: "Confirmed" | "Pending Payment" | "Cancelled"
  registeredAt: string
  checkin: "Checked-in" | "Not yet" | "No-show"
}

export const CATEGORIES = [
  "Career",
  "Engineering",
  "Design",
  "Data & AI",
  "Entrepreneurship",
  "Communication",
]

export const TIME_SLOTS = ["Morning", "Afternoon", "Evening"]

export const workshops: Workshop[] = [
  {
    id: "ws-01",
    title: "Building a Standout Tech Resume That Beats the ATS",
    speaker: "Dr. Elena Marsh",
    speakerRole: "Head of Talent, Northbridge Labs",
    speakerBio:
      "Elena has reviewed over 40,000 resumes across a decade in technical recruiting and now leads talent strategy at Northbridge Labs.",
    room: "Auditorium A",
    floor: "Ground Floor",
    day: 1,
    dateISO: "2026-09-14",
    start: "09:00",
    end: "10:30",
    category: "Career",
    price: 0,
    capacity: 120,
    registered: 74,
    description:
      "A hands-on session on structuring your resume for both human reviewers and applicant tracking systems. Bring a draft — you will leave with concrete edits.",
    aiSummary:
      "This workshop breaks resume writing into three layers: keyword alignment for ATS parsing, achievement-driven bullet points using the XYZ formula, and visual hierarchy. Attendees practice rewriting a weak bullet into a metric-backed statement and learn to tailor a single master resume into role-specific variants in under ten minutes.",
    status: "Published",
  },
  {
    id: "ws-02",
    title: "System Design Interviews: From Napkin Sketch to Scalable Diagram",
    speaker: "Marcus Vale",
    speakerRole: "Principal Engineer, Cloudform",
    speakerBio:
      "Marcus has conducted 500+ system design interviews and designed infrastructure serving hundreds of millions of requests per day.",
    room: "Lab 204",
    floor: "2nd Floor",
    day: 1,
    dateISO: "2026-09-14",
    start: "13:30",
    end: "15:30",
    category: "Engineering",
    price: 0,
    capacity: 60,
    registered: 58,
    description:
      "Walk through a full system design prompt live. Learn how to scope requirements, estimate load, and defend trade-offs under pressure.",
    aiSummary:
      "The session models a complete interview loop for designing a URL shortener, covering capacity estimation, data modeling, caching layers, and consistency trade-offs. Emphasis is placed on communicating assumptions early and iterating on the design as new constraints are introduced.",
    status: "Published",
  },
  {
    id: "ws-03",
    title: "Portfolio Reviews: Telling a Product Story Through Case Studies",
    speaker: "Aiko Tanaka",
    speakerRole: "Design Director, Foldwork",
    speakerBio:
      "Aiko has built design teams at three startups and mentors early-career designers on portfolio narrative and craft.",
    room: "Studio C",
    floor: "3rd Floor",
    day: 2,
    dateISO: "2026-09-15",
    start: "10:00",
    end: "12:00",
    category: "Design",
    price: 15,
    capacity: 40,
    registered: 40,
    description:
      "Bring your portfolio for a live critique. We focus on how to frame problems, show process, and prove impact.",
    aiSummary:
      "Attendees learn a case-study template that leads with the problem and business context, then walks through research, iteration, and measurable outcomes. The workshop stresses editing ruthlessly — three strong projects beat eight shallow ones.",
    status: "Published",
  },
  {
    id: "ws-04",
    title: "Practical Machine Learning: Ship Your First Model This Week",
    speaker: "Dr. Samuel Okafor",
    speakerRole: "ML Lead, Quantic",
    speakerBio:
      "Samuel researches applied ML and has deployed recommendation and forecasting systems for retail and logistics companies.",
    room: "Lab 108",
    floor: "1st Floor",
    day: 2,
    dateISO: "2026-09-15",
    start: "14:00",
    end: "16:00",
    category: "Data & AI",
    price: 20,
    capacity: 50,
    registered: 31,
    description:
      "A no-nonsense intro to training, evaluating, and deploying a model without a PhD. Laptops required.",
    aiSummary:
      "The workshop covers the end-to-end lifecycle: framing a problem as supervised learning, splitting data properly, choosing a baseline, and deploying behind a simple API. It warns against common pitfalls like data leakage and over-tuning on validation sets.",
    status: "Published",
  },
  {
    id: "ws-05",
    title: "Pitch Perfect: Fundraising Storytelling for Student Founders",
    speaker: "Priya Nair",
    speakerRole: "Partner, Ember Ventures",
    speakerBio:
      "Priya has invested in 60+ early-stage companies and coaches founders on narrative and investor communication.",
    room: "Hall B",
    floor: "Ground Floor",
    day: 3,
    dateISO: "2026-09-16",
    start: "09:30",
    end: "11:00",
    category: "Entrepreneurship",
    price: 0,
    capacity: 80,
    registered: 22,
    description:
      "Learn the anatomy of a pitch that gets a second meeting. We deconstruct real decks and rebuild them live.",
    aiSummary:
      "This session frames a pitch as a story with tension and resolution: problem, insight, solution, traction, and ask. Founders learn to lead with the sharpest metric and to treat the deck as a conversation aid rather than a script.",
    status: "Published",
  },
  {
    id: "ws-06",
    title: "Speaking with Confidence: Managing Nerves in High-Stakes Rooms",
    speaker: "Grace Bello",
    speakerRole: "Communication Coach",
    speakerBio:
      "Grace trains executives and students in public speaking, drawing on a background in theatre and behavioral science.",
    room: "Room 301",
    floor: "3rd Floor",
    day: 3,
    dateISO: "2026-09-16",
    start: "15:00",
    end: "16:30",
    category: "Communication",
    price: 0,
    capacity: 45,
    registered: 39,
    description:
      "Practical techniques to steady your voice, pace your delivery, and recover gracefully when you lose your thread.",
    aiSummary:
      "The workshop teaches breathing and pacing drills, structured pausing, and reframing anxiety as readiness. Participants practice a 60-second impromptu talk and receive peer feedback using a simple clarity-and-presence rubric.",
    status: "Published",
  },
  {
    id: "ws-07",
    title: "Frontend Performance: Making React Apps Feel Instant",
    speaker: "Leo Whitman",
    speakerRole: "Staff Engineer, Pixelworks",
    speakerBio:
      "Leo specializes in web performance and has cut load times in half for products with millions of users.",
    room: "Lab 204",
    floor: "2nd Floor",
    day: 4,
    dateISO: "2026-09-17",
    start: "10:00",
    end: "12:00",
    category: "Engineering",
    price: 15,
    capacity: 55,
    registered: 12,
    description:
      "Profiling, code-splitting, and rendering strategies that turn a sluggish app into a snappy one.",
    aiSummary:
      "Attendees learn to measure with real user metrics, identify render bottlenecks, and apply code-splitting, memoization, and streaming. The session emphasizes measuring before optimizing and budgeting performance as a feature.",
    status: "Published",
  },
  {
    id: "ws-08",
    title: "Data Storytelling: Turning Dashboards into Decisions",
    speaker: "Nadia Fernsby",
    speakerRole: "Analytics Lead, Brightpath",
    speakerBio:
      "Nadia builds analytics practices that connect raw data to executive decisions across fast-growing companies.",
    room: "Studio C",
    floor: "3rd Floor",
    day: 4,
    dateISO: "2026-09-17",
    start: "13:30",
    end: "15:00",
    category: "Data & AI",
    price: 0,
    capacity: 50,
    registered: 47,
    description:
      "Move beyond charts. Learn to frame data as a narrative that drives action in the room.",
    aiSummary:
      "The workshop contrasts exploratory and explanatory analytics, teaching a top-down structure: lead with the recommendation, support with two or three visuals, and pre-empt objections. Chart choice is treated as an editorial decision, not a default.",
    status: "Published",
  },
  {
    id: "ws-09",
    title: "Negotiating Your First Job Offer Without Burning Bridges",
    speaker: "Tomás Reyes",
    speakerRole: "Career Strategist",
    speakerBio:
      "Tomás has coached hundreds of new grads through offer negotiations and previously led university recruiting at a Fortune 100 firm.",
    room: "Auditorium A",
    floor: "Ground Floor",
    day: 5,
    dateISO: "2026-09-18",
    start: "11:00",
    end: "12:30",
    category: "Career",
    price: 0,
    capacity: 120,
    registered: 65,
    description:
      "The scripts, timing, and mindset for negotiating compensation as a new grad — respectfully and effectively.",
    aiSummary:
      "This session reframes negotiation as collaborative problem-solving. It covers researching market bands, anchoring politely, negotiating the full package beyond base salary, and keeping the relationship warm regardless of outcome.",
    status: "Published",
  },
  {
    id: "ws-10",
    title: "From Idea to MVP: Validating Before You Build",
    speaker: "Hannah Cole",
    speakerRole: "Founder, Loopstart",
    speakerBio:
      "Hannah has launched two products from campus and teaches lean validation to student entrepreneurs.",
    room: "Hall B",
    floor: "Ground Floor",
    day: 5,
    dateISO: "2026-09-18",
    start: "14:00",
    end: "16:00",
    category: "Entrepreneurship",
    price: 20,
    capacity: 70,
    registered: 18,
    description:
      "Stop building in a vacuum. Learn cheap, fast experiments to test demand before you write a line of code.",
    aiSummary:
      "The workshop introduces problem interviews, fake-door tests, and concierge MVPs as ways to validate demand for a fraction of the cost of building. Attendees draft a one-week validation plan for their own idea.",
    status: "Draft",
  },
]

export const registrations: Registration[] = [
  { id: "reg-01", workshopId: "ws-01", status: "Confirmed", registeredAt: "2026-08-30T10:12:00", checkin: "Not yet" },
  { id: "reg-02", workshopId: "ws-03", status: "Pending Payment", registeredAt: "2026-09-01T14:40:00", checkin: "Not yet" },
  { id: "reg-03", workshopId: "ws-06", status: "Confirmed", registeredAt: "2026-08-28T09:05:00", checkin: "Not yet" },
  { id: "reg-04", workshopId: "ws-08", status: "Confirmed", registeredAt: "2026-08-22T16:20:00", checkin: "Checked-in" },
  { id: "reg-05", workshopId: "ws-09", status: "Cancelled", registeredAt: "2026-08-20T11:00:00", checkin: "No-show" },
]

export function seatStatus(w: Workshop): SeatStatus {
  const left = w.capacity - w.registered
  if (left <= 0) return "full"
  if (left / w.capacity <= 0.15) return "low"
  return "available"
}

export function getWorkshop(id: string) {
  return workshops.find((w) => w.id === id)
}

/* registrations trend over the 5 event days */
export const registrationTrend = [
  { day: "Day 1", registrations: 132 },
  { day: "Day 2", registrations: 111 },
  { day: "Day 3", registrations: 61 },
  { day: "Day 4", registrations: 59 },
  { day: "Day 5", registrations: 83 },
]

export const recentRegistrations = [
  { name: "Julia Pham", workshop: "Building a Standout Tech Resume", time: "2 min ago", status: "Confirmed" },
  { name: "Kevin Tran", workshop: "System Design Interviews", time: "9 min ago", status: "Confirmed" },
  { name: "Mai Nguyen", workshop: "Portfolio Reviews", time: "14 min ago", status: "Pending Payment" },
  { name: "Daniel Osei", workshop: "Practical Machine Learning", time: "21 min ago", status: "Confirmed" },
  { name: "Sophia Lee", workshop: "Data Storytelling", time: "33 min ago", status: "Confirmed" },
  { name: "Arjun Rao", workshop: "Speaking with Confidence", time: "40 min ago", status: "Cancelled" },
]

export const attendees = [
  { name: "Julia Pham", studentId: "SE180234", regTime: "Aug 30, 10:12", payment: "Paid", checkin: "Checked-in" },
  { name: "Kevin Tran", studentId: "SE180019", regTime: "Aug 30, 09:41", payment: "Paid", checkin: "Checked-in" },
  { name: "Mai Nguyen", studentId: "SE179888", regTime: "Sep 01, 14:40", payment: "Pending", checkin: "Not yet" },
  { name: "Daniel Osei", studentId: "SE180500", regTime: "Aug 29, 16:03", payment: "Free", checkin: "Checked-in" },
  { name: "Sophia Lee", studentId: "SE180112", regTime: "Aug 28, 11:22", payment: "Free", checkin: "Not yet" },
  { name: "Arjun Rao", studentId: "SE179654", regTime: "Aug 27, 08:59", payment: "Paid", checkin: "No-show" },
]

export const recentScans = [
  { name: "Julia Pham", studentId: "SE180234", time: "09:58", ok: true },
  { name: "Kevin Tran", studentId: "SE180019", time: "09:55", ok: true },
  { name: "Unknown ticket", studentId: "—", time: "09:53", ok: false },
  { name: "Daniel Osei", studentId: "SE180500", time: "09:49", ok: true },
  { name: "Sophia Lee", studentId: "SE180112", time: "09:44", ok: true },
]
