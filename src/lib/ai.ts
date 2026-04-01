import axios from 'axios';

export const aiService = {
  async getJobSuggestions(workerSkills: string[], jobDescriptions: string[]) {
    try {
      const response = await axios.post('/api/ai/chat', {
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a job matching assistant for Wera Platform. Given a worker\'s skills and a list of job descriptions, suggest the top 3 matches with a brief reason for each.'
          },
          {
            role: 'user',
            content: `Worker Skills: ${workerSkills.join(', ')}\n\nJobs:\n${jobDescriptions.join('\n---\n')}`
          }
        ]
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI Matching Error:', error);
      return 'Unable to generate suggestions at this time.';
    }
  }
};
