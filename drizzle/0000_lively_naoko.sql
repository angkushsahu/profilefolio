DO $$ BEGIN
 CREATE TYPE "employment_type" AS ENUM('Internship', 'Trainee', 'Full Time', 'Freelance', 'Part time', 'Self employed', '');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "location_type" AS ENUM('Remote', 'Hybrid', 'On Site', '');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "educations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"institute_name" varchar(300) NOT NULL,
	"degree" varchar(300) DEFAULT '',
	"field_of_study" varchar(300) DEFAULT '',
	"grade" varchar(20) DEFAULT '',
	"activities" varchar(300) DEFAULT '',
	"start_month" varchar(10) NOT NULL,
	"start_year" varchar(10) NOT NULL,
	"end_month" varchar(10),
	"end_year" varchar(10),
	"currently_working" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_name" varchar(200) NOT NULL,
	"job_title" varchar(200) NOT NULL,
	"industry" varchar(200),
	"employment_type" "employment_type" NOT NULL,
	"location_type" "location_type" NOT NULL,
	"location" varchar(200),
	"skills" varchar(500),
	"description" varchar(500),
	"start_month" varchar(10) NOT NULL,
	"start_year" varchar(10) NOT NULL,
	"end_month" varchar(10),
	"end_year" varchar(10),
	"currently_working" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"headline" varchar(400) NOT NULL,
	"current_position" varchar(200),
	"about" varchar(3000),
	"profile_public_url" varchar(500),
	"profile_secure_url" varchar(500),
	"location" varchar(300),
	"website_links" json,
	"phone" varchar(20),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"project_name" varchar(150) NOT NULL,
	"github_link" varchar(500),
	"project_link" varchar(500),
	"image_public_url" varchar(500),
	"image_secure_url" varchar(500),
	"skills" varchar(500),
	"description" varchar(500),
	"start_month" varchar(10),
	"start_year" varchar(10),
	"end_month" varchar(10),
	"end_year" varchar(10),
	"currently_working" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(200) NOT NULL,
	"skills" varchar(200)[],
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar(200) NOT NULL,
	"reset_password" varchar(100) DEFAULT '',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_education_index" ON "educations" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_experience_index" ON "experiences" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_profile_index" ON "profile" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_project_index" ON "projects" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_skill_index" ON "skills" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_index" ON "users" ("user_name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "educations" ADD CONSTRAINT "educations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experiences" ADD CONSTRAINT "experiences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
