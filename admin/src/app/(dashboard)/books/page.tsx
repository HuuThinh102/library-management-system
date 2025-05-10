'use client';
import * as React from 'react';
import { Crud, DataSourceCache } from '@toolpad/core/Crud';
import { PageContainer } from '@toolpad/core/PageContainer';
import type { Book } from '@/types/book';
import { booksDataSource } from '@/lib/dataSources/books';

export default function BooksPage() {
    const bookCache = new DataSourceCache();

    return (
        <PageContainer title='Sách'>
            <Crud<Book>
                dataSource={booksDataSource}
                dataSourceCache={bookCache}
                rootPath="/Books"
                initialPageSize={2}
            />
        </PageContainer>
    );
}
