FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY package*.json ./
# Only install production deps; vite is now in dependencies so it's included
RUN npm ci --omit=dev
# Copy built artifacts
COPY --from=builder /app/dist ./dist
# vite preview resolves source entry points at startup — needs src/ present
COPY --from=builder /app/src ./src
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/public ./public
COPY --from=builder /app/project.inlang ./project.inlang
COPY --from=builder /app/tsconfig.json ./tsconfig.json
# Use the prod-only vite config (no devtools/paraglide/react build plugins)
COPY --from=builder /app/vite.config.prod.ts ./vite.config.ts
EXPOSE 3000
CMD ["npm", "run", "start"]
