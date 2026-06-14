export const ZH_PHONE_FARM_SECTIONS = [
  {
    id: "what-is",
    paragraphs: [
      "手机农场（Phone Farm）是将多部真实智能手机或 Android 主板节点集中安装在工业机架中的物理基础设施，具备集中供电、USB/LAN 连接、散热与控制工位，广泛用于移动应用 QA、群控运维、多设备自动化等场景。",
      "与云手机不同，手机农场买家拥有实体硬件。PhoneFarm ICU 是广州工厂直供的手机农场机盒、主板机盒及配套模块制造商，自 2017 年出口全球设备实验室。",
    ],
  },
  {
    id: "architecture",
    title: "手机农场系统架构",
    paragraphs: [
      "典型手机农场由机架本体、集中电源、USB 集线器上行、散热风道、可选网络模块与控制工位 PC 组成。节点通过 USB 或 LAN 与工位通信，按集群划分可降低 IP 关联风险。",
    ],
    bullets: [
      "机架层：手机农场机盒 / 主板机盒 / 空机箱扩展",
      "配电层：按节点数与充电曲线选型 PSU",
      "连接层：USB 2.0/3.0 或 LAN 以太网群控",
      "散热层：机架风扇 + 机房空调规划",
      "网络层：分集群代理路由（可选）",
      "控制层：Windows / macOS 工位（iOS 场景推荐 Mac）",
    ],
  },
  {
    id: "product-lines",
    title: "手机农场产品线",
    items: [
      {
        name: "手机农场机盒",
        href: "/zh/products/phone-farm-box",
        summary: "约 20 位真机机架，完整供电散热与 I/O 走线。",
      },
      {
        name: "主板机盒",
        href: "/zh/products/motherboard-box",
        summary: "无屏 Android 节点高密度方案，单柜节点数更高。",
      },
      {
        name: "Android 手机农场机架",
        href: "/zh/products/android-phone-farm",
        summary: "预接线 Android 群控机架，适合 ADB/APK 批量推送。",
      },
      {
        name: "iPhone 手机农场机架",
        href: "/zh/products/iphone-phone-farm",
        summary: "iOS 真机阵列机架，Lightning/USB-C 走线优化。",
      },
    ],
  },
  {
    id: "use-cases",
    title: "适用场景",
    bullets: [
      "移动应用兼容性与回归测试（真机 ARM 环境）",
      "多账号、多设备运维与群控操作",
      "APK 批量安装、日志采集与自动化脚本",
      "电商/内容预览多机位并行验证",
      "设备实验室扩容与出口项目交付",
    ],
  },
  {
    id: "ordering",
    title: "如何采购手机农场硬件",
    paragraphs: [
      "浏览产品目录查看 USD 参考价（付款前由销售确认最终报价）。注册账户可在确认后下样单；批量机柜与定制布局请提交询价，注明设备型号清单、目标数量与收货国家。",
    ],
    links: [
      { label: "批量询价", href: "/zh/contact" },
      { label: "产品目录", href: "/zh/products" },
      { label: "采购文档（英文）", href: "/docs/buying-guide" },
    ],
  },
] as const;
