const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the AI know how to respond to my guests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DozalDevs ingests your existing property listings, past conversations, and brand guidelines to train a custom model. It responds exactly how you would, using your specific house rules and local recommendations."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if a guest has an emergency the AI can't handle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the system detects an urgent issue (like a leak) or a question it lacks context for, it immediately pauses and escalates the thread to you or your staff via SMS and Slack."
      }
    },
    {
      "@type": "Question",
      "name": "Does it integrate with my current property management software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. DozalDevs natively integrates with major platforms including Guesty, Hostaway, Airbnb, and Vrbo, allowing it to sync reservations and trigger automated workflows seamlessly."
      }
    }
  ]
};

export default faqSchema;
