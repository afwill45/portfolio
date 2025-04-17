---
layout: ../../layouts/Article.astro
title: "atrium"
sidebar: false
pubDate: 2025-04-17
description: "Atrium – custom event‑management software for MassInsight"
author: "Afolabi Williams"
tags: ["code, design"]

textColor: "#006EB6"
bgColor:   "#FFFFFF"
---

# Atrium event‑management platform  

`Sep 2024 – May 2025`  
`code`  
`design`

In summer 2023 MassInsight’s **AP Operations** and **Research & Impact** teams were juggling spreadsheets, Box folders, Zoom links, and half‑a‑dozen SaaS dashboards just to run a single professional‑development workshop.  

As the project‑manager for our Impact engineering team I was tasked with turning that patchwork into one cohesive tool.

> **Atrium** is an end‑to‑end event‑management platform that merges file storage, registration, email outreach, live attendance tracking, and analytics into one opinionated—but flexible—workflow.

---

## The problem we inherited  

* **Fragmented data** Attendance lived in Zoom exports, registrations in Google Forms, and rosters in bulky Excel sheets.  
* **Slow manual processes** Staff spent hours reconciling names, sending reminders, and producing after‑action reports.  
* **Security headaches** Student data moved between unsecured personal drives and email threads.

Our brief: **build an MVP in one semester** that eliminated those pain points without forcing MassInsight to upend its existing processes.

---

## First milestone — stitching the basics together  

We named the project **Atrium** (the central chamber that connects every room).

1. **Storage layer** – Spun up a *Supabase* Postgres instance with row‑level security and role‑based policies.  
2. **File ingestion** – Wrote a CSV/Excel parser that maps columns from any district export to Atrium’s canonical schema.  
3. **Event wizard** – A Next.js form that lets staff create an event, upload a roster, and schedule Zoom links in <3 min.  
4. **Transactional email** – Integrated **Resend** so invitations, reminders, and follow‑ups send from *@massinsight.org* without exposing SMTP credentials.

By week 6 we had a working skeleton: staff could create an event, invite participants, and see RSVP counts update in real time.

---

## Edge‑cases & lessons learned  

*Some things break only when real teachers start clicking…*

* **Name mismatches** – “José L. Ramírez” vs “Jose Ramirez” killed our lookup logic. We added fuzzy string matching and an interactive “possible duplicates” sidebar.  
* **District firewalls** – Invitation links were stripped from plain‑text emails. Switching to a branded HTML template with `https://events.massinsight.org` links fixed deliverability.  
* **Attendance fidelity** – Zoom’s raw log marked drop‑ins as separate sessions. We merged sessions <5 min apart to avoid under‑counting engagement.

---

## Optimising the workflow  

> *Function over form first, polish later.*

* **Redux Toolkit** keeps the UI snappy while large rosters (10 000 + rows) stream in chunks.  
* **Serverless functions** in Supabase handle heavy XLSX parsing so the browser never freezes.  
* **One‑click exports** deliver filtered attendance, no‑shows, and PDP‑hour certificates as ready‑to‑send PDFs.  
* **Role‑based dashboards** ensure teachers only see their own events, while admins access cross‑event analytics.

Average end‑to‑end time to set up and run an event dropped **from ≈ 3 hours to < 25 minutes**.

---

## Outcome & impact  

* Deployed on a StratusPointIT‑managed sub‑domain with SSO.  
* **2300 +** invitations sent and **98 %** delivered during the pilot semester.  
* Generated **real‑time analytics** that fed MassInsight’s annual program‑evaluation report—previously a manual two‑week scramble.  
* Hand‑off included a living Notion runbook and CI/CD GitHub actions so MassInsight’s tech team can extend Atrium independently.

---

## What I did as PM  

* **Scoped** the MVP, broke work into fortnightly deliverables, and maintained the living spec you see above.  
* **Coordinated** between MassInsight stakeholders, our two SWE interns, and external IT (StratusPointIT).  
* **Prioritised** security reviews, GDPR alignment, and formal OKRs over “nice‑to‑have” UI sparkle.  
* **Kept momentum**—bi‑weekly demos, retros, and a Kanban board that never grew stale.

Building Atrium taught me that the fastest way to delight users is to *simplify what they already do*—not to force a brand‑new workflow.  
I still get Slack pings when staff uncover a quirky roster format, and fixing those edge cases remains my favourite kind of puzzle.

---

### Tech stack  

