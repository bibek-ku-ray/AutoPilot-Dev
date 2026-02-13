FROM node:21-slim

RUN apt-get update && apt-get install -y curl git && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

WORKDIR /home/user

# Install Next.js with minimal setup
RUN npx --yes create-next-app@latest nextjs-app --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes

# Install shadcn with default settings
WORKDIR /home/user/nextjs-app
RUN npx --yes shadcn@latest init -d

# Install essential shadcn components one by one to avoid conflicts
RUN npx --yes shadcn@latest add button
RUN npx --yes shadcn@latest add input
RUN npx --yes shadcn@latest add card
RUN npx --yes shadcn@latest add label
RUN npx --yes shadcn@latest add textarea
RUN npx --yes shadcn@latest add select
RUN npx --yes shadcn@latest add dialog
RUN npx --yes shadcn@latest add form

# Move everything to /home/user for easy access
WORKDIR /home/user
RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app