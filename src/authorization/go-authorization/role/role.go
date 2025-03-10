package role

import "ftf.shared.authorization/permission"

type Role string

const (
	// Global roles
	Admin             Role = "admin"
	AuthenticatedUser Role = "authenticated-user"
	Anonymous         Role = "anonymous"
)

var rolePermissions map[Role][]permission.Permission = map[Role][]permission.Permission{
	Admin: {
		permission.AdminPermission,
	},
	AuthenticatedUser: {},
	Anonymous:         {},
}

func GetRolePermissions(role Role) []permission.Permission {
	permissions, ok := rolePermissions[role]
	if !ok {
		return []permission.Permission{}
	}
	return permissions
}
