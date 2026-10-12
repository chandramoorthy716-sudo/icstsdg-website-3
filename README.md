# ICSTSDG 2027 – Conference Website

Responsive, royal-blue and white website for the **3rd International Conference on Smart Technologies for Sustainable Development Goals (ICSTSDG 2027)**, **04–06 August 2027**, S.A. Engineering College (Autonomous), Chennai.

Built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step.

## Folder structure

```
icstsdg-website/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── saec-campus.jpg          campus photo (desktop)
│   ├── saec-campus-mobile.jpg   portrait crop of the same photo (phones)
│   ├── saec-logo.png            college logo
│   └── sdg/                     optional official SDG icons
└── README.md
```

## Run in Visual Studio Code (Live Server)

1. Install the **Live Server** extension (Ritwick Dey).
2. **File → Open Folder…** and choose `icstsdg-website`.
3. Right-click `index.html` and choose **Open with Live Server**.

You can also double-click `index.html`.

## Publish with GitHub Pages

Upload everything inside the folder (keeping `css`, `js` and `assets`) to a repository, then **Settings → Pages → Deploy from a branch → main / (root)**. Leave the custom domain box empty.

## One thing you must set: the paper-submission link

The 3rd-edition Microsoft CMT link was not in the supplied document, so it is **not guessed**. Until it is set, the "Submit your manuscript" button is disabled and the header's **SUBMIT YOUR PAPER** button scrolls to the submission card in the Call for Papers section.

To switch it on, open `js/script.js`, find `submissionUrl: ""` near the top, and paste the real link between the quotes. Every submit button then opens that link in a new tab.

## Content sources

- 3rd-edition dates, fees, tracks, accommodation, payment details and email (`ieeeicstsdg2027@saec.ac.in`): the supplied document "3rd IEEE Conference on 2027".
- Organising committee, contact names and phones, Where/How to Submit, Acknowledgement: https://www.saec.ac.in/ieeeicstsdg2026/ with the edition changed to 3rd.
- Preamble, About SAEC, About IEEE and chapters, About the Conference, SDGs: https://www.saec.ac.in/ieeeicstsdg/ with the edition changed to 3rd. The IEEE blurbs are lightly condensed.

Things to confirm with the organisers before publishing:

1. The supplied document's title line says "…Goals 2026" while the dates and email say 2027. The site uses **2027**.
2. The committee is the 2026 list. Replace it in `COMMITTEE` in `js/script.js` if the 3rd-edition committee differs.
3. The IEEE CASS chapter appears in the 2026 and earlier pages but not in your list, so it is not shown.
4. The bank details in the Registration section are shown exactly as supplied. Check them before the site goes public.
5. The conference-contact phone numbers are the 2026 ones.

## What is real and what is a demo

- **Real:** smooth scrolling, active-section highlighting, mobile menu, expandable tracks, committee accordions with search, SDG tiles linking to the UN pages, back-to-top, animated statistics, reduced-motion support.
- **Date states:** the timeline compares the real date with each deadline and marks passed ones as completed. There is no countdown.
- **Contact form:** there is no backend. The button validates the fields and opens the visitor's email app with the message pre-filled; the page never claims it was sent.
- **Payments:** the fee table and bank details are information only.

## Customising

Colours are CSS variables at the top of `css/style.css`. Dates, e-mail and the submission link are in `CONFIG` at the top of `js/script.js`; tracks, SDGs and committee are the data arrays below it. Dates in the Important Dates timeline and the fee-table headings are in `index.html`.
