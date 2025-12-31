```mermaid
flowchart TB
  T["Tourist (pays in USD)"] --> P["Payment initiated (card / wallet)"]
  P --> E["Escrow (USDC value locked)"]

  E --> V{"Experience completed?"}

  V -- Yes --> C["Mutual confirmation (tap / time / location)"]
  C --> S["Batch Settlement Trigger (Daily Cash-out Request)"]

  %% --- The "Safe" Compliant Flow Starts Here ---
  S -- "Send USDC" --> K_EX["Kori Corp. Exchange Acct (e.g., Korbit/Coinone)"]
  K_EX -- "Sell USDC -> KRW" --> K_BANK_IN["Kori Corp. Bank Acct (e.g., Shinhan/Kakao)"]
  K_BANK_IN --> K_TAX["Compliance Processing (Deduct 3.3% Tax + Wire Fee)"]
  K_TAX -- "Firm Banking Wire (Net KRW)" --> G["Local guide's personal bank account (Received KRW)"]
  %% -------------------------------------------

  V -- Dispute --> D["Dispute window (time-limited)"]
  D --> R["Resolution (predefined rules)"]
  R -- "If resolved for guide" --> S

  class E,S Aqua
  class V,D,R Sky
  class K_EX,K_BANK_IN,K_TAX Corp

  classDef Aqua stroke-width:1px,stroke-dasharray:none,stroke:#46EDC8,fill:#DEFFF8,color:#378E7A
  classDef Sky  stroke-width:1px,stroke-dasharray:none,stroke:#374D7C,fill:#E2EBFF,color:#374D7C
  classDef Corp stroke-width:1px,stroke-dasharray:none,stroke:#FF9F43,fill:#FFF3E0,color:#E67E22
