export type PromptKeys = keyof typeof prompts;

const prompts = {
  keyWords:
    "Your task is to find the key words in the book text below.\n\n{{book}}\n",
  plotSummary: "Your task is to find the plot summary of the following book:\n\n{{book}}\n",
  sentiment: "Your task is to find the sentiment of the following book:\n\n{{book}}\n",
  critique: "Your task is to critique the following book:\n\n{{book}}\n",
};

export default prompts;
