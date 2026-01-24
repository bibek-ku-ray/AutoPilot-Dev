"use server";

import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
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
