import { Book } from "@/types/book";
import { DataSource } from '@toolpad/core/Crud';

let booksStore: Book[] = [
    { id: '1', title: 'Thị giác máy tính', isbn: "12", author: "Trần Công Nhật", publisher: "Publisher Inc", category_id: 9, quantity: 10},
    { id: '2', title: 'Deep learning', isbn: "1", author: "Trần Hữu Thịnh", publisher: "Publisher Inc", category_id: 2, quantity: 10},
];
  
export const booksDataSource: DataSource<Book> = {
    fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Tên sách', flex: 1 },
    { field: 'isbn', headerName: 'ISBN', flex: 1 },
    { field: 'author', headerName: 'Tác giả', flex: 1 },
    { field: 'publisher', headerName: 'Nhà xuất bản', flex: 1 },
    { field: 'category_id', headerName: 'Thể loại', flex: 1 },
    { field: 'quantity', headerName: 'Số lượng', flex: 1 },
    ],

    getMany: async ({ paginationModel, filterModel, sortModel }) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    let processedBooks = [...booksStore];

    // Apply filters (demo only)
    if (filterModel?.items?.length) {
        filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
            return;
        }

        processedBooks = processedBooks.filter((book) => {
            const bookValue = book[field];

            switch (operator) {
            case 'contains':
                return String(bookValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
                return bookValue === value;
            case 'startsWith':
                return String(bookValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
                return String(bookValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
                return (bookValue as number) > value;
            case '<':
                return (bookValue as number) < value;
            default:
                return true;
            }
        });
        });
    }

    // Apply sorting
    if (sortModel?.length) {
        processedBooks.sort((a, b) => {
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
    const paginatedBooks = processedBooks.slice(start, end);

    return {
        items: paginatedBooks,
        itemCount: processedBooks.length,
    };
    },

    getOne: async (bookId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    const bookToShow = booksStore.find((book) => book.id === String(bookId));

    if (!bookToShow) {
        throw new Error('book not found');
    }
    return bookToShow;
    },

    createOne: async (data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    const nextId = booksStore.reduce(
        (max, u) => Math.max(max, Number(u.id)),
        0
    ) + 1;

    const newBook: Book = {
        id: nextId.toString(),
        ...data,
    } as Book;

    booksStore = [...booksStore, newBook];

    return newBook;
    },

    updateOne: async (bookId, data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    let updatedBook: Book | null = null;

    booksStore = booksStore.map((book) => {
        if (book.id === String(bookId)) {
        updatedBook = { ...book, ...data };
        return updatedBook;
        }
        return book;
    });

    if (!updatedBook) {
        throw new Error('Book not found');
    }
    return updatedBook;
    },

    deleteOne: async (bookId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });

    booksStore = booksStore.filter((book) => book.id !== String(bookId));
    },

    validate: (formValues) => {
        const issues: { message: string; path: [keyof Book] }[] = [];
      
        if (!formValues.title) {
          issues.push({ message: 'Tên sách là bắt buộc', path: ['title'] });
        }
        if (!formValues.isbn) {
          issues.push({ message: 'ISBN là bắt buộc', path: ['isbn'] });
        }
        if (!formValues.author) {
          issues.push({ message: 'Tác giả là bắt buộc', path: ['author'] });
        }
        if (!formValues.publisher) {
          issues.push({ message: 'Nhà xuất bản là bắt buộc', path: ['publisher'] });
        }
        if (formValues.category_id == null) {
          issues.push({ message: 'Thể loại là bắt buộc', path: ['category_id'] });
        }
        if (formValues.quantity == null || formValues.quantity < 0) {
          issues.push({ message: 'Số lượng không hợp lệ', path: ['quantity'] });
        }
      
        return { issues };
    }
};