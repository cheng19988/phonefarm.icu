export type ZhProductCopy = {
  name: string;
  category: string;
  shortDesc: string;
  description: string;
};

export const ZH_PRODUCTS: Record<string, ZhProductCopy> = {
  "phone-farm-box": {
    name: "手机农场机盒",
    category: "手机农场机柜",
    shortDesc: "约 20 位真机机架 — 集中供电、散热与 USB/LAN 走线",
    description:
      "工业级手机农场机盒，可安装多部真实智能手机，统一电源总线、风扇散热与 USB 集线器上行。适用于手机农场、群控测试与多机运维实验室。",
  },
  "motherboard-box": {
    name: "主板机盒（无屏节点）",
    category: "主板机盒",
    shortDesc: "高密度无屏 Android 主板节点机架",
    description:
      "主板机盒手机农场方案，使用无屏 Android 主板节点，在同等机柜空间内实现更高节点密度，适合大规模手机农场部署。",
  },
  "android-phone-farm": {
    name: "Android 手机农场机架",
    category: "Android 手机农场",
    shortDesc: "预布线 Android 手机农场整机架",
    description:
      "出厂预接线的 Android 手机农场机架，含 USB/ADB 与 LAN 混合走线，便于群控与批量刷机。",
  },
  "iphone-phone-farm": {
    name: "iPhone 手机农场机架",
    category: "iPhone 手机农场",
    shortDesc: "iOS 真机阵列机架（设备自备）",
    description:
      "适用于 iPhone 手机农场的机架硬件，含 Lightning/USB-C 走线与充电总线，支持 Xcode/TestFlight 多机实验室布局。",
  },
  "real-device-phone-farm": {
    name: "真机手机农场方案",
    category: "真机设备农场",
    shortDesc: "多机柜真机手机农场参考部署",
    description:
      "面向生产级真机手机农场的多机柜参考方案，含机架、配电、散热与网络模块规划。",
  },
  "empty-box-chassis": {
    name: "空机箱 / 机架壳体",
    category: "空机箱 / 壳体",
    shortDesc: "可扩展手机农场空机箱与机架壳",
    description:
      "空机箱用于在既有手机农场基础上扩展机位，统一安装孔位与风道设计。",
  },
  "usb-hub": {
    name: "USB 集线器",
    category: "USB 集线器",
    shortDesc: "多设备 USB 上行与供电分配",
    description:
      "为手机农场机架匹配的上行 USB 集线器，经工厂测试与机盒安装位一致。",
  },
  "power-supply-solution": {
    name: "电源方案",
    category: "电源",
    shortDesc: "集中式 PSU 与配电总线",
    description:
      "按节点数量与充电曲线选型，避免手机农场高密度机柜因配电不足导致过热停机。",
  },
  "cooling-solution": {
    name: "散热模块",
    category: "散热",
    shortDesc: "机架风扇与风道升级",
    description:
      "为手机农场机柜增加或更换风扇风道，按机房温度与设备发热量保守选型。",
  },
  "network-equipment": {
    name: "网络设备",
    category: "网络",
    shortDesc: "分集群 IP 隔离与代理路由",
    description:
      "手机农场实验室按设备组分集群出口 IP，降低串号与限速风险。",
  },
  "custom-cabinet": {
    name: "定制机柜",
    category: "定制机柜",
    shortDesc: "多排机柜与 42U 工程定制",
    description:
      "企业级手机农场定制机柜工程，含排布、配电、散热与走线设计。",
  },
  "remote-control-setup": {
    name: "远程装机服务",
    category: "远程控制",
    shortDesc: "Hub 路径验证与工位布局",
    description:
      "远程协助验证 USB 路径、工位显示器布局与手机农场控制站配置。",
  },
};

export function zhProduct(slug: string) {
  return ZH_PRODUCTS[slug];
}
