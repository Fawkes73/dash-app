import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a count using the Indian numbering system (lakh/crore grouping),
// e.g. 1000000 -> "10,00,000".
export function formatIndianNumber(value: number) {
  const rounded = Math.round(value)
  const [intPart, fracPart] = String(rounded).split(".")
  const isNegative = intPart.startsWith("-")
  const digits = isNegative ? intPart.slice(1) : intPart

  let formatted: string
  if (digits.length <= 3) {
    formatted = digits
  } else {
    const last3 = digits.slice(-3)
    const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",")
    formatted = `${rest},${last3}`
  }

  return `${isNegative ? "-" : ""}${formatted}${fracPart ? `.${fracPart}` : ""}`
}
