import { User } from "next-auth";
import { DataSource } from '@toolpad/core/Crud';
let usersStore: User[] = [
    { id: '1', usr: "Huu", role: "2", email: 'huuthinhct'},
    { id: '2', usr: "Thinh", role: "2", email: 'huuthinhct123'},
];
  
export const librariansDataSource: DataSource<User> = {
    fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'usr', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    ],

    getMany: async ({ paginationModel, filterModel, sortModel }) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    let processedUsers = [...usersStore];

    // Apply filters (demo only)
    if (filterModel?.items?.length) {
        filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
            return;
        }

        processedUsers = processedUsers.filter((user) => {
            const userValue = user[field];

            switch (operator) {
            case 'contains':
                return String(userValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
                return userValue === value;
            case 'startsWith':
                return String(userValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
                return String(userValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
                return (userValue as number) > value;
            case '<':
                return (userValue as number) < value;
            default:
                return true;
            }
        });
        });
    }

    // Apply sorting
    if (sortModel?.length) {
        processedUsers.sort((a, b) => {
        for (const { field, sort } of sortModel) {
            if ((a[field] as number) < (b[field] as number)) {
            return sort === 'asc' ? -1 : 1;
            }
            if ((a[field] as number) > (b[field] as number)) {
            return sort === 'asc' ? 1 : -1;
            }
        }
        return 0;
        });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedUsers = processedUsers.slice(start, end);

    return {
        items: paginatedUsers,
        itemCount: processedUsers.length,
    };
    },

    getOne: async (userId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    const userToShow = usersStore.find((user) => user.id === String(userId));

    if (!userToShow) {
        throw new Error('user not found');
    }
    return userToShow;
    },

    createOne: async (data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    const nextId = usersStore.reduce(
        (max, u) => Math.max(max, Number(u.id)),
        0
    ) + 1;

    const newUser: User = {
        id: nextId.toString(),
        ...data,
    } as User;

    usersStore = [...usersStore, newUser];

    return newUser;
    },

    updateOne: async (userId, data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    let updatedUser: User | null = null;

    usersStore = usersStore.map((user) => {
        if (user.id === String(userId)) {
        updatedUser = { ...user, ...data };
        return updatedUser;
        }
        return user;
    });

    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
    },

    deleteOne: async (userId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    usersStore = usersStore.filter((user) => user.id !== String(userId));
    },

    validate: (formValues) => {
    let issues: { message: string; path: [keyof User] }[] = [];

    if (!formValues.usr) {
        issues = [...issues, { message: 'Username là bắt buộc', path: ['usr'] }];
    }

    if (formValues.usr && formValues.usr.length != 8) {
        issues = [
        ...issues,
        {
            message: 'Username phải có 8 chữ cái',
            path: ['usr'],
        },
        ];
    }
    
    if (!formValues.fname) {
        issues = [...issues, { message: 'Họ tên là bắt buộc', path: ['fname'] }];
    }

    if (!formValues.email) {
        issues = [...issues, { message: 'Email là bắt buộc', path: ['email'] }];
    }

    return { issues };
    },
};