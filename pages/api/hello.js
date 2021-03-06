// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Classifier } from "ml-classify-text";
const classifier = new Classifier();
const data = [
  { input: "right", output: "Being Right" },
  { input: "was", output: "Being Right" },
  { input: "right", output: "Being Right" },
  { input: "correct", output: "Being Right" },
  { input: "wrong", output: "Being Right" },
  { input: "prove", output: "Being Right" },
  { input: "explain", output: "Being Right" },
  { input: "point", output: "Being Right" },
  { input: "to", output: "Being Right" },
  { input: "prove", output: "Being Right" },
  { input: "feelings", output: "Being Right" },
  { input: "arguing", output: "Being Right" },
  { input: "blame", output: "Blaming" },
  { input: "blamed", output: "Blaming" },
  { input: "blaming", output: "Blaming" },
  { input: "blame my", output: "Blaming" },
  { input: "fault", output: "Blaming" },
  { input: "my", output: "Blaming" },
  { input: "blamed my", output: "Blaming" },
  { input: "for not", output: "Blaming" },
  { input: "for", output: "Blaming" },
  { input: "because", output: "Blaming" },
  { input: "what", output: "Catastrophizing" },
  { input: "if", output: "Catastrophizing" },
  { input: "started", output: "Catastrophizing" },
  { input: "worry", output: "Catastrophizing" },
  { input: "die", output: "Catastrophizing" },
  { input: "panicked", output: "Catastrophizing" },
  { input: "will", output: "Catastrophizing" },
  { input: "worried", output: "Catastrophizing" },
  { input: "what", output: "Catastrophizing" },
  { input: "panic", output: "Catastrophizing" },
  { input: "going", output: "Catastrophizing" },
  { input: "control", output: "Control Fallacy" },
  { input: "responsible", output: "Control Fallacy" },
  { input: "responsible for", output: "Control Fallacy" },
  { input: "help", output: "Control Fallacy" },
  { input: "of control", output: "Control Fallacy" },
  { input: "felt", output: "Control Fallacy" },
  { input: "to help", output: "Control Fallacy" },
  { input: "feel responsible", output: "Control Fallacy" },
  { input: "feel", output: "Control Fallacy" },
  { input: "advice", output: "Control Fallacy" },
  { input: "feel", output: "Emotional Reasoning" },
  { input: "felt", output: "Emotional Reasoning" },
  { input: "invited", output: "Emotional Reasoning" },
  { input: "me", output: "Emotional Reasoning" },
  { input: "invite", output: "Emotional Reasoning" },
  { input: "guilty", output: "Emotional Reasoning" },
  { input: "emotions", output: "Emotional Reasoning" },
  { input: "go", output: "Emotional Reasoning" },
  { input: "but", output: "Emotional Reasoning" },
  { input: "feeling", output: "Emotional Reasoning" },
  { input: "change", output: "Fallacy of Change" },
  { input: "happy", output: "Fallacy of Change" },
  { input: "to change", output: "Fallacy of Change" },
  { input: "relationship", output: "Fallacy of Change" },
  { input: "be happy", output: "Fallacy of Change" },
  { input: "if", output: "Fallacy of Change" },
  { input: "happiness", output: "Fallacy of Change" },
  { input: "would", output: "Fallacy of Change" },
  { input: "him", output: "Fallacy of Change" },
  { input: "happier", output: "Fallacy of Change" },
  { input: "unfair", output: "Fallacy of Fairness" },
  { input: "fair", output: "Fallacy of Fairness" },
  { input: "unfair that", output: "Fallacy of Fairness" },
  { input: "resentful", output: "Fallacy of Fairness" },
  { input: "fair that", output: "Fallacy of Fairness" },
  { input: "was unfair", output: "Fallacy of Fairness" },
  { input: "pulled", output: "Fallacy of Fairness" },
  { input: "got", output: "Fallacy of Fairness" },
  { input: "people", output: "Fallacy of Fairness" },
  { input: "ticket", output: "Fallacy of Fairness" },
  { input: "negative", output: "Filter" },
  { input: "great", output: "Filter" },
  { input: "positive", output: "Filter" },
  { input: "good", output: "Filter" },
  { input: "said", output: "Filter" },
  { input: "on", output: "Filter" },
  { input: "but", output: "Filter" },
  { input: "comment", output: "Filter" },
  { input: "focus", output: "Filter" },
  { input: "nice", output: "Filter" },
  { input: "internal", output: "Global Labeling" },
  { input: "external", output: "Global Labeling" },
  { input: "met", output: "Global Labeling" },
  { input: "concluded", output: "Global Labeling" },
  { input: "concluded that", output: "Global Labeling" },
  { input: "loser", output: "Global Labeling" },
  { input: "women", output: "Global Labeling" },
  { input: "people", output: "Global Labeling" },
  { input: "men", output: "Global Labeling" },
  { input: "decided", output: "Global Labeling" },
  { input: "cheated", output: "Heavens Reward Fallacy" },
  { input: "worked", output: "Heavens Reward Fallacy" },
  { input: "hard", output: "Heavens Reward Fallacy" },
  { input: "bitter", output: "Heavens Reward Fallacy" },
  { input: "shocked", output: "Heavens Reward Fallacy" },
  { input: "deserved", output: "Heavens Reward Fallacy" },
  { input: "put", output: "Heavens Reward Fallacy" },
  { input: "that if", output: "Heavens Reward Fallacy" },
  { input: "rewarded", output: "Heavens Reward Fallacy" },
  { input: "sacrifice", output: "Heavens Reward Fallacy" },
  { input: "assume", output: "Mind Reading" },
  { input: "assumed", output: "Mind Reading" },
  { input: "convinced", output: "Mind Reading" },
  { input: "response", output: "Mind Reading" },
  { input: "reply", output: "Mind Reading" },
  { input: "she", output: "Mind Reading" },
  { input: "respond", output: "Mind Reading" },
  { input: "at me", output: "Mind Reading" },
  { input: "they", output: "Mind Reading" },
  { input: "read", output: "Mind Reading" },
  { input: "never", output: "Overgeneralization" },
  { input: "again", output: "Overgeneralization" },
  { input: "always", output: "Overgeneralization" },
  { input: "would never", output: "Overgeneralization" },
  { input: "will", output: "Overgeneralization" },
  { input: "ever", output: "Overgeneralization" },
  { input: "will always", output: "Overgeneralization" },
  { input: "everyone", output: "Overgeneralization" },
  { input: "now", output: "Overgeneralization" },
  { input: "because", output: "Overgeneralization" },
  { input: "i'll never", output: "Overgeneralization" },
  { input: "happy for", output: "Personalization" },
  { input: "compared", output: "Personalization" },
  { input: "jealous", output: "Personalization" },
  { input: "why", output: "Personalization" },
  { input: "my friend", output: "Personalization" },
  { input: "friend got", output: "Personalization" },
  { input: "friend", output: "Personalization" },
  { input: "compared", output: "Personalization" },
  { input: "compared myself", output: "Personalization" },
  { input: "myself", output: "Personalization" },
  { input: "failure", output: "Polarized Thinking" },
  { input: "either", output: "Polarized Thinking" },
  { input: "perfect", output: "Polarized Thinking" },
  { input: "if", output: "Polarized Thinking" },
  { input: "failed", output: "Polarized Thinking" },
  { input: "or", output: "Polarized Thinking" },
  { input: "score", output: "Polarized Thinking" },
  { input: "or nothing", output: "Polarized Thinking" },
  { input: "perfectly", output: "Polarized Thinking" },
  { input: "goal", output: "Polarized Thinking" },
  { input: "should", output: "Shoulds" },
  { input: "people should", output: "Shoulds" },
  { input: "that should", output: "Shoulds" },
  { input: "should be", output: "Shoulds" },
  { input: "people", output: "Shoulds" },
  { input: "rules", output: "Shoulds" },
  { input: "should always", output: "Shoulds" },
  { input: "believe", output: "Shoulds" },
  { input: "believed", output: "Shoulds" },
  { input: "college", output: "Shoulds" },
];

export default async (req, res) => {
  if(!req.query.text){
    return res.send('bad')
  }
  await data.forEach((x) => classifier.train(x.input, x.output));
  
  var predictions = classifier.predict(req.query.text);


  console.log("pred", predictions);
  if (predictions.length > 0) {
    res.send(predictions);
  } else {
    res.send("No predictions returned");
  }
};
