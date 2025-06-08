const API_URL = "http://localhost:5000/api";

export interface JobApplication {
  _id?: string;
  company: string;
  position: string;
  location: string;
  status: string;
  notes?: string;
  appliedDate?: Date;
  lastUpdated?: Date;
}

export const api = {
  async getApplications(): Promise<JobApplication[]> {
    const response = await fetch(`${API_URL}/applications`);
    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }
    return response.json();
  },

  async createApplication(
    application: Omit<JobApplication, "_id">
  ): Promise<JobApplication> {
    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });
    if (!response.ok) {
      throw new Error("Failed to create application");
    }
    return response.json();
  },

  async updateApplication(
    id: string,
    application: Partial<JobApplication>
  ): Promise<JobApplication> {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });
    if (!response.ok) {
      throw new Error("Failed to update application");
    }
    return response.json();
  },

  async deleteApplication(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete application");
    }
  },
};
