/**
 * Generates an ADMIN_USERS entry for the custom admin panel.
 *
 *   npm run admin:user -- "jeffrey@example.com" "Jeffrey Oyeneye" "their-password"
 *
 * Prints a JSON object to paste into the ADMIN_USERS env var (a JSON array).
 * Passwords are never stored anywhere in the repo — only the scrypt hash.
 */
import { hashPassword } from "../lib/admin/auth";

async function main() {
  const [email, name, password] = process.argv.slice(2);

  if (!email || !name || !password) {
    console.error('Usage: npm run admin:user -- "email" "Full Name" "password"');
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("Choose a password of at least 12 characters.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  console.log("\nAdd this object to the ADMIN_USERS JSON array:\n");
  console.log(JSON.stringify({ email, name, passwordHash }));
  console.log("\nFor a single user, ADMIN_USERS is:\n");
  console.log(JSON.stringify([{ email, name, passwordHash }]));
  console.log();
}

main();
