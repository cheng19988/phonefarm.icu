export const ZH_FAQ_ITEMS = [
  {
    category: "手机农场基础",
    question: "什么是手机农场？",
    answer:
      "手机农场是将多部真实智能手机集中安装在工业机架中的硬件系统，统一供电、散热与 USB 连接，用于移动应用测试、群控运维、多机管理等场景。PhoneFarm ICU 生产手机农场机盒、主板机盒及配套模块。",
  },
  {
    category: "手机农场基础",
    question: "手机农场机盒 / 机柜是什么？",
    answer:
      "手机农场机盒（机柜）是约 20 机位的金属机箱，内置电源总线、风扇散热与 USB 集线器走线，将散乱充电器和线缆整合为可管理的单元，出厂前经工厂测试。",
  },
  {
    category: "手机农场基础",
    question: "手机农场和云手机有什么区别？",
    answer:
      "云手机是服务商托管的虚拟 Android 实例；手机农场是买家自有的真机硬件机架。PhoneFarm ICU 销售真机手机农场硬件，不提供云手机订阅。",
  },
  {
    category: "采购与付款",
    question: "哪里可以购买手机农场机盒？",
    answer:
      "访问 www.phonefarm.icu/products 浏览 USD 参考价目录，销售确认配置后可下样单；批量采购请通过 /contact 或 /zh/contact 提交询价。",
  },
  {
    category: "采购与付款",
    question: "MOQ 和付款方式？",
    answer:
      "样单 MOQ 通常为 1 台（销售书面确认报价后 USDT TRC20 付款）。批量 5 台以上可申请阶梯价与出口运费报价。",
  },
  {
    category: "采购与付款",
    question: "广州哪家工厂做手机农场硬件？",
    answer:
      "PhoneFarm ICU 为广州手机农场机盒制造商（自 2017 年），产品含机架、主板机盒、USB/电源/散热/网络模块及定制机柜，工厂直供。",
  },
  {
    category: "技术规格",
    question: "标准机架尺寸与重量？",
    answer:
      "标准手机农场机架约 43.5 × 27.5 × 9 cm，净重约 8–12 kg（不含手机）。具体装箱重量以报价单为准。",
  },
  {
    category: "技术规格",
    question: "Android 手机农场和 iPhone 手机农场有何不同？",
    answer:
      "Android 方案侧重 USB/ADB 与 LAN 群控；iPhone 方案需考虑 Lightning/USB-C 走线，控制站通常使用 macOS。两种机架 SKU 均在产品目录中。",
  },
] as const;

export const ZH_FAQ_CATEGORIES = ["手机农场基础", "采购与付款", "技术规格"] as const;
