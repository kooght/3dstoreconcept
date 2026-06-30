export function calculateSpeed(distanceKm: number, timeHours: number): number {
  if (timeHours <= 0) return 0;
  return distanceKm / timeHours;
}

export function calculateDistance(speedKmh: number, timeHours: number): number {
  return speedKmh * timeHours;
}

export function calculateTime(speedKmh: number, distanceKm: number): number {
  if (speedKmh <= 0) return 0;
  return distanceKm / speedKmh;
}

export function dmsToDecimal(degrees: number, minutes: number, seconds: number, direction: "N" | "S" | "E" | "W"): number {
  let decimal = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") decimal = -decimal;
  return decimal;
}

export function decimalToDms(decimal: number, isLatitude: boolean): {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: string;
} {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;

  let direction: string;
  if (isLatitude) {
    direction = decimal >= 0 ? "N" : "S";
  } else {
    direction = decimal >= 0 ? "E" : "W";
  }

  return { degrees, minutes, seconds, direction };
}

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  let years = referenceDate.getFullYear() - birthDate.getFullYear();
  let months = referenceDate.getMonth() - birthDate.getMonth();
  let days = referenceDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (referenceDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays };
}

export function estimateBloodAlcohol(
  weightKg: number,
  volumeCl: number,
  alcoholPercentage: number,
  hoursSinceDrink: number,
  isMale: boolean
): number {
  const r = isMale ? 0.7 : 0.6;
  const gramsAlcohol = volumeCl * 10 * (alcoholPercentage / 100) * 0.789;
  const bac = gramsAlcohol / (weightKg * r * 1000) - 0.15 * hoursSinceDrink;
  return Math.max(0, Math.round(bac * 1000) / 1000);
}

export function generateReference(prefix: string, unit: string, sequence: number): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const seq = String(sequence).padStart(4, "0");
  return `${prefix}-${unit}-${year}${month}-${seq}`;
}
