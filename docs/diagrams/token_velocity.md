# Token Velocity (Closed Loop)

```mermaid
flowchart TB
    U["User action (chat · like · share · referral)"] --> R["C-token rewarded"]
    R --> L["C-token ledger (closed loop)"]

    L --> V["Visibility boost (pin · highlight · rank)"]
    L --> A["App utilities (engagement actions)"]

    V --> T["More discovery"]
    A --> T
    T --> U

    class R,L Aqua
    class V,A Sky

    classDef Aqua stroke-width:1px,stroke-dasharray:none,stroke:#46EDC8,fill:#DEFFF8,color:#378E7A
    classDef Sky  stroke-width:1px,stroke-dasharray:none,stroke:#374D7C,fill:#E2EBFF,color:#374D7C
