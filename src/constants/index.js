export const FOUNDER_EMAIL = "jordanhaddadi@gmail.com";

export const AVATARS = ["👩","👨","👩‍🦱","👨‍🦱","👩‍🦰","👨‍🦰","👩‍🦳","👨‍🦳","🧑","👶"];
export const KID_EMOJIS = ["🧒","👦","👧","🧒‍♂️","🧒‍♀️","⭐","🌟","🦊","🐻","🦁"];
export const HOODS = ["All","East End","West End","Downtown","Back Cove","Bayside"];
export const AGE_GROUPS = ["0–1","1–2","2–3","3–4","4–5","5–6","6–8","8–10"];
export const PORTLAND_VENUES = [
  { emoji:"🌊", name:"Eastern Prom Playground", addr:"Eastern Promenade, Munjoy Hill", town:"Portland", type:"Park" },
  { emoji:"🌳", name:"Deering Oaks Park", addr:"Park Ave, West End", town:"Portland", type:"Park" },
  { emoji:"🛝", name:"Payson Park Playground", addr:"Baxter Blvd, Back Cove", town:"Portland", type:"Park" },
  { emoji:"📚", name:"Portland Public Library", addr:"5 Monument Square, Downtown", town:"Portland", type:"Library" },
  { emoji:"☕", name:"Bayside American Cafe", addr:"98 Portland St, Bayside", town:"Portland", type:"Café" },
  { emoji:"🌿", name:"Smalls Café", addr:"28 Brackett St, West End", town:"Portland", type:"Café" },
  { emoji:"🏖️", name:"Willard Beach", addr:"Shore Rd, South Portland", town:"South Portland", type:"Beach" },
  { emoji:"🌲", name:"Fort Williams Park", addr:"Shore Rd, Cape Elizabeth", town:"Cape Elizabeth", type:"Park" },
  { emoji:"🛝", name:"Mill Creek Park", addr:"Cottage Rd, South Portland", town:"South Portland", type:"Park" },
  { emoji:"📚", name:"Falmouth Memorial Library", addr:"5 Lunt Rd, Falmouth", town:"Falmouth", type:"Library" },
  { emoji:"🧁", name:"Coffee By Design", addr:"620 Congress St, Portland", town:"Portland", type:"Café" },
  { emoji:"🎨", name:"Children's Museum of Maine", addr:"142 Free St, Portland", town:"Portland", type:"Indoor" },
  { emoji:"🏖️", name:"Ferry Beach State Park", addr:"95 Bayview Rd, Saco", town:"Saco", type:"Beach" },
  { emoji:"🛝", name:"Rotary Park", addr:"Beach St, Saco", town:"Saco", type:"Park" },
  { emoji:"📚", name:"Dyer Library", addr:"371 Main St, Saco", town:"Saco", type:"Library" },
  { emoji:"🎳", name:"Funtown Splashtown", addr:"774 Portland Rd, Saco", town:"Saco", type:"Indoor" },
  { emoji:"🌊", name:"Hills Beach", addr:"Hills Beach Rd, Biddeford", town:"Biddeford", type:"Beach" },
  { emoji:"☕", name:"Element Coffee", addr:"184 Main St, Biddeford", town:"Biddeford", type:"Café" },
];

export const TOWNS_NEARBY = [
  { id:"south-portland", name:"South Portland", sub:"Willard Beach, Mill Creek", dist:"~3 mi" },
  { id:"cape-elizabeth", name:"Cape Elizabeth", sub:"Fort Williams, Two Lights", dist:"~6 mi" },
  { id:"falmouth", name:"Falmouth", sub:"Mackworth Island, Town Landing", dist:"~7 mi" },
  { id:"scarborough", name:"Scarborough", sub:"Pine Point Beach, Higgins Beach", dist:"~8 mi" },
  { id:"yarmouth", name:"Yarmouth", sub:"Royal River Park, Merrill Library", dist:"~12 mi" },
  { id:"westbrook", name:"Westbrook", sub:"Walker Library, Saccarappa Park", dist:"~6 mi" },
  { id:"gorham", name:"Gorham", sub:"Village Park, Baxter Library", dist:"~14 mi" },
  { id:"saco", name:"Saco / Biddeford", sub:"Ferry Beach, Rotary Park, Dyer Library", dist:"~15 mi" },
];

export const VENUE_TYPES = [
  { type:"Park", icon:"🌳" }, { type:"Beach", icon:"🏖️" }, { type:"Library", icon:"📚" },
  { type:"Café", icon:"☕" }, { type:"Indoor", icon:"🏠" }, { type:"Trail", icon:"🥾" },
];
export const VENUE_PERKS = ["🚗 Free parking","🚽 Bathrooms","👶 Stroller-friendly","☕ Café nearby","🌳 Shade","🔒 Fenced","🐶 Dog-friendly"];

export const ALL_NEIGHBORHOODS = {
  "Portland": ["East End","Munjoy Hill","West End","Downtown","Back Cove","Bayside","East Deering","North Deering","Deering Center","Riverton","Rosemont","Woodfords","Stroudwater","Parkside"],
  "South Portland": ["Knightville","Willard","Mill Creek","Pleasantdale"],
  "Cape Elizabeth": ["Cape Elizabeth Village","Spurwink","Pond Cove"],
  "Falmouth": ["Falmouth Foreside","West Falmouth"],
  "Scarborough": ["Pine Point","Higgins Beach","Oak Hill"],
  "Yarmouth": ["Yarmouth Village","Royal River"],
  "Saco": ["Saco Island","Camp Ellis","Ferry Beach","Milliken Mills"],
  "Biddeford": ["Downtown Biddeford","Hills Beach","Biddeford Pool","Guinea Road"],
};

export const PLAYDATES = [
  { id:1, emoji:"🌊", bg:"linear-gradient(135deg,#EAF3F8,#C8DFE8)", title:"East End Morning Meetup", venue:"Eastern Prom Playground", addr:"Eastern Promenade, East End", hood:"East End", ages:"2–5 yrs", date:"Sat, Mar 14 · 10am", weather:"🌤 38°F", attendees:["🧡","💙","💛"], count:7, host:"Sarah M.", description:"Bundled-up playground fun with ocean views! Bring a thermos, parking on the street.", x:310, y:135, comingSoon:true },
  { id:2, emoji:"🌳", bg:"linear-gradient(135deg,#EEF4EF,#C8DBC9)", title:"Deering Oaks Duck Pond", venue:"Deering Oaks Park", addr:"Park Ave, West End", hood:"West End", ages:"1–4 yrs", date:"Sun, Mar 15 · 11am", weather:"🌥 42°F", attendees:["💜","🧡","💚"], count:5, host:"Jamie & Priya", description:"Feeding the ducks, running the paths, toddler chaos. We grab coffee after!", x:148, y:178, comingSoon:true },
  { id:3, emoji:"📚", bg:"linear-gradient(135deg,#FDF5EC,#EADCC8)", title:"Library Story Time + Hangout", venue:"Portland Public Library", addr:"5 Monument Square, Downtown", hood:"Downtown", ages:"0–4 yrs", date:"Tue, Mar 11 · 10:30am", weather:"🏛 Indoor", attendees:["💛","💙"], count:8, host:"Mia T.", description:"After story time we stay on the kids' floor to let littles play. Totally free!", x:195, y:228, comingSoon:true },
  { id:4, emoji:"🛝", bg:"linear-gradient(135deg,#F8F0EC,#E8D4C8)", title:"Payson Park + Back Cove Stroll", venue:"Payson Park Playground", addr:"Baxter Blvd, Back Cove", hood:"Back Cove", ages:"3–7 yrs", date:"Wed, Mar 12 · 9am", weather:"☀️ 45°F", attendees:["💛","💚","💙","🧡"], count:10, host:"Alex R.", description:"Fenced playground then optional Back Cove trail stroll. Chill pace for everyone.", x:130, y:75, comingSoon:true },
  { id:5, emoji:"☕", bg:"linear-gradient(135deg,#FDF8F0,#EDE0CC)", title:"Bayside Café Parent Coffee", venue:"Bayside American Cafe", addr:"98 Portland St, Bayside", hood:"Bayside", ages:"0–3 yrs", date:"Thu, Mar 13 · 8:30am", weather:"☕ Indoor", attendees:["💜","🧡"], count:6, host:"Dana K.", description:"Parents sip great coffee while babies & toddlers hang out. High chairs available!", x:235, y:148, comingSoon:true },
];

export const pinColor = hood => ({ "East End":"#2A5F7A","West End":"#6B9E6F","Downtown":"#C4583A","Back Cove":"#8B6DB0","Bayside":"#D4993A","Portland":"#C4583A" }[hood] || "#C4583A");

export const HOOD_PIN_DEFAULTS = {
  "East End": { x: 305, y: 130 },
  "West End": { x: 95, y: 185 },
  "Downtown": { x: 200, y: 220 },
  "Back Cove": { x: 140, y: 80 },
  "Bayside": { x: 235, y: 150 },
  default: { x: 200, y: 180 },
};
