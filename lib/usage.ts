import { auth } from "@clerk/nextjs/server";
import { RateLimiterPrisma } from "rate-limiter-flexible";
import prisma from "./prisma";


export const FREE_POINTS = 5;
export const PRO_POINTS = 100;
export const DURATION = 30 * 24 * 60 * 60; // 30 days
export const GENERATION_COST = 1;

export async function getUsageTracker() {
  const {has} = await auth()
  console.log(`auth object - has: ${has}`)
  const hasProAccess = has({plan: "pro"})

  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasProAccess ? PRO_POINTS : FREE_POINTS,
    duration: DURATION
  })

  return usageTracker;
}

export async function consumeCredit() {
  const {userId} = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.consume(userId, GENERATION_COST);
  
  return result;
}