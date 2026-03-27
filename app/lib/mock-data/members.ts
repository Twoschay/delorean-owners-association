import { Member } from "@/lib/types";

export const DEMO_MEMBER_ID = "member-001";

const US_MEMBERS: Partial<Member>[] = [
  { name: "James Schay", city: "Portland", state: "OR", country: "USA", lat: 45.5051, lng: -122.6750, chapter: "Pacific", profession: "Software Engineer", is_demo_user: true },
  { name: "Robert Mitchell", city: "Los Angeles", state: "CA", country: "USA", lat: 34.0522, lng: -118.2437, chapter: "Pacific", profession: "Film Producer" },
  { name: "Sarah Chen", city: "San Francisco", state: "CA", country: "USA", lat: 37.7749, lng: -122.4194, chapter: "Pacific", profession: "Tech Executive" },
  { name: "David Torres", city: "Phoenix", state: "AZ", country: "USA", lat: 33.4484, lng: -112.0740, chapter: "Southwest", profession: "Automotive Technician" },
  { name: "Michael Johnson", city: "Dallas", state: "TX", country: "USA", lat: 32.7767, lng: -96.7970, chapter: "Southwest", profession: "Petroleum Engineer" },
  { name: "Jennifer Williams", city: "Houston", state: "TX", country: "USA", lat: 29.7604, lng: -95.3698, chapter: "Southwest", profession: "Aerospace Engineer" },
  { name: "Thomas Anderson", city: "New York", state: "NY", country: "USA", lat: 40.7128, lng: -74.0060, chapter: "Northeast", profession: "Investment Banker" },
  { name: "Patricia Brown", city: "Boston", state: "MA", country: "USA", lat: 42.3601, lng: -71.0589, chapter: "Northeast", profession: "University Professor" },
  { name: "Christopher Davis", city: "Chicago", state: "IL", country: "USA", lat: 41.8781, lng: -87.6298, chapter: "Midwest", profession: "Architect" },
  { name: "Amanda Wilson", city: "Detroit", state: "MI", country: "USA", lat: 42.3314, lng: -83.0458, chapter: "Midwest", profession: "Automotive Designer" },
  { name: "Kevin Martinez", city: "Miami", state: "FL", country: "USA", lat: 25.7617, lng: -80.1918, chapter: "Southeast", profession: "Marine Engineer" },
  { name: "Laura Garcia", city: "Atlanta", state: "GA", country: "USA", lat: 33.7490, lng: -84.3880, chapter: "Southeast", profession: "Marketing Director" },
  { name: "Daniel Lee", city: "Seattle", state: "WA", country: "USA", lat: 47.6062, lng: -122.3321, chapter: "Pacific", profession: "Aerospace Engineer" },
  { name: "Michelle Thompson", city: "Denver", state: "CO", country: "USA", lat: 39.7392, lng: -104.9903, chapter: "Southwest", profession: "Outdoor Photographer" },
  { name: "Andrew White", city: "Nashville", state: "TN", country: "USA", lat: 36.1627, lng: -86.7816, chapter: "Southeast", profession: "Music Producer" },
  { name: "Rebecca Harris", city: "Austin", state: "TX", country: "USA", lat: 30.2672, lng: -97.7431, chapter: "Southwest", profession: "Startup Founder" },
  { name: "Joshua Clark", city: "Minneapolis", state: "MN", country: "USA", lat: 44.9778, lng: -93.2650, chapter: "Midwest", profession: "Mechanical Engineer" },
  { name: "Nicole Lewis", city: "Philadelphia", state: "PA", country: "USA", lat: 39.9526, lng: -75.1652, chapter: "Northeast", profession: "Physician" },
  { name: "Ryan Robinson", city: "San Diego", state: "CA", country: "USA", lat: 32.7157, lng: -117.1611, chapter: "Pacific", profession: "Naval Officer" },
  { name: "Stephanie Walker", city: "Charlotte", state: "NC", country: "USA", lat: 35.2271, lng: -80.8431, chapter: "Southeast", profession: "Financial Advisor" },
  { name: "Tyler Young", city: "Las Vegas", state: "NV", country: "USA", lat: 36.1699, lng: -115.1398, chapter: "Pacific", profession: "Casino Manager" },
  { name: "Amber Hall", city: "Cincinnati", state: "OH", country: "USA", lat: 39.1031, lng: -84.5120, chapter: "Midwest", profession: "Lawyer" },
  { name: "Brandon Allen", city: "Indianapolis", state: "IN", country: "USA", lat: 39.7684, lng: -86.1581, chapter: "Midwest", profession: "Racing Mechanic" },
  { name: "Crystal King", city: "Portland", state: "ME", country: "USA", lat: 43.6591, lng: -70.2568, chapter: "Northeast", profession: "Lobster Boat Captain" },
  { name: "Derek Wright", city: "Kansas City", state: "MO", country: "USA", lat: 39.0997, lng: -94.5786, chapter: "Midwest", profession: "BBQ Restaurant Owner" },
  { name: "Erica Scott", city: "New Orleans", state: "LA", country: "USA", lat: 29.9511, lng: -90.0715, chapter: "Southeast", profession: "Jazz Musician" },
  { name: "Frank Green", city: "Tucson", state: "AZ", country: "USA", lat: 32.2226, lng: -110.9747, chapter: "Southwest", profession: "Astronomer" },
  { name: "Grace Adams", city: "Louisville", state: "KY", country: "USA", lat: 38.2527, lng: -85.7585, chapter: "Southeast", profession: "Equestrian Trainer" },
  { name: "Hank Baker", city: "Pittsburgh", state: "PA", country: "USA", lat: 40.4406, lng: -79.9959, chapter: "Northeast", profession: "Steel Worker" },
  { name: "Iris Nelson", city: "Sacramento", state: "CA", country: "USA", lat: 38.5816, lng: -121.4944, chapter: "Pacific", profession: "Winemaker" },
  { name: "Jason Carter", city: "Tampa", state: "FL", country: "USA", lat: 27.9506, lng: -82.4572, chapter: "Southeast", profession: "Real Estate Developer" },
  { name: "Karen Mitchell", city: "Richmond", state: "VA", country: "USA", lat: 37.5407, lng: -77.4360, chapter: "Southeast", profession: "History Professor" },
  { name: "Larry Perez", city: "Albuquerque", state: "NM", country: "USA", lat: 35.0844, lng: -106.6504, chapter: "Southwest", profession: "Chemist" },
  { name: "Mary Roberts", city: "Oklahoma City", state: "OK", country: "USA", lat: 35.4676, lng: -97.5164, chapter: "Southwest", profession: "Geologist" },
  { name: "Nathan Turner", city: "Cleveland", state: "OH", country: "USA", lat: 41.4993, lng: -81.6944, chapter: "Midwest", profession: "Rock & Roll Museum Curator" },
  { name: "Olivia Phillips", city: "Salt Lake City", state: "UT", country: "USA", lat: 40.7608, lng: -111.8910, chapter: "Pacific", profession: "Olympic Ski Coach" },
  { name: "Peter Campbell", city: "Hartford", state: "CT", country: "USA", lat: 41.7658, lng: -72.6851, chapter: "Northeast", profession: "Insurance Actuary" },
  { name: "Quinn Parker", city: "Raleigh", state: "NC", country: "USA", lat: 35.7796, lng: -78.6382, chapter: "Southeast", profession: "Biotech Researcher" },
  { name: "Rachel Evans", city: "Memphis", state: "TN", country: "USA", lat: 35.1495, lng: -90.0490, chapter: "Southeast", profession: "Blues Guitarist" },
  { name: "Samuel Edwards", city: "Baltimore", state: "MD", country: "USA", lat: 39.2904, lng: -76.6122, chapter: "Northeast", profession: "Harbor Pilot" },
  { name: "Tina Collins", city: "San Antonio", state: "TX", country: "USA", lat: 29.4241, lng: -98.4936, chapter: "Southwest", profession: "Military Officer" },
  { name: "Uma Stewart", city: "Boise", state: "ID", country: "USA", lat: 43.6150, lng: -116.2023, chapter: "Pacific", profession: "Potato Farmer" },
  { name: "Victor Morris", city: "Omaha", state: "NE", country: "USA", lat: 41.2565, lng: -95.9345, chapter: "Midwest", profession: "Cattle Rancher" },
  { name: "Wendy Rogers", city: "Providence", state: "RI", country: "USA", lat: 41.8240, lng: -71.4128, chapter: "Northeast", profession: "Jewelry Designer" },
  { name: "Xavier Reed", city: "El Paso", state: "TX", country: "USA", lat: 31.7619, lng: -106.4850, chapter: "Southwest", profession: "Border Patrol Agent" },
  { name: "Yvonne Cook", city: "Honolulu", state: "HI", country: "USA", lat: 21.3069, lng: -157.8583, chapter: "Pacific", profession: "Surfboard Shaper" },
  { name: "Zachary Morgan", city: "Anchorage", state: "AK", country: "USA", lat: 61.2181, lng: -149.9003, chapter: "Pacific", profession: "Bush Pilot" },
  { name: "Aaron Price", city: "Sacramento", state: "CA", country: "USA", lat: 38.5816, lng: -121.4944, chapter: "Pacific", profession: "Cannabis Dispensary Owner" },
  { name: "Beth Sanders", city: "Spokane", state: "WA", country: "USA", lat: 47.6588, lng: -117.4260, chapter: "Pacific", profession: "Nurse Practitioner" },
  { name: "Carl Griffin", city: "Ft. Lauderdale", state: "FL", country: "USA", lat: 26.1224, lng: -80.1373, chapter: "Southeast", profession: "Yacht Broker" },
  { name: "Donna Simmons", city: "Columbus", state: "OH", country: "USA", lat: 39.9612, lng: -82.9988, chapter: "Midwest", profession: "Fashion Designer" },
  { name: "Earl Foster", city: "Cheyenne", state: "WY", country: "USA", lat: 41.1400, lng: -104.8202, chapter: "Southwest", profession: "Rodeo Champion" },
  { name: "Faith Gonzalez", city: "El Paso", state: "TX", country: "USA", lat: 31.7619, lng: -106.4850, chapter: "Southwest", profession: "Bilingual Educator" },
  { name: "Gary Bryant", city: "Des Moines", state: "IA", country: "USA", lat: 41.5868, lng: -93.6250, chapter: "Midwest", profession: "Corn Futures Trader" },
  { name: "Holly Alexander", city: "Billings", state: "MT", country: "USA", lat: 45.7833, lng: -108.5007, chapter: "Pacific", profession: "Veterinarian" },
  { name: "Ivan Russell", city: "Little Rock", state: "AR", country: "USA", lat: 34.7465, lng: -92.2896, chapter: "Southeast", profession: "Timber Mill Owner" },
  { name: "Julia Griffin", city: "Burlington", state: "VT", country: "USA", lat: 44.4759, lng: -73.2121, chapter: "Northeast", profession: "Cheese Maker" },
  { name: "Keith Diaz", city: "San Jose", state: "CA", country: "USA", lat: 37.3382, lng: -121.8863, chapter: "Pacific", profession: "Silicon Valley Engineer" },
  { name: "Linda Ramirez", city: "Corpus Christi", state: "TX", country: "USA", lat: 27.8006, lng: -97.3964, chapter: "Southwest", profession: "Marine Biologist" },
  { name: "Mark Henderson", city: "Madison", state: "WI", country: "USA", lat: 43.0731, lng: -89.4012, chapter: "Midwest", profession: "UW-Madison Professor" },
  { name: "Nancy Patterson", city: "Sioux Falls", state: "SD", country: "USA", lat: 43.5460, lng: -96.7313, chapter: "Midwest", profession: "Pheasant Hunt Guide" },
  { name: "Oscar Hughes", city: "Shreveport", state: "LA", country: "USA", lat: 32.5252, lng: -93.7502, chapter: "Southeast", profession: "Petrochemical Engineer" },
  { name: "Paula Flores", city: "Tucson", state: "AZ", country: "USA", lat: 32.2226, lng: -110.9747, chapter: "Southwest", profession: "Native Art Dealer" },
  { name: "Quincy Washington", city: "Wilmington", state: "DE", country: "USA", lat: 39.7447, lng: -75.5484, chapter: "Northeast", profession: "Chemical Engineer" },
  { name: "Rita James", city: "Fayetteville", state: "NC", country: "USA", lat: 35.0527, lng: -78.8784, chapter: "Southeast", profession: "Retired Army Colonel" },
  { name: "Steve Bell", city: "Wichita", state: "KS", country: "USA", lat: 37.6922, lng: -97.3375, chapter: "Midwest", profession: "Private Pilot" },
  { name: "Teresa Jordan", city: "Lexington", state: "KY", country: "USA", lat: 38.0406, lng: -84.5037, chapter: "Southeast", profession: "Horse Breeder" },
  { name: "Ulysses Webb", city: "Berkeley", state: "CA", country: "USA", lat: 37.8716, lng: -122.2727, chapter: "Pacific", profession: "Professor of Physics" },
  { name: "Vera Stone", city: "Eugene", state: "OR", country: "USA", lat: 44.0521, lng: -123.0868, chapter: "Pacific", profession: "Organic Farmer" },
  { name: "Walter Long", city: "Bridgeport", state: "CT", country: "USA", lat: 41.1865, lng: -73.1952, chapter: "Northeast", profession: "Submarine Mechanic" },
  { name: "Xena Hunt", city: "Springfield", state: "IL", country: "USA", lat: 39.7817, lng: -89.6501, chapter: "Midwest", profession: "State Representative" },
  { name: "Yale Hawkins", city: "Tampa", state: "FL", country: "USA", lat: 27.9506, lng: -82.4572, chapter: "Southeast", profession: "Pharmaceutical Sales" },
  { name: "Zena Cross", city: "Fresno", state: "CA", country: "USA", lat: 36.7378, lng: -119.7871, chapter: "Pacific", profession: "Agricultural Engineer" },
  { name: "Adam Warren", city: "Cleveland", state: "OH", country: "USA", lat: 41.4993, lng: -81.6944, chapter: "Midwest", profession: "Sports Analyst" },
  { name: "Brittany Cole", city: "Baltimore", state: "MD", country: "USA", lat: 39.2904, lng: -76.6122, chapter: "Northeast", profession: "Harbor Tugboat Captain" },
  { name: "Connor Rice", city: "Philadelphia", state: "PA", country: "USA", lat: 39.9526, lng: -75.1652, chapter: "Northeast", profession: "Construction Foreman" },
  { name: "Diana Barnes", city: "Cincinnati", state: "OH", country: "USA", lat: 39.1031, lng: -84.5120, chapter: "Midwest", profession: "Pediatric Surgeon" },
  { name: "Ethan Price", city: "Dallas", state: "TX", country: "USA", lat: 32.7767, lng: -96.7970, chapter: "Southwest", profession: "Oil & Gas Lawyer" },
  { name: "Fiona Hill", city: "Denver", state: "CO", country: "USA", lat: 39.7392, lng: -104.9903, chapter: "Southwest", profession: "National Park Ranger" },
  { name: "Graham Spencer", city: "Detroit", state: "MI", country: "USA", lat: 42.3314, lng: -83.0458, chapter: "Midwest", profession: "Classic Car Restorer" },
  { name: "Hannah Cook", city: "Seattle", state: "WA", country: "USA", lat: 47.6062, lng: -122.3321, chapter: "Pacific", profession: "Amazon Software Dev" },
  { name: "Isaac Powell", city: "Chicago", state: "IL", country: "USA", lat: 41.8781, lng: -87.6298, chapter: "Midwest", profession: "Jazz Pianist" },
  { name: "Jasmine Gray", city: "Houston", state: "TX", country: "USA", lat: 29.7604, lng: -95.3698, chapter: "Southwest", profession: "NASA Flight Director" },
  { name: "Kent Harrison", city: "New York", state: "NY", country: "USA", lat: 40.7128, lng: -74.0060, chapter: "Northeast", profession: "Broadway Director" },
  { name: "Leah Ford", city: "Phoenix", state: "AZ", country: "USA", lat: 33.4484, lng: -112.0740, chapter: "Southwest", profession: "Yoga Studio Owner" },
  { name: "Mike Gardner", city: "San Diego", state: "CA", country: "USA", lat: 32.7157, lng: -117.1611, chapter: "Pacific", profession: "Navy SEAL (Retired)" },
  { name: "Nora Fleming", city: "Boston", state: "MA", country: "USA", lat: 42.3601, lng: -71.0589, chapter: "Northeast", profession: "Harvard Researcher" },
  { name: "Omar Sherman", city: "Las Vegas", state: "NV", country: "USA", lat: 36.1699, lng: -115.1398, chapter: "Pacific", profession: "Entertainment Director" },
  { name: "Penelope Quinn", city: "Austin", state: "TX", country: "USA", lat: 30.2672, lng: -97.7431, chapter: "Southwest", profession: "Country Music Artist" },
  { name: "Ronnie Porter", city: "Louisville", state: "KY", country: "USA", lat: 38.2527, lng: -85.7585, chapter: "Southeast", profession: "Derby Horse Jockey" },
  { name: "Sophia Webb", city: "Miami", state: "FL", country: "USA", lat: 25.7617, lng: -80.1918, chapter: "Southeast", profession: "Fashion Model" },
  { name: "Ted Hudson", city: "Atlanta", state: "GA", country: "USA", lat: 33.7490, lng: -84.3880, chapter: "Southeast", profession: "CNN Journalist" },
  { name: "Ursula Grant", city: "Minneapolis", state: "MN", country: "USA", lat: 44.9778, lng: -93.2650, chapter: "Midwest", profession: "Mall of America GM" },
  { name: "Vince Mason", city: "Nashville", state: "TN", country: "USA", lat: 36.1627, lng: -86.7816, chapter: "Southeast", profession: "Session Guitarist" },
  { name: "Wanda Dixon", city: "Jacksonville", state: "FL", country: "USA", lat: 30.3322, lng: -81.6557, chapter: "Southeast", profession: "Military Attorney" },
  { name: "Xander Stone", city: "Raleigh", state: "NC", country: "USA", lat: 35.7796, lng: -78.6382, chapter: "Southeast", profession: "Biotech CEO" },
  { name: "Yolanda Pierce", city: "Richmond", state: "VA", country: "USA", lat: 37.5407, lng: -77.4360, chapter: "Southeast", profession: "Civil Rights Attorney" },
  { name: "Zach Thornton", city: "Kansas City", state: "MO", country: "USA", lat: 39.0997, lng: -94.5786, chapter: "Midwest", profession: "BBQ Pitmaster" },
];

const UK_MEMBERS: Partial<Member>[] = [
  { name: "Nigel Ashworth", city: "London", state: "England", country: "UK", lat: 51.5074, lng: -0.1278, chapter: "UK", profession: "Financial Analyst" },
  { name: "Charlotte Wyndham", city: "Manchester", state: "England", country: "UK", lat: 53.4808, lng: -2.2426, chapter: "UK", profession: "Manchester United Scout" },
  { name: "Harry Blackwell", city: "Birmingham", state: "England", country: "UK", lat: 52.4862, lng: -1.8904, chapter: "UK", profession: "Automotive Engineer" },
  { name: "Eleanor Cavendish", city: "Bristol", state: "England", country: "UK", lat: 51.4545, lng: -2.5879, chapter: "UK", profession: "Marine Architect" },
  { name: "William Hargreaves", city: "Leeds", state: "England", country: "UK", lat: 53.8008, lng: -1.5491, chapter: "UK", profession: "Textile Mill Owner" },
  { name: "Victoria Forsythe", city: "Edinburgh", state: "Scotland", country: "UK", lat: 55.9533, lng: -3.1883, chapter: "UK", profession: "Whisky Distiller" },
  { name: "Rupert Langley", city: "Glasgow", state: "Scotland", country: "UK", lat: 55.8642, lng: -4.2518, chapter: "UK", profession: "Shipyard Manager" },
  { name: "Beatrice Sutton", city: "Cardiff", state: "Wales", country: "UK", lat: 51.4816, lng: -3.1791, chapter: "UK", profession: "Rugby Coach" },
  { name: "Felix Pemberton", city: "Oxford", state: "England", country: "UK", lat: 51.7520, lng: -1.2577, chapter: "UK", profession: "Oxford Professor" },
  { name: "Sophie Alderton", city: "Cambridge", state: "England", country: "UK", lat: 52.2053, lng: 0.1218, chapter: "UK", profession: "Cambridge Physicist" },
  { name: "George Whitmore", city: "Liverpool", state: "England", country: "UK", lat: 53.4084, lng: -2.9916, chapter: "UK", profession: "Music Producer" },
  { name: "Arabella Thorpe", city: "Bath", state: "England", country: "UK", lat: 51.3811, lng: -2.3590, chapter: "UK", profession: "Architect" },
  { name: "Henry Crawley", city: "York", state: "England", country: "UK", lat: 53.9600, lng: -1.0873, chapter: "UK", profession: "Viking Museum Director" },
  { name: "Isabelle Forsyth", city: "Brighton", state: "England", country: "UK", lat: 50.8229, lng: -0.1363, chapter: "UK", profession: "Fashion Designer" },
  { name: "James Thornberry", city: "Nottingham", state: "England", country: "UK", lat: 52.9548, lng: -1.1581, chapter: "UK", profession: "Forest Ranger" },
  { name: "Katharine Dunmore", city: "Belfast", state: "N. Ireland", country: "UK", lat: 54.5973, lng: -5.9301, chapter: "UK", profession: "Linen Manufacturer" },
  { name: "Liam Fitzgerald", city: "Dublin", state: "Leinster", country: "Ireland", lat: 53.3498, lng: -6.2603, chapter: "UK", profession: "Guinness Brewery Manager" },
  { name: "Madeline Stokes", city: "Southampton", state: "England", country: "UK", lat: 50.9097, lng: -1.4044, chapter: "UK", profession: "Harbor Master" },
  { name: "Nicholas Blythe", city: "Exeter", state: "England", country: "UK", lat: 50.7184, lng: -3.5339, chapter: "UK", profession: "Cathedral Organist" },
  { name: "Olivia Westbrook", city: "Coventry", state: "England", country: "UK", lat: 52.4068, lng: -1.5197, chapter: "UK", profession: "Jaguar R&D Engineer" },
];

const EUROPE_MEMBERS: Partial<Member>[] = [
  { name: "Hans Werner", city: "Munich", state: "Bavaria", country: "Germany", lat: 48.1351, lng: 11.5820, chapter: "Europe", profession: "BMW Engineer" },
  { name: "Klaus Zimmermann", city: "Stuttgart", state: "Baden-Württemberg", country: "Germany", lat: 48.7758, lng: 9.1829, chapter: "Europe", profession: "Porsche Designer" },
  { name: "Pierre Dupont", city: "Paris", state: "Île-de-France", country: "France", lat: 48.8566, lng: 2.3522, chapter: "Europe", profession: "Fashion House Director" },
  { name: "Marie Leclerc", city: "Lyon", state: "Auvergne-Rhône-Alpes", country: "France", lat: 45.7640, lng: 4.8357, chapter: "Europe", profession: "Michelin Chef" },
  { name: "Giorgio Russo", city: "Milan", state: "Lombardy", country: "Italy", lat: 45.4642, lng: 9.1900, chapter: "Europe", profession: "Fashion Photographer" },
  { name: "Valentina Ferrari", city: "Turin", state: "Piedmont", country: "Italy", lat: 45.0703, lng: 7.6869, chapter: "Europe", profession: "Fiat-Chrysler Designer" },
  { name: "Carlos Mendoza", city: "Madrid", state: "Community of Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, chapter: "Europe", profession: "Flamenco Guitar Luthier" },
  { name: "Ana Garcia", city: "Barcelona", state: "Catalonia", country: "Spain", lat: 41.3851, lng: 2.1734, chapter: "Europe", profession: "Architect" },
  { name: "Lars Andersen", city: "Copenhagen", state: "Capital Region", country: "Denmark", lat: 55.6761, lng: 12.5683, chapter: "Europe", profession: "Wind Turbine Engineer" },
  { name: "Astrid Johansson", city: "Stockholm", state: "Stockholm County", country: "Sweden", lat: 59.3293, lng: 18.0686, chapter: "Europe", profession: "ABBA Museum Curator" },
  { name: "Pieter van den Berg", city: "Amsterdam", state: "North Holland", country: "Netherlands", lat: 52.3676, lng: 4.9041, chapter: "Europe", profession: "Diamond Broker" },
  { name: "Sophie Maes", city: "Brussels", state: "Brussels Capital", country: "Belgium", lat: 50.8503, lng: 4.3517, chapter: "Europe", profession: "EU Policy Advisor" },
  { name: "Mikko Virtanen", city: "Helsinki", state: "Uusimaa", country: "Finland", lat: 60.1699, lng: 24.9384, chapter: "Europe", profession: "Nokia Engineer" },
  { name: "Katja Müller", city: "Vienna", state: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, chapter: "Europe", profession: "Opera Singer" },
  { name: "Rafał Kowalski", city: "Warsaw", state: "Masovian", country: "Poland", lat: 52.2297, lng: 21.0122, chapter: "Europe", profession: "Astronaut" },
  { name: "Nikos Papadopoulos", city: "Athens", state: "Attica", country: "Greece", lat: 37.9838, lng: 23.7275, chapter: "Europe", profession: "Shipping Magnate" },
  { name: "Thiago Costa", city: "Lisbon", state: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, chapter: "Europe", profession: "Fado Singer" },
  { name: "Andrei Popescu", city: "Bucharest", state: "Ilfov", country: "Romania", lat: 44.4268, lng: 26.1025, chapter: "Europe", profession: "IT Entrepreneur" },
  { name: "Lukas Novak", city: "Prague", state: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378, chapter: "Europe", profession: "Beer Brewmaster" },
  { name: "Ines Mayer", city: "Zurich", state: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417, chapter: "Europe", profession: "Private Banker" },
];

const INTL_MEMBERS: Partial<Member>[] = [
  { name: "Oliver Richardson", city: "Sydney", state: "NSW", country: "Australia", lat: -33.8688, lng: 151.2093, chapter: "Australia", profession: "Surf Instructor" },
  { name: "Emma Thompson", city: "Melbourne", state: "VIC", country: "Australia", lat: -37.8136, lng: 144.9631, chapter: "Australia", profession: "Coffee Roaster" },
  { name: "Jack Morrison", city: "Brisbane", state: "QLD", country: "Australia", lat: -27.4698, lng: 153.0251, chapter: "Australia", profession: "Crocodile Hunter (Licensed)" },
  { name: "Isla Hamilton", city: "Perth", state: "WA", country: "Australia", lat: -31.9505, lng: 115.8605, chapter: "Australia", profession: "Gold Miner" },
  { name: "Charlotte Davies", city: "Adelaide", state: "SA", country: "Australia", lat: -34.9285, lng: 138.6007, chapter: "Australia", profession: "Winemaker" },
  { name: "Luca Bianchi", city: "Toronto", state: "ON", country: "Canada", lat: 43.6532, lng: -79.3832, chapter: "Northeast", profession: "NHL Trainer" },
  { name: "Sofia Tremblay", city: "Montreal", state: "QC", country: "Canada", lat: 45.5017, lng: -73.5673, chapter: "Northeast", profession: "Cirque Director" },
  { name: "Ethan Campbell", city: "Vancouver", state: "BC", country: "Canada", lat: 49.2827, lng: -123.1207, chapter: "Pacific", profession: "Film Director" },
  { name: "Akira Tanaka", city: "Tokyo", state: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, chapter: "Europe", profession: "Toyota Designer" },
  { name: "Yuki Nakamura", city: "Osaka", state: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023, chapter: "Europe", profession: "Manga Artist" },
  { name: "Wei Chen", city: "Hong Kong", state: "HK", country: "China", lat: 22.3193, lng: 114.1694, chapter: "Europe", profession: "Finance Director" },
  { name: "Priya Sharma", city: "Mumbai", state: "Maharashtra", country: "India", lat: 19.0760, lng: 72.8777, chapter: "Europe", profession: "Bollywood Producer" },
  { name: "Omar Abdullah", city: "Dubai", state: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, chapter: "Europe", profession: "Real Estate Mogul" },
  { name: "Fernanda Silva", city: "São Paulo", state: "SP", country: "Brazil", lat: -23.5505, lng: -46.6333, chapter: "Southwest", profession: "Formula 1 Engineer" },
  { name: "Santiago López", city: "Buenos Aires", state: "BA", country: "Argentina", lat: -34.6037, lng: -58.3816, chapter: "Southwest", profession: "Tango Champion" },
];

function generateBio(name: string, profession: string, year: number): string {
  const firstYear = Math.min(year, 2010);
  const bios = [
    `${name} discovered the DeLorean community in ${firstYear} after purchasing their first DMC-12. A ${profession} by trade, they bring their professional expertise to the club's technical committees.`,
    `After spotting a DMC-12 at a car show, ${name} was immediately captivated by the gull-wing doors and stainless steel body. Now a proud ${profession}, they're one of the most active members in their chapter.`,
    `${name} has been passionate about the DeLorean since childhood, when they saw Back to the Future in theaters. As a ${profession}, they appreciate both the engineering marvel and cultural icon.`,
    `Long-time DOA member ${name} joined in ${firstYear}. Their background as a ${profession} has proven invaluable to fellow members seeking advice on their machines.`,
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}

function getAvatarPlaceholder(name: string): string {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const colors = [
    "from-amber-700 to-amber-500",
    "from-zinc-700 to-zinc-500",
    "from-stone-700 to-stone-500",
    "from-neutral-700 to-neutral-500",
    "from-yellow-700 to-yellow-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return `${initials}|${color}`;
}

const MEMBERSHIP_TYPES = ["national", "international", "lifetime"] as const;

let memberCounter = 0;

function createMember(
  partial: Partial<Member>,
  index: number
): Member {
  const joinYear = 1983 + ((index * 13) % 43);
  const joinMonth = (1 + (index * 7) % 12).toString().padStart(2, "0");
  const joinDay = (1 + (index * 3) % 28).toString().padStart(2, "0");
  const memberType = MEMBERSHIP_TYPES[index % 3];
  const showOnMap = index < 180; // ~180 visible on map

  memberCounter++;
  return {
    id: `member-${String(memberCounter).padStart(3, "0")}`,
    name: partial.name!,
    email: `${partial.name!.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    city: partial.city!,
    state: partial.state!,
    country: partial.country!,
    lat: partial.lat! + (Math.random() - 0.5) * 0.5,
    lng: partial.lng! + (Math.random() - 0.5) * 0.5,
    chapter: partial.chapter!,
    membership_type: memberType,
    join_date: `${joinYear}-${joinMonth}-${joinDay}`,
    profession: partial.profession!,
    bio: generateBio(partial.name!, partial.profession!, joinYear),
    avatar_placeholder: getAvatarPlaceholder(partial.name!),
    show_on_map: showOnMap,
    vehicle_ids: [],
    is_demo_user: partial.is_demo_user || false,
  };
}

// Generate all members
const allPartials = [...US_MEMBERS, ...UK_MEMBERS, ...EUROPE_MEMBERS, ...INTL_MEMBERS];

// Pad to 250 if needed by duplicating with slight variations
while (allPartials.length < 250) {
  const base = allPartials[allPartials.length % 150];
  allPartials.push({
    ...base,
    name: base.name + " Jr.",
    is_demo_user: false,
  });
}

export const MOCK_MEMBERS: Member[] = allPartials.slice(0, 250).map((p, i) =>
  createMember(p, i)
);

// Ensure demo user is member-001
MOCK_MEMBERS[0] = {
  ...MOCK_MEMBERS[0],
  id: DEMO_MEMBER_ID,
  name: "James Schay",
  email: "james.schay@example.com",
  is_demo_user: true,
  membership_type: "national",
  join_date: "2024-03-15",
  bio: "DeLorean enthusiast and software engineer from Portland, OR. Joined the DOA in 2024 after finally landing the DMC-12 I've been dreaming about since watching Back to the Future as a kid.",
};

export const getDemoMember = () => MOCK_MEMBERS.find((m) => m.is_demo_user)!;
export const getMemberById = (id: string) => MOCK_MEMBERS.find((m) => m.id === id);
export const getMapMembers = () => MOCK_MEMBERS.filter((m) => m.show_on_map);
