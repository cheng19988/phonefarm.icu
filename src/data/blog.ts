export const BLOG_POSTS = [
  {
    slug: "how-to-choose-phone-farm-box",
    title: "How to Choose a Phone Farm Rack for Your QA Lab",
    category: "Hardware Selection",
    date: "2026-03-27",
    excerpt:
      "Capacity, cooling, power budget, and device model fit matter more than headline node counts. A practical checklist for hardware buyers.",
    content: `When planning a device lab, the rack hardware determines how safely you can run real phones or motherboards day after day.

**1. Device model fit**
Slot spacing follows phone or motherboard dimensions. Share your model list before ordering — a "20-node" rack may fit fewer units if devices are large.

**2. Cooling and room temperature**
Rack fans assist airflow but do not replace room HVAC. Warm climates need both rack cooling modules and ambient temperature planning.

**3. Power budget**
Centralized PSU sizing must match total charging load. Overloading a bus causes random node dropouts during QA runs.

**4. Expansion path**
Start with one catalog rack, validate cable layout, then add empty chassis or custom cabinet rows for scale.

PhoneFarm ICU quotes rack hardware from Guangzhou with configuration advice before shipment. Contact sales with device count and shipping country.`,
  },
  {
    slug: "real-device-vs-cloud-phone",
    title: "Real Device Racks vs Cloud Phones for Testing Labs",
    category: "Lab Planning",
    date: "2026-02-12",
    excerpt:
      "When physical hardware makes sense for mobile app QA, device management, and sensor-accurate testing.",
    content: `Cloud phone services provide remote Android instances on shared servers. Real device racks use hardware you control in your lab or ours.

**Cloud phones can suit:** Early UI prototyping, light compatibility smoke tests, temporary demos.

**Real device racks suit:** Sensor-accurate QA, OS build matrices, device management infrastructure, SIM lab work on physical hardware.

Physical devices reflect real GPS, camera, and radio behavior that virtual environments approximate differently.

PhoneFarm ICU supplies rack hardware — not cloud subscriptions. Request a quote if you are building or expanding a device lab.`,
  },
  {
    slug: "phone-farm-setup-guide-2026",
    title: "Phone Farm Rack Setup Checklist for New Labs",
    category: "Deployment",
    date: "2026-01-20",
    excerpt:
      "Hardware unboxing, power verification, USB topology, and first device detection — a lab commissioning checklist.",
    content: `Use this checklist when commissioning PhoneFarm ICU rack hardware.

**Step 1: Inspect shipment**
Compare packing list to carton contents. Note any transit damage on chassis corners.

**Step 2: Power**
Connect rated PSU only. Verify input voltage label matches your region.

**Step 3: USB topology**
Attach hub uplink to control workstation. Confirm each slot label matches hub port map.

**Step 4: Device placement**
Insert buyer-supplied devices. Enable USB debugging per your lab policy.

**Step 5: Burn-in**
Run a 24-hour detection test before production QA workloads.

Remote setup guidance is available via WhatsApp after hardware delivery.`,
  },
  {
    slug: "motherboard-box-vs-phone-box",
    title: "Motherboard Box vs Phone Farm Rack",
    category: "Hardware Selection",
    date: "2026-04-17",
    excerpt:
      "Density, SIM tray access, and display requirements — how to pick the right Android hardware line.",
    content: `**Motherboard box:** Screenless Android boards, higher density, lower per-node cost. Common in headless automation labs.

**Phone farm rack:** Full smartphones with displays and sensors. Better when apps need camera, GPS, or on-device UI validation.

**SIM lab note:** Tray access depends on board or phone model — confirm in a compatibility check before quoting.

PhoneFarm ICU offers both lines from Guangzhou. Request a sample rack or motherboard box to compare for your workflow.`,
  },
  {
    slug: "bulk-apk-installation-guide",
    title: "Staging Builds Across a Device Lab",
    category: "Lab Operations",
    date: "2026-03-20",
    excerpt:
      "Organizing device groups before pushing test builds to a multi-node rack.",
    content: `Structured device grouping saves time when deploying test builds across many nodes.

1. Group racks by OS version or test campaign in your device management tool
2. Push builds to one pilot node before wide rollout
3. Log failures per slot ID using the rack wiring map from your packing list
4. Replace USB cables on slots with repeated install timeouts

PhoneFarm ICU provides hardware and slot maps — your team owns build deployment tooling.`,
  },
  {
    slug: "enterprise-phone-farm-deployment",
    title: "Planning a Multi-Rack Device Lab",
    category: "Enterprise",
    date: "2026-05-10",
    excerpt:
      "Room power, cabinet layout, and cable management for 50+ device deployments.",
    content: `Labs above 50 devices need more than stacking single racks on shelves.

**Room planning:** Document available amps, cooling capacity, and network entry points before cabinet quoting.

**Hardware:** Custom cabinets with PDU feeds, ducted airflow, and labeled cable trays reduce long-term maintenance cost.

**Operations:** Maintain spare USB cables and fan modules sized to your rack count.

PhoneFarm ICU engineers cabinet projects from Guangzhou. Contact sales with room dimensions and device inventory for a proposal.`,
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
