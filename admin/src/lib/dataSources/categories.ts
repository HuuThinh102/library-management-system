import { Category } from "@/types/category";
import { DataSource } from '@toolpad/core/Crud';

let categoriesStore: Category[] = [
    { id: '1', name: 'Công nghệ thông tin và Truyền Thông'},
    { id: '2', name: 'Bách khoa'},
    { id: '3', name: 'Nông nghiệp'},
];
  
export const categoriesDataSource: DataSource<Category> = {
    fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Tên danh mục', flex: 1 },
    ],

    getMany: async ({ paginationModel, filterModel, sortModel }) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    let processedCategories = [...categoriesStore];

    // Apply filters (demo only)
    if (filterModel?.items?.length) {
        filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
            return;
        }

        processedCategories = processedCategories.filter((category) => {
            const categoryValue = category[field];

            switch (operator) {
            case 'contains':
                return String(categoryValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
                return categoryValue === value;
            case 'startsWith':
                return String(categoryValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
                return String(categoryValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
                return (categoryValue as number) > value;
            case '<':
                return (categoryValue as number) < value;
            default:
                return true;
            }
        });
        });
    }

    // Apply sorting
    if (sortModel?.length) {
        processedCategories.sort((a, b) => {
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
    const paginatedCategories = processedCategories.slice(start, end);

    return {
        items: paginatedCategories,
        itemCount: processedCategories.length,
    };
    },

    getOne: async (categoryId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    const categoryToShow = categoriesStore.find((category) => category.id === String(categoryId));

    if (!categoryToShow) {
        throw new Error('Category not found');
    }
    return categoryToShow;
    },

    createOne: async (data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    const nextId = categoriesStore.reduce(
        (max, u) => Math.max(max, Number(u.id)),
        0
    ) + 1;

    const newCategory: Category = {
        id: nextId.toString(),
        ...data,
    } as Category;

    categoriesStore = [...categoriesStore, newCategory];

    return newCategory;
    },

    updateOne: async (categoryId, data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    let updatedCategory: Category | null = null;

    categoriesStore = categoriesStore.map((category) => {
        if (category.id === String(categoryId)) {
        updatedCategory = { ...category, ...data };
        return updatedCategory;
        }
        return category;
    });

    if (!updatedCategory) {
        throw new Error('Category not found');
    }
    return updatedCategory;
    },

    deleteOne: async (categoryId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    categoriesStore = categoriesStore.filter((category) => category.id !== String(categoryId));
    },

    validate: (formValues) => {
        const issues: { message: string; path: [keyof Category] }[] = [];
      
        if (!formValues.name) {
          issues.push({ message: 'Tên danh mục là bắt buộc', path: ['name'] });
        }
      
        return { issues };
    }
};