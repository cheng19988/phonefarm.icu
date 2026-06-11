/** Parse model + specs from product image filenames (material library naming). */

export type ParsedModelMeta = {
  label: string;
  model?: string;
  ramGb?: number;
  storageGb?: number;
  ports: string[];
  variant?: string;
  boardType?: string;
};

const WHITEBG_LABELS: Record<string, string> = {
  IMG_0570: "Empty chassis front — 20 slots, LAN1/LAN2, USB",
  IMG_0571: "Empty chassis rear — 4× fan + PSU bay",
  IMG_0579: "Empty chassis — stacked product photo",
  IMG_0561: "Chassis rear — PSU and cooling fans",
  IMG_0548: "Chassis front — status LED row",
  IMG_0547: "Phone Farm Box — front panel LAN/USB I/O",
  IMG_0549: "Phone Farm Box — angled rack product view",
  IMG_0551: "Motherboard Box — product photo",
  IMG_0553: "Android Phone Farm — product photo",
  IMG_0566: "Compact rack — product photo",
  IMG_0556: "Real Device S8 rack — product photo",
  IMG_0573: "Custom cabinet — product photo",
  IMG_0575: "Cabinet / chassis — product photo",
};

function titleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function parsePorts(tokens: string[]): string[] {
  const ports: string[] = [];
  const joined = tokens.join(" ").toUpperCase();
  if (joined.includes("USB")) ports.push("USB");
  if (joined.includes("LAN")) ports.push("LAN");
  if (joined.includes("OTG")) ports.push("OTG");
  return ports;
}

function parseRamStorage(tokens: string[]): { ramGb?: number; storageGb?: number } {
  for (let i = 0; i < tokens.length - 1; i++) {
    const ram = parseInt(tokens[i], 10);
    const storageMatch = tokens[i + 1]?.match(/^(\d+)GB$/i);
    if (!Number.isNaN(ram) && storageMatch) {
      return { ramGb: ram, storageGb: parseInt(storageMatch[1], 10) };
    }
  }
  const single = tokens.find((t) => /^(\d+)GB$/i.test(t));
  if (single) return { storageGb: parseInt(single, 10) };
  return {};
}

function parseModelName(tokens: string[]): { model?: string; variant?: string } {
  const joined = tokens.join("_");
  const patterns: [RegExp, string, string?][] = [
    [/NOTE_10_LITE/i, "Samsung Note 10 Lite", "Change"],
    [/NOTE_20/i, "Samsung Note 20"],
    [/NOTE_9/i, "Samsung Note 9"],
    [/NOTE_8/i, "Samsung Note 8"],
    [/S21_FE/i, "Samsung S21 FE"],
    [/S20/i, "Samsung S20"],
    [/S10_CHANGE|S10_Change/i, "Samsung S10", "Change"],
    [/S10/i, "Samsung S10"],
    [/S9/i, "Samsung S9"],
    [/S8_CHANGE|S8_Change/i, "Samsung S8", "Change"],
    [/S8/i, "Samsung S8"],
    [/A908N/i, "A908N"],
    [/ONEPLUS_8_PRO/i, "OnePlus 8 Pro"],
    [/ONEPLUS_5/i, "OnePlus 5", "Super Change"],
    [/PIXEL_4XL/i, "Google Pixel 4 XL", "Super Change"],
    [/Z_FLIP4/i, "Samsung Z Flip4"],
    [/Z_FLIP3/i, "Samsung Z Flip3"],
    [/NUBIA_Z17/i, "Nubia Z17", "Super Change"],
    [/PERANGKAT_S8|DEVICE.S8/i, "Samsung S8", "Real device unit"],
  ];
  for (const [re, model, variant] of patterns) {
    if (re.test(joined)) {
      let v = variant;
      if (/SUPER_CHANGE/i.test(joined)) v = "Super Change";
      else if (/CHANGE/i.test(joined) && !v) v = "Change";
      return { model, variant: v };
    }
  }
  return {};
}

export function parseProductImageFilename(filename: string): ParsedModelMeta {
  const base = filename.replace(/\.[^.]+$/, "");

  if (/Perangkat_S8|device-s8/i.test(filename)) {
    return {
      label: "Samsung S8 — real device unit for Box Phone Farm",
      model: "Samsung S8",
      variant: "Real device unit",
      ports: ["USB", "LAN"],
    };
  }

  if (/Structure_of_B/i.test(filename)) {
    return {
      label: "Chassis structure diagram — 20 slots, USB + LAN",
      ports: ["USB", "LAN"],
      boardType: "structure diagram",
    };
  }

  for (const [code, label] of Object.entries(WHITEBG_LABELS)) {
    if (filename.includes(code)) {
      return { label, ports: label.includes("LAN") ? ["LAN", "USB"] : [] };
    }
  }

  const boxMatch = base.match(/^product_Box_Phone_Farm_(.+?)(?:_box-phone-farm|_boxphone-)/i);
  if (boxMatch) {
    const segment = boxMatch[1];
    const tokens = segment.split("_").filter(Boolean);
    const { model, variant } = parseModelName(tokens);
    const { ramGb, storageGb } = parseRamStorage(tokens);
    const ports = parsePorts(tokens);
    const boardType = /black_circuit_board/i.test(segment) ? "Black circuit board" : undefined;

    const parts: string[] = [];
    if (model) parts.push(model);
    if (variant) parts.push(variant);
    if (ramGb && storageGb) parts.push(`${ramGb}GB+${storageGb}GB`);
    else if (storageGb) parts.push(`${storageGb}GB`);
    if (ports.length) parts.push(ports.join(" · "));
    if (boardType) parts.push(boardType);

    const label = parts.length > 0 ? parts.join(" — ") : segment.replace(/_/g, " ");
    return { label, model, ramGb, storageGb, ports, variant, boardType };
  }

  if (/phonefarm\.icu-/i.test(filename)) {
    const tag = filename.replace(/^phonefarm\.icu-/, "").split(/-hero_|-card_|-detail_/)[0];
    return { label: titleCase(tag.replace(/-/g, " ")), ports: [] };
  }

  return { label: base.replace(/_/g, " ").slice(0, 100), ports: [] };
}

export function formatModelLabel(label: string): string {
  let s = label.trim();
  s = s
    .replace(/\bS8 S8\b/gi, "Samsung S8")
    .replace(/\bS9 S9\b/gi, "Samsung S9")
    .replace(/\b(\d+)\s+(\d+)GB\b/gi, "$1GB+$2GB")
    .replace(/\bUSB LAN OTG\b/gi, "USB · LAN · OTG")
    .replace(/\bUSB Port LAN OTG\b/gi, "USB · LAN · OTG")
    .replace(/\s+/g, " ");
  return s;
}

export function specLinesFromMeta(meta: ParsedModelMeta): string[] {
  const lines: string[] = [];
  if (meta.model) lines.push(`Model: ${meta.model}`);
  if (meta.variant) lines.push(`Variant: ${meta.variant}`);
  if (meta.ramGb && meta.storageGb) lines.push(`Memory: ${meta.ramGb}GB RAM + ${meta.storageGb}GB storage`);
  else if (meta.storageGb) lines.push(`Storage: ${meta.storageGb}GB`);
  if (meta.ports.length) lines.push(`Ports: ${meta.ports.join(" · ")}`);
  if (meta.boardType) lines.push(`Board: ${meta.boardType}`);
  return lines;
}
