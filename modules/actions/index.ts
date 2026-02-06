"use server";

import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { consumeCredit } from "@/lib/usage";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        error: "No authenticated user found",
      };
    }

    const { id: clerkId, firstName, lastName, imageUrl, emailAddresses } = user;

    const newUser = await prisma.user.upsert({
      where: {
        clerkId,
      },
      update: {
        email: emailAddresses[0]?.emailAddress || "",
        image: imageUrl,
        name:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : firstName || lastName || null,
      },
      create: {
        clerkId,
        email: emailAddresses[0]?.emailAddress || "",
        image: imageUrl,
        name:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : firstName || lastName || null,
      },
    });

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.error(`ERR onBoardUser ${error}`);

    if (error instanceof Error)
      return {
        success: false,
        error: error.message,
      };

    if (error instanceof PrismaClientKnownRequestError)
      return {
        success: false,
        error: error.message,
      };

    return {
      success: false,
      error: "Unexpected error occurred.",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        error: "No authenticated user found",
      };
    }

    const { id: clerkId } = user;

    const dbUser = await prisma.user.findFirst({
      where: {
        clerkId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        clerkId: true,
      },
    });
    return dbUser;
  } catch (error) {
    console.error(`ERR getCurrentUser ${error}`);

    if (error instanceof Error)
      return {
        success: false,
        error: error.message,
      };

    if (error instanceof PrismaClientKnownRequestError)
      return {
        success: false,
        error: error.message,
      };

    return {
      success: false,
      error: "Unexpected error occurred.",
    };
  }
};

export const createProject = async (value: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  try {
    await consumeCredit();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Something went wrong: " + error.message);
    } else {
      throw new Error("Too many requests");
    }
  }

  // TODO: implement prisma and inngest
  // For now, return a mock project object
  return {
    id: "temp-id-" + Date.now(),
    content: value,
    createdAt: new Date(),
  };
};
