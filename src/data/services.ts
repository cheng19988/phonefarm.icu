import { IMAGES } from "@/lib/images";

export const SERVICES = [
  {
    slug: "phone-farm-setup",
    title: "Rack Layout Planning",
    description:
      "Workshop support to plan slot count, cable routing, and power budget for phone farm racks — aligned with your device model list and room layout.",
    image: IMAGES.serviceScene,
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Setup Guidance",
    description:
      "ADB path verification, workstation monitor layout, and screen mirroring compatibility check for your rack hardware (buyer-supplied software).",
    image: IMAGES.remoteControl.hero,
  },
  {
    slug: "group-control-system-configuration",
    title: "Power & Cooling Advice",
    description:
      "PSU sizing, fan airflow planning, and thermal notes for dense Android or iPhone clusters in production lab environments.",
    image: IMAGES.androidFarm.hero,
  },
  {
    slug: "bulk-device-deployment",
    title: "Bulk Order Coordination",
    description:
      "Multi-rack project quotes, phased shipment planning, and packing inspection coordination for 20+ unit deployments.",
    image: IMAGES.factory,
  },
  {
    slug: "custom-hardware-solution",
    title: "Custom Cabinet Discussion",
    description:
      "Custom chassis dimensions, node count, and rack integration scoped in a written proposal — OEM/ODM discussion available.",
    image: IMAGES.customCabinet.hero,
  },
  {
    slug: "enterprise-deployment",
    title: "Export & Packing Support",
    description:
      "International logistics from Guangzhou — express courier, sea freight, customs documentation, and pallet packing for bulk hardware.",
    image: IMAGES.network.hero,
  },
  {
    slug: "maintenance-support",
    title: "Warranty & Parts Support",
    description:
      "Replacement fan modules, USB hubs, PSUs, and remote diagnostics guidance for hardware under warranty.",
    image: IMAGES.workshop,
  },
  {
    slug: "sample-solution",
    title: "Sample Order Onboarding",
    description:
      "First-rack evaluation support — accessory checklist, quick-start guide, and pre-sales call for sample orders from 1 unit.",
    image: IMAGES.phoneFarmBox.card,
  },
  {
    slug: "overseas-delivery",
    title: "Shipping Estimate",
    description:
      "Freight quotes by destination country — DHL, FedEx, UPS express, or sea freight for multi-rack projects.",
    image: IMAGES.warehouse,
  },
];
