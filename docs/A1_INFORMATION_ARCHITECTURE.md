# ERPA / La Vie Nomade — A1 Information Architecture Freeze

Dit document bevriest de **Journey-first** structuur voor Full Phase A1.

## Definitieve hoofdvolgorde

1. Home  
2. Origin  
3. The Field  
4. Maison de Resonance  
5. Living Journey  
6. Field Applications  
7. Art / Movement  
8. Shop  
9. Magazine  
10. Request Access (persistent CTA)

## Navigatiekeuzes

- **Journey eerst**, market-segmentatie pas op toepassingsniveau.
- **Request Access** blijft aparte, zichtbare CTA in de header.
- **Community** verhuist naar later (A2/A3) en is geen primary nav item in A1.

## Vertaling naar code

- Headervolgorde en mobile nav: `web/components/layout/Header.tsx`.
- Markets-sublaag met anchors op toepassingenpagina:
  - `web/app/[locale]/field-applications/page.tsx`
  - `web/messages/nl.json` → `markets.*`
  - `web/messages/en.json` → `markets.*`

## Waarom dit werkt

- Verhaalgedreven bezoekers worden niet afgeschrikt door een harde B2B-ingang.
- Sport/B2B bezoekers vinden toch snel hun context via de market anchors.
- Het merk blijft coherent: één identiteit, meerdere toepassingen.
