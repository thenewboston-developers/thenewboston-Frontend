export interface FrontendDeployment {
  created_date: string;
  deployed_by: number;
  id: number;
}

export interface FrontendDeploymentStatus {
  deployment: FrontendDeployment | null;
}

export interface FrontendDeploymentWebSocketMessage {
  frontend_deployment: FrontendDeployment;
  type: 'update.frontend_deployment';
}
