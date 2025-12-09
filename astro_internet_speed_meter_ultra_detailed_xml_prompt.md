<?xml version="1.0" encoding="utf-8"?>
<PromptPackage>
  <Meta>
    <Title>Ultra-detailed Prompt: Internet Speed Meter Website (Futuristic, Vibrant, SEO-First)</Title>
    <Author>Generated for user</Author>
    <Date>2025-12-09</Date>
    <Version>1.0</Version>
    <Purpose>Provide an exhaustive specification and generation prompt (for AI code & design tools) to produce a production-ready website that measures internet speed with a futuristic, vibrant visual identity and best-in-class SEO, performance, and accessibility.</Purpose>
    <Notes>
      Use this XML as an input to code-generation tools, designers, or as a spec for engineers. Be explicit where human review is required (legal, privacy, production SS/hosting credentials).
    </Notes>
  </Meta>

  <Goals>
    <Primary>Build a lightweight, accurate, and mobile-first internet speed meter web app using Astro as the framework.</Primary>
    <Secondary>Deliver a futuristic neon-vibrant UI, immersive micro-interactions, and VR-inspired visuals while optimizing for top SEO and excellent Lighthouse (performance, accessibility, best practices, SEO) scores.</Secondary>
    <KPIs>
      <KPI name="LighthousePerformance">>= 90</KPI>
      <KPI name="LighthouseAccessibility">>= 90</KPI>
      <KPI name="LighthouseSEO">>= 90</KPI>
      <KPI name="TimeToInteractive"><= 2.5s (mobile, 3G simulated)</KPI>
      <KPI name="LargestContentfulPaint"><= 2.5s</KPI>
      <KPI name="TotalPageSize"><= 500KB (initial HTML/CSS/critical assets)</KPI>
    </KPIs>
  </Goals>

  <TargetAudience>
    <Audience>General internet users on desktop & mobile</Audience>
    <TechnicalUsers>Network engineers and curious power users (advanced mode available)</TechnicalUsers>
    <Regions>Global (multi-language ready)</Regions>
  </TargetAudience>

  <TechnicalStack>
    <Framework>Astro (islands architecture)</Framework>
    <AstroVersion>latest-stable (specify in generation)</AstroVersion>
    <UI>TailwindCSS (optional: Tailwind + UnoCSS compatibility)</UI>
    <Animations>Framer Motion, Lottie for vector animations</Animations>
    <Visuals>Three.js or Spline (for optional 3D / VR-like backgrounds); WebGL canvas for real-time visualizer</Visuals>
    <DataLayer>Edge functions (Cloudflare Workers, Vercel Edge Functions) for server-side measurement orchestration</DataLayer>
    <APIs>WebRTC / WebSocket / XHR for throughput tests; optional integration with Measurement Lab (M-Lab) or Ookla (if commercial license acquired)</APIs>
    <Analytics>GA4 (with consent) + server-side analytics endpoint</Analytics>
    <CI/CD>GitHub Actions or Vercel/GitHub deployment</CI/CD>
    <SEO>SSR / pre-rendered pages, sitemap.xml, robots.txt</SEO>
    <PWA>Service Worker, manifest.json for installability</PWA>
  </TechnicalStack>

  <Pages>
    <Home>
      <Purpose>Primary entry: run quick speed check and show immediate results + curated advice</Purpose>
      <Hero>Large animated speed meter, ping/download/upload numbers, server selector</Hero>
      <CTAs>Run Test, Advanced Mode, History, Share Results</CTAs>
    </Home>
    <Results>
      <Purpose>Detailed numerical results, graphs, comparative benchmarks, suggestions</Purpose>
      <Elements>Download, Upload, Ping (RTT), Jitter, Packet Loss (optional), IP & ASN lookup</Elements>
    </Results>
    <History>
      <Purpose>Store local test history (IndexedDB) and optional user account sync (opt-in)</Purpose>
    </History>
    <Settings>
      <Purpose>Server selection, units (Mbps/MBps), privacy toggles, theme toggles</Purpose>
    </Settings>
    <Blog>
      <Purpose>SEO content: network tips, tutorials, updates, guides</Purpose>
    </Blog>
    <About_Privacy>
      <Purpose>Privacy policy, legal, measurement disclaimers (must be explicit)</Purpose>
    </About_Privacy>
  </Pages>

  <Components>
    <SpeedTestCore>
      <Description>Web worker / dedicated island performing timing & transfer tests using multiple concurrent connections to measure throughput accurately across browsers.</Description>
      <Requirements>
        <Req>Implement multi-connection parallel downloads/uploads using range requests or blobs.</Req>
        <Req>Use progressive chunk sizes and measure bytes/time to calculate Mbps.</Req>
        <Req>Provide fallbacks for browsers without certain APIs (WebRTC fallback to XHR).</Req>
        <Req>Run in a Web Worker to keep UI responsive.</Req>
      </Requirements>
    </SpeedTestCore>

    <PingTest>
      <Description>Accurate RTT measurement using small headerless pings via fetch + Timing API; use WebSocket ping for more reliability when allowed.</Description>
    </PingTest>

    <Visualizer>
      <Type>SVG + Canvas hybrid for neon gauges and waveform graphs</Type>
      <Features>Animated needle, gradient trails, particle burst on test completion</Features>
    </Visualizer>

    <ServerSelector>
      <Description>Geolocated nearest servers, fallback list, manual server selection, latency-sorted.</Description>
    </ServerSelector>

    <ResultsCard>
      <Elements>Numeric tiles, sparkline graphs, share card (OG image generator)</Elements>
    </ResultsCard>

    <SEOComponents>
      <StructuredData>JSON-LD generator for WebSite, WebPage, SoftwareApplication, BreadcrumbList</StructuredData>
    </SEOComponents>
  </Components>

  <Design>
    <VisualIdentity>Futuristic, neon, vibrant, VR-inspired. Aim for high-contrast, accessible neon-on-dark surfaces with glassmorphism panels.</VisualIdentity>
    <ColorPalette>
      <Primary>#00FFE1</Primary>
      <Secondary>#7B61FF</Secondary>
      <Accent1>#FF2D95</Accent1>
      <Accent2>#00FFA3</Accent2>
      <BGGradient>linear-gradient(180deg,#05031A 0%,#0B0A1F 100%)</BGGradient>
      <NeonGlow>use layered box-shadows and additive blending for glow</NeonGlow>
    </ColorPalette>
    <Typography>
      <PrimaryFont>Inter (variable)</PrimaryFont>
      <DisplayFont>Orbitron or Exo 2 for sci-fi headings</DisplayFont>
      <Fallbacks>system-ui, -apple-system, 'Segoe UI', Roboto</Fallbacks>
    </Typography>
    <Spacing>8pt modular scale; responsive tokens for mobile/tablet/desktop</Spacing>
    <Motion>
      <Guidelines>Use subtle 3D transforms, motion-safe reduced-motion preferences, Lottie for micro-animations</Guidelines>
    </Motion>
    <Accessibility>
      <Contrast>WCAG AA minimum for normal text, AAA for large headings where possible</Contrast>
      <Keyboard>All interactive elements must be fully keyboard operable</Keyboard>
      <Aria>Provide ARIA roles & live regions for test progress/results</Aria>
    </Accessibility>
  </Design>

  <SEO_Strategy>
    <OnPage>
      <SemanticHTML>Use header tags (h1..h3) correctly, main, nav, footer landmarks</SemanticHTML>
      <MetaTags>
        <TitleTemplate>"{result} — Internet Speed Test | BrandName"</TitleTemplate>
        <Description>Concise summary including primary keywords: "internet speed test, broadband speed, ping, download upload"</Description>
      </MetaTags>
      <Canonical>Each route must have rel=canonical</Canonical>
      <OpenGraph>Title, description, image (dynamic OG image for shareable results)</OpenGraph>
      <TwitterCard>summary_large_image</TwitterCard>
      <StructuredData>JSON-LD for breadcrumbs, SoftwareApplication, WebSite</StructuredData>
    </OnPage>

    <Content>
      <BlogPlan>Weekly technical blog posts about speed optimization, ISP comparisons, how-to guides targeting long-tail keywords</BlogPlan>
      <KeywordFocus>Seed terms + long tail: "internet speed test mobile", "check wifi speed", "is 50 Mbps good"</KeywordFocus>
    </Content>

    <TechnicalSEO>
      <Sitemap>Auto-generated sitemap.xml on build</Sitemap>
      <Robots>Well-crafted robots.txt; server directives for crawl budget</Robots>
      <Performance>Preload fonts, critical CSS inline, defer non-critical JS</Performance>
      <MobileFirst>Responsive design + mobile-first indexing optimizations</MobileFirst>
      <Localization>hreflang tags for multi-language</Localization>
    </TechnicalSEO>
  </SEO_Strategy>

  <PerformanceOptimizations>
    <Assets>
      <Imagemin>Optimize raster images and provide AVIF/WebP where supported</Imagemin>
      <SVG>Use optimized inline SVG for icons and visualizers</SVG>
      <Fonts>Variable fonts w/ font-display:swap; subset for critical glyphs</Fonts>
    </Assets>
    <Network>
      <CDN>Host static assets on CDN (Cloudflare, Vercel)</CDN>
      <HTTP2>Enable HTTP/2 or HTTP/3</HTTP2>
      <Caching>Edge caching + immutable cache for hashed assets</Caching>
    </Network>
    <Code>
      <Splitting>Astro islands: hydrate only interactive components</Splitting>
      <Minify>Minify HTML/CSS/JS; tree-shake dependencies</Minify>
      <CriticalCSS>Inline critical styles for fastest paint</CriticalCSS>
    </Code>
  </PerformanceOptimizations>

  <Privacy_Security>
    <Consent>GDPR/CCPA cookie consent; opt-in for analytics & optional server-side logging</Consent>
    <DataRetention>Store only aggregated, anonymized metrics by default; explicit opt-in for persistent user accounts</DataRetention>
    <HTTPS>Strict HTTPS & HSTS</HTTPS>
    <CSP>Content Security Policy recommendations</CSP>
    <RateLimiting>Edge rate limits for test endpoints to prevent abuse</RateLimiting>
  </Privacy_Security>

  <Measurement_Methods>
    <Summary>Detailed algorithmic steps for download/upload/ping measurement suitable for cross-browser deployment.</Summary>
    <Algorithm>
      <Phase name="Warmup">Initiate small transfers to estimate baseline RTT</Phase>
      <Phase name="Download">Open N parallel connections; fetch large blobs with progressive chunk sizes; measure byte/time, exclude ramp-up outliers; compute median throughput across intervals</Phase>
      <Phase name="Upload">POST chunked blobs to test endpoint; similar measurement strategy</Phase>
      <Phase name="Ping">Multiple tiny requests with high-resolution timers; use Navigation Timing and Performance API</Phase>
      <EdgeCases>
        <EC>Mobile networks with captive portals — detect & notify user</EC>
        <EC>Background throttling in mobile browsers — warn about possible under-reporting</EC>
      </EdgeCases>
    </Algorithm>
    <ServerRequirements>
      <Req>Support range requests and CORS headers</Req>
      <Req>Fast ephemeral endpoints for upload reception (can be serverless)</Req>
      <Req>Optionally mirror test files across multiple regions for accurate geo-testing</Req>
    </ServerRequirements>
  </Measurement_Methods>

  <APIs_And_Integrations>
    <ExternalServices>
      <Service name="M-Lab">Optional: import M-Lab datasets for benchmarking (ensure attribution & terms)</Service>
      <Service name="Ookla">Optional commercial integration (license required)</Service>
    </ExternalServices>
    <InternalAPI>
      <Endpoint>/api/test/download (POST/GET)</Endpoint>
      <Endpoint>/api/test/upload (POST)</Endpoint>
      <Endpoint>/api/servers (GET)</Endpoint>
    </InternalAPI>
  </APIs_And_Integrations>

  <DevGuidelines>
    <ProjectStructure>
      <Root>/src/pages (Astro pages)</Root>
      <Components>/src/components</Components>
      <Islands>/src/islands</Islands>
      <Styles>/src/styles</Styles>
      <Workers>/src/workers</Workers>
      <Server>/src/server (edge functions)</Server>
    </ProjectStructure>

    <CodingStandards>
      <Linting>ESLint + Prettier</Linting>
      <TypeChecking>TypeScript for interactive islands & web workers</TypeChecking>
      <Testing>Unit tests for core measurement logic; E2E tests (Playwright)</Testing>
    </CodingStandards>

    <CI_CD>
      <Build>Run Lighthouse CI in GitHub Actions to enforce thresholds</Build>
      <Deploy>Deploy to Vercel or Cloudflare Pages with environment variables securely stored</Deploy>
    </CI_CD>
  </DevGuidelines>

  <Deliverables>
    <List>
      <Item>Full Astro project scaffold with islands & essential components</Item>
      <Item>Speed measurement worker & test server endpoints</Item>
      <Item>Responsive futuristic UI (desktop & mobile)</Item>
      <Item>SEO-ready pages, sitemap, robots.txt, JSON-LD</Item>
      <Item>Test coverage for measurement logic + Lighthouse reports</Item>
      <Item>Deployment config & CI workflow</Item>
      <Item>Optional: OG image generator for shareable results</Item>
    </List>
  </Deliverables>

  <AcceptanceCriteria>
    <Criterion>Lighthouse scores meet KPIs</Criterion>
    <Criterion>Measurement results are within acceptable variance vs reference server (document test harness)</Criterion>
    <Criterion>Accessibility audit passes core WCAG checks</Criterion>
    <Criterion>SEO: pages indexed and rich snippets available</Criterion>
  </AcceptanceCriteria>

  <Generator_Prompts>
    <CodeGenerator>
      <Instruction>Generate a complete Astro project scaffold (TypeScript) that implements the above components and pages. Prioritize islands architecture so only interactive parts hydrate. Provide developer setup steps, env examples, and local test server for measurement endpoints. Include unit tests for the measurement worker.</Instruction>
      <Constraints>Do not include any commercial third-party SDKs requiring paid license in the base scaffold. Add clear TODOs where license-based integrations (Ookla) would be installed.</Constraints>
    </CodeGenerator>

    <DesignGenerator>
      <Instruction>Produce high-fidelity UI assets: SVG components for neon gauge, Lottie JSON for small animations, and a 1600x900 hero background PNG/AVIF for open graph images. Provide color variables and Tailwind config snippet.</Instruction>
    </DesignGenerator>

    <ImageGenerator>
      <Instruction>Generate 4 hero variations in a futuristic VR style: neon circuit grid, holographic globe, speed needle over a city skyline, and abstract waveform. Output assets in multiple aspect ratios and include transparent PNG/AVIF and web-optimized versions.</Instruction>
    </ImageGenerator>
  </Generator_Prompts>

  <Examples>
    <ExampleKeywords>internet speed test, broadband speed test, wifi speed, check my speed online</ExampleKeywords>
    <ExampleMeta>
      <Title>"Check Your Internet Speed — UltraFast Meter"</Title>
      <Description>"Run a free, fast internet speed test. Measure ping, download & upload speeds with a futuristic visualizer. No installs, privacy-first."</Description>
    </ExampleMeta>
  </Examples>

  <Appendix>
    <LegalNotes>Ensure compliance with measurement provider terms; include clear privacy disclosures and consent UI.</LegalNotes>
    <HumanReview>Require security review for endpoints and legal review for privacy policy before production launch.</HumanReview>
    <ChangeLog>Keep a changelog for measurement algorithm updates.</ChangeLog>
  </Appendix>
</PromptPackage>

