// src/data/itinerary.js
// Seed data for Sunderland, MA → Spokane, WA — 5-Day Moving Trip via I-90

export const TRIP_META = {
  title: "Sunderland, MA → Spokane, WA",
  totalMiles: 2480,
  totalDays: 5,
  avgMilesPerDay: 496,
  vehicle: "15' UHaul + Auto Transport Trailer",
  pets: 2,
  route: "I-90 W (nearly end-to-end)",
}

// Alias for components that use TRIP_SUMMARY
export const TRIP_SUMMARY = {
  totalMiles: 2480,
  totalDays: 5,
  avgMilesPerDay: 496,
  longestDay: { day: 1, miles: 550 },
  shortestDay: { day: 5, miles: 400 },
  petFriendlyStops: 4,
}

// ---------------------------------------------------------------------------
// DAYS (warnings embedded per day)
// ---------------------------------------------------------------------------

export const DAYS = [
  {
    number: 1,
    from: { name: "Sunderland, MA", lat: 42.4648, lng: -72.5723, state: "MA" },
    to:   { name: "Cleveland, OH",  lat: 41.4993, lng: -81.6944, state: "OH" },
    miles: 550,
    estimatedHours: 9.5,
    departureTime: "06:00",
    elevationGainFt: 3600,
    elevationLossFt: 2900,
    hotelId: "hotel-1",
    warnings: [
      {
        id: "warn-1-1",
        day: 1,
        type: "toll",
        severity: "info",
        message: "New York Thruway tolls (~$20–30 depending on exits)",
        icon: "🛣️",
      },
      {
        id: "warn-1-2",
        day: 1,
        type: "toll",
        severity: "info",
        message: "Ohio Turnpike tolls (~$5–10)",
        icon: "🛣️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 2,
    from: { name: "Cleveland, OH", lat: 41.4993, lng: -81.6944, state: "OH" },
    to:   { name: "Madison, WI",   lat: 43.0731, lng: -89.4012, state: "WI" },
    miles: 530,
    estimatedHours: 9.0,
    departureTime: "06:00",
    elevationGainFt: 1200,
    elevationLossFt: 1000,
    hotelId: "hotel-2",
    warnings: [
      {
        id: "warn-2-1",
        day: 2,
        type: "traffic",
        severity: "warning",
        message: "Chicago metro — aim to pass through before 7 AM or after 9 AM. Rush hour with a UHaul + trailer can cost 2+ hours.",
        icon: "⚠️",
      },
      {
        id: "warn-2-2",
        day: 2,
        type: "toll",
        severity: "info",
        message: "Illinois Tollway (~$5)",
        icon: "🛣️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 3,
    from: { name: "Madison, WI", lat: 43.0731, lng: -89.4012, state: "WI" },
    to:   { name: "Murdo, SD",   lat: 43.8861, lng: -100.7163, state: "SD" },
    miles: 450,
    estimatedHours: 7.5,
    departureTime: "07:00",
    elevationGainFt: 2500,
    elevationLossFt: 900,
    hotelId: "hotel-3",
    warnings: [
      {
        id: "warn-3-1",
        day: 3,
        type: "fuel",
        severity: "caution",
        message: "Gas stations become sparse past Sioux Falls. Fill up before leaving the city.",
        icon: "⛽",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 4,
    from: { name: "Murdo, SD",   lat: 43.8861, lng: -100.7163, state: "SD" },
    to:   { name: "Billings, MT", lat: 45.7833, lng: -108.5007, state: "MT" },
    miles: 550,
    estimatedHours: 9.0,
    departureTime: "06:00",
    elevationGainFt: 6200,
    elevationLossFt: 5800,
    hotelId: "hotel-4",
    warnings: [
      {
        id: "warn-4-1",
        day: 4,
        type: "fuel",
        severity: "caution",
        message: "Long fuel gaps past Rapid City into Wyoming. Keep tank above half at all times.",
        icon: "⛽",
      },
      {
        id: "warn-4-2",
        day: 4,
        type: "elevation",
        severity: "caution",
        message: "Bighorn Mountains near Sheridan, WY reach ~8,000 ft. Take grades slow with trailer.",
        icon: "⛰️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 5,
    from: { name: "Billings, MT", lat: 45.7833, lng: -108.5007, state: "MT" },
    to:   { name: "Spokane, WA",  lat: 47.6588, lng: -117.426,  state: "WA" },
    miles: 400,
    estimatedHours: 6.5,
    departureTime: "07:00",
    elevationGainFt: 2800,
    elevationLossFt: 3900,
    hotelId: null,
    warnings: [],
    note: "",
    completed: false,
  },
]

// ---------------------------------------------------------------------------
// HOTELS
// ---------------------------------------------------------------------------

export const HOTELS = [
  {
    id: "hotel-1",
    day: 1,
    name: "La Quinta Inn & Suites by Wyndham Cleveland Macedonia",
    address: "268 Highland Rd, Macedonia, OH 44056",
    lat: 41.2988,
    lng: -81.517,
    rating: 3.9,
    ratingCount: 1215,
    petFriendly: true,
    petNotes: "Dogs allowed. Note: this location has a 2-dog limit and may charge a pet fee. Call ahead to confirm.",
    phone: "+13304685400",
    chains: ["La Quinta", "Wyndham"],
    tags: ["breakfast", "dog-friendly", "highway-access"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-2",
    day: 2,
    name: "AmericInn by Wyndham Madison West",
    address: "516 Grand Canyon Dr, Madison, WI 53719",
    lat: 43.0553,
    lng: -89.4981,
    rating: 4.1,
    ratingCount: 1378,
    petFriendly: true,
    petNotes: "Pet-friendly property. Highly rated breakfast. Quiet area with easy highway access.",
    phone: "+16085354712",
    chains: ["AmericInn", "Wyndham"],
    tags: ["breakfast", "dog-friendly", "highly-rated", "quiet"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-3",
    day: 3,
    name: "Best Western Graham's",
    address: "301 5th St, Murdo, SD 57559",
    lat: 43.886,
    lng: -100.716,
    rating: 4.4,
    ratingCount: 843,
    petFriendly: true,
    petNotes: "Staff have been reported to have a dog treat bag ready at check-in! Excellent hot breakfast. Renovated retro property.",
    phone: "+16056692441",
    chains: ["Best Western"],
    tags: ["breakfast", "dog-friendly", "dog-treats", "gem", "retro", "highly-rated"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-4",
    day: 4,
    name: "Best Western Yellowstone Crossing",
    address: "205 SE 4th St, Laurel, MT 59044",
    lat: 45.6658,
    lng: -108.769,
    rating: 4.0,
    ratingCount: 823,
    petFriendly: true,
    petNotes: "Dedicated outdoor green space for pets. Dog-traveling reviewers specifically praised this property. Just east of Billings on I-90.",
    phone: "+14066286888",
    chains: ["Best Western"],
    tags: ["breakfast", "dog-friendly", "pet-area", "near-billings"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
]

// ---------------------------------------------------------------------------
// MAP
// ---------------------------------------------------------------------------

export const MAP_MARKERS = [
  { id: "start",         type: "start",       label: "Start — Sunderland, MA",               lat: 42.4648, lng: -72.5723, day: null },
  { id: "hotel-marker-1", type: "hotel",      label: "Night 1 — La Quinta Cleveland",         lat: 41.2988, lng: -81.517,  day: 1, hotelId: "hotel-1" },
  { id: "hotel-marker-2", type: "hotel",      label: "Night 2 — AmericInn Madison",           lat: 43.0553, lng: -89.4981, day: 2, hotelId: "hotel-2" },
  { id: "hotel-marker-3", type: "hotel",      label: "Night 3 — Best Western Graham's Murdo", lat: 43.886,  lng: -100.716, day: 3, hotelId: "hotel-3" },
  { id: "hotel-marker-4", type: "hotel",      label: "Night 4 — BW Yellowstone Crossing",     lat: 45.6658, lng: -108.769, day: 4, hotelId: "hotel-4" },
  { id: "destination",    type: "destination", label: "Home! — Spokane, WA",                  lat: 47.6588, lng: -117.426, day: null },
]

export const WARNING_MARKERS = [
  {
    id: "wmarker-chicago",
    type: "warning",
    label: "⚠️ Chicago Traffic",
    sublabel: "Time carefully — before 7 AM or after 9 AM",
    lat: 41.8827,
    lng: -87.6233,
    day: 2,
  },
  {
    id: "wmarker-bighorn",
    type: "elevation",
    label: "⛰️ Bighorn Mountains",
    sublabel: "~8,000 ft grades — take it slow with trailer",
    lat: 44.6,
    lng: -107.4,
    day: 4,
  },
  {
    id: "wmarker-fuel-wy",
    type: "fuel",
    label: "⛽ Fuel Gap Warning",
    sublabel: "Fill up in Gillette, WY — long gap ahead",
    lat: 44.2998,
    lng: -105.5091,
    day: 4,
  },
]

// ---------------------------------------------------------------------------
// REST STOPS / FUEL STOPS  (shared by both plans — all on I-90 corridor)
// ---------------------------------------------------------------------------

// Coordinates are placed directly on I-90 at the exit/service area
export const REST_STOPS = [
  {
    id: 'rs-guilderland',
    name: 'Guilderland Service Area, NY',
    lat: 42.6823,
    lng: -73.9671,
    note: 'NY Thruway service plaza — fuel, food, restrooms',
    critical: false,
  },
  {
    id: 'rs-pembroke',
    name: 'Pembroke Service Area, NY',
    lat: 42.9574,
    lng: -78.3634,
    note: 'Last NY Thruway plaza before the PA / OH border',
    critical: false,
  },
  {
    id: 'rs-glacierhills',
    name: 'Glacier Hills Service Area, OH',
    lat: 41.6170,
    lng: -83.7930,
    note: 'Ohio Turnpike service plaza — fuel & food near Toledo',
    critical: false,
  },
  {
    id: 'rs-portage',
    name: 'Portage Service Area, IN',
    lat: 41.5625,
    lng: -87.1691,
    note: 'Fill up here before Chicago — avoid stopping in traffic',
    critical: true,
  },
  {
    id: 'rs-janesville',
    name: 'Janesville, WI (I-90 Exit 171)',
    lat: 42.7155,
    lng: -89.0089,
    note: 'Good fuel stop on I-90 through southern Wisconsin',
    critical: false,
  },
  {
    id: 'rs-siouxfalls',
    name: 'Sioux Falls, SD (I-90 Exit 77)',
    lat: 43.5395,
    lng: -96.7175,
    note: 'Critical fuel stop — gas gets very sparse past here into Wyoming',
    critical: true,
  },
  {
    id: 'rs-gillette',
    name: 'Gillette, WY (I-90 Exit 124)',
    lat: 44.2883,
    lng: -105.4754,
    note: 'Only significant fuel stop in eastern Wyoming — fill the tank',
    critical: true,
  },
  {
    id: 'rs-sheridan',
    name: 'Sheridan, WY (I-90 Exit 20)',
    lat: 44.7944,
    lng: -106.9606,
    note: 'Last fuel before Bighorn Mountain grades (~8,000 ft)',
    critical: false,
  },
]

export const ROUTE_WAYPOINTS = [
  [42.4648, -72.5723],   // 0:  Sunderland, MA (Start)
  [42.1015, -72.5898],   // 1:  Springfield, MA
  [42.6526, -73.7562],   // 2:  Albany, NY
  [43.0481, -76.1474],   // 3:  Syracuse, NY
  [43.1548, -77.6158],   // 4:  Rochester, NY
  [42.8864, -78.8784],   // 5:  Buffalo, NY
  // I-90 follows Lake Erie's south shore — add points so the polyline
  // goes SOUTH first from Buffalo before heading west, not across the lake
  [42.7156, -78.8296],   // 6:  Hamburg, NY       — first exit south of Buffalo on I-90
  [42.6401, -79.0233],   // 7:  Angola, NY        — south shore of Lake Erie
  [42.4940, -79.3340],   // 8:  Dunkirk, NY       — south shore of Lake Erie
  [42.3267, -79.5760],   // 9:  Westfield, NY     — south shore of Lake Erie
  [42.1292, -80.0851],   // 10: Erie, PA
  [41.9497, -80.5553],   // 11: Conneaut, OH      — keeps line south of lake to Cleveland
  [41.4993, -81.6944],   // 12: Cleveland, OH
  [41.2988, -81.5170],   // 13: Macedonia, OH     — Hotel Night 1
  [41.6776, -83.5556],   // 14: Toledo, OH
  [41.6764, -86.2520],   // 15: South Bend, IN    — I-90 Indiana Toll Road
  [41.8827, -87.6233],   // 16: Chicago, IL
  [42.2711, -89.0940],   // 17: Rockford, IL      — I-90 northwest of Chicago
  [43.0731, -89.4012],   // 18: Madison, WI
  [43.0553, -89.4981],   // 19: Madison West      — Hotel Night 2
  [43.9695, -91.2396],   // 20: La Crosse, WI
  [44.0121, -92.4802],   // 21: Rochester, MN
  [43.5473, -96.7283],   // 22: Sioux Falls, SD
  [43.8861, -100.7163],  // 23: Murdo, SD         — Hotel Night 3
  [44.0805, -103.2310],  // 24: Rapid City, SD
  [44.2998, -105.5091],  // 25: Gillette, WY
  [44.7972, -106.9562],  // 26: Sheridan, WY
  [44.6,    -107.4000],  // 27: Bighorn Mountains
  [45.7833, -108.5007],  // 28: Billings, MT
  [45.6658, -108.7690],  // 29: Laurel, MT        — Hotel Night 4
  [45.9999, -110.5267],  // 30: Livingston, MT
  [46.5958, -112.0270],  // 31: Helena, MT
  [46.8721, -113.9940],  // 32: Missoula, MT
  [47.6741, -116.7800],  // 33: Coeur d'Alene, ID
  [47.6588, -117.4260],  // 34: Spokane, WA (Destination)
]

export const DAY_SEGMENTS = {
  1: [0,  13],  // Sunderland → Macedonia OH
  2: [13, 19],  // Macedonia  → Madison West
  3: [19, 23],  // Madison    → Murdo SD
  4: [23, 29],  // Murdo      → Laurel MT
  5: [29, 34],  // Laurel     → Spokane
}

// ---------------------------------------------------------------------------
// NOTABLE STOPS / ATTRACTIONS
// ---------------------------------------------------------------------------

export const STOPS = [
  { id: 'stop-1-albany',  day: 1, name: 'Albany, NY',          type: 'city',       icon: '🏙️', note: 'Good fuel & food stop ~2.5 hrs in. Empire State Plaza if you have 20 min.', detour: false },
  { id: 'stop-1-buffalo', day: 1, name: 'Buffalo, NY',          type: 'city',       icon: '🦬', note: 'Fuel & stretch. ~30 min from Niagara Falls if you want the detour.',         detour: false },
  { id: 'stop-1-niagara', day: 1, name: 'Niagara Falls, NY',    type: 'attraction', icon: '💦', note: "~30 min off I-90. Worth it if you've never seen it — dogs love it too.",     detour: true  },
  { id: 'stop-2-depart',  day: 2, name: 'Cleveland (depart)',   type: 'city',       icon: '☕', note: 'Aim to leave before 5 AM to clear Chicago by 7 AM. Fuel up before I-90 W.', detour: false },
  { id: 'stop-2-chicago', day: 2, name: 'Chicago, IL',          type: 'city',       icon: '🌃', note: "Don't stop unless you're early. Lou Malnati's opens at 11 if timing works.", detour: false },
  { id: 'stop-2-milw',    day: 2, name: 'Milwaukee, WI',        type: 'city',       icon: '🏙️', note: 'Good fuel stop after Chicago. Lake Michigan views from I-94.',              detour: false },
  { id: 'stop-3-moa',     day: 3, name: 'Mall of America, MN',  type: 'attraction', icon: '🛍️', note: '~10 min off route near Bloomington. Huge rest stop + dog walk area.',       detour: true  },
  { id: 'stop-3-sf',      day: 3, name: 'Sioux Falls, SD',      type: 'city',       icon: '💧', note: 'Fuel up here — last major city before wide-open SD. Falls Park allows dogs.', detour: false },
  { id: 'stop-3-badlands',day: 3, name: 'Badlands National Park',type: 'attraction', icon: '🏜️', note: '~15 min off I-90 at Exit 131. Dogs allowed on paved paths. Stunning views.', detour: true  },
  { id: 'stop-4-rushmore',day: 4, name: 'Mount Rushmore, SD',   type: 'attraction', icon: '🗿', note: '~30 min detour near Rapid City. Dogs allowed in parking areas. Worth it.',   detour: true  },
  { id: 'stop-4-devils',  day: 4, name: "Devil's Tower, WY",    type: 'attraction', icon: '🗼', note: "~25 min north of I-90 at Moorcroft. Dogs allowed on trails. Iconic.",        detour: true  },
  { id: 'stop-4-sheridan',day: 4, name: 'Sheridan, WY',         type: 'city',       icon: '⛽', note: "FUEL HERE. Last reliable stop before the Bighorns. King's Saddlery nearby.", detour: false },
  { id: 'stop-4-bighorn', day: 4, name: 'Bighorn National Forest',type: 'attraction',icon: '⛰️', note: 'I-90 climbs to 8,950 ft. Pull-offs have incredible views. Slow with trailer.', detour: false },
  { id: 'stop-5-missoula',day: 5, name: 'Missoula, MT',         type: 'city',       icon: '🏔️', note: 'Great fuel + coffee stop. Dog-friendly parks near the Clark Fork River.',    detour: false },
  { id: 'stop-5-cda',     day: 5, name: "Coeur d'Alene, ID",    type: 'attraction', icon: '🏞️', note: 'Stunning lake right off the highway. ~45 min from Spokane. Worth a stop.',  detour: false },
]

// ---------------------------------------------------------------------------
// MAP ROUTE STOPS (used by TripMap for OSRM routing)
// ---------------------------------------------------------------------------

export const STOPS_A = [
  { lat: 42.4522, lng: -72.5620 },  // Sunderland MA
  { lat: 41.2988, lng: -81.5170 },  // Macedonia OH  (Night 1)
  { lat: 43.0553, lng: -89.4981 },  // Madison WI    (Night 2)
  { lat: 43.8861, lng: -100.7163 }, // Murdo SD      (Night 3)
  { lat: 45.6658, lng: -108.7690,   // Laurel MT     (Night 4)
    via: [
      { lat: 44.2911, lng: -105.5022 }, // Gillette, WY  — I-90 dips south here
      { lat: 44.7944, lng: -106.9560 }, // Sheridan, WY  — before Bighorns
    ]
  },
  { lat: 47.6770, lng: -117.2302 }, // Spokane WA
]


export const STOPS_B = [
  { lat: 42.4522, lng: -72.5620 },  // Sunderland MA
  { lat: 41.5662, lng: -83.6490 },  // Maumee OH (Hampton Inn Toledo-South)
  { lat: 43.8058, lng: -91.2612 },  // La Crosse WI (Gundersen Hotel)
  { lat: 44.0700, lng: -103.1950 }, // Rapid City SD (Hampton Inn Rushmore)
  { lat: 46.0038, lng: -112.5348,   // Butte MT (La Quinta Inn & Suites)
    via: [
      { lat: 44.2911, lng: -105.5022 }, // Gillette, WY
      { lat: 44.7944, lng: -106.9560 }, // Sheridan, WY
      { lat: 45.7833, lng: -108.5007 }, // Billings, MT
    ]
  },
  { lat: 47.6770, lng: -117.2302 }, // Spokane WA
]

// ---------------------------------------------------------------------------
// PLAN B — "Push Hard" (extra hour/day → short Day 5)
// ---------------------------------------------------------------------------

export const DAYS_B = [
  {
    number: 1,
    from: { name: "Sunderland, MA", lat: 42.4648, lng: -72.5723, state: "MA" },
    to:   { name: "Maumee, OH",     lat: 41.5662, lng: -83.6490, state: "OH" },
    miles: 605,
    estimatedHours: 10.5,
    departureTime: "05:30",
    elevationGainFt: 3200,
    elevationLossFt: 3400,
    hotelId: "hotel-b1",
    warnings: [
      { id: "b-warn-1-1", day: 1, type: "toll", severity: "info",    message: "New York Thruway tolls (~$20–30 depending on exits)", icon: "🛣️" },
      { id: "b-warn-1-2", day: 1, type: "toll", severity: "info",    message: "Ohio Turnpike tolls (~$10–15)", icon: "🛣️" },
      { id: "b-warn-1-3", day: 1, type: "info", severity: "caution", message: "Longest day of the trip — early start recommended.", icon: "⏰" },
    ],
    note: "",
    completed: false,
  },
  {
    number: 2,
    from: { name: "Toledo, OH",    lat: 41.6639, lng: -83.5553, state: "OH" },
    to:   { name: "La Crosse, WI", lat: 43.8014, lng: -91.2397, state: "WI" },
    miles: 555,
    estimatedHours: 9.5,
    departureTime: "06:00",
    elevationGainFt: 1100,
    elevationLossFt: 1200,
    hotelId: "hotel-b2",
    warnings: [
      { id: "b-warn-2-1", day: 2, type: "traffic", severity: "warning", message: "Chicago metro — aim to pass through before 7 AM or after 9 AM. Rush hour with a UHaul + trailer can cost 2+ hours.", icon: "⚠️" },
      { id: "b-warn-2-2", day: 2, type: "toll",    severity: "info",    message: "Illinois Tollway (~$5)", icon: "🛣️" },
    ],
    note: "",
    completed: false,
  },
  {
    number: 3,
    from: { name: "La Crosse, WI",  lat: 43.8014, lng: -91.2397,  state: "WI" },
    to:   { name: "Rapid City, SD", lat: 44.0805, lng: -103.2310, state: "SD" },
    miles: 600,
    estimatedHours: 10.0,
    departureTime: "06:00",
    elevationGainFt: 3400,
    elevationLossFt: 1100,
    hotelId: "hotel-b3",
    warnings: [
      { id: "b-warn-3-1", day: 3, type: "fuel", severity: "caution", message: "Gas stations become sparse past Sioux Falls. Fill up before leaving the city.", icon: "⛽" },
    ],
    note: "",
    completed: false,
  },
  {
    number: 4,
    from: { name: "Rapid City, SD", lat: 44.0805, lng: -103.2310, state: "SD" },
    to:   { name: "Butte, MT",      lat: 46.0038, lng: -112.5348, state: "MT" },
    miles: 460,
    estimatedHours: 7.0,
    departureTime: "06:00",
    elevationGainFt: 5600,
    elevationLossFt: 4900,
    hotelId: "hotel-b4",
    warnings: [
      { id: "b-warn-4-1", day: 4, type: "fuel",      severity: "caution", message: "Long fuel gaps past Rapid City into Wyoming. Keep tank above half at all times.", icon: "⛽" },
      { id: "b-warn-4-2", day: 4, type: "elevation", severity: "caution", message: "Bighorn Mountains near Sheridan, WY reach ~8,000 ft. Take grades slow with trailer.", icon: "⛰️" },
    ],
    note: "",
    completed: false,
  },
  {
    number: 5,
    from: { name: "Butte, MT",   lat: 46.0038, lng: -112.5348, state: "MT" },
    to:   { name: "Spokane, WA", lat: 47.6588, lng: -117.426,  state: "WA" },
    miles: 260,
    estimatedHours: 4.5,
    departureTime: "08:00",
    elevationGainFt: 2200,
    elevationLossFt: 5100,
    hotelId: null,
    warnings: [],
    note: "Easy final morning — arrive by early afternoon and start settling in!",
    completed: false,
  },
]

export const HOTELS_B = [
  {
    id: "hotel-b1",
    day: 1,
    name: "Hampton Inn Toledo-South/Maumee",
    address: "1409 Reynolds Rd, Maumee, OH 43537",
    lat: 41.5662,
    lng: -83.6490,
    rating: 4.4,
    ratingCount: 900,
    petFriendly: true,
    petNotes: "2 pets up to 75 lbs each. $75 pet fee (1–4 nights). Grassy pet relief area on property.",
    phone: "+14198931004",
    chains: ["Hampton Inn", "Hilton"],
    tags: ["breakfast", "dog-friendly", "highway-access", "pool"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
    alternatives: [
      {
        id: "hotel-b1-alt1",
        name: "Motel 6 Rossford/Toledo",
        address: "1135 Buck Rd, Rossford, OH 43460",
        lat: 41.5934,
        lng: -83.5699,
        rating: 3.5,
        phone: "+14196615050",
        petNotes: "FREE pet fee — 2 dogs allowed. No weight limit.",
        priceRange: "$48–65/night",
      },
      {
        id: "hotel-b1-alt2",
        name: "Days Inn Maumee/Toledo",
        address: "1704 Toll Gate Dr, Maumee, OH 43537",
        lat: 41.5559,
        lng: -83.6567,
        rating: 2.0,
        phone: "+14198875000",
        petNotes: "$15/pet per night.",
        priceRange: "$43–70/night",
      },
    ],
  },
  {
    id: "hotel-b2",
    day: 2,
    name: "Gundersen Hotel & Suites",
    address: "1520 Clinic Court, La Crosse, WI 54601",
    lat: 43.8058,
    lng: -91.2612,
    rating: 4.0,
    ratingCount: 167,
    petFriendly: true,
    petNotes: "Dogs & cats welcome with NO pet fee. Food & water bowls at front desk, dog bones on arrival. Grassy pet relief area. Confirm 2-dog policy when booking.",
    phone: "+16087930200",
    chains: [],
    tags: ["breakfast", "dog-friendly", "highway-access", "pool"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
    alternatives: [
      {
        id: "hotel-b2-alt1",
        name: "Super 8 La Crosse",
        address: "1625 Rose St, La Crosse, WI 54603",
        lat: 43.8225,
        lng: -91.2354,
        rating: 3.7,
        phone: "+16084332453",
        petNotes: "$10–20/pet per night. Free breakfast.",
        priceRange: "$55–95/night",
      },
      {
        id: "hotel-b2-alt2",
        name: "Spark by Hilton Onalaska",
        address: "9409 WI-16, Onalaska, WI 54650",
        lat: 43.8906,
        lng: -91.2327,
        rating: 3.5,
        phone: "+16087835555",
        petNotes: "$25 flat pet fee per stay. Free breakfast.",
        priceRange: "$70–110/night",
      },
    ],
  },
  {
    id: "hotel-b3",
    day: 3,
    name: "Hampton Inn & Suites Rapid City Rushmore",
    address: "825 Eglin St, Rapid City, SD 57701",
    lat: 44.0700,
    lng: -103.1950,
    rating: 4.1,
    ratingCount: 203,
    petFriendly: true,
    petNotes: "2 pets up to 75 lbs each. $50 pet fee (1–4 nights). Call ahead same day to confirm pet room availability.",
    phone: "+16053411879",
    chains: ["Hampton Inn", "Hilton"],
    tags: ["breakfast", "dog-friendly", "highway-access", "pool"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
    alternatives: [
      {
        id: "hotel-b3-alt1",
        name: "Days Inn Rapid City",
        address: "1570 N LaCrosse St, Rapid City, SD 57701",
        lat: 44.0781,
        lng: -103.2142,
        rating: 3.5,
        phone: "+16059393471",
        petNotes: "$35 flat pet fee per stay.",
        priceRange: "$40–80/night",
      },
      {
        id: "hotel-b3-alt2",
        name: "Best Western Ramkota Hotel",
        address: "2111 N LaCrosse St, Rapid City, SD 57701",
        lat: 44.0816,
        lng: -103.2069,
        rating: 3.7,
        phone: "+16053438550",
        petNotes: "$25/pet per night. Restaurant on-site.",
        priceRange: "$75–136/night",
      },
    ],
  },
  {
    id: "hotel-b4",
    day: 4,
    name: "La Quinta Inn & Suites Butte",
    address: "1 Holiday Park Drive, Butte, MT 59701",
    lat: 46.0038,
    lng: -112.5348,
    rating: 4.2,
    ratingCount: 820,
    petFriendly: true,
    petNotes: "$25/pet per night. No weight limit. Pets welcome at this location.",
    phone: "+14064946999",
    chains: ["La Quinta", "Wyndham"],
    tags: ["breakfast", "dog-friendly", "highway-access", "pool"],
    checkInTime: "15:00",
    checkOutTime: "12:00",
    priceRange: "$83–130/night",
    websiteUrl: null,
    alternatives: [
      {
        id: "hotel-b4-alt1",
        name: "Best Western Plus Butte Plaza Inn",
        address: "2900 Harrison Ave, Butte, MT 59701",
        lat: 45.9938,
        lng: -112.5521,
        rating: 4.0,
        phone: "+14064943500",
        petNotes: "$15/pet per night. 80 lb max.",
        priceRange: "$100–139/night",
      },
      {
        id: "hotel-b4-alt2",
        name: "Wingate by Wyndham Butte",
        address: "2107 Cornell Ave, Butte, MT 59701",
        lat: 46.0016,
        lng: -112.5401,
        rating: 3.5,
        phone: "+14062727525",
        petNotes: "$25/pet per night. 70 lb max.",
        priceRange: "$71–107/night",
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// EXPENSE / BUDGET
// ---------------------------------------------------------------------------

export const EXPENSE_CATEGORIES = [
  { id: "fuel",    label: "Fuel",           icon: "⛽", color: "#F59E0B" },
  { id: "lodging", label: "Lodging",        icon: "🏨", color: "#6366F1" },
  { id: "food",    label: "Food & Drink",   icon: "🍔", color: "#10B981" },
  { id: "pet",     label: "Pet Costs",      icon: "🐾", color: "#EC4899" },
  { id: "truck",   label: "Truck/Trailer",  icon: "🚛", color: "#8B5CF6" },
  { id: "tolls",   label: "Tolls",          icon: "🛣️",  color: "#EF4444" },
  { id: "misc",    label: "Miscellaneous",  icon: "📦", color: "#6B7280" },
]

export const DEFAULT_BUDGET = {
  total: 1640,
  byCategory: {
    fuel:    620,   // 2,480 mi ÷ 9 mpg × $3.50/gal
    lodging: 600,   // 4 nights × ~$150/night
    food:    200,   // ~$20/meal × 2 meals × 5 days
    pet:      80,   // pet fees
    truck:     0,   // pre-paid rental
    tolls:    40,   // NY Thruway + Ohio Turnpike + Illinois
    misc:    100,   // buffer
  },
}

export const FUEL_DEFAULTS = {
  mpg: 9,
  gasPricePerGallon: 3.50,
  totalMiles: 2480,
}

// ---------------------------------------------------------------------------
// JOURNAL
// ---------------------------------------------------------------------------

export const DOG_LOG_TYPES = [
  { id: "walk",     label: "Walk",     icon: "🚶" },
  { id: "water",    label: "Water",    icon: "💧" },
  { id: "food",     label: "Food",     icon: "🍖" },
  { id: "bathroom", label: "Bathroom", icon: "🚽" },
  { id: "rest",     label: "Rest",     icon: "😴" },
]

export const MILESTONE_PRESETS = [
  "Left Massachusetts! 🏠",
  "Crossed into New York!",
  "Passed through Buffalo!",
  "Made it through Chicago! 🙌",
  "Crossed into Wisconsin!",
  "Crossed into Minnesota!",
  "Crossed into South Dakota!",
  "Halfway there! 🎉",
  "Crossed into Wyoming!",
  "Crossed into Montana! 🏔️",
  "Crossed into Idaho!",
  "Crossed into Washington!",
  "Arrived in Spokane! 🏠✨",
]
