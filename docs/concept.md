# Flashcards App (Working name)

### Team Members
- **Marta Sadłowska** 
- **Kamila Konieczna-Marjan** 
- **Łukasz Stecyk** 

### Date
October 30, 2024

---

## 1. Executive Summary

Our Flashcards App is a mobile-first web app designed to streamline the process of creating flashcards from large documents. By allowing users to upload files in PDF or DOCX formats, our app automatically summarizes key points into study-ready flashcards using natural language processing (NLP). This platform helps students, professionals, and knowledge-seekers save time and retain information more efficiently. With Flashcards App, users can view and study flashcards online or download them for offline use.

---

## 2. Problem Statement

### Problem Description
Students, professionals, and lifelong learners often need to review extensive amounts of information, whether it's lecture notes, research papers, or technical documents. Manually creating flashcards from such materials can be time-consuming and tedious, and existing tools rarely automate this task effectively.

### Target Audience
- **Students**: Need efficient ways to review and retain key points from academic materials.
- **Professionals**: Especially those preparing for certifications or exams in fields such as medicine, law, and technology.
- **Lifelong Learners**: Anyone who wants to retain important information from documents or books.

### Impact of the Problem
Without an automated solution, users either spend significant time manually summarizing materials or struggle to retain information effectively. This can lead to inefficient study sessions, lower retention rates, and difficulty staying engaged with dense content.

---

## 3. Solution Overview

### Solution Description
Flashcards App provides a straightforward and efficient way to convert documents into flashcards, leveraging NLP to summarize content and identify key information. Users simply upload their documents, and our app processes them to create a set of flashcards for easy studying.

### Benefits to Users
- **Time Savings**: Automates the process of flashcard creation, saving hours for users who would otherwise need to create them manually.
- **Enhanced Retention**: Flashcards support active recall, an effective way to boost memory retention.
- **Flexible Study Options**: Users can study flashcards directly on the platform or download them for offline use.

---

## 4. Objectives and Goals

### Project Goals
- Develop a responsive, mobile-first web app that provides document upload, flashcard generation, and offline access.
- Integrate NLP models for text summarization and flashcard generation.
- Ensure secure file storage and user authentication with role-based access control (RBAC).

### Key Performance Indicators (KPIs)

1. **Flashcard Generation Latency**
   - **Description**: The time taken to generate flashcards from a document upload.
   - **Target**: Flashcard generation should take no more than 15 seconds for documents up to 10 pages.
   - **Measurement Method**: Measure the time taken from document upload to flashcard availability in testing scenarios.

2. **Successful Document Parsing Rate**
   - **Description**: The percentage of uploaded documents successfully parsed and processed for flashcard generation.
   - **Target**: Achieve at least a 90% success rate for supported file types (PDF and DOCX) in processing and parsing without errors.
   - **Measurement Method**: Track successful and failed document parsing attempts during testing.

3. **Accuracy of Flashcard Content**
   - **Description**: The percentage of flashcards that accurately reflect key points from the document based on a testing rubric.
   - **Target**: Achieve at least 75% content accuracy as evaluated through a set of predefined criteria (e.g., relevance, conciseness).
   - **Measurement Method**: Have team members or testers evaluate a random sample of generated flashcards for accuracy.

5. **Code Coverage for Unit and Integration Tests**
   - **Description**: The percentage of code covered by automated unit and integration tests to ensure code reliability and maintainability.
   - **Target**: Achieve at least 70% test coverage across both frontend and backend code.
   - **Measurement Method**: Use code coverage analysis tools (e.g., Jest for React, Pytest or Mocha for backend) to track coverage.

7. **Milestone Completion Rate**
   - **Description**: The percentage of planned milestones completed on time, reflecting project progress and development efficiency.
   - **Target**: Achieve at least 80% on-time completion for planned milestones across the project timeline.
   - **Measurement Method**: Track milestones in a project management tool (e.g., Trello, Asana) and measure completion against deadlines.

8. **Documentation Quality**
   - **Description**: Completeness and accuracy of documentation (README, API docs, setup instructions, etc.) to support maintainability and usability.
   - **Target**: Ensure that at least 90% of all documentation is completed, clear, and verified by team members with a checklist.
   - **Measurement Method**: Conduct internal reviews of all documentation against a predefined checklist.

### Timeline and Milestones
1. **Weeks 1-2**: Conceptualization, problem definition, and user research.
2. **Weeks 3-4**: Finalize architecture and technology selection.
3. **Weeks 5-10**: Development of MVP, including core features like document upload, flashcard generation, and UI.
4. **Weeks 11-12**: Testing, feedback collection, and final refinements.
5. **Final Class**: Project presentation and demonstration.

---

## 5. Market Analysis

### Market Research
While there are various study tools, very few offer automated flashcard generation from uploaded documents. Existing popular flashcard apps like Quizlet or Vaia require manual input, and some NLP-based summarizers are not optimized for flashcard format.

### Target Market
Our primary target market includes college and graduate students, exam-prepping professionals, and general knowledge seekers. This audience values study efficiency and active recall techniques like flashcards.

### Trends and Opportunities
The increasing adoption of digital learning tools and the popularity of spaced repetition for studying create a favorable environment for Flashcards App. The demand for mobile-first, on-the-go study solutions further supports our app’s potential.

---

## 6. Product Features and Functionality

### Core Features
- **Document Upload**: Users can upload PDF or DOCX files, which are parsed and prepared for flashcard generation.
- **Flashcard Generation**: Leveraging NLP, the app will automatically identify key points and questions to create flashcards in Q&A format.
- **Flashcard Viewer**: Users can study their generated flashcards within the app, with an option to navigate between flashcards easily.
- **Download Options**: Users can download flashcards in PDF or CSV formats, allowing them to study offline or import into other flashcard applications.

### Additional Features
- **Quiz Mode**: Future updates may include a quiz mode for users to test their knowledge with generated flashcards.
- **Text-to-Speech**: Enable users to listen to flashcards for auditory learning.

### UX Considerations
- **Mobile-First Design**: The app will prioritize a smooth experience on mobile devices, making it accessible on any screen size.
- **Error Handling**: The app will handle errors like unsupported file types or upload issues gracefully, with clear error messages to guide users.

---

## 8. Risk Assessment

### Potential Challenges
- **NLP Complexity**: Generating quality summaries and flashcards might be challenging, especially for lengthy or complex documents.
- **User Adoption**: Competing with established study tools could affect user adoption.
- **Scalability**: If user numbers grow quickly, scaling storage and processing power might be necessary.

### Risk Mitigation
- **NLP Optimization**: Use pre-trained models and fine-tune based on feedback to improve flashcard quality.
- **User Engagement**: Implement feedback loops to understand user needs better and iterate quickly.
- **Cloud Scaling**: AWS offers scalable options for storage and processing power, allowing us to scale as needed.

---

## 10. Conclusion

Flashcards App aims to fill the gap in digital study tools by offering an automated solution for flashcard creation. By addressing a real need for quick and effective study preparation, the app empowers users to make the most of their study time. Our mobile-first approach, combined with NLP, will make it easy for users to create, view, and download flashcards, whether on the go or offline.

### Next Steps
With architecture and concept in place, the next steps include developing the MVP, gathering user feedback, and refining the core features. The ultimate goal is to create a platform that saves time and boosts retention for all types of learners.

---

## Appendix

- **Research Findings**: TBD?
- **User Personas**: TBD?
