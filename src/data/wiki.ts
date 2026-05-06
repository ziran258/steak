import type { Locale } from "@/i18n/config";

export type Translation<T> = Record<Locale, T>;

export type Cut = {
  slug: string;
  category: string;
  primaryPrimal: string;
  muscleNames: string[];
  commonCookingMethods: string[];
  relatedCutSlugs: string[];
  relatedTermSlugs: string[];
  coverImageUrl: string;
  translations: Translation<{
    name: string;
    englishName: string;
    aliases: string[];
    shortDefinition: string;
    overview: string;
    locationDescription: string;
    structureDescription: string;
    textureDescription: string;
    fatDescription: string;
    commonUses: string;
    namingNotes: string;
    marketNotes: string;
  }>;
};

export type GlossaryTerm = {
  slug: string;
  category: "cut" | "grading" | "trade" | "processing" | "aging" | "cooking";
  relatedTermSlugs: string[];
  translations: Translation<{
    term: string;
    englishTerm: string;
    chineseTerm: string;
    shortDefinition: string;
    explanation: string;
    commonMisunderstandings: string;
  }>;
};

export type Origin = {
  slug: string;
  countryCode: string;
  commonGradeSystems: string[];
  relatedTermSlugs: string[];
  coverImageUrl: string;
  translations: Translation<{
    name: string;
    shortDefinition: string;
    overview: string;
    productionCharacteristics: string;
    gradingOverview: string;
    exportCharacteristics: string;
    marketNotes: string;
  }>;
};

export type GradeSystem = {
  slug: string;
  originSlug: string;
  systemName: string;
  translations: Translation<{
    name: string;
    shortDefinition: string;
    overview: string;
    criteria: string;
    marketMeaning: string;
    commonMisunderstandings: string;
  }>;
};

const cutImage = "/images/placeholders/cut.svg";
const originImage = "/images/placeholders/origin.svg";

export const cuts: Cut[] = [
  {
    slug: "ribeye",
    category: "rib",
    primaryPrimal: "Rib",
    muscleNames: ["Longissimus dorsi", "Spinalis dorsi", "Complexus"],
    commonCookingMethods: ["pan-sear", "grill", "reverse-sear"],
    relatedCutSlugs: ["bone-in-ribeye", "prime-rib", "striploin"],
    relatedTermSlugs: ["marbling", "spinalis", "primal-cut"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "肋眼牛排",
        englishName: "Ribeye",
        aliases: ["肉眼", "Rib Eye", "Scotch Fillet"],
        shortDefinition: "来自牛肋部的经典牛排部位，以丰富油花、明显脂香和较高嫩度著称。",
        overview: "肋眼通常被视为煎烤牛排中最具代表性的部位之一。它兼具较高嫩度、充足肌间脂肪和浓郁牛肉风味，适合希望理解“油花如何影响口感”的学习者。",
        locationDescription: "肋眼位于牛背部靠前的肋脊区域，通常与第六至第十二肋附近的背最长肌及周边肌群相关。",
        structureDescription: "典型肋眼包含眼肉主体、外侧脂肪和被许多爱好者重视的上盖肉。不同修整方式会影响脂肪比例和视觉形态。",
        textureDescription: "整体口感多汁、柔软，牛肉风味突出；上盖部分通常更细嫩且脂香更强。",
        fatDescription: "肌间脂肪和外侧脂肪都较明显，是肋眼风味和多汁感的重要来源。",
        commonUses: "常见于厚切煎、炭烤、反向煎和整块烤制。",
        namingNotes: "在中文市场中“肋眼”和“肉眼”常混用；澳洲语境下 Scotch Fillet 常指去骨肋眼。",
        marketNotes: "零售中常见去骨、带骨、战斧和牛仔骨等形态，名称差异不一定代表完全不同的解剖部位。",
      },
      en: {
        name: "Ribeye Steak",
        englishName: "Ribeye",
        aliases: ["Rib Eye", "Scotch Fillet"],
        shortDefinition: "A classic steak from the rib section, known for rich marbling, juicy texture, and bold beef flavor.",
        overview: "Ribeye is one of the reference cuts for understanding how marbling and muscle structure shape steak flavor. It is tender enough for quick cooking while retaining a pronounced beefy profile.",
        locationDescription: "It comes from the rib primal, commonly associated with the longissimus dorsi and surrounding muscles near the middle ribs.",
        structureDescription: "A ribeye may include the central eye, exterior fat, and the prized spinalis cap depending on trimming style.",
        textureDescription: "The eating quality is typically juicy, tender, and rich, with the cap providing an especially luxurious texture.",
        fatDescription: "Ribeye commonly carries both intramuscular marbling and exterior fat, which contribute to its flavor intensity.",
        commonUses: "Common uses include pan-searing, grilling, reverse searing, and roasting as a larger rib section.",
        namingNotes: "Scotch fillet is often used in Australian contexts for boneless ribeye, while Chinese markets may use several translated names.",
        marketNotes: "Retail labels such as bone-in ribeye, cowboy steak, or tomahawk often refer to presentation and trimming differences.",
      },
    },
  },
  {
    slug: "tenderloin",
    category: "loin",
    primaryPrimal: "Loin",
    muscleNames: ["Psoas major"],
    commonCookingMethods: ["pan-sear", "roast", "sous-vide"],
    relatedCutSlugs: ["filet-mignon", "porterhouse", "t-bone"],
    relatedTermSlugs: ["primal-cut", "connective-tissue"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "菲力牛排",
        englishName: "Tenderloin",
        aliases: ["牛柳", "Filet", "Filet Mignon"],
        shortDefinition: "来自腰内侧的高嫩度部位，脂肪较少，常被用于菲力牛排。",
        overview: "菲力的核心价值是嫩度，而不是强烈脂香。它能帮助学习者理解“嫩”和“风味浓”并不是同一件事。",
        locationDescription: "菲力位于腰部内侧，活动量相对较低，对应腰大肌。",
        structureDescription: "肌纤维细，结缔组织少，整条形态前后粗细不一，常分割为不同规格。",
        textureDescription: "口感非常细嫩，咀嚼阻力低，但牛肉风味通常比肋眼和西冷温和。",
        fatDescription: "油花和外部脂肪通常较少，烹饪时更依赖精准火候和酱汁搭配。",
        commonUses: "适合厚切煎制、低温慢煮后煎上色、整条烤制。",
        namingNotes: "Filet Mignon 通常指菲力中段或较精修的小块，不等同于整条 Tenderloin。",
        marketNotes: "高价格常来自低出肉率和稳定嫩度，但不代表它一定比其他部位更有风味。",
      },
      en: {
        name: "Tenderloin",
        englishName: "Tenderloin",
        aliases: ["Filet", "Filet Mignon"],
        shortDefinition: "A very tender, lean muscle from the loin, widely used for filet-style steaks.",
        overview: "Tenderloin is valued primarily for tenderness rather than intense beef flavor. It is useful for distinguishing texture quality from fat-driven richness.",
        locationDescription: "It sits inside the loin and corresponds mainly to the psoas major muscle, which does relatively little work.",
        structureDescription: "The muscle is fine-grained with little connective tissue and varies in diameter along the whole tenderloin.",
        textureDescription: "It is exceptionally soft with low chew resistance, though its flavor is usually milder than ribeye or striploin.",
        fatDescription: "Tenderloin is generally lean, so cooking precision and sauce pairing matter more than rendered fat.",
        commonUses: "Common preparations include thick steaks, sous-vide plus sear, and whole tenderloin roasts.",
        namingNotes: "Filet mignon usually refers to selected trimmed portions rather than the entire tenderloin.",
        marketNotes: "Its high price reflects low yield and reliable tenderness, not necessarily the strongest flavor.",
      },
    },
  },
  {
    slug: "striploin",
    category: "loin",
    primaryPrimal: "Short Loin",
    muscleNames: ["Longissimus dorsi"],
    commonCookingMethods: ["pan-sear", "grill"],
    relatedCutSlugs: ["ribeye", "t-bone", "porterhouse"],
    relatedTermSlugs: ["marbling", "primal-cut"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "西冷牛排",
        englishName: "Striploin",
        aliases: ["纽约客", "New York Strip", "Strip Steak", "Sirloin Strip"],
        shortDefinition: "来自短腰区域的经典牛排，兼具紧实咀嚼感和清晰牛肉风味。",
        overview: "西冷常被拿来与肋眼和菲力比较：它比菲力更有嚼感和风味，又通常比肋眼更清爽。",
        locationDescription: "位于背部短腰区域，与背最长肌相关，靠近肋眼后段和 T-bone/Porterhouse 结构。",
        structureDescription: "常见形态为一侧带脂肪边、主体肌肉纹理相对规整。",
        textureDescription: "口感比菲力更紧实，咀嚼感清楚，适合喜欢肉感的人。",
        fatDescription: "通常有明显脂肪边，肌间脂肪视等级和产地差异较大。",
        commonUses: "适合煎、烤和厚切处理。脂肪边处理会明显影响成品香气。",
        namingNotes: "中文“西冷”“沙朗”和英文 sirloin/striploin 在市场语境中常混用，需要结合切割体系判断。",
        marketNotes: "零售标签中的 New York Strip、Striploin 与 Sirloin Strip 可能因国家和供应商而有差异。",
      },
      en: {
        name: "Striploin",
        englishName: "Striploin",
        aliases: ["New York Strip", "Strip Steak", "Sirloin Strip"],
        shortDefinition: "A classic short-loin steak with a firm bite, clear beef flavor, and a characteristic fat edge.",
        overview: "Striploin sits between tenderloin and ribeye in many comparisons: more chew and flavor than tenderloin, usually cleaner and less fatty than ribeye.",
        locationDescription: "It comes from the short loin and is closely related to the strip side of T-bone and porterhouse steaks.",
        structureDescription: "The cut commonly has a defined fat edge and a relatively uniform central muscle.",
        textureDescription: "It offers a firmer chew and a more steak-like bite than tenderloin.",
        fatDescription: "Exterior fat is common, while marbling varies significantly by grade and origin.",
        commonUses: "Pan-searing and grilling are common, especially when the fat edge is rendered carefully.",
        namingNotes: "Names such as sirloin, striploin, and New York strip can vary across regional cutting systems.",
        marketNotes: "Retail terminology should be read alongside origin, grading system, and trimming style.",
      },
    },
  },
  {
    slug: "short-rib",
    category: "rib-plate",
    primaryPrimal: "Rib / Plate",
    muscleNames: ["Serratus ventralis", "Intercostal muscles"],
    commonCookingMethods: ["braise", "grill", "smoke"],
    relatedCutSlugs: ["ribeye", "brisket"],
    relatedTermSlugs: ["connective-tissue", "fabrication"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "牛小排",
        englishName: "Short Rib",
        aliases: ["Short Ribs", "牛肋条", "带骨牛小排"],
        shortDefinition: "来自肋部或胸腹侧的带骨或去骨部位，脂肪和结缔组织丰富。",
        overview: "牛小排展示了牛肉中脂肪、骨香和结缔组织如何共同形成风味。它既可慢炖，也可在薄切时快速烤制。",
        locationDescription: "根据切割体系不同，可能来自肋部、前胸腹侧或相邻区域。",
        structureDescription: "结构中常包含肋骨、肋间肌、较多脂肪和结缔组织。",
        textureDescription: "慢烹后胶质感明显；薄切烧烤时则呈现脂香和弹性。",
        fatDescription: "脂肪通常丰富，且与筋膜、肌肉层交错。",
        commonUses: "适合红酒炖、韩式烤肉、烟熏和低温慢烤。",
        namingNotes: "不同国家对 short rib 的切割方式差异较大，带骨、去骨、横切和纵切都会影响名称。",
        marketNotes: "进口包装中常见 short rib、rib finger、plate short rib 等相近但不完全相同的标签。",
      },
      en: {
        name: "Short Rib",
        englishName: "Short Rib",
        aliases: ["Short Ribs", "Plate Short Rib"],
        shortDefinition: "A rib or plate-associated cut rich in fat, bone flavor, and connective tissue.",
        overview: "Short rib illustrates how fat, bone, and connective tissue can become central to beef eating quality. It can be slow-cooked or thin-sliced for fast grilling.",
        locationDescription: "Depending on the cutting system, short ribs may come from rib, plate, or adjacent areas.",
        structureDescription: "The cut often includes rib bones, intercostal muscles, fat seams, and connective tissue.",
        textureDescription: "Slow cooking creates a gelatin-rich texture, while thin grilling emphasizes fat and chew.",
        fatDescription: "Short ribs are commonly well supplied with fat and connective tissue between muscle layers.",
        commonUses: "Common preparations include braising, Korean-style grilling, smoking, and slow roasting.",
        namingNotes: "Bone-in, boneless, cross-cut, and English-cut formats can all appear under related short-rib names.",
        marketNotes: "Import labels may distinguish short rib, rib finger, and plate short rib depending on specification.",
      },
    },
  },
  {
    slug: "picanha",
    category: "sirloin",
    primaryPrimal: "Sirloin / Rump",
    muscleNames: ["Biceps femoris cap"],
    commonCookingMethods: ["grill", "rotisserie", "pan-sear"],
    relatedCutSlugs: ["top-sirloin", "tri-tip"],
    relatedTermSlugs: ["external-fat", "fabrication"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "臀盖牛排",
        englishName: "Picanha",
        aliases: ["巴西烤肉臀盖", "Rump Cap", "Coulotte"],
        shortDefinition: "位于后臀上方、带明显脂肪盖的部位，是巴西烤肉中极具代表性的切法。",
        overview: "Picanha 的关键在于脂肪盖和切割方向。它让学习者看到同一块后臀区域如何因文化和分割方式而成为明星部位。",
        locationDescription: "位于臀部上方，常与 rump cap 或 coulotte 对应。",
        structureDescription: "整块通常带厚脂肪盖，肌肉纹理方向对切片口感影响很大。",
        textureDescription: "肉质有一定咀嚼感，正确逆纹切片后口感更好。",
        fatDescription: "外侧脂肪盖是风味核心，烤制时可缓慢融化并保护肉面。",
        commonUses: "常见于巴西烤肉、整块烤制、厚切煎烤。",
        namingNotes: "Picanha、rump cap 和 coulotte 在不同市场有重叠，但修整和脂肪保留程度可能不同。",
        marketNotes: "购买时应关注是否保留脂肪盖，以及切片方向是否适合目标做法。",
      },
      en: {
        name: "Picanha",
        englishName: "Picanha",
        aliases: ["Rump Cap", "Coulotte"],
        shortDefinition: "A fat-capped top rump cut strongly associated with Brazilian barbecue.",
        overview: "Picanha demonstrates how trimming style and food culture can elevate a muscle into a signature steak cut.",
        locationDescription: "It sits over the rump and is commonly associated with the rump cap or coulotte.",
        structureDescription: "The whole piece usually has a pronounced fat cap, and grain direction matters when slicing.",
        textureDescription: "It has a satisfying chew that improves when cut across the grain.",
        fatDescription: "The exterior fat cap is central to flavor and helps protect the meat during grilling.",
        commonUses: "Common preparations include churrasco-style skewering, roasting, grilling, and thick steaks.",
        namingNotes: "Picanha, rump cap, and coulotte can overlap, but trimming specifications vary.",
        marketNotes: "Buyers should check fat-cap retention and slicing direction for the intended cooking method.",
      },
    },
  },
  {
    slug: "brisket",
    category: "brisket",
    primaryPrimal: "Brisket",
    muscleNames: ["Pectoralis superficialis", "Pectoralis profundus"],
    commonCookingMethods: ["smoke", "braise", "slow-cook"],
    relatedCutSlugs: ["short-rib", "chuck-eye"],
    relatedTermSlugs: ["connective-tissue", "collagen"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "牛胸肉",
        englishName: "Brisket",
        aliases: ["胸口", "牛腩部分", "Brisket Flat", "Brisket Point"],
        shortDefinition: "来自前胸的高结缔组织部位，适合长时间低温烹饪和烟熏。",
        overview: "Brisket 不是典型快煎牛排，却是理解结缔组织、胶原蛋白和慢烹转化的重要部位。",
        locationDescription: "位于牛前胸，承重和活动量较高。",
        structureDescription: "常分为 flat 和 point 两部分，脂肪层、筋膜和肌肉方向复杂。",
        textureDescription: "未经充分烹饪时较韧，长时间低温后可变得柔软多汁。",
        fatDescription: "脂肪分布视 flat/point 和修整方式差异显著。",
        commonUses: "常用于美式烟熏、炖煮、卤制和低温慢烤。",
        namingNotes: "中文市场中 brisket 与牛腩、胸口等称呼可能重叠，但切割规格不一定一致。",
        marketNotes: "整块 brisket、flat、point 的用途和价格逻辑不同，购买时需要看规格。",
      },
      en: {
        name: "Brisket",
        englishName: "Brisket",
        aliases: ["Brisket Flat", "Brisket Point"],
        shortDefinition: "A hard-working chest cut rich in connective tissue, suited to smoking and long cooking.",
        overview: "Brisket is not a quick steak cut, but it is essential for understanding collagen conversion and low-temperature cooking.",
        locationDescription: "It comes from the lower chest, an area involved in support and movement.",
        structureDescription: "A whole brisket includes flat and point muscles with complex grain, fat, and connective tissue patterns.",
        textureDescription: "It can be tough when undercooked, but becomes tender and juicy with proper slow cooking.",
        fatDescription: "Fat distribution varies greatly between flat, point, and trimming specifications.",
        commonUses: "Common uses include barbecue smoking, braising, corning, and slow roasting.",
        namingNotes: "Chinese retail names can overlap with broader beef belly or chest categories.",
        marketNotes: "Whole packer brisket, flat, and point serve different cooking and pricing purposes.",
      },
    },
  },
  {
    slug: "flat-iron",
    category: "chuck",
    primaryPrimal: "Chuck",
    muscleNames: ["Infraspinatus"],
    commonCookingMethods: ["pan-sear", "grill"],
    relatedCutSlugs: ["oyster-blade", "chuck-eye"],
    relatedTermSlugs: ["fabrication", "silver-skin"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "板腱牛排",
        englishName: "Flat Iron",
        aliases: ["Flat Iron Steak", "肩胛嫩肉", "Oyster Blade 分割"],
        shortDefinition: "来自肩胛区域的高性价比部位，去除中间筋膜后可成为嫩度优秀的牛排。",
        overview: "Flat Iron 是现代精细分割的代表：同一块肩胛肉，如果处理掉关键筋膜，就能从炖煮肉转化为适合煎烤的牛排。",
        locationDescription: "位于肩胛区域，对应冈下肌。",
        structureDescription: "原始形态中间有明显筋膜，分割成 flat iron 时通常会去除。",
        textureDescription: "去筋膜后嫩度较好，肌肉纤维较均匀。",
        fatDescription: "油花中等，风味比菲力更明显但通常不如肋眼浓。",
        commonUses: "适合煎、烤、切条用于沙拉或三明治。",
        namingNotes: "Oyster Blade 和 Flat Iron 相关但不完全等同，关键在于是否去除中间筋膜和切割方式。",
        marketNotes: "购买时需要确认是整块板腱、带筋形态，还是已分割好的 flat iron。",
      },
      en: {
        name: "Flat Iron Steak",
        englishName: "Flat Iron",
        aliases: ["Flat Iron Steak", "Top Blade Steak"],
        shortDefinition: "A value-oriented chuck cut that becomes a tender steak when the central connective seam is removed.",
        overview: "Flat iron is a good example of modern fabrication: careful seam removal can turn a chuck muscle into a grillable steak.",
        locationDescription: "It comes from the shoulder and corresponds mainly to the infraspinatus muscle.",
        structureDescription: "The source muscle contains a prominent central seam that is typically removed for flat iron steaks.",
        textureDescription: "Once trimmed, it is relatively tender with a consistent grain.",
        fatDescription: "Marbling is usually moderate, with more beef character than tenderloin but less richness than ribeye.",
        commonUses: "Common uses include pan-searing, grilling, salads, and steak sandwiches.",
        namingNotes: "Oyster blade and flat iron are related terms, but trimming and seam removal define the final cut.",
        marketNotes: "Buyers should check whether the product is a whole blade cut or a fabricated flat iron steak.",
      },
    },
  },
  {
    slug: "flank",
    category: "flank",
    primaryPrimal: "Flank",
    muscleNames: ["Rectus abdominis"],
    commonCookingMethods: ["grill", "marinate", "stir-fry"],
    relatedCutSlugs: ["skirt", "hanger"],
    relatedTermSlugs: ["grain", "fabrication"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "腹肉牛排",
        englishName: "Flank Steak",
        aliases: ["Flank", "侧腹肉"],
        shortDefinition: "来自腹侧的长纤维部位，风味明显，关键在于逆纹切片。",
        overview: "Flank 让学习者直观看到肌肉纹理对口感的影响。它不是最嫩的部位，但处理得当会有鲜明牛肉风味。",
        locationDescription: "位于牛腹侧区域，肌肉纤维走向明显。",
        structureDescription: "整体较扁平，纹理长而清楚，厚度通常不如肋眼或西冷。",
        textureDescription: "有嚼劲，若顺纹切片会显得明显偏韧。",
        fatDescription: "脂肪相对较少，常通过腌制、快速高温和切片改善口感。",
        commonUses: "适合烤制后逆纹切片、墨西哥风味料理、炒制和沙拉。",
        namingNotes: "Flank 与 skirt、hanger 都属于风味型薄切部位，但来源和纹理不同。",
        marketNotes: "零售中要关注厚度、修整程度和是否适合整片烤制。",
      },
      en: {
        name: "Flank Steak",
        englishName: "Flank",
        aliases: ["Flank Steak"],
        shortDefinition: "A lean, long-grained abdominal cut with pronounced beef flavor and a need for across-grain slicing.",
        overview: "Flank steak is a clear lesson in grain direction. It is not the tenderest cut, but it can be flavorful when cooked hot and sliced correctly.",
        locationDescription: "It comes from the flank area along the abdomen.",
        structureDescription: "The cut is relatively flat with long, visible muscle fibers.",
        textureDescription: "It has a distinct chew and becomes noticeably tough if sliced with the grain.",
        fatDescription: "Flank is relatively lean and often benefits from marinades or high-heat cooking.",
        commonUses: "Common uses include grilling, fajitas, stir-frying, and salads after thin slicing.",
        namingNotes: "Flank, skirt, and hanger are all flavorful thin cuts, but they are anatomically distinct.",
        marketNotes: "Thickness, trimming, and intended slicing method matter when buying flank steak.",
      },
    },
  },
  {
    slug: "skirt",
    category: "plate",
    primaryPrimal: "Plate",
    muscleNames: ["Diaphragm muscles"],
    commonCookingMethods: ["grill", "marinate"],
    relatedCutSlugs: ["flank", "hanger"],
    relatedTermSlugs: ["grain", "connective-tissue"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "裙边牛排",
        englishName: "Skirt Steak",
        aliases: ["Skirt", "内裙边", "外裙边"],
        shortDefinition: "来自膈肌相关区域的薄长部位，风味强烈，常用于高温快烤。",
        overview: "Skirt 的特点是强烈风味和明显纹理。它适合说明“牛排不只有厚切嫩肉”这一类更广义的切割文化。",
        locationDescription: "与横膈膜相关，通常区分 inside skirt 和 outside skirt。",
        structureDescription: "薄而长，肌纤维明显，表面筋膜处理会影响口感。",
        textureDescription: "风味浓、咀嚼感强，需要高温快烤和逆纹切片。",
        fatDescription: "脂肪不一定很多，但风味集中，适合腌制和炭火香气。",
        commonUses: "常用于 fajitas、炭烤、腌制后快烤。",
        namingNotes: "Inside skirt 和 outside skirt 不是同一规格，市场标签需要仔细区分。",
        marketNotes: "餐饮端常用，零售端可能以不同修整规格出现。",
      },
      en: {
        name: "Skirt Steak",
        englishName: "Skirt Steak",
        aliases: ["Inside Skirt", "Outside Skirt"],
        shortDefinition: "A long, thin diaphragm-associated cut with intense flavor and visible grain.",
        overview: "Skirt steak represents a flavor-forward steak culture beyond thick tender cuts. It rewards hot cooking and correct slicing.",
        locationDescription: "It is associated with diaphragm muscles and is commonly separated into inside and outside skirt.",
        structureDescription: "The cut is thin, elongated, and visibly fibrous, with membrane trimming affecting tenderness.",
        textureDescription: "It is intensely flavored with a strong chew, best sliced across the grain.",
        fatDescription: "It may not be heavily marbled, but it carries concentrated beef flavor and pairs well with char.",
        commonUses: "Common uses include fajitas, marinated grilling, and quick high-heat cooking.",
        namingNotes: "Inside skirt and outside skirt are different specifications and should not be treated as identical.",
        marketNotes: "Foodservice and retail trimming standards can vary considerably.",
      },
    },
  },
  {
    slug: "t-bone",
    category: "loin",
    primaryPrimal: "Short Loin",
    muscleNames: ["Longissimus dorsi", "Psoas major"],
    commonCookingMethods: ["grill", "pan-sear", "broil"],
    relatedCutSlugs: ["porterhouse", "striploin", "tenderloin"],
    relatedTermSlugs: ["fabrication", "primal-cut"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "T 骨牛排",
        englishName: "T-bone Steak",
        aliases: ["T-bone", "丁骨牛排"],
        shortDefinition: "带有 T 形骨、一侧为西冷一侧为菲力的复合型牛排。",
        overview: "T-bone 是理解牛排命名和分割关系的理想条目：它不是单一肌肉，而是骨骼、短腰和两侧肌肉共同形成的规格。",
        locationDescription: "来自短腰区域，骨的一侧是 striploin，另一侧是 tenderloin。",
        structureDescription: "中央 T 形骨将两块不同肌肉分开，菲力部分大小是区分 T-bone 和 Porterhouse 的关键之一。",
        textureDescription: "一块牛排中同时包含西冷的嚼感和菲力的嫩度。",
        fatDescription: "脂肪表现取决于西冷侧等级和修整方式，菲力侧通常更瘦。",
        commonUses: "适合炭烤、煎烤结合和高温处理，但两侧肌肉受热差异需要控制。",
        namingNotes: "T-bone 与 Porterhouse 的区别常与菲力侧大小和切割位置有关，不只是名称不同。",
        marketNotes: "购买时应观察菲力侧比例、厚度和骨周围修整。",
      },
      en: {
        name: "T-bone Steak",
        englishName: "T-bone",
        aliases: ["T-bone Steak"],
        shortDefinition: "A bone-in short-loin steak with striploin on one side and tenderloin on the other.",
        overview: "T-bone is a useful cut for understanding steak nomenclature because it combines bone structure, location, and two different muscles.",
        locationDescription: "It comes from the short loin, with striploin on one side of the bone and tenderloin on the other.",
        structureDescription: "The T-shaped bone separates the two muscles, and tenderloin size helps distinguish it from porterhouse.",
        textureDescription: "It combines the chew of striploin with the tenderness of tenderloin in one steak.",
        fatDescription: "Fat depends mostly on the strip side and trim, while the tenderloin side is usually leaner.",
        commonUses: "Grilling, broiling, and pan-to-oven methods are common, but the two muscles cook differently.",
        namingNotes: "The distinction between T-bone and porterhouse is linked to cut position and tenderloin portion size.",
        marketNotes: "Tenderloin proportion, thickness, and bone trimming are important buying cues.",
      },
    },
  },
  {
    slug: "chuck-eye",
    category: "chuck",
    primaryPrimal: "Chuck",
    muscleNames: ["Longissimus dorsi"],
    commonCookingMethods: ["pan-sear", "grill", "braise"],
    relatedCutSlugs: ["ribeye", "flat-iron"],
    relatedTermSlugs: ["primal-cut", "fabrication"],
    coverImageUrl: cutImage,
    translations: {
      zh: {
        name: "肩胛眼肉",
        englishName: "Chuck Eye Steak",
        aliases: ["Chuck Eye", "穷人的肋眼"],
        shortDefinition: "来自肩胛靠近肋眼一端的部位，常被视为与肋眼相邻的高性价比选择。",
        overview: "Chuck Eye 适合展示相邻部位之间的连续性：靠近肋眼并不意味着完全等同于肋眼，但确实可能带来相似风味。",
        locationDescription: "位于肩胛 primal 中靠近肋部的位置。",
        structureDescription: "与肋眼同样涉及背最长肌延伸，但周围组织和修整复杂度更高。",
        textureDescription: "优质 chuck eye 可以接近肋眼的多汁感，但稳定性通常较低。",
        fatDescription: "脂肪和筋膜分布变化较大，取决于具体切割位置。",
        commonUses: "适合煎、烤；较筋的部分也可慢炖。",
        namingNotes: "“穷人的肋眼”是市场化说法，不能替代具体规格判断。",
        marketNotes: "购买时要看切面结构，而不是只看名称。",
      },
      en: {
        name: "Chuck Eye Steak",
        englishName: "Chuck Eye",
        aliases: ["Poor Man's Ribeye"],
        shortDefinition: "A chuck cut near the rib section, often positioned as a value alternative to ribeye.",
        overview: "Chuck eye shows the continuity between neighboring primals. Being close to ribeye can bring similar traits, but it is not automatically the same eating experience.",
        locationDescription: "It comes from the chuck primal near the rib end.",
        structureDescription: "It includes continuation of the longissimus dorsi with more surrounding chuck complexity.",
        textureDescription: "Good chuck eye can be juicy and flavorful, though consistency is usually lower than ribeye.",
        fatDescription: "Fat and connective tissue vary depending on exact position and trimming.",
        commonUses: "It can be pan-seared or grilled, while tougher portions may suit braising.",
        namingNotes: "Poor man's ribeye is a marketing nickname, not a precise specification.",
        marketNotes: "The cut face and trimming are more informative than the name alone.",
      },
    },
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "marbling",
    category: "grading",
    relatedTermSlugs: ["intramuscular-fat", "bms"],
    translations: {
      zh: {
        term: "油花",
        englishTerm: "Marbling",
        chineseTerm: "油花",
        shortDefinition: "肌肉内部可见的脂肪纹理，是许多牛肉等级体系的重要观察指标。",
        explanation: "油花通常指肌内脂肪在瘦肉中的分布。它会影响多汁感、香气和口感，但不同等级体系对油花的观察位置、评分方式和意义并不完全相同。",
        commonMisunderstandings: "油花多不必然代表最适合所有烹饪方式，也不等于整块肉没有外部脂肪或筋膜问题。",
      },
      en: {
        term: "Marbling",
        englishTerm: "Marbling",
        chineseTerm: "油花",
        shortDefinition: "Visible intramuscular fat within lean meat, used as an important cue in many beef grading systems.",
        explanation: "Marbling refers to fat dispersed within muscle. It can influence juiciness, aroma, and richness, but grading systems differ in where and how they evaluate it.",
        commonMisunderstandings: "More marbling is not automatically better for every cooking method or every eater.",
      },
    },
  },
  {
    slug: "primal-cut",
    category: "cut",
    relatedTermSlugs: ["sub-primal-cut", "fabrication"],
    translations: {
      zh: {
        term: "大分割部位",
        englishTerm: "Primal Cut",
        chineseTerm: "大分割部位",
        shortDefinition: "屠宰后将胴体初步分割形成的大区域，是理解具体牛排部位的上层分类。",
        explanation: "不同国家的 primal cut 划分不完全一致，但它们都用于把复杂胴体拆解成更可管理的区域，例如 rib、loin、chuck、round 等。",
        commonMisunderstandings: "不能只靠大分割名称判断具体口感，同一 primal 内也可能有非常不同的肌肉。",
      },
      en: {
        term: "Primal Cut",
        englishTerm: "Primal Cut",
        chineseTerm: "大分割部位",
        shortDefinition: "A major carcass section created during initial fabrication, used as a parent category for steak cuts.",
        explanation: "Primal definitions vary by country, but they organize the carcass into broad regions such as rib, loin, chuck, and round.",
        commonMisunderstandings: "A primal name alone does not determine eating quality; muscles within one primal can differ greatly.",
      },
    },
  },
  {
    slug: "fabrication",
    category: "processing",
    relatedTermSlugs: ["primal-cut", "sub-primal-cut"],
    translations: {
      zh: {
        term: "精细分割",
        englishTerm: "Fabrication",
        chineseTerm: "精细分割",
        shortDefinition: "将胴体、大分割或次级分割进一步修整成商业规格的过程。",
        explanation: "Fabrication 决定了同一块肌肉最终以牛排、烤肉、炖肉还是薄切产品出现。修整、去筋、保留脂肪和切片方向都会影响名称和用途。",
        commonMisunderstandings: "同一英文名在不同供应商处可能规格不同，原因往往是 fabrication 标准不同。",
      },
      en: {
        term: "Fabrication",
        englishTerm: "Fabrication",
        chineseTerm: "精细分割",
        shortDefinition: "The process of turning carcass sections or subprimals into commercial cuts and specifications.",
        explanation: "Fabrication determines whether a muscle appears as steak, roast, stew meat, or sliced product. Trimming, seam removal, fat retention, and slicing direction all matter.",
        commonMisunderstandings: "The same cut name can vary across suppliers because specifications are not always identical.",
      },
    },
  },
  {
    slug: "establishment-number",
    category: "trade",
    relatedTermSlugs: ["traceability", "haccp"],
    translations: {
      zh: {
        term: "厂号",
        englishTerm: "Establishment Number",
        chineseTerm: "厂号",
        shortDefinition: "用于标识屠宰、分割或加工企业的注册编号，是进口牛肉标签和追溯信息中的关键元素。",
        explanation: "厂号通常与具体国家监管体系、出口准入和工厂类型相关。理解厂号有助于区分品牌、工厂、产地和贸易资质之间的关系。",
        commonMisunderstandings: "厂号不是品质评分；同一品牌可能使用多个工厂，同一工厂也可能为多个品牌供货。",
      },
      en: {
        term: "Establishment Number",
        englishTerm: "Establishment Number",
        chineseTerm: "厂号",
        shortDefinition: "A registered identifier for a slaughter, cutting, or processing establishment, important in import labels and traceability.",
        explanation: "Establishment numbers connect products to regulatory systems, export eligibility, and facility types. They help distinguish brand, plant, origin, and trade approval.",
        commonMisunderstandings: "An establishment number is not a quality grade; one brand may use several plants and one plant may supply several brands.",
      },
    },
  },
  {
    slug: "dry-aging",
    category: "aging",
    relatedTermSlugs: ["wet-aging"],
    translations: {
      zh: {
        term: "干式熟成",
        englishTerm: "Dry Aging",
        chineseTerm: "干式熟成",
        shortDefinition: "在受控温度、湿度和空气流动下让牛肉熟成，以改变风味和质地。",
        explanation: "干式熟成会造成水分损耗和外层修整损耗，同时发展坚果、奶酪或熟成香气。它更依赖设备、时间和卫生控制。",
        commonMisunderstandings: "干式熟成不是简单把肉放进冰箱风干，也不必然比湿式熟成更适合所有部位。",
      },
      en: {
        term: "Dry Aging",
        englishTerm: "Dry Aging",
        chineseTerm: "干式熟成",
        shortDefinition: "Aging beef under controlled temperature, humidity, and airflow to alter flavor and texture.",
        explanation: "Dry aging involves moisture loss and trimming loss while developing nutty, cheesy, or aged aromas. It depends heavily on controlled equipment and hygiene.",
        commonMisunderstandings: "It is not simply leaving meat uncovered in a home refrigerator, and it is not ideal for every cut.",
      },
    },
  },
  {
    slug: "wet-aging",
    category: "aging",
    relatedTermSlugs: ["dry-aging", "vacuum-pack"],
    translations: {
      zh: {
        term: "湿式熟成",
        englishTerm: "Wet Aging",
        chineseTerm: "湿式熟成",
        shortDefinition: "牛肉在真空包装中低温熟成，是现代供应链中常见的熟成方式。",
        explanation: "湿式熟成减少水分和修整损耗，便于运输和库存管理。它通常改善嫩度，但风味发展方向与干式熟成不同。",
        commonMisunderstandings: "真空包装时间长不一定等于高质量熟成，温控和原料状态仍然关键。",
      },
      en: {
        term: "Wet Aging",
        englishTerm: "Wet Aging",
        chineseTerm: "湿式熟成",
        shortDefinition: "Aging beef in vacuum packaging under refrigeration, common in modern supply chains.",
        explanation: "Wet aging reduces moisture and trim losses and is convenient for logistics. It can improve tenderness but develops a different flavor profile from dry aging.",
        commonMisunderstandings: "Long vacuum storage does not automatically mean high-quality aging; temperature control and starting material still matter.",
      },
    },
  },
  {
    slug: "bms",
    category: "grading",
    relatedTermSlugs: ["marbling"],
    translations: {
      zh: {
        term: "BMS",
        englishTerm: "Beef Marbling Standard",
        chineseTerm: "牛肉油花标准",
        shortDefinition: "日本和牛等级体系中用于描述油花程度的重要指标。",
        explanation: "BMS 是日本肉质等级评定中的核心指标之一，但最终等级还涉及肉色、脂肪色泽、紧实度和纹理等因素。",
        commonMisunderstandings: "BMS 高不等于所有人都会觉得更好吃，也不能直接等同于澳洲 MB 分数。",
      },
      en: {
        term: "BMS",
        englishTerm: "Beef Marbling Standard",
        chineseTerm: "牛肉油花标准",
        shortDefinition: "A key marbling scale used in the Japanese beef grading context.",
        explanation: "BMS is central to Japanese quality grading, but final grades also consider meat color, fat color, firmness, and texture.",
        commonMisunderstandings: "A higher BMS is not universally preferred and should not be directly equated with Australian MB scores.",
      },
    },
  },
  {
    slug: "chilled-beef",
    category: "trade",
    relatedTermSlugs: ["frozen-beef"],
    translations: {
      zh: {
        term: "冷鲜牛肉",
        englishTerm: "Chilled Beef",
        chineseTerm: "冷鲜牛肉",
        shortDefinition: "在未冻结状态下低温运输和销售的牛肉，对供应链时效和温控要求更高。",
        explanation: "冷鲜牛肉通常保留未冻结质地，但运输时间、包装、温控和清关效率会影响最终状态。",
        commonMisunderstandings: "冷鲜不必然比冷冻品质更高；原料、运输和保存同样重要。",
      },
      en: {
        term: "Chilled Beef",
        englishTerm: "Chilled Beef",
        chineseTerm: "冷鲜牛肉",
        shortDefinition: "Beef transported and sold under refrigeration without being frozen, requiring tighter cold-chain control.",
        explanation: "Chilled beef can retain an unfrozen texture, but transit time, packaging, temperature control, and customs flow all affect quality.",
        commonMisunderstandings: "Chilled is not automatically superior to frozen; source material and handling are still decisive.",
      },
    },
  },
  {
    slug: "frozen-beef",
    category: "trade",
    relatedTermSlugs: ["chilled-beef"],
    translations: {
      zh: {
        term: "冷冻牛肉",
        englishTerm: "Frozen Beef",
        chineseTerm: "冷冻牛肉",
        shortDefinition: "经冻结后运输和储存的牛肉，是国际贸易中常见形态。",
        explanation: "冷冻能延长货架期并降低物流压力。冻结速度、储存温度、解冻方式和包装完整性会显著影响食用品质。",
        commonMisunderstandings: "冷冻不等于低端；许多高等级部位也可能以冷冻形式进入市场。",
      },
      en: {
        term: "Frozen Beef",
        englishTerm: "Frozen Beef",
        chineseTerm: "冷冻牛肉",
        shortDefinition: "Beef frozen for transport and storage, a common format in international trade.",
        explanation: "Freezing extends shelf life and simplifies logistics. Freezing speed, storage temperature, thawing, and packaging integrity affect eating quality.",
        commonMisunderstandings: "Frozen does not automatically mean low-end; high-grade cuts may also be traded frozen.",
      },
    },
  },
  {
    slug: "traceability",
    category: "trade",
    relatedTermSlugs: ["establishment-number"],
    translations: {
      zh: {
        term: "追溯",
        englishTerm: "Traceability",
        chineseTerm: "追溯",
        shortDefinition: "通过标签、批次、厂号和单证追踪牛肉来源与流通过程的能力。",
        explanation: "追溯体系可能覆盖牧场、屠宰、分割、加工、出口、进口和零售环节。不同国家和供应链的颗粒度不同。",
        commonMisunderstandings: "可追溯不等于每个消费者都能看到完整供应链，也不等同于品质保证。",
      },
      en: {
        term: "Traceability",
        englishTerm: "Traceability",
        chineseTerm: "追溯",
        shortDefinition: "The ability to follow beef origin and movement through labels, lots, establishment numbers, and documents.",
        explanation: "Traceability can cover farm, slaughter, cutting, processing, export, import, and retail stages, with different levels of detail by system.",
        commonMisunderstandings: "Traceability does not always mean consumers can view the full chain, and it is not the same as a quality guarantee.",
      },
    },
  },
  {
    slug: "connective-tissue",
    category: "cut",
    relatedTermSlugs: ["collagen"],
    translations: {
      zh: {
        term: "结缔组织",
        englishTerm: "Connective Tissue",
        chineseTerm: "结缔组织",
        shortDefinition: "连接和支撑肌肉结构的组织，会显著影响嫩度和适合的烹饪方式。",
        explanation: "活动量大的部位通常结缔组织更多，快煎时可能显韧，但长时间湿热或低温烹饪可让部分胶原转化为明胶。",
        commonMisunderstandings: "有筋不一定是缺点，它可能意味着这个部位更适合炖、烟熏或慢烤。",
      },
      en: {
        term: "Connective Tissue",
        englishTerm: "Connective Tissue",
        chineseTerm: "结缔组织",
        shortDefinition: "Supportive tissue within and around muscles that strongly affects tenderness and cooking suitability.",
        explanation: "Hard-working muscles often contain more connective tissue. They may be tough when quick-cooked but can become gelatin-rich through slow cooking.",
        commonMisunderstandings: "Connective tissue is not always a defect; it may indicate a cut suited to braising, smoking, or slow roasting.",
      },
    },
  },
  {
    slug: "vacuum-pack",
    category: "processing",
    relatedTermSlugs: ["wet-aging"],
    translations: {
      zh: {
        term: "真空包装",
        englishTerm: "Vacuum Pack",
        chineseTerm: "真空包装",
        shortDefinition: "排除包装内空气并密封的包装方式，常用于冷鲜、冷冻和湿式熟成牛肉。",
        explanation: "真空包装有助于减少氧化和汁液损失，但包装完整性、温度和储存时间仍然影响品质。",
        commonMisunderstandings: "真空包装不是无期限保鲜，也不能修复原料质量问题。",
      },
      en: {
        term: "Vacuum Pack",
        englishTerm: "Vacuum Pack",
        chineseTerm: "真空包装",
        shortDefinition: "Packaging that removes air and seals beef, widely used for chilled, frozen, and wet-aged products.",
        explanation: "Vacuum packaging helps limit oxidation and purge loss, but seal integrity, temperature, and storage time still matter.",
        commonMisunderstandings: "Vacuum packaging is not indefinite preservation and cannot fix poor raw material quality.",
      },
    },
  },
  {
    slug: "grain",
    category: "cut",
    relatedTermSlugs: ["fabrication"],
    translations: {
      zh: {
        term: "肌肉纹理",
        englishTerm: "Grain",
        chineseTerm: "肌肉纹理",
        shortDefinition: "肌纤维排列方向，决定切片方向和咀嚼感的重要因素。",
        explanation: "薄切或长纤维部位通常需要逆纹切片，以缩短单根肌纤维长度并改善口感。",
        commonMisunderstandings: "煎得再好也无法完全弥补顺纹切片造成的韧感。",
      },
      en: {
        term: "Grain",
        englishTerm: "Grain",
        chineseTerm: "肌肉纹理",
        shortDefinition: "The direction of muscle fibers, a key factor in slicing and perceived tenderness.",
        explanation: "Long-grained cuts are often sliced across the grain to shorten fibers and improve tenderness.",
        commonMisunderstandings: "Good cooking cannot fully compensate for slicing a fibrous cut with the grain.",
      },
    },
  },
  {
    slug: "haccp",
    category: "trade",
    relatedTermSlugs: ["establishment-number"],
    translations: {
      zh: {
        term: "HACCP",
        englishTerm: "HACCP",
        chineseTerm: "危害分析与关键控制点",
        shortDefinition: "食品安全管理体系，用于识别和控制生产过程中的关键风险。",
        explanation: "HACCP 常出现在肉类加工和出口监管语境中，关注危害识别、关键控制点、监测和纠偏。",
        commonMisunderstandings: "HACCP 是食品安全管理工具，不是牛肉风味或等级标签。",
      },
      en: {
        term: "HACCP",
        englishTerm: "HACCP",
        chineseTerm: "危害分析与关键控制点",
        shortDefinition: "A food-safety management system for identifying and controlling significant process hazards.",
        explanation: "HACCP appears frequently in meat processing and export contexts, focusing on hazard analysis, critical control points, monitoring, and corrective actions.",
        commonMisunderstandings: "HACCP is a safety management system, not a flavor or quality grade.",
      },
    },
  },
  {
    slug: "sub-primal-cut",
    category: "cut",
    relatedTermSlugs: ["primal-cut", "fabrication"],
    translations: {
      zh: {
        term: "次级分割",
        englishTerm: "Sub-primal Cut",
        chineseTerm: "次级分割",
        shortDefinition: "由大分割进一步拆解出的商业化中间规格，通常再加工成零售牛排或餐饮产品。",
        explanation: "次级分割连接屠宰端和零售端。理解它有助于解释为什么同一大部位可以产生多个名称和价格差异很大的产品。",
        commonMisunderstandings: "次级分割不是固定全球统一清单，各国家和供应商规格会不同。",
      },
      en: {
        term: "Sub-primal Cut",
        englishTerm: "Sub-primal Cut",
        chineseTerm: "次级分割",
        shortDefinition: "An intermediate commercial cut derived from a primal and further fabricated into retail or foodservice items.",
        explanation: "Subprimals bridge carcass fabrication and retail products, explaining why one primal can yield many named cuts with different values.",
        commonMisunderstandings: "Subprimal specifications are not globally identical and vary by system and supplier.",
      },
    },
  },
];

export const origins: Origin[] = [
  {
    slug: "united-states",
    countryCode: "US",
    commonGradeSystems: ["USDA Prime", "USDA Choice", "USDA Select"],
    relatedTermSlugs: ["marbling", "grain-fed", "establishment-number"],
    coverImageUrl: originImage,
    translations: {
      zh: {
        name: "美国",
        shortDefinition: "以谷饲牛肉、USDA 分级和稳定商业规格著称的重要牛肉产地。",
        overview: "美国牛肉在国际市场中常以等级、品牌和分割规格共同呈现。理解 USDA 等级和供应链标签，是阅读美国牛肉产品的基础。",
        productionCharacteristics: "商业化程度高，谷饲体系成熟，常见 Angus 相关市场标签。",
        gradingOverview: "USDA Prime、Choice、Select 是消费者最常见的质量等级名称。",
        exportCharacteristics: "出口产品覆盖冷鲜、冷冻、餐饮规格和零售规格。",
        marketNotes: "中文市场中常以等级、品牌、厂号和部位名称共同影响价格。",
      },
      en: {
        name: "United States",
        shortDefinition: "A major beef origin known for grain-fed production, USDA grading, and standardized commercial specifications.",
        overview: "US beef is often presented through a combination of grade, brand, and cut specification. Understanding USDA grades is fundamental for reading labels.",
        productionCharacteristics: "The industry is highly commercialized, with mature grain-fed systems and common Angus-related marketing labels.",
        gradingOverview: "USDA Prime, Choice, and Select are the most visible quality grade names for consumers.",
        exportCharacteristics: "Exports include chilled, frozen, foodservice, and retail-oriented specifications.",
        marketNotes: "In Chinese retail contexts, grade, brand, establishment number, and cut name all influence value perception.",
      },
    },
  },
  {
    slug: "australia",
    countryCode: "AU",
    commonGradeSystems: ["MSA", "AUS-MEAT", "MB Score"],
    relatedTermSlugs: ["marbling", "grass-fed", "chilled-beef"],
    coverImageUrl: originImage,
    translations: {
      zh: {
        name: "澳大利亚",
        shortDefinition: "兼具草饲、谷饲和和牛交叉血统产品的主要牛肉出口国。",
        overview: "澳洲牛肉体系中常见 MSA、AUS-MEAT、草饲/谷饲和 MB 分数等标签。它适合用来理解产地、饲养方式和等级标签如何共同影响市场认知。",
        productionCharacteristics: "草饲基础广泛，同时也有谷饲和澳洲和牛体系。",
        gradingOverview: "MSA 偏向食用品质预测，AUS-MEAT 和 MB 分数常用于商业规格沟通。",
        exportCharacteristics: "对亚洲市场出口活跃，冷鲜和冷冻产品都常见。",
        marketNotes: "需要区分 MSA、MB、Wagyu、grain-fed 等标签分别表达什么。",
      },
      en: {
        name: "Australia",
        shortDefinition: "A major beef exporter spanning grass-fed, grain-fed, and Wagyu-influenced production.",
        overview: "Australian beef labels often involve MSA, AUS-MEAT, grass-fed/grain-fed claims, and MB scores. It is a useful origin for understanding how production and grading signals interact.",
        productionCharacteristics: "Grass-fed production is widespread, alongside grain-fed programs and Australian Wagyu systems.",
        gradingOverview: "MSA is oriented toward eating-quality prediction, while AUS-MEAT and MB scores communicate commercial specifications.",
        exportCharacteristics: "Australia is active in Asian markets with both chilled and frozen beef formats.",
        marketNotes: "MSA, MB, Wagyu, and grain-fed labels communicate different things and should not be merged into one scale.",
      },
    },
  },
  {
    slug: "japan",
    countryCode: "JP",
    commonGradeSystems: ["Japanese Meat Grading", "BMS", "A5"],
    relatedTermSlugs: ["bms", "marbling"],
    coverImageUrl: originImage,
    translations: {
      zh: {
        name: "日本",
        shortDefinition: "以和牛、BMS 和 A5 等级认知闻名的高端牛肉产地。",
        overview: "日本牛肉常被消费者直接联想到 A5 和高油花，但完整等级体系还包括产肉等级、肉质等级和多个评价维度。",
        productionCharacteristics: "重视血统、饲养管理和精细分级，和牛产品在国际市场具有强品牌认知。",
        gradingOverview: "A5 结合产肉等级 A 和肉质等级 5；BMS 是肉质评价的重要组成。",
        exportCharacteristics: "出口规模相对有限，产品通常定位高端。",
        marketNotes: "A5 不应被简单理解为“所有维度都最好吃”，它更是特定分级体系下的结果。",
      },
      en: {
        name: "Japan",
        shortDefinition: "A premium beef origin strongly associated with Wagyu, BMS, and A5 grading.",
        overview: "Japanese beef is often reduced to A5 and high marbling in consumer discourse, but the grading system includes yield grade, quality grade, and multiple evaluation factors.",
        productionCharacteristics: "Bloodline, feeding management, and detailed grading are central to the market identity of Japanese Wagyu.",
        gradingOverview: "A5 combines yield grade A and quality grade 5, with BMS playing a major role in quality assessment.",
        exportCharacteristics: "Exports are relatively limited and positioned at the premium end.",
        marketNotes: "A5 should not be simplified as universally best tasting; it is a result within a specific grading system.",
      },
    },
  },
];

export const grades: GradeSystem[] = [
  {
    slug: "usda-prime",
    originSlug: "united-states",
    systemName: "USDA Beef Grades",
    translations: {
      zh: {
        name: "USDA Prime",
        shortDefinition: "美国 USDA 牛肉质量等级中的高等级，通常代表较丰富油花。",
        overview: "Prime 常见于高端餐饮和零售场景。它主要与油花和成熟度等评价相关，但具体口感仍受部位、熟成和烹饪影响。",
        criteria: "以胴体评价为基础，油花和成熟度是理解质量等级的重要维度。",
        marketMeaning: "在市场上通常意味着更高价格和更强脂香预期。",
        commonMisunderstandings: "Prime 不等于任何部位都适合快煎，也不保证每块肉都比 Choice 更符合个人偏好。",
      },
      en: {
        name: "USDA Prime",
        shortDefinition: "A high USDA beef quality grade commonly associated with abundant marbling.",
        overview: "Prime is common in premium foodservice and retail contexts. It signals grade-level expectations but eating quality still depends on cut, aging, and cooking.",
        criteria: "Carcass evaluation includes factors such as marbling and maturity.",
        marketMeaning: "It usually implies higher price and stronger richness expectations.",
        commonMisunderstandings: "Prime does not make every cut ideal for quick steak cooking, nor does it guarantee personal preference over Choice.",
      },
    },
  },
  {
    slug: "usda-choice",
    originSlug: "united-states",
    systemName: "USDA Beef Grades",
    translations: {
      zh: {
        name: "USDA Choice",
        shortDefinition: "美国市场非常常见的质量等级，通常在价格和油花之间取得平衡。",
        overview: "Choice 覆盖范围较广，既可能有不错油花，也可能相对清瘦。阅读标签时仍需结合部位和品牌。",
        criteria: "同属 USDA 质量等级体系，油花水平通常低于 Prime 但高于 Select。",
        marketMeaning: "常见于零售和餐饮，性价比讨论中出现频率高。",
        commonMisunderstandings: "Choice 不是单一品质点，而是一个范围。",
      },
      en: {
        name: "USDA Choice",
        shortDefinition: "A very common US quality grade that often balances price and marbling.",
        overview: "Choice covers a broad range. Some products are well marbled, while others are leaner, so cut and brand still matter.",
        criteria: "It is part of the USDA quality grade system, generally below Prime and above Select in marbling expectations.",
        marketMeaning: "It is common in retail and foodservice and often appears in value comparisons.",
        commonMisunderstandings: "Choice is a range, not one exact quality point.",
      },
    },
  },
  {
    slug: "msa",
    originSlug: "australia",
    systemName: "Meat Standards Australia",
    translations: {
      zh: {
        name: "MSA",
        shortDefinition: "澳大利亚面向食用品质预测的牛肉评估体系。",
        overview: "MSA 不只是看油花，而是把品种、成熟、pH、悬挂方式、熟成和烹饪方式等因素纳入食用品质预测。",
        criteria: "评价逻辑涉及多个生产和加工变量，并与推荐烹饪方式关联。",
        marketMeaning: "在澳洲牛肉标签中常用于表达稳定食用品质。",
        commonMisunderstandings: "MSA 不是简单的油花分数，也不能直接与 USDA Prime 或日本 A5 互换。",
      },
      en: {
        name: "MSA",
        shortDefinition: "An Australian eating-quality prediction system for beef.",
        overview: "MSA considers more than marbling, incorporating variables such as breed, maturity, pH, hanging method, aging, and cooking method.",
        criteria: "Its logic connects production and processing variables with expected eating quality and cooking use.",
        marketMeaning: "It is commonly used in Australian beef labeling to signal consistent eating quality.",
        commonMisunderstandings: "MSA is not a simple marbling score and should not be directly converted to USDA Prime or Japanese A5.",
      },
    },
  },
  {
    slug: "japanese-a5",
    originSlug: "japan",
    systemName: "Japanese Meat Grading",
    translations: {
      zh: {
        name: "日本 A5",
        shortDefinition: "日本牛肉分级中产肉等级 A 与肉质等级 5 的组合。",
        overview: "A5 是高端和牛营销中最知名的标签之一。它体现特定分级体系下的产肉率和肉质评价结果，而不是简单的“最好吃”结论。",
        criteria: "A 表示产肉等级，5 表示肉质等级，肉质评价包括油花、肉色、脂肪色泽、紧实度和纹理等。",
        marketMeaning: "通常代表高油花、高价格和高端消费场景。",
        commonMisunderstandings: "A5 不是烹饪适配万能标签，高油脂含量也可能不适合大份量食用。",
      },
      en: {
        name: "Japanese A5",
        shortDefinition: "A combination of Japanese yield grade A and quality grade 5.",
        overview: "A5 is one of the most recognized labels in premium Wagyu marketing. It reflects a specific grading outcome rather than a universal taste verdict.",
        criteria: "A indicates yield grade, while 5 indicates quality grade across marbling, meat color, fat color, firmness, and texture.",
        marketMeaning: "It usually signals high marbling, high price, and premium positioning.",
        commonMisunderstandings: "A5 is not universally ideal for every cooking style or serving size.",
      },
    },
  },
  {
    slug: "aus-meat-mb",
    originSlug: "australia",
    systemName: "AUS-MEAT Marble Score",
    translations: {
      zh: {
        name: "澳洲 MB 分数",
        shortDefinition: "澳洲商业标签中常见的油花分数表达方式。",
        overview: "MB 分数常用于澳洲谷饲和和牛产品沟通油花水平，但它与日本 BMS 并非同一体系。",
        criteria: "以油花视觉评价为核心，具体标签还需结合品牌和产品规格。",
        marketMeaning: "常见于澳洲和牛或高油花牛肉的市场描述。",
        commonMisunderstandings: "MB9+ 不能简单等同于日本 A5 或某个 BMS 分数。",
      },
      en: {
        name: "Australian MB Score",
        shortDefinition: "A marbling score commonly used in Australian commercial beef labels.",
        overview: "MB scores communicate marbling level, especially in grain-fed and Wagyu-influenced Australian beef, but they are not the same as Japanese BMS.",
        criteria: "The score focuses on visual marbling, while brand and product specification still matter.",
        marketMeaning: "It is common in marketing for Australian Wagyu and highly marbled beef.",
        commonMisunderstandings: "MB9+ should not be treated as identical to Japanese A5 or a specific BMS value.",
      },
    },
  },
];

export const tradeTopics = [
  {
    slug: "how-to-read-imported-beef-labels",
    translations: {
      zh: {
        title: "进口牛肉标签怎么看",
        summary: "从产地、厂号、等级、部位、冷鲜/冷冻和批次信息入手，建立阅读进口牛肉标签的基础框架。",
      },
      en: {
        title: "How to Read Imported Beef Labels",
        summary: "A basic framework for reading origin, establishment number, grade, cut name, chilled/frozen status, and lot information.",
      },
    },
  },
  {
    slug: "what-is-establishment-number",
    translations: {
      zh: {
        title: "厂号是什么",
        summary: "解释厂号与屠宰厂、加工厂、出口准入和品牌之间的关系。",
      },
      en: {
        title: "What Is an Establishment Number?",
        summary: "An explanation of how establishment numbers relate to plants, export eligibility, and brands.",
      },
    },
  },
] as const;

export function getCut(slug: string) {
  return cuts.find((cut) => cut.slug === slug);
}

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((term) => term.slug === slug);
}
