```mermaid
flowchart TB
  A["Chat message"] --> B{Contains hashtag?}
  B -- No --> Z["No action"]
  B -- Yes --> C["Extract hashtag token"]
  C --> D["Places API Text Search"]
  D --> E{User confirms?}
  E -- No --> H["Key in more info & search again"]
  H --> D
  E -- Yes --> F["Create/Update Business Page"]
  F --> G["Link page to chat + allow edits"]

  class C,F Aqua
  class E,G Sky
  classDef Aqua stroke-width:1px,stroke-dasharray:none,stroke:#46EDC8,fill:#DEFFF8,color:#378E7A
  classDef Sky  stroke-width:1px,stroke-dasharray:none,stroke:#374D7C,fill:#E2EBFF,color:#374D7C
