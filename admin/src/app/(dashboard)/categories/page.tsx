'use client';
import * as React from 'react';
import { Crud, DataSourceCache } from '@toolpad/core/Crud';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Category } from '@/types/category';
import { categoriesDataSource } from '@/lib/dataSources/categories';

export default function CategoriesPage() {
    const categoriesCache = new DataSourceCache();

    return (
        <PageContainer title='Danh mục sách'>
            <Crud<Category>
                dataSource={categoriesDataSource}
                dataSourceCache={categoriesCache}
                rootPath="/categories"
                initialPageSize={2}
            />
        </PageContainer>
    );
}
