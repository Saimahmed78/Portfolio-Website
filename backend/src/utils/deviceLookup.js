// Utility to map high-entropy Android/iOS device model numbers to human-readable marketing names
const modelDictionary = {
  // --- OPPO ---
  "CPH2421": "Oppo A16e",
  "CPH2387": "Oppo A57",
  "CPH2219": "Oppo A74",
  "CPH2185": "Oppo A15",
  "CPH1909": "Oppo A5s",
  "CPH2179": "Oppo A54",
  "CPH1803": "Oppo A3s",
  "CPH2423": "Oppo A78",
  "CPH2477": "Oppo A17",
  "CPH2579": "Oppo Reno11 F",
  "CPH2581": "Oppo Reno11",
  "CPH2201": "Oppo Reno5 Pro",
  "CPH2237": "Oppo Reno6",

  // --- Samsung Galaxy ---
  "SM-G990B": "Samsung Galaxy S21 FE",
  "SM-G991B": "Samsung Galaxy S21",
  "SM-G998B": "Samsung Galaxy S21 Ultra",
  "SM-S901B": "Samsung Galaxy S22",
  "SM-S908B": "Samsung Galaxy S22 Ultra",
  "SM-S911B": "Samsung Galaxy S23",
  "SM-S918B": "Samsung Galaxy S23 Ultra",
  "SM-S921B": "Samsung Galaxy S24",
  "SM-S928B": "Samsung Galaxy S24 Ultra",
  "SM-A135F": "Samsung Galaxy A13",
  "SM-A145F": "Samsung Galaxy A14",
  "SM-A235F": "Samsung Galaxy A23",
  "SM-A325F": "Samsung Galaxy A32",
  "SM-A525F": "Samsung Galaxy A52",
  "SM-A536B": "Samsung Galaxy A53 5G",
  "SM-A546B": "Samsung Galaxy A54 5G",
  "SM-M127F": "Samsung Galaxy M12",
  "SM-M325F": "Samsung Galaxy M32",

  // --- OnePlus ---
  "KB2001": "OnePlus 8T",
  "LE2111": "OnePlus 9",
  "LE2121": "OnePlus 9 Pro",
  "NE2211": "OnePlus 10 Pro",
  "CPH2447": "OnePlus 11R",
  "CPH2449": "OnePlus 11",

  // --- Google Pixel ---
  "Pixel 4a": "Google Pixel 4a",
  "Pixel 5": "Google Pixel 5",
  "Pixel 6": "Google Pixel 6",
  "Pixel 6a": "Google Pixel 6a",
  "Pixel 6 Pro": "Google Pixel 6 Pro",
  "Pixel 7": "Google Pixel 7",
  "Pixel 7a": "Google Pixel 7a",
  "Pixel 7 Pro": "Google Pixel 7 Pro",
  "Pixel 8": "Google Pixel 8",
  "Pixel 8 Pro": "Google Pixel 8 Pro",
  "Pixel 9": "Google Pixel 9",
  "Pixel 9 Pro": "Google Pixel 9 Pro"
};

export function getHumanReadableDeviceName(modelStr) {
  if (!modelStr) return "";
  
  const trimmed = modelStr.trim();
  
  // 1. Direct Lookup
  if (modelDictionary[trimmed]) {
    return modelDictionary[trimmed];
  }
  
  // 2. Intelligent Prefix Pattern Guessing
  if (trimmed.startsWith("CPH") || trimmed.startsWith("PGP") || trimmed.startsWith("PE") || trimmed.startsWith("PJA")) {
    return `Oppo Device (${trimmed})`;
  }
  
  if (trimmed.startsWith("SM-")) {
    return `Samsung Galaxy (${trimmed})`;
  }
  
  if (trimmed.startsWith("M2") || trimmed.toLowerCase().includes("redmi") || trimmed.toLowerCase().includes("xiaomi")) {
    return `Xiaomi/Redmi (${trimmed})`;
  }
  
  if (trimmed.startsWith("KB") || trimmed.startsWith("LE") || trimmed.startsWith("NE") || trimmed.startsWith("HD") || trimmed.startsWith("IN")) {
    return `OnePlus Device (${trimmed})`;
  }
  
  if (trimmed.startsWith("V2") || trimmed.startsWith("PD")) {
    return `Vivo Device (${trimmed})`;
  }
  
  if (trimmed.toLowerCase().startsWith("iphone")) {
    return `Apple iPhone`;
  }
  
  if (trimmed.toLowerCase().startsWith("ipad")) {
    return `Apple iPad`;
  }
  
  // Fallback to presenting the model number gracefully
  return `${trimmed} Device`;
}
