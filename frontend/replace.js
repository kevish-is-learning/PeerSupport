const fs = require('fs');

const path = 'app/onboarding/page.js';
let content = fs.readFileSync(path, 'utf8');

const regex = /{selectedRole === "MENTEE" \? \([\s\S]*?<\/form>\n          \) : null}/;

if (regex.test(content)) {
  const newText = `{selectedRole === "MENTEE" ? (\n            <MenteeOnboardingWizard \n              existingProfile={menteeProfileExists ? menteeForm : null} \n              onComplete={() => { fetchCurrentUser(); router.replace("/mentee/profile"); }} \n            />\n          ) : null}`;
  content = content.replace(regex, newText);
  fs.writeFileSync(path, content);
  console.log('Replaced mentee form in page.js');
} else {
  console.log('Failed to find patterns for mentee form');
}
