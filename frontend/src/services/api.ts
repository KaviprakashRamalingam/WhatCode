import axios, { AxiosInstance } from 'axios';
import { CodeExecutionRequest, CodeExecutionResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60 seconds for code execution
    });
  }

  async executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      const response = await this.client.post<CodeExecutionResponse>('/execute', request);
      // Ensure we return a valid response object
      return response.data || {
        success: false,
        error: 'Invalid response from server',
      };
    } catch (error: any) {
      console.error('Execute code error:', error);
      if (error.response) {
        // Backend may return error in data.error, data.message, or the response itself
        const errorMessage = error.response.data?.error || 
                           error.response.data?.message || 
                           error.response.statusText ||
                           'An error occurred during code execution';
        return {
          success: false,
          error: errorMessage,
        };
      }
      if (error.request) {
        return {
          success: false,
          error: 'Network error. Please check if the backend server is running.',
        };
      }
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }

  async visualizeCode(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      const response = await this.client.post<CodeExecutionResponse>('/visualize', request);
      // Ensure we return a valid response object
      return response.data || {
        success: false,
        error: 'Invalid response from server',
      };
    } catch (error: any) {
      console.error('Visualize code error:', error);
      if (error.response) {
        // Backend may return error in data.error, data.message, or the response itself
        const errorMessage = error.response.data?.error || 
                           error.response.data?.message || 
                           error.response.statusText ||
                           'An error occurred during visualization';
        return {
          success: false,
          error: errorMessage,
        };
      }
      if (error.request) {
        return {
          success: false,
          error: 'Network error. Please check if the backend server is running.',
        };
      }
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
}

export default new ApiService();

