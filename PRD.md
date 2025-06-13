## Product Requirements Document (PRD)

I dictated to chatGPT my ideas which it turned into this beautiful PRD. 

### Overview  
LinkedIn currently allows users to connect with others but lacks a private way to record how or why someone is in your network. This feature enables users to add a private note when sending or accepting a connection request. The note helps users remember the context of the relationship.

### Goal  
- Help users maintain meaningful context behind their LinkedIn connections.  
- Improve long-term relationship management on the platform.  
- Make notes retrievable and searchable within the **My Network** section and on individual profiles.

### Users  
Anyone with a LinkedIn account who sends or receives connection requests.  
Especially useful for power networkers, job seekers, recruiters, and salespeople.

### Success Criteria  
- Users can add a private note during connection requests (outbound).  
- Users can add a private note after accepting a request (inbound).  
- Notes are visible only to the user.  
- Notes are searchable within the **My Network > Connections** view.  
- Notes are retrievable from the other person’s profile page.

### Key Features

#### Add Note When Sending Request  
**Where:** Connection modal UI  
**Details:**  
- Below the optional message field, include a text area labeled:  
  *“Add a private note to remember how you know them (only you can see this).”*  
- Character limit: 500  
- Persist note on connection object linked to recipient’s user ID  

#### Add Note After Accepting a Request  
**Where:** On the "Your connection with [Name] is confirmed" screen  
**Details:**  
- Inline prompt: *“Want to remember how you know [Name]? Add a private note.”*  
- Clicking expands a 500-character text field  
- Save behavior identical to sending request note  

#### View Note on Profile  
**Where:** On the profile page of a first-degree connection  
**Details:**  
- Display a “Private Note” section visible only to the user  
- Collapsed by default  
- Includes note preview, edit, and delete options  

#### Search Notes in ‘My Network’  
**Where:** **My Network > Connections** list  
**Details:**  
- Add search functionality to filter connections by note content  
- Optionally display note preview in list view  
- Update list dynamically as users type  

### Privacy  
- Notes are private to the user who created them.  
- Other users are never notified about being noted.  
- Notes are not included in user data exports for the other party.

### Technical Considerations  
- Add a new `private_note` field to the user-connection join table.  
- Enforce a 500-character limit at the database level.  
- Ensure notes are encrypted at rest.  
- Index notes for user-level search.  
- Add API support for:  
  - `POST /connections/:id/private-note`  
  - `GET /connections/:id/private-note`  
  - `PUT /connections/:id/private-note`  
  - `DELETE /connections/:id/private-note`
