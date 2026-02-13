FROM node:21-slim

RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

WORKDIR /home/user/autopilot-dev

RUN npx --yes create-next-app@16.1.4 . --yes

RUN npx --y shadcn@3.7.0 init --yes --style radix-maia --base-color zinc --force
RUN npx --yes shadcn@3.7.0 add --all --yes

RUN mv /home/user/autopilot-dev/* /home/user/ && rm -rf /home/user/autopilot-dev