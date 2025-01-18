```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser starts executing the JavaScript code that <br/> creates a new note <br/> adds it to the notes list <br/> rerenders the note list on the page and <br/> sends the new note to the server.

    browser->>server:  POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa <br/> (form send json {content: "exercise06", date: "2025-01-18T16:09:09.339Z"})
    activate server
    server-->>browser:  201 Created
    deactivate server