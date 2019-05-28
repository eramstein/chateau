export interface HealthIssue {
    type: string;
    severity: number;
}

export interface HealthStatus {
    issues: HealthIssue[];
}

export function getDefaultHealthStatus() : HealthStatus {
    return {
        issues: [],
    }
}