```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (form data is send "note=exersise04")
    activate server
    server-->>browser: HTML 302 Found (redirect request location: /exampleapp/notes)
    deactivate server

    browser->>server:  GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser:  HTML 200 OK HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 200 OK main.css CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: 200 OK main.js Javascript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 OK data.json <br/> [{content: "PUUUUUUUUUURE CHAOOOOOOOOOOOOOOOS!!!!!!", date: "2025-01-16T17:23:22.850Z"},…]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
