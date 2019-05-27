export interface HealthIssue {
    type: string;
    severity: number;
}

export interface HealthStatus {
    alive: boolean;
    issues: HealthIssue[];
}

export function getDefaultHealthStatus() : HealthStatus {
    return {
        alive: true,
        issues: [],
    }
}