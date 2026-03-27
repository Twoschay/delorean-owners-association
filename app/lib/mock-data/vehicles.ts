import { Vehicle } from "@/lib/types";
import { MOCK_MEMBERS } from "./members";

// VIN format: SCEDT26T_B_###### (all DeLoreans start with SCEDT26T)
// Position 10: B=1981, C=1982, D=1983
function generateVIN(year: 1981 | 1982 | 1983, seq: number): string {
  const yearCode = year === 1981 ? "B" : year === 1982 ? "C" : "D";
  const seqNum = String(seq).padStart(6, "0");
  const checkDigit = Math.floor(Math.random() * 10);
  return `SCEDT26T${yearCode}${checkDigit}${seqNum}`;
}

const vehicleData = [
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 42500, condition: "Excellent",
    modifications: "Upgraded door struts, new weather stripping, original radio replaced with period-correct unit",
    description: "Original owner documentation, never fully disassembled. Engine rebuilt at 38k miles."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 28300, condition: "Concours",
    modifications: "None — maintained in factory-original condition",
    description: "Award-winning concours example. Has placed at Pebble Beach three times."
  },
  {
    year: 1983, color: "Black", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 67800, condition: "Good",
    modifications: "Custom black wheels, lowered suspension, modern stereo with hidden Bluetooth",
    description: "One of the rare factory-painted black DeLoreans. Documented build sheet."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "Chevy LS3 V8 6.2L swap", transmission: "5-speed manual",
    mileage: 15200, condition: "Excellent",
    modifications: "LS3 engine swap by Midwest DeLorean, upgraded brakes, custom exhaust, roll cage",
    description: "Built for performance. 0-60 in 4.2 seconds. Feature car in DMC News 2024."
  },
  {
    year: 1982, color: "Gold", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 9800, condition: "Concours",
    modifications: "Full gold plated exterior (approx 24 kt), custom tan interior",
    description: "One of approximately 3 known gold-plated DeLoreans. Commissioned by original owner."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "Tesla Model S rear motor (EV conversion)", transmission: "Single-speed direct drive",
    mileage: 22000, condition: "Excellent",
    modifications: "Full EV conversion: Tesla motor, 75kWh battery pack, range 250 miles, CCS charging",
    description: "The future made real. Full EV conversion retaining all original interior styling."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L with turbocharger", transmission: "5-speed manual",
    mileage: 51200, condition: "Good",
    modifications: "Turbo kit by DeLorean Motor Company TX, intercooler, upgraded fuel injectors",
    description: "Makes approximately 180hp. Reliable daily driver for 8 years running."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 38900, condition: "Good",
    modifications: "Modern air conditioning retrofit, updated wiring harness",
    description: "Purchased from the original family estate. All original paperwork present."
  },
  {
    year: 1983, color: "Blue", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 12400, condition: "Excellent",
    modifications: "Factory blue paint (rare), garaged its entire life, original tires (decorative)",
    description: "Time capsule. Found in a California garage in 2019. 12,400 original miles."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "Chevy Bolt motor (EV conversion)", transmission: "Single-speed direct drive",
    mileage: 8800, condition: "Excellent",
    modifications: "Chevy Bolt motor, 65kWh LFP battery pack, 220-mile range, Level 2 + DC Fast Charge",
    description: "Budget-friendly EV conversion that's become the community benchmark build."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (rebuilt)", transmission: "5-speed manual",
    mileage: 73200, condition: "Good",
    modifications: "Complete engine rebuild by PJ Grady, new clutch, refreshed suspension",
    description: "Workhorse of the fleet. Driver quality car that gets used every weekend."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 19600, condition: "Excellent",
    modifications: "Flux Capacitor prop replica (for fun), BTTF license plate frame",
    description: "Yes, the flux capacitor is just a prop. But it does light up."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 88400, condition: "Fair",
    modifications: "Needs timing chain, door struts replaced, fuel pump recently serviced",
    description: "Project car purchased for restoration. Solid body, mechanicals need attention."
  },
  {
    year: 1982, color: "Gold", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 31700, condition: "Good",
    modifications: "Gold painted (not plated), custom tan leather, bespoke audio system",
    description: "Custom-painted gold example with high-quality interior work. Very striking."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L + Magnuson supercharger", transmission: "5-speed manual",
    mileage: 44100, condition: "Excellent",
    modifications: "Magnuson supercharger, larger throttle body, stainless exhaust headers",
    description: "Makes 210whp. Track tested at Thunderhill Raceway. Very sorted setup."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 56300, condition: "Good",
    modifications: "Full stainless steel polish to mirror finish, coilover suspension",
    description: "The shiniest DeLorean in the Pacific chapter. You can literally see yourself."
  },
  {
    year: 1982, color: "Black", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 22800, condition: "Good",
    modifications: "Custom black velvet interior, blacked-out trim, dark tinted glass",
    description: "All-black build inside and out. The stealthy DeLorean experience."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "Tesla Model 3 motor (EV conversion)", transmission: "Single-speed direct drive",
    mileage: 31000, condition: "Excellent",
    modifications: "Tesla Model 3 rear motor, 82kWh pack, 270-mile range, regenerative braking",
    description: "Latest EV build in the community. Uses the more efficient Model 3 motor."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 61800, condition: "Good",
    modifications: "Stainless restoration by PJ Grady, new carpet and headliner",
    description: "Fresh from a 2-year restoration. Looks factory but with modern reliability."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 47200, condition: "Excellent",
    modifications: "None significant — maintained to high standard",
    description: "Honest, well-maintained example with complete service history."
  },
  {
    year: 1983, color: "Blue", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 28900, condition: "Good",
    modifications: "Factory blue paint, period-correct Momo steering wheel, Sparco seats",
    description: "One of approximately 100 factory blue examples. Very desirable color."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L + twin scroll turbo", transmission: "5-speed manual",
    mileage: 35400, condition: "Excellent",
    modifications: "Custom twin-scroll turbo build, water-methanol injection, built transmission",
    description: "Race prep with road manners. Puts down 225whp reliably."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 93400, condition: "Fair",
    modifications: "High mileage but well maintained — needs timing and gaskets",
    description: "Daily driven for 30 years by original owner. The highest-mileage DOA car."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L (rebuilt)", transmission: "5-speed manual",
    mileage: 41600, condition: "Excellent",
    modifications: "Full frame-off restoration over 4 years, every nut and bolt addressed",
    description: "Best-in-show winner at three national DeLorean events."
  },
  {
    year: 1981, color: "Gold", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 16200, condition: "Excellent",
    modifications: "Gold vinyl wrap (removable), custom tan interior, original engine",
    description: "Showstopper at every event. Turns more heads than a Lambo at Cars & Coffee."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "Rivian Adventure motor (EV conversion)", transmission: "Single-speed direct drive",
    mileage: 9100, condition: "Excellent",
    modifications: "Rivian quad-motor (front only), 75kWh pack, torque vectoring, ADAS safety",
    description: "Bleeding edge EV conversion using Rivian truck motor. Featured in EV World."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 5300, condition: "Concours",
    modifications: "Factory correct — never modified",
    description: "5,300 original miles. May be the lowest-mileage DMC-12 in private hands."
  },
  {
    year: 1981, color: "Black", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 71200, condition: "Good",
    modifications: "Black exterior, custom charcoal interior, modern infotainment hidden in dash",
    description: "Understated and cool. A daily driver that still draws a crowd."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L + Kenne Bell supercharger", transmission: "5-speed manual",
    mileage: 58900, condition: "Good",
    modifications: "Kenne Bell blower, forged internals, upgraded driveshafts",
    description: "The most powerful PRV-engined DeLorean in the club at 195whp."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 34100, condition: "Excellent",
    modifications: "One of the last DeLoreans off the line — documented build #",
    description: "Historically significant late-production example with original factory spec sheet."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (rebuilt)", transmission: "5-speed manual",
    mileage: 29700, condition: "Good",
    modifications: "Engine rebuilt, suspension refreshed, period-correct wheels and tires",
    description: "Well-sorted driver that looks great and goes down the road perfectly."
  },
  {
    year: 1982, color: "Blue", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 18400, condition: "Excellent",
    modifications: "Factory blue, matching blue interior, dealer-installed options",
    description: "Found in storage in 2021 with full history. Beautiful example."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "Chevy LS1 5.7L V8 swap", transmission: "5-speed manual",
    mileage: 24800, condition: "Excellent",
    modifications: "LS1 swap, T56 6-speed, upgraded brakes, roll bar, Recaro seats",
    description: "The weekend warrior. Built for track days and long-distance cruises."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 49500, condition: "Good",
    modifications: "Full Stainless Steel polishing kit applied, modern tire sizes",
    description: "Clean example, well presented. Popular show car in the Southeast chapter."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "Chevy Bolt motor (EV conversion)", transmission: "Single-speed direct drive",
    mileage: 14700, condition: "Excellent",
    modifications: "EV conversion, 70kWh battery, 200-mile range, J1772 + CHAdeMO charging",
    description: "Proof that an EV DeLorean doesn't have to cost $80k to build."
  },
  {
    year: 1983, color: "Gold", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 11200, condition: "Concours",
    modifications: "Gold paint (factory ordered via dealer custom order), original paperwork",
    description: "One of very few gold examples with factory documentation."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (rebuilt)", transmission: "5-speed manual",
    mileage: 83100, condition: "Good",
    modifications: "Full mechanical refresh at 80k, new clutch, timing, cooling system",
    description: "High-mileage but freshly serviced. Drives like new."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 37800, condition: "Good",
    modifications: "California car, no rust, original paint unmolested",
    description: "Pacific coast DeLorean. Salt-free and rust-free its whole life."
  },
  {
    year: 1983, color: "Black", engine: "PRV V6 2.85L + turbo", transmission: "5-speed manual",
    mileage: 26500, condition: "Excellent",
    modifications: "Black exterior, turbo engine, widened rear arches, racing harness",
    description: "The baddest DeLorean in the club. Looks like a movie villain's car."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 52700, condition: "Good",
    modifications: "UK import, right-hand drive conversion, period British accessories",
    description: "One of the UK chapter's most interesting examples — proper RHD conversion."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (rebuilt)", transmission: "5-speed manual",
    mileage: 61100, condition: "Excellent",
    modifications: "Complete restoration with NOS parts sourced from DMC Texas inventory",
    description: "Museum quality restoration using genuine NOS parts. Documented authenticity."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "Tesla Model S Plaid motor (EV conversion)", transmission: "Single-speed direct drive",
    mileage: 18200, condition: "Excellent",
    modifications: "Tesla Plaid motor, 100kWh pack, 0-60 in 2.8s, ADAS, adaptive suspension",
    description: "The fastest DeLorean in the world. 2.8-second 0-60. Handles perfectly."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 64300, condition: "Good",
    modifications: "Dealer-installed A/C (works), factory console replaced with custom walnut",
    description: "Comfortable tourer. The automatic makes it an easy city driver."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 45600, condition: "Good",
    modifications: "Stainless refresh, new door gaskets, all new rubber",
    description: "Clean, honest example. Well-documented with maintenance records."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L (rebuilt)", transmission: "5-speed manual",
    mileage: 33200, condition: "Excellent",
    modifications: "Frame-up restoration by PJ Grady UK, everything new or rebuilt",
    description: "As close to new as you can get in 2026. Every bolt torqued to spec."
  },
  {
    year: 1981, color: "Blue", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 41800, condition: "Good",
    modifications: "Factory blue, European spec, imported from Germany in 2015",
    description: "European delivery example with different spec from US cars."
  },
  {
    year: 1982, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "3-speed automatic",
    mileage: 57300, condition: "Good",
    modifications: "Stock car, documented service history, garage kept",
    description: "Single family owned since new. Original service receipts from 1982."
  },
  {
    year: 1983, color: "Stainless Steel", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 23900, condition: "Excellent",
    modifications: "Documented last month of production. VIN in the 8,000s series.",
    description: "One of the very last DeLoreans built. Historically significant example."
  },
  {
    year: 1981, color: "Stainless Steel", engine: "Chevy LS2 6.0L V8 swap", transmission: "6-speed manual",
    mileage: 19300, condition: "Excellent",
    modifications: "LS2 swap, Tremec T56 Magnum 6-speed, 355mm Brembo brakes, Bilstein coilovers",
    description: "The ultimate daily driver build. Highway cruises at 2,100 RPM."
  },
  {
    year: 1982, color: "Gold", engine: "PRV V6 2.85L (stock)", transmission: "5-speed manual",
    mileage: 8700, condition: "Concours",
    modifications: "Factory gold paint, perfect panel fit, untouched interior",
    description: "The gold standard. Original factory order documentation for special paint."
  },
];

export const MOCK_VEHICLES: Vehicle[] = vehicleData.map((v, i) => {
  // Distribute vehicles among members
  const ownerIndex = i % 50; // assign to first 50 members
  const owner = MOCK_MEMBERS[ownerIndex];

  const vehicle: Vehicle = {
    id: `vehicle-${String(i + 1).padStart(3, "0")}`,
    owner_id: owner.id,
    year: v.year as 1981 | 1982 | 1983,
    vin: generateVIN(v.year as 1981 | 1982 | 1983, i + 1000),
    color: v.color as Vehicle["color"],
    engine: v.engine,
    transmission: v.transmission as Vehicle["transmission"],
    mileage: v.mileage,
    modifications: v.modifications,
    description: v.description,
    condition: v.condition as Vehicle["condition"],
    added_date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  };

  // Add vehicle to owner's vehicle_ids
  if (!MOCK_MEMBERS[ownerIndex].vehicle_ids.includes(vehicle.id)) {
    MOCK_MEMBERS[ownerIndex].vehicle_ids.push(vehicle.id);
  }

  return vehicle;
});

export const getVehicleById = (id: string) => MOCK_VEHICLES.find((v) => v.id === id);
export const getVehiclesByOwner = (ownerId: string) =>
  MOCK_VEHICLES.filter((v) => v.owner_id === ownerId);
