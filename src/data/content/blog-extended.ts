import type { BlogPost } from "@/data/blog";

export const BLOG_EXTENDED: BlogPost[] = [
  {
    slug: "what-is-box-phone-farm-guide",
    relatedKbSlug: "help-center-overview",
    title: "What Is a Box Phone Farm? Complete Hardware Guide",
    category: "Fundamentals",
    date: "2026-04-01",
    excerpt:
      "Components, operating steps, and benefits of a real-device box phone farm for QA labs and device management teams.",
    content: `A **box phone farm** (phone farm rack) is industrial hardware that houses multiple real smartphones or Android motherboard nodes in one metal chassis.

**Core components**
- Ventilated steel chassis with numbered slots (typically up to 20 positions)
- Centralized PSU — replaces dozens of wall chargers
- Rear fan module for continuous airflow
- USB hub uplink to control workstation
- Optional LAN ports for network-attached device modes
- Optional router/switch module for per-cluster IP isolation

**Operating steps**
1. Unbox and verify packing list against carton contents
2. Connect PSU and verify input voltage (110–220V)
3. Attach USB hub uplink to control PC
4. Insert buyer-supplied phones or boards per slot map
5. Enable USB debugging (Android) or device trust (iOS)
6. Run 24-hour burn-in before production workloads

**Benefits vs scattered phones on desks**
- Lower cable clutter and fewer accidental disconnects
- Predictable thermal layout with labeled airflow path
- Easier spare-part management (fans, hubs, PSU)
- Scales row-by-row with empty chassis or custom cabinets

PhoneFarm ICU manufactures box phone farm hardware in Guangzhou. Browse /products or request a bulk quote.`,
  },
  {
    slug: "phone-farming-getting-started",
    relatedKbSlug: "how-to-choose-phone-farm-rack",
    title: "Phone Farming: Everything You Need to Know to Get Started",
    category: "Fundamentals",
    date: "2026-03-15",
    excerpt:
      "Six-step roadmap from zero to a commissioned real-device lab with hardware, network, and operations planning.",
    content: `**1. Define workload** — QA regression, device management, SIM lab, or multi-account operations. Hardware choice follows workload.

**2. Pick platform** — Android (ADB + USB hub), iPhone (macOS + Lightning/USB-C plan), or mixed (separate rack rows).

**3. Size the rack** — Start with one Phone Farm Box or Motherboard Box sample. Scale to empty chassis rows or custom cabinet above 40 devices.

**4. Plan network** — One VLAN or router segment per 20–40 devices when IP isolation matters.

**5. Commission hardware** — Power, USB topology, burn-in, slot map documentation.

**6. Operate & maintain** — Weekly detection spot-checks, monthly fan filter cleaning, quarterly cable inspection.

Real device farms use physical ARM hardware — not cloud VMs. PhoneFarm ICU supplies the rack layer; your team runs device management software on a control workstation.`,
  },
  {
    slug: "what-is-cloud-phone-guide",
    relatedKbSlug: "help-center-overview",
    title: "What Is a Cloud Phone? A–Z Guide for Hardware Buyers",
    category: "Comparisons",
    date: "2026-02-28",
    excerpt:
      "Virtual phones vs physical racks — cost models, control, and when to buy hardware instead of renting cloud instances.",
    content: `A **cloud phone** is a virtual Android (or iOS-like) environment hosted on a provider's servers. You access it remotely without owning the physical device.

**Cloud phone strengths**
- Low upfront cost — subscription per instance
- Fast spin-up for demos and light smoke tests
- No shipping or customs for international buyers

**Cloud phone limits**
- Shared infrastructure — sensor and radio behavior differ from real hardware
- Ongoing subscription vs one-time rack CapEx
- Less control over OS build matrix and long-running soak tests

**When to buy a box phone farm instead**
- Mobile app QA needing camera, GPS, and real sensors
- Device management infrastructure you operate in-house
- SIM or carrier workflows on physical radios
- Predictable per-node cost at 20+ device scale

PhoneFarm ICU sells real-device rack hardware from Guangzhou — not cloud phone subscriptions. Use our comparison articles to plan hybrid labs (cloud for demos, racks for production QA).`,
  },
  {
    slug: "box-phone-vs-cloud-phone",
    relatedKbSlug: "motherboard-box-vs-phone-box",
    title: "Box Phone Farm vs Cloud Phone: Which Is Right for You?",
    category: "Comparisons",
    date: "2026-02-20",
    excerpt:
      "Side-by-side comparison of ownership, control, upfront cost, and scale for device labs.",
    content: `| Factor | Box phone farm (real hardware) | Cloud phone (virtual) |
|--------|-------------------------------|-------------------------|
| Upfront cost | Higher — rack + devices | Lower — monthly fee |
| Ongoing cost | Power, maintenance, spare parts | Subscription per instance |
| Sensor accuracy | Full hardware sensors | Approximated |
| Control | You own rack and devices | Provider-controlled |
| Scale pattern | Add racks/cabinets | Add instances |
| Best for | QA labs, device ops, SIM hardware | Demos, light compatibility |

**Hybrid approach:** Many teams prototype on cloud phones, then validate release builds on real-device racks before production.

Request a sample Phone Farm Box from PhoneFarm ICU to benchmark your workflow before committing to cloud-only or hardware-only.`,
  },
  {
    slug: "smartphone-models-for-phone-farm",
    relatedKbSlug: "how-to-choose-phone-farm-rack",
    title: "Which Smartphone Models Optimize a Phone Farm Box?",
    category: "Hardware Selection",
    date: "2026-03-10",
    excerpt:
      "Root community, thermals, cost, and USB stability — how to pick Android models for dense racks.",
    content: `**Selection criteria**
- **USB stability** — models with reliable debugging and consistent ADB reconnect
- **Thermals** — avoid devices that throttle aggressively under continuous charging
- **Dimensions** — must fit slot spacing; large phones reduce per-rack node count
- **Cost** — refurbished Samsung / Xiaomi class devices common in device labs
- **OS support** — Android 9+ for modern toolchain compatibility

**Reference platforms in our catalog galleries**
- Samsung S8 / S9 / S10 / Note series — common in box phone farm quotes
- OnePlus, Pixel, Z Flip class — Android farm reference configurations
- A908N class — motherboard box density line

Share your exact model list when requesting a quote — slot layout is confirmed against dimensions, not marketing node count alone.`,
  },
  {
    slug: "proxy-router-configuration-lab",
    relatedKbSlug: "proxy-router-basics",
    title: "Proxy Router Configuration for Phone Farm Labs",
    category: "Networking",
    date: "2026-04-22",
    excerpt:
      "Basic router setup for multi-IP device clusters — VLANs, SOCKS5, and capacity planning.",
    content: `**Why proxy routers in phone farms**
When each device group needs distinct egress IP, a dedicated router or proxy appliance per cluster prevents cross-contamination and rate-limit coupling.

**Capacity planning**
- Entry tier: ~20–30 devices per router cluster
- Mid tier: ~50 devices with managed switch upstream
- High density: mini-PC proxy class for 200+ device rooms (quoted per project)

**Configuration checklist**
1. Place router on dedicated VLAN per rack row
2. Disable conflicting on-device VPN apps when using external SOCKS5
3. Document MAC and IP map per slot ID
4. Test WebRTC leak policy if browser workflows are in scope
5. Size switch ports for control PC + rack LAN paths

PhoneFarm ICU **Network Equipment** SKU provides hardware modules — proxy IPs and carrier SIMs are buyer-supplied. See /products/network-equipment and /knowledge-base/proxy-router-basics.`,
  },
  {
    slug: "box-farm-vs-emulator",
    title: "Box Phone Farm vs Android Emulators: Efficiency for Device Labs",
    category: "Comparisons",
    date: "2026-01-30",
    excerpt:
      "Nox, BlueStacks, and emulator farms vs real ARM hardware for QA and automation.",
    content: `**Emulators (Nox, BlueStacks, Android Studio AVD)**
- Run x86 translated images on PC — fast for UI smoke tests
- Miss real sensor, radio, and OEM skin edge cases
- Single-host CPU/RAM ceiling limits parallel instances

**Box phone farms**
- Real ARM devices with authentic performance characteristics
- Higher per-node cost but accurate release validation
- Scales horizontally by adding rack rows

**Rule of thumb**
- Emulators: early development and CI smoke
- Real racks: pre-release QA, device management infra, SIM hardware workflows

PhoneFarm ICU builds the physical rack layer tested in Guangzhou before export.`,
  },
  {
    slug: "bot-vs-phone-farm-hardware",
    title: "Automation Bots vs Phone Farms: Hardware Safety at Scale",
    category: "Lab Planning",
    date: "2026-05-01",
    excerpt:
      "Why real-device infrastructure reduces platform-detection risk compared to pure bot tooling.",
    content: `Software bots automate API or browser endpoints without physical devices. Phone farms automate on real ARM hardware with authentic device signals.

**Bot-only risks**
- Platform policy violations on API abuse
- Detection on headless browser fingerprints
- No validation of real mobile sensor paths

**Phone farm strengths**
- Real GPS, camera, accelerometer behavior
- Authentic device model and build fingerprints
- Parallel operations across many physical nodes

PhoneFarm ICU supplies rack hardware — not bot subscriptions. Pair hardware with compliant workflows and your legal review.`,
  },
  {
    slug: "scale-phone-farm-100-devices",
    relatedKbSlug: "fleet-slot-management",
    title: "How to Scale a Phone Farm to 100+ Devices",
    category: "Enterprise",
    date: "2026-05-18",
    excerpt:
      "Room power, cabinet layout, PDU sizing, and phased shipment for large labs.",
    content: `**Phase 1 — Pilot** — 1–2 racks, validate cable map and toolchain.

**Phase 2 — Row deployment** — Add empty chassis or catalog racks; document PSU load per row.

**Phase 3 — Cabinet** — Custom cabinet with PDU, ducted cooling, cable trays for 40–100+ nodes.

**Infrastructure checklist**
- Room amps and HVAC capacity (not just rack fans)
- Network entry points per VLAN segment
- Spare cable ratio: 10–20% of total slots
- Phased sea freight for international bulk

Contact sales with room dimensions and device inventory for Enterprise Rack Deployment package quoting.`,
  },
  {
    slug: "phone-farm-mmo-hardware-overview",
    title: "Phone Farm MMO: Sustainable Hardware Infrastructure A–Z",
    category: "Use Cases",
    date: "2026-04-08",
    excerpt:
      "How mass-online-earning workflows map to real-device rack hardware — density, power, and network.",
    content: `MMO (massively multi-opportunity) device workflows often need many real Android nodes with stable USB and optional per-device IP.

**Hardware stack**
- Motherboard box for maximum density when screens are not needed
- Phone farm box when apps require display or sensors
- Network module when IP rotation is required
- Cooling module in warm climates

**Sustainability factors**
- CapEx on racks vs recurring cloud fees
- Power cost at 24/7 charging load
- Maintenance time for cables and fans

PhoneFarm ICU quotes hardware from Guangzhou — workflow compliance is buyer responsibility.`,
  },
  {
    slug: "instagram-phone-farm-hardware",
    title: "Instagram-Scale Operations with Real Device Racks",
    category: "Use Cases",
    date: "2026-03-05",
    excerpt:
      "Hardware planning for multi-account mobile workflows — density, cooling, and network isolation.",
    content: `Instagram-scale mobile workflows on real devices require stable hardware infrastructure:

- **Density** — motherboard boxes for headless tasks; full phones when UI validation matters
- **Network** — per-cluster routers when account isolation needs distinct IP space
- **Cooling** — continuous charging generates heat; plan rack fans + room HVAC
- **Operations** — slot maps, account CSV per device, spare USB cables

We supply racks and modules from Guangzhou. Content policy and platform ToS compliance are buyer responsibilities.`,
  },
  {
    slug: "tiktok-shop-us-network-hardware",
    relatedKbSlug: "proxy-router-basics",
    title: "TikTok Shop US Workflows: Network Hardware Considerations",
    category: "Networking",
    date: "2026-04-25",
    excerpt:
      "Why stable US egress IP and router capacity matter for mobile commerce device labs.",
    content: `Teams running TikTok Shop US workflows on real devices often need:

- Stable US egress IP per device group
- Router tier sized to ~30 devices per cluster (typical starting point)
- SOCKS5 configuration without WebRTC leaks
- Real devices instead of emulators for app behavior accuracy

PhoneFarm ICU **Network Equipment** and **Motherboard Density Pack** bundle network modules with racks. IP sourcing and carrier accounts are buyer-provided.

FAQ: See network equipment product page and proxy router knowledge base article.`,
  },
];
