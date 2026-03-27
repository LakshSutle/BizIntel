// Currency mapping based on location/country
export interface CurrencyInfo {
  symbol: string;
  code: string;
  name: string;
}

// Map of country/region keywords to currency
const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  // USD - United States
  'united states': { symbol: '$', code: 'USD', name: 'US Dollar' },
  'usa': { symbol: '$', code: 'USD', name: 'US Dollar' },
  'us': { symbol: '$', code: 'USD', name: 'US Dollar' },
  'america': { symbol: '$', code: 'USD', name: 'US Dollar' },
  
  // EUR - Eurozone
  'germany': { symbol: '€', code: 'EUR', name: 'Euro' },
  'france': { symbol: '€', code: 'EUR', name: 'Euro' },
  'italy': { symbol: '€', code: 'EUR', name: 'Euro' },
  'spain': { symbol: '€', code: 'EUR', name: 'Euro' },
  'netherlands': { symbol: '€', code: 'EUR', name: 'Euro' },
  'belgium': { symbol: '€', code: 'EUR', name: 'Euro' },
  'austria': { symbol: '€', code: 'EUR', name: 'Euro' },
  'portugal': { symbol: '€', code: 'EUR', name: 'Euro' },
  'ireland': { symbol: '€', code: 'EUR', name: 'Euro' },
  'finland': { symbol: '€', code: 'EUR', name: 'Euro' },
  'greece': { symbol: '€', code: 'EUR', name: 'Euro' },
  'europe': { symbol: '€', code: 'EUR', name: 'Euro' },
  
  // GBP - United Kingdom
  'united kingdom': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'uk': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'england': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'scotland': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'wales': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'london': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'britain': { symbol: '£', code: 'GBP', name: 'British Pound' },
  
  // JPY - Japan
  'japan': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
  'tokyo': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
  
  // CNY - China
  'china': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
  'beijing': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
  'shanghai': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
  
  // INR - India
  'india': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  'mumbai': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  'delhi': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  'bangalore': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  'hyderabad': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  'chennai': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  
  // CAD - Canada
  'canada': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
  'toronto': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
  'vancouver': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
  'montreal': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
  
  // AUD - Australia
  'australia': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
  'sydney': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
  'melbourne': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
  
  // CHF - Switzerland
  'switzerland': { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
  'zurich': { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
  'geneva': { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
  
  // BRL - Brazil
  'brazil': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
  'sao paulo': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
  'rio': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
  
  // MXN - Mexico
  'mexico': { symbol: 'MX$', code: 'MXN', name: 'Mexican Peso' },
  'mexico city': { symbol: 'MX$', code: 'MXN', name: 'Mexican Peso' },
  
  // KRW - South Korea
  'korea': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
  'south korea': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
  'seoul': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
  
  // SGD - Singapore
  'singapore': { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar' },
  
  // HKD - Hong Kong
  'hong kong': { symbol: 'HK$', code: 'HKD', name: 'Hong Kong Dollar' },
  
  // NZD - New Zealand
  'new zealand': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
  'auckland': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
  
  // SEK - Sweden
  'sweden': { symbol: 'kr', code: 'SEK', name: 'Swedish Krona' },
  'stockholm': { symbol: 'kr', code: 'SEK', name: 'Swedish Krona' },
  
  // NOK - Norway
  'norway': { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone' },
  'oslo': { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone' },
  
  // DKK - Denmark
  'denmark': { symbol: 'kr', code: 'DKK', name: 'Danish Krone' },
  'copenhagen': { symbol: 'kr', code: 'DKK', name: 'Danish Krone' },
  
  // AED - UAE
  'uae': { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham' },
  'dubai': { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham' },
  'abu dhabi': { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham' },
  'emirates': { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham' },
  
  // SAR - Saudi Arabia
  'saudi': { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal' },
  'saudi arabia': { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal' },
  'riyadh': { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal' },
  
  // ZAR - South Africa
  'south africa': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
  'johannesburg': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
  'cape town': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
  
  // PHP - Philippines
  'philippines': { symbol: '₱', code: 'PHP', name: 'Philippine Peso' },
  'manila': { symbol: '₱', code: 'PHP', name: 'Philippine Peso' },
  
  // THB - Thailand
  'thailand': { symbol: '฿', code: 'THB', name: 'Thai Baht' },
  'bangkok': { symbol: '฿', code: 'THB', name: 'Thai Baht' },
  
  // IDR - Indonesia
  'indonesia': { symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah' },
  'jakarta': { symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah' },
  
  // MYR - Malaysia
  'malaysia': { symbol: 'RM', code: 'MYR', name: 'Malaysian Ringgit' },
  'kuala lumpur': { symbol: 'RM', code: 'MYR', name: 'Malaysian Ringgit' },
  
  // VND - Vietnam
  'vietnam': { symbol: '₫', code: 'VND', name: 'Vietnamese Dong' },
  'hanoi': { symbol: '₫', code: 'VND', name: 'Vietnamese Dong' },
  'ho chi minh': { symbol: '₫', code: 'VND', name: 'Vietnamese Dong' },
  
  // PLN - Poland
  'poland': { symbol: 'zł', code: 'PLN', name: 'Polish Zloty' },
  'warsaw': { symbol: 'zł', code: 'PLN', name: 'Polish Zloty' },
  
  // TRY - Turkey
  'turkey': { symbol: '₺', code: 'TRY', name: 'Turkish Lira' },
  'istanbul': { symbol: '₺', code: 'TRY', name: 'Turkish Lira' },
  
  // RUB - Russia
  'russia': { symbol: '₽', code: 'RUB', name: 'Russian Ruble' },
  'moscow': { symbol: '₽', code: 'RUB', name: 'Russian Ruble' },
  
  // NGN - Nigeria
  'nigeria': { symbol: '₦', code: 'NGN', name: 'Nigerian Naira' },
  'lagos': { symbol: '₦', code: 'NGN', name: 'Nigerian Naira' },
  
  // EGP - Egypt
  'egypt': { symbol: 'E£', code: 'EGP', name: 'Egyptian Pound' },
  'cairo': { symbol: 'E£', code: 'EGP', name: 'Egyptian Pound' },
  
  // PKR - Pakistan
  'pakistan': { symbol: '₨', code: 'PKR', name: 'Pakistani Rupee' },
  'karachi': { symbol: '₨', code: 'PKR', name: 'Pakistani Rupee' },
  'lahore': { symbol: '₨', code: 'PKR', name: 'Pakistani Rupee' },
  
  // BDT - Bangladesh
  'bangladesh': { symbol: '৳', code: 'BDT', name: 'Bangladeshi Taka' },
  'dhaka': { symbol: '৳', code: 'BDT', name: 'Bangladeshi Taka' },
  
  // ILS - Israel
  'israel': { symbol: '₪', code: 'ILS', name: 'Israeli Shekel' },
  'tel aviv': { symbol: '₪', code: 'ILS', name: 'Israeli Shekel' },
  
  // CZK - Czech Republic
  'czech': { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna' },
  'prague': { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna' },
  
  // HUF - Hungary
  'hungary': { symbol: 'Ft', code: 'HUF', name: 'Hungarian Forint' },
  'budapest': { symbol: 'Ft', code: 'HUF', name: 'Hungarian Forint' },
  
  // CLP - Chile
  'chile': { symbol: 'CLP$', code: 'CLP', name: 'Chilean Peso' },
  'santiago': { symbol: 'CLP$', code: 'CLP', name: 'Chilean Peso' },
  
  // COP - Colombia
  'colombia': { symbol: 'COL$', code: 'COP', name: 'Colombian Peso' },
  'bogota': { symbol: 'COL$', code: 'COP', name: 'Colombian Peso' },
  
  // ARS - Argentina
  'argentina': { symbol: 'AR$', code: 'ARS', name: 'Argentine Peso' },
  'buenos aires': { symbol: 'AR$', code: 'ARS', name: 'Argentine Peso' },
  
  // PEN - Peru
  'peru': { symbol: 'S/', code: 'PEN', name: 'Peruvian Sol' },
  'lima': { symbol: 'S/', code: 'PEN', name: 'Peruvian Sol' },
};

// Default currency
const DEFAULT_CURRENCY: CurrencyInfo = { symbol: '$', code: 'USD', name: 'US Dollar' };

/**
 * Get currency info based on location string
 */
export function getCurrencyFromLocation(location: string): CurrencyInfo {
  if (!location) return DEFAULT_CURRENCY;
  
  const normalizedLocation = location.toLowerCase().trim();
  
  // Check for exact or partial matches
  for (const [key, currency] of Object.entries(CURRENCY_MAP)) {
    if (normalizedLocation.includes(key)) {
      return currency;
    }
  }
  
  return DEFAULT_CURRENCY;
}

/**
 * Format currency value with appropriate symbol
 */
export function formatCurrency(value: number, currencySymbol: string = '$'): string {
  const absValue = Math.abs(value);
  const prefix = value < 0 ? '-' : '';
  
  if (absValue >= 1000000) {
    return `${prefix}${currencySymbol}${(absValue / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    return `${prefix}${currencySymbol}${(absValue / 1000).toFixed(1)}K`;
  }
  return `${prefix}${currencySymbol}${absValue.toLocaleString()}`;
}

/**
 * Format currency value with full precision
 */
export function formatCurrencyFull(value: number, currencySymbol: string = '$'): string {
  const prefix = value < 0 ? '-' : '';
  return `${prefix}${currencySymbol}${Math.abs(value).toLocaleString()}`;
}
