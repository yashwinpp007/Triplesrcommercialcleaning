// Long-form editorial sections shown on each service page (heading, paragraphs, photo).
// Photos are from tsr pics A; alt text comes from images.json. Copy avoids unverified claims.
export type Story = { h: string; p: string[]; img: string; pos?: string };

export const stories: Record<string, Story[]> = {
  "regular-office-cleaning": [
    {
      h: "A Clean Office Changes How People Feel at Work",
      p: [
        "Most people can tell within a minute whether an office is looked after. A dusty ledge, a sticky kitchen bench or a restroom that smells stale all say something about how the business runs, even if nobody mentions it out loud.",
        "Regular office cleaning keeps those small signals under control. Instead of a rushed tidy-up before a client visit, the space stays presentable every day, which is better for staff morale, for visitors and for the people who have to work there all week.",
      ],
      img: "office-lounge-city",
    },
    {
      h: "Desks, Kitchens and Restrooms Done Properly",
      p: [
        "The areas people use most are the ones that show wear first. Shared kitchens, restrooms, meeting tables and reception counters need steady attention, while personal desks are wiped once they're cleared so nothing important gets moved.",
        "Our teams work through a written checklist for your office: floors vacuumed and mopped, benches and appliances wiped, restrooms sanitised and restocked, bins emptied and touch points such as door handles and switches disinfected.",
      ],
      img: "office-high-shelf-dusting",
    },
    {
      h: "Out-of-Hours Cleaning That Doesn't Get in the Way",
      p: [
        "Most offices prefer cleaning to happen when the team has gone home. Evening and early-morning cleans mean no vacuums during calls, no wet-floor signs in the way of visitors and a fresh workspace waiting at the start of the day.",
        "We can work to your building's access times, alarm procedures and security rules, and we'll agree in advance where equipment is stored and how the space is locked up afterwards.",
      ],
      img: "team-corridor-vacuuming",
    },
    {
      h: "A Routine Built Around Your Workplace",
      p: [
        "Every office runs differently. A busy CBD floor with hot desks needs a different routine from a small professional suite that is only occupied three days a week, and the best cleaning plan reflects that.",
        "After a free walkthrough we set the frequency, the tasks and the areas that matter most, then review it with you as things change. If your team grows or moves, the cleaning plan moves with it.",
      ],
      img: "office-glass-partitions",
    },
  ],

  "commercial-end-of-lease-cleaning": [
    {
      h: "Handing Back the Space the Way the Lease Expects",
      p: [
        "Finishing a commercial lease is already a busy time, and the final inspection can feel like the last hurdle. Landlords and agents usually look closely at floors, walls, kitchens, restrooms and fixtures, and anything missed can slow down the return of a bond or deposit.",
        "A proper end of lease clean works through the whole premises against a checklist, so the space is presented the way the lease and the agent expect.",
      ],
      img: "office-open-plan",
    },
    {
      h: "Floors, Walls and Fixtures Get Real Attention",
      p: [
        "Offices collect marks in places people stop noticing: skirting boards, door frames, switch plates, the edges of carpet and the tracks of sliding doors. These are exactly the places that stand out once the furniture has gone.",
        "We vacuum and mop all floor surfaces, treat marks where they can be removed, wipe down walls, doors and frames, and dust lights, vents and other fixtures within safe reach.",
      ],
      img: "tile-floor-after-2",
    },
    {
      h: "Kitchens, Restrooms and the Details Agents Check",
      p: [
        "Kitchens and restrooms are usually inspected first because they show neglect fastest. Limescale, grease, stained grout and forgotten cupboards can undo the rest of an otherwise good result.",
        "These areas are cleaned inside and out, from sinks and taps to cupboards, appliances, mirrors and fittings, then checked again before we sign the job off.",
      ],
      img: "restroom-vanity-mirror",
    },
    {
      h: "A Clear Plan Before the Final Inspection",
      p: [
        "The best results come from knowing what's expected before the cleaners arrive. We ask for your lease requirements and the agent's checklist, agree the scope in writing and book the clean for a time that works around your move-out and any make-good trades.",
        "If something is raised after the inspection and it's covered by the original scope, tell us promptly and we'll arrange a return visit to put it right.",
      ],
      img: "office-workstations",
    },
  ],

  "health-aged-care-cleaning": [
    {
      h: "Calm, Clean Spaces Matter Most Where People Live and Heal",
      p: [
        "Aged care homes, clinics and allied-health practices are used by people who are often more vulnerable than most. A clean, fresh environment supports comfort and dignity, and it's one of the first things families and patients notice.",
        "Our job is to keep shared areas, amenities and common spaces consistently clean, quietly and respectfully, so staff can focus on care rather than housekeeping.",
      ],
      img: "restroom-vanity",
    },
    {
      h: "High-Touch Areas Deserve a Routine, Not a Rush",
      p: [
        "Handrails, door handles, call points, light switches and tabletops are touched all day by residents, staff and visitors. If they're cleaned irregularly, they become the places where germs and grime build up.",
        "We build high-touch disinfection into every visit, working to the products and procedures your facility specifies and keeping a close eye on stairs, corridors and shared bathrooms.",
      ],
      img: "stairs-mopping-2",
    },
    {
      h: "Separate Equipment to Keep Areas Separate",
      p: [
        "Using the same cloth or mop in different parts of a building is how problems spread. Colour-coded cloths, mops and buckets keep restrooms, kitchens and living areas apart, which is a simple but important habit.",
        "We can adapt the system to your facility's own colour scheme and infection-control rules, and train the team on them before they start.",
      ],
      img: "restroom-vanity-mirror",
    },
    {
      h: "Respectful Teams and Records You Can Rely On",
      p: [
        "Cleaners in a care setting need to be quiet, polite and aware that they're working in someone's home. We brief our team on your site rules, privacy and visitor procedures before the first clean.",
        "If your facility needs cleaning records or sign-off sheets for audits, we can use them so you can see what was done and when.",
      ],
      img: "team-corridor-vacuuming",
    },
  ],

  "warehouse-cleaning": [
    {
      h: "Warehouse Floors Take a Daily Beating",
      p: [
        "Forklifts, pallet jacks, foot traffic and spills all work on a warehouse floor every day. Left alone, dust and grime build up, floors turn slippery in places and the whole site starts to look tired.",
        "Regular scrubbing and sweeping keeps surfaces safer to work on and helps the space look like a well-run operation to visitors, customers and auditors.",
      ],
      img: "pressure-washing-detail",
    },
    {
      h: "Dust, Racking Bases and the Places Nobody Looks",
      p: [
        "The obvious aisles get swept, but dust gathers on racking bases, ledges, beams and corners where it's easy to forget. Over time it ends up in stock, on packaging and in the air.",
        "We dust accessible surfaces and, where safe access is available, use extension poles for higher areas. For anything that needs specialist access, we'll tell you honestly and plan it separately.",
      ],
      img: "high-reach-dusting",
    },
    {
      h: "Amenities and Offices That Match the Standard of the Site",
      p: [
        "A clean warehouse floor can be undone by a poor lunchroom or restroom. Staff notice these spaces every day, and they say a lot about how the business looks after its people.",
        "Amenities, lunchrooms, bathrooms and any front-of-house office are cleaned and restocked on the same schedule as the warehouse itself.",
      ],
      img: "kitchen-clean-floor",
    },
    {
      h: "Scheduled Around Dispatch, Not Against It",
      p: [
        "Cleaning that blocks loading bays at the wrong time costs more than it saves. We walk the site, note forklift routes and peak periods, and plan the clean around them, whether that means after hours, in sections or on weekends.",
        "We follow your inductions and safety rules, use signage on wet floors and keep equipment out of the way so operations aren't held up.",
      ],
      img: "stairs-sweeping",
    },
  ],

  "education-childcare-cleaning": [
    {
      h: "Little Hands Touch Everything",
      p: [
        "In a childcare or early learning centre, tables, shelves, door handles and floors are touched, dropped on and sat on all day. Cleaning has to keep up with that, and parents notice quickly when it doesn't.",
        "Regular after-hours cleaning keeps rooms fresh for each new day and removes the build-up that a quick wipe at pack-up time can't reach.",
      ],
      img: "classroom-cleaner-desks",
    },
    {
      h: "Bathrooms, Kitchens and Nappy Areas Come First",
      p: [
        "The areas that matter most for hygiene are the ones with water, food and nappies. They are cleaned and disinfected with extra care and checked off on the day's list.",
        "Floors are vacuumed and mopped throughout, tables and chairs are wiped and sanitised, and bins are emptied and relined so the centre opens in good order.",
      ],
      img: "restroom-vanity",
    },
    {
      h: "Child-Friendly Products and Gentle Routines",
      p: [
        "Products matter in a centre where children play on the floor. We talk through product choices with you and can use low-odour or gentler options where you prefer them.",
        "Cleaning is planned for after hours, so strong smells have cleared and surfaces are dry before the children arrive.",
      ],
      img: "classroom-screen-clean",
      pos: "object-[50%_68%]",
    },
    {
      h: "A Fresh Start Before Families Arrive",
      p: [
        "A centre that looks and smells clean at drop-off sets the tone for the day. We write a room-by-room checklist for you to approve, so everyone knows exactly what gets cleaned and how often.",
        "Holiday closures are a good time for a deeper clean of carpets, vinyl floors and windows, and we'll plan these with you in advance.",
      ],
      img: "classroom-vacuum-blackboard",
    },
  ],

  "regular-window-cleaning": [
    {
      h: "Clear Glass Changes How a Building Feels",
      p: [
        "Clean windows let in more light and make a shopfront, office or school look cared for. Smeared or marked glass does the opposite, and it's often the first thing a visitor sees before they walk in.",
        "A regular window cleaning schedule keeps glass looking sharp without it ever becoming a big job.",
      ],
      img: "squeegee-window",
    },
    {
      h: "Frames, Tracks and Sills Need Cleaning Too",
      p: [
        "Spotless glass sitting in a grimy frame doesn't look finished. Dust, cobwebs and dirt collect in tracks, on sills and around seals, and they wash straight back onto clean glass in the rain.",
        "We clean the glass and wipe frames, tracks and sills, and can dust fly-screens and blinds as part of the same visit.",
      ],
      img: "blinds-dusting",
    },
    {
      h: "Doors, Partitions and Internal Glass",
      p: [
        "Glass entry doors and internal partitions collect fingerprints all day. In offices, schools and clinics they're some of the most touched surfaces in the building.",
        "Internal glass is included in regular visits, and mirrors and balustrades can be added where needed.",
      ],
      img: "glass-door-vacuum",
    },
    {
      h: "A Regular Schedule Keeps It Looking Sharp",
      p: [
        "How often windows need cleaning depends on where you are. Street-facing shopfronts may need cleaning every week or two, while a quiet office might be fine monthly or quarterly.",
        "We'll recommend a schedule based on your location and use, and we're upfront about what we can reach safely from the ground or with safe-reach equipment.",
      ],
      img: "office-glass-partitions",
    },
  ],

  "hospital-cleaning": [
    {
      h: "Clinical Environments Leave No Room for Guesswork",
      p: [
        "In a hospital or day surgery, cleaning is part of the care environment. Staff, patients and visitors depend on spaces that are clean, orderly and managed to a set procedure.",
        "We work to the protocols your facility specifies, agree the scope with your infection-control or facilities team and keep the routine consistent from visit to visit.",
      ],
      img: "restroom-vanity-mirror",
    },
    {
      h: "Zones, Colour-Coding and Controlled Equipment",
      p: [
        "Different areas carry different risks, so equipment should never move between them without a plan. Colour-coded cloths, mops and buckets keep restrooms, waiting areas and offices apart.",
        "We set up equipment by zone, train the team on your facility's system and keep it separated and stored properly between visits.",
      ],
      img: "restroom-floor-scrubber",
      pos: "object-[50%_55%]",
    },
    {
      h: "Corridors, Waiting Areas and Amenities Done to Protocol",
      p: [
        "Corridors, waiting rooms, bathrooms and staff areas see constant traffic and need dependable, repeatable cleaning. Floors, high-touch points and fixtures are all covered on a defined schedule.",
        "Clinical-zone cleaning has its own requirements. We'll tell you plainly what we can deliver for your site and what should stay with specialist or in-house teams.",
      ],
      img: "team-backpack-vacuum-mask",
    },
    {
      h: "Documentation Your Infection-Control Team Can Audit",
      p: [
        "Good cleaning is also good record-keeping. Daily logs, checklists and sign-off sheets show what was done, when and by whom, which makes audits much easier.",
        "We'll use the format your facility prefers and review it with you, so the paperwork supports your standards instead of adding to your workload.",
      ],
      img: "stairs-mopping",
    },
  ],

  "industrial-cleaning": [
    {
      h: "Heavy Soiling Needs the Right Method",
      p: [
        "Workshops and industrial sites deal with oil, grease, dust and heavy wear. A basic mop doesn't touch that kind of soiling, and using the wrong product on the wrong surface can make things worse.",
        "We match equipment and products to the surface and the type of dirt, from scrubbing machines and degreasers to pressure washers, and we explain what is realistic before work starts.",
      ],
      img: "pressure-washing-concrete",
    },
    {
      h: "Concrete, Docks and External Areas",
      p: [
        "Concrete floors, loading docks and external hardstand areas take the worst of the traffic and weather. Staining, tyre marks and built-up grime make a site look neglected and can create slip risks.",
        "Pressure washing and scrubbing restore these areas, and we'll plan the work around drainage, run-off and your operating hours.",
      ],
      img: "industrial-window-cleaning",
    },
    {
      h: "Amenities, Offices and the Parts Visitors See",
      p: [
        "Behind the workshop floor are lunchrooms, restrooms and offices that staff and visitors use every day. They're easy to overlook when the focus is on the heavy work.",
        "We clean these areas to the same standard as the main floor, so the whole site presents well.",
      ],
      img: "restroom-floor-scrubber",
    },
    {
      h: "Shutdowns, Deep Cleans and Ongoing Maintenance",
      p: [
        "Some sites need a one-off deep clean after a project or during a shutdown, while others need regular maintenance cleaning to keep on top of build-up. Both are better with a clear scope and a realistic timeline.",
        "We follow your inductions and safety rules, mark wet or restricted areas, and don't handle hazardous or regulated waste. If a job needs a licensed specialist, we'll say so.",
      ],
      img: "stairs-sweeping",
    },
  ],

  "factory-cleaning": [
    {
      h: "Production Sites Run on Routine",
      p: [
        "A factory is only as good as its consistency. Build-up of dust, residue and debris slows people down, creates hazards and can affect the quality of what's being made.",
        "A regular cleaning plan keeps floors, walkways and surrounds in order and gives the production team one less thing to worry about.",
      ],
      img: "pressure-washing-detail",
    },
    {
      h: "Cleaning Around Machinery, Safely",
      p: [
        "Machinery changes how cleaning has to be done. We clean in agreed zones, follow your lockout and safety procedures and leave machine-specific cleaning with your trained operators.",
        "Where there's safe access, we dust accessible overhead areas with extension poles, and we plan any work that needs specialist equipment separately.",
      ],
      img: "high-reach-dusting",
    },
    {
      h: "Canteens, Offices and Amenities Staff Rely On",
      p: [
        "A clean production floor means more when the canteen, restrooms and offices are looked after too. Staff spend breaks there, and visitors usually see them first.",
        "We include canteens, lunchrooms, amenities and offices in the same schedule, with bins, benches, floors and restrooms attended to each visit.",
      ],
      img: "kitchen-clean-floor",
    },
    {
      h: "Planned Around Your Shifts",
      p: [
        "Factories rarely stop, so cleaning has to fit shift patterns, changeovers and shutdown windows. We roster around your production schedule, including nights and weekends.",
        "A regular team learns your site, your rules and your priorities, which means less supervision and more consistent results over time.",
      ],
      img: "team-corridor-vacuuming",
    },
  ],

  "school-cleaning": [
    {
      h: "Students Learn Better in Clean Rooms",
      p: [
        "A tidy, fresh classroom helps students and teachers get on with the day. When desks are grimy, floors are gritty or bathrooms are neglected, it's noticed by students, staff and parents.",
        "Regular after-hours cleaning keeps every room ready for the next school day without taking time away from teaching.",
      ],
      img: "classroom-clean",
    },
    {
      h: "Classrooms, Corridors and Shared Spaces",
      p: [
        "Schools have a lot of different spaces: classrooms, libraries, computer labs, staffrooms, corridors and entrances. Each has its own wear patterns and needs a place on the checklist.",
        "We map every room and shared area, then clean desks, boards, benches, carpets, hard floors, bins and bathrooms to a consistent routine.",
      ],
      img: "classroom-computers-clean",
    },
    {
      h: "Halls, Gyms and Floors That Take Hard Wear",
      p: [
        "School halls and gym floors take a lot of punishment from feet, chairs and equipment. Regular scrubbing and polishing keeps them safe and looking good for assemblies, sport and events.",
        "Vinyl and timber floors can be strip-and-sealed during term breaks, when there's time for them to cure without disruption.",
      ],
      img: "hall-floor-polished-2",
    },
    {
      h: "Term Breaks Are the Time for Deep Cleans",
      p: [
        "Daily cleaning keeps a school running, but some jobs are best done when the building is empty: carpet steam cleaning, floor sealing, window cleaning and a thorough reset of every room.",
        "We plan these around your school calendar, follow your sign-in and safety requirements, and agree the schedule well ahead of each break.",
      ],
      img: "classroom-cleaner-desks",
    },
  ],
};
