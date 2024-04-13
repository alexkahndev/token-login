import { varchar, unique, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  sub: varchar("sub", { length: 255 }).primaryKey(),
});

export const social_media = pgTable("social_media", {
  platform_name: varchar("platform_name", { length: 255 }).primaryKey(),
});

export const social_media_token = pgTable(
  "social_media_token",
  {
    token: varchar("token", { length: 255 }),
    platform_name: varchar("platform_name", { length: 255 }).references(
      () => social_media.platform_name,
    ),
    sub: varchar("sub", { length: 255 }).references(() => user.sub),
  },
  (t) => ({
    token_key: unique().on(t.token, t.platform_name, t.sub),
  }),
);
