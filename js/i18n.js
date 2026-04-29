/*
 * Copyright 2026, gematik GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * *******
 *
 * For additional notes and disclaimer from gematik and in case of changes
 * by gematik, find details in the "Readme" file.
 */

/**
 * Internationalization (EN/DE) for gematik Developer Portal
 */
(function () {
  'use strict';

  const translations = {
    en: {
      // Navbar
      'nav.gettingStarted': 'Getting Started',
      'nav.features': 'Features',
      'nav.resources': 'Resources',
      'nav.community': 'Community',

      // Hero
      'hero.badge': 'Developer Portal — Pilot',
      'hero.title': 'Building the future of the<br><span class="hero__title--highlight">TI developer experience.</span>',
      'hero.subtitle': 'Welcome to the gematik Developer Portal pilot. Currently featuring the VSDM 2.0 API, this portal gives you interactive documentation, a mock server, contract testing, and code generation — everything you need to integrate with the Telematikinfrastruktur. The future of this portal depends on your feedback.',
      'hero.stat1': 'VSDM2 — Pilot Phase',
      'hero.stat2': 'Quality Gate',
      'hero.stat3': 'GitHub-Based Tools',
      'hero.pilot': 'Pilot',

      // Feature card CTAs
      'feat.ct.cta.card': 'Learn more',
      'feat.ops.cta.card': 'Learn more',

      // Getting Started
      'gs.badge': 'Getting Started',
      'gs.title': 'How to use the Developer Portal',
      'gs.subtitle': 'This pilot currently features the VSDM 2.0 API. More APIs will be added based on your feedback. Here\'s how to get the most out of each tool.',
      'gs.card1.title': 'Explore the API Portal',
      'gs.card1.text': 'The API Portal contains all API descriptions generated and validated by our toolchain. Currently it features the VSDM 2.0 pilot project. The portal provides:',
      'gs.card1.list': '<li>A <strong>SwaggerHub Auto Mocking Server</strong> that simulates VSDM2 API responses</li><li>Server environments for REF, TU and PU (currently listed as reference only)</li><li><strong>Code samples</strong> in Java, C#, Go, JavaScript, PHP, Python, Scala, Swift and more</li><li>Multiple <strong>example responses</strong> for each endpoint</li>',
      'gs.card1.text2': 'The code generator has been tested for Java, C# and TypeScript. You can also integrate the <a href="https://github.com/OpenAPITools/openapi-generator" target="_blank" rel="noopener">openapi-generator</a> into your own codebase to generate HTTP clients and model classes. This reduces manual implementation effort on the client side and ensures consistent API usage. If you experience issues or would like us to test additional languages, please let us know!',
      'gs.card2.title': 'Download OpenAPI Specifications',
      'gs.card2.text': 'Every time a new VSDM2 FHIR specification is published, our CI/CD pipeline automatically generates an updated OpenAPI specification. Two variants are available:',
      'gs.card2.v1.title': 'VSDM2 with ZETA',
      'gs.card2.v1.text': 'The ZETA-Guard to Resource Server interface, including all HTTP headers required for access via the ZETA Guard. Use this for understanding the full TI 2.0 interface requirements and building API routing without the ZETA SDK.',
      'gs.card2.v2.title': 'VSDM2 without ZETA',
      'gs.card2.v2.text': 'The pure Client to ZETA-Guard interface without the ZETA overlay. Use this for preparing and validating payloads to be processed by the ZETA SDK.',
      'gs.card2.v1.link': 'View on SwaggerHub \u2192',
      'gs.card2.v2.link': 'View on SwaggerHub \u2192',
      'gs.card3.title': 'Set Up Contract Testing',
      'gs.card3.text': 'Use <a href="https://docs.pact.io/" target="_blank" rel="noopener">Pact</a>, an open-source contract testing framework, to validate service interactions without relying on complex end-to-end tests. Recommended workflow:',
      'gs.card3.steps': '<li>Verify your tech stack supports Pact</li><li>Download the OpenAPI spec and use it as the basis for a mock server</li><li>Write Pact tests covering your expected interactions</li><li>Generate a Pact file (pact.json) and publish it to our broker</li>',
      'gs.card3.text2': 'See the <a href="https://github.com/gematik/ti2.0-testhub/tree/main/client/vsdm-client-simservice-java/src/test/java/de/gematik/ti20/simsvc/client/pact" target="_blank" rel="noopener">Java example implementation</a> and the <a href="https://github.com/gematik/ti2.0-testhub/blob/main/client/vsdm-client-simservice-java/src/test/java/de/gematik/ti20/simsvc/client/service/VsdmClientServicePactTest.java" target="_blank" rel="noopener">VsdmClientServicePactTest</a> in our TestHub for a consumer-side Pact test reference.',
      'gs.card3.broker.title': 'Broker Registration',
      'gs.card3.broker.text': 'Contact us with your desired application name for the Pact Broker. We will provide you with two API tokens: a Read/Write token for your CI/CD pipelines and a Read-Only token for reports and dashboards.',
      'gs.card3.publish.title': 'Publish Contract',
      'gs.card3.publish.text': 'Upload your generated <code>pact.json</code> (Base64-encoded) using the following parameters. The possible values for <code>PROVIDER_APPLICATION_NAME</code> are:',
      'gs.card3.publish.providers': '<li><code>vsdm2-zeta-gematik-reference</code> \u2014 VSDM2 with ZETA overlay</li><li><code>vsdm2-gematik-reference</code> \u2014 VSDM2 without ZETA overlay</li>',
      'gs.card3.publish.text2': 'The generated pact.json file must be Base64-encoded before uploading:',
      'gs.feedback': '<strong>We value your feedback!</strong> This portal is in its pilot phase. If you encounter issues, need additional language support for code generation, or have suggestions for improvement, please let us know.',

      // Features
      'feat.badge': 'Core Features',
      'feat.title': 'Three pillars of the<br>TI developer experience.',
      'feat.subtitle': 'From interactive API exploration to contract testing and automated quality gates — everything you need to build reliable TI integrations.',
      'feat.api.title': 'API Portal',
      'feat.api.desc': 'Explore the VSDM2 API with interactive documentation powered by SwaggerHub. Try endpoints directly in the browser, use the built-in mock server, and generate client code in your preferred language.',
      'feat.api.list': '<li>Interactive API docs with "Try It Out"</li><li>Mock Server (Prism-based) for simulated responses</li><li>API Catalog &amp; Discovery</li><li>SDK / Code Generation (Java, C#, Go, Python, …)</li><li>OpenAPI spec downloads (with &amp; without ZETA)</li>',
      'feat.api.cta': 'Open API Portal',
      'feat.ct.title': 'Contract Testing',
      'feat.ct.desc': 'Validate your integrations against official gematik API contracts using Pact. Publish your consumer contracts to our PactFlow broker and get automated compatibility verification against the provider.',
      'feat.ct.list': '<li>Bidirectional Contract Testing (Pact)</li><li>CI/CD pipeline integration</li><li>Automated compliance &amp; breaking change detection</li><li>Detailed compatibility reports</li>',
      'feat.ct.cta': 'Explore Contract Testing',
      'feat.ops.title': 'API Lifecycle Managment',
      'feat.ops.desc': 'Behind the scenes, our automated API lifecycle pipeline ensures every published API meets strict quality standards — from FHIR source to validated OpenAPI specification.',
      'feat.ops.list': '<li>FHIR → OpenAPI generation (custom tooling)</li><li>OpenAPI Overlays for environment configs</li><li>Automated linting (Spectral) &amp; validation</li><li>Continuous publishing to API Portal and Contract Testing</li>',
      'feat.ops.cta': 'View on GitHub',

      // Feature Detail Panels
      'feat.ct.detail.title': 'Contract Testing — Deep Dive',
      'feat.ct.detail.diagram.src': 'assets/svg/detail-contract-testing-diagram.svg',
      'feat.ct.detail.pilot.title': 'Pilot context (VSDM2)',
      'feat.ct.detail.pilot.text': 'We are currently running a VSDM2 pilot for contract testing. In this setup, the <strong>Provider</strong> is the <strong>VSDM2 Fachdienst</strong> and the <strong>Consumer</strong> is the <strong>Primärsystem</strong>.',
      'feat.ct.detail.text1': 'Contract testing with Pact ensures that your consumer application and the gematik provider APIs stay compatible throughout the development lifecycle. Instead of relying on fragile end-to-end tests, you define explicit contracts that describe the interactions your application expects. These contracts are then verified against the actual provider implementation on our PactFlow broker.',
      'feat.ct.detail.text2': 'The workflow integrates seamlessly into your CI/CD pipeline. After writing Pact tests locally, you publish the generated contract files to our broker using API tokens. The broker automatically runs verification against the provider and reports back whether your consumer contract is compatible. Breaking changes are detected before they reach production, giving you confidence in every deployment.',
      'feat.ct.detail.cta': 'Explore Contract Testing',
      'feat.ops.detail.title': 'API Lifecycle Management — Deep Dive',
      'feat.ops.detail.hint.title': 'Interactive Diagram',
      'feat.ops.detail.hint.text': 'Click on the lifecycle stages in the diagram below to explore each phase in detail.',
      'feat.ops.detail.text1': 'The API Lifecycle Managment is the backbone of our API quality assurance process. Starting from specified FHIR resources, our custom tooling generates OpenAPI specifications that accurately reflect the underlying data models. These specs are then enriched with environment-specific overlays for REF, TU, and PU server configurations, ensuring that each deployment target has the correct base URLs and authentication parameters.',
      'feat.ops.detail.text2': 'Every generated specification passes through automated linting with Spectral rules tailored to gematik\'s API design guidelines. The pipeline validates structural correctness, naming conventions, examples correctness, and security scheme definitions. Once all quality gates pass, the specification is automatically published to the API Portal, keeping the documentation always in sync with the latest FHIR resources.',
      'feat.ops.detail.cta': 'Open API Portal',

      // Lifecycle Diagram Descriptions
      'lifecycle.design.title': 'Design',
      'lifecycle.design.text': 'Our System Engineering team designs the API specification based on FHIR StructureDefinitions, CapabilityStatements, and domain requirements. The team models resources, defines interactions, and creates the canonical data model that will drive the entire specification.',
      'lifecycle.validate.title': 'Validate',
      'lifecycle.validate.text': 'The automated validation pipeline ensures every API specification meets strict quality standards before publication.',
      'lifecycle.publish.title': 'Publish',
      'lifecycle.publish.text': 'The validated specification is pushed from the Source of Truth repository through an automated publishing pipeline to the Dev-Portal — the interface to the external world.',
      'lifecycle.implementation.title': 'Implementation',
      'lifecycle.implementation.text': 'External developers use the published API specifications to implement their integrations. Code generation, interactive documentation, and the mock server help accelerate development without needing access to production systems.',
      'lifecycle.testing.title': 'Testing',
      'lifecycle.testing.text': 'Bidirectional contract testing with Pact validates that your implementation matches the official API contract. Tests run in your CI/CD pipeline and results are verified against the provider on the PactFlow broker.',
      'lifecycle.iteration.title': 'Iteration',
      'lifecycle.iteration.text': 'Feedback from testing and real-world usage flows back into the design phase. Breaking change detection, compatibility reports, and community input drive continuous improvement of the API specification.',
      'lifecycle.devportal.title': 'Dev-Portal',
      'lifecycle.devportal.text': 'The Developer Portal is the central entry point for developers integrating with the Telematikinfrastruktur. It provides:\n\n• API Portal (SwaggerHub) — interactive documentation, mock servers, and code generation\n• Contract Testing (PactFlow) — bidirectional compatibility verification\n• Automated publishing — every validated API specification is published here automatically\n\nThis makes it the central interface between gematik\'s internal API lifecycle and the external developer community.',
      'lifecycle.validate.steps': 'Input Validation|Convert FHIR to OAS|Overlay Process|Example & Syntax Validation|Linting (Spectral)|Mocking & Code Gen Checks|ZAP API Scan',
      'lifecycle.validate.steps.desc': 'Check that all FHIR resources and inputs are present and structurally valid.|Transform FHIR StructureDefinitions and CapabilityStatements into an OpenAPI 3.0 specification.|Apply environment-specific overlays (REF, TU, PU) for server URLs and auth parameters.|Verify that all examples conform to schemas and that the spec is syntactically correct.|Enforce gematik API design guidelines using custom Spectral rulesets.|Validate that the spec works with mock servers (Prism) and code generators.|Run OWASP ZAP scans against the generated API for security vulnerabilities.',
      'lifecycle.validate.result': 'Source of Truth Repository',
      'lifecycle.publish.steps': 'Source of Truth Repo|Publishing Script',
      'lifecycle.publish.split': 'API Portal (SwaggerHub)|Contract Testing (PactFlow)',
      'lifecycle.testing.steps': 'Write Pact Consumer Tests against OpenAPI|Generate Pact Contract|Publish to PactFlow Broker',
      'lifecycle.testing.result': 'Contract Verified \u2713',      'lifecycle.testing.action': 'Learn more about Contract Testing →',
      // Resources
      'res.badge': 'Resources',
      'res.title': 'Everything at your fingertips.',
      'res.subtitle': 'From specifications to code examples — find all the resources you need in one place.',
      'res.specs.title': 'gemSpec Pages',
      'res.specs.desc': 'Specifications, guidelines, concepts, profiles, implementation guides, and draft publications for the TI.',
      'res.github.title': 'Open Source',
      'res.github.desc': 'Explore our open source repositories organized by category — from reference implementations to testing tools.',
      'res.github.link': 'Explore repositories →',
      'res.guides.title': 'Implementation Guides',
      'res.guides.desc': 'Step-by-step guides for integrating TI applications into your systems.',
      'res.guides.link': 'View guides →',
      'res.ru.title': 'RU as a Service',
      'res.ru.desc': 'Access the reference environment (RU) for testing your integrations.',
      'res.ru.link': 'Learn more →',
      'res.forum.title': 'Developer Portal Gemmunity Forum',
      'res.forum.desc': 'Use the (private) developer portal forum in the gemmunity to ask questions, and share your experiences.',
      'res.blog.title': 'Tech Blog',
      'res.blog.desc': 'Technical deep dives, engineering insights, and behind-the-scenes from gematik.',
      'res.blog.link': 'Read the blog →',
      'res.simplifier.title': 'FHIR Profiles',
      'res.simplifier.desc': 'FHIR profiles, packages, and project specifications hosted on Simplifier.net.',
      'res.simplifier.link': 'View on Simplifier →',

      // Project Resources Guide
      'project.badge': 'Project Resources',
      'project.title': 'Where to find Project Resources',
      'project.subtitle': 'Find FHIR profiles, API documentation, and specifications for the projects relevant to the VSDM2.0 pilot project. Use this table to jump directly to the right place.',
      'project.col.project': 'Project',
      'project.col.profiles': 'FHIR Resources',
      'project.col.docs': 'Impl. Guide / API Docs',
      'project.col.spec': 'Specification',

      // Ecosystem
      'eco.badge': 'Ecosystem',
      'eco.title': 'Part of a bigger ecosystem.',
      'eco.subtitle': 'The gematik developer ecosystem extends across multiple platforms. Here\'s where to find what you need.',
      'eco.gematik.desc': 'General information about gematik and the TI',
      'eco.fachportal.desc': 'Technical information and services for the TI',
      'eco.ina.desc': 'Interoperability navigator for digital medicine',
      'eco.status.desc': 'Live status and monitoring of all TI services',
      'eco.roadmap.desc': 'Upcoming milestones and planned TI developments',
      'eco.newsletter.desc': 'Subscribe to the gematik newsletter for updates',

      // CTA
      'cta.title': 'Ready to start building?',
      'cta.subtitle': 'Dive into the Developer Portal and start integrating with the Telematikinfrastruktur today. Access APIs, run contract tests, and ship with confidence.',
      'cta.btn1': 'Open API Portal',
      'cta.btn2': 'View on GitHub',

      // Footer
      'footer.tagline': 'Building the digital health infrastructure of tomorrow.',
      'footer.platform': 'Platform',
      'footer.resources': 'Resources',
      'footer.community': 'Community',
      'footer.legal': 'Legal Information',
      'footer.copyright': '&copy; 2026 gematik GmbH. All rights reserved.',
    },

    de: {
      // Navbar
      'nav.gettingStarted': 'Erste Schritte',
      'nav.features': 'Funktionen',
      'nav.resources': 'Ressourcen',
      'nav.community': 'Community',

      // Hero
      'hero.badge': 'Developer Portal — Pilot',
      'hero.title': 'Die Zukunft der<br><span class="hero__title--highlight">TI Developer Experience.</span>',
      'hero.subtitle': 'Willkommen im Pilotbetrieb des gematik Developer Portals. Aktuell mit der VSDM 2.0 API ausgestattet, bietet dieses Portal interaktive Dokumentation, einen Mock-Server, Contract Testing und Code-Generierung — alles was Sie für die Integration mit der Telematikinfrastruktur benötigen. Die Zukunft dieses Portals hängt von Ihrem Feedback ab.',
      'hero.stat1': 'VSDM2 — Pilotphase',
      'hero.stat2': 'Quality Gate',
      'hero.stat3': 'GitHub-basierte Tools',
      'hero.pilot': 'Pilot',

      // Feature card CTAs
      'feat.ct.cta.card': 'Mehr erfahren',
      'feat.ops.cta.card': 'Mehr erfahren',

      // Getting Started
      'gs.badge': 'Erste Schritte',
      'gs.title': 'So nutzen Sie das Developer Portal',
      'gs.subtitle': 'Dieser Pilot umfasst derzeit die VSDM 2.0 API. Weitere APIs werden auf Basis Ihres Feedbacks ergänzt. So holen Sie das Beste aus jedem Tool heraus.',
      'gs.card1.title': 'Das API-Portal erkunden',
      'gs.card1.text': 'Das API-Portal enthält alle API-Beschreibungen, die von unserer Toolchain generiert und validiert werden. Aktuell umfasst es das VSDM 2.0 Pilotprojekt. Das Portal bietet:',
      'gs.card1.list': '<li>Einen <strong>SwaggerHub Auto Mocking Server</strong>, der VSDM2-API-Antworten simuliert</li><li>Server-Umgebungen für REF, TU und PU (derzeit nur als Referenz gelistet)</li><li><strong>Code-Beispiele</strong> in Java, C#, Go, JavaScript, PHP, Python, Scala, Swift und mehr</li><li>Mehrere <strong>Beispielantworten</strong> für jeden Endpunkt</li>',
      'gs.card1.text2': 'Der Code-Generator wurde für Java, C# und TypeScript erfolgreich getestet. Sie können den <a href="https://github.com/OpenAPITools/openapi-generator" target="_blank" rel="noopener">openapi-generator</a> auch in Ihre eigene Codebasis integrieren, um HTTP-Clients und Modellklassen zu generieren. Dies reduziert manuellen Implementierungsaufwand auf Client-Seite und stellt eine konsistente Nutzung der API sicher. Falls Sie hier Probleme haben oder wir weitere Sprachen testen sollen, geben Sie uns gerne Bescheid!',
      'gs.card2.title': 'OpenAPI-Spezifikationen herunterladen',
      'gs.card2.text': 'Jedes Mal, wenn eine neue VSDM2-FHIR-Spezifikation veröffentlicht wird, generiert unsere CI/CD-Pipeline automatisch eine aktualisierte OpenAPI-Spezifikation. Zwei Varianten stehen zur Verfügung:',
      'gs.card2.v1.title': 'VSDM2 mit ZETA',
      'gs.card2.v1.text': 'Die ZETA-Guard-zu-Resource-Server-Schnittstelle, einschließlich aller HTTP-Header, die für den Zugang über den ZETA Guard erforderlich sind. Verwenden Sie diese Variante, um die vollständigen TI 2.0 Schnittstellenanforderungen zu verstehen und API-Routing ohne das ZETA SDK aufzubauen.',
      'gs.card2.v2.title': 'VSDM2 ohne ZETA',
      'gs.card2.v2.text': 'Die reine Client-zu-ZETA-Guard-Schnittstelle ohne ZETA-Overlay. Verwenden Sie diese Variante, um Payloads vorzubereiten und zu validieren, die vom ZETA SDK verarbeitet werden.',
      'gs.card2.v1.link': 'Auf SwaggerHub ansehen \u2192',
      'gs.card2.v2.link': 'Auf SwaggerHub ansehen \u2192',
      'gs.card3.title': 'Contract Testing einrichten',
      'gs.card3.text': 'Verwenden Sie <a href="https://docs.pact.io/" target="_blank" rel="noopener">Pact</a>, ein Open-Source Contract-Testing-Framework, um Service-Interaktionen zu validieren, ohne auf komplexe End-to-End-Tests angewiesen zu sein. Empfohlener Ablauf:',
      'gs.card3.steps': '<li>Prüfen Sie, ob Ihr Tech-Stack Pact unterstützt</li><li>Laden Sie die OpenAPI-Spezifikation herunter und nutzen Sie sie als Basis für einen Mock-Server</li><li>Schreiben Sie Pact-Tests für Ihre erwarteten Interaktionen</li><li>Generieren Sie eine Pact-Datei (pact.json) und veröffentlichen Sie diese in unserem Broker</li>',
      'gs.card3.text2': 'Siehe die <a href="https://github.com/gematik/ti2.0-testhub/tree/main/client/vsdm-client-simservice-java/src/test/java/de/gematik/ti20/simsvc/client/pact" target="_blank" rel="noopener">Java-Beispielimplementierung</a> und den <a href="https://github.com/gematik/ti2.0-testhub/blob/main/client/vsdm-client-simservice-java/src/test/java/de/gematik/ti20/simsvc/client/service/VsdmClientServicePactTest.java" target="_blank" rel="noopener">VsdmClientServicePactTest</a> in unserem TestHub als Consumer-seitige Pact-Test-Referenz.',
      'gs.card3.broker.title': 'Broker-Registrierung',
      'gs.card3.broker.text': 'Teilen Sie uns mit, unter welchem Anwendungsnamen Ihre Anwendung im Pact Broker registriert werden soll. Anschlie\u00dfend stellen wir Ihnen zwei API-Tokens zur Verf\u00fcgung: ein Read/Write-Token f\u00fcr Ihre CI/CD-Pipelines und ein Read-Only-Token f\u00fcr Auswertungen und Visualisierungen.',
      'gs.card3.publish.title': 'Pact-Contracts hochladen',
      'gs.card3.publish.text': 'Laden Sie Ihre generierte <code>pact.json</code> (Base64-kodiert) mit den folgenden Parametern hoch. Die m\u00f6glichen Werte f\u00fcr <code>PROVIDER_APPLICATION_NAME</code> sind:',
      'gs.card3.publish.providers': '<li><code>vsdm2-zeta-gematik-reference</code> \u2014 VSDM2 mit ZETA-Overlay</li><li><code>vsdm2-gematik-reference</code> \u2014 VSDM2 ohne ZETA-Overlay</li>',
      'gs.card3.publish.text2': 'Die erzeugte pact.json Datei muss Base64-kodiert \u00fcbertragen werden:',
      'gs.feedback': '<strong>Wir freuen uns über Ihr Feedback!</strong> Dieses Portal befindet sich in der Pilotphase. Wenn Sie auf Probleme stoßen, zusätzliche Sprachunterstützung für die Code-Generierung benötigen oder Verbesserungsvorschläge haben, lassen Sie es uns bitte wissen.',

      // Features
      'feat.badge': 'Kernfunktionen',
      'feat.title': 'Drei Säulen der<br>TI-Entwicklererfahrung.',
      'feat.subtitle': 'Von interaktiver API-Exploration über Contract Testing bis hin zu automatisierten Quality Gates — alles was Sie für zuverlässige TI-Integrationen benötigen.',
      'feat.api.title': 'API-Portal',
      'feat.api.desc': 'Erkunden Sie die VSDM2-API mit interaktiver Dokumentation auf Basis von SwaggerHub. Testen Sie Endpunkte direkt im Browser, nutzen Sie den integrierten Mock-Server und generieren Sie Client-Code in Ihrer bevorzugten Sprache.',
      'feat.api.list': '<li>Interaktive API-Dokumentation mit „Try It Out"</li><li>Mock Server (Prism-basiert) für simulierte Antworten</li><li>API-Katalog &amp; Discovery</li><li>SDK / Code-Generierung (Java, C#, Go, Python, …)</li><li>OpenAPI-Spec-Downloads (mit &amp; ohne ZETA)</li>',
      'feat.api.cta': 'API-Portal öffnen',
      'feat.ct.title': 'Contract Testing',
      'feat.ct.desc': 'Validieren Sie Ihre Integrationen gegen offizielle gematik-API-Verträge mit Pact. Veröffentlichen Sie Ihre Consumer-Verträge in unserem PactFlow-Broker und erhalten Sie automatische Kompatibilitätsprüfung gegen den Provider.',
      'feat.ct.list': '<li>Bidirectional Contract Testing (Pact)</li><li>CI/CD-Pipeline-Integration</li><li>Automatische Compliance- &amp; Breaking-Change-Erkennung</li><li>Detaillierte Kompatibilitätsberichte</li>',
      'feat.ct.cta': 'Contract Testing erkunden',
      'feat.ops.title': 'API Lifecycle Management',
      'feat.ops.desc': 'Im Hintergrund stellt unsere automatisierte API-Lifecycle-Pipeline sicher, dass jede veröffentlichte API strenge Qualitätsstandards erfüllt — von der FHIR-Quelle bis zur validierten OpenAPI-Spezifikation.',
      'feat.ops.list': '<li>FHIR → OpenAPI-Generierung (eigene Tooling)</li><li>OpenAPI Overlays für Umgebungskonfigurationen</li><li>Automatisiertes Linting (Spectral) &amp; Validierung</li><li>Kontinuierliche Veröffentlichung im API-Portal und Contract Testing</li>',
      'feat.ops.cta': 'Auf GitHub ansehen',

      // Feature Detail Panels
      'feat.ct.detail.title': 'Contract Testing — Vertiefung',
      'feat.ct.detail.diagram.src': 'assets/svg/detail-contract-testing-diagram-de.svg',
      'feat.ct.detail.pilot.title': 'Pilotkontext (VSDM2)',
      'feat.ct.detail.pilot.text': 'Aktuell führen wir einen VSDM2-Pilotbetrieb für Contract Testing durch. In diesem Setup ist der <strong>Provider</strong> der <strong>VSDM2 Fachdienst</strong> und der <strong>Consumer</strong> das <strong>Primärsystem</strong>.',
      'feat.ct.detail.text1': 'Contract Testing mit Pact stellt sicher, dass Ihre Consumer-Anwendung und die gematik-Provider-APIs über den gesamten Entwicklungszyklus hinweg kompatibel bleiben. Anstatt auf fragile End-to-End-Tests zu setzen, definieren Sie explizite Verträge, die die erwarteten Interaktionen Ihrer Anwendung beschreiben. Diese Verträge werden dann gegen die tatsächliche Provider-Implementierung auf unserem PactFlow-Broker verifiziert.',
      'feat.ct.detail.text2': 'Der Workflow integriert sich nahtlos in Ihre CI/CD-Pipeline. Nach dem lokalen Schreiben von Pact-Tests veröffentlichen Sie die generierten Vertragsdateien über API-Tokens in unserem Broker. Der Broker führt automatisch eine Verifizierung gegen den Provider durch und meldet zurück, ob Ihr Consumer-Vertrag kompatibel ist. Breaking Changes werden erkannt, bevor sie die Produktion erreichen — das gibt Ihnen Sicherheit bei jedem Deployment.',
      'feat.ct.detail.cta': 'Contract Testing erkunden',
      'feat.ops.detail.title': 'API Lifecycle Management — Vertiefung',
      'feat.ops.detail.hint.title': 'Interaktives Diagramm',
      'feat.ops.detail.hint.text': 'Klicken Sie auf die Phasen im Diagramm, um Details zu den einzelnen Schritten zu erfahren.',
      'feat.ops.detail.text1': 'Das API Lifecycle Management bildet das Rückgrat unseres API-Qualitätssicherungsprozesses. Ausgehend von spezifizierten FHIR-Ressourcen generiert unser eigenes Tooling OpenAPI-Spezifikationen, die die zugrundeliegenden Datenmodelle exakt abbilden. Diese Spezifikationen werden dann mit umgebungsspezifischen Overlays für REF-, TU- und PU-Serverkonfigurationen angereichert, sodass jedes Deployment-Ziel die korrekten Base-URLs und Authentifizierungsparameter erhält.',
      'feat.ops.detail.text2': 'Jede generierte Spezifikation durchläuft automatisiertes Linting mit Spectral-Regeln, die auf gematiks API-Design-Richtlinien zugeschnitten sind. Die Pipeline validiert strukturelle Korrektheit, Namenskonventionen, Beispielkorrektheit und Security-Scheme-Definitionen. Sobald alle Quality Gates bestanden sind, wird die Spezifikation automatisch im API-Portal veröffentlicht, sodass die Dokumentation immer mit den neuesten FHIR-Ressourcen synchron bleibt.',
      'feat.ops.detail.cta': 'API-Portal öffnen',

      // Lifecycle Diagram Descriptions
      'lifecycle.design.title': 'Design',
      'lifecycle.design.text': 'Unser System-Engineering-Team entwirft die API-Spezifikation basierend auf FHIR StructureDefinitions, CapabilityStatements und fachlichen Anforderungen. Das Team modelliert Ressourcen, definiert Interaktionen und erstellt das kanonische Datenmodell, das die gesamte Spezifikation antreibt.',
      'lifecycle.validate.title': 'Validieren',
      'lifecycle.validate.text': 'Die automatisierte Validierungspipeline stellt sicher, dass jede API-Spezifikation strenge Qualitätsstandards erfüllt, bevor sie veröffentlicht wird.',
      'lifecycle.publish.title': 'Publizieren',
      'lifecycle.publish.text': 'Die validierte Spezifikation wird aus dem Source-of-Truth-Repository über eine automatisierte Publishing-Pipeline zum Dev-Portal gepusht — der Schnittstelle zur Außenwelt.',
      'lifecycle.implementation.title': 'Implementierung',
      'lifecycle.implementation.text': 'Externe Entwickler nutzen die veröffentlichten API-Spezifikationen zur Implementierung ihrer Integrationen. Code-Generierung, interaktive Dokumentation und der Mock-Server beschleunigen die Entwicklung, ohne dass Zugang zu Produktionssystemen benötigt wird.',
      'lifecycle.testing.title': 'Testing',
      'lifecycle.testing.text': 'Bidirectional Contract Testing mit Pact validiert, dass Ihre Implementierung dem offiziellen API-Vertrag entspricht. Tests laufen in Ihrer CI/CD-Pipeline und die Ergebnisse werden gegen den Provider auf dem PactFlow-Broker verifiziert.',
      'lifecycle.iteration.title': 'Iteration',
      'lifecycle.iteration.text': 'Feedback aus Testing und realer Nutzung fließt zurück in die Design-Phase. Breaking-Change-Erkennung, Kompatibilitätsberichte und Community-Input treiben die kontinuierliche Verbesserung der API-Spezifikation voran.',
      'lifecycle.devportal.title': 'Dev-Portal',
      'lifecycle.devportal.text': 'Das Developer Portal ist der zentrale Einstiegspunkt für Entwickler bei der Integration mit der Telematikinfrastruktur. Es bietet:\n\n• API-Portal (SwaggerHub) — interaktive Dokumentation, Mock-Server und Code-Generierung\n• Contract Testing (PactFlow) — bidirektionale Kompatibilitätsprüfung\n• Automatische Veröffentlichung — jede validierte API-Spezifikation wird hier automatisch publiziert\n\nDamit bildet es die zentrale Schnittstelle zwischen gematiks internem API-Lifecycle und der externen Entwickler-Community.',
      'lifecycle.validate.steps': 'Eingabevalidierung|FHIR nach OAS konvertieren|Overlay-Prozess|Beispiel- & Syntaxvalidierung|Linting (Spectral)|Mocking- & Code-Gen-Prüfungen|ZAP API Scan',
      'lifecycle.validate.steps.desc': 'Prüfung, dass alle FHIR-Ressourcen und Eingaben vorhanden und strukturell valide sind.|FHIR StructureDefinitions und CapabilityStatements in eine OpenAPI-3.0-Spezifikation umwandeln.|Umgebungsspezifische Overlays (REF, TU, PU) für Server-URLs und Auth-Parameter anwenden.|Sicherstellen, dass alle Beispiele den Schemas entsprechen und die Spec syntaktisch korrekt ist.|Gematik-API-Design-Richtlinien mit eigenen Spectral-Regelsets durchsetzen.|Prüfen, dass die Spec mit Mock-Servern (Prism) und Code-Generatoren funktioniert.|OWASP-ZAP-Scans gegen die generierte API auf Sicherheitslücken durchführen.',
      'lifecycle.validate.result': 'Source-of-Truth-Repository',
      'lifecycle.publish.steps': 'Source-of-Truth-Repo|Publishing-Skript',
      'lifecycle.publish.split': 'API-Portal (SwaggerHub)|Contract Testing (PactFlow)',
      'lifecycle.testing.steps': 'Pact-Consumer-Tests gegen OpenAPI schreiben|Pact-Vertrag generieren|Im PactFlow-Broker veröffentlichen',
      'lifecycle.testing.result': 'Vertrag verifiziert \u2713',      'lifecycle.testing.action': 'Mehr über Contract Testing erfahren →',
      // Resources
      'res.badge': 'Ressourcen',
      'res.title': 'Alles griffbereit.',
      'res.subtitle': 'Von Spezifikationen bis zu Code-Beispielen — finden Sie alle Ressourcen an einem Ort.',
      'res.specs.title': 'gemSpec Pages',
      'res.specs.desc': 'Spezifikationen, Richtlinien, Konzepte, Steckbriefe und Implementierungsleitfäden sowie Vorabveröffentlichungen für die TI.',
      'res.github.title': 'Open Source',
      'res.github.desc': 'Entdecken Sie unsere Open-Source-Repositories, geordnet nach Kategorien — von Referenzimplementierungen bis zu Test-Tools.',
      'res.github.link': 'Repositories erkunden →',
      'res.guides.title': 'Implementierungsleitfäden',
      'res.guides.desc': 'Schritt-für-Schritt-Anleitungen zur Integration von TI-Anwendungen in Ihre Systeme.',
      'res.guides.link': 'Leitfäden ansehen →',
      'res.ru.title': 'RU as a Service',
      'res.ru.desc': 'Zugang zur Referenzumgebung (RU) zum Testen Ihrer Integrationen.',
      'res.ru.link': 'Mehr erfahren →',
      'res.forum.title': 'Developer Portal Gemmunity Forum',
      'res.forum.desc': 'Vernetzen Sie sich mit Entwicklern, stellen Sie Fragen und teilen Sie Ihre Erfahrungen im (privaten) Developer Portal Forum der Gemmunity.',
      'res.blog.title': 'Tech Blog',
      'res.blog.desc': 'Technische Deep Dives, Engineering-Einblicke und Hintergründe aus der gematik.',
      'res.blog.link': 'Blog lesen →',
      'res.simplifier.title': 'FHIR-Profile',
      'res.simplifier.desc': 'FHIR-Profile, Packages und Projektspezifikationen auf Simplifier.net.',
      'res.simplifier.link': 'Auf Simplifier ansehen →',

      // Project Resources Guide
      'project.badge': 'Projekt-Ressourcen',
      'project.title': 'Wo finde ich Projekt-Ressourcen?',
      'project.subtitle': 'FHIR-Profile, API-Dokumentation und Spezifikationen für die Projekte, die für das VSDM2.0-Pilotprojekt relevant sind. Nutzen Sie diese Tabelle, um direkt zur richtigen Stelle zu gelangen.',
      'project.col.project': 'Projekt',
      'project.col.profiles': 'FHIR Ressourcen',
      'project.col.docs': 'Impl.-leitfaden / API-Doku',
      'project.col.spec': 'Spezifikation',

      // Ecosystem
      'eco.badge': 'Ökosystem',
      'eco.title': 'Teil eines größeren Ökosystems.',
      'eco.subtitle': 'Das gematik-Entwickler-Ökosystem erstreckt sich über mehrere Plattformen. Hier finden Sie, was Sie brauchen.',
      'eco.gematik.desc': 'Allgemeine Informationen über gematik und die TI',
      'eco.fachportal.desc': 'Technische Informationen und Dienste für die TI',
      'eco.ina.desc': 'Interoperabilitätsnavigator für die digitale Medizin',
      'eco.status.desc': 'Live-Status und Monitoring aller TI-Dienste',
      'eco.roadmap.desc': 'Kommende Meilensteine und geplante TI-Entwicklungen',
      'eco.newsletter.desc': 'Abonnieren Sie den gematik-Newsletter für Updates',

      // CTA
      'cta.title': 'Bereit loszulegen?',
      'cta.subtitle': 'Tauchen Sie ein in das Developer Portal und starten Sie noch heute mit der Integration in die Telematikinfrastruktur. Greifen Sie auf APIs zu, führen Sie Contract Tests durch und liefern Sie mit Zuversicht.',
      'cta.btn1': 'API Portal öffnen',
      'cta.btn2': 'Auf GitHub ansehen',

      // Footer
      'footer.tagline': 'Wir bauen die digitale Gesundheitsinfrastruktur von morgen.',
      'footer.platform': 'Plattform',
      'footer.resources': 'Ressourcen',
      'footer.community': 'Community',
      'footer.legal': 'Rechtliches',
      'footer.copyright': '&copy; 2026 gematik GmbH. Alle Rechte vorbehalten.',
    },
  };

  // Expose translations globally for other scripts
  window.__i18n = translations;

  function applyTranslations(lang) {
    // Update text-only elements
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] != null) {
        el.textContent = translations[lang][key];
      }
    });
    // Update elements that contain HTML
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (translations[lang] && translations[lang][key] != null) {
        el.innerHTML = translations[lang][key];
      }
    });
    // Update elements that need localized src attributes
    document.querySelectorAll('[data-i18n-src]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-src');
      if (translations[lang] && translations[lang][key] != null) {
        el.setAttribute('src', translations[lang][key]);
      }
    });
    // Update <html lang>
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
  }

  function setActiveLang(lang) {
    var btns = document.querySelectorAll('.lang-toggle__option');
    btns.forEach(function (btn) {
      btn.classList.toggle('lang-toggle__option--active', btn.getAttribute('data-lang') === lang);
    });
  }

  function init() {
    var saved = localStorage.getItem('lang');
    var lang = saved || 'de';

    applyTranslations(lang);
    setActiveLang(lang);

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-lang') || 'en';
        var next = current === 'en' ? 'de' : 'en';
        applyTranslations(next);
        setActiveLang(next);
        localStorage.setItem('lang', next);
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
