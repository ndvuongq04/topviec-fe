import type { MemberRole } from '@/constants/companyMember.constants';

export interface ResRoleDefault {
    id?: number;
    // Database might return "role", "roleName", or "name" depending on entity properties
    roleName?: MemberRole | string;
    role?: MemberRole | string;
    name?: MemberRole | string;
    // Database might return "permissions" or "actions"
    permissions?: Record<string, boolean>;
    actions?: Record<string, boolean>;
}
