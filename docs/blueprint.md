# **App Name**: Rememble

## Core Features:

- Invitation Mockup: Mocked 'Send Invitation' screen based on LinkedIn's design. Displays the profile of the person you are inviting, with dummy data replacing PII, maintaining the general layout of the original screen.
- Add Note Field: Field to add a personal note/reminder to the connection request.
- Save Button: A simple 'Save' button to store the note with the connection request.
- Store Connection Note: Store the user's note, associating it with the sent connection request for later retrieval.
- Confirmation Message: Display a user-friendly message to confirm that the note has been saved.
- AI Note Prompts: Generate suggested note prompts based on the profile data using AI. This acts as a tool for users, giving them optional starting points for their personal note.
- Add Note When Sending Request: Below the optional message field, include a text area labeled: “Add a private note to remember how you know them (only you can see this).” Character limit: 500
- Add Note After Accepting a Request: Inline prompt: “Want to remember how you know [Name]? Add a private note.” Clicking expands a 500-character text field
- View Note on Profile: Display a “Private Note” section only visible to the user. Collapsed by default. Includes note preview, edit, and delete options
- Search Notes in ‘My Network’: Add search functionality to filter connections by note content. Optional: Display note preview in list view. Update list dynamically as users type

## Style Guidelines:

- Primary color: LinkedIn blue (#0A66C2) for primary interactive elements.
- Background color: Light gray (#F3F2EF) for a clean, professional feel, in line with LinkedIn's design.
- Accent color: A slightly darker shade of blue (#005199) for hover/active states.
- Body and headline font: 'Inter' (sans-serif) for a clean and modern look, suitable for all text elements.
- Use familiar LinkedIn-style icons for clarity and consistency.
- Maintain the current LinkedIn layout and spacing as closely as possible to provide a seamless experience.