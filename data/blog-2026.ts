import type { BlogPost } from './blog';

/* Posts written 2026-11 from the keyword research: low-difficulty, buyer-intent topics.
   Every statistic links to its source. */
export const newPosts: BlogPost[] = [
  {
    slug: 'missed-call-text-back-for-contractors',
    title: 'Missed-Call Text Back for Contractors: How It Works, What It Costs, and When It Pays Off',
    seoTitle: 'Missed-Call Text Back for Contractors: Setup & ROI',
    seoDescription:
      'Stop losing jobs to voicemail. How an automated missed-call text back works for roofers, HVAC and plumbers, what it costs, and how fast it pays back.',
    excerpt:
      'When a homeowner calls three contractors and only one answers, that one usually gets the job. A missed-call text back makes sure the one who replies first is you, even when you are on a roof.',
    date: '2026-11-21',
    readTime: 7,
    category: 'Automation',
    tags: ['missed call text back for contractors', 'automated missed call text back', 'speed to lead home services', 'n8n twilio missed call', 'contractor lead follow-up automation'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>Most contractors do not lose jobs because their price is wrong. They lose them because nobody picked up. A homeowner with a leaking pipe or a dead AC unit calls the first three companies on Google, and the first one that responds usually gets the visit.</p>
<p>A <strong>missed-call text back</strong> closes that gap. When a call goes unanswered, the caller gets a text from your business number within seconds: who you are, that you saw the call, and how to get help fastest. It is one of the cheapest automations a trade business can run, and one of the few that pays for itself with a single job.</p>

<h2>Why missed calls cost you jobs</h2>
<p>Speed matters more than most owners expect. In an analysis of 132,000 campaigns, Hatch found that <a href="https://usehatchapp.com/blog/speed-to-lead" rel="noopener" target="_blank">88% of HVAC contractors take longer than five minutes to respond to a new lead</a>. That five-minute window is where most leads are won or lost, because the homeowner keeps dialling until someone answers.</p>
<p>You cannot answer every call. You are on a job, driving, or it is 9pm. The text back is not a replacement for answering; it is a holding message that stops the caller from moving on to the next number.</p>

<h2>How a missed-call text back works</h2>
<ol>
<li>A customer calls your business number and nobody answers within a set number of rings.</li>
<li>Your phone provider (for example Twilio) sends a "missed call" event to an automation tool such as <a href="/services/n8n-automation">n8n</a>.</li>
<li>The automation checks the time of day and whether this number already texted you recently.</li>
<li>It sends an SMS from your business number: <em>"Hi, it's Dave from Acme Plumbing. Sorry we missed you, we're on a job. Is this urgent? Reply 1 for emergency, 2 to book a quote."</em></li>
<li>The reply is forwarded to your phone, your CRM, or both, and you get an alert with the caller's number and answer.</li>
</ol>
<p>The whole flow runs in under ten seconds, every time, including weekends.</p>

<h2>What you need to set it up</h2>
<ul>
<li><strong>A business phone number that can send SMS.</strong> If your current number is a landline or a basic mobile, it can usually be forwarded to a Twilio number, or ported.</li>
<li><strong>Carrier registration (US).</strong> Business texting in the US goes through A2P 10DLC registration. Budget a few days to a couple of weeks for approval; it is paperwork, not engineering.</li>
<li><strong>An automation tool.</strong> n8n is a good fit because it is cheap to run, self-hostable, and connects to Twilio, Google Sheets, email and most CRMs.</li>
<li><strong>A place for leads to land.</strong> A spreadsheet is fine to start. Note that popular contractor CRMs such as Jobber, ServiceTitan and Housecall Pro have no native n8n node, so they connect through their APIs (<a href="https://contractortoolstack.com/guides/chatgpt-automation-for-contractors/" rel="noopener" target="_blank">ContractorToolStack</a>), which is a little more setup.</li>
</ul>

<h2>Message templates that get replies</h2>
<p>Keep the text short, human and specific to your trade. Three versions cover most businesses:</p>
<ul>
<li><strong>During working hours:</strong> "Hi, it's [Name] at [Business]. Sorry we missed your call, we're on a job right now. What can we help with? We'll call you back within the hour."</li>
<li><strong>After hours:</strong> "Thanks for calling [Business]. We're closed for the night. If it's an emergency (no heat, active leak) reply URGENT and our on-call tech will ring you. Otherwise reply with a good time and we'll call first thing."</li>
<li><strong>Weekends:</strong> "Hi from [Business]. We're back Monday at 8. Reply with your address and the problem, and we'll have a time ready for you when we open."</li>
</ul>

<h2>Stopping follow-ups at the right time</h2>
<p>The fastest way to annoy a customer is to keep texting after they have answered. A good setup:</p>
<ul>
<li>stops all automated messages the moment the customer replies;</li>
<li>honours STOP and UNSUBSCRIBE replies immediately;</li>
<li>only texts a number once per day, so repeat callers are not spammed;</li>
<li>never texts numbers on your existing customer "do not contact" list.</li>
</ul>

<h2>Cost compared with all-in-one tools</h2>
<p>All-in-one marketing platforms sold to contractors bundle missed-call text back with a monthly subscription. That can make sense if you use the whole platform. If you only need this one workflow, a custom n8n and Twilio build usually costs a one-off setup fee plus a few dollars a month in hosting and per-message charges. You also own it, so it keeps running if you change software.</p>

<div class="internal-link-card"><span class="ilc-label">Run your numbers</span><a class="ilc-title" href="/tools/automation-roi-calculator">Automation ROI calculator: see how fast a workflow pays back</a></div>

<h2>A simple ROI example</h2>
<p>Say you miss eight calls a week. If the text back keeps just one of those callers from ringing a competitor each week, and one in three of those becomes a job worth $400, that is roughly $530 a month in work you would otherwise have lost. Against a one-time setup and running costs of a few dollars a month, the payback is usually measured in weeks, not months. Use your own job value and close rate; the point is that the bar is low.</p>

<h2>Do it yourself or hire someone?</h2>
<p>If you are comfortable with APIs, n8n's visual editor makes this a weekend project. Most owners would rather not spend their weekend debugging webhooks, and the details (registration, opt-outs, after-hours logic, alerts that actually reach you) are what make it work reliably.</p>
<p>I build these workflows for contractors as part of my <a href="/services/n8n-automation">n8n automation service</a>, usually alongside a faster, call-first website. If you run a trade business, <a href="/redesign">see what I build for roofing, HVAC and plumbing companies</a>, or <a href="/contact">tell me how you handle calls today</a> and I will suggest the simplest setup that fits.</p>
`,
  },
  {
    slug: 'questions-to-ask-a-web-developer-before-hiring',
    title: '21 Questions to Ask a Web Developer Before Hiring (With Good Answers and Red Flags)',
    seoTitle: '21 Questions to Ask a Web Developer Before Hiring',
    seoDescription:
      'The questions that separate a reliable web developer from a risky one, with what a good answer sounds like and the red flags to walk away from.',
    excerpt:
      'Hiring a web developer is easy. Hiring the right one is mostly about asking the questions they would rather you did not. Here is the list I would use if I were on your side of the table.',
    date: '2026-11-20',
    readTime: 9,
    category: 'Hiring',
    tags: ['questions to ask a web developer before hiring', 'how to hire a web developer', 'web developer red flags', 'hire freelance web developer', 'who owns my website'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>I am a freelance web developer, so this list is written from the other side of the call. These are the questions that reveal how someone actually works, not just what their portfolio looks like. For each one you will find what a good answer sounds like and the red flag that should make you pause.</p>

<h2>Before you reach out</h2>
<p>Write down three things first: what the website must do (bookings, quote requests, sales), your budget range, and your deadline. A good developer will ask about all three. If you already know them, you will get faster, more honest quotes. If you are unsure about budget, the <a href="/tools/website-cost-calculator">website cost calculator</a> gives a realistic range in a minute.</p>

<h2>Portfolio and live sites</h2>
<ol>
<li><strong>Can I see three live sites you built, not just screenshots?</strong> Good: links you can click, on real domains. Red flag: only mockups, or sites that are offline.</li>
<li><strong>Which of these is closest to my project, and what did you do on it?</strong> Good: a specific answer about their part. Red flag: vague "we did everything" when they clearly used a template.</li>
<li><strong>Can I speak to, or read reviews from, a past client?</strong> Good: verified reviews on a platform like Upwork, or a reference. Red flag: no reviews anywhere you can check.</li>
</ol>

<h2>Process and timeline</h2>
<ol start="4">
<li><strong>What happens in the first week?</strong> Good: a discovery call, a sitemap, and a plan with dates. Red flag: "I'll just start building."</li>
<li><strong>How will I review progress?</strong> Good: a private staging link you can open on your phone. Red flag: screenshots only, until the end.</li>
<li><strong>How long will it take, and what would delay it?</strong> Good: a range, plus "waiting for content" named honestly as the usual delay. Red flag: an exact date with no caveats.</li>
<li><strong>Who will actually do the work?</strong> Good: a clear answer. Red flag: you meet one person and the work is quietly passed to someone else.</li>
</ol>

<h2>Pricing and changes</h2>
<ol start="8">
<li><strong>Is the quote fixed or hourly?</strong> Either can work, but you should know which and what is included.</li>
<li><strong>How are payments split?</strong> Good: a deposit and milestone or launch payment. Red flag: 100% upfront from someone you have never worked with.</li>
<li><strong>What counts as a change, and how is it priced?</strong> Good: a written rule, such as "new pages or features are quoted before work starts." Red flag: "we'll figure it out."</li>
<li><strong>What will this cost me every year after launch?</strong> Good: hosting, domain, premium plugins and maintenance listed. Red flag: the build price is the only number you ever hear.</li>
</ol>

<h2>Ownership: domain, hosting and code</h2>
<ol start="12">
<li><strong>Whose name will the domain be registered in?</strong> It should be yours. This is the single most important answer on the list.</li>
<li><strong>Who owns the hosting account and the code?</strong> Good: you do, with the developer added as a user. Red flag: "we host it for you" with no way to move it.</li>
<li><strong>Will I get all logins and a handover?</strong> Good: yes, plus a short walkthrough video. Red flag: hesitation.</li>
</ol>

<h2>SEO, speed and mobile</h2>
<ol start="15">
<li><strong>How will the site perform on a phone?</strong> Mobile is now most web traffic: about <a href="https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide" rel="noopener" target="_blank">60% worldwide according to StatCounter</a>. Good: they test on real devices and talk about load time.</li>
<li><strong>Why does speed matter for my business?</strong> Good: they can explain it in money. A Deloitte and Google study found a <a href="https://web.dev/case-studies/milliseconds-make-millions" rel="noopener" target="_blank">0.1-second faster mobile site lifted retail conversions by 8.4%</a>.</li>
<li><strong>What SEO is included?</strong> Good: titles, descriptions, headings, schema, sitemap, redirects from old URLs. Red flag: "SEO is a separate monthly package" with nothing on-page included.</li>
<li><strong>If you are replacing my current site, how do you protect my Google rankings?</strong> Good: a URL map and 301 redirects. Red flag: they have not heard of redirects.</li>
</ol>

<h2>Support after launch</h2>
<ol start="19">
<li><strong>What happens if something breaks a month later?</strong> Good: a stated support window and response time.</li>
<li><strong>Can my team edit text and images without you?</strong> Good: yes, and they will show you how. Red flag: every small edit needs a ticket.</li>
<li><strong>What is the one thing you would change about my current site?</strong> This shows whether they looked at it, and how they think.</li>
</ol>

<h2>Red flags worth walking away from</h2>
<ul>
<li>They want the domain registered in their name.</li>
<li>They cannot show live work.</li>
<li>They promise a fixed Google ranking or "page 1 guaranteed".</li>
<li>No written scope, or a scope that only says "website".</li>
<li>They go quiet for days during the sales process. It rarely improves after you pay.</li>
</ul>

<h2>Vetting a developer on Upwork</h2>
<p>Marketplaces add a useful layer of proof. Check the Job Success Score, read the written reviews rather than just the stars, look for repeat clients, and see whether past jobs resemble yours. Payment protection through the platform also lowers the risk of the deposit.</p>
<p>If you would like to put these questions to me, I am happy to answer every one of them on a call. You can also read <a href="/blog/freelancer-vs-agency-website">freelancer vs agency</a> if you are still deciding which route to take, or <a href="/contact">book a free 20-minute call</a>.</p>
`,
  },
  {
    slug: 'n8n-automation-for-small-business',
    title: 'n8n for Small Business: 9 Workflows That Save Real Hours Every Week',
    seoTitle: 'n8n for Small Business: 9 Workflows That Save Hours',
    seoDescription:
      'Nine n8n automations small businesses actually use (lead alerts, invoice reminders, review replies), with time saved and what each costs to set up.',
    excerpt:
      'Most n8n guides are written for developers. This one is for owners: nine workflows that remove the copy-and-paste from your week, what each one saves, and where to start.',
    date: '2026-11-19',
    readTime: 8,
    category: 'Automation',
    tags: ['n8n automation for small business', 'n8n workflow examples', 'small business automation ideas', 'automate invoice reminders', 'n8n quickbooks'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>n8n is a workflow automation tool. In plain terms, it watches for something to happen in one app and then does something in another, without anyone copying and pasting. It is popular with businesses because it can be self-hosted cheaply and has no per-task pricing on your own server. It is also growing fast: n8n raised a <a href="https://siliconangle.com/2025/10/09/nvidia-backs-180m-round-workflow-automation-startup-n8n/" rel="noopener" target="_blank">$180M Series C in October 2025</a>, so it is not going anywhere.</p>
<p>If you are new to it, start with <a href="/blog/what-is-n8n-automation">what n8n is</a> and <a href="/blog/n8n-vs-zapier-vs-make">how it compares with Zapier and Make</a>. Here are nine workflows I see pay off for small businesses.</p>

<h2>1. New lead alerts that reach you instantly</h2>
<p>When a website form, Facebook lead ad or email enquiry arrives, n8n sends the details to your phone (SMS, WhatsApp or Slack) and adds the lead to a sheet or CRM. <strong>Saves:</strong> the minutes between a lead arriving and someone noticing it, which is often the difference between winning and losing the job.</p>

<h2>2. Missed-call text back</h2>
<p>If you miss a call, the caller gets a polite text within seconds. This is the highest-return automation for any business that lives on the phone. I wrote a full guide: <a href="/blog/missed-call-text-back-for-contractors">missed-call text back for contractors</a>.</p>

<h2>3. Estimate follow-ups</h2>
<p>Quotes that nobody follows up on quietly die. n8n can send a friendly check-in two days after a quote goes out, and another a week later, stopping automatically when the customer replies or accepts. <strong>Saves:</strong> a weekly hour of chasing, and recovers jobs you forgot about.</p>

<h2>4. Invoice reminders</h2>
<p>Connected to QuickBooks or Xero, n8n can remind customers before and after a due date and alert you when an invoice is 14 days overdue. QuickBooks has a native n8n node, so this is one of the quickest workflows to build.</p>

<h2>5. Review requests and review monitoring</h2>
<p>When a job is marked complete, send a short review request with a direct link. When a new Google review lands, post it to your team chat so someone replies the same day. This matters: BrightLocal's 2026 survey found <a href="https://www.brightlocal.com/research/local-consumer-review-survey/" rel="noopener" target="_blank">97% of consumers read reviews, and 41% always do</a>.</p>

<h2>6. Booking confirmations and reminders</h2>
<p>Confirm the booking, send a reminder the day before, and a "we're on our way" text on the day. Fewer no-shows, fewer "what time are you coming?" calls.</p>

<h2>7. Weekly reporting without spreadsheets</h2>
<p>Every Monday, n8n can pull last week's leads, sales, ad spend and website enquiries into one email. You stop logging into five dashboards to answer one question: is the business on track?</p>

<h2>8. Document and email sorting</h2>
<p>Incoming invoices and receipts are saved to the right folder and logged. Supplier emails are labelled. With an AI step, n8n can summarise long emails or pull fields out of PDFs.</p>

<h2>9. Onboarding new customers</h2>
<p>When a deal is won: create the folder, send the welcome email and contract, add them to your project board, and schedule the kickoff. Every customer gets the same, complete start.</p>

<h2>Connecting your CRM</h2>
<p>n8n has hundreds of built-in integrations. Some tools popular with contractors, including Jobber, ServiceTitan and Housecall Pro, do not have a native n8n node and connect through their APIs instead (<a href="https://contractortoolstack.com/guides/chatgpt-automation-for-contractors/" rel="noopener" target="_blank">ContractorToolStack</a>). That is normal, but it adds setup time, so ask about it before you commit to a tool.</p>

<h2>What it costs to run</h2>
<ul>
<li><strong>Self-hosted:</strong> a small server for a few dollars to around $20 a month runs most small-business workloads.</li>
<li><strong>n8n Cloud:</strong> a monthly plan if you would rather not manage a server.</li>
<li><strong>Setup:</strong> a single workflow is usually a small fixed-price job; a set of five to ten connected workflows is a bigger project. My <a href="/pricing">pricing page</a> lists current rates.</li>
</ul>

<div class="internal-link-card"><span class="ilc-label">Free tool</span><a class="ilc-title" href="/tools/automation-roi-calculator">Estimate the hours and money a workflow would save you</a></div>

<h2>Where to start</h2>
<p>Pick the task you do most often that follows the same steps every time. Lead alerts and missed-call text back are the usual winners because they protect revenue, not just time. Build one, run it for a month, then add the next.</p>
<p>I set up and maintain n8n for small businesses. See the <a href="/services/n8n-automation">n8n automation service</a> or <a href="/contact">tell me what eats your week</a>, and I will tell you which workflow to build first.</p>
`,
  },
  {
    slug: 'roofing-website-design',
    title: 'Roofing Website Design: What Actually Turns Visitors Into Inspection Requests',
    seoTitle: 'Roofing Website Design: What Actually Gets Leads',
    seoDescription:
      'What a roofing website needs to turn visitors into inspection requests: layout, city pages, reviews, speed and cost, with real before-and-after examples.',
    excerpt:
      'A roofing website has one job: get a worried homeowner to call or book an inspection. Here is the structure that does that, from the first screen to the city pages that bring in local searches.',
    date: '2026-11-18',
    readTime: 8,
    category: 'Trades',
    tags: ['roofing website design', 'roofing company website', 'roofing lead generation website', 'roofer website cost', 'roofing website examples'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>Homeowners do not browse roofing websites for fun. They arrive worried: a leak after a storm, missing tiles, an insurance claim, or a sale that needs a roof report. Your website has a few seconds to prove you are local, trustworthy and easy to reach. Everything below serves that.</p>

<h2>What homeowners check first</h2>
<ul>
<li><strong>Do you work in my area?</strong> Name your towns or counties in the first screen.</li>
<li><strong>Can I reach you now?</strong> A visible phone number and a "Book a free inspection" button.</li>
<li><strong>Are you any good?</strong> Real job photos and reviews, not stock images of smiling roofers.</li>
<li><strong>Are you legitimate?</strong> Licence, insurance, warranties and trade memberships.</li>
</ul>
<p>Reviews deserve extra weight: BrightLocal's 2026 survey found <a href="https://www.brightlocal.com/research/local-consumer-review-survey/" rel="noopener" target="_blank">97% of consumers read reviews</a>, and a growing share now also ask AI assistants for local recommendations.</p>

<h2>Click-to-call and a quote path above the fold</h2>
<p>Most of your visitors are on a phone. Put a tap-to-call button and a short quote form in the first screen on mobile, and keep a sticky call bar as they scroll. The form should ask only what you need to call back: name, phone, postcode or ZIP, and the problem. Every extra field loses people.</p>

<h2>City and service pages that rank locally</h2>
<p>"Roof repair" is too broad to rank for. "Roof repair in [your town]" is winnable. The structure that works is a page for each core service (repairs, replacement, flat roofs, gutters, storm damage) and a page for each main area you cover, linked together. Each page needs unique, useful content: local job photos, the problems common in that area, and reviews from customers there. Thin copy-and-paste pages with the town name swapped do not rank for long.</p>

<h2>Project photos and reviews, organised</h2>
<p>A gallery sorted by job type (slate, tile, flat roof, repairs) does more selling than any paragraph. On the <a href="/work/erbs-ltd">ERBS Ltd roofing site</a> I rebuilt, real project photos now appear across the service pages and in a categorised gallery, so a homeowner comparing local roofers sees finished work, not placeholders.</p>

<h2>Storm damage and insurance pages</h2>
<p>After a storm, searches for emergency repairs spike. A dedicated page explaining what to do after storm damage, how you work with insurers, and how fast you can attend captures that demand and builds trust when it matters most.</p>

<h2>Speed on a phone</h2>
<p>A slow site loses impatient visitors before they see your number. In a Deloitte and Google study, <a href="https://web.dev/case-studies/milliseconds-make-millions" rel="noopener" target="_blank">a 0.1-second faster mobile site lifted conversions by up to 8.4%</a>. Compress your photos, avoid heavy sliders, and test the site on mobile data, not office Wi-Fi.</p>

<h2>Tracking leads back to jobs</h2>
<p>Know which pages and searches produce calls. Call tracking, form tracking and a simple monthly report tell you whether the website is paying for itself. Pair it with a <a href="/blog/missed-call-text-back-for-contractors">missed-call text back</a> so calls you cannot answer still become jobs.</p>

<h2>What a roofing website costs</h2>
<p>A solid small roofing site with service and area pages usually sits in the low thousands; larger multi-location builds cost more. The <a href="/tools/website-cost-calculator">website cost calculator</a> gives a range for your scope, and my <a href="/pricing">pricing</a> is published.</p>

<h2>A quick checklist</h2>
<ul>
<li>Phone number and inspection button in the first mobile screen</li>
<li>Service areas named on the homepage</li>
<li>One page per core service and per main town</li>
<li>Real job photos, sorted by type</li>
<li>Reviews near every call to action</li>
<li>Licence, insurance and warranty details</li>
<li>Fast on mobile data</li>
<li>Call and form tracking</li>
</ul>
<p>I build websites for roofing and other trade businesses. <a href="/redesign">See what I offer roofers, HVAC and plumbing companies</a>, including a free homepage concept, or browse <a href="/work">case studies</a>.</p>
`,
  },
  {
    slug: 'hvac-website-design-features',
    title: 'HVAC Website Design: 12 Features That Make the Phone Ring',
    seoTitle: 'HVAC Website Design: 12 Features That Book Calls',
    seoDescription:
      'The 12 features that make HVAC websites ring: sticky call bar, 24/7 messaging, financing, service-area pages and more. Checklist and examples.',
    excerpt:
      'An HVAC website is visited by two kinds of people: someone with no heat right now, and someone planning a replacement. These twelve features serve both.',
    date: '2026-11-17',
    readTime: 7,
    category: 'Trades',
    tags: ['hvac website design', 'hvac website features', 'hvac lead generation', 'hvac website cost', 'hvac website examples'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>HVAC customers arrive in two moods. One has no heat or no cooling and wants someone today. The other is comparing quotes for a new system and wants to trust you before spending thousands. A good HVAC website serves both without making either hunt.</p>

<h2>1. An emergency-first mobile layout</h2>
<p>Most urgent visitors are on a phone, and mobile is about <a href="https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide" rel="noopener" target="_blank">60% of web traffic worldwide</a>. The first screen should say what you fix, where, and how to reach you now.</p>

<h2>2. A sticky call bar</h2>
<p>A bar that stays at the bottom of the screen with "Call now" and "Book service" buttons. It is the single most effective change on most trade sites.</p>

<h2>3. Clear response times and 24/7 messaging</h2>
<p>If you offer emergency service, say so and say how fast. If you do not, say when you will call back. Speed is where HVAC firms lose leads: Hatch found <a href="https://usehatchapp.com/blog/speed-to-lead" rel="noopener" target="_blank">88% of HVAC contractors take longer than five minutes to respond</a>.</p>

<h2>4. Separate pages for each service</h2>
<p>Furnace repair, AC repair, heat pumps, boiler service, duct cleaning and installation each deserve a page. They rank separately and answer different questions.</p>

<h2>5. Service-area pages</h2>
<p>A page for each main town you serve, with local jobs and reviews, helps you appear for "AC repair near me" style searches.</p>

<h2>6. Financing</h2>
<p>A new system is a big purchase. A financing page with monthly examples and a quick pre-qualification link turns "too expensive" into "affordable".</p>

<h2>7. Maintenance plans</h2>
<p>Annual plans create recurring revenue. Give them their own page with what is included, the price, and a sign-up button.</p>

<h2>8. Trust signals</h2>
<p>Licences, certifications, manufacturer partnerships, warranties and real technician photos. Put reviews next to every call to action.</p>

<h2>9. Online booking</h2>
<p>Some customers will never call. Let them pick a time slot, or at least request one, from the site.</p>

<h2>10. Seasonal landing pages</h2>
<p>Pre-winter furnace tune-ups and pre-summer AC checks are predictable demand. Seasonal pages and offers capture it.</p>

<h2>11. Call and form tracking</h2>
<p>Know which pages and searches produce booked jobs, so you spend on what works.</p>

<h2>12. Fast load times</h2>
<p>Compress images, drop heavy sliders, and test on mobile data. Faster sites convert better; <a href="https://web.dev/case-studies/milliseconds-make-millions" rel="noopener" target="_blank">Deloitte and Google measured up to 8.4% more conversions from a 0.1-second improvement</a>.</p>

<h2>Beyond the website</h2>
<p>The website gets the enquiry; automation makes sure nobody waits. A <a href="/blog/missed-call-text-back-for-contractors">missed-call text back</a> and instant lead alerts close the five-minute gap.</p>

<h2>Cost</h2>
<p>Use the <a href="/tools/website-cost-calculator">website cost calculator</a> for a range, or see my <a href="/pricing">published prices</a>. I build HVAC and other trade websites with all twelve of these features. <a href="/redesign">See the trade website offer</a> or <a href="/contact">ask me about your site</a>.</p>
`,
  },
  {
    slug: 'signs-you-need-a-website-redesign',
    title: '10 Signs Your Website Needs a Redesign: A 15-Minute Self-Audit',
    seoTitle: '10 Signs Your Website Needs a Redesign (Self-Audit)',
    seoDescription:
      'Run this 15-minute self-audit to tell whether your site needs a quick refresh or a full redesign, and what each typically costs in 2026.',
    excerpt:
      'Not every tired website needs rebuilding. This self-audit uses free tools to show whether a refresh will do, or whether it is time to start again.',
    date: '2026-11-16',
    readTime: 7,
    category: 'Strategy',
    tags: ['signs you need a website redesign', 'website redesign cost', 'when to redesign a website', 'refresh vs redesign', 'website redesign checklist'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>A redesign is a big decision, and plenty of sites only need a refresh: new photos, clearer copy, faster images. Others are costing their owners enquiries every week. Run these ten checks, using free tools, and count how many apply.</p>

<h2>1. It is awkward on a phone</h2>
<p>Open your site on your own phone. Can you find the phone number and main service in five seconds? Tap targets big enough? About <a href="https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide" rel="noopener" target="_blank">60% of web traffic is mobile</a>, so this check matters most.</p>

<h2>2. It is slow</h2>
<p>Run your homepage through <a href="https://pagespeed.web.dev/" rel="noopener" target="_blank">PageSpeed Insights</a> and look at the mobile result. Speed affects sales directly: <a href="https://web.dev/case-studies/milliseconds-make-millions" rel="noopener" target="_blank">a 0.1-second improvement lifted retail conversions by 8.4%</a> in a Deloitte and Google study.</p>

<h2>3. Traffic arrives but enquiries do not</h2>
<p>If analytics show visitors but your inbox is quiet, the problem is usually the page, not the marketing: an unclear offer, a buried call to action, or a long form. See <a href="/blog/why-your-website-is-losing-you-clients">why websites lose clients</a>.</p>

<h2>4. You cannot edit it yourself</h2>
<p>If changing a price or adding a photo needs a developer, you will stop updating it, and an out-of-date site quietly loses trust.</p>

<h2>5. The information is out of date</h2>
<p>Old services, old team, old prices, a 2019 copyright line. Visitors notice.</p>

<h2>6. It looks like it was built a decade ago</h2>
<p>Design is not vanity. People judge credibility in seconds, and a dated site makes you look smaller or less careful than you are.</p>

<h2>7. Google Search Console shows problems</h2>
<p>Open <a href="https://search.google.com/search-console" rel="noopener" target="_blank">Search Console</a> and check the Pages and Core Web Vitals reports. Lots of unindexed pages, or "poor" mobile URLs, point to structural issues.</p>

<h2>8. It does not appear in AI answers</h2>
<p>More people now ask AI assistants for recommendations; BrightLocal found <a href="https://www.brightlocal.com/research/local-consumer-review-survey/" rel="noopener" target="_blank">about 45% use ChatGPT or similar tools for local recommendations</a>. Clear service pages, structured data and real reviews help you get mentioned.</p>

<h2>9. Your business has changed</h2>
<p>New services, a new market, a new price point. If the site describes the business you were, it is selling the wrong thing.</p>

<h2>10. It is held together by plugins</h2>
<p>Dozens of plugins, an abandoned theme, and update warnings you are afraid to click. That is a security and stability risk, not just a design one.</p>

<h2>Refresh or redesign?</h2>
<ul>
<li><strong>1 to 3 signs:</strong> a refresh. Update content, compress images, fix the call to action and mobile layout.</li>
<li><strong>4 to 6 signs:</strong> a partial rebuild of key pages, or a new theme on the existing content.</li>
<li><strong>7 or more:</strong> a full redesign is usually cheaper than patching.</li>
</ul>

<h2>What a redesign costs</h2>
<p>Small-business redesigns commonly run from a few thousand dollars up to around <a href="https://www.markstudios.com/blog/website-redesign-cost" rel="noopener" target="_blank">$5k to $15k at agencies</a>, depending on pages, features and content. A freelancer is often less. Get a range for your scope with the <a href="/tools/website-cost-calculator">website cost calculator</a>.</p>

<h2>Protect your rankings</h2>
<p>A redesign should never cost you Google traffic. Map every old URL to a new one with 301 redirects, keep the content that ranks, and resubmit your sitemap on launch day.</p>
<p>I redesign websites for small businesses and trades, with redirects and SEO handled. <a href="/redesign">See the redesign offer</a>, including a free homepage concept, or <a href="/contact">send me your URL</a> for an honest opinion.</p>
`,
  },
  {
    slug: 'figma-to-elementor',
    title: 'Figma to Elementor: Plugins vs a Manual Build, and What Each Really Costs',
    seoTitle: 'Figma to Elementor: Plugins vs Manual Build (2026)',
    seoDescription:
      'Can you convert Figma to Elementor automatically? What plugins get right and wrong, how a manual rebuild works, and realistic costs per page.',
    excerpt:
      'Figma-to-Elementor plugins promise one-click conversion. They help, but they do not finish the job. Here is what they get right, what they miss, and how a clean manual build works.',
    date: '2026-11-15',
    readTime: 7,
    category: 'Web Development',
    tags: ['figma to elementor', 'figma to wordpress', 'convert figma to wordpress', 'figma to elementor plugin', 'pixel perfect elementor'],
    coverGradient: 'from-[#9FC7B8] to-[#161C1A]',
    content: `
<p>You have a finished Figma design and a WordPress site that needs to look exactly like it. Elementor is a natural fit because your team can edit pages visually afterwards. The question is whether to use a converter plugin or have the design rebuilt by hand.</p>

<h2>Can you import Figma into Elementor directly?</h2>
<p>Partly. Several plugins and services read a Figma frame and generate Elementor sections. Independent comparisons put their output at <a href="https://figmentor.io/blog/convert-figma-to-wordpress-pro-methods-compared/" rel="noopener" target="_blank">roughly 60 to 70% of a finished page</a>. The rest, which is responsive behaviour, global styles, clean structure and interactions, still needs a developer.</p>

<h2>Prepare the Figma file first</h2>
<p>Whichever route you take, a tidy file saves time and money:</p>
<ul>
<li>Use Auto Layout so spacing is consistent and translates to containers.</li>
<li>Define colour and text styles, not one-off values.</li>
<li>Design at least desktop and mobile frames; tablet if layouts differ.</li>
<li>Name layers and turn repeated pieces into components.</li>
<li>Export images at the right size, or mark them for export.</li>
</ul>

<h2>What converter plugins get right and wrong</h2>
<p><strong>Right:</strong> basic layout, text, images and colours land quickly, which is useful for simple landing pages.</p>
<p><strong>Wrong:</strong> deeply nested containers that slow the page, fixed pixel sizes that break on phones, duplicated styles instead of global ones, and no thought for accessibility or SEO headings.</p>

<h2>How a manual rebuild works</h2>
<ol>
<li>Set up global colours, fonts and spacing in Elementor's site settings, matching the Figma styles.</li>
<li>Build reusable templates for the header, footer and repeated sections.</li>
<li>Rebuild each page with Flexbox containers, mirroring Figma's Auto Layout.</li>
<li>Set responsive behaviour for each breakpoint and check on real devices.</li>
<li>Add interactions, forms and dynamic content.</li>
<li>Optimise images and test speed.</li>
</ol>
<p>The result looks the same as the design, and stays easy for your team to edit.</p>

<h2>Responsive design and global styles</h2>
<p>This is where most conversions fall apart. A design that is pixel-perfect at 1440px and broken at 390px is not finished. Global styles matter too: when brand colours change next year, you want one setting to update, not 200 widgets.</p>

<h2>Speed after the build</h2>
<p>Elementor can be fast if it is built lean: a light theme such as Hello, few add-ons, and optimised images. Elementor's own <a href="https://elementor.com/help/speed-up-a-slow-site/" rel="noopener" target="_blank">speed guidance</a> covers the basics. Speed is worth the effort: <a href="https://web.dev/case-studies/milliseconds-make-millions" rel="noopener" target="_blank">Deloitte and Google found 0.1 seconds faster meant up to 8.4% more conversions</a>.</p>

<h2>Cost per page</h2>
<p>Conversion vendors commonly advertise <a href="https://www.xhtmlteam.com/blog/figma-to-elementor-conversion-for-just-99-per-page/" rel="noopener" target="_blank">around $99 to $199 per page</a> for standard pages. Complex pages with custom interactions, forms or dynamic content cost more. A full site is usually quoted as a project rather than per page.</p>

<h2>Which should you choose?</h2>
<ul>
<li><strong>Plugin:</strong> a simple one-off landing page, where speed matters more than polish.</li>
<li><strong>Manual build:</strong> a full site, a brand you care about, or a team that will edit it for years.</li>
</ul>
<p>I build Figma designs in Elementor and in custom themes, and clients have called the results pixel-perfect. See the <a href="/services/figma-to-web">Figma to WordPress service</a> and the <a href="/work/novara-md">Novara MD case study</a>, or <a href="/contact">send me your Figma file</a> for a fixed quote.</p>
`,
  },
];
