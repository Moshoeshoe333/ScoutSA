# ScoutSA Gate 1 — Witness Provenance Map for Duplicate Cases 07–09

**Date:** 2026-10-05  
**Status:** Provenance reconciliation record — NOT semantic ratification

## 1. Finding
Cases 07, 08 and 09 each have two distinct witness files with the same numeric case identifier. The files are not identical witnesses and were introduced by distinct commits. Case number alone therefore cannot serve as a unique witness identifier.

## 2. Provenance Map

| Number | Witness | Blob SHA | Introducing commit | Classification |
|---|---|---|---|---|
| 07 | `gate-1-case-07-guardian-authorizes-trial-not-media.md` | `026265c0ae59b10ba2bc85256ed8afbd22214fa2` | `0086f4d53cfafa6c307f300ff313462ec376c4c6` | Canonical Case 07 in current ledger/synthesis |
| 07 | `gate-1-case-07-guardian-authorizes-trial-but-not-media.md` | `9afe1fa4e30a2477b38a50369618f8b22f636eaa` | `96ce1d7bdfab1b16e412184a6c365b3d234890e2` | Duplicate/supplemental witness; predecessor of canonical file |
| 08 | `gate-1-case-08-child-view-conflicts-with-guardian-authorization.md` | `f3354eed029aa1874663735c2da5ee03ba2a3cbe` | `48a3aa5b227b37b2b2491c4ca5dd160048df0ba2` | Canonical Case 08 in current ledger/synthesis |
| 08 | `gate-1-case-08-guardian-consent-authority-changes.md` | `dec28f699b4b5b065ff279cd9c2aa23563620334` | `57a964cc02e6641acc417cee7bcfe4ceef0b4b95` | Distinct supplemental witness; not the child-view scenario |
| 09 | `gate-1-case-09-safeguarding-concern-against-verified-organization-user.md` | `e1fb2c6439a2d0bf707f48f89220520f62b0a779` | `d7ec5013a61d0e9b6d00014e930babf84664f41c` | Canonical Case 09 in current ledger/synthesis |
| 09 | `gate-1-case-09-multi-guardian-authority-conflict.md` | `0c2b3120dc7ede30eae78870b12b0a9ac18ded61` | `a13a0657fce0afe90aa48b4ab569a6771af85eb6` | Distinct supplemental witness; not the safeguarding scenario |

## 3. Important Correction
The repository history shows that the duplicates are not merely duplicate copies. They are distinct adversarial scenarios sharing a numeric identifier.

Therefore the previous description 'duplicate numbered witness filenames' is accurate as a provenance warning but insufficient as a semantic description. The stronger finding is:

**Case number collision exists between distinct witnesses.**

## 4. Canonical Sequence
The current canonical Gate 1 sequence remains the 01–14 sequence established by the committed ledger and synthesis. The supplemental witnesses are retained as evidence because they contain distinct domain tests and materially contributed to the synthesis.

Canonical Case 07 = Guardian authorizes trial but not media.
Canonical Case 08 = Child view conflicts with Guardian authorization.
Canonical Case 09 = Safeguarding concern against verified organization user.

Supplemental Case 07 = alternate granular consent-scope witness.
Supplemental Case 08 = Guardian consent followed by GuardianLink authority change.
Supplemental Case 09 = two legitimate Guardians with incompatible authority scopes.

## 5. No Destructive Action
No witness is deleted, renamed, overwritten, or declared false.
The numeric collision should be resolved by explicit stable witness identifiers in a future provenance convention, not by erasing historical evidence.

## 6. Provenance Verdict
R-03 is **NARROWED / IDENTIFIED**, but the repository does not yet contain a stable non-numeric witness ID convention that formally distinguishes canonical and supplemental witnesses.

Recommended future convention:

```
Gate1-W07-CANONICAL
Gate1-W07-SUPPLEMENTAL-A
Gate1-W08-CANONICAL
Gate1-W08-SUPPLEMENTAL-A
Gate1-W09-CANONICAL
Gate1-W09-SUPPLEMENTAL-A
```

This convention is a proposal only and is not applied to filenames in this document.

## 7. Gate Effect
R-03 no longer requires historical reconstruction of which files exist or when they entered the repository. The remaining issue is formal identity convention, not missing provenance evidence.

Gate 1 remains OPEN pending consolidated M1–M9 re-witness and ratification decision.