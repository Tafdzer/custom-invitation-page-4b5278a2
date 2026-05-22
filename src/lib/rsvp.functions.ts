import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1IwTb91jb_xo2ciRO9hvuZuS_5bkz43PXkB38OTuKCzc";
const SHEET_RANGE = "Data!A:E";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const RsvpSchema = z.object({
  name: z.string().trim().min(1).max(200),
  attend: z.string().trim().min(1).max(200),
  food: z.string().trim().max(200).optional().default(""),
  drink: z.string().trim().max(200).optional().default(""),
});

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RsvpSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

    const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[now, data.name, data.attend, data.food, data.drink]],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Google Sheets append failed [${res.status}]: ${body}`);
    }

    return { success: true };
  });
